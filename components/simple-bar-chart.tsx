type BarItem = { label: string; value: number };

export function SimpleBarChart({ title, data, colorClass }: { title: string; data: BarItem[]; colorClass: string }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <span className="rounded-lg border border-slate/20 bg-bg px-2 py-1 text-xs text-slate">
          Total: {total}
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {data.map((item) => {
          const width = Math.max(Math.round((item.value / max) * 100), 4);
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-2.5 rounded-full border border-slate/10 bg-bg">
                <div
                  className={`h-full rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.22)_inset] ${colorClass}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
