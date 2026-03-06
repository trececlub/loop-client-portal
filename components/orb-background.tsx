"use client";

export function OrbBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-[-18%]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(58,141,222,0.12) 0%, rgba(58,141,222,0.05) 38%, transparent 74%)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "clamp(360px, 34vmin, 520px)",
          height: "clamp(360px, 34vmin, 520px)",
          opacity: 0.9,
          WebkitMaskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 48%, rgba(0,0,0,0.86) 70%, rgba(0,0,0,0) 100%)",
          maskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 48%, rgba(0,0,0,0.86) 70%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          className="absolute inset-[-14%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(56,189,248,0.48) 0%, rgba(56,189,248,0.16) 45%, rgba(56,189,248,0) 82%)",
            filter: "blur(24px)",
            animation: "loopGlowPulse 5.2s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(16,33,38,0) 22%, rgba(16,33,38,0.08) 64%, rgba(16,33,38,0.24) 100%)",
          }}
        />
        <img
          src="/brand/loop-icon.svg"
          alt="Icono LOOP"
          className="loop-icon-float relative h-full w-full object-contain"
          style={{ filter: "drop-shadow(0 0 24px rgba(56,189,248,0.38)) drop-shadow(0 18px 34px rgba(16,33,38,0.24))" }}
        />
      </div>
    </div>
  );
}
