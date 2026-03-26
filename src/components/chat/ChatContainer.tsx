"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ThinkingAnimation from "./ThinkingAnimation";
import { saveJournalEntry } from "@/lib/supabase/database";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant" as const,
  content:
    "ようこそ、Soul Compassへ。\nここはあなたの内側にある答えと出会うための場所です。\n\n今、あなたの心にあることを——どんなことでも、聴かせてください。",
  timestamp: 0,
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function ChatContainer() {
  const searchParams = useSearchParams();
  const [conversationId, setConversationId] = useState<string>("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const paramId = searchParams.get("id");
    const storedId = sessionStorage.getItem("current-conversation");
    const id = paramId || storedId || generateId();
    sessionStorage.setItem("current-conversation", id);
    setConversationId(id);
    setReady(true);
  }, [searchParams]);

  if (!ready || !conversationId) {
    return null;
  }

  return <ChatInner conversationId={conversationId} />;
}

function ChatInner({ conversationId }: { conversationId: string }) {
  const { messages, isThinking, error, sendMessage } = useChat(conversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [userScrolled, setUserScrolled] = useState(false);
  const [savedMessageId, setSavedMessageId] = useState<string | null>(null);
  const router = useRouter();

  const displayMessages =
    messages.length === 0 ? [WELCOME_MESSAGE] : messages;

  // Auto-scroll
  useEffect(() => {
    if (!userScrolled) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isThinking, userScrolled]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setUserScrolled(!atBottom);
  };

  const handleSaveInsight = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (!message) return;

    saveJournalEntry({
      id: generateId(),
      content: message.content,
      sourceMessageId: messageId,
      conversationId,
      createdAt: Date.now(),
    });

    setSavedMessageId(messageId);
    setTimeout(() => setSavedMessageId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          {displayMessages.map((msg) => (
            <div key={msg.id} className="relative">
              <MessageBubble
                message={msg}
                onSaveInsight={
                  msg.role === "assistant" && msg.id !== "welcome"
                    ? handleSaveInsight
                    : undefined
                }
              />
              {savedMessageId === msg.id && (
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-[#c9a96e] text-xs animate-fade-in-up">
                  保存しました
                </div>
              )}
            </div>
          ))}
          {isThinking && <ThinkingAnimation />}
          {error && (
            <div className="text-center text-red-400/80 text-sm py-2 animate-fade-in-up">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {messages.length > 0 && (
        <div className="flex justify-center gap-3 px-4 pb-2">
          <button
            onClick={() => router.push(`/journal/new?conversationId=${conversationId}`)}
            className="px-5 py-2 rounded-full text-xs tracking-wide
              bg-[#c9a96e]/10 text-[#c9a96e]/70 border border-[#c9a96e]/20
              hover:bg-[#c9a96e]/20 hover:text-[#c9a96e] transition-all duration-300"
          >
            気づきを入力する
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("current-conversation");
              router.push("/");
            }}
            className="px-5 py-2 rounded-full text-xs tracking-wide
              bg-[#e8e6e3]/5 text-[#e8e6e3]/40 border border-[#e8e6e3]/10
              hover:bg-[#e8e6e3]/10 hover:text-[#e8e6e3]/60 transition-all duration-300"
          >
            終了する
          </button>
        </div>
      )}
      <ChatInput onSend={sendMessage} disabled={isThinking} />
    </div>
  );
}
