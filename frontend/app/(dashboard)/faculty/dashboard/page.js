"use client";

import React, { useEffect, useState } from "react";
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
  ChevronRight,
  Plus,
  Zap,
  Info
} from "lucide-react";



export default function FacultyDashboard() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Preserve existing data fetching logic with mock fallback
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/faculty/my-classes");
        if (!res.ok) throw new Error("API not reachable");
        const data = await res.json();
        setClasses(data.classes || []);
      } catch (err) {
        console.warn("API unavailable, using mock class data.");
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={48} className="animate-spin text-indigo-500" strokeWidth={2} />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">Synchronizing Portal</p>
      </div>
    );
  }

  // Preserve quickActions data structure
  const quickActions = [
    { name: "Upload Notes", path: "/faculty/uploadNotes", icon: FileText, color: "bg-emerald-50", text: "text-emerald-600" },
    { name: "Send Notice", path: "/faculty/sendmsg", icon: Bell, color: "bg-cyan-50", text: "text-cyan-600" },
    { name: "Verify Students", path: "/faculty/verify", icon: Users, color: "bg-rose-50", text: "text-rose-600" },
    { name: "Create Event", path: "/faculty/createEvent", icon: Zap, color: "bg-amber-50", text: "text-amber-600" },
    { name: "Approve Notes", path: "/faculty/pending-notes", icon: BookOpen, color: "bg-indigo-50", text: "text-indigo-600" },
    { name: "Notify Students", path: "/faculty/notifyStu", icon: Bell, color: "bg-orange-50", text: "text-orange-600" },
  ];

  return (
    <div className="space-y-12 animate-fade-in" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* ═══════════ CSS INJECTOR ═══════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* ═══════════ HERO BANNER ═══════════ */}
      <div className="relative overflow-hidden rounded-[3rem] p-10 md:p-14 bg-cyan-500 text-black shadow-xl shadow-slate-200">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-cyan-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/10">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Faculty Portal</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            Welcome <br /> Back
          </h1>
          
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest text-white">
              {classes.length} {classes.length === 1 ? "Class" : "Classes"} Assigned
            </div>
            <div className="flex items-center gap-3 bg-cyan-500/20 px-5 py-2.5 rounded-full border border-cyan-500/20">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              <span className="font-bold uppercase tracking-widest text-[10px] text-cyan-100">Live Session Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ QUICK ACTIONS ═══════════ */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-slate-900">
              <LayoutDashboard size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Quick Actions</h2>
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
            <Info size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <a key={action.name} href={action.path} className="block">
                <div className="group bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="flex justify-between items-start mb-10">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${action.color} ${action.text} shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon size={26} />
                    </div>
                    <div className="text-slate-200 group-hover:text-slate-900 transition-colors">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                  <p className="font-bold text-slate-900 tracking-tight text-lg group-hover:text-indigo-600 transition-colors">
                    {action.name}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ═══════════ ASSIGNED CLASSES ═══════════ */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-indigo-500">
              <BookOpen size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Assigned Roster</h2>
          </div>
          <div className="bg-white px-4 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {classes.length} Active Courses
          </div>
        </div>

        {classes.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-[3rem] p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
              <Clock size={40} />
            </div>
            <p className="text-xl font-bold text-slate-900 mb-2 tracking-tight uppercase">Roster Currently Empty</p>
            <p className="text-slate-400 font-medium text-sm">Please contact the administration to synchronize your class assignments.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((c, i) => {
              const colors = [
                { bg: "bg-indigo-50", text: "text-indigo-600", badge: "bg-indigo-100" },
                { bg: "bg-emerald-50", text: "text-emerald-600", badge: "bg-emerald-100" },
                { bg: "bg-amber-50", text: "text-amber-600", badge: "bg-amber-100" },
                { bg: "bg-rose-50", text: "text-rose-600", badge: "bg-rose-100" },
                { bg: "bg-cyan-50", text: "text-cyan-600", badge: "bg-cyan-100" },
                { bg: "bg-violet-50", text: "text-violet-600", badge: "bg-violet-100" }
              ];
              const theme = colors[i % colors.length];

              return (
                <div key={c._id}
                  className="group bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-slate-50 group-hover:bg-indigo-500 transition-colors" />
                  
                  <div className="flex justify-between items-start mb-10">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${theme.bg} ${theme.text} shadow-sm`}>
                      <BookOpen size={24} />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-xl ${theme.badge} ${theme.text}`}>
                      Verified
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic Group</p>
                    <h3 className="font-extrabold text-2xl text-slate-900 tracking-tight truncate leading-tight">
                      {c.class?.name || "Unnamed"}
                    </h3>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center gap-1.5">
                      View Students <ChevronRight size={14} />
                    </button>
                    <Plus size={18} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ═══════════ FOOTER INFO ═══════════ */}
      <div className="flex items-center justify-center py-10">
        <div className="bg-white px-6 py-2 rounded-full border border-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          University Academic Portal — Term 2025-26
        </div>
      </div>
    </div>
  );
}