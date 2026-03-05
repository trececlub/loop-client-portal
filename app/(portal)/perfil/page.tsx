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

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.14em] text-slate">Usuario</p>
          <p className="mt-2 text-lg font-medium">{session.user.email}</p>
          <p className="mt-1 text-sm text-slate">Rol: {session.role}</p>
        </article>
        <article className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
          {session.role === "CLIENTE" ? (
            <>
              <p className="text-xs uppercase tracking-[0.14em] text-slate">Cliente</p>
              <p className="mt-2 text-lg font-medium">{session.clientName}</p>
              <p className="mt-1 text-sm text-slate">Codigo asignado: {session.assignedClientCode}</p>
            </>
          ) : (
            <>
              <p className="text-xs uppercase tracking-[0.14em] text-slate">Perfil administrativo</p>
              <p className="mt-2 text-lg font-medium">Sin codigo de cliente asignado</p>
              <p className="mt-1 text-sm text-slate">Contexto actual de vista: {session.clientCode}</p>
            </>
          )}
        </article>
      </section>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <p className="text-sm text-slate">Para cerrar sesion usa el boton "Salir" en la esquina superior.</p>
      </section>
    </div>
  );
}
