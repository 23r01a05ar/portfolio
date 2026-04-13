"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Image as ImageIcon, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { GalleryItem } from "@/types";

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setItems(data);
        setLoading(false);
      });
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <>
      <section id="gallery" className="py-24 bg-neo-secondary border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-light pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-block border-4 border-black bg-white px-4 py-2 mb-4 shadow-neo-sm -rotate-1">
              <span className="font-black text-xs uppercase tracking-widest">Behind the Scenes</span>
            </div>
            <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              EXTRA-CURRIC<br />
              <span className="text-stroke">GALLERY</span>
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="border-4 border-black h-48 animate-pulse bg-yellow-300" />
              ))}
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className="break-inside-avoid border-4 border-black shadow-neo-sm hover:-translate-y-1 hover:shadow-neo-md transition-all duration-200 cursor-pointer overflow-hidden"
                  style={{ transform: `rotate(${i % 3 === 0 ? "0.5" : i % 3 === 1 ? "-0.5" : "0"}deg)` }}
                  onClick={() => setLightbox(item)}
                >
                  <div className="relative">
                    <Image
                      src={item.image_url}
                      alt={item.caption || "Gallery image"}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {item.caption && (
                    <div className="border-t-4 border-black bg-white px-3 py-2">
                      <p className="font-bold text-xs uppercase tracking-wider">{item.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 border-4 border-white p-2 bg-neo-accent hover:bg-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={24} strokeWidth={3} />
          </button>
          <div
            className="border-4 border-white shadow-[12px_12px_0px_0px_#FFD93D] max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.image_url}
              alt={lightbox.caption || ""}
              width={900}
              height={600}
              className="w-full h-auto object-contain"
            />
            {lightbox.caption && (
              <div className="border-t-4 border-white bg-neo-bg px-6 py-3">
                <p className="font-black text-sm uppercase tracking-wider">{lightbox.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
