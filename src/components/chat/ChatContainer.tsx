"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ThinkingAnimation from "./ThinkingAnimation";
import { saveJournalEntry } from "@/lib/localStorage";

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
      <ChatInput onSend={sendMessage} disabled={isThinking} />
    </div>
  );
}
