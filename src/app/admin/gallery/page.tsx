"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload, Trash2, Plus, X, ImageIcon } from "lucide-react";
import type { GalleryItem } from "@/types";

export default function AdminGallery() {
  const supabase = createClient();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchItems = async () => {
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleUpload = async () => {
    if (!file) { toast.error("Select an image first"); return; }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `gallery-${Date.now()}.${ext}`;
    const { error, data } = await supabase.storage.from("gallery").upload(fileName, file, { upsert: true });
    if (error) { toast.error(error.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(data.path);
    const { error: dbErr } = await supabase.from("gallery").insert({ image_url: publicUrl, caption: caption || null });
    if (dbErr) toast.error(dbErr.message);
    else { toast.success("Photo uploaded!"); setFile(null); setPreview(null); setCaption(""); fetchItems(); }
    setUploading(false);
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm("Delete this photo?")) return;
    // Extract filename from URL
    const parts = item.image_url.split("/");
    const filename = parts[parts.length - 1];
    await supabase.storage.from("gallery").remove([filename]);
    const { error } = await supabase.from("gallery").delete().eq("id", item.id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); fetchItems(); }
  };

  return (
    <main className="min-h-screen bg-neo-bg">
      <nav className="border-b-4 border-black bg-neo-dark px-4 h-16 flex items-center justify-between sticky top-0 z-10">
        <Link href="/admin/dashboard" className="flex items-center gap-2 border-4 border-white text-white px-4 py-2 font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          <ArrowLeft size={14} strokeWidth={3} /> Dashboard
        </Link>
        <span className="font-black text-sm uppercase tracking-widest text-white">Manage Gallery</span>
        <button onClick={() => fileRef.current?.click()} className="neo-btn bg-neo-secondary text-black shadow-neo-sm text-xs py-2 px-4">
          <Plus size={14} strokeWidth={3} className="mr-1" /> Upload
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Upload form */}
        <div className="border-4 border-black bg-white shadow-neo-xl mb-10">
          <div className="border-b-4 border-black bg-neo-secondary px-6 py-4">
            <h2 className="font-black text-lg uppercase tracking-tight">Upload New Photo</h2>
          </div>
          <div className="p-6">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            {!preview ? (
              <div
                onClick={() => fileRef.current?.click()}
                className="border-4 border-dashed border-black h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-neo-bg transition-colors"
              >
                <Upload size={40} strokeWidth={2} className="mb-3" />
                <span className="font-black text-sm uppercase tracking-widest">Click to select image</span>
              </div>
            ) : (
              <div className="relative">
                <div className="relative h-64 border-4 border-black overflow-hidden mb-4">
                  <Image src={preview} alt="Preview" fill className="object-contain" />
                </div>
                <button
                  onClick={() => { setPreview(null); setFile(null); }}
                  className="absolute top-2 right-2 border-4 border-black bg-neo-accent p-1"
                >
                  <X size={14} strokeWidth={3} />
                </button>
              </div>
            )}
            <div className="mt-4 space-y-4">
              <div>
                <label className="block font-black text-xs uppercase tracking-widest mb-2">Caption (optional)</label>
                <input
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  className="w-full border-4 border-black px-4 py-3 font-bold text-base focus:outline-none focus:bg-neo-muted"
                  placeholder="Add a caption..."
                />
              </div>
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="neo-btn bg-neo-dark text-white shadow-neo-md disabled:opacity-60"
              >
                <Upload size={16} strokeWidth={3} className="mr-2" />
                {uploading ? "Uploading…" : "Upload Photo"}
              </button>
            </div>
          </div>
        </div>

        {/* Gallery grid */}
        <h2 className="font-black text-3xl uppercase tracking-tight mb-6">{items.length} Photos</h2>
        {items.length === 0 ? (
          <div className="border-4 border-black bg-white shadow-neo-md py-16 text-center">
            <ImageIcon size={40} strokeWidth={2} className="mx-auto mb-4" />
            <p className="font-black text-xl uppercase">No photos yet. Upload one above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="border-4 border-black shadow-neo-sm group relative overflow-hidden">
                <div className="relative h-40">
                  <Image src={item.image_url} alt={item.caption || ""} fill className="object-cover" />
                </div>
                {item.caption && (
                  <div className="border-t-4 border-black bg-white px-2 py-1">
                    <p className="font-bold text-xs uppercase tracking-wider truncate">{item.caption}</p>
                  </div>
                )}
                <button
                  onClick={() => handleDelete(item)}
                  className="absolute top-2 right-2 border-4 border-black bg-neo-accent p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Delete"
                >
                  <Trash2 size={14} strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
