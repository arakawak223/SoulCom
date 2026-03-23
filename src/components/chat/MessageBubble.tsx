"use client";

import { Message } from "@/lib/types";
import { useState } from "react";

interface MessageBubbleProps {
  message: Message;
  onSaveInsight?: (messageId: string) => void;
}

export default function MessageBubble({
  message,
  onSaveInsight,
}: MessageBubbleProps) {
  const [showSave, setShowSave] = useState(false);
  const isUser = message.role === "user";

  return (
    <div
      className={`animate-fade-in-up flex ${isUser ? "justify-end" : "justify-start"}`}
      onMouseEnter={() => !isUser && setShowSave(true)}
      onMouseLeave={() => setShowSave(false)}
    >
      <div className={`relative max-w-[85%] ${isUser ? "" : "group"}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-[#1e2a4a] text-[#e8e6e3] text-[0.95rem] leading-relaxed"
              : "text-[#e8e6e3] text-[1.05rem] leading-[1.8] font-light"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        {!isUser && onSaveInsight && (
          <button
            onClick={() => onSaveInsight(message.id)}
            className={`absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 rounded-full
              text-[#c9a96e]/40 hover:text-[#c9a96e] hover:bg-[#c9a96e]/10
              transition-all duration-300 ${showSave ? "opacity-100" : "opacity-0"}`}
            title="気づきを保存"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
