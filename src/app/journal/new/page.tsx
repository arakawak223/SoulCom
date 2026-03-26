"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { saveJournalEntry } from "@/lib/supabase/database";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function NewJournalPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const conversationId = searchParams.get("conversationId") ?? undefined;
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const trimmed = content.trim();
    if (!trimmed || saving) return;
    setSaving(true);

    await saveJournalEntry({
      id: generateId(),
      content: trimmed,
      conversationId,
      createdAt: Date.now(),
    });

    router.push("/journal");
  };

  const handleSkip = () => {
    router.push("/");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-lg space-y-6 animate-fade-in-up">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(201,169,110,0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h1 className="text-lg font-light text-[#e8e6e3] tracking-wider">
            今日の気づき
          </h1>
          <p className="text-[#e8e6e3]/40 text-xs">
            対話を通じて感じたこと、気づいたことを残しておきましょう
          </p>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="対話の中で気づいたこと、心に残ったことを自由に書いてください..."
          rows={6}
          className="w-full bg-[#1e2a4a]/50 text-[#e8e6e3] placeholder-[#e8e6e3]/30
            rounded-xl px-4 py-3 text-sm leading-relaxed
            border border-[rgba(201,169,110,0.1)] focus:border-[rgba(201,169,110,0.3)]
            focus:outline-none resize-none transition-colors"
        />

        <div className="flex justify-center gap-3">
          <button
            onClick={handleSkip}
            className="px-6 py-2.5 rounded-full text-sm tracking-wide
              bg-[#e8e6e3]/5 text-[#e8e6e3]/40 border border-[#e8e6e3]/10
              hover:bg-[#e8e6e3]/10 hover:text-[#e8e6e3]/60 transition-all duration-300"
          >
            スキップ
          </button>
          <button
            onClick={handleSave}
            disabled={!content.trim() || saving}
            className="px-6 py-2.5 rounded-full text-sm tracking-wide
              bg-[#c9a96e]/20 text-[#c9a96e] border border-[#c9a96e]/30
              hover:bg-[#c9a96e]/30 hover:border-[#c9a96e]/50
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-all duration-300"
          >
            {saving ? "保存中..." : "保存する"}
          </button>
        </div>
      </div>
    </div>
  );
}
