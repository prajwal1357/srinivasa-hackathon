"use client";

import { useEffect, useState } from "react";

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

  const getStatusColor = (status) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded capitalize ${
              activeTab === tab
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No {activeTab} students found.</p>
      ) : (
        <div className="space-y-4">
          {students.map((student) => (
            <div
              key={student._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg">
                  {student.name}
                </p>

                <p className="text-sm text-gray-500">
                  {student.email}
                </p>

                <p className="text-sm text-blue-600">
                  Class: {student.class?.name || "No Class"}
                </p>

                {student.usn && (
                  <p className="text-sm text-gray-600">
                    USN: {student.usn}
                  </p>
                )}

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded ${getStatusColor(
                    student.status
                  )}`}
                >
                  {student.status}
                </span>
              </div>

              {activeTab === "pending" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(student._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(student._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
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