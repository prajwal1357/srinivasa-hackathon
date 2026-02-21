import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  try {
    await connectDB();

    /* 🔐 Verify Student */
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "student") {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    const student = await User.findById(payload.id);

    if (!student || student.status !== "approved") {
      return NextResponse.json(
        { message: "Student not approved" },
        { status: 403 }
      );
    }

    /* 📘 Fetch Only Approved Notes for Student's Class */
    const notes = await Note.find({
      class: student.class,
      approvalStatus: "approved",
    })
      .populate("uploadedBy", "name")
      .sort({ semester: 1 });

    /* 📊 Group By Semester */
    const grouped = notes.reduce((acc, note) => {
      if (!acc[note.semester]) {
        acc[note.semester] = [];
      }
      acc[note.semester].push(note);
      return acc;
    }, {});

    return NextResponse.json({
      notes: grouped,
    });

  } catch (error) {
    console.error("Student Notes Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}