"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Check, Loader2, Plus } from "lucide-react";
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

  // Create Class on the fly
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

        // Refresh class list
        const classRes = await fetch("/api/admin/classes");
        const classData = await classRes.json();
        const updatedClasses = classData.classes || [];
        setClassList(updatedClasses);

        // Auto-select the new class
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

  // Filter Logic
  const filteredClasses = classList.filter(c => c.name.toLowerCase().includes(classSearch.toLowerCase()));
  const exactMatch = classList.some(c => c.name.toLowerCase() === classSearch.toLowerCase().trim());

  return (
    <div className="p-8 min-h-screen bg-[#FDF6E3] text-black font-mono">
      <div className="max-w-6xl mx-auto">
        
        <div className="inline-block mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter border-4 border-black bg-[#FF71CE] px-6 py-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Assign Faculty
          </h1>
        </div>

        <div className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] mb-16 relative">
          <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-2">
            <span className="w-4 h-4 bg-[#01FFFF] border-2 border-black"></span>
            New Assignment
          </h2>

          <div className="grid md:grid-cols-3 gap-8 items-end">
            
            {/* FACULTY: Search Only */}
            <div className="relative">
              <label className="block text-sm font-black uppercase mb-2">1. Faculty (Select Only)</label>
              <div 
                className="w-full bg-white border-4 border-black p-3 font-bold flex items-center justify-between cursor-text"
                onClick={() => setShowFacultyDrop(true)}
              >
                <input
                  type="text"
                  placeholder="SEARCH NAME..."
                  value={facultySearch}
                  onChange={(e) => { setFacultySearch(e.target.value); setShowFacultyDrop(true); }}
                  className="bg-transparent outline-none w-full uppercase text-xs"
                />
                <ChevronDown size={20} className={showFacultyDrop ? "rotate-180" : ""} />
              </div>

              {showFacultyDrop && (
                <div className="absolute z-50 w-full mt-1 bg-white border-4 border-black max-h-60 overflow-y-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {facultyList.filter(f => f.name.toLowerCase().includes(facultySearch.toLowerCase())).map((f) => (
                    <div
                      key={f._id}
                      onClick={() => { setFacultyId(f._id); setFacultySearch(f.name); setShowFacultyDrop(false); }}
                      className="p-3 border-b-2 border-black last:border-0 hover:bg-[#B967FF] hover:text-white cursor-pointer font-bold flex justify-between items-center text-xs"
                    >
                      {f.name}
                      {facultyId === f._id && <Check size={14} />}
                    </div>
                  ))}
                  {facultyList.filter(f => f.name.toLowerCase().includes(facultySearch.toLowerCase())).length === 0 && (
                    <div className="p-3 italic text-gray-400 text-xs">No faculty found</div>
                  )}
                </div>
              )}
            </div>

            {/* CLASS: Search OR Create */}
            <div className="relative">
              <label className="block text-sm font-black uppercase mb-2">2. Class (Search or Create)</label>
              <div 
                className="w-full bg-white border-4 border-black p-3 font-bold flex items-center justify-between cursor-text"
                onClick={() => setShowClassDrop(true)}
              >
                <input
                  type="text"
                  placeholder="SEARCH OR TYPE NEW..."
                  value={classSearch}
                  onChange={(e) => { setClassSearch(e.target.value); setShowClassDrop(true); }}
                  className="bg-transparent outline-none w-full uppercase text-xs"
                />
                <ChevronDown size={20} className={showClassDrop ? "rotate-180" : ""} />
              </div>

              {showClassDrop && (
                <div className="absolute z-50 w-full mt-1 bg-white border-4 border-black max-h-60 overflow-y-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {filteredClasses.map((c) => (
                    <div
                      key={c._id}
                      onClick={() => { setClassId(c._id); setClassSearch(c.name); setShowClassDrop(false); }}
                      className="p-3 border-b-2 border-black last:border-0 hover:bg-[#01FFFF] cursor-pointer font-bold flex justify-between items-center text-xs"
                    >
                      {c.name}
                      {classId === c._id && <Check size={14} />}
                    </div>
                  ))}
                  
                  {/* CREATE OPTION: Only shows if the name doesn't exist exactly */}
                  {!exactMatch && classSearch.trim() !== "" && (
                    <div
                      onClick={handleCreateAndSelectClass}
                      className="p-4 bg-yellow-50 hover:bg-yellow-200 cursor-pointer border-t-2 border-black font-black flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2 italic">
                        <Plus size={16} strokeWidth={3} />
                        CREATE & USE: &quot;{classSearch.toUpperCase()}&quot;
                      </div>
                      {isCreatingClass && <Loader2 size={14} className="animate-spin" />}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleAssign}
              disabled={isAssigning || isCreatingClass}
              className="w-full bg-[#05FFA1] border-4 border-black px-6 py-4 font-black uppercase shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all h-[62px] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isAssigning ? <Loader2 className="animate-spin" size={20} /> : "Confirm Assignment"}
            </button>
          </div>
        </div>

        {/* ACTIVE ROSTER */}
        <div className="mt-16">
          <h2 className="text-3xl font-black uppercase mb-8 inline-block bg-[#01FFFF] border-4 border-black px-4 py-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            Active Roster
          </h2>

          {assignments.length === 0 ? (
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] italic font-bold text-gray-400 uppercase">
              Roster is currently empty.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {assignments.map((a) => (
                <div key={a._id} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-2xl font-black uppercase mb-4 leading-tight">{a.faculty?.name || "N/A"}</p>
                  <div className="border-t-4 border-black pt-4">
                    <p className="text-xs font-black text-gray-500 uppercase mb-1">Class Assigned</p>
                    <p className="text-lg font-black bg-black text-white inline-block px-3 py-1 uppercase">{a.class?.name || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {(showFacultyDrop || showClassDrop) && (
        <div className="fixed inset-0 z-40" onClick={() => { setShowFacultyDrop(false); setShowClassDrop(false); }} />
      )}
    </div>
  );
}