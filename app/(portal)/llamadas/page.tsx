import { MonthSelectForm } from "@/components/month-select-form";
import { getPortalSession } from "@/lib/auth";
import { getCallsForClient } from "@/lib/data-store";
import { getMonthSelectionState } from "@/lib/month-selection";
import { redirect } from "next/navigation";

export default async function CallsPage({ searchParams }: { searchParams?: { month?: string } }) {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const monthState = await getMonthSelectionState(session.clientCode, searchParams?.month);
  const rows = await getCallsForClient(session.clientCode, monthState.activeMonth);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate">Operacion</p>
          <h1 className="mt-1 text-3xl font-semibold">Llamadas</h1>
        </div>
        <MonthSelectForm selectedMonth={monthState.activeMonth} options={monthState.options} />
      </header>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <div className="mb-3 flex flex-wrap gap-2 text-xs text-slate">
          <span className="rounded-lg bg-bg px-2 py-1">Mes: {monthState.activeMonth}</span>
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
