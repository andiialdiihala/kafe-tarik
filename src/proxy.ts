import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for better-auth session token cookie
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value;

  const isAuthPage = pathname.startsWith("/auth");
  const isAdminPage = pathname.startsWith("/admin");

  // If user is logged in and tries to access auth pages, redirect to admin
  if (isAuthPage && sessionToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // If user is NOT logged in and tries to access admin pages, redirect to login
  if (isAdminPage && !sessionToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
