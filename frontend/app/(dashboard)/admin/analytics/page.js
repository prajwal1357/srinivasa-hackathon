"use client";

import {
  Users,
  TrendingUp,
  UserCheck,
  BookOpen,
  Award,
  AlertTriangle,
} from "lucide-react";

export default function AnalyticsPanel() {
  // 🔹 Dummy Data (Replace with backend later)
  const analytics = {
    studentEngagement: {
      activePercent: 72,
      inactiveCount: 348,
      avgDownloads: 5.4,
    },
    facultyContribution: {
      avgResources: 18,
      avgNotices: 6,
      mostActiveFaculty: "Dr. Ramesh Kumar",
    },
    subjectEngagement: {
      mostAccessed: "Data Structures",
      leastAccessed: "Discrete Mathematics",
    },
  };

  return (
    <div className="text-white space-y-10 mt-10">

      {/* 🟦 Section Title */}
      <div>
        <h2 className="text-3xl font-bold text-blue-500">
          Engagement & Activity Analytics
        </h2>
        <p className="text-gray-400 mt-1">
          Academic intelligence layer for department performance monitoring
        </p>
      </div>

      {/* ================= STUDENT ENGAGEMENT ================= */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">
          Student Engagement
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Active % */}
          <Card
            icon={Users}
            title="Active Students (7 Days)"
            value={`${analytics.studentEngagement.activePercent}%`}
          />

          {/* Inactive Count */}
          <Card
            icon={AlertTriangle}
            title="Inactive Students"
            value={analytics.studentEngagement.inactiveCount}
          />

          {/* Avg Downloads */}
          <Card
            icon={TrendingUp}
            title="Avg Downloads / Student"
            value={analytics.studentEngagement.avgDownloads}
          />

        </div>
      </div>

      {/* ================= FACULTY CONTRIBUTION ================= */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">
          Faculty Contribution
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          <Card
            icon={BookOpen}
            title="Resources / Faculty"
            value={analytics.facultyContribution.avgResources}
          />

          <Card
            icon={UserCheck}
            title="Notices / Faculty"
            value={analytics.facultyContribution.avgNotices}
          />

          <Card
            icon={Award}
            title="Most Active Faculty"
            value={analytics.facultyContribution.mostActiveFaculty}
          />

        </div>
      </div>

      {/* ================= SUBJECT ENGAGEMENT ================= */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">
          Subject Engagement
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <Card
            icon={TrendingUp}
            title="Most Accessed Subject"
            value={analytics.subjectEngagement.mostAccessed}
          />

          <Card
            icon={AlertTriangle}
            title="Least Accessed Subject"
            value={analytics.subjectEngagement.leastAccessed}
          />

        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Card Component */
function Card({ icon: Icon, title, value }) {
  return (
    <div className="
        bg-black p-6 rounded-xl border border-gray-800
        hover:border-blue-500 transition duration-300
      ">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h4 className="text-2xl font-bold mt-2">{value}</h4>
        </div>

        <div className="bg-blue-600/20 p-3 rounded-lg">
          <Icon size={22} className="text-blue-500" />
        </div>
      </div>
    </div>
  );
}