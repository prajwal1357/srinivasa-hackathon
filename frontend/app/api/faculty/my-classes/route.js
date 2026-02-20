import { connectDB } from "@/lib/db";
import ClassFaculty from "@/models/ClassFaculty";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectDB();

    // 1️⃣ Get token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "faculty") {
      return Response.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }

    // 3️⃣ Get assigned classes
    const classes = await ClassFaculty.find({
      faculty: decoded.id,
    }).populate("class", "name");

    return Response.json({ classes });

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}