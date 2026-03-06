import Link from "next/link";
import { redirect } from "next/navigation";
import { createUserAction, deleteUserAction, updateUserAction } from "@/app/(portal)/usuarios/actions";
import { canViewUsers, getPortalSession } from "@/lib/auth";
import {
  canActorCreateUser,
  canActorDeleteUser,
  canActorModifyUser,
  listClientOptions,
  listPortalUsers,
  type PortalRole,
  type UserStatus,
} from "@/lib/data-store";

const errorLabels: Record<string, string> = {
  missing_fields: "Completa nombre, email y contraseña.",
  duplicate_email: "Ya existe un usuario con ese email.",
  forbidden: "No tienes permisos para esta accion.",
  not_found: "Usuario no encontrado.",
  cannot_delete_self: "No puedes eliminar tu propio usuario.",
  invalid_client_code: "Debes asignar un cliente valido.",
};

const savedLabels: Record<string, string> = {
  "1": "Usuario creado correctamente.",
  deleted: "Usuario eliminado correctamente.",
  updated: "Usuario actualizado correctamente.",
};

const roleOptions: PortalRole[] = ["CLIENTE", "OPERARIO", "CEO", "CTO"];
const statusOptions: UserStatus[] = ["Active", "Disabled", "Pending"];

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: { status?: string; error?: string; saved?: string };
}) {
  const session = await getPortalSession();
  if (!session) redirect("/login");
  if (!canViewUsers(session.role)) redirect("/dashboard");

  const filterActive = searchParams?.status === "active";
  const saved = searchParams?.saved || "";
  const error = searchParams?.error || "";

  const allUsers = await listPortalUsers();
  const clients = await listClientOptions();
  const rows = filterActive ? allUsers.filter((user) => user.status === "Active") : allUsers;

  const creatableRoles = roleOptions.filter((role) => canActorCreateUser(session.role, role));

  return (
    <div className="space-y-6">
      <header>
        <p className="portal-kicker">Administracion</p>
        <h1 className="portal-title">Usuarios del portal</h1>
        <p className="portal-subtitle">Permisos aplicados por rol: CTO, CEO y OPERARIO.</p>
      </header>

      {saved && <p className="rounded-xl border border-mint/30 bg-mint/10 px-3 py-2 text-sm text-mint">{savedLabels[saved] || "Operacion guardada."}</p>}
      {error && <p className="rounded-xl border border-coral/30 bg-coral/10 px-3 py-2 text-sm text-coral">{errorLabels[error] || "No se pudo completar la accion."}</p>}

      <section className="portal-card p-4">
        <div className="mb-4 flex flex-wrap gap-2">
          <Link
            href={filterActive ? "/usuarios" : "/usuarios?status=active"}
            className="rounded-xl border border-slate/20 bg-bg px-3 py-2 text-sm transition hover:-translate-y-[1px] hover:border-slate/35"
          >
            {filterActive ? "Ver todos" : "Filtrar activos"}
          </Link>
        </div>

        <form action={createUserAction} className="grid gap-3 rounded-2xl border border-slate/15 bg-bg p-4 md:grid-cols-2">
          <input name="name" required placeholder="Nombre" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm outline-none ring-mint/20 focus:ring" />
          <input name="email" required type="email" placeholder="email@empresa.com" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm outline-none ring-mint/20 focus:ring" />
          <input name="password" required type="password" placeholder="Contrasena" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm outline-none ring-mint/20 focus:ring" />
          <select name="role" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm outline-none ring-mint/20 focus:ring" defaultValue={creatableRoles[0] || "CLIENTE"}>
            {creatableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select name="status" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm outline-none ring-mint/20 focus:ring" defaultValue="Active">
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select name="clientCode" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm outline-none ring-mint/20 focus:ring" defaultValue={session.clientCode}>
            {clients.map((client) => (
              <option key={client.code} value={client.code}>
                {client.name} ({client.code})
              </option>
            ))}
          </select>
          <p className="text-xs text-slate md:col-span-2">Codigo cliente aplica solo cuando el rol creado sea `CLIENTE`.</p>

          <button className="rounded-xl bg-ink px-3 py-2 text-sm text-white transition hover:-translate-y-[1px] hover:bg-ink/90 md:col-span-2">Nuevo usuario</button>
        </form>

        <div className="mt-4 overflow-x-auto">
          <table className="portal-table min-w-[980px]">
            <thead>
              <tr>
                <th className="py-2">Nombre</th>
                <th className="py-2">Email</th>
                <th className="py-2">Rol</th>
                <th className="py-2">Estado</th>
                <th className="py-2">ClientCode</th>
                <th className="py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const canDelete = canActorDeleteUser(session.role, row.role) && row.id !== session.user.id;
                const canEditRow = canActorModifyUser(session.role, row.role);
                const editableRoles = roleOptions.filter((role) => canActorCreateUser(session.role, role));
                return (
                  <tr key={row.id} className="align-top">
                    <td className="py-2.5">{row.name}</td>
                    <td className="py-2.5">{row.email}</td>
                    <td className="py-2.5">
                      <span className="portal-pill portal-pill-info">{row.role}</span>
                    </td>
                    <td className="py-2.5">
                      <span className={`portal-pill ${row.status === "Active" ? "portal-pill-ok" : "portal-pill-warn"}`}>{row.status}</span>
                    </td>
                    <td className="py-2.5">
                      {row.role === "CLIENTE" ? row.clientCode || "-" : <span className="text-slate">No aplica</span>}
                    </td>
                    <td className="py-2.5">
                      <div className="flex flex-col gap-2">
                        {canEditRow && (
                          <form action={updateUserAction} className="grid grid-cols-6 gap-2">
                            <input type="hidden" name="targetUserId" value={row.id} />
                            <input
                              name="name"
                              defaultValue={row.name}
                              className="col-span-2 rounded-lg border border-slate/20 bg-white px-2 py-1 text-xs outline-none ring-mint/20 focus:ring"
                              placeholder="Nombre"
                            />
                            <input
                              name="email"
                              type="email"
                              defaultValue={row.email}
                              className="col-span-2 rounded-lg border border-slate/20 bg-white px-2 py-1 text-xs outline-none ring-mint/20 focus:ring"
                              placeholder="Correo"
                            />
                            <select name="role" defaultValue={row.role} className="rounded-lg border border-slate/20 bg-white px-2 py-1 text-xs outline-none ring-mint/20 focus:ring">
                              {editableRoles.map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                            <select name="status" defaultValue={row.status} className="rounded-lg border border-slate/20 bg-white px-2 py-1 text-xs outline-none ring-mint/20 focus:ring">
                              {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                            {row.role === "CLIENTE" ? (
                              <select
                                name="clientCode"
                                defaultValue={row.clientCode || session.clientCode}
                                className="col-span-2 rounded-lg border border-slate/20 bg-white px-2 py-1 text-xs outline-none ring-mint/20 focus:ring"
                              >
                                {clients.map((client) => (
                                  <option key={client.code} value={client.code}>
                                    {client.code}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <>
                                <input type="hidden" name="clientCode" value="" />
                                <div className="col-span-2 rounded-lg border border-dashed border-slate/30 bg-bg px-2 py-1 text-xs text-slate">
                                  Sin codigo (rol administrativo)
                                </div>
                              </>
                            )}
                            <button className="rounded-lg border border-slate/20 bg-bg px-2 py-1 text-xs transition hover:bg-slate-100">Modificar</button>
                            <input
                              name="password"
                              placeholder="Nueva pass (opcional)"
                              className="col-span-6 rounded-lg border border-slate/20 bg-white px-2 py-1 text-xs outline-none ring-mint/20 focus:ring"
                            />
                          </form>
                        )}

                        {canDelete ? (
                          <form action={deleteUserAction}>
                            <input type="hidden" name="targetUserId" value={row.id} />
                            <button className="rounded-lg border border-coral/30 px-2 py-1 text-xs text-coral transition hover:bg-coral/10">Eliminar</button>
                          </form>
                        ) : (
                          <span className="text-xs text-slate">Sin permiso para eliminar</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
