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
          className="loop-icon-float relative flex items-center justify-center"
          style={{
            width: "clamp(220px, 18vmax, 320px)",
            height: "clamp(220px, 18vmax, 320px)",
            transform: "perspective(900px) rotateX(10deg) rotateY(-8deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-[-24%]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(56,189,248,0.42) 0%, rgba(56,189,248,0.14) 46%, rgba(56,189,248,0) 84%)",
              filter: "blur(20px)",
              animation: "loopGlowPulse 5.2s ease-in-out infinite",
            }}
          />
          <div
            aria-label="Icono LOOP"
            className="relative h-full w-full"
            style={{
              background:
                "linear-gradient(145deg, rgba(251,254,255,0.98) 0%, rgba(224,247,255,0.95) 36%, rgba(166,229,255,0.94) 100%)",
              WebkitMaskImage: "url('/brand/loop-icon.svg')",
              maskImage: "url('/brand/loop-icon.svg')",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              filter:
                "drop-shadow(0 0 20px rgba(56,189,248,0.34)) drop-shadow(0 18px 28px rgba(16,33,38,0.22))",
            }}
          />
          <div
            className="absolute h-[82%] w-[82%]"
            style={{
              background:
                "linear-gradient(110deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.06) 36%, rgba(255,255,255,0) 72%)",
              WebkitMaskImage: "url('/brand/loop-icon.svg')",
              maskImage: "url('/brand/loop-icon.svg')",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              transform: "translate3d(8px, -8px, 0)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
