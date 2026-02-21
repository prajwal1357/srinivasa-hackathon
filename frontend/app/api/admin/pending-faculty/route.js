import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const pendingFaculty = await User.find({
      role: "faculty",
      status: "pending",
      isActive: true,
    }).select("-password");

    return Response.json({
      faculty: pendingFaculty,
    });

  } catch (error) {
    console.error("Fetch Pending Faculty Error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}