import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = "https://oma-pj.com";

export const metadata: Metadata = {
  title: "お問い合わせ｜おま 伴走型医療マーケター",
  description:
    "医療機関の集患戦略、現場改善の仕組みづくり、プロダクト開発などお気軽にご相談ください。伴走型医療マーケター「おま」へのお問い合わせ。",
  alternates: {
    canonical: `${SITE_URL}/contact/`,
  },
  openGraph: {
    type: "website",
    title: "お問い合わせ｜おま 伴走型医療マーケター",
    description:
      "医療機関の集患戦略、現場改善の仕組みづくり、プロダクト開発などお気軽にご相談ください。",
    url: `${SITE_URL}/contact/`,
    siteName: "おま｜伴走型医療マーケター",
  },
};

const snsLinks = [
  {
    label: "note",
    href: "https://note.com/nakanto_survey",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4H16V16H4V4Z" />
        <path d="M7 8H13" />
        <path d="M7 11H11" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/nakahito_survey",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11.47 8.77L17.3 2H15.78L10.8 7.82L6.85 2H2L8.1 11.01L2 18.17H3.52L8.77 11.96L12.95 18.17H17.8L11.47 8.77ZM9.54 11.09L8.86 10.15L4.06 3.1H6.12L10.14 8.72L10.82 9.66L15.78 17.11H13.72L9.54 11.09Z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen px-6 pt-28 pb-24">
        <div className="mx-auto w-full max-w-5xl">
          {/* Header */}
          <div className="border-t border-black/[0.08] pt-8">
            <span className="section-label-lg block">CONTACT</span>
            <span className="mt-1 block text-sm text-text-secondary md:text-base">
              お仕事のご相談
            </span>
          </div>

          <div className="mt-12 max-w-2xl">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
              お問い合わせ
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary md:text-base">
              医療機関の集患戦略、現場改善の仕組みづくり、
              プロダクト開発などお気軽にご相談ください。
            </p>

            {/* Google Form CTA */}
            <div className="mt-10">
              <a
                href="https://forms.gle/4wXRSkuxtGMcBwk78"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-16 w-full items-center justify-center gap-2.5 rounded-full bg-text-primary px-12 text-base font-semibold text-white transition-opacity hover:opacity-80 sm:w-auto"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4H16V16H4V4Z" />
                  <path d="M7 8H13" />
                  <path d="M7 11H13" />
                  <path d="M7 14H10" />
                </svg>
                お問い合わせフォーム
              </a>
            </div>

            {/* SNS Links */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              {snsLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-black/10 px-8 text-sm font-semibold text-text-primary transition-colors hover:bg-black/[0.03] sm:w-auto md:text-base"
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
