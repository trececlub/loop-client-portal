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
    </div>
  );
}
