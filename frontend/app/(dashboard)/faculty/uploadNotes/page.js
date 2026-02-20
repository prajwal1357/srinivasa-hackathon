"use client";
import { useEffect, useState } from "react";

export default function UploadNotesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    semester: "",
    unit: "",
    type: "note",
    dueDate: "",
    classId: "",
    file: null,
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/admin/classes");
      const data = await res.json();
      setClasses(data.classes || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value);
      });

      const res = await fetch("/api/faculty/upload-note", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      alert("Uploaded successfully ✅");

      // Reset form
      setFormData({
        title: "",
        description: "",
        subject: "",
        semester: "",
        unit: "",
        type: "note",
        dueDate: "",
        classId: "",
        file: null,
      });

    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">
        Upload Notes / Assignment
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="subject"
          placeholder="Subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-4">
          <input
            type="number"
            name="semester"
            placeholder="Semester"
            required
            value={formData.semester}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="unit"
            placeholder="Unit"
            required
            value={formData.unit}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="note">Note</option>
          <option value="assignment">Assignment</option>
        </select>

        {formData.type === "assignment" && (
          <input
            type="date"
            name="dueDate"
            required
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        )}

        <select
          name="classId"
          required
          value={formData.classId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="file"
          required
          onChange={handleChange}
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}