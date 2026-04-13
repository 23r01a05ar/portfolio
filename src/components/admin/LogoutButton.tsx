"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Logged out");
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="border-4 border-neo-accent text-neo-accent px-4 py-2 font-black text-xs uppercase tracking-widest hover:bg-neo-accent hover:text-black transition-colors flex items-center gap-2"
    >
      <LogOut size={14} strokeWidth={3} />
      Logout
    </button>
  );
}
