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
  { href: "/usuarios", label: "Usuarios", internalOnly: true }
];

type AppShellProps = {
  role: "CTO" | "CEO" | "OPERARIO" | "CLIENTE";
  userName: string;
  children: React.ReactNode;
};

export function AppShell({ role, userName, children }: AppShellProps) {
  const pathname = usePathname();
  const filteredNav = nav.filter((item) => !(item.internalOnly && role === "CLIENTE"));

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
            {filteredNav.map((item) => {
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
                <p className="text-xs uppercase tracking-[0.18em] text-slate">Usuario activo</p>
                <h2 className="text-lg font-semibold">{userName}</h2>
                <p className="text-xs text-slate">{role}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-3 rounded-xl border border-slate/20 bg-bg px-3 py-2 text-sm">
                  <span className="inline-block h-2 w-2 rounded-full bg-mint" />
                  Operacion estable
                </div>
                <Link href="/logout" className="rounded-xl border border-slate/20 bg-bg px-3 py-2 text-sm text-slate hover:bg-slate/10">
                  Salir
                </Link>
              </div>
            </div>
          </header>
          <main className="p-5 sm:p-7">{children}</main>
        </div>
      </div>
    </div>
  );
}
