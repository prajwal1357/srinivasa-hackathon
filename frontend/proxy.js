import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Public Routes: Always allow
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    // If user is already logged in, don't let them see login/signup
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 2. Authentication Check
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const { role, status } = payload;

    // 3. Security: Handle "Pending" or "Blocked" users
    // If the account isn't approved, prevent access to any dashboard
    if (status !== "approved" && !pathname.startsWith("/pending-approval")) {
      // You might want to create a small 'waiting' page for users
      // return NextResponse.redirect(new URL("/pending-approval", request.url));
    }

    // 4. Role-Based Access Control (RBAC) Logic
    // Redirect root "/" to respective dashboards
    if (pathname === "/") {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }

    // 5. Strict Path Protection
    // Prevent a 'student' from accessing '/admin/*' or '/faculty/*'
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }

    if (pathname.startsWith("/faculty") && role !== "faculty") {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }

    if (pathname.startsWith("/student") && role !== "student") {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Token is invalid, expired, or tampered with
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token"); // Clear the bad token
    return response;
  }
}

// 6. Matcher Configuration
export const config = {
  matcher: [
    // "/",
    // "/admin/:path*",
    // "/faculty/:path*",
    // "/student/:path*",
    // "/login",
    // "/signup",
  ],
};