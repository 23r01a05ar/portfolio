import { Github, ExternalLink, Star, Trophy } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-neo-dark border-b-4 border-black relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block border-4 border-neo-secondary px-4 py-2 mb-4 shadow-[6px_6px_0px_0px_#FFD93D]">
            <span className="font-black text-xs uppercase tracking-widest text-neo-secondary">Featured Work</span>
          </div>
          <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none text-white">
            MY{" "}
            <span className="text-stroke-white">PROJECTS</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, i) => (
            <div
              key={project.title}
              className="border-4 border-white bg-neo-bg shadow-[8px_8px_0px_0px_#FFD93D] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#FFD93D] transition-all duration-200"
              style={{ transform: `rotate(${i % 2 === 0 ? "0.3" : "-0.3"}deg)` }}
            >
              {/* Card top color strip */}
              <div className={`border-b-4 border-black h-3 ${i % 4 === 0 ? "bg-neo-accent" : i % 4 === 1 ? "bg-neo-secondary" : i % 4 === 2 ? "bg-neo-muted" : "bg-neo-accent"}`} />

              <div className="p-6">
                {/* Title row */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-black text-xl uppercase tracking-tight leading-tight">{project.title}</h3>
                  {project.award && (
                    <div className="flex-shrink-0 flex items-center gap-1 border-2 border-black bg-neo-secondary px-2 py-1">
                      <Trophy size={12} strokeWidth={3} />
                      <span className="font-black text-xs uppercase">Win</span>
                    </div>
                  )}
                </div>

                {project.award && (
                  <div className="flex items-center gap-2 mb-3 border-l-4 border-neo-accent pl-3">
                    <Star size={12} strokeWidth={3} className="fill-neo-accent text-neo-accent" />
                    <span className="font-bold text-xs text-neo-accent uppercase tracking-wider">{project.award}</span>
                  </div>
                )}

                <p className="font-bold text-sm leading-relaxed mb-4 text-gray-700">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="border-2 border-black bg-neo-bg px-2 py-0.5 font-black text-xs uppercase tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn bg-neo-dark text-white shadow-neo-sm text-xs py-2 px-4"
                    >
                      <Github size={14} strokeWidth={3} className="mr-1.5" />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn bg-neo-accent text-black shadow-neo-sm text-xs py-2 px-4"
                    >
                      <ExternalLink size={14} strokeWidth={3} className="mr-1.5" />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More on GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn bg-neo-secondary text-black shadow-[6px_6px_0px_0px_#fff] hover:shadow-[8px_8px_0px_0px_#fff] text-base px-8 py-4 inline-flex items-center gap-3"
          >
            <Github size={20} strokeWidth={3} />
            View All on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
