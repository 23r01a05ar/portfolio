"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, Github, Linkedin, Mail, Star, Zap, User } from "lucide-react";
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

          {/* Right: Rotating Photo / Stats card */}
          <HeroRightPanel />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-bold text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} strokeWidth={3} />
        </div>
      </div>

    </section>
  );
}

// ─── Rotating Photo / Stats Panel ───────────────────────────────────────────

function HeroRightPanel() {
  const [showPhoto, setShowPhoto] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out → swap → fade in
      setVisible(false);
      setTimeout(() => {
        setShowPhoto((prev) => !prev);
        setVisible(true);
      }, 400);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hidden lg:block">
      {/* Progress bar — shows which panel is active */}
      <div className="absolute -top-8 left-0 right-0 flex gap-2 items-center">
        <div
          className={`h-1.5 flex-1 border-2 border-black transition-colors duration-300 ${showPhoto ? "bg-neo-accent" : "bg-black/20"}`}
        />
        <span className="font-black text-xs uppercase tracking-widest">
          {showPhoto ? "Profile" : "Stats"}
        </span>
        <div
          className={`h-1.5 flex-1 border-2 border-black transition-colors duration-300 ${!showPhoto ? "bg-neo-secondary" : "bg-black/20"}`}
        />
      </div>

      {/* Card — fades between photo and stats */}
      <div
        className="border-4 border-black bg-white shadow-neo-xl rotate-1 overflow-hidden transition-opacity duration-400"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        {showPhoto ? <PhotoPanel /> : <StatsPanel />}
      </div>

      {/* Overlapping badge */}
      <div className="absolute -top-4 -right-4 bg-neo-accent border-4 border-black px-3 py-2 shadow-neo-sm rotate-3 z-10">
        <span className="font-black text-xs uppercase tracking-widest">Open to Work</span>
      </div>
    </div>
  );
}

function PhotoPanel() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col items-center p-6">
      {/* Photo frame */}
      <div className="relative w-56 h-56 border-4 border-black shadow-neo-md overflow-hidden bg-neo-muted mb-5">
        {imgError ? (
          /* Fallback — only shown if image fails to load */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neo-muted">
            <User size={64} strokeWidth={1.5} className="text-black/40" />
            <span className="font-black text-xs uppercase tracking-widest mt-3 text-black/40">
              Photo not found
            </span>
          </div>
        ) : (
          <Image
            src="/PFP.png"
            alt="Kanchumarthi Sai Sri Vallabha"
            fill
            className="object-cover object-top"
            onError={() => setImgError(true)}
            priority
          />
        )}
      </div>

      {/* Name + title */}
      <div className="text-center border-4 border-black bg-neo-bg w-full p-4 shadow-neo-sm">
        <div className="font-black text-xl uppercase tracking-tight leading-tight">
          Vallabha
        </div>
        <div className="font-bold text-sm mt-1 text-gray-600">
          Kanchumarthi Sai Sri Vallabha
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {["Android", "Full Stack", "Cloud AI"].map((tag, i) => (
            <span
              key={tag}
              className={`border-2 border-black px-2 py-0.5 font-black text-xs uppercase tracking-wider ${
                i === 0 ? "bg-neo-accent" : i === 1 ? "bg-neo-secondary" : "bg-neo-muted"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Location + college */}
      <div className="w-full mt-3 grid grid-cols-2 gap-2">
        <div className="border-4 border-black bg-neo-dark text-white p-3 text-center">
          <div className="font-black text-xs uppercase tracking-widest">Based in</div>
          <div className="font-bold text-sm mt-0.5">Hyderabad</div>
        </div>
        <div className="border-4 border-black bg-neo-secondary p-3 text-center">
          <div className="font-black text-xs uppercase tracking-widest">College</div>
          <div className="font-bold text-sm mt-0.5">CMRIT '27</div>
        </div>
      </div>
    </div>
  );
}

function StatsPanel() {
  return (
    <div className="p-8">
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
  );
}
