"use client";
import React, { useEffect, useState, useMemo } from "react";
import { ChevronRight, Folder, FileText, BookOpen, Layers, Home } from "lucide-react";

export default function App() {
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Navigation State
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      // Keeping original API call
      const res = await fetch("/api/student/notes");
      const data = await res.json();
      setNotes(data.notes || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Logic to derive lists based on selection
  const semesters = useMemo(() => Object.keys(notes).sort(), [notes]);

  const subjects = useMemo(() => {
    if (!selectedSemester || !notes[selectedSemester]) return [];
    const uniqueSubjects = [...new Set(notes[selectedSemester].map(n => n.subject))];
    return uniqueSubjects.sort();
  }, [notes, selectedSemester]);

  const units = useMemo(() => {
    if (!selectedSemester || !selectedSubject) return [];
    const filtered = notes[selectedSemester].filter(n => n.subject === selectedSubject);
    const uniqueUnits = [...new Set(filtered.map(n => n.unit))];
    return uniqueUnits.sort();
  }, [notes, selectedSemester, selectedSubject]);

  const filteredNotes = useMemo(() => {
    if (!selectedSemester || !selectedSubject || !selectedUnit) return [];
    return notes[selectedSemester].filter(
      n => n.subject === selectedSubject && n.unit === selectedUnit
    );
  }, [notes, selectedSemester, selectedSubject, selectedUnit]);

  // Breadcrumb handlers
  const resetAll = () => {
    setSelectedSemester(null);
    setSelectedSubject(null);
    setSelectedUnit(null);
  };

  const selectBreadcrumbSemester = () => {
    setSelectedSubject(null);
    setSelectedUnit(null);
  };

  const selectBreadcrumbSubject = () => {
    setSelectedUnit(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 min-h-screen bg-gray-50">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Study Resources</h1>
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm border border-gray-200 overflow-x-auto whitespace-nowrap">
          <button 
            onClick={resetAll}
            className={`flex items-center hover:text-blue-600 transition-colors ${!selectedSemester ? 'font-bold text-blue-600' : ''}`}
          >
            <Home size={16} className="mr-1" />
            Semesters
          </button>

          {selectedSemester && (
            <>
              <ChevronRight size={14} className="text-gray-400 shrink-0" />
              <button 
                onClick={selectBreadcrumbSemester}
                className={`hover:text-blue-600 transition-colors ${!selectedSubject ? 'font-bold text-blue-600' : ''}`}
              >
                Semester {selectedSemester}
              </button>
            </>
          )}

          {selectedSubject && (
            <>
              <ChevronRight size={14} className="text-gray-400 shrink-0" />
              <button 
                onClick={selectBreadcrumbSubject}
                className={`hover:text-blue-600 transition-colors ${!selectedUnit ? 'font-bold text-blue-600' : ''}`}
              >
                {selectedSubject}
              </button>
            </>
          )}

          {selectedUnit && (
            <>
              <ChevronRight size={14} className="text-gray-400 shrink-0" />
              <span className="font-bold text-blue-600">Unit {selectedUnit}</span>
            </>
          )}
        </nav>
      </header>

      <main>
        {/* VIEW 1: SEMESTERS */}
        {!selectedSemester && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {semesters.length === 0 ? (
              <p className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">No notes available yet.</p>
            ) : (
              semesters.map((sem) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group text-left"
                >
                  <div className="bg-blue-50 p-3 rounded-lg mr-4 group-hover:bg-blue-100 transition-colors">
                    <Folder className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <span className="block text-lg font-semibold text-gray-900">Semester {sem}</span>
                    <span className="text-sm text-gray-500">{notes[sem].length} files available</span>
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        {/* VIEW 2: SUBJECTS */}
        {selectedSemester && !selectedSubject && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all group text-left"
              >
                <div className="bg-indigo-50 p-3 rounded-lg mr-4 group-hover:bg-indigo-100 transition-colors">
                  <BookOpen className="text-indigo-600" size={24} />
                </div>
                <span className="text-lg font-semibold text-gray-900">{sub}</span>
              </button>
            ))}
          </div>
        )}

        {/* VIEW 3: UNITS */}
        {selectedSubject && !selectedUnit && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {units.map((unit) => (
              <button
                key={unit}
                onClick={() => setSelectedUnit(unit)}
                className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all group text-left"
              >
                <div className="bg-emerald-50 p-3 rounded-lg mr-4 group-hover:bg-emerald-100 transition-colors">
                  <Layers className="text-emerald-600" size={24} />
                </div>
                <span className="text-lg font-semibold text-gray-900">Unit {unit}</span>
              </button>
            ))}
          </div>
        )}

        {/* VIEW 4: NOTES */}
        {selectedUnit && (
          <div className="space-y-4">
            {filteredNotes.length === 0 ? (
              <p className="text-center py-12 text-gray-500">No notes found for this unit.</p>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note._id}
                  className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="bg-gray-50 p-3 rounded-lg mr-4 shrink-0">
                      <FileText className="text-gray-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{note.title}</h3>
                      <div className="flex flex-wrap gap-x-4 mt-1">
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Subject:</span> {note.subject}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Unit:</span> {note.unit}
                        </p>
                      </div>
                      {note.uploadedBy?.name && (
                        <p className="text-xs text-blue-600 mt-2 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5"></span>
                          Uploaded by {note.uploadedBy.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center bg-gray-900 text-white hover:bg-gray-800 px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    View Document
                  </a>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}