"use client";
import { useEffect, useState, useMemo } from "react";
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
} from "lucide-react";

export default function StudentViewNotes() {
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Navigation State
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

  // Derive lists based on selection
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

  // Navigation helpers
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

  // Current view title
  const getViewTitle = () => {
    if (selectedUnit !== null) return `Unit ${selectedUnit}`;
    if (selectedSubject) return selectedSubject;
    if (selectedSemester) return `Semester ${selectedSemester}`;
    return "All Semesters";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={48} className="animate-spin text-black" strokeWidth={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-[#FDA4AF] border-4 border-black rounded-3xl p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center font-mono">
          <FileText size={48} strokeWidth={3} className="mx-auto mb-4" />
          <p className="font-black text-lg uppercase">{error}</p>
        </div>
      </div>
    );
  }

  const folderColors = ["bg-[#01FFFF]", "bg-[#FF71CE]", "bg-[#FFD600]", "bg-[#05FFA1]", "bg-[#CCFBF1]", "bg-[#C4B5FD]", "bg-[#FFEDD5]", "bg-[#FDA4AF]"];

  return (
    <div className="space-y-8 font-mono animate-in fade-in duration-500">

      {/* Header */}
      <div className="relative overflow-hidden bg-[#05FFA1] border-4 border-black p-8 rounded-[2rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute top-5 right-8 w-28 h-8 bg-[#1E293B] border-2 border-black rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-[10px] uppercase text-white hidden md:flex">
          Study Hub
        </div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="bg-white p-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-3 rounded-xl">
            <BookOpen size={36} strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Study Resources
            </h1>
            <p className="font-black uppercase text-xs mt-2 tracking-widest opacity-60">
              Browse approved notes & materials
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb + Back Button */}
      <div className="flex items-center gap-3">
        {selectedSemester && (
          <button onClick={goBack}
            className="p-3 bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
            <ArrowLeft size={18} strokeWidth={3} />
          </button>
        )}

        <nav className="flex items-center gap-2 text-sm bg-white border-4 border-black rounded-xl px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-x-auto flex-1">
          <button onClick={resetAll}
            className={`flex items-center gap-1 font-black text-xs uppercase whitespace-nowrap hover:text-blue-600 transition-colors ${!selectedSemester ? "text-black" : "text-gray-400"}`}>
            <Home size={14} strokeWidth={3} />
            Semesters
          </button>

          {selectedSemester && (
            <>
              <ChevronRight size={14} className="text-gray-300 shrink-0" />
              <button
                onClick={() => { setSelectedSubject(null); setSelectedUnit(null); }}
                className={`font-black text-xs uppercase whitespace-nowrap hover:text-blue-600 transition-colors ${selectedSemester && !selectedSubject ? "text-black" : "text-gray-400"}`}>
                Sem {selectedSemester}
              </button>
            </>
          )}

          {selectedSubject && (
            <>
              <ChevronRight size={14} className="text-gray-300 shrink-0" />
              <button
                onClick={() => setSelectedUnit(null)}
                className={`font-black text-xs uppercase whitespace-nowrap hover:text-blue-600 transition-colors ${selectedSubject && selectedUnit === null ? "text-black" : "text-gray-400"}`}>
                {selectedSubject}
              </button>
            </>
          )}

          {selectedUnit !== null && (
            <>
              <ChevronRight size={14} className="text-gray-300 shrink-0" />
              <span className="font-black text-xs uppercase text-black whitespace-nowrap">Unit {selectedUnit}</span>
            </>
          )}
        </nav>
      </div>

      {/* CONTENT AREA */}
      <main>

        {/* VIEW 1: SEMESTERS */}
        {!selectedSemester && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {semesters.length === 0 ? (
              <div className="col-span-full bg-white border-4 border-black rounded-3xl p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                <BookOpen size={48} strokeWidth={3} className="mx-auto mb-4 text-gray-300" />
                <p className="font-black text-lg uppercase text-gray-400">No notes available yet</p>
                <p className="font-bold text-xs text-gray-300 uppercase mt-2">Notes will appear here once uploaded and approved</p>
              </div>
            ) : (
              semesters.map((sem, i) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className={`${folderColors[i % folderColors.length]} group text-left border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all`}
                >
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 bg-white border-3 border-black rounded-xl flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform">
                      <Folder size={24} strokeWidth={3} />
                    </div>
                    <ChevronRight size={18} strokeWidth={3} className="mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-black text-xl uppercase tracking-tight">Semester {sem}</h3>
                  <p className="font-bold text-[11px] uppercase text-black/50 mt-1">
                    {notes[sem].length} resource{notes[sem].length !== 1 ? "s" : ""}
                  </p>
                </button>
              ))
            )}
          </div>
        )}

        {/* VIEW 2: SUBJECTS */}
        {selectedSemester && !selectedSubject && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {subjects.length === 0 ? (
              <div className="col-span-full bg-white border-4 border-black rounded-3xl p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                <p className="font-black text-lg uppercase text-gray-400">No subjects found</p>
              </div>
            ) : (
              subjects.map((sub, i) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`${folderColors[(i + 2) % folderColors.length]} group text-left border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all`}
                >
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 bg-white border-3 border-black rounded-xl flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform">
                      <BookOpen size={24} strokeWidth={3} />
                    </div>
                    <ChevronRight size={18} strokeWidth={3} className="mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-black text-lg uppercase tracking-tight">{sub}</h3>
                </button>
              ))
            )}
          </div>
        )}

        {/* VIEW 3: UNITS */}
        {selectedSubject && selectedUnit === null && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {units.length === 0 ? (
              <div className="col-span-full bg-white border-4 border-black rounded-3xl p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                <p className="font-black text-lg uppercase text-gray-400">No units found</p>
              </div>
            ) : (
              units.map((unit, i) => (
                <button
                  key={unit}
                  onClick={() => setSelectedUnit(unit)}
                  className={`${folderColors[(i + 4) % folderColors.length]} group text-left border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all`}
                >
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 bg-white border-3 border-black rounded-xl flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform">
                      <Layers size={24} strokeWidth={3} />
                    </div>
                    <ChevronRight size={18} strokeWidth={3} className="mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-black text-xl uppercase tracking-tight">Unit {unit}</h3>
                </button>
              ))
            )}
          </div>
        )}

        {/* VIEW 4: NOTES LIST */}
        {selectedUnit !== null && (
          <div className="space-y-4">
            {filteredNotes.length === 0 ? (
              <div className="bg-white border-4 border-black rounded-3xl p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                <FileText size={48} strokeWidth={3} className="mx-auto mb-4 text-gray-300" />
                <p className="font-black text-lg uppercase text-gray-400">No notes in this unit</p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note._id}
                  className="bg-white border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 w-12 h-12 rounded-xl border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                        note.uploaderRole === "student" ? "bg-[#FFEDD5]" : "bg-[#DBEAFE]"
                      }`}>
                        <FileText size={22} strokeWidth={3} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-lg uppercase tracking-tight">{note.title}</h3>
                          {note.uploaderRole === "student" && (
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-[#FFEDD5] border-2 border-black rounded-lg flex items-center gap-1">
                              <GraduationCap size={10} strokeWidth={3} />
                              Student
                            </span>
                          )}
                        </div>

                        {note.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{note.description}</p>
                        )}

                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="text-[10px] font-black uppercase text-gray-400">
                            {note.subject} • Unit {note.unit}
                          </span>
                          {note.uploadedBy?.name && (
                            <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                              <UserCircle size={11} strokeWidth={3} />
                              {note.uploadedBy.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 bg-[#1E293B] text-white border-4 border-black rounded-xl font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                      <ExternalLink size={14} strokeWidth={3} />
                      View
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}