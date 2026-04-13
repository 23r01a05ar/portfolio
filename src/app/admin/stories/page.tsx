"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash2, Edit3, Save, X, ArrowLeft, Upload, BookOpen } from "lucide-react";
import { format } from "date-fns";
import type { Story } from "@/types";

const EMPTY: Partial<Story> = { title: "", content: "", image_url: null };

export default function AdminStories() {
  const supabase = createClient();
  const [stories, setStories] = useState<Story[]>([]);
  const [form, setForm] = useState<Partial<Story>>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchStories = async () => {
    const { data } = await supabase.from("stories").select("*").order("created_at", { ascending: false });
    if (data) setStories(data);
  };

  useEffect(() => { fetchStories(); }, []);

  const uploadImage = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `story-${Date.now()}.${ext}`;
    const { error, data } = await supabase.storage.from("stories").upload(fileName, file, { upsert: true });
    if (error) { toast.error("Upload failed: " + error.message); setUploading(false); return null; }
    const { data: { publicUrl } } = supabase.storage.from("stories").getPublicUrl(data.path);
    setUploading(false);
    return publicUrl;
  };

  const handleSave = async () => {
    if (!form.title || !form.content) { toast.error("Title and content required"); return; }
    setLoading(true);
    if (editing) {
      const { error } = await supabase.from("stories").update({
        title: form.title, content: form.content, image_url: form.image_url, updated_at: new Date().toISOString()
      }).eq("id", editing);
      if (error) toast.error(error.message);
      else { toast.success("Story updated!"); }
    } else {
      const { error } = await supabase.from("stories").insert({
        title: form.title, content: form.content, image_url: form.image_url
      });
      if (error) toast.error(error.message);
      else { toast.success("Story created!"); }
    }
    setForm(EMPTY); setEditing(null); setShowForm(false);
    await fetchStories();
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this story?")) return;
    const { error } = await supabase.from("stories").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); fetchStories(); }
  };

  const handleEdit = (story: Story) => {
    setForm(story); setEditing(story.id); setShowForm(true);
  };

  return (
    <main className="min-h-screen bg-neo-bg">
      <nav className="border-b-4 border-black bg-neo-dark px-4 h-16 flex items-center justify-between sticky top-0 z-10">
        <Link href="/admin/dashboard" className="flex items-center gap-2 border-4 border-white text-white px-4 py-2 font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          <ArrowLeft size={14} strokeWidth={3} /> Dashboard
        </Link>
        <span className="font-black text-sm uppercase tracking-widest text-white">Manage Stories</span>
        <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }} className="neo-btn bg-neo-accent text-black shadow-neo-sm text-xs py-2 px-4">
          <Plus size={14} strokeWidth={3} className="mr-1" /> New Story
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Form */}
        {showForm && (
          <div className="border-4 border-black bg-white shadow-neo-xl mb-10">
            <div className="border-b-4 border-black bg-neo-accent px-6 py-4 flex items-center justify-between">
              <h2 className="font-black text-lg uppercase tracking-tight">{editing ? "Edit Story" : "New Story"}</h2>
              <button onClick={() => setShowForm(false)} className="border-4 border-black p-2 bg-white hover:bg-neo-bg active:translate-x-1 active:translate-y-1 active:shadow-none shadow-neo-sm transition-all">
                <X size={16} strokeWidth={3} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block font-black text-xs uppercase tracking-widest mb-2">Title *</label>
                <input
                  value={form.title || ""}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full border-4 border-black px-4 py-3 font-bold text-base focus:outline-none focus:bg-neo-secondary"
                  placeholder="Story title..."
                />
              </div>
              <div>
                <label className="block font-black text-xs uppercase tracking-widest mb-2">Content *</label>
                <textarea
                  value={form.content || ""}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  rows={8}
                  className="w-full border-4 border-black px-4 py-3 font-bold text-base focus:outline-none focus:bg-neo-secondary resize-none"
                  placeholder="Write your story here..."
                />
              </div>
              {/* Image upload */}
              <div>
                <label className="block font-black text-xs uppercase tracking-widest mb-2">Cover Image</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="neo-btn bg-neo-muted text-black shadow-neo-sm text-xs py-2 px-4 disabled:opacity-60"
                  >
                    <Upload size={14} strokeWidth={3} className="mr-1" />
                    {uploading ? "Uploading…" : "Upload Image"}
                  </button>
                  {form.image_url && (
                    <div className="flex items-center gap-2">
                      <div className="relative w-16 h-16 border-4 border-black overflow-hidden">
                        <Image src={form.image_url} alt="Preview" fill className="object-cover" />
                      </div>
                      <button onClick={() => setForm(f => ({ ...f, image_url: null }))} className="border-2 border-black p-1 hover:bg-neo-accent">
                        <X size={12} strokeWidth={3} />
                      </button>
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await uploadImage(file);
                    if (url) setForm(f => ({ ...f, image_url: url }));
                  }}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={loading} className="neo-btn bg-neo-dark text-white shadow-neo-md disabled:opacity-60">
                  <Save size={16} strokeWidth={3} className="mr-2" />
                  {loading ? "Saving…" : editing ? "Update Story" : "Publish Story"}
                </button>
                <button onClick={() => setShowForm(false)} className="neo-btn bg-white text-black shadow-neo-sm hover:bg-neo-bg">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stories list */}
        <h2 className="font-black text-3xl uppercase tracking-tight mb-6">{stories.length} Stories</h2>
        {stories.length === 0 ? (
          <div className="border-4 border-black bg-white shadow-neo-md py-16 text-center">
            <BookOpen size={40} strokeWidth={2} className="mx-auto mb-4" />
            <p className="font-black text-xl uppercase">No stories yet. Create one above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {stories.map((story) => (
              <div key={story.id} className="border-4 border-black bg-white shadow-neo-md flex items-start gap-4 p-5 hover:-translate-y-0.5 hover:shadow-neo-lg transition-all">
                {story.image_url && (
                  <div className="relative w-20 h-20 border-4 border-black flex-shrink-0 overflow-hidden hidden sm:block">
                    <Image src={story.image_url} alt={story.title} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-lg uppercase tracking-tight truncate">{story.title}</h3>
                  <p className="font-bold text-sm text-gray-600 mt-1 line-clamp-2">{story.content.slice(0, 100)}…</p>
                  <span className="font-bold text-xs text-gray-400 mt-2 block uppercase tracking-widest">
                    {format(new Date(story.created_at), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleEdit(story)} className="border-4 border-black p-2 bg-neo-secondary shadow-neo-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                    <Edit3 size={16} strokeWidth={3} />
                  </button>
                  <button onClick={() => handleDelete(story.id)} className="border-4 border-black p-2 bg-neo-accent shadow-neo-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                    <Trash2 size={16} strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
