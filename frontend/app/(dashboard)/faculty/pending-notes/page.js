"use client";
import { useEffect, useState } from "react";
import { 
  Check, 
  X, 
  ExternalLink, 
  FileText, 
  User, 
  BookOpen, 
  Clock, 
  AlertCircle 
} from "lucide-react";

export default function PendingNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/faculty/pending-notes");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setNotes(data.notes || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
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
        // Optimistic UI update: remove the note from the list immediately
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
      <div className="p-8 animate-pulse">
        <div className="h-12 w-64 bg-black/10 rounded-xl mb-8" />
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 w-full border-4 border-black/10 rounded-[2rem]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {/* Header Section */}
      <header className="mb-12 border-b-8 border-black pb-6">
        <div className="inline-block px-4 py-1 bg-[#FDE047] border-2 border-black rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          Faculty / Review Queue
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
          Pending Notes
        </h1>
        <p className="text-sm font-bold text-black/40 mt-2 uppercase italic">
          {notes.length} Documents awaiting verification
        </p>
      </header>

      {notes.length === 0 ? (
        <div className="border-8 border-dashed border-black/10 rounded-[3rem] p-20 text-center bg-white/50">
          <div className="inline-flex p-6 bg-white border-4 border-black rounded-full mb-6">
            <Check size={48} className="text-green-500" strokeWidth={3} />
          </div>
          <p className="font-black uppercase text-black/20 text-3xl tracking-tighter italic">
            All caught up! No pending notes.
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          {notes.map((note) => (
            <div
              key={note._id}
              className="group bg-white border-4 border-black rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Side: Metadata Info */}
                <div className="flex-1 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black uppercase italic leading-none mb-2">
                        {note.title}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        <span className="flex items-center gap-1 bg-[#FDE047] border-2 border-black px-2 py-0.5 rounded-md text-[10px] font-black uppercase">
                          <BookOpen size={12} /> {note.subject}
                        </span>
                        <span className="flex items-center gap-1 bg-black text-white px-2 py-0.5 rounded-md text-[10px] font-black uppercase">
                          SEM {note.semester}
                        </span>
                        <span className="flex items-center gap-1 border-2 border-black px-2 py-0.5 rounded-md text-[10px] font-black uppercase">
                          UNIT {note.unit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 italic">
                      <User size={16} strokeWidth={3} />
                      <span>By: {note.uploadedBy?.name || "Unknown Student"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 italic">
                      <Clock size={16} strokeWidth={3} />
                      <span>Class: {note.class?.name || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Actions */}
                <div className="bg-slate-50 border-t-4 md:border-t-0 md:border-l-4 border-black p-8 flex flex-col justify-center gap-4 min-w-[240px]">
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-white border-4 border-black py-3 rounded-xl font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-indigo-50 transition-all active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    Preview File <ExternalLink size={14} strokeWidth={3} />
                  </a>

                  <div className="flex gap-4">
                    <button
                      disabled={processingId === note._id}
                      onClick={() => handleReview(note._id, "approved")}
                      className="flex-1 bg-green-400 border-4 border-black py-3 rounded-xl font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50"
                    >
                      {processingId === note._id ? "..." : <Check className="mx-auto" size={20} strokeWidth={3} />}
                    </button>

                    <button
                      disabled={processingId === note._id}
                      onClick={() => handleReview(note._id, "rejected")}
                      className="flex-1 bg-rose-400 border-4 border-black py-3 rounded-xl font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50"
                    >
                      {processingId === note._id ? "..." : <X className="mx-auto" size={20} strokeWidth={3} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Legend Footer */}
      <footer className="mt-12 flex items-center gap-4 bg-white border-4 border-black p-4 rounded-2xl w-fit shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <AlertCircle size={20} className="text-amber-500" />
        <p className="text-[10px] font-black uppercase italic tracking-widest">
          Approved notes will be instantly visible to all students in the assigned class.
        </p>
      </footer>
    </div>
  );
}