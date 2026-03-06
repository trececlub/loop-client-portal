import { getPortalSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-slate">Cuenta</p>
        <h1 className="mt-1 text-3xl font-semibold">Perfil</h1>
      </header>

      <section className="rounded-2xl border border-slate/20 bg-white p-5 shadow-card">
        <p className="text-xs uppercase tracking-[0.14em] text-slate">Credencial activa</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate/15 bg-bg px-3 py-2">
            <p className="text-xs uppercase tracking-[0.12em] text-slate">Nombre</p>
            <p className="mt-1 text-sm font-medium text-ink">{session.user.name}</p>
          </div>
          <div className="rounded-xl border border-slate/15 bg-bg px-3 py-2">
            <p className="text-xs uppercase tracking-[0.12em] text-slate">Email</p>
            <p className="mt-1 text-sm font-medium text-ink">{session.user.email}</p>
          </div>
          <div className="rounded-xl border border-slate/15 bg-bg px-3 py-2">
            <p className="text-xs uppercase tracking-[0.12em] text-slate">Rol</p>
            <p className="mt-1 text-sm font-medium text-ink">{session.role}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <p className="text-sm text-slate">Para cerrar sesion usa el boton "Salir" en la esquina superior.</p>
      </section>
    </div>
  );
}
