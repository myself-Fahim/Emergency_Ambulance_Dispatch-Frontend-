import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const protectedPath = pathname === "/dashboard" || pathname.startsWith("/dashboard/") || pathname === "/adminDashboard" || pathname === "/driverDashboard" || pathname === "/customerDashboard";
  if (!protectedPath) return NextResponse.next();
  if (!request.cookies.get("access_token")?.value) {
    return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(request.nextUrl.pathname)}`, request.url));
  }
  const role = request.cookies.get("session_role")?.value?.toUpperCase();
  const requiredRole = pathname.includes("adminDashboard") ? "ADMIN" : pathname.includes("driverDashboard") ? "DRIVER" : pathname.includes("customerDashboard") ? "CUSTOMER" : undefined;
  if (requiredRole && role !== requiredRole) return NextResponse.redirect(new URL("/dashboard", request.url));
  if (pathname === "/dashboard" && role) {
    const destination = role === "ADMIN" ? "/dashboard/adminDashboard" : role === "DRIVER" ? "/dashboard/driverDashboard" : "/dashboard/customerDashboard";
    return NextResponse.redirect(new URL(destination, request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/adminDashboard/:path*", "/driverDashboard/:path*", "/customerDashboard/:path*"] };
