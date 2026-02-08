import type { Work } from "@/lib/types";
import { WorksGrid } from "./WorksGrid";

type Props = {
  works: Work[];
};

export function Works({ works }: Props) {
  return (
    <section id="works" className="px-6 py-24 md:py-32">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-center text-sm font-semibold tracking-wider text-accent-blue">
          WORKS
        </p>
        <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
          実績・プロダクト
        </h2>
        <WorksGrid works={works} />
      </div>
    </section>
  );
}
