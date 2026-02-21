import { connectDB } from "@/lib/db";
import Notice from "@/models/Notice";
import ClassFaculty from "@/models/ClassFaculty";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import mongoose from "mongoose";

export async function POST(req) {
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

    const { title, description, expiryDate, classId } = await req.json();

    if (!title || !description || !expiryDate || !classId) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return NextResponse.json(
        { message: "Invalid class ID" },
        { status: 400 }
      );
    }

    /* 🔎 Check faculty assigned to this class */
    const assignment = await ClassFaculty.findOne({
      class: classId,
      faculty: payload.id,
    });

    if (!assignment) {
      return NextResponse.json(
        { message: "You are not assigned to this class" },
        { status: 403 }
      );
    }

    const newNotice = await Notice.create({
      title,
      description,
      expiryDate,
      createdBy: payload.id,
      creatorRole: "faculty",
      class: classId,
    });

    return NextResponse.json({
      message: "Faculty notice created successfully",
      notice: newNotice,
    });

  } catch (error) {
    console.error("Faculty Notice Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}