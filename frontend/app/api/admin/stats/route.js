import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Class from "@/models/Class";
import ClassFaculty from "@/models/ClassFaculty";
import Notice from "@/models/Notice";
import Note from "@/models/Note";
import Event from "@/models/Event";
import EventRegistration from "@/models/EventRegistration";

export async function GET() {
  try {
    await connectDB();

    // Counts
    const [
      totalStudents,
      totalFaculty,
      pendingStudents,
      pendingFaculty,
      approvedStudents,
      approvedFaculty,
      totalClasses,
      totalNotices,
      totalNotes,
      pendingNotes,
      approvedNotes,
      totalEvents,
      totalRegistrations,
      totalAssignments,
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "faculty" }),
      User.countDocuments({ role: "student", status: "pending" }),
      User.countDocuments({ role: "faculty", status: "pending" }),
      User.countDocuments({ role: "student", status: "approved" }),
      User.countDocuments({ role: "faculty", status: "approved" }),
      Class.countDocuments(),
      Notice.countDocuments(),
      Note.countDocuments(),
      Note.countDocuments({ approvalStatus: "pending" }),
      Note.countDocuments({ approvalStatus: "approved" }),
      Event.countDocuments(),
      EventRegistration.countDocuments(),
      ClassFaculty.countDocuments(),
    ]);

    // Role distribution for chart
    const roleDistribution = [
      { label: "Students", count: totalStudents },
      { label: "Faculty", count: totalFaculty },
      { label: "Admin", count: await User.countDocuments({ role: "admin" }) },
    ];

    // Status distribution for chart
    const statusDistribution = [
      { label: "Approved", students: approvedStudents, faculty: approvedFaculty },
      { label: "Pending", students: pendingStudents, faculty: pendingFaculty },
      {
        label: "Rejected",
        students: await User.countDocuments({ role: "student", status: "rejected" }),
        faculty: await User.countDocuments({ role: "faculty", status: "rejected" }),
      },
    ];

    // Note stats by type
    const notesByType = [
      { label: "Notes", count: await Note.countDocuments({ type: "note" }) },
      { label: "Assignments", count: await Note.countDocuments({ type: "assignment" }) },
    ];

    // Recent notices (last 5)
    const recentNotices = await Notice.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy", "name")
      .select("title creatorRole createdAt");

    // Recent events (last 5)
    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title maxSeats registeredCount eventDate");

    return Response.json({
      counts: {
        totalStudents,
        totalFaculty,
        pendingStudents,
        pendingFaculty,
        approvedStudents,
        approvedFaculty,
        totalClasses,
        totalNotices,
        totalNotes,
        pendingNotes,
        approvedNotes,
        totalEvents,
        totalRegistrations,
        totalAssignments,
      },
      roleDistribution,
      statusDistribution,
      notesByType,
      recentNotices,
      recentEvents,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
