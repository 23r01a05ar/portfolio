"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Lock, Mail, Eye, EyeOff, Terminal } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      toast.error("Access denied. Admin only.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back, Admin!");
      router.push("/admin/dashboard");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-neo-dark flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      {/* Decorative shapes */}
      <div className="absolute top-16 left-16 w-16 h-16 bg-neo-accent border-4 border-white rotate-12 animate-float hidden md:block" />
      <div className="absolute bottom-16 right-16 w-12 h-12 bg-neo-secondary border-4 border-white -rotate-6 animate-float hidden md:block" />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 border-4 border-white bg-neo-accent px-6 py-3 shadow-[6px_6px_0px_0px_#fff] mb-4">
            <Terminal size={20} strokeWidth={3} />
            <span className="font-black text-sm uppercase tracking-widest">ADMIN PANEL</span>
          </div>
          <h1 className="font-black text-4xl uppercase tracking-tighter text-white">
            Vallabha.dev
          </h1>
          <p className="font-bold text-sm text-gray-400 mt-2 uppercase tracking-widest">Restricted Access</p>
        </div>

        {/* Form card */}
        <div className="border-4 border-white bg-neo-bg shadow-[12px_12px_0px_0px_#FF6B6B]">
          <div className="border-b-4 border-black bg-neo-secondary px-6 py-4">
            <div className="flex items-center gap-2">
              <Lock size={16} strokeWidth={3} />
              <span className="font-black text-sm uppercase tracking-widest">Secure Login</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {/* Email */}
            <div>
              <label className="block font-black text-xs uppercase tracking-widest mb-2">Email</label>
              <div className="relative">
                <Mail size={18} strokeWidth={3} className="absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-4 border-black pl-12 pr-4 py-4 font-bold text-base placeholder:text-gray-400 focus:outline-none focus:bg-neo-muted focus:shadow-neo-sm transition-all"
                  placeholder="admin@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-black text-xs uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock size={18} strokeWidth={3} className="absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-4 border-black pl-12 pr-12 py-4 font-bold text-base placeholder:text-gray-400 focus:outline-none focus:bg-neo-muted focus:shadow-neo-sm transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff size={18} strokeWidth={3} /> : <Eye size={18} strokeWidth={3} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="neo-btn bg-neo-dark text-white shadow-neo-md hover:shadow-neo-lg w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Logging in…" : "Login → Admin Panel"}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="font-bold text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </main>
  );
}
