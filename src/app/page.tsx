"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-8 animate-fade-in-up">
        {/* Compass icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8b7355] flex items-center justify-center animate-breathe">
          <svg
            width="36"
            height="36"
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

        <div className="space-y-3">
          <h1 className="text-3xl font-light text-[#e8e6e3] tracking-wider">
            Soul Compass
          </h1>
          <p className="text-[#e8e6e3]/50 text-sm tracking-wide">
            ソウルコンパス
          </p>
        </div>

        <p className="text-[#e8e6e3]/70 text-sm leading-relaxed max-w-sm mx-auto font-light">
          答えは、あなたの中にきっとある
          <br />
          未来のあなたが、今のあなたを迎えに来る場所
        </p>

        <Link
          href="/chat"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full
            bg-[#c9a96e]/20 text-[#c9a96e] border border-[#c9a96e]/30
            hover:bg-[#c9a96e]/30 hover:border-[#c9a96e]/50
            transition-all duration-300 text-sm tracking-wide"
        >
          対話をはじめる
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
