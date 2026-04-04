"use client";

import { useSettings } from "@/hooks/useSettings";
import { QuestionMode } from "@/lib/types";

export default function SettingsPage() {
  const { settings, loading, updateQuestionMode } = useSettings();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[#e8e6e3]/40 text-sm">読み込み中...</div>
      </div>
    );
  }

  const options: { value: QuestionMode; label: string; description: string }[] = [
    {
      value: "single",
      label: "一問一答式",
      description: "一度にひとつの問いかけを行います。ひとつの問いに集中して深く内省できます。",
    },
    {
      value: "multiple",
      label: "複数質問あり",
      description: "一度に複数の問いかけを行うことがあります。異なる角度から考えを広げられます。",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-[#e8e6e3] text-xl font-light tracking-wide mb-8">
        設定
      </h1>

      <section>
        <h2 className="text-[#c9a96e] text-sm font-medium tracking-wide mb-4">
          質問形式
        </h2>
        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => updateQuestionMode(option.value)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                settings.questionMode === option.value
                  ? "border-[#c9a96e]/50 bg-[#c9a96e]/10"
                  : "border-[#e8e6e3]/10 bg-[#e8e6e3]/5 hover:border-[#e8e6e3]/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    settings.questionMode === option.value
                      ? "border-[#c9a96e]"
                      : "border-[#e8e6e3]/30"
                  }`}
                >
                  {settings.questionMode === option.value && (
                    <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
                  )}
                </div>
                <div>
                  <div
                    className={`text-sm font-medium ${
                      settings.questionMode === option.value
                        ? "text-[#c9a96e]"
                        : "text-[#e8e6e3]/70"
                    }`}
                  >
                    {option.label}
                    {option.value === "single" && (
                      <span className="ml-2 text-xs text-[#e8e6e3]/30">
                        デフォルト
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#e8e6e3]/40 mt-1">
                    {option.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
