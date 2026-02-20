import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import EventRegistration from "@/models/EventRegistration";
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

    const studentId = payload.id;
    const now = new Date();

    const events = await Event.find({ isActive: true })
      .populate("studentCoordinator", "name")
      .sort({ eventDate: 1 });

    // Check if student already registered
    const registrations = await EventRegistration.find({
      student: studentId,
    });

    const registeredEventIds = registrations.map(r =>
      r.event.toString()
    );

    const formattedEvents = events.map(event => {
      const seatsLeft = event.maxSeats - event.registeredCount;

      let status = "Upcoming";
      if (event.eventDate < now) status = "Completed";

      return {
        ...event._doc,
        seatsLeft,
        status,
        isRegistered: registeredEventIds.includes(event._id.toString()),
        registrationClosed:
          event.registrationDeadline < now || seatsLeft <= 0,
      };
    });

    return NextResponse.json({ events: formattedEvents });

  } catch (error) {
    console.error("Fetch Events Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}