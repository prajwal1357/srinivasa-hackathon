"use client";

import { useEffect, useState } from "react";

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

    // After action, refresh pending list
    fetchFaculty("pending");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Faculty Management</h1>

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
      ) : facultyList.length === 0 ? (
        <p>No {activeTab} faculty found.</p>
      ) : (
        <div className="space-y-4">
          {facultyList.map((faculty) => (
            <div
              key={faculty._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{faculty.name}</p>
                <p className="text-sm text-gray-500">{faculty.email}</p>
              </div>

              {/* Buttons only in Pending */}
              {activeTab === "pending" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAction(faculty._id, "approve")}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(faculty._id, "reject")}
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