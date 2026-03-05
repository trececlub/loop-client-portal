import { messagesTable } from "@/lib/mock-data";

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-slate">Comunicacion</p>
        <h1 className="mt-1 text-3xl font-semibold">Mensajes</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.14em] text-slate">Enviados</p>
          <p className="mt-2 text-3xl font-semibold">947</p>
        </article>
        <article className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.14em] text-slate">Fallidos</p>
          <p className="mt-2 text-3xl font-semibold">23</p>
        </article>
      </section>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.1em] text-slate">
              <tr>
                <th className="py-2">Fecha</th>
                <th className="py-2">Canal</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Plantilla</th>
                <th className="py-2">Destino</th>
              </tr>
            </thead>
            <tbody>
              {messagesTable.map((row) => (
                <tr key={`${row.date}-${row.to}`} className="border-t border-slate/10">
                  <td className="py-2.5">{row.date}</td>
                  <td className="py-2.5">{row.channel}</td>
                  <td className="py-2.5">{row.status}</td>
                  <td className="py-2.5">{row.template}</td>
                  <td className="py-2.5">{row.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
