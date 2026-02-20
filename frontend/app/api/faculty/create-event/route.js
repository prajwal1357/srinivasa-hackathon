import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import Event from "@/models/Event";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

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

    /* 📦 Get Form Data */
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const isPaid = formData.get("isPaid") === "true";
    const maxSeats = formData.get("maxSeats");
    const registrationDeadline = formData.get("registrationDeadline");
    const eventDate = formData.get("eventDate");
    const coordinatorId = formData.get("studentCoordinator");
    const image = formData.get("image");

    if (
      !title ||
      !description ||
      !maxSeats ||
      !registrationDeadline ||
      !eventDate ||
      !coordinatorId ||
      !image
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    /* 🔍 Check coordinator exists */
    const coordinator = await User.findById(coordinatorId);
    if (!coordinator || coordinator.role !== "student") {
      return NextResponse.json(
        { message: "Invalid student coordinator" },
        { status: 400 }
      );
    }

    /* ☁ Upload image to Cloudinary */
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "event_images",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    /* 💾 Save Event */
    const newEvent = await Event.create({
      title,
      description,
      imageUrl: uploadResponse.secure_url,
      createdBy: payload.id,
      studentCoordinator: coordinatorId,
      isPaid,
      maxSeats: Number(maxSeats),
      registrationDeadline,
      eventDate,
    });

    return NextResponse.json({
      message: "Event created successfully",
      event: newEvent,
    });

  } catch (error) {
    console.error("Create Event Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}