import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicFile = /\.[^/]+$/.test(pathname);

  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api/") ||
    isPublicFile
  ) {
    return NextResponse.next();
  }

  const hasSession = req.cookies.get("portal_session")?.value === "1";
  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const role = req.cookies.get("portal_role")?.value || "CLIENTE";
  if (pathname.startsWith("/usuarios") && role === "CLIENTE") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
