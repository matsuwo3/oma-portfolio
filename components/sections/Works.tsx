import Link from "next/link";
import type { Work } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ParallaxDot } from "@/components/ui/ParallaxDot";
import { WorksGrid } from "./WorksGrid";

type Props = {
  works: Work[];
};

export function Works({ works }: Props) {
  return (
    <section id="works" className="relative bg-bg-warm px-6 py-24 md:py-32">
      {/* Floating dots with parallax */}
      <ParallaxDot className="absolute top-20 right-[8%] hidden h-5 w-5 bg-accent-orange opacity-40 md:block" speed={0.15} />
      <ParallaxDot className="absolute bottom-32 left-[6%] hidden h-3 w-3 border-2 border-accent-blue opacity-30 md:block" speed={-0.1} alt />

      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader label="WORKS" subtitle="実績・プロダクト" />
        <WorksGrid works={works} />

        {/* CTA to /works/ */}
        <div className="mt-10">
          <Link
            href="/works/"
            className="inline-flex h-14 items-center gap-2 rounded-full border border-black/10 px-10 text-sm font-semibold text-text-primary transition-colors hover:bg-black/[0.03] md:text-base"
          >
            実績をすべて見る
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
