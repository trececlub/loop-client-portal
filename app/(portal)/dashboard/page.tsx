import { KpiCard } from "@/components/kpi-card";
import { SimpleBarChart } from "@/components/simple-bar-chart";
import { callsTable, kpis, monthTrend } from "@/lib/mock-data";

export default function DashboardPage() {
  const callsData = monthTrend.map((item) => ({ label: item.day, value: item.calls }));
  const apptData = monthTrend.map((item) => ({ label: item.day, value: item.appointments }));

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-slate">Resumen</p>
        <h1 className="mt-1 text-3xl font-semibold">Dashboard de rendimiento</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <KpiCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SimpleBarChart title="Tendencia de llamadas (mes actual)" data={callsData} colorClass="bg-sky" />
        <SimpleBarChart title="Tendencia de citas (mes actual)" data={apptData} colorClass="bg-mint" />
      </section>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Ultimas llamadas</h3>
          <span className="rounded-lg bg-bg px-2 py-1 text-xs text-slate">Vista rapida</span>
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
              {callsTable.map((row) => (
                <tr key={`${row.date}-${row.source}`} className="border-t border-slate/10">
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
