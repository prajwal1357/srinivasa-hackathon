import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Class from "@/models/Class";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const filter = { role: "student" };

    if (status) {
      filter.status = status;
    }

    const students = await User.find(filter)
      .populate("class", "name") // 🔥 populate class name
      .select("-password");

    return Response.json({ students });

  } catch (error) {
    console.error("Fetch Students Error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}