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
        <aside className="relative overflow-hidden rounded-3xl border border-sky-200/40 bg-gradient-to-b from-[#0b5f9f] via-[#0a6fb4] to-[#0b7ac3] p-4 text-white shadow-[0_24px_60px_-28px_rgba(4,68,121,0.7)]">
          <div className="pointer-events-none absolute -right-10 -top-6 h-36 w-36 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute -left-10 bottom-6 h-40 w-40 rounded-full bg-cyan-100/20 blur-3xl" />

          <div className="relative rounded-2xl border border-white/30 bg-white/14 p-4 backdrop-blur">
            <img
              src="/brand/loop-logo.svg"
              alt="LOOP"
              className="h-8 w-auto invert brightness-0"
            />
            <h1 className="mt-3 text-xl font-semibold">Client Portal</h1>
            <p className="mt-2 text-sm text-white/90">Panel informativo para clientes y gestion interna.</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-white/25 bg-white/14 px-2.5 py-2">
                <p className="text-white/75">Rol activo</p>
                <p className="mt-0.5 font-semibold text-white">{role}</p>
              </div>
              <div className="rounded-xl border border-white/25 bg-white/14 px-2.5 py-2">
                <p className="text-white/75">Sesion</p>
                <p className="mt-0.5 font-semibold text-white">Online</p>
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
                  className={`uiverse-card sidebar-nav-card group block rounded-2xl px-3 py-2.5 text-white/95 ${
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
                      <div className="text-xs text-white/80">{item.hint}</div>
                    </div>
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition ${
                        active ? "bg-white" : "bg-white/30 group-hover:bg-white/80"
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="rounded-3xl border border-slate/20 bg-panel/95 shadow-card backdrop-blur">
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
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate/20 bg-bg px-3 py-2 text-sm font-medium text-ink">
                  <span className="inline-block h-2 w-2 rounded-full bg-mint shadow-[0_0_0_4px_rgba(11,139,125,0.15)]" />
                  Operacion estable
                </div>
                <Link
                  href="/logout"
                  className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm text-slate transition hover:-translate-y-[1px] hover:border-slate/30 hover:bg-slate-50"
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
