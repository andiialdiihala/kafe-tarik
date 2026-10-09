import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for better-auth session token cookie
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value;

  const isAuthPage = pathname.startsWith("/auth");
  const isAdminPage = pathname.startsWith("/admin");

  if (isAuthPage && sessionToken) {
    const isInviteFlow = pathname.startsWith("/auth/accept") || pathname.startsWith("/auth/register");
    if (isInviteFlow) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // If user is NOT logged in and tries to access admin pages, redirect to login
  if (isAdminPage && !sessionToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Kasir cannot access staff/settings
  if (pathname.startsWith("/admin/staff") || pathname.startsWith("/admin/settings")) {
    const session = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
      headers: { cookie: request.headers.get("cookie") || "" },
    }).then(res => res.json());

    if (session?.user?.role === "kasir") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
