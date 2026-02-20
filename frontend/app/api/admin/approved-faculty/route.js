import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const faculty = await User.find({
      role: "faculty",
      status: "approved",
      isActive: true,
    }).select("-password");

    return Response.json({ faculty });

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}