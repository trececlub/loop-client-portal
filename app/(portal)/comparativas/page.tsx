import { getPortalSession } from "@/lib/auth";
import { getComparisonRows, getDashboardSnapshot } from "@/lib/data-store";
import { redirect } from "next/navigation";

export default async function ComparativesPage({ searchParams }: { searchParams?: { month?: string } }) {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const month = searchParams?.month;
  const snapshot = await getDashboardSnapshot(session.clientCode, month);
  const rows = await getComparisonRows(session.clientCode, snapshot.month);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate">Analitica</p>
          <h1 className="mt-1 text-3xl font-semibold">Comparativas mensuales</h1>
        </div>
        <form method="get" className="rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm shadow-card">
          <label className="mr-2 text-slate">Mes A</label>
          <input name="month" defaultValue={snapshot.month} className="rounded-md border border-slate/20 bg-bg px-2 py-1" placeholder="2026-03" />
          <button className="ml-2 rounded-md bg-ink px-3 py-1 text-white">Comparar</button>
        </form>
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
