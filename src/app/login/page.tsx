"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const supabase = createClient();

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setMessage("確認メールを送信しました。メールをご確認ください。");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(
          error.message === "Invalid login credentials"
            ? "メールアドレスまたはパスワードが正しくありません"
            : error.message
        );
      } else {
        router.push("/chat");
        router.refresh();
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8 animate-fade-in-up">
        {/* Compass icon */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b7355] flex items-center justify-center animate-breathe">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </div>
          <h1 className="text-2xl font-light text-[#e8e6e3] tracking-wider">
            {isSignUp ? "アカウント作成" : "ログイン"}
          </h1>
          <p className="text-[#e8e6e3]/50 text-sm">Soul Compass</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#e8e6e3]/5 border border-[#e8e6e3]/10
                text-[#e8e6e3] placeholder-[#e8e6e3]/30 text-sm
                focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
            />
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl bg-[#e8e6e3]/5 border border-[#e8e6e3]/10
                text-[#e8e6e3] placeholder-[#e8e6e3]/30 text-sm
                focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400/80 text-sm text-center">{error}</p>
          )}
          {message && (
            <p className="text-[#c9a96e] text-sm text-center">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#c9a96e]/20 text-[#c9a96e]
              border border-[#c9a96e]/30 hover:bg-[#c9a96e]/30 hover:border-[#c9a96e]/50
              transition-all duration-300 text-sm tracking-wide
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "..."
              : isSignUp
                ? "アカウントを作成"
                : "ログイン"}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setMessage(null);
            }}
            className="text-[#e8e6e3]/40 hover:text-[#e8e6e3]/70 text-sm transition-colors"
          >
            {isSignUp
              ? "すでにアカウントをお持ちですか？ログイン"
              : "アカウントをお持ちでないですか？新規登録"}
          </button>
        </div>
      </div>
    </div>
  );
}
