import { promises as fs } from "node:fs";
import path from "node:path";

export type PortalRole = "CTO" | "CEO" | "OPERARIO" | "CLIENTE";
export type UserStatus = "Active" | "Disabled" | "Pending";
export type UserPolicyError =
  | "forbidden"
  | "not_found"
  | "duplicate_email"
  | "missing_email"
  | "cannot_delete_self"
  | "invalid_client_code";

export type PortalClient = {
  code: string;
  name: string;
  timezone: string;
};

export type PortalUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: PortalRole;
  status: UserStatus;
  clientCode: string | null;
  createdAt: string;
};

export type CallRecord = {
  id: string;
  clientCode: string;
  startedAt: string;
  source: string;
  durationSec: number;
  status: "Atendida" | "No atendida";
  result: "Cita" | "Sin accion" | "Perdida";
};

export type AppointmentRecord = {
  id: string;
  clientCode: string;
  datetime: string;
  status: "Agendada" | "Confirmada" | "Cancelada";
  channel: "Llamada" | "WhatsApp" | "Email";
  note: string;
};

export type MessageRecord = {
  id: string;
  clientCode: string;
  datetime: string;
  channel: "WhatsApp" | "Email";
  status: "Enviado" | "Fallido";
  template: string;
  to: string;
};

export type PortalData = {
  clients: PortalClient[];
  users: PortalUser[];
  calls: CallRecord[];
  appointments: AppointmentRecord[];
  messages: MessageRecord[];
};

