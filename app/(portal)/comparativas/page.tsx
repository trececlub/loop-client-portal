import { MonthSelectForm } from "@/components/month-select-form";
import { getPortalSession } from "@/lib/auth";
import { getComparisonRows, getDashboardSnapshot } from "@/lib/data-store";
import { getMonthSelectionState } from "@/lib/month-selection";
import { redirect } from "next/navigation";

export default async function ComparativesPage({ searchParams }: { searchParams?: { month?: string } }) {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const monthState = await getMonthSelectionState(session.clientCode, searchParams?.month);
  const snapshot = await getDashboardSnapshot(session.clientCode, monthState.activeMonth);
  const rows = await getComparisonRows(session.clientCode, snapshot.month);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="portal-kicker">Analitica</p>
          <h1 className="portal-title">Comparativas mensuales</h1>
          <p className="portal-subtitle">Compara el mes seleccionado contra su referencia anterior.</p>
        </div>
        <MonthSelectForm
          label="Mes A"
          selectedMonth={snapshot.month}
          options={monthState.options}
          submitLabel="Comparar"
        />
      </header>

      <section className="portal-card p-4">
        <div className="mb-4 flex flex-wrap gap-2 text-xs text-slate">
          <span className="portal-pill portal-pill-info">Mes A: {snapshot.month}</span>
          <span className="portal-pill portal-pill-info">Mes B: {snapshot.previousMonth}</span>
        </div>

        <div className="space-y-3">
          {rows.map((item) => {
            const diff = item.current - item.previous;
            const pct = item.previous === 0 ? "N/A" : `${((diff / item.previous) * 100).toFixed(1)}%`;
            const ratio = item.previous === 0 ? 1 : item.current / item.previous;
            const width = Math.min(Math.max(Math.round(ratio * 50), 10), 100);
            return (
              <article key={item.label} className="portal-card-soft p-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <h3 className="font-medium">{item.label}</h3>
                  <p className="text-slate">
                    {item.current} vs {item.previous} ({pct})
                  </p>
                </div>
                <div className="portal-progress-track mt-2">
                  <div
                    className={`portal-progress-bar bg-gradient-to-r ${diff >= 0 ? "from-mint to-sky" : "from-coral to-sky"}`}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
