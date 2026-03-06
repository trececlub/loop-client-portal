import { getPortalSession } from "@/lib/auth";
import { redirect } from "next/navigation";

type PermissionItem = {
  title: string;
  status: "allowed" | "restricted";
  detail: string;
};

const roleSummary: Record<string, string> = {
  CTO: "Control total de administracion, usuarios y operacion.",
  CEO: "Gestion ejecutiva con control amplio sobre usuarios y operacion.",
  OPERARIO: "Operacion diaria con permisos limitados por jerarquia.",
  CLIENTE: "Perfil informativo de su propio cliente y reportes.",
};

export default async function ProfilePage() {
  const session = await getPortalSession();
  if (!session) redirect("/login");

  const isAdminRole = session.role !== "CLIENTE";
  const createdAt = new Date(session.user.createdAt).toLocaleString("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const permissions = getPermissionsForRole(session.role);
  const moduleAccess = getModulesForRole(session.role);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-slate">Cuenta</p>
        <h1 className="mt-1 text-3xl font-semibold">Perfil</h1>
        <p className="mt-2 text-sm text-slate">{roleSummary[session.role]}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate/20 bg-white p-5 shadow-card">
          <p className="text-xs uppercase tracking-[0.14em] text-slate">Credencial activa</p>
          <div className="mt-4 grid gap-3">
            <Field label="Nombre" value={session.user.name} />
            <Field label="Email" value={session.user.email} />
            <Field label="Rol" value={session.role} />
            <Field label="Estado" value={session.user.status} />
            <Field label="Creado" value={createdAt} />
          </div>
        </article>

        <article className="rounded-2xl border border-slate/20 bg-white p-5 shadow-card">
          <p className="text-xs uppercase tracking-[0.14em] text-slate">Alcance del perfil</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-slate/15 bg-bg px-3 py-2">
              <p className="text-xs uppercase tracking-[0.12em] text-slate">Tipo de acceso</p>
              <p className="mt-1 text-sm font-medium text-ink">
                {isAdminRole ? "Administrativo multi-cliente" : "Cliente informativo"}
              </p>
            </div>
            <div className="rounded-xl border border-slate/15 bg-bg px-3 py-2">
              <p className="text-xs uppercase tracking-[0.12em] text-slate">Cliente asociado</p>
              <p className="mt-1 text-sm font-medium text-ink">
                {session.role === "CLIENTE"
                  ? `${session.clientName} (${session.assignedClientCode || "-"})`
                  : "No aplica para roles administrativos"}
              </p>
            </div>
            <div className="rounded-xl border border-slate/15 bg-bg px-3 py-2">
              <p className="text-xs uppercase tracking-[0.12em] text-slate">Modulos visibles</p>
              <p className="mt-1 text-sm font-medium text-ink">{moduleAccess.join(", ")}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-slate/20 bg-white p-5 shadow-card">
        <p className="text-xs uppercase tracking-[0.14em] text-slate">Permisos del rol</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {permissions.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate/15 bg-bg px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-ink">{item.title}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    item.status === "allowed"
                      ? "bg-mint/15 text-mint"
                      : "bg-coral/15 text-coral"
                  }`}
                >
                  {item.status === "allowed" ? "Permitido" : "Restringido"}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate/20 bg-white p-4 shadow-card">
        <p className="text-sm text-slate">Para cerrar sesion usa el boton "Salir" en la esquina superior.</p>
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate/15 bg-bg px-3 py-2">
      <p className="text-xs uppercase tracking-[0.12em] text-slate">{label}</p>
      <p className="mt-1 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

function getModulesForRole(role: string) {
  if (role === "CLIENTE") {
    return ["Dashboard", "Llamadas", "Citas", "Mensajes", "Comparativas", "Reportes", "Perfil"];
  }
  return [
    "Dashboard",
    "Llamadas",
    "Citas",
    "Mensajes",
    "Comparativas",
    "Reportes",
    "Perfil",
    "Usuarios",
  ];
}

function getPermissionsForRole(role: string): PermissionItem[] {
  if (role === "CTO") {
    return [
      { title: "Crear usuarios", status: "allowed", detail: "Puede crear CTO, CEO, OPERARIO y CLIENTE." },
      { title: "Modificar usuarios", status: "allowed", detail: "Puede modificar todos los perfiles." },
      { title: "Eliminar usuarios", status: "allowed", detail: "Puede eliminar todos, excepto su propio usuario." },
      { title: "Codigo de cliente", status: "restricted", detail: "No aplica para roles administrativos." },
    ];
  }

  if (role === "CEO") {
    return [
      { title: "Crear usuarios", status: "allowed", detail: "Puede crear CEO, OPERARIO y CLIENTE. No CTO." },
      { title: "Modificar usuarios", status: "allowed", detail: "Puede modificar CEO, OPERARIO y CLIENTE. No CTO." },
      { title: "Eliminar usuarios", status: "allowed", detail: "Puede eliminar CEO, OPERARIO y CLIENTE. No CTO." },
      { title: "Codigo de cliente", status: "restricted", detail: "No aplica para roles administrativos." },
    ];
  }

  if (role === "OPERARIO") {
    return [
      { title: "Crear usuarios", status: "allowed", detail: "Puede crear OPERARIO y CLIENTE." },
      { title: "Modificar usuarios", status: "allowed", detail: "Puede modificar OPERARIO y CLIENTE. No CTO/CEO." },
      { title: "Eliminar usuarios", status: "allowed", detail: "Puede eliminar OPERARIO y CLIENTE. No CTO/CEO." },
      { title: "Codigo de cliente", status: "restricted", detail: "No aplica para roles administrativos." },
    ];
  }

  return [
    { title: "Gestion de usuarios", status: "restricted", detail: "No tiene acceso al modulo Usuarios." },
    { title: "Visualizacion", status: "allowed", detail: "Puede ver dashboard, llamadas, citas, mensajes y reportes." },
    { title: "Exportacion de reportes", status: "allowed", detail: "Puede descargar datos de su cliente asignado." },
    { title: "Codigo de cliente", status: "allowed", detail: "Tiene un codigo fijo asignado por administracion." },
  ];
}
