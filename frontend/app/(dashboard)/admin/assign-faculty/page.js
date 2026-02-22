"use client";

import { useEffect, useState } from "react";
import { 
  ChevronDown, 
  Check, 
  Loader2, 
  Plus, 
  UserCheck, 
  LayoutGrid, 
  Search, 
  Users, 
  ArrowRight,
  Info,
  MoreVertical,
  GraduationCap
} from "lucide-react";
import { toast } from "sonner";

export default function AssignFacultyPage() {
  const [facultyList, setFacultyList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [assignments, setAssignments] = useState([]);
  
  const [facultyId, setFacultyId] = useState("");
  const [classId, setClassId] = useState("");
  
  const [facultySearch, setFacultySearch] = useState("");
  const [classSearch, setClassSearch] = useState("");
  const [showFacultyDrop, setShowFacultyDrop] = useState(false);
  const [showClassDrop, setShowClassDrop] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isCreatingClass, setIsCreatingClass] = useState(false);

  const fetchData = async () => {
    try {
      const [facultyRes, classRes, assignRes] = await Promise.all([
        fetch("/api/admin/approved-faculty"),
        fetch("/api/admin/classes"),
        fetch("/api/admin/class-assignments")
      ]);
      const facultyData = await facultyRes.json();
      const classData = await classRes.json();
      const assignData = await assignRes.json();

      setFacultyList(facultyData.faculty || []);
      setClassList(classData.classes || []);
      setAssignments(assignData.assignments || []);
    } catch (err) {
      console.error("Data fetch error:", err);
      toast.error("Failed to load data");
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateAndSelectClass = async () => {
    if (!classSearch.trim()) return;
    setIsCreatingClass(true);
    try {
      const res = await fetch("/api/admin/create-class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: classSearch.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Class "${classSearch.trim()}" created!`);
        const classRes = await fetch("/api/admin/classes");
        const classData = await classRes.json();
        const updatedClasses = classData.classes || [];
        setClassList(updatedClasses);

        const newCls = updatedClasses.find(c => c.name.toLowerCase() === classSearch.toLowerCase().trim());
        if (newCls) {
          setClassId(newCls._id);
          setClassSearch(newCls.name);
        }
        setShowClassDrop(false);
      } else {
        toast.error(data.message || "Failed to create class");
      }
    } catch (err) {
      toast.error("Error creating class");
    } finally {
      setIsCreatingClass(false);
    }
  };

  const handleAssign = async () => {
    if (!facultyId || !classId) {
      toast.warning("Please select both a faculty and a class.");
      return;
    }

    setIsAssigning(true);
    try {
      const res = await fetch("/api/admin/assign-faculty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultyId, classId }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Faculty assigned successfully!");
        setFacultyId("");
        setClassId("");
        setFacultySearch("");
        setClassSearch("");
        fetchData();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to connect to server");
    } finally {
      setIsAssigning(false);
    }
  };

  const filteredClasses = classList.filter(c => c.name.toLowerCase().includes(classSearch.toLowerCase()));
  const exactMatch = classList.some(c => c.name.toLowerCase() === classSearch.toLowerCase().trim());

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
              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Resource Allocation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Assign Faculty
            </h1>
            <p className="max-w-xl mt-6 font-medium text-slate-400 leading-relaxed text-sm md:text-base">
              Establish academic links by assigning verified faculty members to specific classes. Manage roster assignments with real-time updates.
            </p>
          </div>
        </div>

        {/* ═══════════ ASSIGNMENT FORM ═══════════ */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <UserCheck size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create New Assignment</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            
            {/* FACULTY SELECTION */}
            <div className="lg:col-span-4 relative">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">1. Select Faculty Member</label>
              <div 
                className={`group flex items-center justify-between gap-3 px-5 py-4 bg-slate-50 border transition-all rounded-2xl cursor-text ${showFacultyDrop ? 'border-indigo-400 bg-white ring-4 ring-indigo-50' : 'border-transparent hover:bg-slate-100'}`}
                onClick={() => setShowFacultyDrop(true)}
              >
                <div className="flex items-center gap-3 w-full">
                  <Search size={18} className="text-slate-300" />
                  <input
                    type="text"
                    placeholder="Search name..."
                    value={facultySearch}
                    onChange={(e) => { setFacultySearch(e.target.value); setShowFacultyDrop(true); }}
                    className="bg-transparent outline-none w-full text-sm font-bold text-slate-700 placeholder:text-slate-300"
                  />
                </div>
                <ChevronDown size={18} className={`text-slate-300 transition-transform duration-300 ${showFacultyDrop ? "rotate-180" : ""}`} />
              </div>

              {showFacultyDrop && (
                <div className="absolute z-50 w-full mt-3 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/60 animate-in fade-in zoom-in-95 duration-200">
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {facultyList.filter(f => f.name.toLowerCase().includes(facultySearch.toLowerCase())).map((f) => (
                      <button
                        key={f._id}
                        onClick={() => { setFacultyId(f._id); setFacultySearch(f.name); setShowFacultyDrop(false); }}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-indigo-50 transition-colors group"
                      >
                        <span className={`text-sm font-bold tracking-tight ${facultyId === f._id ? 'text-indigo-600' : 'text-slate-600'}`}>{f.name}</span>
                        {facultyId === f._id && <Check size={16} className="text-indigo-600" />}
                      </button>
                    ))}
                    {facultyList.filter(f => f.name.toLowerCase().includes(facultySearch.toLowerCase())).length === 0 && (
                      <div className="p-6 text-center text-slate-400 text-xs font-medium italic">No faculty found</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* CLASS SELECTION */}
            <div className="lg:col-span-4 relative">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">2. Target Class</label>
              <div 
                className={`group flex items-center justify-between gap-3 px-5 py-4 bg-slate-50 border transition-all rounded-2xl cursor-text ${showClassDrop ? 'border-indigo-400 bg-white ring-4 ring-indigo-50' : 'border-transparent hover:bg-slate-100'}`}
                onClick={() => setShowClassDrop(true)}
              >
                <div className="flex items-center gap-3 w-full">
                  <LayoutGrid size={18} className="text-slate-300" />
                  <input
                    type="text"
                    placeholder="Search or create..."
                    value={classSearch}
                    onChange={(e) => { setClassSearch(e.target.value); setShowClassDrop(true); }}
                    className="bg-transparent outline-none w-full text-sm font-bold text-slate-700 placeholder:text-slate-300"
                  />
                </div>
                <ChevronDown size={18} className={`text-slate-300 transition-transform duration-300 ${showClassDrop ? "rotate-180" : ""}`} />
              </div>

              {showClassDrop && (
                <div className="absolute z-50 w-full mt-3 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/60 animate-in fade-in zoom-in-95 duration-200">
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {filteredClasses.map((c) => (
                      <button
                        key={c._id}
                        onClick={() => { setClassId(c._id); setClassSearch(c.name); setShowClassDrop(false); }}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-indigo-50 transition-colors group"
                      >
                        <span className={`text-sm font-bold tracking-tight ${classId === c._id ? 'text-indigo-600' : 'text-slate-600'}`}>{c.name}</span>
                        {classId === c._id && <Check size={16} className="text-indigo-600" />}
                      </button>
                    ))}
                    
                    {!exactMatch && classSearch.trim() !== "" && (
                      <button
                        onClick={handleCreateAndSelectClass}
                        className="w-full p-4 bg-indigo-600 text-white flex items-center justify-between gap-3 hover:bg-indigo-700 transition-all font-bold text-xs"
                      >
                        <span className="flex items-center gap-2">
                          <Plus size={16} /> CREATE NEW CLASS: `{classSearch.toUpperCase()}`
                        </span>
                        {isCreatingClass && <Loader2 size={14} className="animate-spin" />}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ACTION BUTTON */}
            <div className="lg:col-span-4">
              <button
                onClick={handleAssign}
                disabled={isAssigning || isCreatingClass}
                className="w-full h-[58px] bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
              >
                {isAssigning ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    Confirm Assignment
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════ ACTIVE ROSTER ═══════════ */}
        <div className="space-y-8 pt-6">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
                  <Users size={22} />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Roster</h2>
             </div>
             <div className="bg-white px-4 py-1.5 rounded-full border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {assignments.length} Total Links
             </div>
          </div>

          {assignments.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-20 text-center shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                 <Info size={40} className="text-slate-200" />
              </div>
              <p className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Roster Currently Empty</p>
              <p className="text-slate-400 font-medium text-sm">Use the form above to pair faculty members with classes.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {assignments.map((a) => (
                <div key={a._id} className="group bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all hover:-translate-y-1 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-slate-300 hover:text-slate-900"><MoreVertical size={18} /></button>
                  </div>
                  
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                          {a.faculty?.name?.charAt(0) || "F"}
                       </div>
                       <div className="min-w-0 flex-1">
                          <p className="text-xl font-extrabold text-slate-900 tracking-tight truncate">{a.faculty?.name || "Unassigned"}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Faculty</p>
                       </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-50">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Allocated Class</p>
                       <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold tracking-tight shadow-lg shadow-slate-200">
                          <GraduationCap size={16} className="text-green-400" />
                          {a.class?.name || "N/A"}
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Global Click Overlay to close dropdowns */}
      {(showFacultyDrop || showClassDrop) && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => { setShowFacultyDrop(false); setShowClassDrop(false); }} />
      )}
    </div>
  );
}