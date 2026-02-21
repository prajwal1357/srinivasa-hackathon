import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function PATCH(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "faculty")
      return NextResponse.json({ message: "Access denied" }, { status: 403 });

    const { noteId, action } = await req.json();

    const note = await Note.findById(noteId);

    if (!note || note.approvalStatus !== "pending")
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );

    note.approvalStatus = action === "approve" ? "approved" : "rejected";
    note.approvedBy = payload.id;
    note.approvedAt = new Date();

    await note.save();

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}