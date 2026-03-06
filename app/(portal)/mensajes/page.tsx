import { MonthSelectForm } from "@/components/month-select-form";
import { SimpleBarChart } from "@/components/simple-bar-chart";
import { getPortalSession } from "@/lib/auth";
import { getMessagesForClient } from "@/lib/data-store";
import { getOperationalMonthSelectionState } from "@/lib/month-selection";
import { redirect } from "next/navigation";

export default async function MessagesPage({ searchParams }: { searchParams?: { month?: string } }) {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const monthState = await getOperationalMonthSelectionState(session.clientCode, searchParams?.month);
  const rows = await getMessagesForClient(session.clientCode, monthState.activeMonth);

  const sent = rows.filter((row) => row.status === "Enviado").length;
  const failed = rows.filter((row) => row.status === "Fallido").length;
  const byChannel = [
    { label: "WhatsApp", value: rows.filter((row) => row.channel === "WhatsApp").length },
    { label: "Email", value: rows.filter((row) => row.channel === "Email").length },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="portal-kicker">Comunicacion</p>
          <h1 className="portal-title">Mensajes</h1>
          <p className="portal-subtitle">Estado de envios por canal y calidad de entrega mensual.</p>
        </div>
        <MonthSelectForm selectedMonth={monthState.activeMonth} options={monthState.options} />
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <StatCard title="Enviados" value={sent} tone="ok" />
        <StatCard title="Fallidos" value={failed} tone="warn" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <SimpleBarChart title="Mensajes por canal" data={byChannel} colorClass="from-sky to-mint" />
        <article className="portal-card p-4">
          <h3 className="text-sm font-semibold text-ink">Confiabilidad de entrega</h3>
          <p className="mt-2 text-3xl font-semibold text-ink">
            {rows.length ? `${((sent / rows.length) * 100).toFixed(1)}%` : "N/A"}
          </p>
          <p className="mt-1 text-sm text-slate">Mensajes enviados exitosamente del total mensual.</p>
          <div className="portal-progress-track mt-3">
            <div
              className={`portal-progress-bar bg-gradient-to-r ${rows.length && sent / rows.length < 0.8 ? "from-coral to-sky" : "from-mint to-sky"}`}
              style={{ width: `${rows.length ? Math.max(8, Math.round((sent / rows.length) * 100)) : 8}%` }}
            />
          </div>
        </article>
      </section>

      <section className="portal-card p-4">
        <div className="overflow-x-auto">
          <table className="portal-table min-w-[720px]">
            <thead>
              <tr>
                <th className="py-2">Fecha</th>
                <th className="py-2">Canal</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Plantilla</th>
                <th className="py-2">Destino</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="py-2.5">{row.datetime}</td>
                  <td className="py-2.5">
                    <span className="portal-pill portal-pill-info">{row.channel}</span>
                  </td>
                  <td className="py-2.5">
                    <span className={`portal-pill ${row.status === "Enviado" ? "portal-pill-ok" : "portal-pill-warn"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5">{row.template}</td>
                  <td className="py-2.5">{row.to}</td>
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
