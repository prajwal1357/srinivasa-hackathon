import { connectDB } from "@/lib/db";
import Notice from "@/models/Notice";
import Note from "@/models/Note";
import User from "@/models/User";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    /* 🔐 Get Student from JWT */
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const student = await User.findById(payload.id);

    if (!student || student.role !== "student") {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }

    const today = new Date();

    /* 🔹 Admin Notices (visible to all) */
    const adminNotices = await Notice.find({
      creatorRole: "admin",
      expiryDate: { $gte: today },
      isActive: true,
    }).sort({ createdAt: -1 });

    /* 🔹 Faculty Notices (only student class) */
    const facultyNotices = await Notice.find({
      creatorRole: "faculty",
      class: student.class,
      expiryDate: { $gte: today },
      isActive: true,
    }).sort({ createdAt: -1 });

    /* 🔹 Assignment Due Alerts */
    const assignments = await Note.find({
      class: student.class,
      type: "assignment",
      approvalStatus: "approved",
      dueDate: { $gte: today },
      isActive: true,
    })
      .sort({ dueDate: 1 })
      .limit(5);

    return NextResponse.json({
      adminNotices,
      facultyNotices,
      assignments,
    });

  } catch (error) {
    console.error("Fetch Notices Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}