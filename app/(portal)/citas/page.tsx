import { MonthSelectForm } from "@/components/month-select-form";
import { SimpleBarChart } from "@/components/simple-bar-chart";
import { getPortalSession } from "@/lib/auth";
import { getAppointmentsForClient } from "@/lib/data-store";
import { getOperationalMonthSelectionState } from "@/lib/month-selection";
import { redirect } from "next/navigation";

export default async function AppointmentsPage({ searchParams }: { searchParams?: { month?: string } }) {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const monthState = await getOperationalMonthSelectionState(session.clientCode, searchParams?.month);
  const rows = await getAppointmentsForClient(session.clientCode, monthState.activeMonth);

  const scheduled = rows.filter((row) => row.status === "Agendada").length;
  const confirmed = rows.filter((row) => row.status === "Confirmada").length;
  const canceled = rows.filter((row) => row.status === "Cancelada").length;
  const byChannel = [
    { label: "Llamada", value: rows.filter((row) => row.channel === "Llamada").length },
    { label: "WhatsApp", value: rows.filter((row) => row.channel === "WhatsApp").length },
    { label: "Email", value: rows.filter((row) => row.channel === "Email").length },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="portal-kicker">Agenda</p>
          <h1 className="portal-title">Citas</h1>
          <p className="portal-subtitle">Control de citas por estado y canal en tiempo real mensual.</p>
        </div>
        <MonthSelectForm selectedMonth={monthState.activeMonth} options={monthState.options} />
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard title="Agendadas" value={scheduled} tone="info" />
        <StatCard title="Confirmadas" value={confirmed} tone="ok" />
        <StatCard title="Canceladas" value={canceled} tone="warn" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <SimpleBarChart title="Citas por canal" data={byChannel} colorClass="from-mint to-sky" />
        <article className="portal-card p-4">
          <h3 className="text-sm font-semibold text-ink">Tasa de confirmacion</h3>
          <p className="mt-2 text-3xl font-semibold text-ink">
            {rows.length ? `${((confirmed / rows.length) * 100).toFixed(1)}%` : "N/A"}
          </p>
          <p className="mt-1 text-sm text-slate">Porcentaje sobre citas totales del mes.</p>
          <div className="portal-progress-track mt-3">
            <div
              className="portal-progress-bar bg-gradient-to-r from-mint to-sky"
              style={{ width: `${rows.length ? Math.max(8, Math.round((confirmed / rows.length) * 100)) : 8}%` }}
            />
          </div>
        </article>
      </section>

      <section className="portal-card p-4">
        <div className="overflow-x-auto">
          <table className="portal-table">
            <thead>
              <tr>
                <th className="py-2">Fecha/Hora</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Canal</th>
                <th className="py-2">Nota</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="py-2.5">{row.datetime}</td>
                  <td className="py-2.5">
                    <span className={`portal-pill ${row.status === "Confirmada" ? "portal-pill-ok" : row.status === "Cancelada" ? "portal-pill-warn" : "portal-pill-info"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className="portal-pill portal-pill-info">{row.channel}</span>
                  </td>
                  <td className="py-2.5">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, tone }: { title: string; value: number; tone: "ok" | "warn" | "info" }) {
  const toneClass =
    tone === "ok" ? "portal-pill-ok" : tone === "warn" ? "portal-pill-warn" : "portal-pill-info";

  return (
    <article className="portal-card p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-[0.14em] text-slate">{title}</p>
        <span className={`portal-pill ${toneClass}`}>Mes activo</span>
      </div>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </article>
  );
}
