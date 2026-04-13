import { Mail, Github, Linkedin, Phone, MapPin, Send } from "lucide-react";
import { portfolioData } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-neo-bg border-b-4 border-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block border-4 border-black bg-neo-accent px-4 py-2 mb-4 shadow-neo-sm rotate-1">
            <span className="font-black text-xs uppercase tracking-widest">Let&apos;s Connect</span>
          </div>
          <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
            GET IN{" "}
            <span className="text-stroke">TOUCH</span>
          </h2>
          <p className="font-bold text-lg mt-4 max-w-xl mx-auto">
            Open to internship opportunities, collaborations, and interesting projects. Let&apos;s build something great.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact info */}
          <div className="space-y-4">
            <a
              href={`mailto:${portfolioData.email}`}
              className="flex items-center gap-4 border-4 border-black bg-white shadow-neo-md p-5 hover:-translate-y-1 hover:shadow-neo-lg hover:bg-neo-accent group transition-all duration-200"
            >
              <div className="border-4 border-black bg-neo-accent group-hover:bg-white p-3 shadow-neo-sm transition-colors">
                <Mail size={24} strokeWidth={3} />
              </div>
              <div>
                <div className="font-black text-xs uppercase tracking-widest mb-1">Email</div>
                <div className="font-bold text-sm">{portfolioData.email}</div>
              </div>
            </a>

            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border-4 border-black bg-white shadow-neo-md p-5 hover:-translate-y-1 hover:shadow-neo-lg hover:bg-neo-secondary group transition-all duration-200"
            >
              <div className="border-4 border-black bg-neo-secondary group-hover:bg-white p-3 shadow-neo-sm transition-colors">
                <Linkedin size={24} strokeWidth={3} />
              </div>
              <div>
                <div className="font-black text-xs uppercase tracking-widest mb-1">LinkedIn</div>
                <div className="font-bold text-sm">kanchumarthi-sai-sri-vallabha</div>
              </div>
            </a>

            <a
              href={portfolioData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border-4 border-black bg-white shadow-neo-md p-5 hover:-translate-y-1 hover:shadow-neo-lg hover:bg-neo-muted group transition-all duration-200"
            >
              <div className="border-4 border-black bg-neo-muted group-hover:bg-white p-3 shadow-neo-sm transition-colors">
                <Github size={24} strokeWidth={3} />
              </div>
              <div>
                <div className="font-black text-xs uppercase tracking-widest mb-1">GitHub</div>
                <div className="font-bold text-sm">github.com/23r01a05ar</div>
              </div>
            </a>

            <div className="flex items-center gap-4 border-4 border-black bg-white shadow-neo-md p-5">
              <div className="border-4 border-black bg-neo-bg p-3 shadow-neo-sm">
                <Phone size={24} strokeWidth={3} />
              </div>
              <div>
                <div className="font-black text-xs uppercase tracking-widest mb-1">Phone</div>
                <div className="font-bold text-sm">{portfolioData.phone}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-4 border-black bg-white shadow-neo-md p-5">
              <div className="border-4 border-black bg-neo-bg p-3 shadow-neo-sm">
                <MapPin size={24} strokeWidth={3} />
              </div>
              <div>
                <div className="font-black text-xs uppercase tracking-widest mb-1">Location</div>
                <div className="font-bold text-sm">{portfolioData.location}</div>
              </div>
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="border-4 border-black bg-neo-dark shadow-neo-xl p-8 rotate-1">
            <div className="text-white">
              <h3 className="font-black text-3xl uppercase tracking-tight mb-4">
                Hire Me for Summer 2026 Internship
              </h3>
              <p className="font-bold text-base leading-relaxed mb-6 text-gray-300">
                Looking for summer internship opportunities (May–July 2026) in Android development, full-stack engineering, cloud AI, or research at IITs/industry.
              </p>
              <div className="space-y-3 mb-8">
                {["Android (Kotlin + Jetpack Compose)", "Full Stack (React + Flask + Node)", "Cloud AI (GCP + Vertex AI + Gemini)", "ML & RAG Pipelines"].map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-neo-secondary border-2 border-white" />
                    <span className="font-bold text-sm">{skill}</span>
                  </div>
                ))}
              </div>
              <a
                href={`mailto:${portfolioData.email}?subject=Internship%20Opportunity%20for%20Vallabha`}
                className="neo-btn bg-neo-accent text-black shadow-[6px_6px_0px_0px_#FFD93D] hover:shadow-[8px_8px_0px_0px_#FFD93D] w-full justify-center text-base py-4"
              >
                <Send size={18} strokeWidth={3} className="mr-2" />
                Send an Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
