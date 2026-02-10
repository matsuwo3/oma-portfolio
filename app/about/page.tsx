import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = "https://oma-pj.com";

export const metadata: Metadata = {
  title: "おまについて｜伴走型医療マーケター",
  description:
    "広告代理店、大手美容外科マーケティング統括、外資コンサルを経て独立。累計30院以上の医療機関マーケティングを支援する伴走型医療マーケター「おま」のプロフィール。",
  alternates: {
    canonical: `${SITE_URL}/about/`,
  },
  openGraph: {
    type: "profile",
    title: "おまについて｜伴走型医療マーケター",
    description:
      "広告代理店、大手美容外科マーケティング統括、外資コンサルを経て独立。累計30院以上の医療機関マーケティングを支援。",
    url: `${SITE_URL}/about/`,
    siteName: "おま｜伴走型医療マーケター",
  },
};

const timeline = [
  {
    period: "Phase 1",
    title: "WEB広告代理店",
    role: "ストラテジックプランニング＆運用",
    description:
      "従業員数100名超のWEB広告代理店にてストラテジックプランニングと制作、運用を担当。",
    accent: "bg-accent-blue",
    accentText: "text-accent-blue",
  },
  {
    period: "Phase 2",
    title: "大手美容外科",
    role: "マーケティング統括",
    description:
      "年間売上900億円規模の大手美容外科グループにてマーケティング統括。全国100院以上の広告戦略を統括し、月間広告費5億円を運用。",
    accent: "bg-accent-orange",
    accentText: "text-accent-orange",
  },
  {
    period: "Phase 3",
    title: "外資コンサルティングファーム",
    role: "リブランディング",
    description:
      "外資系コンサルティングファームにて会社のリブランディングプロジェクトに従事。",
    accent: "bg-accent-violet",
    accentText: "text-accent-violet",
  },
  {
    period: "Phase 4",
    title: "独立",
    role: "広告代理店 取締役 / エステサロン運営",
    description:
      "独立後、広告代理店の取締役を務めながらエステサロンを運営。累計30院の美容クリニック・歯科医院のマーケティングを支援。年間広告運用額は50億円。",
    accent: "bg-accent-teal",
    accentText: "text-accent-teal",
  },
];

const achievements = [
  { value: "30+", label: "支援クリニック数" },
  { value: "50億円", label: "年間広告運用額" },
  { value: "100+", label: "統括経験院数" },
  { value: "8+", label: "業界経験年数" },
];

const expertise = [
  "医療広告コンプライアンス",
  "美容クリニック集患戦略",
  "デジタルマーケティング",
  "SEO / MEO",
  "CRM / MA構築",
  "データ分析",
];

const skills = [
  "Google Ads",
  "LINE Ads",
  "TikTok Ads",
  "Meta Ads",
  "SEO / MEO",
  "CRM / MA",
  "Python",
  "SQL / BigQuery",
  "Next.js",
  "React",
  "AI / LLM",
  "Figma",
];

const industries = [
  "クリニック",
  "歯科",
  "整体・エステ",
  "人材派遣",
  "百貨店・小売",
  "自動車",
  "不動産",
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "おま",
      jobTitle: "伴走型医療マーケター",
      description:
        "広告代理店、大手美容外科マーケティング統括、外資コンサルを経て独立。累計30院の医療機関マーケティングを支援",
      url: `${SITE_URL}/about/`,
      sameAs: [
        "https://note.com/nakanto_survey",
        "https://x.com/nakahito_survey",
      ],
      worksFor: {
        "@type": "Organization",
        name: "株式会社Zangle",
        url: "https://zangle.co.jp",
      },
      knowsAbout: [
        "美容クリニックマーケティング",
        "医療広告ガイドライン",
        "デジタルマーケティング",
        "SEO",
        "広告運用",
        "CRM",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="min-h-screen px-6 pt-28 pb-24">
        <div className="mx-auto w-full max-w-5xl">
          {/* Header */}
          <div className="border-t border-black/[0.08] pt-8">
            <span className="section-label-lg block">ABOUT</span>
            <span className="mt-1 block text-sm text-text-secondary md:text-base">
              おまについて
            </span>
          </div>

          {/* Profile */}
          <div className="mt-12">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary md:text-4xl">
              おま
            </h1>
            <p className="mt-2 text-lg font-medium text-text-secondary md:text-xl">
              伴走型医療マーケター
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
              データと現場の両輪で、事業成長を加速させる。
              定量・定性調査に加え、顧客インタビューや現場視察で生の声を掴みにいく。
              戦略設計からLP制作・広告運用・CRM導入まで一気通貫。
              必要なら何でもやる伴走型の支援スタイルで、事業フェーズに合わせた成長を実現します。
            </p>
          </div>

          {/* Achievements */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {achievements.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white p-6 shadow-sm shadow-black/[0.04]"
              >
                <p className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-text-secondary md:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Career Timeline */}
          <div className="mt-20">
            <p className="mb-6 text-xs font-semibold tracking-wider text-text-secondary md:text-sm">
              CAREER
            </p>
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm shadow-black/[0.04]"
                >
                  <div className={`absolute top-0 left-0 h-full w-[3px] ${item.accent}`} />
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
                    <span
                      className={`text-xs font-bold tracking-wider ${item.accentText}`}
                    >
                      {item.period}
                    </span>
                    <h3 className="text-base font-bold text-text-primary md:text-lg">
                      {item.title}
                    </h3>
                    <span className="text-sm text-text-secondary">
                      {item.role}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Expertise */}
          <div className="mt-16">
            <p className="mb-4 text-xs font-semibold tracking-wider text-text-secondary md:text-sm">
              専門領域
            </p>
            <div className="flex flex-wrap gap-2">
              {expertise.map((item) => (
                <span
                  key={item}
                  className="rounded-xl bg-accent-blue/10 px-4 py-2 text-sm font-medium text-accent-blue md:text-base"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-10">
            <p className="mb-4 text-xs font-semibold tracking-wider text-text-secondary md:text-sm">
              SKILLS & TOOLS
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-text-secondary shadow-sm shadow-black/[0.04] md:text-base"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="mt-10">
            <p className="mb-4 text-xs font-semibold tracking-wider text-text-secondary md:text-sm">
              支援業界
            </p>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-xl border border-black/[0.06] bg-white px-4 py-2 text-sm font-medium text-text-primary md:text-base"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 rounded-2xl bg-bg-alt p-8 md:p-12">
            <h2 className="text-xl font-bold tracking-tight text-text-primary md:text-2xl">
              お仕事のご相談はこちら
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-secondary md:text-base">
              医療機関の集患戦略、現場改善の仕組みづくり、プロダクト開発などお気軽にご相談ください。
            </p>
            <div className="mt-6">
              <Link
                href="/contact/"
                className="inline-flex h-14 items-center justify-center rounded-full bg-text-primary px-10 text-sm font-semibold text-white transition-opacity hover:opacity-80 md:text-base"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
