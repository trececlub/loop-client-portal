"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/llamadas", label: "Llamadas" },
  { href: "/citas", label: "Citas" },
  { href: "/mensajes", label: "Mensajes" },
  { href: "/comparativas", label: "Comparativas" },
  { href: "/reportes", label: "Reportes" },
  { href: "/perfil", label: "Perfil" },
  { href: "/usuarios", label: "Usuarios" }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[260px_1fr] lg:gap-5 lg:px-6">
        <aside className="rounded-3xl border border-slate/20 bg-panel p-4 shadow-card">
          <div className="rounded-2xl bg-gradient-to-br from-mint to-sky p-4 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">Loop</p>
            <h1 className="mt-1 text-xl font-semibold">Client Portal</h1>
            <p className="mt-2 text-sm text-white/85">Vista clara de la operacion de tu negocio</p>
          </div>

          <nav className="mt-5 space-y-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-3 py-2 text-sm transition ${
                    active ? "bg-ink text-white" : "text-slate hover:bg-slate/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="rounded-3xl border border-slate/20 bg-panel shadow-card">
          <header className="border-b border-slate/15 px-5 py-4 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate">Cliente activo</p>
                <h2 className="text-lg font-semibold">Clinica Sonrisa</h2>
              </div>
              <div className="inline-flex items-center gap-3 rounded-xl border border-slate/20 bg-bg px-3 py-2 text-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-mint" />
                Operacion estable
              </div>
            </div>
          </header>
          <main className="p-5 sm:p-7">{children}</main>
        </div>
      </div>
    </div>
  );
}
