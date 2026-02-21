import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { sendBulkEmail, notificationEmailTemplate } from "@/lib/email";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(req) {
  try {
    await connectDB();

    // Verify admin
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "admin") {
      return Response.json({ message: "Admin access required" }, { status: 403 });
    }

    const { title, body, recipientType, recipientIds } = await req.json();

    if (!title || !body) {
      return Response.json({ message: "Title and body are required" }, { status: 400 });
    }

    // Determine recipients
    let recipients = [];

    if (recipientType === "all_students") {
      const students = await User.find({ role: "student", status: "approved" }).select("email");
      recipients = students.map((s) => s.email);
    } else if (recipientType === "all_faculty") {
      const faculty = await User.find({ role: "faculty", status: "approved" }).select("email");
      recipients = faculty.map((f) => f.email);
    } else if (recipientType === "all") {
      const users = await User.find({ status: "approved" }).select("email");
      recipients = users.map((u) => u.email);
    } else if (recipientType === "selected" && recipientIds?.length > 0) {
      const users = await User.find({ _id: { $in: recipientIds } }).select("email");
      recipients = users.map((u) => u.email);
    } else {
      return Response.json({ message: "No recipients selected" }, { status: 400 });
    }

    if (recipients.length === 0) {
      return Response.json({ message: "No recipients found" }, { status: 400 });
    }

    // Generate email content
    const { html, text } = notificationEmailTemplate(title, body, "admin");

    // Send emails
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
    console.error("Send email error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
