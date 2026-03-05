"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { resolveClientCodeForUser, validatePortalCredentials } from "@/lib/data-store";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  const user = await validatePortalCredentials(email, password);
  if (!user) {
    redirect("/login?error=invalid");
  }

  const clientCode = await resolveClientCodeForUser(user);

  cookies().set("portal_session", "1", { httpOnly: true, sameSite: "lax", path: "/" });
  cookies().set("portal_user_id", user.id, { httpOnly: true, sameSite: "lax", path: "/" });
  cookies().set("portal_role", user.role, { httpOnly: true, sameSite: "lax", path: "/" });
  cookies().set("portal_client_code", clientCode, { httpOnly: true, sameSite: "lax", path: "/" });

  redirect("/dashboard");
}

export async function logoutAction() {
  cookies().set("portal_session", "0", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  cookies().set("portal_user_id", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  cookies().set("portal_role", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  cookies().set("portal_client_code", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });

  redirect("/login");
}
