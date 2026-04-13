import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { format } from "date-fns";

export const revalidate = 60;

export default async function StoryPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: story } = await supabase
    .from("stories")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!story) notFound();

  return (
    <main className="min-h-screen bg-neo-bg">
      {/* Header */}
      <div className="border-b-4 border-black bg-neo-dark py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 border-4 border-white text-white px-4 py-2 font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors mb-6"
          >
            <ArrowLeft size={16} strokeWidth={3} /> All Stories
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={14} strokeWidth={3} className="text-neo-secondary" />
            <span className="font-bold text-sm uppercase tracking-widest text-neo-secondary">
              {format(new Date(story.created_at), "MMMM d, yyyy")}
            </span>
          </div>
          <h1 className="font-black text-4xl md:text-6xl uppercase tracking-tighter text-white leading-tight">
            {story.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {story.image_url && (
          <div className="relative h-64 md:h-96 border-4 border-black shadow-neo-xl mb-8">
            <Image
              src={story.image_url}
              alt={story.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="border-4 border-black bg-white shadow-neo-lg p-8 md:p-12">
          <div className="prose max-w-none">
            {story.content.split("\n").map((para: string, i: number) =>
              para ? (
                <p key={i} className="font-bold text-base md:text-lg leading-relaxed mb-4">
                  {para}
                </p>
              ) : <br key={i} />
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/stories"
            className="neo-btn bg-neo-accent text-black shadow-neo-md hover:shadow-neo-lg inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} strokeWidth={3} />
            More Stories
          </Link>
        </div>
      </div>
    </main>
  );
}
