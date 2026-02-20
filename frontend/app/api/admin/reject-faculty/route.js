import { connectDB } from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose";

export async function PATCH(req) {
  try {
    await connectDB();

    const { userId } = await req.json();

    if (!userId) {
      return Response.json(
        { message: "User ID required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return Response.json(
        { message: "Invalid user ID" },
        { status: 400 }
      );
    }

    const faculty = await User.findById(userId);

    if (!faculty) {
      return Response.json(
        { message: "Faculty not found" },
        { status: 404 }
      );
    }

    if (faculty.role !== "faculty") {
      return Response.json(
        { message: "User is not faculty" },
        { status: 400 }
      );
    }

    faculty.status = "rejected";
    await faculty.save();

    return Response.json({
      message: "Faculty rejected successfully",
    });

  } catch (error) {
    console.error("Reject Faculty Error:", error);
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}