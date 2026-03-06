type KpiItem = {
  label: string;
  value: string;
  delta: string;
  tone: "up" | "down" | "neutral";
};

export function KpiCard({ item }: { item: KpiItem }) {
  const toneClass = item.tone === "up" ? "text-mint" : item.tone === "down" ? "text-coral" : "text-slate";
  const toneChipClass =
    item.tone === "up"
      ? "bg-mint/10 text-mint border-mint/25"
      : item.tone === "down"
      ? "bg-coral/10 text-coral border-coral/25"
      : "bg-slate/10 text-slate border-slate/25";
  const deltaPrefix = item.tone === "up" ? "▲" : item.tone === "down" ? "▼" : "•";

  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-mint/70 to-sky/70" />
      <p className="text-[11px] uppercase tracking-[0.16em] text-slate">{item.label}</p>
      <p className="mt-2 text-3xl font-semibold leading-none text-ink">{item.value}</p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className={`text-sm ${toneClass}`}>{item.delta}</p>
        <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${toneChipClass}`}>
          {deltaPrefix}
        </span>
      </div>
    </article>
  );
}
