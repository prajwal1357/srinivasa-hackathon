"use client";

import { useEffect, useState } from "react";

export default function AssignFacultyPage() {
  const [facultyList, setFacultyList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [facultyId, setFacultyId] = useState("");
  const [classId, setClassId] = useState("");

  const fetchData = async () => {
    const facultyRes = await fetch("/api/admin/approved-faculty");
    const classRes = await fetch("/api/admin/classes");
    const assignRes = await fetch("/api/admin/class-assignments");

    const facultyData = await facultyRes.json();
    const classData = await classRes.json();
    const assignData = await assignRes.json();

    setFacultyList(facultyData.faculty || []);
    setClassList(classData.classes || []);
    setAssignments(assignData.assignments || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!facultyId || !classId) return;

    await fetch("/api/admin/assign-faculty", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ facultyId, classId }),
    });

    setFacultyId("");
    setClassId("");
    fetchData();
  };

  return (
    <div className="p-8 min-h-screen bg-[#FDF6E3] text-black font-mono selection:bg-[#B967FF]">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Title - Brutalist Style */}
        <div className="inline-block mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter border-4 border-black bg-[#FF71CE] px-6 py-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Assign Faculty
          </h1>
        </div>

        {/* New Assignment Card */}
        <div className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] mb-16 relative overflow-hidden">
          {/* Decorative Corner Shape */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFDE03] border-l-4 border-b-4 border-black flex items-center justify-center font-black">
            +
          </div>

          <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-2">
            <span className="w-4 h-4 bg-[#01FFFF] border-2 border-black"></span>
            New Assignment
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Faculty Select */}
            <div>
              <label className="block text-sm font-black uppercase mb-2 tracking-wide">
                1. Select Faculty
              </label>
              <select
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                className="w-full bg-white border-4 border-black rounded-none px-4 py-3 font-bold focus:bg-yellow-50 outline-none transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'4\' stroke-linecap=\'square\' stroke-linejoin=\'miter\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
              >
                <option value="">Choose Faculty</option>
                {facultyList.map((f) => (
                  <option key={f._id} value={f._id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Select */}
            <div>
              <label className="block text-sm font-black uppercase mb-2 tracking-wide">
                2. Select Class
              </label>
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full bg-white border-4 border-black rounded-none px-4 py-3 font-bold focus:bg-yellow-50 outline-none transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'4\' stroke-linecap=\'square\' stroke-linejoin=\'miter\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
              >
                <option value="">Choose Class</option>
                {classList.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Assign Button */}
            <div className="flex items-end">
              <button
                onClick={handleAssign}
                className="w-full bg-[#05FFA1] border-4 border-black px-6 py-3 font-black uppercase shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>

        {/* Current Assignments Section */}
        <div>
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
                <div
                  key={a._id}
                  className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(185,103,255,1)] transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-2xl font-black uppercase leading-tight group-hover:text-[#B967FF]">
                      {a.faculty.name}
                    </p>
                    <div className="w-8 h-8 border-2 border-black bg-yellow-300"></div>
                  </div>
                  
                  <div className="border-t-4 border-black pt-4">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">
                      Department / Class
                    </p>
                    <p className="text-lg font-black bg-black text-white inline-block px-3 py-1 uppercase">
                      {a.class.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}