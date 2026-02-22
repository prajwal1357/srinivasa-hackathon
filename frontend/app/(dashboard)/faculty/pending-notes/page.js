"use client";

import React, { useEffect, useState } from "react";
import { 
  Check, 
  X, 
  ExternalLink, 
  FileText, 
  User, 
  BookOpen, 
  Clock, 
  AlertCircle, 
  AtomIcon,
  Loader2,
  ChevronRight,
  ShieldCheck,
  Search,
  Layers,
  Sparkles,
  Info
} from "lucide-react";

import axios from "axios";


export default function PendingNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [aiProcessingId, setAiProcessingId] = useState(null);

const fetchNotes = async () => {
  try {
    const res = await fetch("/api/faculty/pending-notes");
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    setNotes(data.notes || []);
  } catch (error) {
    console.error("Fetch error:", error);
    setNotes([]); // just set empty instead of mock data
  } finally {
    setLoading(false);
  }
};

  const fetchAi = async (noteId, fileUrl) => {
    setAiProcessingId(noteId);
    try {
      // Logic preserved from user snippet
      await axios.post("http://127.0.0.1:8000/Ai/FileReview", {
        doc_name: noteId,
        doc_valid: true,
        doc_link: fileUrl
      });
      // In a real scenario, you'd handle the response here
    } catch (err) {
      console.error("AI error:", err);
    } finally {
      setAiProcessingId(null);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleReview = async (noteId, status) => {
    setProcessingId(noteId);
    try {
      const res = await fetch("/api/faculty/review-note", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId, status }),
      });

      const data = await res.json();
      if (res.ok) {
        setNotes((prev) => prev.filter((n) => n._id !== noteId));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Review error:", error);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={48} className="animate-spin text-indigo-500" strokeWidth={2} />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">Loading Review Queue</p>
      </div>
    );
  }

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

      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        
        {/* ═══════════ HEADER ═══════════ */}
        <div className="relative overflow-hidden bg-slate-900 text-white p-8 md:p-14 rounded-3xl md:rounded-[3rem] shadow-xl shadow-slate-200">
          <div className="absolute top-0 right-0 w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-indigo-500/10 blur-[80px] md:blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-emerald-500/10 blur-[60px] md:blur-[80px] rounded-full -translate-x-1/4 translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-6 md:mb-8 border border-white/10">
              <ShieldCheck size={14} className="text-indigo-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">Quality Assurance</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              Pending Notes
            </h1>
            <p className="max-w-xl mt-4 md:mt-6 font-medium text-slate-400 leading-relaxed text-xs md:text-base opacity-90">
              {notes.length} documents are currently in the moderation queue. Review and approve student-contributed resources to make them visible to the class.
            </p>
          </div>
        </div>

        {/* ═══════════ CONTENT ═══════════ */}
        {notes.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl md:rounded-[3rem] p-12 md:p-20 text-center shadow-sm">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-emerald-50 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-500">
               <Check size={40} strokeWidth={3} />
            </div>
            <p className="text-xl md:text-2xl font-bold text-slate-900 mb-2 tracking-tight uppercase">Review Queue Empty</p>
            <p className="text-slate-400 font-medium text-xs md:text-sm">Great work! All student resources have been processed.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="group bg-white border border-gray-100 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all md:hover:-translate-y-1 relative"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left Side: Metadata */}
                  <div className="flex-1 p-6 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-4">
                           <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                              <FileText size={20} />
                           </div>
                           <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight truncate leading-tight">
                            {note.title}
                          </h2>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                          <span className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-wider">
                            <BookOpen size={14} /> {note.subject}
                          </span>
                          <span className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-wider">
                            SEM {note.semester}
                          </span>
                          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-wider border border-emerald-100">
                            UNIT {note.unit}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 pt-6 border-t border-slate-50">
                          <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-slate-500">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                               <User size={16} />
                            </div>
                            <span>By: <span className="text-slate-900">{note.uploadedBy?.name || "Anonymous"}</span></span>
                          </div>
                          <div className="flex items-center gap-3 text-xs md:text-sm font-semibold text-slate-500">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                               <Layers size={16} />
                            </div>
                            <span>Target: <span className="text-slate-900">{note.class?.name || "Global"}</span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Actions (EduWay Integrated Style) */}
                  <div className="bg-slate-50/50 p-6 md:p-10 flex flex-col justify-center gap-4 lg:min-w-[280px] lg:border-l border-slate-100">
                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 bg-white border border-gray-100 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-600 shadow-sm hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-100"
                    >
                      Preview File <ExternalLink size={16} className="text-slate-300" />
                    </a>

                    <div className="grid grid-cols-3 gap-3">
                      <button
                        disabled={processingId === note._id}
                        onClick={() => handleReview(note._id, "approved")}
                        title="Approve Content"
                        className="flex items-center justify-center bg-slate-900 text-white py-4 rounded-2xl font-bold transition-all hover:bg-emerald-600 hover:scale-[1.05] disabled:opacity-50 shadow-lg shadow-slate-200"
                      >
                        {processingId === note._id ? <Loader2 size={18} className="animate-spin" /> : <Check size={22} strokeWidth={2.5} />}
                      </button>

                      <button
                        disabled={processingId === note._id}
                        onClick={() => handleReview(note._id, "rejected")}
                        title="Reject Content"
                        className="flex items-center justify-center bg-white border border-rose-100 text-rose-500 py-4 rounded-2xl font-bold transition-all hover:bg-rose-500 hover:text-white hover:scale-[1.05] disabled:opacity-50 shadow-sm"
                      >
                        {processingId === note._id ? <Loader2 size={18} className="animate-spin" /> : <X size={22} strokeWidth={2.5} />}
                      </button>

                      <button
                        onClick={() => fetchAi(note._id, note.fileUrl)}
                        disabled={aiProcessingId === note._id}
                        title="AI Analysis"
                        className={`flex items-center justify-center py-4 rounded-2xl font-bold transition-all hover:scale-[1.05] shadow-sm
                          ${aiProcessingId === note._id ? 'bg-indigo-50 text-indigo-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'}
                        `}
                      >
                        {aiProcessingId === note._id ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          <AtomIcon size={22} strokeWidth={2} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ═══════════ FOOTER INFO ═══════════ */}
      <div className="flex items-center justify-center pt-14 text-center">
        <div className="bg-white px-6 py-2.5 rounded-full border border-gray-100 flex items-center gap-3 shadow-sm">
          <Sparkles size={16} className="text-amber-400" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            AI-Enhanced Moderation System // SECURE FACULTY NODE
          </p>
        </div>
      </div>
    </div>
  );
}