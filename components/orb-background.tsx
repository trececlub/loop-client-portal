"use client";

import Orb from "@/components/orb";

export function OrbBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90"
        style={{ width: "clamp(420px, 62vmin, 760px)", height: "clamp(420px, 62vmin, 760px)" }}
      >
        <Orb
          hue={19}
          hoverIntensity={0}
          rotateOnHover={false}
          forceHoverState={false}
          backgroundColor="#f4f7f6"
        />
      </div>
    </div>
  );
}
