export default function DebugEnvPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "(undefined)";
  const keyPreview = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(0, 20) + "..."
    : "(undefined)";

  return (
    <div style={{ padding: 40, color: "white", fontFamily: "monospace" }}>
      <h1>Environment Variables Check</h1>
      <p>NEXT_PUBLIC_SUPABASE_URL: <strong>{url}</strong></p>
      <p>NEXT_PUBLIC_SUPABASE_URL length: <strong>{url.length}</strong></p>
      <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: <strong>{keyPreview}</strong></p>
    </div>
  );
}
