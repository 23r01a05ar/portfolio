"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft, Upload, Trash2, Plus, Edit3, Save, X, Award, FileText } from "lucide-react";
import { format } from "date-fns";
import type { Certificate } from "@/types";

const EMPTY = { title: "", issuer: "", date: "", file_url: null as string | null };

export default function AdminCertificates() {
  const supabase = createClient();
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchCerts = async () => {
    const { data } = await supabase.from("certificates").select("*").order("created_at", { ascending: false });
    if (data) setCerts(data);
  };

  useEffect(() => { fetchCerts(); }, []);

  const uploadFile = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `cert-${Date.now()}.${ext}`;
    const { error, data } = await supabase.storage.from("certificates").upload(fileName, file, { upsert: true });
    if (error) { toast.error(error.message); setUploading(false); return null; }
    const { data: { publicUrl } } = supabase.storage.from("certificates").getPublicUrl(data.path);
    setUploading(false);
    return publicUrl;
  };

  const handleSave = async () => {
    if (!form.title || !form.issuer || !form.date) { toast.error("Title, issuer, and date required"); return; }
    setLoading(true);
    if (editing) {
      const { error } = await supabase.from("certificates").update(form).eq("id", editing);
      if (error) toast.error(error.message);
      else toast.success("Certificate updated!");
    } else {
      const { error } = await supabase.from("certificates").insert(form);
      if (error) toast.error(error.message);
      else toast.success("Certificate added!");
    }
    setForm(EMPTY); setEditing(null); setShowForm(false);
    await fetchCerts();
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this certificate?")) return;
    await supabase.from("certificates").delete().eq("id", id);
    toast.success("Deleted"); fetchCerts();
  };

  return (
    <main className="min-h-screen bg-neo-bg">
      <nav className="border-b-4 border-black bg-neo-dark px-4 h-16 flex items-center justify-between sticky top-0 z-10">
        <Link href="/admin/dashboard" className="flex items-center gap-2 border-4 border-white text-white px-4 py-2 font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          <ArrowLeft size={14} strokeWidth={3} /> Dashboard
        </Link>
        <span className="font-black text-sm uppercase tracking-widest text-white">Manage Certificates</span>
        <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }} className="neo-btn bg-neo-muted text-black shadow-neo-sm text-xs py-2 px-4">
          <Plus size={14} strokeWidth={3} className="mr-1" /> Add
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Form */}
        {showForm && (
          <div className="border-4 border-black bg-white shadow-neo-xl mb-10">
            <div className="border-b-4 border-black bg-neo-muted px-6 py-4 flex items-center justify-between">
              <h2 className="font-black text-lg uppercase tracking-tight">{editing ? "Edit Certificate" : "Add Certificate"}</h2>
              <button onClick={() => setShowForm(false)} className="border-4 border-black p-2 bg-white shadow-neo-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                <X size={16} strokeWidth={3} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black text-xs uppercase tracking-widest mb-2">Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full border-4 border-black px-4 py-3 font-bold text-base focus:outline-none focus:bg-neo-secondary" placeholder="Certificate name" />
                </div>
                <div>
                  <label className="block font-black text-xs uppercase tracking-widest mb-2">Issuer *</label>
                  <input value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))} className="w-full border-4 border-black px-4 py-3 font-bold text-base focus:outline-none focus:bg-neo-secondary" placeholder="Google, Cisco, etc." />
                </div>
              </div>
              <div>
                <label className="block font-black text-xs uppercase tracking-widest mb-2">Date *</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="border-4 border-black px-4 py-3 font-bold text-base focus:outline-none focus:bg-neo-secondary" />
              </div>
              <div>
                <label className="block font-black text-xs uppercase tracking-widest mb-2">File (PDF or Image)</label>
                <input ref={fileRef} type="file" accept=".pdf,image/*" className="hidden" onChange={async (e) => {
                  const file = e.target.files?.[0]; if (!file) return;
                  const url = await uploadFile(file); if (url) setForm(f => ({ ...f, file_url: url }));
                }} />
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="neo-btn bg-neo-bg text-black shadow-neo-sm text-xs py-2 px-4 disabled:opacity-60">
                    <Upload size={14} strokeWidth={3} className="mr-1" />
                    {uploading ? "Uploading…" : form.file_url ? "Change File" : "Upload File"}
                  </button>
                  {form.file_url && (
                    <div className="flex items-center gap-2 border-2 border-black px-3 py-1">
                      <FileText size={14} strokeWidth={3} />
                      <span className="font-bold text-xs uppercase truncate max-w-xs">File uploaded ✓</span>
                      <button onClick={() => setForm(f => ({ ...f, file_url: null }))} className="hover:text-neo-accent"><X size={12} strokeWidth={3} /></button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={loading} className="neo-btn bg-neo-dark text-white shadow-neo-md disabled:opacity-60">
                  <Save size={16} strokeWidth={3} className="mr-2" />
                  {loading ? "Saving…" : editing ? "Update" : "Add Certificate"}
                </button>
                <button onClick={() => setShowForm(false)} className="neo-btn bg-white text-black shadow-neo-sm">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* List */}
        <h2 className="font-black text-3xl uppercase tracking-tight mb-6">{certs.length} Certificates</h2>
        {certs.length === 0 ? (
          <div className="border-4 border-black bg-white shadow-neo-md py-16 text-center">
            <Award size={40} strokeWidth={2} className="mx-auto mb-4" />
            <p className="font-black text-xl uppercase">No certificates yet!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {certs.map((cert) => (
              <div key={cert.id} className="border-4 border-black bg-white shadow-neo-md p-5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-neo-lg transition-all">
                <div className="border-4 border-black bg-neo-muted p-3 shadow-neo-sm flex-shrink-0">
                  <Award size={24} strokeWidth={3} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-lg uppercase tracking-tight truncate">{cert.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="font-bold text-xs text-gray-600 uppercase tracking-wider">{cert.issuer}</span>
                    <span className="border-2 border-black px-2 font-bold text-xs uppercase">{cert.date}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {cert.file_url && (
                    <a href={cert.file_url} target="_blank" rel="noopener noreferrer" className="border-4 border-black p-2 bg-neo-secondary shadow-neo-sm hover:shadow-none transition-all">
                      <FileText size={16} strokeWidth={3} />
                    </a>
                  )}
                  <button onClick={() => { setForm({ title: cert.title, issuer: cert.issuer, date: cert.date, file_url: cert.file_url }); setEditing(cert.id); setShowForm(true); }} className="border-4 border-black p-2 bg-neo-secondary shadow-neo-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                    <Edit3 size={16} strokeWidth={3} />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="border-4 border-black p-2 bg-neo-accent shadow-neo-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
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
