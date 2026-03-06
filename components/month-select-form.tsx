import type { MonthOption } from "@/lib/month-selection";

type MonthSelectFormProps = {
  label?: string;
  selectedMonth: string;
  options: MonthOption[];
  submitLabel?: string;
  className?: string;
};

export function MonthSelectForm({
  label = "Mes",
  selectedMonth,
  options,
  submitLabel = "Aplicar",
  className = "rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm shadow-card",
}: MonthSelectFormProps) {
  return (
    <form method="get" className={className}>
      <label className="mr-2 text-slate">{label}</label>
      <select
        name="month"
        defaultValue={selectedMonth}
        className="rounded-md border border-slate/20 bg-bg px-2 py-1"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={!option.enabled}>
            {option.enabled ? option.label : `${option.label} (Disponible al cierre)`}
          </option>
        ))}
      </select>
      <button className="ml-2 rounded-md bg-ink px-3 py-1 text-white">{submitLabel}</button>
    </form>
  );
}
