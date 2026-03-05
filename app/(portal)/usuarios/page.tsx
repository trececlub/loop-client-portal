import { usersTable } from "@/lib/mock-data";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-slate">Administracion</p>
        <h1 className="mt-1 text-3xl font-semibold">Usuarios del portal</h1>
        <p className="mt-2 text-sm text-slate">Visible solo para CTO, CEO y OPERARIO.</p>
      </header>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <div className="mb-4 flex flex-wrap gap-2">
          <button className="rounded-xl bg-ink px-3 py-2 text-sm text-white">Nuevo usuario</button>
          <button className="rounded-xl border border-slate/20 bg-bg px-3 py-2 text-sm">Filtrar activos</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.1em] text-slate">
              <tr>
                <th className="py-2">Nombre</th>
                <th className="py-2">Email</th>
                <th className="py-2">Rol</th>
                <th className="py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {usersTable.map((row) => (
                <tr key={row.email} className="border-t border-slate/10">
                  <td className="py-2.5">{row.name}</td>
                  <td className="py-2.5">{row.email}</td>
                  <td className="py-2.5">{row.role}</td>
                  <td className="py-2.5">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
