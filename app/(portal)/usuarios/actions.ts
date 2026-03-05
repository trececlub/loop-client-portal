"use server";

import { redirect } from "next/navigation";
import { canViewUsers, getPortalSession } from "@/lib/auth";
import { createPortalUser, type PortalRole, type UserStatus } from "@/lib/data-store";

export async function createUserAction(formData: FormData) {
  const session = await getPortalSession();
  if (!session || !canViewUsers(session.role)) {
    redirect("/dashboard");
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const role = String(formData.get("role") || "CLIENTE") as PortalRole;
  const status = String(formData.get("status") || "Active") as UserStatus;
  const clientCodeRaw = String(formData.get("clientCode") || "").trim();

  if (!name || !email || !password) {
    redirect("/usuarios?error=missing_fields");
  }

  const clientCode = role === "CLIENTE" ? clientCodeRaw || session.clientCode : null;
  const result = await createPortalUser({
    name,
    email,
    password,
    role,
    status,
    clientCode,
  });

  if (!result.ok) {
    redirect(`/usuarios?error=${result.error}`);
  }

  redirect("/usuarios?saved=1");
}
