export type Kpi = {
  label: string;
  value: string;
  delta: string;
  tone: "up" | "down" | "neutral";
};

export const kpis: Kpi[] = [
  { label: "Llamadas recibidas", value: "1,284", delta: "+12.4% vs mes pasado", tone: "up" },
  { label: "Citas agendadas", value: "312", delta: "+8.1% vs mes pasado", tone: "up" },
  { label: "Mensajes enviados", value: "947", delta: "-1.2% vs mes pasado", tone: "down" },
  { label: "Conversion", value: "24.3%", delta: "+2.6 pts", tone: "up" }
];

export const monthTrend = [
  { day: "01", calls: 28, appointments: 8 },
  { day: "05", calls: 42, appointments: 11 },
  { day: "10", calls: 37, appointments: 9 },
  { day: "15", calls: 45, appointments: 13 },
  { day: "20", calls: 48, appointments: 14 },
  { day: "25", calls: 39, appointments: 10 },
  { day: "30", calls: 51, appointments: 15 }
];

export const callsTable = [
  { date: "2026-03-05 09:14", source: "+57 301 220 9921", duration: "03:21", status: "Atendida", result: "Cita" },
  { date: "2026-03-05 09:03", source: "+57 320 441 2901", duration: "01:06", status: "Atendida", result: "Sin accion" },
  { date: "2026-03-05 08:58", source: "+57 315 118 0303", duration: "04:12", status: "Atendida", result: "Cita" },
  { date: "2026-03-05 08:49", source: "+57 302 878 7750", duration: "00:31", status: "No atendida", result: "Perdida" }
];

export const appointmentsTable = [
  { datetime: "2026-03-06 10:00", status: "Confirmada", channel: "Llamada", note: "Control" },
  { datetime: "2026-03-06 11:30", status: "Agendada", channel: "Llamada", note: "Primera cita" },
  { datetime: "2026-03-06 15:00", status: "Cancelada", channel: "WhatsApp", note: "Reagenda" }
];

export const messagesTable = [
  { date: "2026-03-05 09:20", channel: "WhatsApp", status: "Enviado", template: "Confirmacion cita", to: "+57 301 220 9921" },
  { date: "2026-03-05 09:05", channel: "Email", status: "Fallido", template: "Resumen reserva", to: "cliente@mail.com" },
  { date: "2026-03-05 08:59", channel: "WhatsApp", status: "Enviado", template: "Recordatorio", to: "+57 315 118 0303" }
];

export const compareA = [
  { label: "Llamadas", current: 1284, previous: 1142 },
  { label: "Citas", current: 312, previous: 276 },
  { label: "Conversion", current: 24.3, previous: 21.7 },
  { label: "Duracion media", current: 2.9, previous: 2.6 }
];

export const usersTable = [
  { name: "Andres Oviedo", email: "andres@empresa.com", role: "CTO", status: "Active" },
  { name: "Socio CEO", email: "ceo@empresa.com", role: "CEO", status: "Active" },
  { name: "Operacion Norte", email: "ops@empresa.com", role: "OPERARIO", status: "Active" },
  { name: "Cliente Demo", email: "cliente@negocio.com", role: "CLIENTE", status: "Active" }
];
