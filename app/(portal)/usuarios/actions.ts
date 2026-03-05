"use server";

import { redirect } from "next/navigation";
import { canViewUsers, getPortalSession } from "@/lib/auth";
import {
  createPortalUser,
  deletePortalUser,
  updatePortalUser,
  type PortalRole,
  type UserStatus,
} from "@/lib/data-store";

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
    actorRole: session.role,
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

export async function deleteUserAction(formData: FormData) {
  const session = await getPortalSession();
  if (!session || !canViewUsers(session.role)) {
    redirect("/dashboard");
  }

  const targetUserId = String(formData.get("targetUserId") || "").trim();
  if (!targetUserId) redirect("/usuarios?error=not_found");

  const result = await deletePortalUser({
    actorRole: session.role,
    actorUserId: session.user.id,
    targetUserId,
  });

  if (!result.ok) {
    redirect(`/usuarios?error=${result.error}`);
  }

  redirect("/usuarios?saved=deleted");
}

export async function updateUserAction(formData: FormData) {
  const session = await getPortalSession();
  if (!session || !canViewUsers(session.role)) {
    redirect("/dashboard");
  }

  const targetUserId = String(formData.get("targetUserId") || "").trim();
  const role = String(formData.get("role") || "CLIENTE") as PortalRole;
  const status = String(formData.get("status") || "Active") as UserStatus;
  const clientCodeRaw = String(formData.get("clientCode") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!targetUserId) redirect("/usuarios?error=not_found");

  const result = await updatePortalUser({
    actorRole: session.role,
    actorUserId: session.user.id,
    targetUserId,
    role,
    status,
    clientCode: role === "CLIENTE" ? clientCodeRaw || session.clientCode : null,
    password,
  });

  if (!result.ok) {
    redirect(`/usuarios?error=${result.error}`);
  }

  redirect("/usuarios?saved=updated");
}
