import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import Note from "@/models/Note";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(req) {
  try {
    await connectDB();

    /* 🔐 Get Student From JWT */
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "student") {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }

    const studentId = payload.id;

    /* 🔎 Get Student Record */
    const student = await User.findById(studentId);

    if (!student || !student.class) {
      return NextResponse.json(
        { message: "Student class not assigned" },
        { status: 400 }
      );
    }

    /* 📦 Get Form Data */
    const formData = await req.formData();

    const file = formData.get("file");
    const title = formData.get("title");
    const description = formData.get("description");
    const subject = formData.get("subject");
    const semester = formData.get("semester");
    const unit = formData.get("unit");

    /* ✅ Validation */
    if (!file || !title || !subject || !semester || !unit) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    /* 🗂 Convert file to base64 (Stable Method) */
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

    /* ☁ Upload to Cloudinary */
    const uploadResponse = await cloudinary.uploader.upload(base64File, {
      resource_type: "auto",
      folder: "student_uploads",
      use_filename: true,
      unique_filename: true,
      filename_override: file.name, // Ensure filename is passed
      flags: "attachment:false"
    });

    /* 💾 Save in DB */
    const newNote = await Note.create({
      title,
      description,
      subject,
      semester: Number(semester),
      unit: Number(unit),

      type: "note", // Students upload only notes

      fileUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      fileType: file.type,

      class: student.class,
      uploadedBy: studentId,
      uploaderRole: "student",

      approvalStatus: "pending",
    });

    return NextResponse.json({
      message: "Note uploaded and sent for approval",
      note: newNote,
    });

  } catch (error) {
    console.error("Student Upload Error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}