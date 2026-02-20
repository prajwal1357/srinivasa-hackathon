import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function PATCH(req) {
  try {
    await connectDB();

    const { userId } = await req.json();

    if (!userId) {
      return Response.json(
        { message: "User ID required" },
        { status: 400 }
      );
    }

    const faculty = await User.findOne({
      _id: userId,
      role: "faculty",
      status: "pending",
    });

    if (!faculty) {
      return Response.json(
        { message: "Pending faculty not found" },
        { status: 404 }
      );
    }

    faculty.status = "approved";
    await faculty.save();

    return Response.json({
      message: "Faculty approved successfully",
    });

  } catch (error) {
    console.error("Approve Faculty Error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}