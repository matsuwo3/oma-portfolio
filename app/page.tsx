import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Works } from "@/components/sections/Works";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MorphingBlob } from "@/components/ui/MorphingBlob";
import { getWorks, getBlogPosts } from "@/lib/microcms";

export default async function Home() {
  const [works, posts] = await Promise.all([getWorks(), getBlogPosts()]);

  return (
    <>
      <ScrollProgress />
      <MorphingBlob />
      <Nav />
      <main>
        <Hero />
        <About />
        <Works works={works} />
        <Blog posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
