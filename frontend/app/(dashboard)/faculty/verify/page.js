"use client";

import { useEffect, useState } from "react";
// Import Lucide icons
import { Check, X, Loader2, UserCircle2 } from "lucide-react";

export default function FacultyStudentsPage() {
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  const fetchStudents = async (status) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/faculty/students?status=${status}`);
      const data = await res.json();
      setStudents(data.students || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(activeTab);
  }, [activeTab]);

  const handleApprove = async (id) => {
    await fetch("/api/faculty/approve-student", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: id }),
    });
    fetchStudents("pending");
  };

  const handleReject = async (id) => {
    await fetch("/api/faculty/reject-student", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: id }),
    });
    fetchStudents("pending");
  };

  const getStatusStyle = (status) => {
    if (status === "approved") return "bg-[#05FFA1] border-black text-black";
    if (status === "rejected") return "bg-[#FF5C5C] border-black text-white";
    return "bg-[#FFDE03] border-black text-black";
  };

  return (
    <div className="max-w-5xl">
      {/* Title with shadow box */}
      <div className="inline-block mb-10">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter border-4 border-black bg-white px-6 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
          <UserCircle2 size={32} strokeWidth={3} />
          Student Verification
        </h1>
      </div>

      {/* Tabs Styled like Buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        {["pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 border-4 border-black font-black uppercase tracking-widest transition-all transform active:translate-x-1 active:translate-y-1 active:shadow-none ${
              activeTab === tab
                ? "bg-[#01FFFF] shadow-none translate-x-1 translate-y-1"
                : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FF71CE]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center gap-4 bg-white border-4 border-black p-6 inline-flex shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Loader2 className="animate-spin" size={24} strokeWidth={3} />
          <p className="font-black uppercase tracking-widest text-sm">Scanning Database...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xl font-bold italic opacity-50 uppercase">
            No {activeTab} students found in this sector.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white border-4 border-black p-6 flex flex-col md:flex-row justify-between items-start md:items-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(185,103,255,1)] transition-all group"
            >
              <div className="space-y-1">
                <p className="text-2xl font-black uppercase leading-none mb-2 group-hover:text-blue-600 transition-colors">
                  {student.name}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold uppercase">
                  <span className="bg-black text-white px-2 py-0.5">
                    {student.email}
                  </span>
                  <span className="text-blue-600 underline underline-offset-4 decoration-2">
                    Class: {student.class?.name || "Unassigned"}
                  </span>
                  {student.usn && (
                    <span className="text-gray-600 border-l-2 border-black pl-2">USN: {student.usn}</span>
                  )}
                </div>

                <div
                  className={`inline-block mt-4 px-3 py-1 text-xs font-black uppercase border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${getStatusStyle(
                    student.status
                  )}`}
                >
                  Status: {student.status}
                </div>
              </div>

              {activeTab === "pending" && (
                <div className="flex gap-4 mt-6 md:mt-0 w-full md:w-auto">
                  <button
                    onClick={() => handleApprove(student._id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#05FFA1] border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:bg-[#00e68e]"
                  >
                    <Check size={20} strokeWidth={4} />
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(student._id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#FF5C5C] border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:bg-black active:text-white"
                  >
                    <X size={20} strokeWidth={4} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}