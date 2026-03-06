import { MonthSelectForm } from "@/components/month-select-form";
import { getPortalSession } from "@/lib/auth";
import { getReportRows } from "@/lib/data-store";
import { getMonthSelectionState } from "@/lib/month-selection";
import { redirect } from "next/navigation";

export default async function ReportsPage({ searchParams }: { searchParams?: { month?: string } }) {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const monthState = await getMonthSelectionState(session.clientCode, searchParams?.month);
  const rows = await getReportRows(session.clientCode, monthState.activeMonth);
  const callsCount = rows.filter((row) => row.module === "Llamadas").length;
  const appointmentsCount = rows.filter((row) => row.module === "Citas").length;
  const messagesCount = rows.filter((row) => row.module === "Mensajes").length;

  return (
    <div className="space-y-6">
      <header>
        <p className="portal-kicker">Exportacion</p>
        <h1 className="portal-title">Reportes</h1>
        <p className="portal-subtitle">Descarga mensual en CSV con vista previa antes de exportar.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard title="Filas totales" value={rows.length.toString()} />
        <StatCard title="Registros de llamadas" value={callsCount.toString()} />
        <StatCard title="Registros de citas" value={appointmentsCount.toString()} />
      </section>

      <section className="portal-card p-4">
        <p className="text-sm text-slate">Selecciona el mes y descarga el reporte en CSV.</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <MonthSelectForm
            selectedMonth={monthState.activeMonth}
            options={monthState.options}
            className="rounded-xl border border-slate/20 bg-bg px-3 py-2 text-sm"
          />
          <a
            href={`/api/report?month=${monthState.activeMonth}`}
            className="rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-[1px] hover:bg-ink/90"
          >
            Descargar CSV
          </a>
        </div>
      </section>

      <section className="portal-card p-4">
        <h3 className="text-sm font-semibold">Preview del reporte ({rows.length} filas)</h3>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="portal-pill portal-pill-info">Mensajes: {messagesCount}</span>
          <span className="portal-pill portal-pill-info">Mes: {monthState.activeMonth}</span>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="portal-table min-w-[700px]">
            <thead>
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
                <tr key={`${row.datetime}-${index}`}>
                  <td className="py-2.5">{row.datetime}</td>
                  <td className="py-2.5">
                    <span className="portal-pill portal-pill-info">{row.module}</span>
                  </td>
                  <td className="py-2.5">
                    <span className={`portal-pill ${isPositiveStatus(row.status) ? "portal-pill-ok" : "portal-pill-warn"}`}>
                      {row.status}
                    </span>
                  </td>
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

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="portal-card p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-slate">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
    </article>
  );
}

function isPositiveStatus(status: string) {
  return status === "Atendida" || status === "Confirmada" || status === "Agendada" || status === "Enviado";
}
