import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import Note from "@/models/Note";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(req) {
  try {
    await connectDB();

    /* 🔐 Get Faculty from JWT */
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
    const facultyId = payload.id;

    /* 📦 Get Form Data */
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

    /* ✅ Validation */
    if (!file || !title || !subject || !semester || !unit || !type || !classId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (type === "assignment" && !dueDate) {
      return NextResponse.json(
        { message: "Due date required for assignment" },
        { status: 400 }
      );
    }

    /* 🗂 Convert file to buffer */
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    /* ☁ Upload to Cloudinary */
    /* ☁ Upload to Cloudinary */
const uploadResponse = await new Promise((resolve, reject) => {
  cloudinary.uploader.upload_stream(
    {
      resource_type: "auto", // Keeps detection automatic
      folder: "lms_uploads",
      // Force "attachment" to false if you want it to open in browser
      flags: "attachment:false", 
      // This helps browser recognize the file extension in the URL
      use_filename: true,
      unique_filename: true,
    },
    (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }
  ).end(buffer);
});

    /* 💾 Save in DB */
    const newNote = await Note.create({
      title,
      description,
      subject,
      semester: Number(semester),
      unit: Number(unit),
      type,
      uploaderRole: "faculty",
      dueDate: type === "assignment" ? dueDate : null,
      fileUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      fileType: file.type, // Reliable MIME type
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