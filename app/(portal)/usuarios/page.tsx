import Link from "next/link";
import { redirect } from "next/navigation";
import { createUserAction } from "@/app/(portal)/usuarios/actions";
import { canViewUsers, getPortalSession } from "@/lib/auth";
import { listClientOptions, listPortalUsers } from "@/lib/data-store";

const errorLabels: Record<string, string> = {
  missing_fields: "Completa nombre, email y contraseña.",
  duplicate_email: "Ya existe un usuario con ese email.",
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: { status?: string; error?: string; saved?: string };
}) {
  const session = await getPortalSession();
  if (!session) redirect("/login");
  if (!canViewUsers(session.role)) redirect("/dashboard");

  const filterActive = searchParams?.status === "active";
  const saved = searchParams?.saved === "1";
  const error = searchParams?.error || "";

  const allUsers = await listPortalUsers();
  const clients = await listClientOptions();
  const rows = filterActive ? allUsers.filter((user) => user.status === "Active") : allUsers;

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-slate">Administracion</p>
        <h1 className="mt-1 text-3xl font-semibold">Usuarios del portal</h1>
        <p className="mt-2 text-sm text-slate">Visible solo para CTO, CEO y OPERARIO.</p>
      </header>

      {saved && <p className="rounded-xl border border-mint/30 bg-mint/10 px-3 py-2 text-sm text-mint">Usuario creado correctamente.</p>}
      {error && <p className="rounded-xl border border-coral/30 bg-coral/10 px-3 py-2 text-sm text-coral">{errorLabels[error] || "No se pudo crear el usuario."}</p>}

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <div className="mb-4 flex flex-wrap gap-2">
          <Link href={filterActive ? "/usuarios" : "/usuarios?status=active"} className="rounded-xl border border-slate/20 bg-bg px-3 py-2 text-sm">
            {filterActive ? "Ver todos" : "Filtrar activos"}
          </Link>
        </div>

        <form action={createUserAction} className="grid gap-3 rounded-2xl border border-slate/15 bg-bg p-4 md:grid-cols-2">
          <input name="name" required placeholder="Nombre" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm" />
          <input name="email" required type="email" placeholder="email@empresa.com" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm" />
          <input name="password" required type="password" placeholder="Contraseña" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm" />
          <select name="role" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm" defaultValue="CLIENTE">
            <option value="CLIENTE">CLIENTE</option>
            <option value="OPERARIO">OPERARIO</option>
            <option value="CEO">CEO</option>
            <option value="CTO">CTO</option>
          </select>
          <select name="status" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm" defaultValue="Active">
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
            <option value="Pending">Pending</option>
          </select>
          <select name="clientCode" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm" defaultValue={session.clientCode}>
            {clients.map((client) => (
              <option key={client.code} value={client.code}>
                {client.name} ({client.code})
              </option>
            ))}
          </select>

          <button className="rounded-xl bg-ink px-3 py-2 text-sm text-white md:col-span-2">Nuevo usuario</button>
        </form>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.1em] text-slate">
              <tr>
                <th className="py-2">Nombre</th>
                <th className="py-2">Email</th>
                <th className="py-2">Rol</th>
                <th className="py-2">Estado</th>
                <th className="py-2">ClientCode</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-slate/10">
                  <td className="py-2.5">{row.name}</td>
                  <td className="py-2.5">{row.email}</td>
                  <td className="py-2.5">{row.role}</td>
                  <td className="py-2.5">{row.status}</td>
                  <td className="py-2.5">{row.clientCode || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
