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
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-blue-500 mb-10">
        Assign Faculty to Class
      </h1>

      {/* Assignment Card */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-200">
          New Assignment
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Faculty Select */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Select Faculty
            </label>
            <select
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 
                         rounded-lg px-4 py-3 focus:border-blue-500 
                         outline-none transition"
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
            <label className="block text-sm text-gray-400 mb-2">
              Select Class
            </label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 
                         rounded-lg px-4 py-3 focus:border-blue-500 
                         outline-none transition"
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
              className="w-full bg-blue-600 px-6 py-3 rounded-lg 
                         font-semibold hover:bg-blue-700 
                         transition duration-300 shadow-md"
            >
              Assign Faculty
            </button>
          </div>
        </div>
      </div>

      {/* Assignment List */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-200">
          Current Assignments
        </h2>

        {assignments.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
            No assignments yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {assignments.map((a) => (
              <div
                key={a._id}
                className="bg-gray-800 border border-gray-700 
                           rounded-xl p-6 hover:border-blue-500 
                           transition duration-300 shadow-md"
              >
                <p className="text-lg font-semibold">
                  {a.faculty.name}
                </p>
                <p className="text-gray-400 mt-2">
                  Assigned to:
                </p>
                <p className="text-blue-400 font-medium mt-1">
                  {a.class.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}