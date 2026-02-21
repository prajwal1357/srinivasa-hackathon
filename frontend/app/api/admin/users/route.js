import { connectDB } from "@/lib/db";
import User from "@/models/User";
import ClassFaculty from "@/models/ClassFaculty";
import { NextResponse } from "next/server";

// GET — List all users
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const filter = {};
    if (role && role !== "all") filter.role = role;
    if (status && status !== "all") filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { usn: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .select("-password")
      .populate("class", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("List users error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// PUT — Update user role or status
export async function PUT(req) {
  try {
    await connectDB();

    const { userId, role, status } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Don't allow changing admin role
    if (user.role === "admin") {
      return NextResponse.json({ message: "Cannot modify admin users" }, { status: 403 });
    }

    const updates = {};

    if (role && ["student", "faculty"].includes(role)) {
      const oldRole = user.role;
      updates.role = role;

      // If changing from faculty to student, remove ClassFaculty assignments
      if (oldRole === "faculty" && role === "student") {
        await ClassFaculty.deleteMany({ faculty: userId });
      }

      // If changing from student to faculty, clear student-specific fields
      if (oldRole === "student" && role === "faculty") {
        updates.usn = null;
        updates.class = null;
      }
    }

    if (status && ["pending", "approved", "rejected"].includes(status)) {
      updates.status = status;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true })
      .select("-password")
      .populate("class", "name");

    return NextResponse.json({
      message: `User updated successfully`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// DELETE — Remove user completely
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.role === "admin") {
      return NextResponse.json({ message: "Cannot delete admin users" }, { status: 403 });
    }

    // Clean up related data
    if (user.role === "faculty") {
      await ClassFaculty.deleteMany({ faculty: userId });
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      message: `${user.name} has been removed successfully`,
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
