"use client";

import React, { useState } from "react";
import { 
  Upload, 
  FileText, 
  BookOpen, 
  Layers, 
  Sparkles, 
  Loader2, 
  Info,
  ChevronRight,
  Plus,
  ArrowRight,
  File
} from "lucide-react";

/**
 * Student Upload Notes Page
 * Styled with the professional EduWay Orange aesthetic.
 * Logic is preserved exactly as provided in the original snippet.
 */
export default function StudentUploadPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    try {
      const res = await fetch("/api/student/upload-note", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      // Using standard alert as per original logic
      alert(data.message);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong during the upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animate-fade-in pb-20 px-4 md:px-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
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

      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* ═══════════ HERO HEADER ═══════════ */}
        <div className="relative overflow-hidden bg-slate-900 text-white p-10 md:p-14 rounded-3xl md:rounded-[3rem] shadow-xl shadow-slate-200">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/10">
              <Sparkles size={14} className="text-[#F97316] fill-[#F97316]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Resource Exchange</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Upload <span className="text-[#F97316]">Notes</span>
            </h1>
            <p className="max-w-lg mt-6 font-medium text-slate-400 leading-relaxed text-sm md:text-base opacity-90">
              Contribute to the academic community by sharing your study materials. Approved notes will be accessible to all students in your assigned class.
            </p>
          </div>
        </div>

        {/* ═══════════ UPLOAD FORM ═══════════ */}
        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
             <div className="flex items-center gap-4 mb-10">
                <div className="p-2.5 bg-orange-50 text-[#F97316] rounded-xl">
                  <FileText size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">Document Details</h2>
                  <p className="text-slate-400 text-xs mt-1 font-medium tracking-tight">Provide clear metadata for better organization.</p>
                </div>
             </div>

             <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Plus size={12} className="text-[#F97316]" /> Resource Title
                  </label>
                  <input
                    name="title"
                    placeholder="e.g. Thermodynamics Unit 1 Summary"
                    required
                    className="w-full p-4 bg-slate-50 border-transparent rounded-2xl font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all placeholder:text-slate-300 shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Info size={12} className="text-[#F97316]" /> Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Briefly describe what this note covers..."
                    rows="3"
                    className="w-full p-5 bg-slate-50 border-transparent rounded-[2rem] font-medium text-sm text-slate-700 leading-relaxed outline-none focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all placeholder:text-slate-300 custom-scrollbar shadow-inner resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <BookOpen size={12} className="text-[#F97316]" /> Subject
                    </label>
                    <input
                      name="subject"
                      placeholder="e.g. Physics"
                      required
                      className="w-full p-4 bg-slate-50 border-transparent rounded-2xl font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Layers size={12} className="text-[#F97316]" /> Semester
                    </label>
                    <input
                      type="number"
                      name="semester"
                      placeholder="1-8"
                      required
                      className="w-full p-4 bg-slate-50 border-transparent rounded-2xl font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Sparkles size={12} className="text-[#F97316]" /> Unit
                    </label>
                    <input
                      type="number"
                      name="unit"
                      placeholder="1-5"
                      required
                      className="w-full p-4 bg-slate-50 border-transparent rounded-2xl font-bold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all shadow-inner"
                    />
                  </div>
                </div>
             </div>
          </div>

          {/* ═══════════ FILE INPUT ZONE ═══════════ */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#F97316] rounded-[2.5rem] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            <div className="border-4 border-dashed border-slate-100 p-12 bg-white rounded-[2.5rem] text-center hover:border-[#F97316]/50 hover:bg-orange-50 transition-all duration-300 relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-orange-100">
              <input
                type="file"
                name="file"
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div className="flex flex-col items-center gap-5 relative z-10">
                <div className="w-20 h-20 bg-orange-50 text-[#F97316] rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                   <Upload size={40} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-slate-900 tracking-tight">Select Study Material</p>
                  <p className="text-sm font-medium text-slate-400 mt-2">PDF, images or documents are accepted.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ SUBMIT ACTION ═══════════ */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full group flex items-center justify-center gap-4 p-8 rounded-[2.5rem] font-extrabold uppercase tracking-widest text-lg transition-all duration-300 shadow-xl
                ${loading
                  ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-[#F97316] hover:scale-[1.02] shadow-slate-200"
                }`}
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Processing Upload...
                </>
              ) : (
                <>
                  <File size={22} className="group-hover:-translate-y-1 transition-transform" />
                  Finalize and Upload
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform opacity-30" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ═══════════ FOOTER INFO ═══════════ */}
      <div className="flex items-center justify-center pt-14 text-center">
        <div className="bg-white px-6 py-2.5 rounded-full border border-gray-100 flex items-center gap-3 shadow-sm">
          <Info size={16} className="text-[#F97316]" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Institutional Content Moderation Policy Applies to all uploads
          </p>
        </div>
      </div>
    </div>
  );
}