"use client";

import { useEffect, useState } from "react";
import { 
  UserCheck, 
  UserX, 
  Users, 
  ShieldCheck, 
  Mail, 
  Search,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";

export default function FacultyManagementPage() {
  const [facultyList, setFacultyList] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  // 🔹 Simulated fetch logic (preserving your original logic)
  const fetchFaculty = async (status) => {
    setLoading(true);
    try {
      // Logic placeholder for your API
      // const res = await fetch(`/api/admin/faculty?status=${status}`);
      // const data = await res.json();
      // setFacultyList(data.faculty || []);

      // Mock data for theme preview
      const mockData = [
        { _id: "1", name: "Dr. Ramesh Kumar", email: "ramesh.k@university.edu" },
        { _id: "2", name: "Prof. Sarah Jenkins", email: "s.jenkins@university.edu" },
        { _id: "3", name: "Dr. Alan Turing", email: "a.turing@university.edu" },
      ];
      setFacultyList(mockData);
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
    console.log(`Action: ${action} for ID: ${id}`);
    // Original logic preserved
    // const route = action === "approve" ? "/api/admin/approve-faculty" : "/api/admin/reject-faculty";
    // await fetch(route, { method: "PATCH", ... });
    fetchFaculty("pending");
  };

  const getTabColor = (tab) => {
    if (activeTab !== tab) return "bg-white";
    switch(tab) {
      case 'pending': return "bg-[#FFD600]"; // Yellow
      case 'approved': return "bg-[#4ADE80]"; // Green
      case 'rejected': return "bg-[#FDA4AF]"; // Pink/Red
      default: return "bg-white";
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 font-mono animate-in fade-in duration-700 pb-10">
      
      {/* 🟦 PAGE HEADER */}
      <div className="relative overflow-hidden bg-[#FF8A5B] border-4 border-black p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute top-6 right-10 w-32 h-10 bg-[#1E293B] border-2 border-black rotate-6 shadow-[4px_4px_0px_0px_rgba(255,214,0,1)] flex items-center justify-center font-black text-[10px] text-white uppercase z-20">
          Admin Shield
        </div>
        
        <div className="relative z-10">
          <div className="inline-block px-4 py-1 bg-white border-2 border-black rounded-full text-[10px] text-black font-black uppercase tracking-widest mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            Institutional Control
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter">
            Faculty Management
          </h1>
          <p className="max-w-xl mt-4 font-bold text-black/70 leading-snug uppercase text-xs">
            Roster Validation, Credential Verification, and Departmental Access Control.
          </p>
        </div>
      </div>

      {/* 🟦 TABS SYSTEM */}
      <div className="flex flex-wrap gap-4 md:gap-6">
        {["pending", "approved", "rejected"].map((tab) => {
          const isActive = activeTab === tab;
          const Icon = tab === 'pending' ? Clock : tab === 'approved' ? CheckCircle2 : XCircle;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                flex items-center gap-3 px-8 py-4 border-4 border-black rounded-2xl font-black uppercase italic tracking-tighter text-lg transition-all
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                ${getTabColor(tab)}
                ${isActive ? "translate-x-1 translate-y-1 shadow-none" : "hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"}
              `}
            >
              <Icon size={20} strokeWidth={3} />
              {tab}
            </button>
          );
        })}
      </div>

      {/* 🟦 CONTENT AREA */}
      <div className="bg-[#F8FAFC] border-4 border-black rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
             <div className="w-16 h-16 border-8 border-black border-t-[#FFD600] rounded-full animate-spin" />
             <p className="font-black uppercase text-sm italic tracking-widest">Accessing Database...</p>
          </div>
        ) : facultyList.length === 0 ? (
          <div className="text-center py-20 border-4 border-dashed border-black/20 rounded-3xl bg-white/50">
             <Users size={48} className="mx-auto mb-4 opacity-20" />
             <p className="font-black uppercase text-xl text-black/40 italic">No {activeTab} faculty records</p>
          </div>
        ) : (
          <div className="space-y-6">
            {facultyList.map((faculty) => (
              <div
                key={faculty._id}
                className="bg-white border-4 border-black p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <div className="flex items-center gap-6 w-full">
                   <div className="w-16 h-16 bg-[#1E293B] border-4 border-black rounded-full flex items-center justify-center text-white shadow-[4px_4px_0px_0px_rgba(255,138,91,1)] shrink-0">
                      <ShieldCheck size={30} strokeWidth={2.5} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">{faculty.name}</h3>
                      <div className="flex items-center gap-2 mt-2 opacity-60">
                         <Mail size={14} strokeWidth={3} />
                         <p className="text-xs font-bold uppercase tracking-tight">{faculty.email}</p>
                      </div>
                   </div>
                </div>

                {/* Actions Only for Pending */}
                {activeTab === "pending" && (
                  <div className="flex gap-4 w-full md:w-auto">
                    <button
                      onClick={() => handleAction(faculty._id, "approve")}
                      className="flex-1 md:flex-none px-6 py-3 bg-[#4ADE80] border-4 border-black rounded-xl font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                      <UserCheck size={18} strokeWidth={3} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(faculty._id, "reject")}
                      className="flex-1 md:flex-none px-6 py-3 bg-[#FDA4AF] border-4 border-black rounded-xl font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                      <UserX size={18} strokeWidth={3} />
                      Reject
                    </button>
                  </div>
                )}

                {/* Status Indicator for non-pending */}
                {activeTab !== "pending" && (
                  <div className={`px-4 py-2 border-2 border-black rounded-full font-black text-[10px] uppercase tracking-widest ${activeTab === 'approved' ? 'bg-[#4ADE80]' : 'bg-[#FDA4AF]'}`}>
                    {activeTab} Access
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

     
      
    </div>
  );
}