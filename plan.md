# Portfolio Implementation Plan

## 基本方針
- reference/portfolio-v4.jsx は構成の参考のみ。デザインの忠実な再現は不要
- Tailwindユーティリティクラスでデザインを組む（インラインstyle禁止）
- セクションごとにPlaywright MCPで画面確認し、崩れなしを確認してから次へ
- デザインの細部はあなた（Claude Code）の裁量で、モダンで美しく仕上げる
- モバイル（375px幅）とデスクトップ（1280px幅）の両方で確認する

---

## Phase 1: 環境・フォント・グローバルCSS（最初にやる）

1. Google Fonts: Plus Jakarta Sans, Noto Sans JP を app/layout.tsx で読み込み
2. globals.css でベーススタイル設定（bg: #fafafa, text: #1d1d1f）
3. Tailwind設定にカスタムカラー追加:
   - accent-blue: #0071e3
   - orange: #f56300
   - violet: #8944e7
   - teal: #30b0c7
4. npm run dev で起動、Playwrightで白いページが表示されることを確認

---

## Phase 2: microCMS接続層（表示前に完成させる）

### /lib/types.ts
- Work型: id, title, slug, category, description, body?, thumbnail?, tags?(string), url?, featured?
- BlogPost型: id, title, category, noteUrl
- categoryはセレクトフィールド（配列で返る）

### /lib/microcms.ts
- createClient で接続
- getWorks(): orders=-publishedAt, limit=20
- getWorkBySlug(slug): filters で1件取得
- getBlogPosts(): orders=-publishedAt, limit=20

### /app/api/revalidate/route.ts
- X-MICROCMS-Signature でWebhook検証
- revalidatePath('/')  revalidatePath('/works/[slug]')

### 確認
- npm run dev でエラーが出ないこと
- ターミナルでcurlしてmicroCMSからデータ取得できていること

---

## Phase 3: セクション実装（1つずつ作って確認）

### 重要ルール
- 1セクション作ったらPlaywright MCPでスクショ確認
- モバイル幅(375px)とデスクトップ幅(1280px)の両方で確認
- 崩れがあれば修正してから次のセクションへ

### 3-1. Nav
- フローティング型ナビゲーション
- ロゴ: 「お」アイコン + テキスト
- リンク: About, Works, Blog, Contact
- スクロールで背景・影が変化
- モバイル: コンパクト化

### 3-2. Hero
- メインコピー: 「クリーンな美容医療を、マーケティングの力で。」
- サブ: 「おま｜伴走型医療マーケター」
- 経歴: 広告代理店 ストプラ&運用 → 大手美容外科 マーケ統括 → 外コン → 独立
- ステータス数値3つ:
  - 10年+ 業界経験
  - 50+ クリニック支援
  - 10+ 自社プロダクト
- CTA: 「お問い合わせ」「実績を見る」

### 3-3. About
- ミッション: 「クリーンな美容医療業界を目指す」
- Bentoグリッド3枚:
  - 戦略設計: ブランド戦略、集患設計、KPI策定
  - プロダクト開発: Webアプリ、LP、管理ツール
  - 専門領域: 医療広告ガイドライン、美容医療マーケ
- スキルチップ: Google Ads, Meta Ads, LINE, SEO, Next.js, React, AI/LLM, Figma

### 3-4. Works（microCMS連携）
- Server ComponentでgetWorks()
- Client Componentでカテゴリフィルター（All / Web App / HP / Mobile App）
- カードに: タイトル、概要、カテゴリバッジ、タグ
- カテゴリ色: Web App=blue(#0071e3), HP=orange(#f56300), Mobile=violet(#8944e7)
- tagsは文字列なので .split(",").map(t => t.trim()) で配列化

### 3-5. Blog（microCMS連携）
- Server ComponentでgetBlogPosts()
- 各記事は noteUrl への外部リンク（target="_blank"）
- カード or リスト形式（デザインはお任せ）
- カテゴリ表示
- 最後に「noteで全記事を見る →」ボタン → https://note.com/nakanto_survey

### 3-6. Contact
- 見出し + 説明文
- メール or SNSリンク
- note: https://note.com/nakanto_survey
- X(Twitter)リンク（あれば）

### 3-7. Footer
- シンプルなフッター、コピーライト

---

## Phase 4: Works詳細ページ

- /works/[slug]/page.tsx
- generateStaticParams で全slug事前生成
- generateMetadata でタイトル・OGP
- 本文: body（リッチエディタHTML）を dangerouslySetInnerHTML で表示
- 戻るリンク

---

## Phase 5: 仕上げ

- メタデータ（トップ + 詳細ページ）
- モバイル全セクション最終確認
- npm run build でエラーなし確認
