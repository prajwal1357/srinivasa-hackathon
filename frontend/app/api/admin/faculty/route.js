import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const filter = { role: "faculty" };

    if (status) {
      filter.status = status;
    }

    const faculty = await User.find(filter).select("-password");

    return Response.json({ faculty });

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}