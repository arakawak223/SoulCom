"use client";

export default function WaveBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#121640] to-[#1a1a3e]" />
      <svg
        className="absolute bottom-0 w-full opacity-20 animate-wave"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "30vh" }}
      >
        <path
          fill="rgba(201, 169, 110, 0.3)"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
      <svg
        className="absolute bottom-0 w-full opacity-10 animate-wave2"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "25vh" }}
      >
        <path
          fill="rgba(201, 169, 110, 0.4)"
          d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
}
