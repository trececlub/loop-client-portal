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
      <div className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 rounded-full bg-mint/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sky/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-[1560px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[300px_1fr] lg:gap-5 lg:px-6">
        <aside className="rounded-3xl border border-slate/20 bg-gradient-to-b from-[#16343b] via-[#13323a] to-[#112d34] p-4 text-white shadow-[0_24px_60px_-30px_rgba(16,33,38,0.72)]">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/75">Loop</p>
            <h1 className="mt-1 text-xl font-semibold">Client Portal</h1>
            <p className="mt-2 text-sm text-white/85">Panel informativo para clientes y gestion interna.</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-white/20 bg-white/10 px-2.5 py-2">
                <p className="text-white/70">Rol activo</p>
                <p className="mt-0.5 font-semibold text-white">{role}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 px-2.5 py-2">
                <p className="text-white/70">Sesion</p>
                <p className="mt-0.5 font-semibold text-white">Online</p>
              </div>
            </div>
          </div>

          <nav className="mt-5 space-y-2">
            {filteredNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group block rounded-2xl border px-3 py-2.5 transition-all ${
                    active
                      ? "border-white/30 bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                      : "border-transparent text-white/85 hover:-translate-y-[1px] hover:border-white/15 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-lg border text-[10px] font-semibold ${
                        active ? "border-white/30 bg-white/20 text-white" : "border-white/20 bg-white/10 text-white/80"
                      }`}
                    >
                      {item.code}
                    </span>
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className="text-xs text-white/65">{item.hint}</div>
                    </div>
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
