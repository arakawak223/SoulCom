"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleNewChat = () => {
    const newId = generateId();
    sessionStorage.setItem("current-conversation", newId);
    router.push(`/chat?id=${newId}`);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0e27]/70 border-b border-[rgba(201,169,110,0.15)]">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b7355] flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </div>
          <span className="text-[#e8e6e3] font-light text-lg tracking-wide">
            Soul Compass
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          {pathname === "/chat" && (
            <button
              onClick={handleNewChat}
              className="text-[#e8e6e3]/40 hover:text-[#c9a96e] transition-colors p-1"
              title="新しい対話"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          )}
          <Link
            href="/chat"
            className={`text-sm transition-colors ${
              pathname === "/chat"
                ? "text-[#c9a96e]"
                : "text-[#e8e6e3]/60 hover:text-[#e8e6e3]"
            }`}
          >
            対話
          </Link>
          <Link
            href="/history"
            className={`text-sm transition-colors ${
              pathname === "/history"
                ? "text-[#c9a96e]"
                : "text-[#e8e6e3]/60 hover:text-[#e8e6e3]"
            }`}
          >
            履歴
          </Link>
          <Link
            href="/journal"
            className={`text-sm transition-colors ${
              pathname === "/journal"
                ? "text-[#c9a96e]"
                : "text-[#e8e6e3]/60 hover:text-[#e8e6e3]"
            }`}
          >
            気づき
          </Link>
          <Link
            href="/settings"
            className={`text-sm transition-colors ${
              pathname === "/settings"
                ? "text-[#c9a96e]"
                : "text-[#e8e6e3]/60 hover:text-[#e8e6e3]"
            }`}
          >
            設定
          </Link>
          {user && (
            <button
              onClick={signOut}
              className="text-sm text-[#e8e6e3]/40 hover:text-[#e8e6e3] transition-colors"
            >
              ログアウト
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
