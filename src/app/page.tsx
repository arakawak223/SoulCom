"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-10 animate-fade-in-up">
        {/* Logo / Title */}
        <div className="space-y-3">
          <h1 className="text-3xl font-light text-[#e8e6e3] tracking-wider">
            Soul Compass
          </h1>
          <p className="text-[#e8e6e3]/50 text-sm tracking-wide">
            ソウルコンパス
          </p>
        </div>

        <p className="text-[#e8e6e3]/60 text-sm leading-relaxed max-w-sm mx-auto font-light">
          あなたに合った対話を選んでください
        </p>

        {/* Mode Selection */}
        <div className="flex flex-col sm:flex-row gap-5 max-w-lg mx-auto">
          {/* 何でも相談室 */}
          <Link
            href="/chat?mode=compass"
            className="flex-1 group p-6 rounded-2xl
              bg-[#c9a96e]/5 border border-[#c9a96e]/20
              hover:bg-[#c9a96e]/15 hover:border-[#c9a96e]/40
              transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 rounded-full bg-[#c9a96e]/20 flex items-center justify-center mb-4 group-hover:bg-[#c9a96e]/30 transition-colors">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c9a96e"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </div>
            <h2 className="text-[#e8e6e3] text-base font-medium mb-2">
              何でも相談室
            </h2>
            <p className="text-[#e8e6e3]/50 text-xs leading-relaxed">
              あなたの内側にある答えを、問いかけを通じて一緒に見つけていきます
            </p>
          </Link>

          {/* 人間再生塾 */}
          <Link
            href="/chat?mode=saisei"
            className="flex-1 group p-6 rounded-2xl
              bg-[#e86c3a]/5 border border-[#e86c3a]/20
              hover:bg-[#e86c3a]/15 hover:border-[#e86c3a]/40
              transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 rounded-full bg-[#e86c3a]/20 flex items-center justify-center mb-4 group-hover:bg-[#e86c3a]/30 transition-colors">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e86c3a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h2 className="text-[#e8e6e3] text-base font-medium mb-2">
              人間再生塾
            </h2>
            <p className="text-[#e8e6e3]/50 text-xs leading-relaxed">
              魂の再生を導く塾頭が、あなたの重荷を一緒に背負い、人生の再構築に伴走します
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
