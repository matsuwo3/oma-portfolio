# Project: おまポートフォリオ

## Stack
- Next.js 15 (App Router)
- TypeScript strict mode
- Tailwind CSS v4
- Framer Motion（アニメーション）
- microCMS（Works・Blog管理）
- Vercel デプロイ

## Commands
- `npm run dev`: 開発サーバー (port 3000)
- `npm run build`: ビルド
- `npm run lint`: ESLint

## URL設計
| URL | 概要 |
|---|---|
| `/` | トップページ（全セクション） |
| `/about/` | E-E-A-T強化の独立プロフィールページ |
| `/works/` | 実績・プロダクト一覧 |
| `/works/[slug]/` | 実績詳細 |
| `/blog/` | ブログ記事一覧 |
| `/blog/[slug]/` | ブログ記事詳細 |
| `/blog/category/[cat]/` | カテゴリ別記事一覧 |
| `/contact/` | お問い合わせ独立ページ |

## Architecture
- /app
  - /page.tsx              → トップページ（ScrollProgress, MorphingBlob, 全セクション）
  - /about/page.tsx        → Aboutページ（プロフィール、経歴タイムライン、JSON-LD ProfilePage）
  - /works/page.tsx        → 実績・プロダクト一覧（カテゴリフィルタ付き）
  - /works/[slug]/page.tsx → 実績詳細
  - /blog/page.tsx         → ブログ記事一覧（カテゴリフィルタ付き）
  - /blog/[slug]/page.tsx  → ブログ記事詳細
  - /blog/category/[cat]/page.tsx → カテゴリ別記事一覧
  - /blog/BlogListClient.tsx → ブログ一覧用クライアントコンポーネント（blog/とcategory/で共有）
  - /contact/page.tsx      → お問い合わせページ
  - /layout.tsx            → 共通レイアウト（Person型JSON-LD）
  - /api/revalidate/route.ts → microCMS Webhook受信
- /components
  - /sections  → Hero, About, Works, WorksGrid, Blog, BlogGrid, Contact
  - /ui        → ScrollProgress, MorphingBlob, TiltCard, MagneticButton, ParallaxDot, SectionHeader
  - /layout    → Nav, Footer
- /hooks
  - animations.ts       → 共有spring設定、easing、stagger/fadeUpバリアント
  - useIsMobile.ts      → PC/モバイル判定（重いエフェクトのゲート）
  - useParallax.ts      → スクロール連動パララックス
  - useMagneticCursor.ts → マグネティックカーソル追従
  - useTiltCard.ts      → 3Dチルトホバー
  - useCountUp.ts       → 数値カウントアップ
- /lib
  - microcms.ts  → microCMS API client
  - types.ts     → 型定義

## Design Direction
Google×Apple風のクリーンで上品なデザイン。
デザインの細部はClaude Codeの裁量に任せる。以下はガイドライン。

- テーマ: ライト（白ベース）
- 深度表現: shadow（borderは最小限）
- 角丸: 大きめ（16px〜24px）
- Font:
  - Display: 'Plus Jakarta Sans'
  - Body: 'Noto Sans JP'
- Color:
  - bg: #fafafa / surface: #ffffff
  - text: #1d1d1f / #6e6e73
  - accent-blue: #0071e3（Web App）
  - orange: #f56300（HP）
  - violet: #8944e7（Mobile App）
  - teal: #30b0c7
- アニメーション: Framer Motion（パララックス、3Dチルト、マグネティック、タイプライター等）
- 重いエフェクトはPC限定（useIsMobile()でゲート）、モバイルはplain要素フォールバック
- レスポンシブ: モバイルファースト、md: ブレークポイント(768px)

## microCMS
- Service Domain: 環境変数 MICROCMS_SERVICE_DOMAIN
- API Key: 環境変数 MICROCMS_API_KEY
- Endpoints:
  - works: 実績一覧（フィールド: title, slug, category, description, body, thumbnail, tags, url, featured）
  - blog: ブログ記事（フィールド: title, slug, category, isExternal, noteUrl, description, body, thumbnail, tags）
    - isExternal=true: Note記事リンク（noteUrl使用）
    - isExternal=false: 内部記事（body使用、/blog/[slug]で表示）
- tagsはカンマ区切りテキスト。コード側で.split(",")して配列化

## Code Style
- Named exports推奨
- any禁止
- Server Components デフォルト、インタラクティブ部分のみ 'use client'
- Tailwindユーティリティクラスで完結させる（インラインstyle最小限）

## デザイン決定事項
- ベントカード: SVGアイコン不使用 → ナンバリング(01/02/03)+左端カラーライン
- Hero見出し: タイプライター(1文字ずつfadeUp) + 末尾ブルーカーソル点滅
- Blog: 5件超は「もっと見る」ボタンで展開
- AI生成感のあるSVGアイコンは使わない方針
