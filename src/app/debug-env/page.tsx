"use client";

import { useState } from "react";

export default function DebugEnvPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "(undefined)";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "(undefined)";
  const [result, setResult] = useState("Click button to test");

  const testFetch = async () => {
    setResult("Testing...");
    try {
      const res = await fetch(`${url}/auth/v1/settings`, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
      });
      const text = await res.text();
      setResult(`Status: ${res.status} - ${text.slice(0, 200)}`);
    } catch (err: unknown) {
      setResult(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div style={{ padding: 40, color: "white", fontFamily: "monospace" }}>
      <h1>Environment Variables Check</h1>
      <p>URL: <strong>{url}</strong> (len: {url.length})</p>
      <p>KEY len: <strong>{key.length}</strong></p>
      <hr />
      <button onClick={testFetch} style={{ padding: "10px 20px", marginTop: 20 }}>
        Test Supabase Connection
      </button>
      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{result}</pre>
    </div>
  );
}
