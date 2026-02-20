import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import EventRegistration from "@/models/EventRegistration";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(req) {
  try {
    await connectDB();

    // 1. Authenticate User
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const studentId = payload.id;

    // 2. Get Event ID from request
    const { eventId } = await req.json();

    if (!eventId) {
      return NextResponse.json({ message: "Event ID is required" }, { status: 400 });
    }

    // 3. Fetch Event and Validate
    const event = await Event.findById(eventId);

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    if (!event.isActive) {
      return NextResponse.json({ message: "This event is no longer active" }, { status: 400 });
    }

    // 4. Check Registration Deadline
    if (new Date() > new Date(event.registrationDeadline)) {
      return NextResponse.json({ message: "Registration deadline has passed" }, { status: 400 });
    }

    // 5. Check Seat Availability
    if (event.registeredCount >= event.maxSeats) {
      return NextResponse.json({ message: "Event is full" }, { status: 400 });
    }

    // 6. Check for existing registration
    const existingReg = await EventRegistration.findOne({
      event: eventId,
      student: studentId,
    });

    if (existingReg) {
      return NextResponse.json({ message: "You are already registered for this event" }, { status: 400 });
    }

    // 7. Atomic Update: Increment count and create registration
    // We update the event count only if it's still below maxSeats (Race condition protection)
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId, registeredCount: { $lt: event.maxSeats } },
      { $inc: { registeredCount: 1 } },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ message: "Event just became full" }, { status: 400 });
    }

    const registration = await EventRegistration.create({
      event: eventId,
      student: studentId,
    });

    return NextResponse.json({
      message: "Successfully registered for the event!",
      registration,
    }, { status: 201 });

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}