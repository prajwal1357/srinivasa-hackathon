import { connectDB } from "@/lib/db";
import EventRegistration from "@/models/EventRegistration";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json({ message: "Event ID required" }, { status: 400 });
    }

    // Populate 'student' to get name, email, and USN details
    const registrations = await EventRegistration.find({ event: eventId })
      .populate("student", "name email usn")
      .sort({ createdAt: -1 });

    return NextResponse.json({ registrations });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching registrations" }, { status: 500 });
  }
}