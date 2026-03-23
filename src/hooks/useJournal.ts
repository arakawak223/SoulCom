"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { JournalEntry } from "@/lib/types";
import {
  loadJournalEntries,
  deleteJournalEntry as deleteEntry,
} from "@/lib/localStorage";

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    setEntries(loadJournalEntries());
  }, []);

  const refresh = useCallback(() => {
    setEntries(loadJournalEntries());
  }, []);

  const deleteJournalEntry = useCallback((id: string) => {
    deleteEntry(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { entries, refresh, deleteJournalEntry };
}
