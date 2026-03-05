import { getPortalSession } from "@/lib/auth";
import { getReportRows } from "@/lib/data-store";
import { redirect } from "next/navigation";

export default async function ReportsPage({ searchParams }: { searchParams?: { month?: string } }) {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const month = searchParams?.month || currentMonth();
  const rows = await getReportRows(session.clientCode, month);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-slate">Exportacion</p>
        <h1 className="mt-1 text-3xl font-semibold">Reportes</h1>
      </header>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <p className="text-sm text-slate">Selecciona el mes y descarga el reporte en CSV.</p>
        <form className="mt-4 flex flex-wrap items-center gap-3" method="get">
          <input name="month" defaultValue={month} className="rounded-xl border border-slate/20 bg-bg px-3 py-2 text-sm" placeholder="2026-03" />
          <button className="rounded-xl border border-slate/20 bg-bg px-4 py-2 text-sm">Aplicar</button>
          <a
            href={`/api/report?month=${month}`}
            className="rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
          >
            Descargar CSV
          </a>
        </form>
      </section>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <h3 className="text-sm font-semibold">Preview del reporte ({rows.length} filas)</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.1em] text-slate">
              <tr>
                <th className="py-2">Fecha</th>
                <th className="py-2">Modulo</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Detalle</th>
                <th className="py-2">Referencia</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 12).map((row, index) => (
                <tr key={`${row.datetime}-${index}`} className="border-t border-slate/10">
                  <td className="py-2.5">{row.datetime}</td>
                  <td className="py-2.5">{row.module}</td>
                  <td className="py-2.5">{row.status}</td>
                  <td className="py-2.5">{row.detail}</td>
                  <td className="py-2.5">{row.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function currentMonth() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}
