import { connectDB } from "@/lib/db";
import ClassFaculty from "@/models/ClassFaculty";
import User from "@/models/User";
import Class from "@/models/Class";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectDB();

    const { classId, facultyId } = await req.json();

    if (!classId || !facultyId) {
      return Response.json(
        { message: "Class ID and Faculty ID required" },
        { status: 400 }
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(classId) ||
      !mongoose.Types.ObjectId.isValid(facultyId)
    ) {
      return Response.json(
        { message: "Invalid IDs" },
        { status: 400 }
      );
    }

    // Check faculty exists and approved
    const faculty = await User.findById(facultyId);

    if (!faculty || faculty.role !== "faculty") {
      return Response.json(
        { message: "Invalid faculty" },
        { status: 400 }
      );
    }

    if (faculty.status !== "approved") {
      return Response.json(
        { message: "Faculty not approved yet" },
        { status: 400 }
      );
    }

    // Check class exists
    const classData = await Class.findById(classId);
    if (!classData) {
      return Response.json(
        { message: "Class not found" },
        { status: 404 }
      );
    }

    // Create assignment
    await ClassFaculty.create({
      class: classId,
      faculty: facultyId,
    });

    return Response.json({
      message: "Faculty assigned to class successfully",
    });

  } catch (error) {
    console.error("Assign Faculty Error:", error);

    if (error.code === 11000) {
      return Response.json(
        { message: "Faculty already assigned to this class" },
        { status: 400 }
      );
    }

    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}