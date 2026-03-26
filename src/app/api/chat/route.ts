import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/anthropic";
import { buildSystemPrompt } from "@/lib/systemPrompt";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    const { messages, conversationSummary } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "メッセージが必要です" },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(conversationSummary);

    const apiMessages = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })
    );

    const stream = await client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: apiMessages,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    if (error && typeof error === "object" && "status" in error) {
      const apiError = error as { status: number };
      if (apiError.status === 401) {
        return NextResponse.json(
          { error: "APIキーが無効です" },
          { status: 401 }
        );
      }
      if (apiError.status === 429) {
        return NextResponse.json(
          { error: "リクエストが多すぎます。少し待ってから再度お試しください" },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "申し訳ありません。接続に問題が発生しました" },
      { status: 500 }
    );
  }
}
