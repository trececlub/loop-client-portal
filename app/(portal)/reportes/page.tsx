export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-slate">Exportacion</p>
        <h1 className="mt-1 text-3xl font-semibold">Reportes</h1>
      </header>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <p className="text-sm text-slate">Selecciona el mes y descarga el reporte en CSV.</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <select className="rounded-xl border border-slate/20 bg-bg px-3 py-2 text-sm">
            <option>Marzo 2026</option>
            <option>Febrero 2026</option>
            <option>Enero 2026</option>
          </select>
          <button className="rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90">Descargar CSV</button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <h3 className="text-sm font-semibold">Ultimas descargas</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate">
          <li>Reporte Marzo 2026 - 2026-03-05 10:03</li>
          <li>Reporte Febrero 2026 - 2026-03-01 09:11</li>
          <li>Reporte Enero 2026 - 2026-02-01 08:50</li>
        </ul>
      </section>
    </div>
  );
}
