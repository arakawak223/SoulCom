"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { JournalEntry } from "@/lib/types";
import {
  loadJournalEntries,
  deleteJournalEntry as deleteEntry,
} from "@/lib/supabase/database";

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    loadJournalEntries().then(setEntries);
  }, []);

  const refresh = useCallback(() => {
    loadJournalEntries().then(setEntries);
  }, []);

  const deleteJournalEntry = useCallback(async (id: string) => {
    await deleteEntry(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { entries, refresh, deleteJournalEntry };
}
