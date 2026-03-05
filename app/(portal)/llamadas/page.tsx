import { getPortalSession } from "@/lib/auth";
import { getCallsForClient } from "@/lib/data-store";
import { redirect } from "next/navigation";

export default async function CallsPage({ searchParams }: { searchParams?: { month?: string } }) {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const month = searchParams?.month;
  const rows = await getCallsForClient(session.clientCode, month);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate">Operacion</p>
          <h1 className="mt-1 text-3xl font-semibold">Llamadas</h1>
        </div>
        <form method="get" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm shadow-card">
          <label className="mr-2 text-slate">Mes</label>
          <input name="month" defaultValue={month || ""} className="rounded-md border border-slate/20 bg-bg px-2 py-1" placeholder="2026-03" />
          <button className="ml-2 rounded-md bg-ink px-3 py-1 text-white">Aplicar</button>
        </form>
      </header>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <div className="mb-3 flex flex-wrap gap-2 text-xs text-slate">
          <span className="rounded-lg bg-bg px-2 py-1">Total: {rows.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.1em] text-slate">
              <tr>
                <th className="py-2">Fecha</th>
                <th className="py-2">Numero</th>
                <th className="py-2">Duracion</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-slate/10">
                  <td className="py-2.5">{row.date}</td>
                  <td className="py-2.5">{row.source}</td>
                  <td className="py-2.5">{row.duration}</td>
                  <td className="py-2.5">{row.status}</td>
                  <td className="py-2.5">{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
