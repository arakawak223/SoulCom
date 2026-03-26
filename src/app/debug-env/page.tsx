export default function DebugEnvPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "(undefined)";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "(undefined)";

  const hasNewline = key.includes("\n") || key.includes("\r");
  const hasSpace = key !== key.trim();
  const hasInvalidChars = /[^\x20-\x7E]/.test(key);

  return (
    <div style={{ padding: 40, color: "white", fontFamily: "monospace" }}>
      <h1>Environment Variables Check</h1>
      <p>NEXT_PUBLIC_SUPABASE_URL: <strong>{url}</strong></p>
      <p>URL length: <strong>{url.length}</strong></p>
      <hr />
      <p>ANON_KEY length: <strong>{key.length}</strong></p>
      <p>ANON_KEY first 30: <strong>{key.slice(0, 30)}</strong></p>
      <p>ANON_KEY last 30: <strong>{key.slice(-30)}</strong></p>
      <p>Has newline: <strong>{String(hasNewline)}</strong></p>
      <p>Has leading/trailing space: <strong>{String(hasSpace)}</strong></p>
      <p>Has non-ASCII chars: <strong>{String(hasInvalidChars)}</strong></p>
    </div>
  );
}
