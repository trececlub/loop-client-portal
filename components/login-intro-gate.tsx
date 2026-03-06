"use client";

import { useEffect, useMemo, useState } from "react";

type LoginIntroGateProps = {
  children: React.ReactNode;
  skipIntro?: boolean;
};

const WELCOME_TEXT = "Hola, bienvenido a LOOP Portal";

export function LoginIntroGate({ children, skipIntro = false }: LoginIntroGateProps) {
  const [typed, setTyped] = useState("");
  const [readyToContinue, setReadyToContinue] = useState(skipIntro);
  const [showContent, setShowContent] = useState(skipIntro);

  const canContinue = useMemo(() => readyToContinue && !showContent, [readyToContinue, showContent]);

  useEffect(() => {
    if (skipIntro) return;

    let index = 0;
    const typingTimer = window.setInterval(() => {
      index += 1;
      setTyped(WELCOME_TEXT.slice(0, index));
      if (index >= WELCOME_TEXT.length) {
        window.clearInterval(typingTimer);
        window.setTimeout(() => {
          setReadyToContinue(true);
        }, 500);
      }
    }, 44);

    return () => {
      window.clearInterval(typingTimer);
    };
  }, [skipIntro]);

  if (showContent) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent px-4 py-10">
      <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-mint/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-12 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />

      <button
        type="button"
        disabled={!canContinue}
        onClick={() => setShowContent(true)}
        className={`mx-auto flex min-h-[82vh] w-full max-w-5xl flex-col items-center justify-center text-center transition ${
          canContinue ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <div className="mt-[clamp(180px,15vmax,250px)]">
          <p className="portal-kicker">LOOP Portal</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            {readyToContinue ? "Da clic para continuar" : typed}
            {!readyToContinue && <span className="ml-1 inline-block animate-pulse text-sky">|</span>}
          </h1>
        </div>
      </button>
    </div>
  );
}
