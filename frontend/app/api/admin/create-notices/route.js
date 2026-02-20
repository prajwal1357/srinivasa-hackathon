import { connectDB } from "@/lib/db";
import Notice from "@/models/Notice";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(req) {
  try {
    await connectDB();

    /* 🔐 Verify Admin */
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

    if (payload.role !== "admin") {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }
    console.log("Token:", token);
console.log("Payload:", payload);

    const { title, description, expiryDate } = await req.json();

    if (!title || !description || !expiryDate) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const newNotice = await Notice.create({
      title,
      description,
      expiryDate,
      createdBy: payload.id,
      creatorRole: "admin",
      class: null, // Admin notice visible to all
    });

    return NextResponse.json({
      message: "Notice created successfully",
      notice: newNotice,
    });

  } catch (error) {
    console.error("Create Notice Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}