import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import type { Story } from "@/types";

export const revalidate = 60;

export default async function StoriesPage() {
  const supabase = await createClient();
  const { data: stories } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-neo-bg">
      {/* Header */}
      <div className="border-b-4 border-black bg-neo-dark py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-4 border-white text-white px-4 py-2 font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors mb-8"
          >
            <ArrowLeft size={16} strokeWidth={3} />
            Back
          </Link>
          <h1 className="font-black text-6xl md:text-8xl uppercase tracking-tighter text-white leading-none">
            MY <span className="text-stroke-white">STORIES</span>
          </h1>
          <p className="font-bold text-lg text-gray-300 mt-4">
            Thoughts, experiences, and behind-the-scenes from my journey as a developer.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {!stories || stories.length === 0 ? (
          <div className="text-center border-4 border-black py-24 bg-white shadow-neo-md">
            <BookOpen size={48} strokeWidth={2} className="mx-auto mb-4" />
            <h2 className="font-black text-3xl uppercase tracking-tight">No Stories Yet</h2>
            <p className="font-bold mt-2 text-gray-600">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(stories as Story[]).map((story, i) => (
              <Link
                key={story.id}
                href={`/stories/${story.id}`}
                className="group neo-card bg-white block"
                style={{ transform: `rotate(${i % 3 === 0 ? "0.4" : i % 3 === 1 ? "-0.4" : "0"}deg)` }}
              >
                {story.image_url ? (
                  <div className="relative h-52 border-b-4 border-black overflow-hidden">
                    <Image
                      src={story.image_url}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className={`h-52 border-b-4 border-black flex items-center justify-center ${
                    i % 3 === 0 ? "bg-neo-accent" : i % 3 === 1 ? "bg-neo-secondary" : "bg-neo-muted"
                  }`}>
                    <BookOpen size={48} strokeWidth={2} />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={12} strokeWidth={3} />
                    <span className="font-bold text-xs uppercase tracking-wider">
                      {format(new Date(story.created_at), "MMM d, yyyy")}
                    </span>
                  </div>
                  <h2 className="font-black text-xl uppercase tracking-tight leading-tight group-hover:underline mb-2">
                    {story.title}
                  </h2>
                  <p className="font-bold text-sm text-gray-600 line-clamp-3">
                    {story.content.slice(0, 150)}…
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
