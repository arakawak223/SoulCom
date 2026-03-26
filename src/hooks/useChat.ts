"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Message } from "@/lib/types";
import {
  saveConversation,
  loadConversation,
} from "@/lib/supabase/database";

const MINIMUM_THINKING_MS = 2500;

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function useChat(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const currentIdRef = useRef(conversationId);

  // Load conversation when conversationId changes
  useEffect(() => {
    currentIdRef.current = conversationId;
    setError(null);
    setIsThinking(false);
    abortRef.current?.abort();
    loadConversation(conversationId).then((saved) => {
      if (currentIdRef.current === conversationId) {
        setMessages(saved && saved.length > 0 ? saved : []);
      }
    });
  }, [conversationId]);

  // Save conversation whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveConversation(currentIdRef.current, messages);
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (content: string) => {
      setError(null);

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content,
        timestamp: Date.now(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsThinking(true);

      const thinkingStart = Date.now();

      try {
        abortRef.current = new AbortController();

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.error || "接続に問題が発生しました"
          );
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("ストリームを開けませんでした");

        const decoder = new TextDecoder();
        let assistantContent = "";

        // Enforce minimum thinking time
        const elapsed = Date.now() - thinkingStart;
        if (elapsed < MINIMUM_THINKING_MS) {
          await new Promise((r) =>
            setTimeout(r, MINIMUM_THINKING_MS - elapsed)
          );
        }

        const assistantMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: "",
          timestamp: Date.now(),
        };

        setIsThinking(false);
        setMessages((prev) => [...prev, assistantMessage]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          assistantContent += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last.role === "assistant") {
              updated[updated.length - 1] = {
                ...last,
                content: assistantContent,
              };
            }
            return updated;
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setIsThinking(false);
        setError(
          err instanceof Error
            ? err.message
            : "申し訳ありません。接続に問題が発生しました"
        );
      }
    },
    [messages]
  );

  const clearConversation = useCallback(() => {
    setMessages([]);
    setError(null);
    abortRef.current?.abort();
  }, []);

  return {
    messages,
    isThinking,
    error,
    sendMessage,
    clearConversation,
  };
}
