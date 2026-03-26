"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ConversationMeta } from "@/lib/types";
import {
  listConversations,
  deleteConversation,
} from "@/lib/supabase/database";

export default function HistoryList() {
  const [conversations, setConversations] = useState<ConversationMeta[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    listConversations().then(setConversations);
  }, []);

  const handleOpen = (id: string) => {
    router.push(`/chat?id=${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteConversation(id);
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setConfirmDeleteId(null);
  };

  const handleNewChat = () => {
    const newId = Date.now().toString(36) + Math.random().toString(36).slice(2);
    router.push(`/chat?id=${newId}`);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `今日 ${date.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}`;
    } else if (diffDays === 1) {
      return `昨日 ${date.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}`;
    } else if (diffDays < 7) {
      return `${diffDays}日前`;
    }
    return date.toLocaleDateString("ja-JP", {
      month: "long",
      day: "numeric",
    });
  };

  if (conversations.length === 0) {
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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-[#e8e6e3]/40 text-sm font-light">
            まだ対話の履歴がありません。
          </p>
          <button
            onClick={handleNewChat}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
              bg-[#c9a96e]/20 text-[#c9a96e] border border-[#c9a96e]/30
              hover:bg-[#c9a96e]/30 hover:border-[#c9a96e]/50
              transition-all duration-300 text-sm"
          >
            新しい対話をはじめる
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#e8e6e3]/40 text-xs">
          {conversations.length}件の対話
        </p>
        <button
          onClick={handleNewChat}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full
            bg-[#c9a96e]/15 text-[#c9a96e] text-xs
            hover:bg-[#c9a96e]/25 transition-all duration-200"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          新しい対話
        </button>
      </div>
      <div className="space-y-3">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className="animate-fade-in-up group relative p-4 rounded-2xl border border-[rgba(201,169,110,0.1)]
              bg-[#1e2a4a]/30 hover:border-[rgba(201,169,110,0.25)] hover:bg-[#1e2a4a]/50
              transition-all duration-300 cursor-pointer"
            onClick={() => handleOpen(conv.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[#e8e6e3] text-sm leading-relaxed truncate">
                  {conv.preview || "新しい対話"}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[#e8e6e3]/30 text-xs">
                    {formatDate(conv.updatedAt)}
                  </span>
                  <span className="text-[#e8e6e3]/20 text-xs">
                    {conv.messageCount}件のメッセージ
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirmDeleteId === conv.id) {
                    handleDelete(conv.id);
                  } else {
                    setConfirmDeleteId(conv.id);
                    setTimeout(() => setConfirmDeleteId(null), 3000);
                  }
                }}
                className="opacity-0 group-hover:opacity-100 shrink-0 p-1.5 rounded-lg
                  text-[#e8e6e3]/20 hover:text-red-400/60 hover:bg-red-400/10
                  transition-all duration-200 text-xs"
              >
                {confirmDeleteId === conv.id ? "削除する" : "削除"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
