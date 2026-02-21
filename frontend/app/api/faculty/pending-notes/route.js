import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import ClassFaculty from "@/models/ClassFaculty";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  try {
    await connectDB();

    /* 🔐 Verify Faculty */
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "faculty") {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    /* 📚 Get Classes Assigned To Faculty */
    const assignments = await ClassFaculty.find({
      faculty: payload.id,
    });

    const classIds = assignments.map((a) => a.class);

    /* 📝 Get Pending Student Notes */
    const notes = await Note.find({
      class: { $in: classIds },
      uploaderRole: "student",
      approvalStatus: "pending",
    })
      .populate("uploadedBy", "name")
      .populate("class", "name");

    return NextResponse.json({ notes });

  } catch (error) {
    console.error("Pending Notes Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}