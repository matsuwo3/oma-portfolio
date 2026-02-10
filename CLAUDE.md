# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm run dev` — 開発サーバー (port 3000)
- `npm run build` — 本番ビルド（Vercelデプロイ前に必ず確認）
- `npm run lint` — ESLint

## Stack
- Next.js 16 (App Router) / React 19 / TypeScript strict
- Tailwind CSS v4 + @tailwindcss/typography
- Framer Motion（アニメーション）
- microCMS（Works・Blog CMS）
- Vercel デプロイ（mainブランチpushで自動デプロイ）

## URL設計
| URL | 概要 |
|---|---|
| `/` | トップページ（全セクション: Hero, About, Works, Blog, Contact） |
| `/about/` | E-E-A-T強化の独立プロフィールページ |
| `/works/` | 実績・プロダクト一覧 |
| `/works/[slug]/` | 実績詳細 |
| `/blog/` | コラム記事一覧 |
| `/blog/[slug]/` | コラム記事詳細 |
| `/blog/category/[cat]/` | カテゴリ別記事一覧 |
| `/contact/` | お問い合わせ独立ページ |

## Key Architecture Patterns

### Nav の二重動作
`Nav` はトップページ(`/`)ではセクションへのスムーススクロール、他ページでは `<Link>` によるルート遷移。`usePathname()` で分岐。

### トップページ = セクション集約、各独立ページあり
トップの各セクション（About, Works, Blog, Contact）は簡潔な概要 + 各独立ページへのCTAリンクを持つ。独立ページ側に詳細コンテンツ。

### microCMS データフロー
- `lib/microcms.ts` に全APIアクセス関数を集約
- Blog の `category` は `string[]`（microCMS側でリスト型）
- `isExternal=true` の記事は `noteUrl` への外部リンク、`false` は内部記事（`/blog/[slug]`）
- `tags` はカンマ区切りテキスト → `.split(",")` で配列化
- Webhook（`/api/revalidate`）でmicroCMS更新時にISR revalidate

### generateStaticParams の注意
日本語パラメータに `encodeURIComponent` を使わないこと。Next.jsが自動エンコードするため二重エンコードになる。

### アニメーション設計
- 重いエフェクト（パララックス、3Dチルト、マグネティック）は `useIsMobile()` でPC限定
- モバイルはplain要素にフォールバック
- 共通設定は `hooks/animations.ts`（spring configs, easings, stagger variants）

### 各独立ページの構成
すべての独立ページ（/about, /works, /blog, /contact, 詳細ページ）は `<Nav />` と `<Footer />` を自前で配置。layout.tsxには含まれていない。

## microCMS
- 環境変数: `MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY`, `MICROCMS_WEBHOOK_SECRET`
- Endpoints:
  - `works`: title, slug, category(`string[]`), description, body, thumbnail, tags, url, featured
  - `blog`: title, slug, category(`string[]`), isExternal, noteUrl, description, body, thumbnail, tags

## Design Direction
Google×Apple風のクリーンで上品なデザイン。

- テーマ: ライト（白ベース #fafafa / surface #ffffff）
- 深度表現: shadow（borderは最小限）
- 角丸: 大きめ（16px〜24px）
- Font: Display='Plus Jakarta Sans', Body='Noto Sans JP'
- Color: text #1d1d1f/#6e6e73, accent-blue #0071e3, orange #f56300, violet #8944e7, teal #30b0c7
- レスポンシブ: モバイルファースト、md: 768px

## Code Style
- Named exports推奨
- any禁止
- Server Components デフォルト、インタラクティブ部分のみ 'use client'
- Tailwindユーティリティクラスで完結（インラインstyle最小限）
- AI生成感のあるSVGアイコンは使わない方針
