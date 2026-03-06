import { loginAction } from "@/app/login/actions";

export default function LoginPage({ searchParams }: { searchParams?: { error?: string } }) {
  const hasError = searchParams?.error === "invalid";
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg px-4 py-10">
      <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-mint/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-12 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate/20 bg-white/95 p-8 shadow-card backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate">Loop Portal</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight">Visualiza tu operacion en minutos</h1>
          <p className="mt-4 max-w-lg text-slate">
            Accede a llamadas, citas y reportes en una interfaz limpia, clara y pensada para decisiones rapidas.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate/15 bg-bg p-3 text-sm">Llamadas en tiempo real</div>
            <div className="rounded-2xl border border-slate/15 bg-bg p-3 text-sm">Comparativas mensuales</div>
            <div className="rounded-2xl border border-slate/15 bg-bg p-3 text-sm">Descarga de reportes</div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate/20 bg-white/95 p-8 shadow-card backdrop-blur-sm">
          <h2 className="text-2xl font-semibold">Iniciar sesion</h2>
          <p className="mt-2 text-sm text-slate">Ingresa con tus credenciales de cliente.</p>

          <form action={loginAction} className="mt-6 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[0.14em] text-slate">Email</label>
              <input
                name="email"
                required
                className="mt-2 w-full rounded-xl border border-slate/20 bg-bg px-3 py-2.5 outline-none ring-mint/30 transition focus:ring"
                placeholder="cliente@empresa.com"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.14em] text-slate">Contrasena</label>
              <input
                name="password"
                type="password"
                required
                className="mt-2 w-full rounded-xl border border-slate/20 bg-bg px-3 py-2.5 outline-none ring-mint/30 transition focus:ring"
                placeholder="********"
              />
            </div>
            {hasError && <p className="rounded-lg border border-coral/30 bg-coral/10 px-3 py-2 text-sm text-coral">Credenciales invalidas.</p>}
            <button className="inline-flex w-full items-center justify-center rounded-xl bg-ink px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-[1px] hover:bg-ink/90">
              Entrar al portal
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
