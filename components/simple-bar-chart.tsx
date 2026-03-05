type BarItem = { label: string; value: number };

export function SimpleBarChart({ title, data, colorClass }: { title: string; data: BarItem[]; colorClass: string }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <div className="mt-4 space-y-3">
        {data.map((item) => {
          const width = Math.max(Math.round((item.value / max) * 100), 4);
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-2 rounded-full bg-bg">
                <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
