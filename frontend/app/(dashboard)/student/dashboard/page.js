"use client";

import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Loader2,
  ArrowUpRight,
  Upload,
  BookOpen,
  Zap,
  AlertCircle,
  Bell,
  Clock,
  ChevronRight,
  Info,
  ShieldCheck,
 Users,
  FileText,
  Sparkles
} from "lucide-react";


export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Core logic preserved
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/student/notices");
        if (!res.ok) throw new Error("Fetch failed");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error:", err);
        // Fallback for visual preview only if API fails
        setData({
          adminNotices: [],
          facultyNotices: [],
          assignments: []
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={48} className="animate-spin text-[#F97316]" strokeWidth={2} />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">Synchronizing Dashboard</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mb-2">
          <AlertCircle size={40} strokeWidth={2} />
        </div>
        <p className="font-bold text-xl text-slate-900 uppercase tracking-tight">
          Failed to load dashboard
        </p>
        <p className="text-slate-400 text-sm">Please check your network connection.</p>
      </div>
    );
  }

  // Preserve quickLinks paths and structure
  const quickLinks = [
    { name: "View Notes", path: "/student/viewNotes", icon: BookOpen, color: "bg-cyan-50", text: "text-cyan-600" },
    { name: "Upload Note", path: "/student/uploadNotes", icon: Upload, color: "bg-emerald-50", text: "text-emerald-600" },
    { name: "Events", path: "/student/events", icon: CalendarDays, color: "bg-amber-50", text: "text-amber-600" },
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-10" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

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

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
      `}} />

      {/* ═══════════ HERO SECTION (Orange Accent) ═══════════ */}
      <div className="relative overflow-hidden rounded-[3rem] p-8 md:p-14 bg-orange-500 text-white shadow-xl shadow-slate-200">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/10">
            <Zap size={14} className="text-black fill-black" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">Student Portal</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Your <br /> <span className="text-black">Dashboard</span>
          </h1>

          <div className="flex flex-wrap gap-4 mt-8">
            <div className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <Bell size={14} className="text-black" />
              {data.adminNotices?.length || 0} Notices
            </div>
            <div className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <Clock size={14} className="text-black" />
              {data.assignments?.length || 0} Assignments Due
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ QUICK LINKS ═══════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.name} href={link.path}>
              <div className="group bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex justify-between items-start mb-10">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${link.color} ${link.text} shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon size={26} strokeWidth={2.5} />
                  </div>
                  <div className="text-slate-200 group-hover:text-slate-900 transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <p className="font-bold text-slate-900 tracking-tight text-lg group-hover:text-[#F97316] transition-colors">{link.name}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* ═══════════ NOTICES SECTION ═══════════ */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* ADMIN NOTICES */}
        <section className="bg-white border border-gray-100 rounded-[3rem] p-8 md:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Notices</h3>
            </div>
          </div>

          <div className="space-y-4 custom-scrollbar max-h-[400px] overflow-y-auto pr-2">
            {(!data.adminNotices || data.adminNotices.length === 0) ? (
              <div className="py-20 text-center flex flex-col items-center">
                 <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-4">
                    <Bell size={32} />
                 </div>
                 <p className="font-bold text-slate-400 text-sm uppercase tracking-widest">No active notices</p>
              </div>
            ) : (
              data.adminNotices.map((notice) => (
                <div key={notice._id} className="group p-6 bg-slate-50 hover:bg-white border border-transparent hover:border-amber-100 rounded-3xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-amber-600 transition-colors">{notice.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-slate-100">Official</span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">{notice.description}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><CalendarDays size={12} /> {new Date(notice.createdAt).toLocaleDateString()}</span>
                    <button className="flex items-center gap-1 text-amber-600 hover:text-amber-700 transition-colors">Details <ChevronRight size={12} /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* FACULTY NOTICES */}
        <section className="bg-white border border-gray-100 rounded-[3rem] p-8 md:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl">
                <Users size={22} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Faculty Updates</h3>
            </div>
          </div>

          <div className="space-y-4 custom-scrollbar max-h-[400px] overflow-y-auto pr-2">
            {(!data.facultyNotices || data.facultyNotices.length === 0) ? (
              <div className="py-20 text-center flex flex-col items-center">
                 <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-4">
                    <Info size={32} />
                 </div>
                 <p className="font-bold text-slate-400 text-sm uppercase tracking-widest">No faculty updates</p>
              </div>
            ) : (
              data.facultyNotices.map((notice) => (
                <div key={notice._id} className="group p-6 bg-slate-50 hover:bg-white border border-transparent hover:border-cyan-100 rounded-3xl transition-all duration-300">
                  <h4 className="font-bold text-slate-900 text-lg tracking-tight mb-2 group-hover:text-cyan-600 transition-colors">{notice.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{notice.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     <div className="w-5 h-5 bg-white border border-slate-100 rounded-full flex items-center justify-center text-cyan-500">FC</div>
                     <span>Verified Course Instructor</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* ═══════════ ASSIGNMENTS SECTION ═══════════ */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-indigo-500">
              <FileText size={22} />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Upcoming Assignments</h3>
          </div>
          <div className="bg-white px-4 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {data.assignments?.length || 0} Pending
          </div>
        </div>

        {(!data.assignments || data.assignments.length === 0) ? (
          <div className="bg-white border border-gray-100 rounded-[3rem] p-20 text-center shadow-sm">
             <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CheckSquare size={40} className="text-slate-200" />
             </div>
             <p className="text-xl font-bold text-slate-900 mb-2 tracking-tight uppercase">No Assignments Due</p>
             <p className="text-slate-400 font-medium text-sm">Your submission queue is completely clear. Excellent work!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.assignments.map((assignment) => (
              <div key={assignment._id} className="group bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-50 group-hover:bg-[#F97316] transition-colors" />
                
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm">
                    <BookOpen size={24} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center gap-1.5">
                    <Clock size={12} /> Deadline
                  </span>
                </div>

                <h4 className="font-extrabold text-xl text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors mb-3 leading-tight">
                  {assignment.title}
                </h4>
                
                <div className="flex items-center gap-2 mb-6">
                   <div className="px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {assignment.subject}
                   </div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Sem {assignment.semester}</span>
                </div>
                
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submit By</p>
                      <p className="text-sm font-bold text-slate-700">{new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                   </div>
                   <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                      <ArrowUpRight size={20} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <div className="flex items-center justify-center pt-14">
        <div className="bg-white px-6 py-2.5 rounded-full border border-gray-100 flex items-center gap-3 shadow-sm">
          <Sparkles size={16} className="text-amber-400" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            University Academic Node // Secured Connection Verified
          </p>
        </div>
      </div>
    </div>
  );
}

const CheckSquare = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <polyline points="9 11 12 14 22 4"/>
  </svg>
);