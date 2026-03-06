"use client";

import Orb from "@/components/orb";

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
          width: "clamp(860px, 108vmin, 1400px)",
          height: "clamp(860px, 108vmin, 1400px)",
          opacity: 0.62,
          filter: "blur(1.2px)",
          WebkitMaskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 42%, rgba(0,0,0,0.92) 60%, rgba(0,0,0,0.24) 78%, rgba(0,0,0,0) 100%)",
          maskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 42%, rgba(0,0,0,0.92) 60%, rgba(0,0,0,0.24) 78%, rgba(0,0,0,0) 100%)",
        }}
      >
        <Orb
          hue={19}
          hoverIntensity={0}
          rotateOnHover={false}
          forceHoverState={false}
          backgroundColor="#102126"
        />
      </div>

      <div className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
        <div
          className="loop-icon-float relative flex items-center justify-center rounded-full"
          style={{
            width: "clamp(128px, 10.5vmax, 186px)",
            height: "clamp(128px, 10.5vmax, 186px)",
            border: "1px solid rgba(255,255,255,0.44)",
            background: "rgba(255,255,255,0.16)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow:
              "0 22px 40px -24px rgba(16,33,38,0.54), inset 0 1px 0 rgba(255,255,255,0.56), inset 0 -1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <div
            className="absolute inset-[-28%] rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(56,189,248,0.38) 0%, rgba(56,189,248,0.16) 46%, rgba(56,189,248,0) 82%)",
              filter: "blur(18px)",
              animation: "loopGlowPulse 5.2s ease-in-out infinite",
            }}
          />
          <img
            src="/brand/loop-icon.svg"
            alt="Icono LOOP"
            className="relative h-[62%] w-[62%] object-contain"
            style={{ filter: "drop-shadow(0 0 16px rgba(56,189,248,0.32))" }}
          />
        </div>
      </div>
    </div>
  );
}
