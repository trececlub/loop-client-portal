import { compareA } from "@/lib/mock-data";

export default function ComparativesPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-slate">Analitica</p>
        <h1 className="mt-1 text-3xl font-semibold">Comparativas mensuales</h1>
      </header>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <div className="mb-4 flex flex-wrap gap-2 text-xs text-slate">
          <span className="rounded-lg bg-bg px-2 py-1">Mes A: Marzo 2026</span>
          <span className="rounded-lg bg-bg px-2 py-1">Mes B: Febrero 2026</span>
        </div>

        <div className="space-y-3">
          {compareA.map((item) => {
            const previous = item.previous;
            const diff = item.current - previous;
            const pct = previous === 0 ? "N/A" : `${((diff / previous) * 100).toFixed(1)}%`;
            const width = previous === 0 ? 100 : Math.min(Math.max(Math.round((item.current / previous) * 50), 10), 100);
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
