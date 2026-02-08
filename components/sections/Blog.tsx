import type { BlogPost } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ParallaxDot } from "@/components/ui/ParallaxDot";
import { BlogGrid } from "./BlogGrid";

type Props = {
  posts: BlogPost[];
};

export function Blog({ posts }: Props) {
  return (
    <section id="blog" className="relative overflow-hidden px-6 py-24 md:py-32">
      {/* Floating dot with parallax */}
      <ParallaxDot
        className="absolute bottom-20 right-[12%] hidden h-4 w-4 bg-accent-teal opacity-50 md:block"
        speed={-0.1}
        alt
      />

      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader label="BLOG" subtitle="ナレッジ発信" />
        <BlogGrid posts={posts} />
      </div>
    </section>
  );
}
