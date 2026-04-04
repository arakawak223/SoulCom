import { createClient } from "./client";
import { Message, ConversationMeta, JournalEntry, UserSettings, QuestionMode } from "../types";

export async function saveConversation(
  id: string,
  messages: Message[]
): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const preview =
    messages.find((m) => m.role === "user")?.content.slice(0, 50) || "";

  await supabase.from("conversations").upsert({
    id,
    user_id: user.id,
    messages,
    preview,
    message_count: messages.length,
    updated_at: new Date().toISOString(),
  });
}

export async function loadConversation(
  id: string
): Promise<Message[] | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("conversations")
    .select("messages")
    .eq("id", id)
    .single();
  return (data?.messages as Message[]) ?? null;
}

export async function listConversations(): Promise<ConversationMeta[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("conversations")
    .select("id, preview, message_count, updated_at")
    .order("updated_at", { ascending: false });

  return (data ?? []).map(
    (row: {
      id: string;
      preview: string;
      message_count: number;
      updated_at: string;
    }) => ({
      id: row.id,
      preview: row.preview,
      messageCount: row.message_count,
      updatedAt: new Date(row.updated_at).getTime(),
    })
  );
}

export async function deleteConversation(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("conversations").delete().eq("id", id);
}

export async function saveJournalEntry(entry: JournalEntry): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("journal_entries").insert({
    id: entry.id,
    user_id: user.id,
    content: entry.content,
    source_message_id: entry.sourceMessageId ?? null,
    conversation_id: entry.conversationId ?? null,
    created_at: new Date(entry.createdAt).toISOString(),
  });
}

export async function loadJournalEntries(): Promise<JournalEntry[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("journal_entries")
    .select("*")
    .order("created_at", { ascending: false });

  return (data ?? []).map(
    (row: {
      id: string;
      content: string;
      source_message_id: string | null;
      conversation_id: string | null;
      created_at: string;
    }) => ({
      id: row.id,
      content: row.content,
      sourceMessageId: row.source_message_id ?? undefined,
      conversationId: row.conversation_id ?? undefined,
      createdAt: new Date(row.created_at).getTime(),
    })
  );
}

export async function deleteJournalEntry(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("journal_entries").delete().eq("id", id);
}

export async function loadUserSettings(): Promise<UserSettings> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { questionMode: "single" };

  const { data } = await supabase
    .from("user_settings")
    .select("question_mode")
    .eq("user_id", user.id)
    .single();

  return {
    questionMode: (data?.question_mode as QuestionMode) ?? "single",
  };
}

export async function saveUserSettings(settings: UserSettings): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("user_settings").upsert({
    user_id: user.id,
    question_mode: settings.questionMode,
    updated_at: new Date().toISOString(),
  });
}
