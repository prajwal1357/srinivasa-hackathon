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

    // ─── Core Counts ───
    const [
      totalStudents,
      totalFaculty,
      totalAdmins,
      pendingStudents,
      pendingFaculty,
      approvedStudents,
      approvedFaculty,
      rejectedStudents,
      rejectedFaculty,
      totalClasses,
      totalAssignments,
      adminNotices,
      facultyNotices,
      totalNotes,
      notesCount,
      assignmentsCount,
      pendingNotes,
      approvedNotes,
      rejectedNotes,
      totalEvents,
      totalRegistrations,
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "faculty" }),
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "student", status: "pending" }),
      User.countDocuments({ role: "faculty", status: "pending" }),
      User.countDocuments({ role: "student", status: "approved" }),
      User.countDocuments({ role: "faculty", status: "approved" }),
      User.countDocuments({ role: "student", status: "rejected" }),
      User.countDocuments({ role: "faculty", status: "rejected" }),
      Class.countDocuments(),
      ClassFaculty.countDocuments(),
      Notice.countDocuments({ creatorRole: "admin" }),
      Notice.countDocuments({ creatorRole: "faculty" }),
      Note.countDocuments(),
      Note.countDocuments({ type: "note" }),
      Note.countDocuments({ type: "assignment" }),
      Note.countDocuments({ approvalStatus: "pending" }),
      Note.countDocuments({ approvalStatus: "approved" }),
      Note.countDocuments({ approvalStatus: "rejected" }),
      Event.countDocuments(),
      EventRegistration.countDocuments(),
    ]);

    // ─── Per-Class Stats ───
    const classes = await Class.find().select("name");
    const classStats = await Promise.all(
      classes.map(async (cls) => {
        const students = await User.countDocuments({ role: "student", class: cls._id, status: "approved" });
        const notes = await Note.countDocuments({ class: cls._id });
        const notices = await Notice.countDocuments({ class: cls._id });
        const faculty = await ClassFaculty.countDocuments({ class: cls._id });
        return {
          name: cls.name,
          students,
          notes,
          notices,
          faculty,
        };
      })
    );

    // ─── Event Popularity ───
    const events = await Event.find()
      .select("title maxSeats registeredCount eventDate")
      .sort({ registeredCount: -1 })
      .limit(8);

    const eventStats = events.map((e) => ({
      name: e.title.length > 18 ? e.title.substring(0, 18) + "…" : e.title,
      registered: e.registeredCount,
      capacity: e.maxSeats,
      fill: e.registeredCount / e.maxSeats,
    }));

    // ─── Monthly Registration Trend (last 6 months) ───
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyUsers = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            role: "$role",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const trendMap = {};
    monthlyUsers.forEach((m) => {
      const key = `${monthNames[m._id.month - 1]} ${m._id.year}`;
      if (!trendMap[key]) trendMap[key] = { month: key, students: 0, faculty: 0 };
      if (m._id.role === "student") trendMap[key].students = m.count;
      if (m._id.role === "faculty") trendMap[key].faculty = m.count;
    });
    const registrationTrend = Object.values(trendMap);

    // ─── Note uploads per uploader role ───
    const notesByUploader = [
      { name: "Faculty Uploads", value: await Note.countDocuments({ uploaderRole: "faculty" }) },
      { name: "Student Uploads", value: await Note.countDocuments({ uploaderRole: "student" }) },
    ];

    return Response.json({
      overview: {
        totalStudents,
        totalFaculty,
        totalAdmins,
        totalClasses,
        totalAssignments,
        totalNotes,
        totalEvents,
        totalRegistrations,
      },
      userStatus: {
        students: { approved: approvedStudents, pending: pendingStudents, rejected: rejectedStudents },
        faculty: { approved: approvedFaculty, pending: pendingFaculty, rejected: rejectedFaculty },
      },
      roleDistribution: [
        { name: "Students", value: totalStudents },
        { name: "Faculty", value: totalFaculty },
        { name: "Admins", value: totalAdmins },
      ],
      noticesByRole: [
        { name: "Admin", value: adminNotices },
        { name: "Faculty", value: facultyNotices },
      ],
      noteStats: {
        byType: [
          { name: "Notes", value: notesCount },
          { name: "Assignments", value: assignmentsCount },
        ],
        byStatus: [
          { name: "Approved", value: approvedNotes },
          { name: "Pending", value: pendingNotes },
          { name: "Rejected", value: rejectedNotes },
        ],
      },
      classStats,
      eventStats,
      registrationTrend,
      notesByUploader,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
