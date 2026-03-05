import { AppShell } from "@/components/app-shell";
import { getPortalSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getPortalSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <AppShell role={session.role} clientName={session.clientName} userName={session.user.name}>
      {children}
    </AppShell>
  );
}
