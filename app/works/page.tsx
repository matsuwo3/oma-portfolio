import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getWorks } from "@/lib/microcms";
import { WorksGrid } from "@/components/sections/WorksGrid";

const SITE_URL = "https://oma-pj.com";

export const metadata: Metadata = {
  title: "実績・プロダクト｜おま 伴走型医療マーケター",
  description:
    "伴走型医療マーケター「おま」の実績・プロダクト一覧。Webアプリ、HP制作、モバイルアプリなど。",
  alternates: {
    canonical: `${SITE_URL}/works/`,
  },
  openGraph: {
    type: "website",
    title: "実績・プロダクト｜おま 伴走型医療マーケター",
    description:
      "伴走型医療マーケター「おま」の実績・プロダクト一覧。",
    url: `${SITE_URL}/works/`,
    siteName: "おま｜伴走型医療マーケター",
  },
};

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <>
      <Nav />
      <main className="min-h-screen px-6 pt-28 pb-24">
        <div className="mx-auto w-full max-w-5xl">
          {/* Header */}
          <div className="border-t border-black/[0.08] pt-8">
            <span className="section-label-lg block">WORKS</span>
            <span className="mt-1 block text-sm text-text-secondary md:text-base">
              実績・プロダクト
            </span>
          </div>

          {/* Works Grid (reuse existing client component) */}
          <WorksGrid works={works} />
        </div>
      </main>
      <Footer />
    </>
  );
}
