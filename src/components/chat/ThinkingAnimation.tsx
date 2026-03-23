"use client";

export default function ThinkingAnimation() {
  return (
    <div className="flex items-center justify-center py-8 animate-fade-in-up">
      <div className="relative flex items-center justify-center">
        {/* Outer breathing circle */}
        <div className="absolute w-16 h-16 rounded-full bg-[#c9a96e]/10 animate-breathe" />
        {/* Inner breathing circle */}
        <div
          className="absolute w-10 h-10 rounded-full bg-[#c9a96e]/20 animate-breathe"
          style={{ animationDelay: "0.5s" }}
        />
        {/* Center dot */}
        <div className="w-3 h-3 rounded-full bg-[#c9a96e]/60 animate-shimmer" />
      </div>
    </div>
  );
}
