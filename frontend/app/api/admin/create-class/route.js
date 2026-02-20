import { connectDB } from "@/lib/db";
import Class from "@/models/Class";

export async function POST(req) {
  try {
    await connectDB();

    const { name } = await req.json();

    // 🔹 Validation
    if (!name || !name.trim()) {
      return Response.json(
        { message: "Class name is required" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();

    // 🔹 Check duplicate
    const existingClass = await Class.findOne({ name: trimmedName });

    if (existingClass) {
      return Response.json(
        { message: "Class already exists" },
        { status: 400 }
      );
    }

    await Class.create({ name: trimmedName });

    return Response.json({
      message: "Class created successfully",
    });

  } catch (error) {
    console.error("Create Class Error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}