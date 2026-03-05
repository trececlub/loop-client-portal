type KpiItem = {
  label: string;
  value: string;
  delta: string;
  tone: "up" | "down" | "neutral";
};

export function KpiCard({ item }: { item: KpiItem }) {
  const toneClass = item.tone === "up" ? "text-mint" : item.tone === "down" ? "text-coral" : "text-slate";

  return (
    <article className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
      <p className="text-xs uppercase tracking-[0.16em] text-slate">{item.label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">{item.value}</p>
      <p className={`mt-2 text-sm ${toneClass}`}>{item.delta}</p>
    </article>
  );
}
