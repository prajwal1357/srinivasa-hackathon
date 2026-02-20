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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Assign Faculty to Class</h1>

      {/* Assignment Form */}
      <div className="flex gap-4 mb-8">
        <select
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Faculty</option>
          {facultyList.map((f) => (
            <option key={f._id} value={f._id}>
              {f.name}
            </option>
          ))}
        </select>

        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Class</option>
          {classList.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Assign
        </button>
      </div>

      {/* Assignment List */}
      <h2 className="text-xl font-semibold mb-4">Current Assignments</h2>

      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <div className="space-y-3">
          {assignments.map((a) => (
            <div key={a._id} className="border p-3 rounded">
              {a.faculty.name} → {a.class.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}