"use client";
import { useState, useEffect } from "react";
import { Award, FileText, Download, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { portfolioData } from "@/lib/data";
import { format } from "date-fns";
import type { Certificate } from "@/types";

export default function Certifications() {
  const [dbCerts, setDbCerts] = useState<Certificate[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setDbCerts(data); });
  }, []);

  return (
    <section id="certifications" className="py-24 bg-neo-bg border-b-4 border-black relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-light pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-block border-4 border-black bg-neo-accent px-4 py-2 mb-4 shadow-neo-sm rotate-1">
            <span className="font-black text-xs uppercase tracking-widest text-white">Credentials</span>
          </div>
          <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
            CERTIFI-<br />
            <span className="text-stroke">CATIONS</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Static certs from resume */}
          {portfolioData.certifications.map((cert, i) => (
            <div
              key={cert.title}
              className="neo-card bg-white"
              style={{ transform: `rotate(${i % 3 === 0 ? "0.5" : i % 3 === 1 ? "-0.5" : "0"}deg)` }}
            >
              <div className="bg-neo-secondary border-b-4 border-black px-5 py-3 flex items-center gap-2">
                <Award size={16} strokeWidth={3} />
                <span className="font-black text-xs uppercase tracking-widest truncate">{cert.issuer}</span>
              </div>
              <div className="p-5">
                <h3 className="font-black text-sm uppercase tracking-tight leading-tight mb-2">{cert.title}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="border-2 border-black px-2 py-0.5 font-bold text-xs uppercase">{cert.year}</span>
                </div>
              </div>
            </div>
          ))}

          {/* DB certs (uploaded by admin) */}
          {dbCerts.map((cert) => (
            <div key={cert.id} className="neo-card bg-white">
              <div className="bg-neo-accent border-b-4 border-black px-5 py-3 flex items-center gap-2">
                <FileText size={16} strokeWidth={3} />
                <span className="font-black text-xs uppercase tracking-widest truncate">{cert.issuer}</span>
              </div>
              <div className="p-5">
                <h3 className="font-black text-sm uppercase tracking-tight leading-tight mb-2">{cert.title}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="border-2 border-black px-2 py-0.5 font-bold text-xs uppercase">
                    {cert.date}
                  </span>
                  {cert.file_url && (
                    <a
                      href={cert.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 border-2 border-black px-2 py-1 font-bold text-xs uppercase hover:bg-neo-secondary transition-colors"
                    >
                      <Download size={12} strokeWidth={3} />
                      View
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
