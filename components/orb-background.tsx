"use client";

import Orb from "@/components/orb";

export function OrbBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[130vmax] w-[130vmax] -translate-x-1/2 -translate-y-1/2 opacity-95">
        <Orb
          hue={19}
          hoverIntensity={0}
          rotateOnHover
          forceHoverState
          backgroundColor="#f4f7f6"
        />
      </div>
    </div>
  );
}
