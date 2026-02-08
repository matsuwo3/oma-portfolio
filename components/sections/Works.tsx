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
      </div>
    </section>
  );
}
