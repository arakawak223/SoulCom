import { Message, ConversationMeta, JournalEntry } from "./types";

const CONVERSATIONS_KEY = "soul-compass-conversations";
const JOURNAL_KEY = "soul-compass-journal";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function saveConversation(id: string, messages: Message[]): void {
  if (!isBrowser()) return;
  try {
    const all = getAllConversations();
    all[id] = {
      messages,
      updatedAt: Date.now(),
      createdAt: all[id]?.createdAt || Date.now(),
    };
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(all));
  } catch (e) {
    console.error("Failed to save conversation:", e);
  }
}

export function loadConversation(id: string): Message[] | null {
  if (!isBrowser()) return null;
  try {
    const all = getAllConversations();
    return all[id]?.messages || null;
  } catch {
    return null;
  }
}

export function listConversations(): ConversationMeta[] {
  if (!isBrowser()) return [];
  try {
    const all = getAllConversations();
    return Object.entries(all)
      .map(([id, data]) => ({
        id,
        preview:
          data.messages.find((m: Message) => m.role === "user")?.content.slice(0, 50) ||
          "",
        messageCount: data.messages.length,
        updatedAt: data.updatedAt,
      }))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

export function deleteConversation(id: string): void {
  if (!isBrowser()) return;
  try {
    const all = getAllConversations();
    delete all[id];
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(all));
  } catch (e) {
    console.error("Failed to delete conversation:", e);
  }
}

function getAllConversations(): Record<
  string,
  { messages: Message[]; createdAt: number; updatedAt: number }
> {
  try {
    const raw = localStorage.getItem(CONVERSATIONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Journal

export function saveJournalEntry(entry: JournalEntry): void {
  if (!isBrowser()) return;
  try {
    const entries = loadJournalEntries();
    entries.unshift(entry);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error("Failed to save journal entry:", e);
  }
}

export function loadJournalEntries(): JournalEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function deleteJournalEntry(id: string): void {
  if (!isBrowser()) return;
  try {
    const entries = loadJournalEntries().filter((e) => e.id !== id);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error("Failed to delete journal entry:", e);
  }
}
