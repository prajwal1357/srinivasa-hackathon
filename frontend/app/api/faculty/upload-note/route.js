import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("file");
    const title = formData.get("title");
    const description = formData.get("description");
    const subject = formData.get("subject");
    const semester = formData.get("semester");
    const unit = formData.get("unit");
    const type = formData.get("type");
    const dueDate = formData.get("dueDate");
    const classId = formData.get("classId");
    const facultyId = formData.get("facultyId");

    if (!file || !title || !subject || !semester || !unit || !type || !classId || !facultyId) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    if (type === "assignment" && !dueDate) {
      return NextResponse.json(
        { message: "Due date required for assignment" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "lms_uploads",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const newNote = await Note.create({
      title,
      description,
      subject,
      semester,
      unit,
      type,
      dueDate: type === "assignment" ? dueDate : null,
      fileUrl: uploadResponse.secure_url,
      fileType: uploadResponse.format,
      class: classId,
      uploadedBy: facultyId,
    });

    return NextResponse.json({
      message: "Uploaded successfully",
      note: newNote,
    });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}