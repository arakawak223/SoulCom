export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface ConversationMeta {
  id: string;
  preview: string;
  messageCount: number;
  updatedAt: number;
}

export interface JournalEntry {
  id: string;
  content: string;
  sourceMessageId?: string;
  conversationId?: string;
  createdAt: number;
}
