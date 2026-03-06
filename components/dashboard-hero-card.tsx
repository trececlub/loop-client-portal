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
    <article className="group relative flex w-full flex-col rounded-2xl border border-sky-200/25 bg-[#031428] p-4 shadow-[0_24px_60px_-30px_rgba(8,40,72,0.9)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_24px_60px_-24px_rgba(14,165,233,0.35)]">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-400/14 via-sky-300/12 to-cyan-300/10 opacity-80" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-sky-500">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-white">{title}</h3>
          </div>

          <span className="flex items-center gap-1 rounded-full bg-emerald-400/12 px-2.5 py-1 text-xs font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            {statusLabel}
          </span>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#07213f] p-3">
            <p className="text-xs font-medium text-slate-400">{primaryLabel}</p>
            <p className="mt-0.5 text-3xl font-semibold leading-none text-white">{primaryValue}</p>
            <span className="mt-1 inline-block text-sm font-medium text-emerald-300">{primaryDelta}</span>
          </div>

          <div className="rounded-xl bg-[#07213f] p-3">
            <p className="text-xs font-medium text-slate-400">{secondaryLabel}</p>
            <p className="mt-0.5 text-3xl font-semibold leading-none text-white">{secondaryValue}</p>
            <span className="mt-1 inline-block text-sm font-medium text-emerald-300">{secondaryDelta}</span>
          </div>
        </div>

        <div className="mb-4 h-24 w-full overflow-hidden rounded-xl bg-[#071b34] px-3 py-2">
          <div className="flex h-full w-full items-end justify-between gap-2">
            {sparkBars.map((height, idx) => {
              const safeHeight = Math.max(20, Math.min(96, height));
              const innerHeight = Math.max(12, Math.round(safeHeight * 0.75));
              return (
                <div
                  key={`${idx}-${safeHeight}`}
                  className="w-3 rounded-[2px] bg-sky-300/20"
                  style={{ height: `${safeHeight}%` }}
                >
                  <div
                    className="w-full rounded-[2px] bg-gradient-to-t from-sky-500 to-cyan-200 transition-all duration-300"
                    style={{ height: `${innerHeight}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-300">{periodLabel}</span>
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <Link
            href={href}
            className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:from-sky-600 hover:to-cyan-500"
          >
            View Details
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