export type DashboardSnapshot = {
  month: string;
  previousMonth: string;
  kpis: {
    calls: number;
    appointments: number;
    messagesSent: number;
    conversionPct: number;
  };
  deltas: {
    callsPct: number;
    appointmentsPct: number;
    messagesPct: number;
    conversionPts: number;
  };
  trend: { day: string; calls: number; appointments: number }[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "portal-data.json");

const initialData: PortalData = {
  clients: [
    { code: "LP-BNFJMY", name: "Clinica Sonrisa", timezone: "America/Bogota" },
    { code: "LP-CGR9L2", name: "Restaurante 1930", timezone: "America/Bogota" }
  ],
  users: [
    {
      id: "u_cto",
      name: "Andres Oviedo",
      email: "andres@empresa.com",
      password: "admin123",
      role: "CTO",
      status: "Active",
      clientCode: null,
      createdAt: "2026-03-01T09:00:00.000Z"
    },
    {
      id: "u_ceo",
      name: "Socio CEO",
      email: "ceo@empresa.com",
      password: "ceo123",
      role: "CEO",
      status: "Active",
      clientCode: null,
      createdAt: "2026-03-01T09:10:00.000Z"
    },
    {
      id: "u_ops",
      name: "Operacion Norte",
      email: "ops@empresa.com",
      password: "ops123",
      role: "OPERARIO",
      status: "Active",
      clientCode: null,
      createdAt: "2026-03-01T09:15:00.000Z"
    },
    {
      id: "u_client",
      name: "Cliente Demo",
      email: "cliente@negocio.com",
      password: "cliente123",
      role: "CLIENTE",
      status: "Active",
      clientCode: "LP-BNFJMY",
      createdAt: "2026-03-01T09:20:00.000Z"
    }
  ],
  calls: [
    { id: "c1", clientCode: "LP-BNFJMY", startedAt: "2026-03-01T14:14:00.000Z", source: "+57 301 220 9921", durationSec: 201, status: "Atendida", result: "Cita" },
    { id: "c2", clientCode: "LP-BNFJMY", startedAt: "2026-03-05T14:03:00.000Z", source: "+57 320 441 2901", durationSec: 66, status: "Atendida", result: "Sin accion" },
    { id: "c3", clientCode: "LP-BNFJMY", startedAt: "2026-03-10T13:58:00.000Z", source: "+57 315 118 0303", durationSec: 252, status: "Atendida", result: "Cita" },
    { id: "c4", clientCode: "LP-BNFJMY", startedAt: "2026-03-15T13:49:00.000Z", source: "+57 302 878 7750", durationSec: 31, status: "No atendida", result: "Perdida" },
    { id: "c5", clientCode: "LP-BNFJMY", startedAt: "2026-02-14T14:04:00.000Z", source: "+57 312 675 1414", durationSec: 188, status: "Atendida", result: "Cita" },
    { id: "c6", clientCode: "LP-CGR9L2", startedAt: "2026-03-08T14:04:00.000Z", source: "+57 311 000 0000", durationSec: 149, status: "Atendida", result: "Cita" }
  ],
  appointments: [
    { id: "a1", clientCode: "LP-BNFJMY", datetime: "2026-03-06T15:00:00.000Z", status: "Confirmada", channel: "Llamada", note: "Control" },
    { id: "a2", clientCode: "LP-BNFJMY", datetime: "2026-03-06T16:30:00.000Z", status: "Agendada", channel: "Llamada", note: "Primera cita" },
    { id: "a3", clientCode: "LP-BNFJMY", datetime: "2026-03-06T20:00:00.000Z", status: "Cancelada", channel: "WhatsApp", note: "Reagenda" },
    { id: "a4", clientCode: "LP-BNFJMY", datetime: "2026-02-06T20:00:00.000Z", status: "Confirmada", channel: "Llamada", note: "Control" },
    { id: "a5", clientCode: "LP-CGR9L2", datetime: "2026-03-09T19:00:00.000Z", status: "Agendada", channel: "Llamada", note: "Reserva" }
  ],
  messages: [
    { id: "m1", clientCode: "LP-BNFJMY", datetime: "2026-03-05T14:20:00.000Z", channel: "WhatsApp", status: "Enviado", template: "Confirmacion cita", to: "+57 301 220 9921" },
    { id: "m2", clientCode: "LP-BNFJMY", datetime: "2026-03-05T14:05:00.000Z", channel: "Email", status: "Fallido", template: "Resumen reserva", to: "cliente@mail.com" },
    { id: "m3", clientCode: "LP-BNFJMY", datetime: "2026-03-05T13:59:00.000Z", channel: "WhatsApp", status: "Enviado", template: "Recordatorio", to: "+57 315 118 0303" },
    { id: "m4", clientCode: "LP-BNFJMY", datetime: "2026-02-05T13:59:00.000Z", channel: "WhatsApp", status: "Enviado", template: "Recordatorio", to: "+57 315 118 0303" },
    { id: "m5", clientCode: "LP-CGR9L2", datetime: "2026-03-05T13:59:00.000Z", channel: "WhatsApp", status: "Enviado", template: "Reserva", to: "+57 320 999 7777" }
  ]
};

function monthKeyFromDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function previousMonthKey(monthKey: string) {
  const [yearRaw, monthRaw] = monthKey.split("-");
  const date = new Date(Number(yearRaw), Number(monthRaw) - 1, 1);
  date.setMonth(date.getMonth() - 1);
  return monthKeyFromDate(date);
}

function safePercent(numerator: number, denominator: number) {
  if (denominator <= 0) return 0;
  return (numerator / denominator) * 100;
}

function safeDeltaPct(current: number, previous: number) {
  if (previous === 0 && current > 0) return 100;
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

function formatDateTime(iso: string) {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function formatDuration(seconds: number) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2), "utf8");
  }
}

export async function readPortalData() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const parsed = JSON.parse(raw) as PortalData;
  return parsed;
}

async function writePortalData(data: PortalData) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function validatePortalCredentials(email: string, password: string) {
  const data = await readPortalData();
  const normalizedEmail = email.trim().toLowerCase();

  const user = data.users.find(
    (candidate) =>
      candidate.email.toLowerCase() === normalizedEmail && candidate.password === password && candidate.status === "Active",
  );

  if (!user) return undefined;
  return user;
}

export async function getPortalUserById(userId: string) {
  const data = await readPortalData();
  return data.users.find((user) => user.id === userId);
}

