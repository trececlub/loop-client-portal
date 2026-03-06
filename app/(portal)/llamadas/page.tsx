import { MonthSelectForm } from "@/components/month-select-form";
import { SimpleBarChart } from "@/components/simple-bar-chart";
import { getPortalSession } from "@/lib/auth";
import { getCallsForClient } from "@/lib/data-store";
import { getOperationalMonthSelectionState } from "@/lib/month-selection";
import { redirect } from "next/navigation";

export default async function CallsPage({ searchParams }: { searchParams?: { month?: string } }) {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const monthState = await getOperationalMonthSelectionState(session.clientCode, searchParams?.month);
  const rows = await getCallsForClient(session.clientCode, monthState.activeMonth);
  const attended = rows.filter((row) => row.status === "Atendida").length;
  const missed = rows.filter((row) => row.status === "No atendida").length;
  const withAppointment = rows.filter((row) => row.result === "Cita").length;
  const avgDuration = getAverageDuration(rows.map((row) => row.duration));
  const statusData = [
    { label: "Atendidas", value: attended },
    { label: "No atendidas", value: missed },
    { label: "Con cita", value: withAppointment },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="portal-kicker">Operacion</p>
          <h1 className="portal-title">Llamadas</h1>
          <p className="portal-subtitle">Seguimiento de llamadas, resultados y rendimiento mensual.</p>
        </div>
        <MonthSelectForm selectedMonth={monthState.activeMonth} options={monthState.options} />
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total" value={rows.length.toString()} tone="info" />
        <StatCard title="Atendidas" value={attended.toString()} tone="ok" />
        <StatCard title="No atendidas" value={missed.toString()} tone="warn" />
        <StatCard title="Duracion promedio" value={avgDuration} tone="info" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <SimpleBarChart title={`Distribucion (${monthState.activeMonth})`} data={statusData} colorClass="from-sky to-mint" />
        <article className="portal-card p-4">
          <h3 className="text-sm font-semibold text-ink">Efectividad del mes</h3>
          <p className="mt-2 text-3xl font-semibold text-ink">
            {rows.length ? `${((withAppointment / rows.length) * 100).toFixed(1)}%` : "N/A"}
          </p>
          <p className="mt-1 text-sm text-slate">Llamadas que terminaron en cita.</p>
          <div className="portal-progress-track mt-3">
            <div
              className="portal-progress-bar bg-gradient-to-r from-mint to-sky"
              style={{ width: `${rows.length ? Math.max(8, Math.round((withAppointment / rows.length) * 100)) : 8}%` }}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="portal-card-soft px-3 py-2">
              <p className="text-slate">Mes activo</p>
              <p className="mt-0.5 font-semibold text-ink">{monthState.activeMonth}</p>
            </div>
            <div className="portal-card-soft px-3 py-2">
              <p className="text-slate">Registros</p>
              <p className="mt-0.5 font-semibold text-ink">{rows.length}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="portal-card p-4">
        <div className="mb-3 flex flex-wrap gap-2 text-xs text-slate">
          <span className="portal-pill portal-pill-info">Mes: {monthState.activeMonth}</span>
          <span className="portal-pill portal-pill-info">Total: {rows.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="portal-table">
            <thead>
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
                <tr key={row.id}>
                  <td className="py-2.5">{row.date}</td>
                  <td className="py-2.5">{row.source}</td>
                  <td className="py-2.5">{row.duration}</td>
                  <td className="py-2.5">
                    <span className={`portal-pill ${row.status === "Atendida" ? "portal-pill-ok" : "portal-pill-warn"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className={`portal-pill ${row.result === "Cita" ? "portal-pill-ok" : "portal-pill-info"}`}>
                      {row.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, tone }: { title: string; value: string; tone: "ok" | "warn" | "info" }) {
  const toneClass =
    tone === "ok" ? "portal-pill-ok" : tone === "warn" ? "portal-pill-warn" : "portal-pill-info";

  return (
    <article className="portal-card p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-[0.14em] text-slate">{title}</p>
        <span className={`portal-pill ${toneClass}`}>Live</span>
      </div>
      <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
    </article>
  );
}

function getAverageDuration(values: string[]) {
  if (values.length === 0) return "00:00";
  const totalSeconds = values.reduce((sum, value) => {
    const [min, sec] = value.split(":").map((part) => Number(part));
    return sum + min * 60 + sec;
  }, 0);
  const avg = Math.round(totalSeconds / values.length);
  const avgMin = String(Math.floor(avg / 60)).padStart(2, "0");
  const avgSec = String(avg % 60).padStart(2, "0");
  return `${avgMin}:${avgSec}`;
}
