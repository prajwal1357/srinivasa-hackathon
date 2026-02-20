import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // Public routes
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    const role = payload.role;

    // Admin Routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // Faculty Routes
    if (pathname.startsWith("/faculty") || pathname.startsWith("/api/faculty")) {
      if (role !== "faculty") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // Student Routes
    if (pathname.startsWith("/student") || pathname.startsWith("/api/student")) {
      if (role !== "student") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    return NextResponse.next();

  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    // "/admin/:path*",
    // "/faculty/:path*",
    // "/student/:path*",
    // "/api/admin/:path*",
    // "/api/faculty/:path*",
    // "/api/student/:path*",
  ],
};