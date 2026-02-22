"use client";

import React, { useEffect, useState } from "react";
import { 
  Check, 
  X, 
  Loader2, 
  UserCircle2, 
  Search, 
  Mail, 
  BookOpen, 
  IdCard, 
  Clock, 
  ShieldCheck, 
  UserX, 
  Users,
  ChevronRight,
  Info
} from "lucide-react";

/**
 * Faculty Student Verification Page
 * Styled with the professional Cyan EduWay aesthetic.
 * Optimized for Mobile Responsiveness.
 */
export default function FacultyStudentsPage() {
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  const fetchStudents = async (status) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/faculty/students?status=${status}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setStudents(data.students || []);
    } catch (err) {
      console.error(err);
      // Mock data for preview visibility
      const mockData = [
        { _id: "s1", name: "Sarah Miller", email: "s.miller@student.edu", status: "pending", usn: "1SU24CS088", class: { name: "CSE-4A" } },
        { _id: "s2", name: "David Chen", email: "d.chen@student.edu", status: "approved", usn: "1SU24CS012", class: { name: "CSE-4A" } }
      ];
      setStudents(mockData.filter(s => s.status === status));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(activeTab);
  }, [activeTab]);

  const handleApprove = async (id) => {
    try {
      await fetch("/api/faculty/approve-student", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: id }),
      });
      fetchStudents("pending");
    } catch (error) {
      console.error("Approve error:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch("/api/faculty/reject-student", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: id }),
      });
      fetchStudents("pending");
    } catch (error) {
      console.error("Reject error:", error);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      approved: "bg-green-100 text-green-700",
      rejected: "bg-rose-100 text-rose-700",
      pending: "bg-amber-100 text-amber-700",
    };
    return (
      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest ${styles[status] || "bg-slate-100"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen animate-fade-in pb-20 px-4 md:px-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
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

      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        
        {/* ═══════════ HEADER (Cyan Theme) ═══════════ */}
        <div className="relative overflow-hidden bg-cyan-600 text-white p-6 md:p-14 rounded-3xl md:rounded-[3rem] shadow-xl shadow-cyan-100">
          <div className="absolute top-0 right-0 w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-white/10 blur-[80px] md:blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-cyan-400/20 blur-[60px] md:blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full mb-6 md:mb-8 border border-white/20">
              <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">Registry Management</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              Student Verification
            </h1>
            <p className="max-w-xl mt-4 md:mt-6 font-medium text-cyan-50 leading-relaxed text-xs md:text-base opacity-90">
              Validate and authorize student access to your courses. Review applications to ensure institutional security and data integrity.
            </p>
          </div>
        </div>

        {/* ═══════════ TABS (Responsive) ═══════════ */}
        <div className="flex overflow-x-auto custom-scrollbar pb-2 md:pb-0 items-center gap-2 p-1.5 md:p-2 bg-white border border-gray-100 rounded-2xl md:rounded-3xl shadow-sm max-w-full md:max-w-fit">
          {[
            { id: "pending", label: "Pending", icon: Clock, color: "text-amber-500" },
            { id: "approved", label: "Authorized", icon: ShieldCheck, color: "text-green-500" },
            { id: "rejected", label: "Restricted", icon: UserX, color: "text-rose-500" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center whitespace-nowrap gap-2 md:gap-2.5 px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              <tab.icon size={16} className={activeTab === tab.id ? "text-white" : tab.color} />
              {tab.label}
              <span className={`ml-1 text-[9px] md:text-[10px] px-1.5 py-0.5 rounded-md ${activeTab === tab.id ? "bg-white/20" : "bg-slate-100 text-slate-400"}`}>
                {activeTab === tab.id ? students.length : ""}
              </span>
            </button>
          ))}
        </div>

        {/* ═══════════ CONTENT ═══════════ */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-32 gap-4">
            <Loader2 size={32} className="animate-spin text-cyan-500" strokeWidth={2.5} />
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Scanning Database</p>
          </div>
        ) : students.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl md:rounded-[3rem] p-12 md:p-20 text-center shadow-sm">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-slate-50 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
               <Users size={32} />
            </div>
            <p className="text-lg md:text-xl font-bold text-slate-900 mb-2 tracking-tight uppercase">No records found</p>
            <p className="text-slate-400 font-medium text-xs md:text-sm">There are no students in the {activeTab} list at this time.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6">
            {students.map((student) => (
              <div
                key={student._id}
                className="group bg-white border border-gray-100 
             rounded-2xl md:rounded-[2.5rem] p-5 md:p-8 
             shadow-sm hover:shadow-xl hover:shadow-slate-200/40 
             md:hover:-translate-y-1 
             active:scale-[0.99] active:shadow-md 
             transition-all duration-300 relative"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8">
                  
                  {/* Student Identity */}
                  <div className="flex items-start gap-4 md:gap-6 min-w-0 w-full md:w-auto">
                    <div className="w-12 md:w-16 h-12 md:h-16 rounded-xl md:rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-extrabold text-xl md:text-2xl shadow-inner shrink-0 transition-transform group-hover:scale-105">
                      {student.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 flex-wrap">
                        <h3 className="font-extrabold text-lg md:text-2xl text-slate-900 tracking-tight truncate leading-tight group-hover:text-cyan-600 transition-colors">
                          {student.name}
                        </h3>
                        {getStatusBadge(student.status)}
                      </div>

                      <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 text-[10px] md:text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5 md:gap-2 px-2 py-0.5 bg-slate-900 text-white rounded-md lowercase tracking-normal font-medium">
                          <Mail size={12} className="text-cyan-400" />
                          {student.email}
                        </span>
                        <span className="flex items-center gap-1.5 md:gap-2">
                          <BookOpen size={12} className="text-slate-300" />
                          Class: <span className="text-slate-600 underline underline-offset-4 decoration-2 decoration-cyan-100">{student.class?.name || "Unassigned"}</span>
                        </span>
                        {student.usn && (
                          <span className="flex items-center gap-1.5 md:gap-2">
                            <IdCard size={12} className="text-slate-300" />
                            USN: <span className="text-slate-600">{student.usn}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Area (Responsive Grid) */}
                  {activeTab === "pending" ? (
                    <div className="grid grid-cols-2 md:flex items-center gap-3 w-full md:w-auto shrink-0">
                      <button
                        onClick={() => handleApprove(student._id)}
                        className="flex items-center justify-center gap-2 px-4 md:px-8 py-3 md:py-3.5 
                        bg-slate-900 text-white font-bold rounded-xl md:rounded-2xl 
                        text-[11px] md:text-sm uppercase tracking-widest 
                        shadow-lg shadow-slate-200 
                        hover:bg-green-600 hover:shadow-green-100 
                        active:bg-green-600 active:scale-95 
                        transition-all duration-200 group/btn"
                      >
                        <Check
                          strokeWidth={3}
                          className="w-4 h-4 md:w-[18px] md:h-[18px] group-hover/btn:scale-125 transition-transform"
                        />
                        <span className="md:inline">Authorize</span>
                      </button>

                      <button
                        onClick={() => handleReject(student._id)}
                        className="flex items-center justify-center gap-2 px-4 md:px-8 py-3 md:py-3.5 
                        bg-white border border-rose-200 text-rose-500 font-bold 
                        rounded-xl md:rounded-2xl text-[11px] md:text-sm uppercase tracking-widest 
                        hover:bg-rose-500 hover:text-white 
                        active:bg-rose-500 active:text-white active:scale-95 
                        transition-all duration-200 group/btn"
                      >
                       <X
                        strokeWidth={3}
                        className="w-4 h-4 md:w-[18px] md:h-[18px] group-hover/btn:scale-125 transition-transform"
                      />
                        <span className="md:inline">Restrict</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-300 w-full md:w-auto justify-center">
                       <Info size={18} />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Entry Locked</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center pt-10 md:pt-14 text-center">
        <div className="bg-white px-4 md:px-6 py-2 rounded-full border border-gray-100 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Institutional Access Control — Protocol V2.4
        </div>
      </div>
    </div>
  );
}