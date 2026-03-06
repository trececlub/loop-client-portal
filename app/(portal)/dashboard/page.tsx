import { KpiCard } from "@/components/kpi-card";
import { MonthSelectForm } from "@/components/month-select-form";
import { SimpleBarChart } from "@/components/simple-bar-chart";
import { getPortalSession } from "@/lib/auth";
import { getAppointmentsForClient, getCallsForClient, getDashboardSnapshot, getMessagesForClient } from "@/lib/data-store";
import { getOperationalMonthSelectionState } from "@/lib/month-selection";
import { redirect } from "next/navigation";

export default async function DashboardPage({ searchParams }: { searchParams?: { month?: string } }) {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const monthState = await getOperationalMonthSelectionState(session.clientCode, searchParams?.month);
  const snapshot = await getDashboardSnapshot(session.clientCode, monthState.activeMonth);
  const allCalls = await getCallsForClient(session.clientCode, snapshot.month);
  const recentCalls = allCalls.slice(0, 6);
  const monthMessages = await getMessagesForClient(session.clientCode, snapshot.month);
  const monthAppointments = await getAppointmentsForClient(session.clientCode, snapshot.month);

  const cards = [
    {
      label: "Llamadas recibidas",
      value: snapshot.kpis.calls.toLocaleString(),
      delta: `${formatDeltaPct(snapshot.deltas.callsPct)} vs ${snapshot.previousMonth}`,
      tone: snapshot.deltas.callsPct >= 0 ? "up" : "down",
    },
    {
      label: "Citas agendadas",
      value: snapshot.kpis.appointments.toLocaleString(),
      delta: `${formatDeltaPct(snapshot.deltas.appointmentsPct)} vs ${snapshot.previousMonth}`,
      tone: snapshot.deltas.appointmentsPct >= 0 ? "up" : "down",
    },
    {
      label: "Mensajes enviados",
      value: snapshot.kpis.messagesSent.toLocaleString(),
      delta: `${formatDeltaPct(snapshot.deltas.messagesPct)} vs ${snapshot.previousMonth}`,
      tone: snapshot.deltas.messagesPct >= 0 ? "up" : "down",
    },
    {
      label: "Conversion",
      value: `${snapshot.kpis.conversionPct.toFixed(1)}%`,
      delta: `${formatDeltaPoint(snapshot.deltas.conversionPts)} pts vs ${snapshot.previousMonth}`,
      tone: snapshot.deltas.conversionPts >= 0 ? "up" : "down",
    },
  ] as const;
  const callsData = snapshot.trend.map((item) => ({ label: item.day, value: item.calls }));
  const apptData = snapshot.trend.map((item) => ({ label: item.day, value: item.appointments }));
  const attendedCalls = allCalls.filter((row) => row.status === "Atendida").length;
  const sentMessages = monthMessages.filter((row) => row.status === "Enviado").length;
  const stabilityRows = [
    {
      label: "Atencion de llamadas",
      value: formatPercent(attendedCalls, allCalls.length),
      pct: allCalls.length ? (attendedCalls / allCalls.length) * 100 : 100,
      tone: allCalls.length && attendedCalls / allCalls.length < 0.65 ? "warn" : "ok",
    },
    {
      label: "Entrega de mensajes",
      value: formatPercent(sentMessages, monthMessages.length),
      pct: monthMessages.length ? (sentMessages / monthMessages.length) * 100 : 100,
      tone: monthMessages.length && sentMessages / monthMessages.length < 0.8 ? "warn" : "ok",
    },
    {
      label: "Conversion a cita",
      value: `${snapshot.kpis.conversionPct.toFixed(1)}%`,
      pct: Math.min(snapshot.kpis.conversionPct, 100),
      tone: snapshot.kpis.conversionPct < 30 ? "warn" : "ok",
    },
  ] as const;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="portal-kicker">Resumen</p>
          <h1 className="portal-title">Dashboard de rendimiento</h1>
          <p className="portal-subtitle">Vista operativa del mes en curso con indicadores accionables.</p>
        </div>
        <MonthSelectForm selectedMonth={snapshot.month} options={monthState.options} />
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <KpiCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {stabilityRows.map((row) => (
          <article key={row.label} className="portal-card p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-ink">{row.label}</h3>
              <span className={`portal-pill ${row.tone === "ok" ? "portal-pill-ok" : "portal-pill-warn"}`}>
                {row.tone === "ok" ? "Estable" : "Atencion"}
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-ink">{row.value}</p>
            <div className="portal-progress-track mt-3">
              <div
                className={`portal-progress-bar ${row.tone === "ok" ? "bg-gradient-to-r from-mint to-sky" : "bg-gradient-to-r from-coral to-sky"}`}
                style={{ width: `${Math.max(8, Math.min(row.pct, 100))}%` }}
              />
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SimpleBarChart title={`Llamadas (${snapshot.month})`} data={callsData} colorClass="from-sky to-sky/70" />
        <SimpleBarChart title={`Citas (${snapshot.month})`} data={apptData} colorClass="from-mint to-mint/70" />
      </section>

      <section className="portal-card p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Ultimas llamadas</h3>
          <span className="portal-pill portal-pill-info">Actividad reciente</span>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="portal-table">
            <thead>
              <tr>
                <th className="py-2">Fecha</th>
                <th className="py-2">Origen</th>
                <th className="py-2">Duracion</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((row) => (
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
                    <span className="portal-pill portal-pill-info">{row.result}</span>
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

function formatDeltaPct(value: number) {
  const signed = value >= 0 ? `+${value.toFixed(1)}` : value.toFixed(1);
  return `${signed}%`;
}

function formatDeltaPoint(value: number) {
  const signed = value >= 0 ? `+${value.toFixed(1)}` : value.toFixed(1);
  return signed;
}

function formatPercent(numerator: number, denominator: number) {
  if (!denominator) return "N/A";
  return `${((numerator / denominator) * 100).toFixed(1)}%`;
}
