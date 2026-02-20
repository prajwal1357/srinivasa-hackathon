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

    fetchFaculty("pending");
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-blue-500 mb-8">
        Faculty Management
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {["pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg capitalize font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-gray-400 animate-pulse">
          Loading faculty data...
        </div>
      ) : facultyList.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
          No {activeTab} faculty found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {facultyList.map((faculty) => (
            <div
              key={faculty._id}
              className="bg-gray-800 border border-gray-700 
                         rounded-xl p-6 shadow-md 
                         hover:border-blue-500 transition duration-300"
            >
              <div>
                <p className="text-lg font-semibold">
                  {faculty.name}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {faculty.email}
                </p>
              </div>

              {/* Buttons only in Pending */}
              {activeTab === "pending" && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() =>
                      handleAction(faculty._id, "approve")
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleAction(faculty._id, "reject")
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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