"use client";

import { useEffect, useState } from "react";

export default function FacultyDashboard() {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    const res = await fetch("/api/faculty/my-classes");
    const data = await res.json();
    setClasses(data.classes || []);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        My Assigned Classes
      </h1>

      {classes.length === 0 ? (
        <p>No classes assigned yet.</p>
      ) : (
        <div className="space-y-4">
          {classes.map((c) => (
            <div
              key={c._id}
              className="border p-4 rounded"
            >
              {c.class.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}