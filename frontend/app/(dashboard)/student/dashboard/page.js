"use client";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/student/notices");
    const result = await res.json();
    setData(result);
  };

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8 space-y-10">

      {/* Admin Notices */}
      <div>
        <h2 className="text-xl font-bold mb-4">Admin Notices</h2>
        {data.adminNotices.length === 0 ? (
          <p>No notices</p>
        ) : (
          data.adminNotices.map((notice) => (
            <div key={notice._id} className="border p-4 rounded mb-3">
              <h3 className="font-semibold">{notice.title}</h3>
              <p className="text-sm text-gray-600">
                {notice.description}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Faculty Notices */}
      <div>
        <h2 className="text-xl font-bold mb-4">Faculty Notices</h2>
        {data.facultyNotices.length === 0 ? (
          <p>No notices</p>
        ) : (
          data.facultyNotices.map((notice) => (
            <div key={notice._id} className="border p-4 rounded mb-3">
              <h3 className="font-semibold">{notice.title}</h3>
              <p className="text-sm text-gray-600">
                {notice.description}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Assignment Due */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Upcoming Assignments
        </h2>
        {data.assignments.length === 0 ? (
          <p>No upcoming assignments</p>
        ) : (
          data.assignments.map((assignment) => (
            <div key={assignment._id} className="border p-4 rounded mb-3">
              <h3 className="font-semibold">
                {assignment.title}
              </h3>
              <p className="text-sm text-red-600">
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}