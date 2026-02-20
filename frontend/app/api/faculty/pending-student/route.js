import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const students = await User.find({
      role: "student",
      status: "pending",
    }).select("-password");

    return Response.json({ students });

  } catch (error) {
    console.error("Pending Students Error:", error);

    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}