export async function getClientByCode(clientCode: string) {
  const data = await readPortalData();
  return data.clients.find((client) => client.code === clientCode);
}

export function isInternalRole(role: PortalRole) {
  return role === "CTO" || role === "CEO" || role === "OPERARIO";
}

export async function resolveClientCodeForUser(user: PortalUser, candidateCode?: string) {
  const data = await readPortalData();

  if (user.role === "CLIENTE") {
    return user.clientCode || data.clients[0]?.code || "";
  }

  const foundCandidate = candidateCode ? data.clients.find((item) => item.code === candidateCode) : undefined;
  return foundCandidate?.code || data.clients[0]?.code || "";
}

export async function getDashboardSnapshot(clientCode: string, monthKey?: string): Promise<DashboardSnapshot> {
  const data = await readPortalData();
  const activeMonth = monthKey || monthKeyFromDate(new Date());
  const prevMonth = previousMonthKey(activeMonth);

  const callsCurrent = data.calls.filter((row) => row.clientCode === clientCode && row.startedAt.startsWith(activeMonth));
  const callsPrev = data.calls.filter((row) => row.clientCode === clientCode && row.startedAt.startsWith(prevMonth));

  const appointmentsCurrent = data.appointments.filter(
    (row) => row.clientCode === clientCode && row.datetime.startsWith(activeMonth),
  );
  const appointmentsPrev = data.appointments.filter(
    (row) => row.clientCode === clientCode && row.datetime.startsWith(prevMonth),
  );

  const messagesCurrent = data.messages.filter((row) => row.clientCode === clientCode && row.datetime.startsWith(activeMonth));
  const messagesPrev = data.messages.filter((row) => row.clientCode === clientCode && row.datetime.startsWith(prevMonth));

  const calls = callsCurrent.length;
  const appointments = appointmentsCurrent.filter((row) => row.status !== "Cancelada").length;
  const messagesSent = messagesCurrent.filter((row) => row.status === "Enviado").length;
  const conversionPct = safePercent(appointments, calls);

  const prevCalls = callsPrev.length;
  const prevAppointments = appointmentsPrev.filter((row) => row.status !== "Cancelada").length;
  const prevMessages = messagesPrev.filter((row) => row.status === "Enviado").length;
  const prevConversion = safePercent(prevAppointments, prevCalls);

  const dayBuckets = new Map<string, { calls: number; appointments: number }>();
  for (let day = 1; day <= 31; day += 1) {
    const key = String(day).padStart(2, "0");
    dayBuckets.set(key, { calls: 0, appointments: 0 });
  }

  for (const row of callsCurrent) {
    const day = row.startedAt.slice(8, 10);
    const bucket = dayBuckets.get(day);
    if (bucket) bucket.calls += 1;
  }

  for (const row of appointmentsCurrent) {
    const day = row.datetime.slice(8, 10);
    const bucket = dayBuckets.get(day);
    if (bucket && row.status !== "Cancelada") bucket.appointments += 1;
  }

  const trend = Array.from(dayBuckets.entries())
    .map(([day, values]) => ({ day, calls: values.calls, appointments: values.appointments }))
    .filter((entry) => Number(entry.day) % 5 === 0 || entry.day === "01" || entry.day === "30");

  return {
    month: activeMonth,
    previousMonth: prevMonth,
    kpis: {
      calls,
      appointments,
      messagesSent,
      conversionPct: Number(conversionPct.toFixed(1)),
    },
    deltas: {
      callsPct: Number(safeDeltaPct(calls, prevCalls).toFixed(1)),
      appointmentsPct: Number(safeDeltaPct(appointments, prevAppointments).toFixed(1)),
      messagesPct: Number(safeDeltaPct(messagesSent, prevMessages).toFixed(1)),
      conversionPts: Number((conversionPct - prevConversion).toFixed(1)),
    },
    trend,
  };
}

