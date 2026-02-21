import { connectDB } from "@/lib/db";
import User from "@/models/User";
import ClassFaculty from "@/models/ClassFaculty";
import { sendBulkEmail, notificationEmailTemplate } from "@/lib/email";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(req) {
  try {
    await connectDB();

    // Verify faculty
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "faculty") {
      return Response.json({ message: "Faculty access required" }, { status: 403 });
    }

    const { title, body, recipientType, recipientIds } = await req.json();

    if (!title || !body) {
      return Response.json({ message: "Title and body are required" }, { status: 400 });
    }

    // Get faculty's assigned classes
    const assignments = await ClassFaculty.find({ faculty: payload.id }).select("class");
    const classIds = assignments.map((a) => a.class);

    let recipients = [];

    if (recipientType === "my_students") {
      // All students in faculty's assigned classes
      const students = await User.find({
        role: "student",
        status: "approved",
        class: { $in: classIds },
      }).select("email");
      recipients = students.map((s) => s.email);
    } else if (recipientType === "selected" && recipientIds?.length > 0) {
      const users = await User.find({ _id: { $in: recipientIds } }).select("email");
      recipients = users.map((u) => u.email);
    } else {
      return Response.json({ message: "No recipients selected" }, { status: 400 });
    }

    if (recipients.length === 0) {
      return Response.json({ message: "No recipients found" }, { status: 400 });
    }

    const { html, text } = notificationEmailTemplate(title, body, "faculty");

    const results = await sendBulkEmail({
      recipients,
      subject: title,
      html,
      text,
    });

    const sent = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return Response.json({
      message: `Email sent to ${sent} recipient${sent !== 1 ? "s" : ""}${failed > 0 ? ` (${failed} failed)` : ""}`,
      sent,
      failed,
      total: recipients.length,
    });
  } catch (error) {
    console.error("Faculty send email error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
