"use client";

import React, { useEffect, useState } from "react";
import {
  Upload,
  FileText,
  Calendar,
  Check,
  Loader2,
  ChevronDown,
  Layers,
  GraduationCap,
  Plus,
  CloudUpload,
} from "lucide-react";
import { toast } from "sonner";

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
      if (!res.ok) throw new Error("Failed to fetch classes");
      const data = await res.json();
      setClasses(data.classes || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
      // Mock data for preview visibility
      setClasses([
        { _id: "c1", name: "Computer Science - 4A" },
        { _id: "c2", name: "Information Technology - 6B" }
      ]);
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

      toast.success("Content uploaded successfully ✅");

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
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animate-fade-in pb-20" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* ═══════════ CSS INJECTOR ═══════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
      `}} />

      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* ═══════════ CYAN HERO HEADER ═══════════ */}
        <div className="relative overflow-hidden bg-cyan-600 text-white p-10 md:p-14 rounded-[3rem] shadow-xl shadow-cyan-100">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 blur-[80px] rounded-full -translate-x-1/4 translate-y-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full mb-8 border border-white/20">
                <CloudUpload size={14} className="text-white" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Resource Management</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                Upload Content
              </h1>
              <p className="max-w-md mt-6 font-medium text-cyan-50 leading-relaxed text-sm md:text-base">
                Distribute study materials and assignments to your assigned classes. Streamline academic delivery with secure file hosting.
              </p>
            </div>
            <div className="hidden lg:block bg-white/10 p-8 rounded-[3rem] border border-white/10 backdrop-blur-sm shadow-inner">
               <div className="bg-white p-4 rounded-2xl shadow-sm rotate-3">
                  <FileText size={48} className="text-cyan-600" />
               </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* ═══════════ SECTION 1: METADATA ═══════════ */}
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl">
                <FileText size={22} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">General Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Document Title</label>
                <input
                  name="title"
                  placeholder="e.g. Quantum Physics Basics"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border-transparent rounded-2xl font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-cyan-50 focus:border-cyan-200 transition-all placeholder:text-slate-300 shadow-inner"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Academic Subject</label>
                <input
                  name="subject"
                  placeholder="e.g. Physics-II"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border-transparent rounded-2xl font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-cyan-50 focus:border-cyan-200 transition-all placeholder:text-slate-300 shadow-inner"
                />
              </div>

              <div className="md:col-span-2 space-y-2.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description / Notes</label>
                <textarea
                  name="description"
                  placeholder="Briefly explain what this document covers..."
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-5 bg-slate-50 border-transparent rounded-4xl font-medium text-sm text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-cyan-50 focus:border-cyan-200 transition-all placeholder:text-slate-300 shadow-inner custom-scrollbar"
                />
              </div>
            </div>
          </div>

          {/* ═══════════ SECTION 2: ACADEMIC DETAILS ═══════════ */}
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <Layers size={22} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Classification</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Semester</label>
                <input
                  type="number"
                  name="semester"
                  placeholder="1-8"
                  required
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border-transparent rounded-2xl font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-100 transition-all shadow-inner"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Unit Number</label>
                <input
                  type="number"
                  name="unit"
                  placeholder="1-5"
                  required
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border-transparent rounded-2xl font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-100 transition-all shadow-inner"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Content Type</label>
                <div className="relative">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-50 border-transparent rounded-2xl font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-100 transition-all appearance-none cursor-pointer shadow-inner"
                  >
                    <option value="note">📚 Study Note</option>
                    <option value="assignment">📝 Assignment</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ SECTION 3: TARGET & DEADLINE ═══════════ */}
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <GraduationCap size={22} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Assignment Delivery</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Target Class</label>
                <div className="relative">
                  <select
                    name="classId"
                    required
                    value={formData.classId}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-50 border-transparent rounded-2xl font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-amber-50 focus:border-amber-100 transition-all appearance-none cursor-pointer shadow-inner"
                  >
                    <option value="">Choose class...</option>
                    {classes.map((cls) => (
                      <option key={cls._id} value={cls._id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                </div>
              </div>

              {formData.type === "assignment" && (
                <div className="space-y-2.5 animate-in slide-in-from-right-4 duration-500">
                  <label className="text-[11px] font-bold text-rose-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Calendar size={12} /> Submission Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    required
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full p-4 bg-rose-50 border-transparent rounded-2xl font-bold text-rose-700 outline-none focus:bg-white focus:ring-4 focus:ring-rose-100 focus:border-rose-200 transition-all shadow-inner"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ═══════════ FILE UPLOAD AREA ═══════════ */}
          <div className="relative group overflow-hidden">
            <div className={`absolute inset-0 bg-cyan-600 rounded-[2.5rem] opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            <div className="border-4 border-dashed border-slate-100 p-12 bg-white rounded-[2.5rem] text-center hover:border-cyan-400 hover:bg-cyan-50 transition-all duration-300 relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-cyan-100">
              <input
                type="file"
                name="file"
                required
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="w-20 h-20 bg-cyan-50 text-cyan-600 rounded-[1.75rem] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                   <Plus size={40} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {formData.file ? `Selected: ${formData.file.name}` : "Drop files here or click to select"}
                  </p>
                  <p className="text-sm font-medium text-slate-400 mt-2">
                    Acceptable formats: PDF, DOCX, or high-resolution images
                  </p>
                </div>
                {formData.file && (
                  <div className="mt-4 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Check size={12} strokeWidth={3} /> File Ready for Submission
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ═══════════ SUBMIT BUTTON ═══════════ */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full group flex items-center justify-center gap-4 p-8 rounded-[2.5rem] font-extrabold uppercase tracking-widest text-xl transition-all duration-300 shadow-xl
                ${loading
                  ? "text-slate-300 cursor-not-allowed bg-slate-900 hover:bg-cyan-500 "
                  : "text-white bg-slate-900 hover:bg-cyan-600 hover:scale-[1.02] shadow-slate-200"
                }`}
            >
              {loading ? (
                <>
                  <Loader2 size={28} className="animate-spin" />
                  Finalizing Content...
                </>
              ) : (
                <>
                  <Upload size={28} className="group-hover:-translate-y-1 transition-transform hover:bg-cyan-500 duration-300 ease-in-out" />
                  Submit to Academic Roster
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center pt-14">
        <div className="bg-white px-6 py-2 rounded-full border border-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Secure University Content Delivery Protocol — Srinivasa University
        </div>
      </div>
    </div>
  );
}