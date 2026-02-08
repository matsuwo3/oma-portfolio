import { useState, useEffect } from "react";

/* ━━ Responsive hook ━━ */
const useWidth = () => {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
};

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Noto+Sans+JP:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  --white: #ffffff;
  --bg: #fafafa;
  --surface: #ffffff;
  --surface-dim: #f2f2f7;
  --text: #1d1d1f;
  --text-2: #6e6e73;
  --text-3: #aeaeb2;
  --accent: #0071e3;
  --accent-bg: #e8f2ff;
  --teal: #30b0c7;
  --teal-bg: #e4f6f9;
  --orange: #f56300;
  --orange-bg: #fff0e6;
  --violet: #8944e7;
  --violet-bg: #f1e8fd;
  --border: #e5e5ea;
  --shadow-sm: 0 1px 4px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.06);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.08);
  --shadow-hover: 0 12px 40px rgba(0,0,0,0.1);
  --radius: 20px;
  --radius-sm: 14px;
  --radius-xs: 10px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Noto Sans JP', 'Plus Jakarta Sans', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}
::selection { background: var(--accent-bg); color: var(--accent); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes float-a {
  0%, 100% { transform: translate(0,0) scale(1); }
  33% { transform: translate(12px,-16px) scale(1.02); }
  66% { transform: translate(-8px,8px) scale(0.98); }
}
@keyframes float-b {
  0%, 100% { transform: translate(0,0) rotate(0deg); }
  50% { transform: translate(-10px,-14px) rotate(6deg); }
}
@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
}
.au { animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) forwards; }
.d1 { animation-delay: 0.06s; opacity: 0; }
.d2 { animation-delay: 0.14s; opacity: 0; }
.d3 { animation-delay: 0.22s; opacity: 0; }
.d4 { animation-delay: 0.3s; opacity: 0; }
.d5 { animation-delay: 0.38s; opacity: 0; }
`;

const SectionLabel = ({ text }) => (
  <p style={{
    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
    fontWeight: 600, color: "var(--accent)", letterSpacing: "0.1em",
    textTransform: "uppercase", textAlign: "center", marginBottom: "14px",
  }}>{text}</p>
);

/* ══════ NAV ══════ */
const Nav = ({ activeSection, onNavigate, isMobile }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { id: "about", label: "About" },
    { id: "works", label: "Works" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav style={{
      position: "fixed",
      top: scrolled ? (isMobile ? "8px" : "12px") : "0",
      left: "50%", transform: "translateX(-50%)", zIndex: 100,
      width: scrolled ? (isMobile ? "calc(100% - 20px)" : "min(580px, calc(100% - 32px))") : "100%",
      padding: scrolled ? "0 8px" : (isMobile ? "0 16px" : "0 32px"),
      height: scrolled ? "48px" : (isMobile ? "52px" : "60px"),
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(250,250,250,0.8)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      borderRadius: scrolled ? "99px" : "0",
      border: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
      transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <div onClick={() => onNavigate("hero")} style={{
        cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
        padding: scrolled ? "0 8px" : "0",
      }}>
        <div style={{
          width: "28px", height: "28px", borderRadius: "8px",
          background: "linear-gradient(135deg, var(--accent), var(--teal))",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{
            color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800, fontSize: "0.8rem",
          }}>お</span>
        </div>
        {!scrolled && !isMobile && <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
          fontSize: "0.95rem", letterSpacing: "-0.02em",
        }}>おま</span>}
      </div>

      <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
        {links.map(l => (
          <button key={l.id} onClick={() => onNavigate(l.id)} style={{
            background: activeSection === l.id ? "var(--accent)" : "transparent",
            color: activeSection === l.id ? "#fff" : "var(--text-2)",
            border: "none",
            padding: isMobile ? "6px 10px" : (scrolled ? "6px 14px" : "8px 16px"),
            borderRadius: "99px", cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: isMobile ? "0.72rem" : (scrolled ? "0.78rem" : "0.82rem"),
            fontWeight: 600, transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { if (activeSection !== l.id) e.target.style.background = "var(--surface-dim)"; }}
            onMouseLeave={e => { if (activeSection !== l.id) e.target.style.background = "transparent"; }}
          >{l.label}</button>
        ))}
      </div>
    </nav>
  );
};

/* ══════ HERO ══════ */
const Hero = ({ isMobile }) => (
  <section id="hero" style={{
    minHeight: "100vh", display: "flex", flexDirection: "column",
    justifyContent: "center", alignItems: "center",
    padding: isMobile ? "90px 20px 60px" : "100px 32px 80px",
    position: "relative", overflow: "hidden", background: "var(--white)",
  }}>
    {/* Orbs - smaller on mobile */}
    {!isMobile && <>
      <div style={{
        position: "absolute", top: "5%", right: "10%",
        width: "340px", height: "340px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,113,227,0.06) 0%, transparent 70%)",
        animation: "float-a 12s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "8%",
        width: "280px", height: "280px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(48,176,199,0.05) 0%, transparent 70%)",
        animation: "float-b 10s ease-in-out infinite",
      }} />
    </>}
    <div style={{
      position: "absolute", top: "20%", left: "10%",
      width: isMobile ? "120px" : "180px", height: isMobile ? "120px" : "180px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(245,99,0,0.04) 0%, transparent 70%)",
      animation: "float-a 14s ease-in-out infinite 2s",
    }} />

    {/* Status chip */}
    <div className="au d1" style={{
      display: "inline-flex", alignItems: "center", gap: "10px",
      background: "var(--surface-dim)", borderRadius: "99px",
      padding: "8px 20px 8px 12px", marginBottom: isMobile ? "24px" : "32px",
    }}>
      <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34c759", position: "relative", zIndex: 1 }} />
        <span style={{ position: "absolute", width: "8px", height: "8px", borderRadius: "50%", background: "#34c759", animation: "pulse-ring 2s ease-out infinite" }} />
      </span>
      <span style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: isMobile ? "0.72rem" : "0.8rem",
        fontWeight: 600, color: "var(--text-2)",
      }}>プロジェクト受付中</span>
    </div>

    {/* Main copy */}
    <h1 className="au d2" style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
      fontSize: isMobile ? "2.2rem" : "clamp(2.6rem, 6.5vw, 5rem)",
      lineHeight: 1.1, textAlign: "center", letterSpacing: "-0.04em",
      maxWidth: "780px", color: "var(--text)",
    }}>
      Beauty Clinic
      <br />
      <span style={{
        background: "linear-gradient(135deg, var(--accent) 0%, var(--teal) 40%, var(--violet) 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>Digital Partner</span>
    </h1>

    <p className="au d3" style={{
      fontSize: isMobile ? "0.92rem" : "1.05rem",
      color: "var(--text-2)", textAlign: "center",
      maxWidth: "460px", marginTop: isMobile ? "18px" : "24px",
      lineHeight: 1.85, fontWeight: 400, padding: isMobile ? "0 8px" : 0,
    }}>
      クリーンな美容医療業界を目指して。
      <br />戦略設計からWebアプリ・HP・スマホアプリ開発まで。
    </p>

    {/* CTAs */}
    <div className="au d4" style={{
      display: "flex", gap: "12px", marginTop: isMobile ? "28px" : "40px",
      flexDirection: isMobile ? "column" : "row",
      width: isMobile ? "100%" : "auto",
      padding: isMobile ? "0 20px" : 0,
    }}>
      <button onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          background: "var(--text)", color: "#fff", border: "none",
          padding: "15px 32px", borderRadius: "99px", cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", fontWeight: 600,
          transition: "all 0.25s ease", width: isMobile ? "100%" : "auto",
        }}
        onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "var(--shadow-lg)"; }}
        onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}
      >Works を見る</button>
      <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          background: "transparent", color: "var(--text)", border: "1.5px solid var(--border)",
          padding: "15px 32px", borderRadius: "99px", cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.88rem", fontWeight: 600,
          transition: "all 0.25s ease", width: isMobile ? "100%" : "auto",
        }}
        onMouseEnter={e => { e.target.style.borderColor = "var(--text)"; }}
        onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; }}
      >お問い合わせ</button>
    </div>

    {/* Stats */}
    <div className="au d5" style={{
      display: "flex",
      gap: "1px", marginTop: isMobile ? "48px" : "72px",
      background: "var(--border)", borderRadius: "var(--radius)",
      overflow: "hidden", boxShadow: "var(--shadow-sm)",
      width: isMobile ? "calc(100% - 40px)" : "auto",
    }}>
      {[
        { n: "10年+", l: "業界経験" },
        { n: "50+", l: "クリニック支援" },
        { n: "10+", l: "自社プロダクト" },
      ].map((s, i) => (
        <div key={i} style={{
          background: "var(--white)",
          padding: isMobile ? "20px 0" : "28px 44px",
          textAlign: "center", flex: isMobile ? 1 : "none",
        }}>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
            fontSize: isMobile ? "1.3rem" : "1.7rem",
            letterSpacing: "-0.03em", color: "var(--text)",
          }}>{s.n}</div>
          <div style={{
            fontSize: isMobile ? "0.65rem" : "0.75rem",
            color: "var(--text-3)", marginTop: "4px", fontWeight: 500,
          }}>{s.l}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ══════ ABOUT ══════ */
const BentoCard = ({ emoji, title, sub, gradient }) => (
  <div style={{
    background: "var(--white)", borderRadius: "var(--radius)",
    padding: "24px", border: "1px solid var(--border)",
    boxShadow: "var(--shadow-sm)",
    transition: "all 0.3s ease", cursor: "default",
    display: "flex", flexDirection: "column", justifyContent: "space-between",
  }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
  >
    <div style={{
      width: "44px", height: "44px", borderRadius: "12px",
      background: gradient,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "1.25rem", marginBottom: "14px",
    }}>{emoji}</div>
    <div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
        fontSize: "0.95rem", marginBottom: "4px",
      }}>{title}</div>
      <div style={{ fontSize: "0.78rem", color: "var(--text-3)" }}>{sub}</div>
    </div>
  </div>
);

const About = ({ isMobile }) => (
  <section id="about" style={{
    padding: isMobile ? "80px 16px" : "120px 32px",
    maxWidth: "1040px", margin: "0 auto",
  }}>
    <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "64px" }}>
      <SectionLabel text="About" />
      <h2 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
        fontSize: isMobile ? "1.6rem" : "2.4rem",
        letterSpacing: "-0.03em", lineHeight: 1.3,
        padding: isMobile ? "0 8px" : 0,
      }}>
        クリーンな美容医療業界を
        <br />目指す伴走型マーケター
      </h2>
    </div>

    {/* Bio card */}
    <div style={{
      background: "var(--white)", borderRadius: "var(--radius)",
      padding: isMobile ? "28px 20px" : "40px 44px",
      border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "20px" : "32px",
      alignItems: isMobile ? "center" : "flex-start",
      marginBottom: "16px",
      transition: "box-shadow 0.3s ease",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "var(--shadow-md)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "var(--shadow-sm)"}
    >
      <div style={{
        width: "64px", height: "64px", borderRadius: "18px", flexShrink: 0,
        background: "linear-gradient(135deg, var(--accent), var(--teal))",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.6rem", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 800,
      }}>お</div>
      <div style={{ textAlign: isMobile ? "center" : "left" }}>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
          fontSize: "1.15rem", marginBottom: "12px",
        }}>おま｜伴走型医療マーケター</h3>
        <p style={{
          fontSize: isMobile ? "0.85rem" : "0.9rem",
          lineHeight: 1.9, color: "var(--text-2)",
        }}>
          広告代理店でストラテジックプランニング＆運用 → 大手美容外科でマーケティング統括 → 外資コンサルでリブランディング → 独立。人材・不動産・化粧品・医療と幅広いマーケティング支援を経験してきた中で、美容医療の顧客視点不足に危機感を抱き、「クリーンな美容医療業界」の実現を目指して活動中。
        </p>
      </div>
    </div>

    {/* Bento cards - 3 cards only (removed 独立マーケター) */}
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
      gap: "12px", marginBottom: "32px",
    }}>
      <BentoCard emoji="🧠" title="戦略設計" sub="ストプラ × デジタル × ブランド"
        gradient="linear-gradient(135deg, #fff0e6, #fef3e6)" />
      <BentoCard emoji="💻" title="プロダクト開発" sub="Webアプリ・スマホアプリ"
        gradient="linear-gradient(135deg, #f1e8fd, #e8f2ff)" />
      <BentoCard emoji="📊" title="専門領域" sub="美容医療マーケティング全般"
        gradient="linear-gradient(135deg, #e4f6f9, #e6f9ec)" />
    </div>

    {/* Skills */}
    <div style={{
      display: "flex", flexWrap: "wrap", gap: "8px",
      justifyContent: "center",
    }}>
      {["Google Ads", "Meta Ads", "LINE", "Next.js", "React", "WordPress", "Python", "AI / LLM", "SEO", "MEO"].map(s => (
        <span key={s} style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: isMobile ? "0.68rem" : "0.72rem",
          fontWeight: 500, padding: isMobile ? "6px 12px" : "8px 16px",
          borderRadius: "99px",
          background: "var(--white)", border: "1px solid var(--border)",
          color: "var(--text-2)", cursor: "default", transition: "all 0.2s ease",
        }}
          onMouseEnter={e => {
            e.target.style.background = "var(--text)";
            e.target.style.color = "#fff";
            e.target.style.borderColor = "var(--text)";
          }}
          onMouseLeave={e => {
            e.target.style.background = "var(--white)";
            e.target.style.color = "var(--text-2)";
            e.target.style.borderColor = "var(--border)";
          }}
        >{s}</span>
      ))}
    </div>
  </section>
);

/* ══════ WORKS ══════ */
const catStyle = {
  "Web App": { color: "var(--accent)", bg: "var(--accent-bg)", icon: "🔧", preview: "linear-gradient(135deg, #e8f2ff, #f2f2f7)" },
  "HP": { color: "var(--orange)", bg: "var(--orange-bg)", icon: "🌐", preview: "linear-gradient(135deg, #fff0e6, #f2f2f7)" },
  "Mobile App": { color: "var(--violet)", bg: "var(--violet-bg)", icon: "📱", preview: "linear-gradient(135deg, #f1e8fd, #f2f2f7)" },
};

const worksData = [
  { id: 1, cat: "Web App", title: "医療広告ガイドラインチェッカー", desc: "LP・広告文をAIが自動解析し、医療広告ガイドライン違反の可能性がある表現をハイライト＆修正案を提示。", tags: ["Next.js", "Claude API", "美容クリニック向け"] },
  { id: 2, cat: "Web App", title: "Googleマップ口コミ返信アシスタント", desc: "口コミの内容・星数を解析し、最適な返信文を自動生成。ネガティブ口コミにも対応。", tags: ["React", "AI API", "SaaS"] },
  { id: 3, cat: "HP", title: "医療脱毛専門クリニック LP", desc: "CVR最適化を徹底したランディングページ。医療広告ガイドライン完全準拠。", tags: ["Next.js", "microCMS", "LP制作"] },
  { id: 4, cat: "Web App", title: "美容クリニック売上シミュレーター", desc: "施術単価・来院数・成約率・リピート率から売上予測とLTVを可視化。", tags: ["React", "Chart.js", "無料ツール"] },
  { id: 5, cat: "HP", title: "新規開業クリニック向け HP", desc: "信頼感とクリーンさを重視したコーポレートサイト。MEO対策・構造化データ完備。", tags: ["Next.js", "microCMS", "SEO"] },
  { id: 6, cat: "Mobile App", title: "ダウンタイムカレンダー", desc: "施術後の経過と注意事項をカレンダー形式で表示。患者のLINEに共有可能。", tags: ["React Native", "LINE API", "患者向け"] },
];

const WorkCard = ({ work, isMobile }) => {
  const [hovered, setHovered] = useState(false);
  const cs = catStyle[work.cat];
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--white)", borderRadius: "var(--radius)",
        border: "1px solid var(--border)", overflow: "hidden", cursor: "pointer",
        boxShadow: hovered ? "var(--shadow-hover)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div style={{
        height: isMobile ? "160px" : "200px",
        background: cs.preview, position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
      }}>
        <div style={{
          width: "88%", height: "80%", borderRadius: "12px",
          background: "var(--white)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          overflow: "hidden",
          transform: hovered ? "scale(1.03) translateY(-4px)" : "scale(1)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}>
          <div style={{
            height: "28px", background: "var(--surface-dim)",
            display: "flex", alignItems: "center", padding: "0 10px", gap: "5px",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ff5f57" }} />
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#febc2e" }} />
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#28c840" }} />
            <div style={{ marginLeft: "auto", width: "80px", height: "10px", borderRadius: "5px", background: "var(--border)" }} />
          </div>
          <div style={{ padding: "10px", display: "flex", gap: "8px" }}>
            <div style={{ width: "35%", display: "flex", flexDirection: "column", gap: "5px" }}>
              <div style={{ height: "40px", borderRadius: "6px", background: cs.bg }} />
              <div style={{ height: "5px", width: "80%", borderRadius: "3px", background: "var(--surface-dim)" }} />
              <div style={{ height: "5px", width: "60%", borderRadius: "3px", background: "var(--surface-dim)" }} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
              <div style={{ height: "5px", width: "90%", borderRadius: "3px", background: "var(--surface-dim)" }} />
              <div style={{ height: "5px", width: "75%", borderRadius: "3px", background: "var(--surface-dim)" }} />
              <div style={{ height: "5px", width: "85%", borderRadius: "3px", background: "var(--surface-dim)" }} />
              <div style={{ marginTop: "auto" }}>
                <div style={{ display: "inline-block", height: "16px", width: "48px", borderRadius: "8px", background: cs.bg }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: isMobile ? "20px" : "24px 28px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span style={{
            fontSize: "0.7rem", fontWeight: 600, padding: "5px 12px",
            borderRadius: "99px", background: cs.bg, color: cs.color,
            fontFamily: "'JetBrains Mono', monospace",
          }}>{cs.icon} {work.cat}</span>
        </div>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
          fontSize: isMobile ? "1.05rem" : "1.15rem",
          letterSpacing: "-0.015em", marginBottom: "10px", lineHeight: 1.35,
        }}>{work.title}</h3>
        <p style={{
          fontSize: isMobile ? "0.82rem" : "0.85rem",
          lineHeight: 1.75, color: "var(--text-2)", marginBottom: "16px",
        }}>{work.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {work.tags.map(t => (
            <span key={t} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem",
              fontWeight: 500, padding: "4px 10px", borderRadius: "8px",
              background: "var(--surface-dim)", color: "var(--text-3)",
            }}>{t}</span>
          ))}
        </div>
        {!isMobile && <div style={{
          marginTop: "16px", display: "flex", alignItems: "center", gap: "6px",
          opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-8px)",
          transition: "all 0.3s ease",
        }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: cs.color }}>View Project</span>
          <span style={{ color: cs.color }}>→</span>
        </div>}
      </div>
    </div>
  );
};

const Works = ({ isMobile }) => {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Web App", "HP", "Mobile App"];
  const filtered = filter === "All" ? worksData : worksData.filter(w => w.cat === filter);
  return (
    <section id="works" style={{
      padding: isMobile ? "80px 16px" : "120px 32px",
      maxWidth: "1120px", margin: "0 auto",
    }}>
      <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "48px" }}>
        <SectionLabel text="Works" />
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
          fontSize: isMobile ? "1.7rem" : "2.4rem", letterSpacing: "-0.03em",
        }}>Selected Projects</h2>
      </div>

      {/* Filter - scrollable on mobile */}
      <div style={{
        display: "flex", gap: "6px", justifyContent: "center",
        marginBottom: isMobile ? "28px" : "44px",
      }}>
        <div style={{
          display: "flex", gap: "4px",
          background: "var(--surface-dim)", borderRadius: "99px",
          padding: "3px",
          overflowX: isMobile ? "auto" : "visible",
          WebkitOverflowScrolling: "touch",
        }}>
          {cats.map(c => {
            const active = filter === c;
            return (
              <button key={c} onClick={() => setFilter(c)} style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: isMobile ? "0.75rem" : "0.82rem", fontWeight: 600,
                padding: isMobile ? "8px 16px" : "9px 22px",
                borderRadius: "99px", cursor: "pointer", border: "none",
                background: active ? "var(--white)" : "transparent",
                color: active ? "var(--text)" : "var(--text-3)",
                boxShadow: active ? "var(--shadow-sm)" : "none",
                transition: "all 0.25s ease", whiteSpace: "nowrap",
              }}>{c === "All" ? "すべて" : c}</button>
            );
          })}
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(330px, 1fr))",
        gap: "20px",
      }}>
        {filtered.map(w => <WorkCard key={w.id} work={w} isMobile={isMobile} />)}
      </div>
    </section>
  );
};

/* ══════ BLOG ══════ */
const blogPosts = [
  { date: "2026.02", cat: "集客戦略", title: "美容クリニック集客の正攻法｜高価格帯と低価格帯、あなたはどっちで戦いますか？", time: "20 min", color: "var(--orange)", url: "https://note.com/nakanto_survey/n/nae51c3bdd27a" },
  { date: "2026.01", cat: "広告運用", title: "美容クリニックの広告運用完全ガイド｜現場で使える実践知識と医療広告ガイドラインの全知識", time: "25 min", color: "var(--accent)", url: "https://note.com/nakanto_survey/n/n1fcafe6b9f59" },
  { date: "2025.07", cat: "マーケ戦略", title: "美容クリニックのマーケティング戦略完全ガイド永久保存版｜成功事例と実践を交えて徹底解説", time: "30 min", color: "var(--teal)", url: "https://note.com/nakanto_survey/n/n38adf9e7645b" },
];

const Blog = ({ isMobile }) => (
  <section id="blog" style={{
    padding: isMobile ? "80px 16px" : "120px 32px",
    maxWidth: "880px", margin: "0 auto",
  }}>
    <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "48px" }}>
      <SectionLabel text="Blog" />
      <h2 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
        fontSize: isMobile ? "1.7rem" : "2.4rem", letterSpacing: "-0.03em",
      }}>Knowledge & Insights</h2>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {blogPosts.map((p, i) => (
        <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{
          background: "var(--white)", borderRadius: "var(--radius-sm)",
          padding: isMobile ? "18px 16px 18px 20px" : "22px 28px",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)", cursor: "pointer",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? "10px" : "20px",
          transition: "all 0.25s ease",
          position: "relative", overflow: "hidden", textDecoration: "none",
        }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {/* Left color accent */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: "3px", background: p.color, borderRadius: "0 2px 2px 0",
          }} />

          {isMobile ? (
            /* Mobile: stacked layout */
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem",
                  fontWeight: 600, color: p.color, padding: "3px 8px",
                  borderRadius: "6px", background: `${p.color}0a`,
                }}>{p.cat}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem",
                  color: "var(--text-3)",
                }}>{p.date}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem",
                  color: "var(--text-3)",
                }}>{p.time}</span>
              </div>
              <span style={{
                fontSize: "0.88rem", fontWeight: 500, color: "var(--text)",
                lineHeight: 1.5,
              }}>{p.title}</span>
            </>
          ) : (
            /* Desktop: horizontal layout */
            <>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem",
                color: "var(--text-3)", flexShrink: 0, minWidth: "68px",
              }}>{p.date}</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem",
                fontWeight: 600, color: p.color, flexShrink: 0,
                padding: "4px 10px", borderRadius: "8px", background: `${p.color}0a`,
              }}>{p.cat}</span>
              <span style={{
                fontSize: "0.92rem", fontWeight: 500, color: "var(--text)", flex: 1,
              }}>{p.title}</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
                color: "var(--text-3)", flexShrink: 0,
              }}>{p.time}</span>
            </>
          )}
        </a>
      ))}
    </div>

    <div style={{ textAlign: "center", marginTop: "32px" }}>
      <a href="https://note.com/nakanto_survey" target="_blank" rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "12px 28px", borderRadius: "99px",
          border: "1.5px solid var(--border)", background: "var(--white)",
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.85rem",
          fontWeight: 600, color: "var(--text-2)", textDecoration: "none",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={e => { e.target.style.borderColor = "var(--text)"; e.target.style.color = "var(--text)"; }}
        onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text-2)"; }}
      >note で全記事を見る →</a>
    </div>
  </section>
);

/* ══════ CONTACT ══════ */
const Contact = ({ isMobile }) => (
  <section id="contact" style={{
    padding: isMobile ? "60px 16px 80px" : "100px 32px 100px",
    maxWidth: "680px", margin: "0 auto", textAlign: "center",
  }}>
    <div style={{
      background: "var(--white)", borderRadius: isMobile ? "24px" : "28px",
      padding: isMobile ? "44px 24px" : "64px 48px",
      boxShadow: "var(--shadow-md)",
      border: "1px solid var(--border)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(0,113,227,0.02) 0%, rgba(48,176,199,0.02) 50%, rgba(137,68,231,0.02) 100%)",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <SectionLabel text="Contact" />
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
          fontSize: isMobile ? "1.6rem" : "2rem",
          letterSpacing: "-0.025em", marginBottom: "16px",
        }}>Let's Build Together</h2>
        <p style={{
          fontSize: isMobile ? "0.88rem" : "0.95rem",
          color: "var(--text-2)", marginBottom: "36px", lineHeight: 1.85,
        }}>
          美容クリニックのマーケティング戦略、
          <br />Webアプリ開発、HP制作のご相談はお気軽に。
        </p>
        <a href="mailto:contact@example.com" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "var(--text)", color: "#fff", textDecoration: "none",
          padding: isMobile ? "14px 32px" : "16px 36px",
          borderRadius: "99px",
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
          fontSize: "0.92rem", transition: "all 0.25s ease",
        }}
          onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "var(--shadow-lg)"; }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}
        >Get in Touch <span>→</span></a>

        <div style={{
          display: "flex", gap: "24px", justifyContent: "center", marginTop: "40px",
        }}>
          {[
            { name: "note", href: "https://note.com/nakanto_survey" },
            { name: "X", href: "#" },
            { name: "LinkedIn", href: "#" },
          ].map(p => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
              fontWeight: 500, color: "var(--text-3)", textDecoration: "none",
              transition: "color 0.2s ease",
            }}
              onMouseEnter={e => e.target.style.color = "var(--text)"}
              onMouseLeave={e => e.target.style.color = "var(--text-3)"}
            >{p.name}</a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ══════ FOOTER ══════ */
const Footer = () => (
  <footer style={{ padding: "28px 32px", textAlign: "center", borderTop: "1px solid var(--border)" }}>
    <span style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem",
      color: "var(--text-3)", letterSpacing: "0.02em",
    }}>© 2026 おま — All rights reserved</span>
  </footer>
);

/* ══════ APP ══════ */
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const w = useWidth();
  const isMobile = w < 768;

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -40% 0px" }
    );
    ["hero", "about", "works", "blog", "contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <style>{STYLE}</style>
      <Nav activeSection={activeSection} onNavigate={scrollTo} isMobile={isMobile} />
      <Hero isMobile={isMobile} />
      <About isMobile={isMobile} />
      <Works isMobile={isMobile} />
      <Blog isMobile={isMobile} />
      <Contact isMobile={isMobile} />
      <Footer />
    </div>
  );
}
