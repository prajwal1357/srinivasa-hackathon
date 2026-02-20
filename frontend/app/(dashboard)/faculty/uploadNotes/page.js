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

  // Helper for consistent input styles
  const inputStyle = "w-full border-4 border-black p-3 font-bold placeholder:text-gray-500 focus:bg-[#FFFBEB] outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none";

  return (
    <div className="max-w-3xl">
      {/* Title with yellow background highlight */}
      <div className="inline-block mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tighter border-4 border-black bg-[#FFDE03] px-6 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          Upload Content
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">Document Title</label>
            <input
              name="title"
              placeholder="e.g. Quantum Physics Basics"
              required
              value={formData.title}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">Subject</label>
            <input
              name="subject"
              placeholder="e.g. Physics-II"
              required
              value={formData.subject}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest">Description</label>
          <textarea
            name="description"
            placeholder="What is this document about?"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* Semester & Unit Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">Semester</label>
            <input
              type="number"
              name="semester"
              placeholder="1-8"
              required
              value={formData.semester}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">Unit</label>
            <input
              type="number"
              name="unit"
              placeholder="1-5"
              required
              value={formData.unit}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="space-y-2 col-span-2">
            <label className="text-xs font-black uppercase tracking-widest">Content Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`${inputStyle} appearance-none bg-white`}
            >
              <option value="note">📚 Study Note</option>
              <option value="assignment">📝 Assignment</option>
            </select>
          </div>
        </div>

        {/* Conditional Due Date & Class Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.type === "assignment" && (
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-[#FF5C5C]">Due Date</label>
              <input
                type="date"
                name="dueDate"
                required
                value={formData.dueDate}
                onChange={handleChange}
                className={`${inputStyle} bg-[#FFECEC]`}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">Target Class</label>
            <select
              name="classId"
              required
              value={formData.classId}
              onChange={handleChange}
              className={`${inputStyle} appearance-none bg-white`}
            >
              <option value="">Choose Class...</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* File Upload Box */}
        <div className="border-4 border-dashed border-black p-8 bg-[#F0FDF4] text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#DCFCE7] transition-colors relative">
          <input
            type="file"
            name="file"
            required
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="pointer-events-none">
            <p className="text-lg font-black uppercase">
              {formData.file ? `📎 ${formData.file.name}` : "Click to select or drag file"}
            </p>
            <p className="text-xs font-bold mt-2 opacity-60">PDF, DOCX, or Images accepted</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full md:w-auto px-10 py-4 border-4 border-black font-black uppercase tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 ${
            loading ? "bg-gray-400" : "bg-[#01FFFF] hover:bg-[#00e5e5]"
          }`}
        >
          {loading ? "Processing..." : "Submit to Class +"}
        </button>
      </form>
    </div>
  );
}