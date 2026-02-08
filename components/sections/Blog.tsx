import type { BlogPost } from "@/lib/types";

type Props = {
  posts: BlogPost[];
};

export function Blog({ posts }: Props) {
  return (
    <section id="blog" className="px-6 py-24 md:py-32">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-center text-sm font-semibold tracking-wider text-accent-blue">
          BLOG
        </p>
        <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
          ナレッジ発信
        </h2>

        {/* Articles */}
        <div className="mt-10 grid gap-4">
          {posts.map((post) => {
            const cat = post.category[0] ?? "";
            return (
              <a
                key={post.id}
                href={post.noteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 overflow-hidden rounded-2xl bg-white p-5 shadow-sm shadow-black/[0.04] transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-teal/10 text-accent-teal">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4H16V16H4V4Z" />
                    <path d="M7 8H13" />
                    <path d="M7 11H11" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-text-primary group-hover:text-accent-blue md:text-base">
                    {post.title}
                  </h3>
                  {cat && (
                    <span className="mt-1 inline-block text-xs text-text-secondary">
                      {cat}
                    </span>
                  )}
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0 text-text-secondary/40 transition-colors group-hover:text-accent-blue"
                >
                  <path
                    d="M4 12L12 4M12 4H6M12 4V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            );
          })}
        </div>

        {/* Note CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://note.com/nakanto_survey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue transition-opacity hover:opacity-70"
          >
            noteで全記事を見る
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
