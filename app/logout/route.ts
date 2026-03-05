import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectUrl = new URL("/login", url.origin);
  const response = NextResponse.redirect(redirectUrl);

  response.cookies.set("portal_session", "0", { path: "/", httpOnly: true, sameSite: "lax", maxAge: 0 });
  response.cookies.set("portal_user_id", "", { path: "/", httpOnly: true, sameSite: "lax", maxAge: 0 });
  response.cookies.set("portal_role", "", { path: "/", httpOnly: true, sameSite: "lax", maxAge: 0 });
  response.cookies.set("portal_client_code", "", { path: "/", httpOnly: true, sameSite: "lax", maxAge: 0 });

  return response;
}
