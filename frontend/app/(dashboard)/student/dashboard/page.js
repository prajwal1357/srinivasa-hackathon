"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Megaphone,
  FileText,
  CalendarDays,
  Loader2,
  Clock,
  ArrowUpRight,
  Upload,
  BookOpen,
  Zap,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/student/notices");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={48} className="animate-spin text-black" strokeWidth={3} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle size={48} strokeWidth={3} className="text-gray-400" />
        <p className="font-black text-lg uppercase text-gray-500">Failed to load dashboard</p>
      </div>
    );
  }

  const quickLinks = [
    { name: "View Notes", path: "/student/viewNotes", icon: BookOpen, color: "bg-[#01FFFF]" },
    { name: "Upload Note", path: "/student/uploadNotes", icon: Upload, color: "bg-[#05FFA1]" },
    { name: "Events", path: "/student/events", icon: CalendarDays, color: "bg-[#FFD600]" },
  ];

  return (
    <div className="space-y-12 font-mono animate-in fade-in duration-500">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-black p-8 md:p-10 bg-[#FB923C] text-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute top-5 right-8 w-28 h-8 bg-[#01FFFF] border-2 border-black rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-[10px] uppercase hidden md:flex">
          Student
        </div>
        <div className="absolute -bottom-6 right-16 w-20 h-20 bg-[#FF71CE] border-4 border-black rounded-full hidden md:block" />

        <div className="relative z-10">
          <div className="inline-block px-5 py-2 bg-[#1E293B] border-2 border-black rounded-lg text-[10px] text-white font-black uppercase tracking-[0.2em] mb-6">
            <Zap size={12} className="inline mr-1" />
            Student Portal
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter">
            Your<br />Dashboard
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
            <div className="px-4 py-2 bg-white border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {data.adminNotices?.length || 0} Notices
            </div>
            <div className="px-4 py-2 bg-white border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {data.assignments?.length || 0} Assignments Due
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.name} href={link.path}>
              <div className={`group ${link.color} border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer`}>
                <div className="flex justify-between items-start mb-5">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <Icon size={24} strokeWidth={3} />
                  </div>
                  <div className="bg-white border-2 border-black p-1.5 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                    <ArrowUpRight size={16} strokeWidth={3} />
                  </div>
                </div>
                <p className="font-black text-sm uppercase tracking-tight">{link.name}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ═══════════ TWO NOTICE BOARDS ═══════════ */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* ──── ADMIN NOTICE BOARD ──── */}
        <div className="bg-[#FFD600] border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b-4 border-black flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Megaphone size={22} strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">Admin Notices</h3>
              <p className="text-[10px] font-bold uppercase text-black/60">Department-wide announcements</p>
            </div>
          </div>

          {/* Notice List */}
          <div className="p-5 space-y-3 max-h-[400px] overflow-y-auto">
            {(!data.adminNotices || data.adminNotices.length === 0) ? (
              <div className="bg-white border-3 border-black rounded-xl p-6 text-center">
                <Bell size={32} strokeWidth={3} className="mx-auto mb-3 text-gray-300" />
                <p className="font-black text-sm text-gray-400 uppercase">No admin notices</p>
              </div>
            ) : (
              data.adminNotices.map((notice) => (
                <div key={notice._id} className="bg-white border-3 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-black text-sm uppercase leading-tight">{notice.title}</h4>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed line-clamp-2">{notice.description}</p>
                    </div>
                    <span className="shrink-0 text-[9px] font-black uppercase bg-[#FFD600] border-2 border-black px-2 py-1 rounded-lg">
                      Admin
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-gray-400 uppercase">
                    <Clock size={12} />
                    {new Date(notice.createdAt).toLocaleDateString()}
                    {notice.expiryDate && (
                      <span className="ml-auto text-red-500">
                        Expires: {new Date(notice.expiryDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ──── FACULTY NOTICE BOARD ──── */}
        <div className="bg-[#01FFFF] border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b-4 border-black flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Bell size={22} strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">Faculty Notices</h3>
              <p className="text-[10px] font-bold uppercase text-black/60">Class notices & assignments</p>
            </div>
          </div>

          {/* Faculty Notice List */}
          <div className="p-5 space-y-3 max-h-[400px] overflow-y-auto">
            {(!data.facultyNotices || data.facultyNotices.length === 0) ? (
              <div className="bg-white border-3 border-black rounded-xl p-6 text-center">
                <Bell size={32} strokeWidth={3} className="mx-auto mb-3 text-gray-300" />
                <p className="font-black text-sm text-gray-400 uppercase">No faculty notices</p>
              </div>
            ) : (
              data.facultyNotices.map((notice) => (
                <div key={notice._id} className="bg-white border-3 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-black text-sm uppercase leading-tight">{notice.title}</h4>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed line-clamp-2">{notice.description}</p>
                    </div>
                    <span className="shrink-0 text-[9px] font-black uppercase bg-[#01FFFF] border-2 border-black px-2 py-1 rounded-lg">
                      Faculty
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-gray-400 uppercase">
                    <Clock size={12} />
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ──── ASSIGNMENT DUE SECTION ──── */}
      <div>
        <div className="inline-block bg-[#1E293B] text-white px-6 py-2 border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(251,146,60,1)] mb-6">
          <h3 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-3">
            <FileText size={22} strokeWidth={3} />
            Upcoming Assignments
          </h3>
        </div>

        {(!data.assignments || data.assignments.length === 0) ? (
          <div className="bg-white border-4 border-black rounded-3xl p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <CalendarDays size={48} strokeWidth={3} className="mx-auto mb-4 text-gray-300" />
            <p className="font-black text-lg uppercase text-gray-400">No upcoming assignments</p>
            <p className="font-bold text-xs text-gray-300 uppercase mt-2">You&apos;re all caught up!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.assignments.map((assignment) => {
              const dueDate = new Date(assignment.dueDate);
              const now = new Date();
              const daysLeft = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
              const isUrgent = daysLeft <= 2;

              return (
                <div key={assignment._id}
                  className={`${isUrgent ? "bg-[#FDA4AF]" : "bg-white"} border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isUrgent ? "bg-red-200" : "bg-[#FEF9C3]"}`}>
                      <FileText size={20} strokeWidth={3} />
                    </div>
                    {isUrgent && (
                      <span className="text-[9px] font-black uppercase bg-red-300 border-2 border-black px-2 py-1 rounded-lg animate-pulse">
                        Urgent
                      </span>
                    )}
                  </div>

                  <h4 className="font-black text-sm uppercase mb-2">{assignment.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{assignment.subject} • Sem {assignment.semester}</p>

                  <div className="border-t-3 border-black pt-3 flex justify-between items-center">
                    <div className="text-[10px] font-black uppercase text-gray-500">
                      <CalendarDays size={12} className="inline mr-1" />
                      Due: {dueDate.toLocaleDateString()}
                    </div>
                    <div className={`text-[10px] font-black uppercase ${isUrgent ? "text-red-700" : "text-gray-500"}`}>
                      {daysLeft > 0 ? `${daysLeft}d left` : "Overdue"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}