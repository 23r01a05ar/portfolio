import { MapPin, GraduationCap, Trophy } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-24 bg-neo-secondary border-y-4 border-black relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-light pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <div className="inline-block border-4 border-black bg-neo-dark text-white px-4 py-2 mb-6 shadow-neo-sm">
              <span className="font-black text-xs uppercase tracking-widest">About Me</span>
            </div>
            <h2 className="font-black text-5xl md:text-6xl uppercase tracking-tight mb-6 leading-none">
              THE<br />
              <span className="text-stroke">BUILDER</span>
            </h2>
            {portfolioData.longBio.split("\n\n").map((para, i) => (
              <p key={i} className="font-bold text-base md:text-lg leading-relaxed mb-4">
                {para}
              </p>
            ))}

            <div className="flex flex-wrap gap-3 mt-6">
              <div className="flex items-center gap-2 border-4 border-black bg-white px-4 py-2 shadow-neo-sm">
                <MapPin size={16} strokeWidth={3} />
                <span className="font-bold text-sm uppercase tracking-wider">{portfolioData.location}</span>
              </div>
              <div className="flex items-center gap-2 border-4 border-black bg-white px-4 py-2 shadow-neo-sm">
                <GraduationCap size={16} strokeWidth={3} />
                <span className="font-bold text-sm uppercase tracking-wider">CMRIT 2027</span>
              </div>
            </div>
          </div>

          {/* Right: Education + Achievements */}
          <div className="space-y-6">
            {/* Education card */}
            <div className="border-4 border-black bg-white shadow-neo-md">
              <div className="border-b-4 border-black bg-neo-muted px-6 py-3 flex items-center gap-3">
                <GraduationCap size={20} strokeWidth={3} />
                <span className="font-black text-sm uppercase tracking-widest">Education</span>
              </div>
              <div className="p-6">
                <div className="font-black text-xl uppercase tracking-tight">{portfolioData.education.degree}</div>
                <div className="font-bold text-lg mt-1">{portfolioData.education.institution}</div>
                <div className="flex gap-4 mt-3">
                  <span className="border-2 border-black px-3 py-1 font-bold text-xs uppercase tracking-wider">
                    {portfolioData.education.period}
                  </span>
                  <span className="border-2 border-black px-3 py-1 font-bold text-xs uppercase tracking-wider bg-neo-accent">
                    Roll: {portfolioData.education.rollNo}
                  </span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="border-4 border-black bg-white shadow-neo-md">
              <div className="border-b-4 border-black bg-neo-accent px-6 py-3 flex items-center gap-3">
                <Trophy size={20} strokeWidth={3} />
                <span className="font-black text-sm uppercase tracking-widest">Achievements</span>
              </div>
              <div className="divide-y-4 divide-black">
                {portfolioData.achievements.map((ach) => (
                  <div key={ach.title} className="px-6 py-4 flex items-start gap-4 hover:bg-neo-bg transition-colors">
                    <span className="text-2xl">{ach.icon}</span>
                    <div>
                      <div className="font-black text-sm uppercase tracking-tight">{ach.title}</div>
                      <div className="font-bold text-xs text-gray-600 mt-0.5">{ach.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
