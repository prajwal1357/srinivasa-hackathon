"use client";

import { useEffect, useState } from "react";
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
  Users
} from "lucide-react";

export default function FacultyManagementPage() {
  const [facultyList, setFacultyList] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  const fetchFaculty = async (status) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/faculty?status=${status}`);
      const data = await res.json();
      setFacultyList(data.faculty || []);
    } catch (err) {
      console.error(err);
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
    <div className="min-h-screen animate-fade-in pb-20" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
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

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ═══════════ HEADER ═══════════ */}
        <div className="relative overflow-hidden bg-slate-900 text-white p-10 md:p-14 rounded-[3rem] shadow-xl shadow-slate-200">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/10">
              <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Personnel Verification</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Faculty Management
            </h1>
            <p className="max-w-xl mt-6 font-medium text-slate-400 leading-relaxed text-sm md:text-base">
              Review and manage faculty applications. Verify credentials to grant academic access or manage existing verified members.
            </p>
          </div>
        </div>

        {/* ═══════════ TABS ═══════════ */}
        <div className="flex flex-wrap items-center gap-2 p-2 bg-white border border-gray-100 rounded-[3xl shadow-sm max-w-fit">
          {[
            { id: "pending", label: "Pending", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
            { id: "approved", label: "Approved", icon: ShieldCheck, color: "text-green-500", bg: "bg-green-50" },
            { id: "rejected", label: "Rejected", icon: UserX, color: "text-rose-500", bg: "bg-rose-50" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? "text-white" : tab.color} />
              {tab.label}
              <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-md ${activeTab === tab.id ? "bg-white/20" : "bg-slate-100 text-slate-400"}`}>
                {tab.id === activeTab ? facultyList.length : ""}
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
            <p className="text-xl font-bold text-slate-900 mb-2 tracking-tight uppercase">No {activeTab} Records</p>
            <p className="text-slate-400 font-medium text-sm">There are currently no faculty members in the {activeTab} state.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyList.map((faculty) => (
              <div
                key={faculty._id}
                className="group bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all hover:-translate-y-1 relative flex flex-col"
              >
                {/* Profile Avatar & Info */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold text-xl shadow-inner group-hover:scale-110 transition-transform">
                    {faculty.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xl font-extrabold text-slate-900 tracking-tight truncate leading-tight">
                      {faculty.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                      <Mail size={12} />
                      <p className="text-[12px] font-semibold truncate italic">
                        {faculty.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto space-y-6">
                  {/* Status Indicator Bar */}
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span>Identity Status</span>
                    <span className={`px-2 py-0.5 rounded-md ${
                      activeTab === 'pending' ? 'bg-amber-100 text-amber-600' : 
                      activeTab === 'approved' ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {activeTab}
                    </span>
                  </div>

                  {/* Action Buttons only in Pending */}
                  {activeTab === "pending" ? (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handleAction(faculty._id, "approve")}
                        className="w-full py-3 bg-slate-900 text-white font-bold rounded-2xl text-[11px] uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-green-600 hover:shadow-green-100 transition-all flex items-center justify-center gap-2"
                      >
                        <Check size={16} strokeWidth={3} />
                        Grant Access
                      </button>
                      <button
                        onClick={() => handleAction(faculty._id, "reject")}
                        className="w-full py-3 bg-white border border-rose-100 text-rose-500 font-bold rounded-2xl text-[11px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <X size={16} strokeWidth={3} />
                        Decline Application
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-3 bg-slate-50 rounded-2xl text-slate-300">
                       <Info size={20} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}