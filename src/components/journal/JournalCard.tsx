"use client";

import { JournalEntry } from "@/lib/types";

interface JournalCardProps {
  entry: JournalEntry;
  onDelete: (id: string) => void;
}

export default function JournalCard({ entry, onDelete }: JournalCardProps) {
  const date = new Date(entry.createdAt);
  const dateStr = date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="animate-fade-in-up group relative p-5 rounded-2xl border border-[rgba(201,169,110,0.1)] bg-[#1e2a4a]/30 hover:border-[rgba(201,169,110,0.25)] transition-all duration-300">
      <p className="text-[#e8e6e3] text-[0.95rem] leading-[1.8] font-light whitespace-pre-wrap">
        {entry.content}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[#e8e6e3]/30 text-xs">{dateStr}</span>
        <button
          onClick={() => onDelete(entry.id)}
          className="text-[#e8e6e3]/30 hover:text-red-400/60 transition-all duration-200 text-xs"
        >
          削除
        </button>
      </div>
    </div>
  );
}
