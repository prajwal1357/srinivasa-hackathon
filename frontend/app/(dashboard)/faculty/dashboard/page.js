"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  CalendarDays,
  Bell,
  Loader2,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function FacultyDashboard() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/faculty/my-classes");
        const data = await res.json();
        setClasses(data.classes || []);
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

  const quickActions = [
    { name: "Upload Notes", path: "/faculty/uploadNotes", icon: FileText, color: "bg-[#05FFA1]" },
    { name: "Send Notice", path: "/faculty/sendmsg", icon: Bell, color: "bg-[#01FFFF]" },
    { name: "Verify Students", path: "/faculty/verify", icon: Users, color: "bg-[#FF71CE]" },
    { name: "Create Event", path: "/faculty/createEvent", icon: CalendarDays, color: "bg-[#FFD600]" },
    { name: "Approve Notes", path: "/faculty/pending-notes", icon: BookOpen, color: "bg-[#CCFBF1]" },
    { name: "Notify Students", path: "/faculty/notifyStu", icon: Bell, color: "bg-[#FFEDD5]" },
  ];

  return (
    <div className="space-y-12 font-mono animate-in fade-in duration-500">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-black p-10 bg-[#01FFFF] text-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute top-6 right-10 w-32 h-10 bg-[#FF71CE] border-2 border-black rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-[10px] uppercase hidden md:flex">
          Faculty Mode
        </div>
        <div className="absolute -bottom-6 right-20 w-24 h-24 bg-[#FFD600] border-4 border-black rounded-full rotate-12 hidden md:block" />

        <div className="relative z-10">
          <div className="inline-block px-5 py-2 bg-[#1E293B] border-2 border-black rounded-lg text-[10px] text-white font-black uppercase tracking-[0.2em] mb-6">
            Faculty Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter">
            Welcome<br />Back
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs">
            <div className="px-4 py-2 bg-white border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {classes.length} Class{classes.length !== 1 ? "es" : ""} Assigned
            </div>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-3 h-3 bg-[#4ADE80] rounded-full animate-ping" />
              <span className="font-black uppercase tracking-widest text-[10px]">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
          <LayoutDashboard size={24} strokeWidth={3} />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.name} href={action.path}>
                <div className={`group ${action.color} border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer`}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <Icon size={24} strokeWidth={3} className="text-black" />
                    </div>
                    <div className="bg-white border-2 border-black p-1.5 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                      <ArrowUpRight size={16} strokeWidth={3} />
                    </div>
                  </div>
                  <p className="font-black text-sm uppercase tracking-tight">{action.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Assigned Classes */}
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
          <BookOpen size={24} strokeWidth={3} />
          My Assigned Classes
        </h2>

        {classes.length === 0 ? (
          <div className="bg-[#FEF9C3] border-4 border-black rounded-3xl p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <Clock size={48} strokeWidth={3} className="mx-auto mb-4 text-gray-400" />
            <p className="font-black text-lg uppercase text-gray-500">No classes assigned yet</p>
            <p className="font-bold text-xs text-gray-400 uppercase mt-2">Contact admin to get assigned to a class</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((c, i) => {
              const colors = ["bg-[#01FFFF]", "bg-[#FF71CE]", "bg-[#FFD600]", "bg-[#05FFA1]", "bg-[#CCFBF1]", "bg-[#DBEAFE]"];
              return (
                <div key={c._id}
                  className={`${colors[i % colors.length]} border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <BookOpen size={20} strokeWidth={3} />
                    </div>
                    <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-1 border border-black rounded-lg">
                      Active
                    </span>
                  </div>
                  <p className="font-black text-xl uppercase tracking-tight">{c.class?.name || "Unnamed"}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}