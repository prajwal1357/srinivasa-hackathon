import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Class from "@/models/Class";
import ClassFaculty from "@/models/ClassFaculty";

export async function POST(req) {
  try {
    await connectDB();

    const { classId, facultyId } = await req.json();

    // 🔹 Basic validation
    if (!classId || !facultyId) {
      return Response.json(
        { message: "Class ID and Faculty ID are required" },
        { status: 400 }
      );
    }

    // 🔹 Check class exists
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return Response.json(
        { message: "Class not found" },
        { status: 404 }
      );
    }

    // 🔹 Check faculty exists
    const faculty = await User.findById(facultyId);
    if (!faculty) {
      return Response.json(
        { message: "Faculty not found" },
        { status: 404 }
      );
    }

    if (faculty.role !== "faculty") {
      return Response.json(
        { message: "User is not a faculty" },
        { status: 400 }
      );
    }

    if (faculty.status !== "approved") {
      return Response.json(
        { message: "Faculty must be approved before assignment" },
        { status: 400 }
      );
    }

    // 🔹 Prevent duplicate assignment
    const existingAssignment = await ClassFaculty.findOne({
      class: classId,
      faculty: facultyId,
    });

    if (existingAssignment) {
      return Response.json(
        { message: "Faculty already assigned to this class" },
        { status: 400 }
      );
    }

    // 🔹 Create assignment
    await ClassFaculty.create({
      class: classId,
      faculty: facultyId,
    });

    return Response.json({
      message: "Faculty assigned successfully",
    });

  } catch (error) {
    console.error("Assign Faculty Error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}