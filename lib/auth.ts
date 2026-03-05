import { cookies } from "next/headers";
import {
  getClientByCode,
  getPortalUserById,
  isInternalRole,
  resolveClientCodeForUser,
  type PortalRole,
  type PortalUser,
} from "@/lib/data-store";

export type PortalSession = {
  user: PortalUser;
  role: PortalRole;
  clientCode: string;
  clientName: string;
};

export async function getPortalSession(): Promise<PortalSession | null> {
  const store = cookies();
  const userId = store.get("portal_user_id")?.value || "";
  const clientCodeCookie = store.get("portal_client_code")?.value || "";

  if (!userId) return null;

  const user = await getPortalUserById(userId);
  if (!user || user.status !== "Active") return null;

  const clientCode = await resolveClientCodeForUser(user, clientCodeCookie);
  const client = await getClientByCode(clientCode);

  return {
    user,
    role: user.role,
    clientCode,
    clientName: client?.name || "Cliente"
  };
}

export function canViewUsers(role: PortalRole) {
  return isInternalRole(role);
}
