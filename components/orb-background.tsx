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
            transform: "perspective(980px) rotateX(12deg) rotateY(-9deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute h-full w-full"
            style={{
              background:
                "linear-gradient(158deg, rgba(27,59,77,0.7) 0%, rgba(22,48,62,0.78) 52%, rgba(15,35,47,0.88) 100%)",
              WebkitMaskImage: "url('/brand/loop-icon.svg')",
              maskImage: "url('/brand/loop-icon.svg')",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              transform: "translate3d(12px, 16px, -1px)",
              filter: "blur(0.35px) drop-shadow(0 18px 24px rgba(10,26,35,0.34))",
            }}
          />
          <div
            aria-label="Icono LOOP"
            className="relative h-full w-full"
            style={{
              background:
                "linear-gradient(152deg, rgba(254,255,255,0.98) 0%, rgba(235,251,255,0.97) 24%, rgba(191,236,255,0.94) 56%, rgba(146,216,246,0.9) 100%)",
              WebkitMaskImage: "url('/brand/loop-icon.svg')",
              maskImage: "url('/brand/loop-icon.svg')",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              filter:
                "drop-shadow(0 1px 0 rgba(255,255,255,0.6)) drop-shadow(0 14px 24px rgba(16,33,38,0.24))",
            }}
          />
          <div
            className="absolute h-full w-full"
            style={{
              background:
                "linear-gradient(148deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.08) 38%, rgba(255,255,255,0) 68%)",
              WebkitMaskImage: "url('/brand/loop-icon.svg')",
              maskImage: "url('/brand/loop-icon.svg')",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              transform: "translate3d(-2px, -4px, 1px)",
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
              transform: "translate3d(10px, -10px, 2px)",
            }}
          />
          <div
            className="absolute h-full w-full"
            style={{
              background:
                "radial-gradient(circle at 42% 24%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.08) 26%, rgba(255,255,255,0) 56%)",
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
