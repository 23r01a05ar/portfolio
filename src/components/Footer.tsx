import { portfolioData } from "@/lib/data";
import { Heart, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neo-dark border-t-4 border-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 border-4 border-neo-secondary px-4 py-2 shadow-[4px_4px_0px_0px_#FFD93D]">
            <Terminal size={18} strokeWidth={3} className="text-neo-secondary" />
            <span className="font-black text-sm uppercase tracking-widest text-white">VALLABHA.DEV</span>
          </div>

          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <span>Built with</span>
            <Heart size={16} strokeWidth={3} className="fill-neo-accent text-neo-accent" />
            <span>using Next.js + Supabase</span>
          </div>

          <div className="flex gap-3">
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-4 border-white px-4 py-2 font-black text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors"
            >
              GitHub
            </a>
            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border-4 border-neo-secondary px-4 py-2 font-black text-xs uppercase tracking-widest text-neo-secondary hover:bg-neo-secondary hover:text-black transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t-4 border-gray-800 text-center">
          <p className="font-bold text-xs uppercase tracking-widest text-gray-500">
            © {new Date().getFullYear()} Kanchumarthi Sai Sri Vallabha · CMRIT Hyderabad · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
