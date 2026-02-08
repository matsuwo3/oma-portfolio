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

## Architecture
- /app
  - /page.tsx              → トップページ（全セクション）
  - /works/[slug]/page.tsx → 実績詳細
  - /layout.tsx            → 共通レイアウト
  - /api/revalidate/route.ts → microCMS Webhook受信
- /components
  - /sections  → Hero, About, Works, Blog, Contact
  - /ui        → 共通UIコンポーネント
  - /layout    → Nav, Footer
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
- アニメーション: 控えめで上品（Framer Motion）
- レスポンシブ: モバイルファースト、md: ブレークポイント(768px)

## microCMS
- Service Domain: 環境変数 MICROCMS_SERVICE_DOMAIN
- API Key: 環境変数 MICROCMS_API_KEY
- Endpoints:
  - works: 実績一覧（フィールド: title, slug, category, description, body, thumbnail, tags, url, featured）
  - blog: note記事リンク一覧（フィールド: title, category, noteUrl）
- tagsはカンマ区切りテキスト。コード側で.split(",")して配列化

## Code Style
- Named exports推奨
- any禁止
- Server Components デフォルト、インタラクティブ部分のみ 'use client'
- Tailwindユーティリティクラスで完結させる（インラインstyle最小限）
