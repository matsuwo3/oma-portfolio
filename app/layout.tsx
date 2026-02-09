import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "おま｜伴走型医療マーケター",
  description:
    "医療機関の集患と現場改善を伴走支援。戦略設計から現場が迷わず動ける仕組みづくりまで、美容医療に特化した伴走型マーケティング支援。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M6W4W54P');`,
          }}
        />
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "おま",
              jobTitle: "伴走型医療マーケター",
              description:
                "広告代理店、大手美容外科マーケティング統括、外資コンサルを経て独立。累計30院の医療機関マーケティングを支援",
              url: "https://oma-pj.com/about/",
              sameAs: [
                "https://note.com/nakanto_survey",
                "https://x.com/oma_and_and",
              ],
              knowsAbout: [
                "美容クリニックマーケティング",
                "医療広告ガイドライン",
                "デジタルマーケティング",
                "SEO",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${notoSansJP.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M6W4W54P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
