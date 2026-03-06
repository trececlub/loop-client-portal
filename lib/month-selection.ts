import { listAvailableMonthsForClient } from "@/lib/data-store";

export type MonthOption = {
  value: string;
  label: string;
  enabled: boolean;
};

export type MonthSelectionState = {
  activeMonth: string;
  cutoffMonth: string;
  options: MonthOption[];
};

export async function getMonthSelectionState(
  clientCode: string,
  requestedMonth?: string,
): Promise<MonthSelectionState> {
  const today = new Date();
  const currentMonth = toMonthKey(today);
  const cutoffMonth = isLastDayOfMonth(today) ? currentMonth : shiftMonthKey(currentMonth, -1);

  const availableMonths = await listAvailableMonthsForClient(clientCode);
  let earliestMonth = availableMonths.at(-1) || cutoffMonth;

  if (earliestMonth > cutoffMonth) {
    earliestMonth = cutoffMonth;
  }

  const monthKeys = buildMonthRangeDescending(currentMonth, earliestMonth);
  const options = monthKeys.map((monthKey) => ({
    value: monthKey,
    label: formatMonthLabel(monthKey),
    enabled: monthKey <= cutoffMonth,
  }));

  const enabledMonthSet = new Set(options.filter((item) => item.enabled).map((item) => item.value));
  const normalizedRequested = normalizeMonth(requestedMonth);

  const fallbackMonth = options.find((item) => item.enabled)?.value || cutoffMonth;
  const activeMonth =
    normalizedRequested && enabledMonthSet.has(normalizedRequested) ? normalizedRequested : fallbackMonth;

  return { activeMonth, cutoffMonth, options };
}

export async function getOperationalMonthSelectionState(
  clientCode: string,
  requestedMonth?: string,
): Promise<MonthSelectionState> {
  const today = new Date();
  const currentMonth = toMonthKey(today);
  const availableMonths = await listAvailableMonthsForClient(clientCode);
  const earliestMonth = availableMonths.at(-1) || currentMonth;
  const monthKeys = buildMonthRangeDescending(currentMonth, earliestMonth);

  const options = monthKeys.map((monthKey) => ({
    value: monthKey,
    label: monthKey === currentMonth ? `${formatMonthLabel(monthKey)} (En curso)` : formatMonthLabel(monthKey),
    enabled: true,
  }));

  const allowedMonths = new Set(options.map((item) => item.value));
  const normalizedRequested = normalizeMonth(requestedMonth);
  const activeMonth =
    normalizedRequested && allowedMonths.has(normalizedRequested) ? normalizedRequested : currentMonth;

  return { activeMonth, cutoffMonth: currentMonth, options };
}

function normalizeMonth(value?: string) {
  if (!value) return "";
  return /^\d{4}-\d{2}$/.test(value) ? value : "";
}

function toMonthKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function shiftMonthKey(monthKey: string, offset: number) {
  const [yearRaw, monthRaw] = monthKey.split("-");
  const date = new Date(Number(yearRaw), Number(monthRaw) - 1 + offset, 1);
  return toMonthKey(date);
}

function isLastDayOfMonth(date: Date) {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return date.getDate() === lastDay;
}

function buildMonthRangeDescending(startMonth: string, endMonth: string) {
  const months: string[] = [];
  let cursor = startMonth;
  const maxSteps = 240;

  for (let i = 0; i < maxSteps; i += 1) {
    months.push(cursor);
    if (cursor === endMonth) break;
    cursor = shiftMonthKey(cursor, -1);
  }

  return months;
}

function formatMonthLabel(monthKey: string) {
  const [yearRaw, monthRaw] = monthKey.split("-");
  const date = new Date(Number(yearRaw), Number(monthRaw) - 1, 1);
  const label = new Intl.DateTimeFormat("es-CO", {
    month: "long",
    year: "numeric",
  }).format(date);

  return label.charAt(0).toUpperCase() + label.slice(1);
}
