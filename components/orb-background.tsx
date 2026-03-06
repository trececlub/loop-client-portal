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
            width: "clamp(330px, 27vmax, 480px)",
            height: "clamp(330px, 27vmax, 480px)",
          }}
        >
          <div
            aria-label="Icono LOOP"
            className="relative h-full w-full"
            style={{
              background:
                "linear-gradient(152deg, rgba(255,255,255,0.98) 0%, rgba(242,252,255,0.97) 26%, rgba(213,244,255,0.95) 58%, rgba(176,229,250,0.92) 100%)",
              WebkitMaskImage: "url('/brand/loop-icon.svg')",
              maskImage: "url('/brand/loop-icon.svg')",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.68)) drop-shadow(0 12px 20px rgba(16,33,38,0.2))",
            }}
          />
          <div
            className="absolute h-full w-full"
            style={{
              background:
                "linear-gradient(148deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.14) 34%, rgba(255,255,255,0) 66%)",
              WebkitMaskImage: "url('/brand/loop-icon.svg')",
              maskImage: "url('/brand/loop-icon.svg')",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              transform: "translate3d(-1px, -2px, 0)",
            }}
          />
          <div
            className="absolute h-full w-full"
            style={{
              background:
                "radial-gradient(circle at 40% 24%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.12) 26%, rgba(255,255,255,0) 58%)",
              WebkitMaskImage: "url('/brand/loop-icon.svg')",
              maskImage: "url('/brand/loop-icon.svg')",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
}
