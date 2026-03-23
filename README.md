# Soul Compass（ソウルコンパス）

答えは、あなたの中にしかない。未来のあなたが、今のあなたを迎えに来る場所。

AIが解決策を提示するのではなく、「問い」という光を当てることで、ユーザー自身の内側にある真実の答えを引き出すセルフ・コーチング・パートナーアプリです。

## セットアップ

```bash
npm install
```

`.env.local` に Anthropic API キーを設定:

```
ANTHROPIC_API_KEY=your-api-key-here
```

## 開発

```bash
npm run dev
```

http://localhost:3000 でアプリが起動します。

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Claude API (@anthropic-ai/sdk)
