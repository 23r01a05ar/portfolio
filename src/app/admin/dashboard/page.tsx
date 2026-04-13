import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Image, Award, LogOut, Plus, BarChart3, Terminal } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // Fetch counts
  const [{ count: storiesCount }, { count: galleryCount }, { count: certsCount }] = await Promise.all([
    supabase.from("stories").select("*", { count: "exact", head: true }),
    supabase.from("gallery").select("*", { count: "exact", head: true }),
    supabase.from("certificates").select("*", { count: "exact", head: true }),
  ]);

  const sections = [
    {
      title: "Stories",
      count: storiesCount ?? 0,
      icon: BookOpen,
      href: "/admin/stories",
      color: "bg-neo-accent",
      desc: "Blog posts & Instagram-style stories",
    },
    {
      title: "Gallery",
      count: galleryCount ?? 0,
      icon: Image,
      href: "/admin/gallery",
      color: "bg-neo-secondary",
      desc: "Extra-curricular photos & captions",
    },
    {
      title: "Certificates",
      count: certsCount ?? 0,
      icon: Award,
      href: "/admin/certificates",
      color: "bg-neo-muted",
      desc: "Certifications & credentials",
    },
  ];

  return (
    <main className="min-h-screen bg-neo-bg">
      {/* Admin Navbar */}
      <nav className="border-b-4 border-black bg-neo-dark sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="border-4 border-neo-accent px-3 py-1 flex items-center gap-2">
              <Terminal size={16} strokeWidth={3} className="text-neo-accent" />
              <span className="font-black text-xs uppercase tracking-widest text-white">ADMIN</span>
            </div>
            <span className="font-bold text-xs text-gray-400 uppercase tracking-widest hidden sm:block">
              {user.email}
            </span>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="border-4 border-white text-white px-4 py-2 font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              View Site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-black text-5xl md:text-6xl uppercase tracking-tighter leading-none">
            DASHBOARD
          </h1>
          <p className="font-bold text-lg mt-2">Manage your portfolio content</p>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {sections.map(({ title, count, icon: Icon, href, color, desc }) => (
            <Link
              key={href}
              href={href}
              className="neo-card bg-white group"
            >
              <div className={`${color} border-b-4 border-black px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <Icon size={20} strokeWidth={3} />
                  <span className="font-black text-sm uppercase tracking-widest">{title}</span>
                </div>
                <span className="font-black text-2xl">{count}</span>
              </div>
              <div className="p-5">
                <p className="font-bold text-sm text-gray-600 mb-4">{desc}</p>
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  <Plus size={14} strokeWidth={3} />
                  <span>Manage</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="border-4 border-black bg-white shadow-neo-md p-6">
          <div className="flex items-center gap-2 border-b-4 border-black pb-4 mb-6">
            <BarChart3 size={20} strokeWidth={3} />
            <h2 className="font-black text-xl uppercase tracking-tight">Quick Actions</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/stories?new=1" className="neo-btn bg-neo-accent text-black shadow-neo-sm">
              <Plus size={16} strokeWidth={3} className="mr-2" />
              New Story
            </Link>
            <Link href="/admin/gallery?new=1" className="neo-btn bg-neo-secondary text-black shadow-neo-sm">
              <Plus size={16} strokeWidth={3} className="mr-2" />
              Upload Photo
            </Link>
            <Link href="/admin/certificates?new=1" className="neo-btn bg-neo-muted text-black shadow-neo-sm">
              <Plus size={16} strokeWidth={3} className="mr-2" />
              Add Certificate
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
