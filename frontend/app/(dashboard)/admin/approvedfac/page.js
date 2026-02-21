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
    // Background uses the dotted yellow pattern style from your image
    <div className="p-8 min-h-screen bg-[#FDF6E3] text-black font-mono selection:bg-yellow-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Title with heavy border and offset shadow */}
        <div className="inline-block mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tight border-4 border-black bg-white px-6 py-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Faculty Management
          </h1>
        </div>

        {/* Tabs - Styled like the buttons in your reference */}
        <div className="flex flex-wrap gap-4 mb-10">
          {["pending", "approved", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 border-4 border-black font-black uppercase transition-all transform active:translate-x-1 active:translate-y-1 active:shadow-none ${
                activeTab === tab
                  ? "bg-[#FFDE03] shadow-none translate-x-1 translate-y-1"
                  : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="text-xl font-black animate-pulse flex items-center gap-2">
            <span className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></span>
            SYNCING_DATA...
          </div>
        ) : facultyList.length === 0 ? (
          <div className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-2xl font-black italic text-gray-400">
              No {activeTab} faculty found.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyList.map((faculty) => (
              <div
                key={faculty._id}
                className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,100,200,1)] transition-all"
              >
                <div className="relative mb-6">
                  {/* Small decorative circle like the profile avatars in your image */}
                  <div className="w-12 h-12 border-4 border-black rounded-full bg-blue-200 mb-4 flex items-center justify-center font-black">
                    {faculty.name.charAt(0)}
                  </div>
                  <p className="text-2xl font-black leading-tight border-b-4 border-black pb-2">
                    {faculty.name}
                  </p>
                  <p className="text-sm font-bold mt-2 text-gray-600 italic">
                    {faculty.email}
                  </p>
                </div>

                {/* Action Buttons only in Pending */}
                {activeTab === "pending" && (
                  <div className="flex flex-col gap-3 mt-6">
                    <button
                      onClick={() => handleAction(faculty._id, "approve")}
                      className="w-full py-3 bg-[#00FF9C] border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      Approve ✅
                    </button>
                    <button
                      onClick={() => handleAction(faculty._id, "reject")}
                      className="w-full py-3 bg-[#FF5C5C] border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      Reject ❌
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}