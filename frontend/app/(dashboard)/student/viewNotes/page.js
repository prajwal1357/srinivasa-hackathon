"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  ChevronRight,
  Folder,
  FileText,
  BookOpen,
  Layers,
  Home,
  UserCircle,
  Loader2,
  ArrowLeft,
  ExternalLink,
  GraduationCap,
  Search,
  Sparkles,
  Clock,
  Info
} from "lucide-react";


export default function StudentViewNotes() {
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Navigation State Logic (Preserved)
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/student/notes");
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load notes");
        return;
      }

      setNotes(data.notes || {});
    } catch (err) {
      console.error(err);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // Memoized Logic (Preserved)
  const semesters = useMemo(() => Object.keys(notes).sort((a, b) => Number(a) - Number(b)), [notes]);

  const subjects = useMemo(() => {
    if (!selectedSemester || !notes[selectedSemester]) return [];
    const uniqueSubjects = [...new Set(notes[selectedSemester].map((n) => n.subject))];
    return uniqueSubjects.sort();
  }, [notes, selectedSemester]);

  const units = useMemo(() => {
    if (!selectedSemester || !selectedSubject) return [];
    const filtered = notes[selectedSemester].filter((n) => n.subject === selectedSubject);
    const uniqueUnits = [...new Set(filtered.map((n) => Number(n.unit)))];
    return uniqueUnits.sort((a, b) => a - b);
  }, [notes, selectedSemester, selectedSubject]);

  const filteredNotes = useMemo(() => {
    if (!selectedSemester || !selectedSubject || selectedUnit === null) return [];
    return notes[selectedSemester].filter(
      (n) => n.subject === selectedSubject && Number(n.unit) === Number(selectedUnit)
    );
  }, [notes, selectedSemester, selectedSubject, selectedUnit]);

  // Navigation helpers (Preserved)
  const goBack = () => {
    if (selectedUnit !== null) {
      setSelectedUnit(null);
    } else if (selectedSubject) {
      setSelectedSubject(null);
    } else if (selectedSemester) {
      setSelectedSemester(null);
    }
  };

  const resetAll = () => {
    setSelectedSemester(null);
    setSelectedSubject(null);
    setSelectedUnit(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={48} className="animate-spin text-[#F97316]" strokeWidth={2} />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">Accessing Library</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8 animate-fade-in">
        <div className="bg-rose-50 border border-rose-100 rounded-[2rem] p-10 text-center">
          <FileText size={48} className="mx-auto mb-4 text-rose-400" />
          <p className="font-bold text-slate-900 text-lg uppercase tracking-tight">{error}</p>
          <button onClick={fetchNotes} className="mt-4 text-sm font-bold text-rose-600 hover:underline">Try Again</button>
        </div>
      </div>
    );
  }

  // Refined EduWay palette variants
  const folderGradients = [
    "from-orange-50 to-white border-orange-100 text-orange-700",
    "from-blue-50 to-white border-blue-100 text-blue-700",
    "from-emerald-50 to-white border-emerald-100 text-emerald-700",
    "from-indigo-50 to-white border-indigo-100 text-indigo-700",
    "from-amber-50 to-white border-amber-100 text-amber-700",
    "from-violet-50 to-white border-violet-100 text-violet-700",
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ═══════════ CSS INJECTOR ═══════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

      {/* ═══════════ HERO HEADER ═══════════ */}
      <div className="relative overflow-hidden bg-slate-900 text-white p-10 md:p-14 rounded-3xl md:rounded-[3rem] shadow-xl shadow-slate-200">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/2" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/10">
            <Sparkles size={14} className="text-[#F97316] fill-[#F97316]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Digital Library</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Study Resources
          </h1>
          <p className="max-w-xl mt-6 font-medium text-slate-400 leading-relaxed text-sm md:text-base opacity-90">
            Navigate through curated academic materials. Access approved notes, assignments, and reference guides organized by semester and unit.
          </p>
        </div>
      </div>

      {/* ═══════════ NAVIGATION / BREADCRUMBS ═══════════ */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        {selectedSemester && (
          <button onClick={goBack}
            className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-400 hover:text-[#F97316] hover:bg-orange-50 transition-all group shrink-0">
            <ArrowLeft size={20} className="group-active:-translate-x-1 transition-transform" />
          </button>
        )}

        <nav className="flex items-center gap-1 text-sm bg-white border border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm overflow-x-auto custom-scrollbar w-full">
          <button onClick={resetAll}
            className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${!selectedSemester ? "text-[#F97316]" : "text-slate-400 hover:text-slate-600"}`}>
            <Home size={14} />
            Library
          </button>

          {selectedSemester && (
            <>
              <ChevronRight size={14} className="text-slate-200 shrink-0 mx-1" />
              <button
                onClick={() => { setSelectedSubject(null); setSelectedUnit(null); }}
                className={`font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${selectedSemester && !selectedSubject ? "text-[#F97316]" : "text-slate-400 hover:text-slate-600"}`}>
                Sem {selectedSemester}
              </button>
            </>
          )}

          {selectedSubject && (
            <>
              <ChevronRight size={14} className="text-slate-200 shrink-0 mx-1" />
              <button
                onClick={() => setSelectedUnit(null)}
                className={`font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${selectedSubject && selectedUnit === null ? "text-[#F97316]" : "text-slate-400 hover:text-slate-600"}`}>
                {selectedSubject}
              </button>
            </>
          )}

          {selectedUnit !== null && (
            <>
              <ChevronRight size={14} className="text-slate-200 shrink-0 mx-1" />
              <span className="font-bold text-xs uppercase tracking-widest text-[#F97316] whitespace-nowrap">Unit {selectedUnit}</span>
            </>
          )}
        </nav>
      </div>

      {/* ═══════════ CONTENT AREA ═══════════ */}
      <main className="min-h-[400px]">

        {/* VIEW 1: SEMESTERS */}
        {!selectedSemester && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {semesters.length === 0 ? (
              <div className="col-span-full bg-white border border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
                  <BookOpen size={40} />
                </div>
                <p className="font-bold text-xl text-slate-900 mb-2">No Resources Found</p>
                <p className="text-slate-400 text-sm font-medium">Materials will populate here once verified by faculty.</p>
              </div>
            ) : (
              semesters.map((sem, i) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className={`group relative overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] p-8 text-left shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 bg-orange-50 text-[#F97316] rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Folder size={28} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
                       <ChevronRight size={18} />
                    </div>
                  </div>
                  <h3 className="font-extrabold text-2xl text-slate-900 tracking-tight">Semester {sem}</h3>
                  <p className="font-bold text-[11px] uppercase tracking-[0.15em] text-slate-400 mt-2 flex items-center gap-1.5">
                    <Layers size={12} /> {notes[sem].length} Resources
                  </p>
                </button>
              ))
            )}
          </div>
        )}

        {/* VIEW 2: SUBJECTS */}
        {selectedSemester && !selectedSubject && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {subjects.map((sub, i) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 text-left shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        <BookOpen size={26} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject Module</p>
                        <h3 className="font-extrabold text-xl text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{sub}</h3>
                      </div>
                   </div>
                   <ChevronRight size={20} className="text-slate-200 group-hover:text-slate-400 transition-colors mr-2" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* VIEW 3: UNITS */}
        {selectedSubject && selectedUnit === null && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {units.map((unit, i) => (
              <button
                key={unit}
                onClick={() => setSelectedUnit(unit)}
                className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 text-left shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center gap-5">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Layers size={32} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-2xl text-slate-900 tracking-tight">Unit {unit}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Section Module</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* VIEW 4: NOTES LIST */}
        {selectedUnit !== null && (
          <div className="grid gap-4">
            {filteredNotes.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-[3rem] p-20 text-center">
                <FileText size={48} className="mx-auto mb-4 text-slate-200" />
                <p className="font-bold text-lg text-slate-400 uppercase">No documents in this unit</p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note._id}
                  className="group bg-white border border-gray-100 rounded-3xl md:rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-start gap-6 min-w-0">
                      <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner transition-colors ${
                        note.uploaderRole === "student" ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600"
                      }`}>
                        <FileText size={28} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-extrabold text-xl text-slate-900 tracking-tight truncate leading-tight group-hover:text-orange-500 transition-colors">
                            {note.title}
                          </h3>
                          {note.uploaderRole === "student" && (
                            <span className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-amber-100 text-amber-700 rounded-lg flex items-center gap-1.5 border border-amber-200/50">
                              <GraduationCap size={10} />
                              Peer Share
                            </span>
                          )}
                        </div>

                        {note.description && (
                          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4 line-clamp-2">{note.description}</p>
                        )}

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-2">
                             <Layers size={14} className="text-slate-300" />
                             Unit {note.unit} • {note.subject}
                          </span>
                          {note.uploadedBy?.name && (
                            <span className="flex items-center gap-2">
                              <UserCircle size={14} className="text-slate-300" />
                              <span className="text-slate-500">{note.uploadedBy.name}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-[#F97316] transition-all hover:scale-[1.02] active:scale-100"
                    >
                      <ExternalLink size={16} strokeWidth={2.5} />
                      View Doc
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* ═══════════ FOOTER INFO ═══════════ */}
      <div className="flex items-center justify-center pt-14">
        <div className="bg-white px-6 py-2.5 rounded-full border border-gray-100 flex items-center gap-3 shadow-sm">
          <Info size={16} className="text-[#F97316]" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Approved resources are synchronized daily // Access Level: Standard Student
          </p>
        </div>
      </div>
    </div>
  );
}