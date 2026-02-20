"use client";

import {
  Users,
  UserCheck,
  BookOpen,
  Activity,
  Bell,
  CalendarDays,
} from "lucide-react";

export default function AdminDashboard() {
  // 🔹 Dummy Data (Later fetch from backend)
  const departmentName = "Computer Science & Engineering";

  const kpis = [
    {
      title: "Total Students",
      value: 1240,
      icon: Users,
    },
    {
      title: "Total Faculty",
      value: 58,
      icon: UserCheck,
    },
    {
      title: "Approved Resources",
      value: 312,
      icon: BookOpen,
    },
    {
      title: "Active Users (7 Days)",
      value: 876,
      icon: Activity,
    },
    {
      title: "Notices This Month",
      value: 14,
      icon: Bell,
    },
    {
      title: "Events Scheduled",
      value: 6,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="text-white space-y-8">

      {/* 🟦 1️⃣ Department Overview Panel */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
        <h1 className="text-3xl font-bold text-blue-500">
          {departmentName}
        </h1>
        <p className="text-gray-400 mt-2">
          Department Overview Snapshot
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 
                         rounded-2xl p-6 shadow-md 
                         hover:border-blue-500 
                         transition duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">
                    {item.title}
                  </p>
                  <h2 className="text-2xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div className="bg-blue-600/20 p-3 rounded-xl">
                  <Icon size={22} className="text-blue-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}