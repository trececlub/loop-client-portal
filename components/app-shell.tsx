"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard", hint: "Rendimiento general" },
  { href: "/llamadas", label: "Llamadas", hint: "Trafico y resultados" },
  { href: "/citas", label: "Citas", hint: "Agenda y confirmaciones" },
  { href: "/mensajes", label: "Mensajes", hint: "WhatsApp y email" },
  { href: "/comparativas", label: "Comparativas", hint: "Mes contra mes" },
  { href: "/reportes", label: "Reportes", hint: "Exportacion CSV" },
  { href: "/perfil", label: "Perfil", hint: "Sesion y permisos" },
  { href: "/usuarios", label: "Usuarios", hint: "Gestion de accesos", internalOnly: true }
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
    <div className="relative min-h-screen overflow-hidden bg-bg text-ink">
      <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-mint/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sky/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-[1480px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[290px_1fr] lg:gap-5 lg:px-6">
        <aside className="rounded-3xl border border-slate/20 bg-gradient-to-b from-[#17333A] via-[#143139] to-[#112B33] p-4 text-white shadow-[0_22px_50px_-28px_rgba(16,33,38,0.65)]">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/75">Loop</p>
            <h1 className="mt-1 text-xl font-semibold">Client Portal</h1>
            <p className="mt-2 text-sm text-white/85">Vista limpia y accionable para clientes y equipo interno.</p>
          </div>

          <nav className="mt-5 space-y-2">
            {filteredNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group block rounded-2xl border px-3 py-2.5 transition ${
                    active
                      ? "border-white/25 bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
                      : "border-transparent text-white/85 hover:border-white/15 hover:bg-white/10"
                  }`}
                >
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-white/65">{item.hint}</div>
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
                <p className="text-xs text-slate">Rol: {role}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate/20 bg-bg px-3 py-2 text-sm font-medium">
                  <span className="inline-block h-2 w-2 rounded-full bg-mint" />
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
