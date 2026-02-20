import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import Faculty from "@/models/Faculty";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    let user = await Student.findOne({ email }).populate("class");
    let role = "student";

    if (!user) {
      user = await Faculty.findOne({ email });
      role = "faculty";
    }

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    if (user.status !== "approved") {
      return Response.json(
        { message: "Account not approved yet" },
        { status: 403 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, 
    });

    return Response.json({
      message: "Login successful",
      role,
    });

  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}