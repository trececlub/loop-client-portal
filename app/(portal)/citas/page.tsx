import { appointmentsTable } from "@/lib/mock-data";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-slate">Agenda</p>
        <h1 className="mt-1 text-3xl font-semibold">Citas</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.14em] text-slate">Agendadas</p>
          <p className="mt-2 text-3xl font-semibold">198</p>
        </article>
        <article className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.14em] text-slate">Confirmadas</p>
          <p className="mt-2 text-3xl font-semibold">164</p>
        </article>
        <article className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.14em] text-slate">Canceladas</p>
          <p className="mt-2 text-3xl font-semibold">21</p>
        </article>
      </section>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.1em] text-slate">
              <tr>
                <th className="py-2">Fecha/Hora</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Canal</th>
                <th className="py-2">Nota</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsTable.map((row) => (
                <tr key={`${row.datetime}-${row.note}`} className="border-t border-slate/10">
                  <td className="py-2.5">{row.datetime}</td>
                  <td className="py-2.5">{row.status}</td>
                  <td className="py-2.5">{row.channel}</td>
                  <td className="py-2.5">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
