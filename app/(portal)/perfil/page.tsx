export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-slate">Cuenta</p>
        <h1 className="mt-1 text-3xl font-semibold">Perfil</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.14em] text-slate">Usuario</p>
          <p className="mt-2 text-lg font-medium">cliente@negocio.com</p>
          <p className="mt-1 text-sm text-slate">Rol: CLIENTE</p>
        </article>
        <article className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.14em] text-slate">Zona horaria</p>
          <p className="mt-2 text-lg font-medium">America/Bogota</p>
          <p className="mt-1 text-sm text-slate">Formato: 24 horas</p>
        </article>
      </section>
    </div>
  );
}
