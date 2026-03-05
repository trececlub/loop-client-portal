import { KpiCard } from "@/components/kpi-card";
import { SimpleBarChart } from "@/components/simple-bar-chart";
import { getPortalSession } from "@/lib/auth";
import { getCallsForClient, getDashboardSnapshot } from "@/lib/data-store";
import { redirect } from "next/navigation";

export default async function DashboardPage({ searchParams }: { searchParams?: { month?: string } }) {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const month = searchParams?.month;
  const snapshot = await getDashboardSnapshot(session.clientCode, month);
  const recentCalls = (await getCallsForClient(session.clientCode, snapshot.month)).slice(0, 6);

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

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate">Resumen</p>
          <h1 className="mt-1 text-3xl font-semibold">Dashboard de rendimiento</h1>
        </div>
        <form method="get" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm shadow-card">
          <label className="mr-2 text-slate">Mes</label>
          <input name="month" defaultValue={snapshot.month} className="rounded-md border border-slate/20 bg-bg px-2 py-1" placeholder="2026-03" />
          <button className="ml-2 rounded-md bg-ink px-3 py-1 text-white">Aplicar</button>
        </form>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <KpiCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SimpleBarChart title={`Llamadas (${snapshot.month})`} data={callsData} colorClass="bg-sky" />
        <SimpleBarChart title={`Citas (${snapshot.month})`} data={apptData} colorClass="bg-mint" />
      </section>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Ultimas llamadas</h3>
          <span className="rounded-lg bg-bg px-2 py-1 text-xs text-slate">Datos funcionales</span>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.1em] text-slate">
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

function formatDeltaPct(value: number) {
  const signed = value >= 0 ? `+${value.toFixed(1)}` : value.toFixed(1);
  return `${signed}%`;
}

function formatDeltaPoint(value: number) {
  const signed = value >= 0 ? `+${value.toFixed(1)}` : value.toFixed(1);
  return signed;
}
