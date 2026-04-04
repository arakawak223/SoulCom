"use client";

import { useState, useEffect, useCallback } from "react";
import { UserSettings, QuestionMode } from "@/lib/types";
import { loadUserSettings, saveUserSettings } from "@/lib/supabase/database";

const DEFAULT_SETTINGS: UserSettings = { questionMode: "single" };

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserSettings()
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  const updateQuestionMode = useCallback(
    async (mode: QuestionMode) => {
      const updated = { ...settings, questionMode: mode };
      setSettings(updated);
      await saveUserSettings(updated);
    },
    [settings]
  );

  return { settings, loading, updateQuestionMode };
}
