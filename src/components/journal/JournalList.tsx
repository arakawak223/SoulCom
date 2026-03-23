"use client";

import { useJournal } from "@/hooks/useJournal";
import JournalCard from "./JournalCard";

export default function JournalList() {
  const { entries, deleteJournalEntry } = useJournal();

  if (entries.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="space-y-4 animate-fade-in-up">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(201,169,110,0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-[#e8e6e3]/40 text-sm font-light">
            まだ気づきが保存されていません。
            <br />
            対話の中で心に響いた言葉を保存してみましょう。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      <p className="text-[#e8e6e3]/40 text-xs mb-2">
        {entries.length}件の気づき
      </p>
      {entries.map((entry) => (
        <JournalCard
          key={entry.id}
          entry={entry}
          onDelete={deleteJournalEntry}
        />
      ))}
    </div>
  );
}
