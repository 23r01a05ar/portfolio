"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";
import type { Story } from "@/types";

export default function StoriesSection() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("stories")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setStories(data);
        setLoading(false);
      });
  }, []);

  if (!loading && stories.length === 0) return null;

  return (
    <section id="stories" className="py-24 bg-neo-dark border-b-4 border-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-block border-4 border-neo-muted px-4 py-2 mb-4 shadow-[6px_6px_0px_0px_#C4B5FD]">
              <span className="font-black text-xs uppercase tracking-widest text-neo-muted">Stories & Blog</span>
            </div>
            <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none text-white">
              MY{" "}
              <span className="text-stroke-white">STORIES</span>
            </h2>
          </div>
          <Link
            href="/stories"
            className="neo-btn bg-neo-secondary text-black shadow-[6px_6px_0px_0px_#fff] hover:shadow-[8px_8px_0px_0px_#fff] self-start sm:self-auto"
          >
            All Stories <ArrowRight size={16} strokeWidth={3} className="ml-2" />
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border-4 border-white h-64 animate-pulse bg-gray-800" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((story, i) => (
              <Link
                key={story.id}
                href={`/stories/${story.id}`}
                className="group border-4 border-white bg-neo-bg shadow-[8px_8px_0px_0px_#FFD93D] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#FFD93D] transition-all duration-200 block"
                style={{ transform: `rotate(${i % 2 === 0 ? "0.3" : "-0.3"}deg)` }}
              >
                {story.image_url ? (
                  <div className="relative h-48 border-b-4 border-black overflow-hidden">
                    <Image
                      src={story.image_url}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className={`h-48 border-b-4 border-black flex items-center justify-center ${i % 3 === 0 ? "bg-neo-accent" : i % 3 === 1 ? "bg-neo-secondary" : "bg-neo-muted"}`}>
                    <BookOpen size={40} strokeWidth={2} />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={12} strokeWidth={3} />
                    <span className="font-bold text-xs uppercase tracking-wider">
                      
                    </span>
                  </div>
                  <h3 className="font-black text-lg uppercase tracking-tight leading-tight group-hover:underline">
                    {story.title}
                  </h3>
                  <p className="font-bold text-sm text-gray-600 mt-2 line-clamp-2">{story.content.slice(0, 100)}…</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
