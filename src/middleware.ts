import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Basic token validation (check if it's a valid base64 string with non-expired payload)
    try {
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      const secret = process.env.AUTH_SECRET || "sion-secret-key-change-in-production";
      const [payloadStr] = decoded.split("." + secret);
      const payload = JSON.parse(payloadStr);
      if (payload.exp <= Date.now()) {
        const response = NextResponse.redirect(new URL("/admin/login", request.url));
        response.cookies.delete("admin_token");
        return response;
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
