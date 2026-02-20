import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Allow login page
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // If no token → go to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const role = payload.role;

    // 🔥 If user tries to access root, redirect to dashboard
    if (pathname === "/") {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }

      if (role === "faculty") {
        return NextResponse.redirect(new URL("/faculty/dashboard", request.url));
      }

      if (role === "student") {
        return NextResponse.redirect(new URL("/student/dashboard", request.url));
      }
    }

    // Otherwise allow everything
    return NextResponse.next();

  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/admin/:path*", "/faculty/:path*", "/student/:path*"],
};