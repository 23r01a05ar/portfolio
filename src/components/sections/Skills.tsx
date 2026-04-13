import { portfolioData } from "@/lib/data";

const categoryColors: Record<string, string> = {
  "Programming Languages": "bg-neo-accent",
  "Mobile Development": "bg-neo-secondary",
  "Web & Backend": "bg-neo-muted",
  "AI & ML": "bg-neo-accent",
  "Cloud & DevOps": "bg-neo-secondary",
  "Databases": "bg-neo-muted",
  "Tools": "bg-white",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-neo-bg border-b-4 border-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block border-4 border-black bg-neo-muted px-4 py-2 mb-4 shadow-neo-sm -rotate-1">
            <span className="font-black text-xs uppercase tracking-widest">Tech Arsenal</span>
          </div>
          <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
            SKILLS &{" "}
            <span className="text-stroke">TOOLS</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(portfolioData.skills).map(([category, skills], i) => {
            const color = categoryColors[category] || "bg-white";
            return (
              <div
                key={category}
                className="neo-card bg-white"
                style={{ transform: `rotate(${i % 2 === 0 ? "0.5" : "-0.5"}deg)` }}
              >
                {/* Card header */}
                <div className={`${color} border-b-4 border-black px-5 py-3`}>
                  <span className="font-black text-xs uppercase tracking-widest">{category}</span>
                </div>
                {/* Skills */}
                <div className="p-5 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="border-2 border-black px-3 py-1 font-bold text-xs uppercase tracking-wider hover:bg-neo-secondary hover:shadow-neo-sm transition-all duration-100 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
