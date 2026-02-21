"use client";
import { useState } from "react";

export default function StudentUploadPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const res = await fetch("/api/student/upload-note", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    alert(data.message);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-xl font-bold mb-6">Upload Note</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" required className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" />
        <input name="subject" placeholder="Subject" required className="w-full border p-2 rounded" />
        <input type="number" name="semester" placeholder="Semester" required className="w-full border p-2 rounded" />
        <input type="number" name="unit" placeholder="Unit" required className="w-full border p-2 rounded" />
        <input type="file" name="file" required />

        <button className="bg-black text-white px-4 py-2 rounded">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}