export async function getCallsForClient(clientCode: string, monthKey?: string) {
  const data = await readPortalData();
  const activeMonth = monthKey || monthKeyFromDate(new Date());
  return data.calls
    .filter((row) => row.clientCode === clientCode && row.startedAt.startsWith(activeMonth))
    .sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1))
    .map((row) => ({
      id: row.id,
      date: formatDateTime(row.startedAt),
      source: row.source,
      duration: formatDuration(row.durationSec),
      status: row.status,
      result: row.result,
    }));
}

export async function getAppointmentsForClient(clientCode: string, monthKey?: string) {
  const data = await readPortalData();
  const activeMonth = monthKey || monthKeyFromDate(new Date());
  return data.appointments
    .filter((row) => row.clientCode === clientCode && row.datetime.startsWith(activeMonth))
    .sort((a, b) => (a.datetime > b.datetime ? 1 : -1))
    .map((row) => ({ ...row, datetime: formatDateTime(row.datetime) }));
}

export async function getMessagesForClient(clientCode: string, monthKey?: string) {
  const data = await readPortalData();
  const activeMonth = monthKey || monthKeyFromDate(new Date());
  return data.messages
    .filter((row) => row.clientCode === clientCode && row.datetime.startsWith(activeMonth))
    .sort((a, b) => (a.datetime < b.datetime ? 1 : -1))
    .map((row) => ({ ...row, datetime: formatDateTime(row.datetime) }));
}

export async function getComparisonRows(clientCode: string, monthKey?: string) {
  const snapshot = await getDashboardSnapshot(clientCode, monthKey);
  const previous = snapshot.previousMonth;
  const data = await readPortalData();

  const prevCalls = data.calls.filter((row) => row.clientCode === clientCode && row.startedAt.startsWith(previous)).length;
  const prevAppointments = data.appointments.filter(
    (row) => row.clientCode === clientCode && row.datetime.startsWith(previous) && row.status !== "Cancelada",
  ).length;
  const prevDuration = averageDuration(
    data.calls.filter((row) => row.clientCode === clientCode && row.startedAt.startsWith(previous)).map((row) => row.durationSec),
  );

  const currentDuration = averageDuration((await getCallsForClient(clientCode, snapshot.month)).map((row) => durationToSec(row.duration)));

  return [
    { label: "Llamadas", current: snapshot.kpis.calls, previous: prevCalls },
    { label: "Citas", current: snapshot.kpis.appointments, previous: prevAppointments },
    { label: "Conversion", current: snapshot.kpis.conversionPct, previous: Number(safePercent(prevAppointments, prevCalls).toFixed(1)) },
    { label: "Duracion media", current: Number(currentDuration.toFixed(1)), previous: Number(prevDuration.toFixed(1)) }
  ];
}

function durationToSec(value: string) {
  const [min, sec] = value.split(":").map((part) => Number(part));
  return min * 60 + sec;
}

function averageDuration(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length / 60;
}

