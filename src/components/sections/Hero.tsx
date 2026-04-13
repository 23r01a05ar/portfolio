"use client";
import { ArrowDown, Github, Linkedin, Mail, Star, Zap } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-neo-bg overflow-hidden flex items-center pt-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Floating decorative shapes */}
      <div className="absolute top-24 right-8 md:right-24 w-20 h-20 bg-neo-secondary border-4 border-black rotate-12 animate-float hidden sm:block" />
      <div className="absolute top-40 right-4 md:right-16 w-12 h-12 bg-neo-accent border-4 border-black -rotate-6 animate-float hidden sm:block" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-32 left-4 md:left-16 w-16 h-16 bg-neo-muted border-4 border-black rotate-3 animate-float hidden sm:block" style={{ animationDelay: "2s" }} />
      <div className="absolute top-32 left-4 md:left-32 w-8 h-8 bg-neo-accent border-4 border-black rotate-45 hidden lg:block" />

      {/* Spinning star */}
      <div className="absolute top-28 right-40 hidden lg:block">
        <Star size={40} strokeWidth={3} className="animate-spin-slow fill-neo-secondary" />
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border-4 border-black bg-neo-muted px-4 py-2 mb-6 shadow-neo-sm rotate-[-1deg]">
              <Zap size={14} strokeWidth={3} className="fill-black" />
              <span className="font-black text-xs uppercase tracking-widest">Available for Internships 2026</span>
            </div>

            {/* Name */}
            <h1 className="font-black leading-[0.9] mb-4">
              <span className="block text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter">
                KANCHUMARTHI
              </span>
              <span className="block text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-stroke">
                SAI SRI VALLABHA
              </span>
            </h1>

            {/* Tagline */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Android Dev", "Full Stack", "Cloud AI"].map((tag, i) => (
                <span
                  key={tag}
                  className={`border-4 border-black px-3 py-1 font-black text-sm uppercase tracking-wider shadow-neo-sm ${
                    i === 0 ? "bg-neo-accent" : i === 1 ? "bg-neo-secondary" : "bg-neo-muted"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p className="text-lg font-bold max-w-lg mb-8 leading-relaxed border-l-4 border-black pl-4">
              {portfolioData.shortBio}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#projects"
                className="neo-btn bg-neo-accent text-black shadow-neo-md hover:shadow-neo"
              >
                View Projects →
              </a>
              <a
                href="#contact"
                className="neo-btn bg-white text-black shadow-neo-md hover:shadow-neo hover:bg-neo-secondary"
              >
                Hire Me
              </a>
              <a
                href={portfolioData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn bg-neo-dark text-white shadow-neo-md hover:shadow-neo"
              >
                <Github size={16} strokeWidth={3} className="mr-2" />
                GitHub
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href={portfolioData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border-4 border-black p-3 bg-white shadow-neo-sm hover:bg-neo-accent hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-100"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} strokeWidth={3} />
              </a>
              <a
                href={`mailto:${portfolioData.email}`}
                className="border-4 border-black p-3 bg-white shadow-neo-sm hover:bg-neo-secondary hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-100"
                aria-label="Email"
              >
                <Mail size={20} strokeWidth={3} />
              </a>
              <a
                href={portfolioData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-4 border-black p-3 bg-white shadow-neo-sm hover:bg-neo-muted hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-100"
                aria-label="GitHub"
              >
                <Github size={20} strokeWidth={3} />
              </a>
            </div>
          </div>

          {/* Right: Stats card */}
          <div className="relative hidden lg:block">
            <div className="border-4 border-black bg-white shadow-neo-xl p-8 rotate-1">
              <div className="border-b-4 border-black pb-4 mb-6">
                <h2 className="font-black text-2xl uppercase tracking-tight">Quick Stats</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "300+", label: "Cloud Labs", color: "bg-neo-accent" },
                  { num: "250+", label: "GCP Badges", color: "bg-neo-secondary" },
                  { num: "2+", label: "Internships", color: "bg-neo-muted" },
                  { num: "6+", label: "Hackathons", color: "bg-neo-dark text-white" },
                ].map((stat) => (
                  <div key={stat.label} className={`border-4 border-black p-4 ${stat.color} shadow-neo-sm`}>
                    <div className="font-black text-3xl">{stat.num}</div>
                    <div className="font-bold text-xs uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-4 border-black bg-neo-bg p-4">
                <div className="font-black text-sm uppercase tracking-widest mb-1">Currently</div>
                <div className="font-bold text-lg">3rd Year @ CMRIT</div>
                <div className="font-bold text-sm text-neo-accent mt-1">Graduating 2027</div>
              </div>
            </div>
            {/* Overlapping badge */}
            <div className="absolute -top-4 -right-4 bg-neo-accent border-4 border-black px-3 py-2 shadow-neo-sm rotate-3">
              <span className="font-black text-xs uppercase tracking-widest">Open to Work</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-bold text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} strokeWidth={3} />
        </div>
      </div>

      
    </section>
  );
}
