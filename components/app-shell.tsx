"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard", hint: "Rendimiento general", code: "DB" },
  { href: "/llamadas", label: "Llamadas", hint: "Trafico y resultados", code: "LL" },
  { href: "/citas", label: "Citas", hint: "Agenda y confirmaciones", code: "CT" },
  { href: "/mensajes", label: "Mensajes", hint: "WhatsApp y email", code: "MS" },
  { href: "/comparativas", label: "Comparativas", hint: "Mes contra mes", code: "CP" },
  { href: "/reportes", label: "Reportes", hint: "Exportacion CSV", code: "RP" },
  { href: "/perfil", label: "Perfil", hint: "Sesion y permisos", code: "PF" },
  { href: "/usuarios", label: "Usuarios", hint: "Gestion de accesos", code: "US", internalOnly: true }
];

type AppShellProps = {
  role: "CTO" | "CEO" | "OPERARIO" | "CLIENTE";
  userName: string;
  children: React.ReactNode;
};

export function AppShell({ role, userName, children }: AppShellProps) {
  const pathname = usePathname();
  const filteredNav = nav.filter((item) => !(item.internalOnly && role === "CLIENTE"));
  const activeItem = filteredNav.find((item) => pathname === item.href);

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg text-ink">
      <div className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 rounded-full bg-sky/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sky/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-[1560px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[300px_1fr] lg:gap-5 lg:px-6">
        <aside className="glass-card relative overflow-hidden rounded-3xl p-4 text-ink">
          <div className="pointer-events-none absolute -right-10 -top-6 h-36 w-36 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute -left-10 bottom-6 h-40 w-40 rounded-full bg-white/16 blur-3xl" />

          <div className="glass-card relative rounded-2xl p-4">
            <img
              src="/brand/loop-logo.svg"
              alt="LOOP"
              className="h-8 w-auto"
            />
            <h1 className="mt-3 text-xl font-semibold">Client Portal</h1>
            <p className="mt-2 text-sm text-slate">Panel informativo para clientes y gestion interna.</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-white/35 bg-white/20 px-2.5 py-2">
                <p className="text-slate">Rol activo</p>
                <p className="mt-0.5 font-semibold text-ink">{role}</p>
              </div>
              <div className="rounded-xl border border-white/35 bg-white/20 px-2.5 py-2">
                <p className="text-slate">Sesion</p>
                <p className="mt-0.5 font-semibold text-ink">Online</p>
              </div>
            </div>
          </div>

          <nav className="uiverse-cards relative mt-5">
            {filteredNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`uiverse-card sidebar-nav-card group block rounded-2xl px-3 py-2.5 text-ink ${
                    active ? "sidebar-nav-card-active" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="sidebar-nav-code-chip inline-flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-semibold transition"
                    >
                      {item.code}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs text-slate">{item.hint}</div>
                    </div>
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition ${
                        active ? "bg-ink" : "bg-slate/40 group-hover:bg-slate"
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="glass-card rounded-3xl">
          <header className="border-b border-slate/15 px-5 py-4 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate">Usuario activo</p>
                <h2 className="text-lg font-semibold leading-tight">{userName}</h2>
                <p className="text-xs text-slate">
                  Rol: {role}
                  {activeItem ? ` · Modulo: ${activeItem.label}` : ""}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="glass-muted-block inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-ink">
                  <span className="inline-block h-2 w-2 rounded-full bg-mint shadow-[0_0_0_4px_rgba(11,139,125,0.15)]" />
                  Operacion estable
                </div>
                <Link
                  href="/logout"
                  className="glass-btn-soft rounded-xl px-3 py-2 text-sm transition hover:-translate-y-[1px]"
                >
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