export async function listPortalUsers() {
  const data = await readPortalData();
  return [...data.users].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function createPortalUser(input: {
  actorRole: PortalRole;
  name: string;
  email: string;
  password: string;
  role: PortalRole;
  status: UserStatus;
  clientCode: string | null;
}) {
  const data = await readPortalData();

  if (!canActorCreateUser(input.actorRole, input.role)) {
    return { ok: false as const, error: "forbidden" as UserPolicyError };
  }

  const normalizedEmail = input.email.trim().toLowerCase();
  if (!normalizedEmail) return { ok: false as const, error: "missing_email" };
  if (data.users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    return { ok: false as const, error: "duplicate_email" };
  }

  if (input.role === "CLIENTE") {
    const foundClient = data.clients.find((client) => client.code === input.clientCode);
    if (!foundClient) {
      return { ok: false as const, error: "invalid_client_code" as UserPolicyError };
    }
  }

  const created: PortalUser = {
    id: `u_${Date.now().toString(36)}`,
    name: input.name.trim(),
    email: normalizedEmail,
    password: input.password,
    role: input.role,
    status: input.status,
    clientCode: input.role === "CLIENTE" ? input.clientCode : null,
    createdAt: new Date().toISOString(),
  };

  data.users.unshift(created);
  await writePortalData(data);
  return { ok: true as const, user: created };
}

export async function updatePortalUser(input: {
  actorRole: PortalRole;
  actorUserId: string;
  targetUserId: string;
  role: PortalRole;
  status: UserStatus;
  clientCode: string | null;
  password?: string;
}) {
  const data = await readPortalData();
  const userIndex = data.users.findIndex((user) => user.id === input.targetUserId);
  if (userIndex === -1) return { ok: false as const, error: "not_found" as UserPolicyError };

  const target = data.users[userIndex];
  if (!canActorModifyUser(input.actorRole)) {
    return { ok: false as const, error: "forbidden" as UserPolicyError };
  }

  if (input.role === "CLIENTE") {
    const foundClient = data.clients.find((client) => client.code === input.clientCode);
    if (!foundClient) {
      return { ok: false as const, error: "invalid_client_code" as UserPolicyError };
    }
  }

  const nextPassword = input.password && input.password.trim().length > 0 ? input.password.trim() : target.password;
  data.users[userIndex] = {
    ...target,
    role: input.role,
    status: input.status,
    clientCode: input.role === "CLIENTE" ? input.clientCode : null,
    password: nextPassword,
  };

  await writePortalData(data);
  return { ok: true as const, user: data.users[userIndex] };
}

export async function deletePortalUser(input: { actorRole: PortalRole; actorUserId: string; targetUserId: string }) {
  const data = await readPortalData();
  const userIndex = data.users.findIndex((user) => user.id === input.targetUserId);
  if (userIndex === -1) return { ok: false as const, error: "not_found" as UserPolicyError };

  const target = data.users[userIndex];
  if (!canActorDeleteUser(input.actorRole, target.role)) {
    return { ok: false as const, error: "forbidden" as UserPolicyError };
  }

  if (target.id === input.actorUserId) {
    return { ok: false as const, error: "cannot_delete_self" as UserPolicyError };
  }

  data.users.splice(userIndex, 1);
  await writePortalData(data);
  return { ok: true as const };
}

export async function getReportRows(clientCode: string, monthKey?: string) {
  const calls = await getCallsForClient(clientCode, monthKey);
  const appointments = await getAppointmentsForClient(clientCode, monthKey);
  const messages = await getMessagesForClient(clientCode, monthKey);

  const rows: Array<Record<string, string>> = [];

  for (const row of calls) {
    rows.push({
      datetime: row.date,
      module: "Llamadas",
      status: row.status,
      detail: row.result,
      reference: row.source,
    });
  }

  for (const row of appointments) {
    rows.push({
      datetime: row.datetime,
      module: "Citas",
      status: row.status,
      detail: row.note,
      reference: row.channel,
    });
  }

  for (const row of messages) {
    rows.push({
      datetime: row.datetime,
      module: "Mensajes",
      status: row.status,
      detail: row.template,
      reference: row.to,
    });
  }

  return rows.sort((a, b) => (a.datetime < b.datetime ? 1 : -1));
}

export async function listClientOptions() {
  const data = await readPortalData();
  return data.clients;
}

export function canActorModifyUser(actorRole: PortalRole) {
  return actorRole === "CTO";
}

export function canActorDeleteUser(actorRole: PortalRole, targetRole: PortalRole) {
  if (actorRole === "CTO") return true;
  if (actorRole === "CEO") return targetRole !== "CTO";
  if (actorRole === "OPERARIO") return targetRole !== "CTO" && targetRole !== "CEO";
  return false;
}

export function canActorCreateUser(actorRole: PortalRole, createdRole: PortalRole) {
  if (actorRole === "CTO") return true;
  if (actorRole === "CEO") return createdRole !== "CTO";
  if (actorRole === "OPERARIO") return createdRole !== "CTO" && createdRole !== "CEO";
  return false;
}
