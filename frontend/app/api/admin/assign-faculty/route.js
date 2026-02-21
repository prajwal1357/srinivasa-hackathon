import { connectDB } from "@/lib/db";
import ClassFaculty from "@/models/ClassFaculty";
import User from "@/models/User";
import Class from "@/models/Class";

export async function POST(req) {
  try {
    await connectDB();

    const { facultyId, classId } = await req.json();

    if (!facultyId || !classId) {
      return Response.json(
        { message: "Faculty and Class are required" },
        { status: 400 }
      );
    }

    // Verify faculty exists and is approved
    const faculty = await User.findOne({
      _id: facultyId,
      role: "faculty",
      status: "approved",
    });

    if (!faculty) {
      return Response.json(
        { message: "Faculty not found or not approved" },
        { status: 404 }
      );
    }

    // Verify class exists
    const classDoc = await Class.findById(classId);
    if (!classDoc) {
      return Response.json(
        { message: "Class not found" },
        { status: 404 }
      );
    }

    // Check if assignment already exists
    const existingAssignment = await ClassFaculty.findOne({
      faculty: facultyId,
      class: classId,
    });

    if (existingAssignment) {
      return Response.json(
        { message: "This faculty is already assigned to this class" },
        { status: 409 }
      );
    }

    // Create the assignment
    await ClassFaculty.create({
      faculty: facultyId,
      class: classId,
    });

    return Response.json(
      { message: `${faculty.name} assigned to ${classDoc.name} successfully!` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Assign faculty error:", error);

    // Handle duplicate key error from unique index
    if (error.code === 11000) {
      return Response.json(
        { message: "This assignment already exists" },
        { status: 409 }
      );
    }

    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}