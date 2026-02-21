import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password, role, classId, usn } = await req.json();

    // 1. Basic field validation
    if (!name || !email || !password || !role) {
      return Response.json(
        { message: "All required fields must be filled" },
        { status: 400 },
      );
    }

    // 2. Validate Role (Restrict to UI-defined roles only)
    if (!["student", "faculty"].includes(role)) {
      return Response.json(
        { message: "Invalid role selection" },
        { status: 400 },
      );
    }

    // 3. Student-specific validation (USN is usually critical for students)
    if (role === "student" && !usn) {
      return Response.json(
        { message: "USN is required for student registration" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 4. Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return Response.json(
        { message: "This email is already registered" },
        { status: 400 },
      );
    }

    // 5. Check if USN is already taken (Only for students)
    if (role === "student" && usn) {
      const existingUSN = await User.findOne({ usn: usn.toUpperCase() });
      if (existingUSN) {
        return Response.json(
          { message: "This USN is already registered" },
          { status: 400 },
        );
      }
    }

    // 6. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 7. Create User
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
      status: "pending", // Default status as per your UI footer
      ...(role === "student" && {
        class: classId || null,
        usn: usn.toUpperCase().trim(),
      }),
    });

    // 8. Generate JWT
    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
        status: newUser.status,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return Response.json(
      {
        message: "Account created! Please wait for admin approval.",
        user: { id: newUser._id, role: newUser.role },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return Response.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
