import { connectDB } from "@/lib/db";
import Class from "@/models/Class";

export async function GET() {
  try {
    await connectDB();

    const classes = await Class.find();

    return Response.json({ classes });

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}