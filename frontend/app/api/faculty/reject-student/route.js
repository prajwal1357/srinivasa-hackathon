import { connectDB } from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose";

export async function PATCH(req) {
  try {
    await connectDB();

    const { studentId } = await req.json();

    if (!studentId) {
      return Response.json(
        { message: "Student ID required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return Response.json(
        { message: "Invalid student ID" },
        { status: 400 }
      );
    }

    const student = await User.findOne({
      _id: studentId,
      role: "student",
      status: "pending",
    });

    if (!student) {
      return Response.json(
        { message: "Pending student not found" },
        { status: 404 }
      );
    }

    student.status = "rejected";
    await student.save();

    return Response.json({
      message: "Student rejected successfully",
    });

  } catch (error) {
    console.error("Reject Student Error:", error);

    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}