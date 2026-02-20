import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import Faculty from "@/models/Faculty";
import ClassFaculty from "@/models/ClassFaculty";
import Notification from "@/models/Notification";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password, role, classId, usn } =
      await req.json();

    if (!name || !email || !password || !role) {
      return Response.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "student") {
      if (!classId || !usn) {
        return Response.json(
          { message: "Class and USN required for students" },
          { status: 400 }
        );
      }

      // Check duplicate email
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return Response.json(
          { message: "Email already exists" },
          { status: 400 }
        );
      }

      const student = await Student.create({
        name,
        email,
        password: hashedPassword,
        class: classId,
        usn,
        status: "pending",
      });

      const facultyList = await ClassFaculty.find({ class: classId });

      for (let faculty of facultyList) {
        await Notification.create({
          recipient: faculty.faculty,
          recipientModel: "Faculty",
          type: "student_approval",
          message: `New student ${student.name} waiting for approval`,
          relatedUser: student._id,
        });
      }

      return Response.json({
        message: "Student registered. Waiting for approval.",
      });
    }

    if (role === "faculty") {
      const existingFaculty = await Faculty.findOne({ email });

      if (existingFaculty) {
        return Response.json(
          { message: "Email already exists" },
          { status: 400 }
        );
      }

      const faculty = await Faculty.create({
        name,
        email,
        password: hashedPassword,
        status: "pending",
      });

      const admins = await Faculty.find({ role: "admin" });

      for (let admin of admins) {
        await Notification.create({
          recipient: admin._id,
          recipientModel: "Faculty",
          type: "faculty_approval",
          message: `New faculty ${faculty.name} waiting for approval`,
          relatedUser: faculty._id,
        });
      }

      return Response.json({
        message: "Faculty registered. Waiting for admin approval.",
      });
    }

    return Response.json({ message: "Invalid role" }, { status: 400 });

  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}