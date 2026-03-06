import { MonthSelectForm } from "@/components/month-select-form";
import { getPortalSession } from "@/lib/auth";
import { getMessagesForClient } from "@/lib/data-store";
import { getMonthSelectionState } from "@/lib/month-selection";
import { redirect } from "next/navigation";

export default async function MessagesPage({ searchParams }: { searchParams?: { month?: string } }) {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const monthState = await getMonthSelectionState(session.clientCode, searchParams?.month);
  const rows = await getMessagesForClient(session.clientCode, monthState.activeMonth);

  const sent = rows.filter((row) => row.status === "Enviado").length;
  const failed = rows.filter((row) => row.status === "Fallido").length;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate">Comunicacion</p>
          <h1 className="mt-1 text-3xl font-semibold">Mensajes</h1>
        </div>
        <MonthSelectForm selectedMonth={monthState.activeMonth} options={monthState.options} />
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <StatCard title="Enviados" value={sent} />
        <StatCard title="Fallidos" value={failed} />
      </section>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.1em] text-slate">
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
                <tr key={row.id} className="border-t border-slate/10">
                  <td className="py-2.5">{row.datetime}</td>
                  <td className="py-2.5">{row.channel}</td>
                  <td className="py-2.5">{row.status}</td>
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

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <article className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
      <p className="text-xs uppercase tracking-[0.14em] text-slate">{title}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </article>
  );
}
