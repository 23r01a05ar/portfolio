import { Briefcase, MapPin, Calendar } from "lucide-react";
import { portfolioData } from "@/lib/data";

const colors = ["bg-neo-accent", "bg-neo-secondary", "bg-neo-muted"];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-neo-muted border-b-4 border-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block border-4 border-black bg-white px-4 py-2 mb-4 shadow-neo-sm rotate-1">
            <span className="font-black text-xs uppercase tracking-widest">Work History</span>
          </div>
          <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
            EXPERI-<br />
            <span className="text-stroke">ENCE</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-black hidden md:block" />

          <div className="space-y-8">
            {portfolioData.experience.map((exp, i) => (
              <div key={exp.role + exp.company} className="relative md:pl-24">
                {/* Timeline dot */}
                <div className={`absolute left-5 top-6 w-7 h-7 border-4 border-black ${colors[i % 3]} hidden md:block shadow-neo-sm`} />

                <div
                  className="border-4 border-black bg-white shadow-neo-md hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-200"
                >
                  {/* Card header */}
                  <div className={`${colors[i % 3]} border-b-4 border-black px-6 py-4`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-black text-xl uppercase tracking-tight">{exp.role}</h3>
                        <div className="font-bold text-sm mt-1">{exp.company} — {exp.project}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 border-2 border-black bg-white px-2 py-1">
                          <Calendar size={12} strokeWidth={3} />
                          <span className="font-black text-xs uppercase tracking-wider">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={12} strokeWidth={3} />
                          <span className="font-bold text-xs uppercase tracking-wider">{exp.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-6 py-5">
                    <p className="font-bold text-sm leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="border-2 border-black bg-neo-bg px-2 py-1 font-bold text-xs uppercase tracking-wider">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
