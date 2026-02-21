import { connectDB } from "@/lib/db";
import ClassFaculty from "@/models/ClassFaculty";

export async function GET() {
  try {
    await connectDB();

    const assignments = await ClassFaculty.find()
      .populate("faculty", "name email")
      .populate("class", "name");

    return Response.json({ assignments });

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}