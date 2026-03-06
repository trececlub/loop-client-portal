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
          <p className="text-xs uppercase tracking-[0.18em] text-slate">Analitica</p>
          <h1 className="mt-1 text-3xl font-semibold">Comparativas mensuales</h1>
        </div>
        <MonthSelectForm
          label="Mes A"
          selectedMonth={snapshot.month}
          options={monthState.options}
          submitLabel="Comparar"
        />
      </header>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <div className="mb-4 flex flex-wrap gap-2 text-xs text-slate">
          <span className="rounded-lg bg-bg px-2 py-1">Mes A: {snapshot.month}</span>
          <span className="rounded-lg bg-bg px-2 py-1">Mes B: {snapshot.previousMonth}</span>
        </div>

        <div className="space-y-3">
          {rows.map((item) => {
            const diff = item.current - item.previous;
            const pct = item.previous === 0 ? "N/A" : `${((diff / item.previous) * 100).toFixed(1)}%`;
            const ratio = item.previous === 0 ? 1 : item.current / item.previous;
            const width = Math.min(Math.max(Math.round(ratio * 50), 10), 100);
            return (
              <article key={item.label} className="rounded-xl border border-slate/10 bg-bg p-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <h3 className="font-medium">{item.label}</h3>
                  <p className="text-slate">
                    {item.current} vs {item.previous} ({pct})
                  </p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white">
                  <div className={`h-full rounded-full ${diff >= 0 ? "bg-mint" : "bg-coral"}`} style={{ width: `${width}%` }} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
