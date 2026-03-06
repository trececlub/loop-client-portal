type BarItem = { label: string; value: number };

export function SimpleBarChart({ title, data, colorClass }: { title: string; data: BarItem[]; colorClass: string }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const avg = data.length > 0 ? total / data.length : 0;

  return (
    <section className="rounded-2xl border border-slate/20 bg-white/95 p-4 shadow-card backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate/20 bg-bg px-2 py-1 text-xs text-slate">Total: {total}</span>
          <span className="rounded-lg border border-slate/20 bg-bg px-2 py-1 text-xs text-slate">
            Promedio: {avg.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <div className="grid h-44 grid-cols-7 items-end gap-2 rounded-xl border border-slate/15 bg-bg/70 px-2.5 py-3">
          {data.map((item) => {
            const height = Math.max(Math.round((item.value / max) * 100), 8);
            return (
              <div key={item.label} className="flex h-full flex-col items-center justify-end gap-1">
                <span className="text-[10px] font-medium text-slate">{item.value}</span>
                <div className="flex h-full w-full items-end">
                  <div
                    className={`w-full rounded-md bg-gradient-to-t shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset] ${colorClass}`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[11px] font-medium text-slate">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
