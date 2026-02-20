import { connectDB } from "@/lib/db";
import Class from "@/app/models/Class";

export async function GET() {
  try {
    await connectDB();

    const classes = await Class.find().select("_id name").sort({ name: 1 });

    return Response.json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
