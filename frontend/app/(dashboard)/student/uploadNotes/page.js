"use client";

import React, { useEffect, useState } from "react";
import { 
  UserCheck, 
  UserX, 
  Clock, 
  Mail, 
  ShieldCheck, 
  Info, 
  Loader2, 
  ChevronRight, 
  Check, 
  X,
  Search,
  Users,
  Sparkles
} from "lucide-react";

/**
 * Faculty Management Page
 * Logic preserved exactly as provided.
 * UI updated to professional EduWay Slate/Indigo theme.
 * Removed all mock data fallbacks.
 */
export default function FacultyManagementPage() {
  const [facultyList, setFacultyList] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  // Original fetch logic preserved (Mock data removed)
  const fetchFaculty = async (status) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/faculty?status=${status}`);
      const data = await res.json();
      setFacultyList(data.faculty || []);
    } catch (err) {
      console.error(err);
      setFacultyList([]); // Ensure list is empty on error instead of using mock data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty(activeTab);
  }, [activeTab]);

  const handleAction = async (id, action) => {
    const route =
      action === "approve"
        ? "/api/admin/approve-faculty"
        : "/api/admin/reject-faculty";

    await fetch(route, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id }),
    });

    fetchFaculty("pending");
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
          animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ═══════════ HERO HEADER ═══════════ */}
        <div className="relative overflow-hidden bg-orange-500/90 text-white p-10 md:p-14 rounded-3xl md:rounded-[3rem] shadow-xl shadow-slate-200">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-indigo-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/10">
              <Sparkles size={14} className="text-black" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/70">Registry Oversight</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Faculty Management
            </h1>
            <p className="max-w-xl mt-6 font-medium text-slate-900 leading-relaxed text-sm md:text-base opacity-90">
              Review institutional applications, grant verified access levels, or manage existing faculty records with real-time synchronization.
            </p>
          </div>
        </div>

        {/* ═══════════ TABS (Refined Pilled) ═══════════ */}
        <div className="flex flex-wrap items-center gap-2 p-2 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm max-w-fit">
          {[
            { id: "pending", label: "Pending", icon: Clock, color: "text-amber-500" },
            { id: "approved", label: "Verified", icon: ShieldCheck, color: "text-green-500" },
            { id: "rejected", label: "Restricted", icon: UserX, color: "text-rose-500" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? "text-white" : tab.color} />
              {tab.label}
              <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-md ${activeTab === tab.id ? "bg-white/20" : "bg-slate-100 text-slate-400"}`}>
                {activeTab === tab.id ? facultyList.length : ""}
              </span>
            </button>
          ))}
        </div>

        {/* ═══════════ CONTENT ═══════════ */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 size={40} className="animate-spin text-indigo-500" strokeWidth={2.5} />
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Syncing Personnel Data</p>
          </div>
        ) : facultyList.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
               <Users size={40} />
            </div>
            <p className="text-xl font-bold text-slate-900 mb-2 tracking-tight uppercase">No {activeTab} records</p>
            <p className="text-slate-400 font-medium text-sm">There are currently no instructors in the {activeTab} state.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyList.map((faculty) => (
              <div
                key={faculty._id}
                className="group bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all hover:-translate-y-1 flex flex-col"
              >
                {/* Avatar & Header */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold text-2xl shadow-inner group-hover:scale-105 transition-transform">
                    {faculty.name?.charAt(0) || "F"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xl font-extrabold text-slate-900 tracking-tight truncate leading-tight">
                      {faculty.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 px-2 py-0.5 bg-slate-50 rounded-lg w-fit">
                       <Mail size={12} className="text-slate-400" />
                       <p className="text-[11px] font-bold text-slate-400 truncate">
                         {faculty.email}
                       </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto space-y-6">
                  {/* Status Indicator Bar */}
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span>Account Security</span>
                    <span className={`px-2 py-0.5 rounded-md ${
                      activeTab === 'pending' ? 'bg-amber-50 text-amber-600' : 
                      activeTab === 'approved' ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {activeTab}
                    </span>
                  </div>

                  {/* Action Buttons only in Pending */}
                  {activeTab === "pending" ? (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handleAction(faculty._id, "approve")}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl text-[11px] uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-100 transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        <Check size={16} strokeWidth={3} className="group-hover/btn:scale-125 transition-transform" />
                        Grant Access
                      </button>
                      <button
                        onClick={() => handleAction(faculty._id, "reject")}
                        className="w-full py-4 bg-white border border-rose-100 text-rose-500 font-bold rounded-2xl text-[11px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        <X size={16} strokeWidth={3} className="group-hover/btn:scale-125 transition-transform" />
                        Decline Application
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-4 bg-slate-50 rounded-2xl text-slate-300">
                       <Info size={24} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center pt-14">
        <div className="bg-white px-6 py-2.5 rounded-full border border-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Institutional Personnel Access Protocol — Level 3 Verified
        </div>
      </div>
    </div>
  );
}