import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getReportRows, getPortalUserById, resolveClientCodeForUser } from "@/lib/data-store";

export async function GET(request: Request) {
  const store = cookies();
  const hasSession = store.get("portal_session")?.value === "1";
  if (!hasSession) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const userId = store.get("portal_user_id")?.value || "";
  const user = await getPortalUserById(userId);
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const month = new URL(request.url).searchParams.get("month") || undefined;
  const currentCode = store.get("portal_client_code")?.value;
  const clientCode = await resolveClientCodeForUser(user, currentCode);
  const rows = await getReportRows(clientCode, month);

  const header = ["datetime", "module", "status", "detail", "reference"].join(",");
  const body = rows
    .map((row) => [row.datetime, row.module, row.status, row.detail, row.reference].map(escapeCsv).join(","))
    .join("\n");

  const csv = `${header}\n${body}`;
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=loop-report-${month || "current"}.csv`,
    },
  });
}

function escapeCsv(value: string) {
  const needsQuote = /[",\n]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuote ? `"${escaped}"` : escaped;
}
