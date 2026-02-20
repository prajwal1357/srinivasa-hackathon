import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Fetch events created by this specific faculty member
    const events = await Event.find({ createdBy: payload.id })
      .sort({ createdAt: -1 }); // Newest first

    return NextResponse.json({ events });

  } catch (error) {
    console.error("Fetch Events Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}