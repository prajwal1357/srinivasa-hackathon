"use client";

import { useEffect, useState } from "react";
import { 
  UserPlus, 
  Library, 
  Users, 
  Link as LinkIcon, 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  MoreVertical
} from "lucide-react";

export default function AssignFacultyPage() {
  const [facultyList, setFacultyList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [facultyId, setFacultyId] = useState("");
  const [classId, setClassId] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Logic placeholder for your API
      // const facultyRes = await fetch("/api/admin/approved-faculty");
      // const classRes = await fetch("/api/admin/classes");
      // const assignRes = await fetch("/api/admin/class-assignments");

      // Mock data for theme preview
      setFacultyList([
        { _id: "f1", name: "Dr. Ramesh Kumar" },
        { _id: "f2", name: "Prof. Sarah Jenkins" }
      ]);
      setClassList([
        { _id: "c1", name: "CS - Data Structures" },
        { _id: "c2", name: "CS - Artificial Intelligence" }
      ]);
      setAssignments([
        { _id: "a1", faculty: { name: "Dr. Ramesh Kumar" }, class: { name: "CS - Data Structures" } },
        { _id: "a2", faculty: { name: "Prof. Sarah Jenkins" }, class: { name: "CS - Artificial Intelligence" } }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!facultyId || !classId) return;
    console.log("Assigning:", { facultyId, classId });
    // await fetch("/api/admin/assign-faculty", { ... });
    setFacultyId("");
    setClassId("");
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 font-mono animate-in fade-in duration-700 pb-20">
      
      {/* 🟦 PAGE HEADER - Constructivist Coral */}
      <div className="relative overflow-hidden bg-[#FF8A5B] border-4 border-black p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute top-6 right-10 w-36 h-10 bg-[#FFD600] border-2 border-black -rotate-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-[10px] uppercase z-20">
          Access Control
        </div>
        
        <div className="relative z-10">
          <div className="inline-block px-5 py-2 bg-[#1E293B] border-2 border-black rounded-lg text-[10px] text-white font-black uppercase tracking-[0.2em] mb-8 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
            Resource.Allocator_v1.0
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase leading-[0.85] tracking-tighter">
            Assign Faculty<br/>to Class
          </h1>
          <p className="max-w-xl mt-6 font-bold text-black/70 leading-snug uppercase text-xs">
            Cross-link verified academic staff with active department schedules to initiate resource distribution.
          </p>
        </div>
      </div>

      {/* 🟦 ASSIGNMENT INTERFACE */}
      <div className="bg-white border-4 border-black p-10 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-4 mb-10">
           <div className="bg-[#FFD600] p-3 border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <UserPlus size={32} strokeWidth={3} />
           </div>
           <h2 className="text-2xl font-black uppercase italic tracking-tighter">New Linkage Protocol</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-end">
          {/* Faculty Select */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-block bg-[#1E293B] text-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Primary Agent
            </span>
            <div className="relative">
              <select
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                className="w-full bg-[#F8FAFC] border-4 border-black rounded-2xl px-6 py-5 focus:bg-[#FEF9C3] outline-none font-black text-sm appearance-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all"
              >
                <option value="">SELECT FACULTY...</option>
                {facultyList.map((f) => (
                  <option key={f._id} value={f._id}>{f.name}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none font-black">▼</div>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-1 justify-center pb-4">
             <ArrowRight size={32} strokeWidth={3} className="text-black/20" />
          </div>

          {/* Class Select */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-block bg-[#1E293B] text-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Target Node
            </span>
            <div className="relative">
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full bg-[#F8FAFC] border-4 border-black rounded-2xl px-6 py-5 focus:bg-[#DBEAFE] outline-none font-black text-sm appearance-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all"
              >
                <option value="">SELECT CLASS...</option>
                {classList.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none font-black">▼</div>
            </div>
          </div>

          {/* Action Button */}
          <div className="lg:col-span-1 flex justify-end">
            <button
              onClick={handleAssign}
              className="w-full lg:w-20 h-20 bg-[#FFD600] border-4 border-black rounded-2xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group active:scale-95"
            >
              <LinkIcon size={32} strokeWidth={4} className="group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 🟦 CURRENT ASSIGNMENTS ROSTER */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="inline-block bg-[#1E293B] text-white px-8 py-3 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(255,138,91,1)]">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-4">
                <Library size={28} strokeWidth={3} className="text-[#FFD600]" />
                Current Assignments
              </h3>
           </div>
           
           <div className="relative group w-full md:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" size={18} strokeWidth={3} />
              <input 
                type="text" 
                placeholder="FILTER ROSTER..." 
                className="w-full pl-12 pr-4 py-3 bg-white border-4 border-black rounded-full font-black text-[10px] uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none"
              />
           </div>
        </div>

        {loading ? (
           <div className="p-20 text-center bg-white border-4 border-black rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-16 h-16 border-8 border-black border-t-[#FFD600] rounded-full animate-spin mx-auto mb-4" />
              <p className="font-black uppercase tracking-widest text-sm italic">Synchronizing Logs...</p>
           </div>
        ) : assignments.length === 0 ? (
          <div className="p-20 text-center bg-white border-4 border-black rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] border-dashed opacity-50">
            <p className="font-black uppercase text-xl italic">No assignments established</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {assignments.map((a, i) => (
              <div
                key={a._id}
                className={`
                  relative p-8 border-4 border-black rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1
                  ${i % 2 === 0 ? 'bg-[#CCFBF1]' : 'bg-[#DBEAFE]'}
                `}
              >
                {/* Decorative Sticker */}
                <div className="absolute top-4 right-4 bg-white border-2 border-black p-1 rounded-lg">
                   <MoreVertical size={16} strokeWidth={3} className="text-black/20" />
                </div>

                <div className="flex flex-col gap-6 h-full">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-white border-4 border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <ShieldCheck size={28} strokeWidth={3} className="text-black" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase opacity-40 leading-none mb-1">Assigned Faculty</p>
                        <h4 className="text-xl font-black uppercase tracking-tighter leading-none">{a.faculty.name}</h4>
                     </div>
                  </div>

                  <div className="w-full h-1 bg-black/10 rounded-full" />

                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center">
                        <CheckCircle2 size={24} strokeWidth={3} className="text-[#FF8A5B]" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase opacity-40 leading-none mb-1">Assigned Node</p>
                        <p className="font-black text-lg uppercase tracking-tight text-[#1E293B]">{a.class.name}</p>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🟦 SYSTEM STATUS FOOTER */}
      <div className="flex flex-wrap justify-center gap-6">
         <div className="bg-[#FFD600] border-4 border-black px-8 py-3 rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 -rotate-1">
            <Clock size={20} strokeWidth={3} />
            <span className="font-black uppercase text-[10px] tracking-widest italic">Last Update: {new Date().toLocaleTimeString()}</span>
         </div>
         <div className="bg-white border-4 border-black px-8 py-3 rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 rotate-1">
            <Users size={20} strokeWidth={3} />
            <span className="font-black uppercase text-[10px] tracking-widest italic">Verified Staff: {facultyList.length}</span>
         </div>
      </div>
    </div>
  );
}