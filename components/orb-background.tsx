"use client";

import Orb from "@/components/orb";
import { usePathname } from "next/navigation";

export function OrbBackground() {
  const pathname = usePathname();
  const isLoginView = pathname === "/login";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-[-18%]"
        style={{
          background: isLoginView
            ? "radial-gradient(circle at 50% 50%, rgba(58,141,222,0.12) 0%, rgba(58,141,222,0.05) 38%, transparent 74%)"
            : "radial-gradient(circle at 50% 50%, rgba(58,141,222,0.06) 0%, rgba(58,141,222,0.02) 34%, transparent 72%)",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          top: isLoginView ? "50%" : "46%",
          width: isLoginView ? "clamp(720px, 92vmin, 1160px)" : "clamp(620px, 78vmin, 980px)",
          height: isLoginView ? "clamp(720px, 92vmin, 1160px)" : "clamp(620px, 78vmin, 980px)",
          opacity: isLoginView ? 0.62 : 0.32,
          filter: isLoginView ? "blur(1.2px)" : "blur(1.8px) saturate(0.62) brightness(0.82)",
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

      <div
        className="absolute left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
        style={{ top: isLoginView ? "50%" : "46%", opacity: isLoginView ? 1 : 0.38 }}
      >
        <div
          className="loop-icon-float relative flex items-center justify-center"
          style={{
            width: isLoginView ? "clamp(250px, 21vmax, 380px)" : "clamp(180px, 15vmax, 280px)",
            height: isLoginView ? "clamp(250px, 21vmax, 380px)" : "clamp(180px, 15vmax, 280px)",
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
