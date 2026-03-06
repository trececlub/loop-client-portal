import Link from "next/link";

type DashboardHeroCardProps = {
  title: string;
  href: string;
  statusLabel?: string;
  primaryLabel: string;
  primaryValue: string;
  primaryDelta: string;
  secondaryLabel: string;
  secondaryValue: string;
  secondaryDelta: string;
  bars: number[];
  periodLabel?: string;
};

export function DashboardHeroCard({
  title,
  href,
  statusLabel = "Live",
  primaryLabel,
  primaryValue,
  primaryDelta,
  secondaryLabel,
  secondaryValue,
  secondaryDelta,
  bars,
  periodLabel = "Ultimos 7 puntos",
}: DashboardHeroCardProps) {
  const sparkBars = (bars.length ? bars : [35, 45, 60, 55, 72, 65, 78]).slice(0, 7);

  return (
    <article className="group relative flex w-full flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-sky-500/20">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
      <div className="absolute inset-px rounded-[11px] bg-slate-950" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
          </div>

          <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {statusLabel}
          </span>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-slate-900/60 p-3">
            <p className="text-xs font-medium text-slate-400">{primaryLabel}</p>
            <p className="text-lg font-semibold text-white">{primaryValue}</p>
            <span className="text-xs font-medium text-emerald-400">{primaryDelta}</span>
          </div>

          <div className="rounded-lg bg-slate-900/60 p-3">
            <p className="text-xs font-medium text-slate-400">{secondaryLabel}</p>
            <p className="text-lg font-semibold text-white">{secondaryValue}</p>
            <span className="text-xs font-medium text-emerald-400">{secondaryDelta}</span>
          </div>
        </div>

        <div className="mb-4 h-24 w-full overflow-hidden rounded-lg bg-slate-900/60 p-3">
          <div className="flex h-full w-full items-end justify-between gap-1">
            {sparkBars.map((height, idx) => {
              const safeHeight = Math.max(24, Math.min(95, height));
              const innerHeight = Math.max(16, Math.round(safeHeight * 0.72));
              return (
                <div key={`${idx}-${safeHeight}`} className="w-3 rounded-sm bg-sky-500/25" style={{ height: `${safeHeight}%` }}>
                  <div className="w-full rounded-sm bg-sky-400 transition-all duration-300" style={{ height: `${innerHeight}%` }} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">{periodLabel}</span>
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <Link
            href={href}
            className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 px-3 py-1 text-xs font-medium text-white transition-all duration-300 hover:from-sky-600 hover:to-cyan-600"
          >
            Ver detalle
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
