import { connectDB } from "@/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password, role, classId, usn } = await req.json();

    if (!name || !email || !password || !role) {
      return Response.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      ...(classId && { class: classId }),
      ...(usn && { usn }),
    });

    return Response.json({
      message: "Registered successfully. Waiting for approval.",
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}