"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Users, 
  Calendar, 
  Ticket, 
  ArrowRight, 
  X, 
  Loader2,
  Image as ImageIcon,
  Check,
  ChevronDown,
  Clock,
  Sparkles,
  MapPin,
  Circle
} from "lucide-react";

/**
 * Faculty Events Management Page
 * Professional EduWay Aesthetic - Cyan/Indigo Theme
 * Optimized for real data and mobile responsiveness.
 */
export default function FacultyEventsPage() {
  const [students, setStudents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [registrations, setRegistrations] = useState([]); 

  const [form, setForm] = useState({
    title: "",
    description: "",
    isPaid: false,
    maxSeats: "",
    registrationDeadline: "",
    eventDate: "",
    studentCoordinator: "",
    image: null,
  });


  useEffect(() => {
    fetchStudents();
    fetchMyEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      fetchEventRegistrations(selectedEvent._id);
    }
  }, [selectedEvent]);

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/faculty/students?status=approved");
      const data = await res.json();
      setStudents(data.students || []);
    } catch (err) {
      console.error("Student fetch error", err);
    }
  };

  const fetchMyEvents = async () => {
    try {
      const res = await fetch("/api/faculty/my-events");
      const data = await res.json();
      setMyEvents(data.events || []);
    } catch (err) {
      console.error("Events fetch error", err);
    }
  };

  const fetchEventRegistrations = async (eventId) => {
    try {
      const res = await fetch(`/api/faculty/event-registrations?eventId=${eventId}`);
      const data = await res.json();
      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error("Registrations fetch error", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    try {
      const res = await fetch("/api/faculty/create-event", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message);
      setLoading(false);
      if (res.ok) {
        setForm({ title: "", description: "", isPaid: false, maxSeats: "", registrationDeadline: "", eventDate: "", studentCoordinator: "", image: null });
        fetchMyEvents();
      }
    } catch (err) {
      console.error("Submit error", err);
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

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* ═══════════ HEADER ═══════════ */}
        <div className="relative overflow-hidden bg-cyan-500 text-white p-8 md:p-14 rounded-3xl md:rounded-[3rem] shadow-xl shadow-slate-200">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/10">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Campus Event Hub</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              Manage Events
            </h1>
            <p className="max-w-xl mt-6 font-medium text-black leading-relaxed text-sm md:text-base opacity-90">
              Create, track, and manage student participation in academic and extra-curricular events. 
              Monitor real-time registrations and coordinate schedules.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ═══════════ LEFT COLUMN: FORM ═══════════ */}
          <div className="lg:w-[400px] shrink-0">
            <div className="lg:sticky lg:top-8 bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col h-fit">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Plus size={22} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Host New Event</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Event Title</label>
                  <input name="title" value={form.title} placeholder="e.g. Science Symposium" required onChange={handleChange}
                    className="w-full bg-slate-50 border-transparent rounded-2xl p-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-slate-300" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea name="description" value={form.description} placeholder="Key objectives and details..." required onChange={handleChange}
                    className="w-full bg-slate-50 border-transparent rounded-2xl p-4 text-sm font-medium text-slate-700 h-28 focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-slate-300 resize-none custom-scrollbar" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Registration Deadline</label>
                    <input type="date" name="registrationDeadline" value={form.registrationDeadline} required onChange={handleChange}
                      className="w-full bg-slate-50 border-transparent rounded-xl p-3 text-xs font-bold text-slate-700 outline-none focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Event Schedule</label>
                    <input type="date" name="eventDate" value={form.eventDate} required onChange={handleChange}
                      className="w-full bg-slate-50 border-transparent rounded-xl p-3 text-xs font-bold text-slate-700 outline-none focus:bg-white transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Capacity</label>
                    <input type="number" name="maxSeats" value={form.maxSeats} placeholder="Total Seats" required onChange={handleChange}
                      className="w-full bg-slate-50 border-transparent rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:bg-white transition-all" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Pricing Model</label>
                    <div className="flex items-center justify-between bg-slate-50 border border-transparent rounded-xl p-3 px-4">
                       <label className="text-[10px] font-bold uppercase text-slate-500">Paid Event?</label>
                       <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="isPaid" checked={form.isPaid} onChange={handleChange} className="sr-only peer" />
                        <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Student Coordinator</label>
                  <div className="relative">
                    <select name="studentCoordinator" value={form.studentCoordinator} required onChange={handleChange}
                      className="w-full bg-slate-50 border-transparent rounded-xl p-3.5 text-sm font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:bg-white transition-all">
                      <option value="">Select student...</option>
                      {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Banner Image</label>
                  <div className="relative flex items-center justify-center border-2 border-dashed border-slate-100 bg-slate-50 rounded-2xl p-4 hover:bg-slate-100 transition-colors group">
                    <input type="file" name="image" required onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="text-center">
                       <ImageIcon size={20} className="mx-auto text-slate-300 mb-1 group-hover:text-indigo-500 transition-colors" />
                       <p className="text-[10px] font-bold text-slate-400 uppercase truncate max-w-[150px]">
                        {form.image ? form.image.name : "Choose File"}
                       </p>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-slate-200 hover:bg-indigo-600 hover:scale-[1.02] active:scale-100 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                  {loading ? <Loader2 size={18} className="animate-spin" /> : (
                    <>
                      Launch Event
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ═══════════ RIGHT COLUMN: LIST ═══════════ */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-indigo-500">
                  <Calendar size={22} />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Roster</h2>
              </div>
              <div className="bg-white px-4 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {myEvents.length} Total Events
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myEvents.map((event) => (
                <div key={event._id} onClick={() => setSelectedEvent(event)}
                  className="group bg-white border border-gray-100 rounded-[2.5rem] p-6 flex flex-col gap-6 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all md:hover:-translate-y-1 relative overflow-hidden">
                  
                  <div className="relative h-44 w-full rounded-3xl overflow-hidden shadow-inner">
                    <img src={event.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={event.title} />
                    <div className="absolute top-4 right-4">
                       <span className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md border border-white/20 shadow-sm ${event.isPaid ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'}`}>
                          {event.isPaid ? "Paid" : "Free"}
                       </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-slate-900 text-white px-3 py-1.5 rounded-xl">
                        <Users size={12} className="text-indigo-400" /> {event.registeredCount} / {event.maxSeats}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest border border-slate-100 bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl">
                        <Clock size={12} /> {new Date(event.eventDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analytics Dashboard</span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              ))}

              {myEvents.length === 0 && (
                <div className="md:col-span-2 bg-white border border-gray-100 rounded-[3rem] p-20 text-center shadow-sm">
                   <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Calendar size={40} className="text-slate-200" />
                   </div>
                   <p className="text-xl font-bold text-slate-900 mb-2 tracking-tight uppercase">No Scheduled Events</p>
                   <p className="text-slate-400 font-medium text-sm">Your event calendar is currently empty. Start by creating a new event.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ EVENT DETAIL MODAL ═══════════ */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedEvent(null)} />
          <div className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh]">
            
            {/* Modal Left: Sidebar Info */}
            <div className="md:w-[350px] bg-slate-900 text-white p-10 flex flex-col shrink-0 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 blur-3xl pointer-events-none" />
              <button onClick={() => setSelectedEvent(null)} className="mb-10 p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all self-start">
                <X size={20} />
              </button>
              
              <div className="flex-1 space-y-8 relative z-10">
                <div>
                   <div className="p-3 bg-white/10 border border-white/10 rounded-2xl w-fit mb-6">
                      <Ticket size={24} className="text-amber-400" />
                   </div>
                   <h3 className="text-3xl font-extrabold tracking-tight mb-4 leading-tight">{selectedEvent.title}</h3>
                   <p className="text-sm font-medium text-slate-400 leading-relaxed">{selectedEvent.description}</p>
                </div>
                
                <div className="space-y-4 pt-8 border-t border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                         <Circle size={8} fill="currentColor" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{selectedEvent.isPaid ? "Paid Attendance" : "Open Admission"}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                         <MapPin size={16} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Campus Auditorium</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Modal Right: Student Registry */}
            <div className="flex-1 p-10 flex flex-col min-h-0 bg-white">
              <div className="flex items-center justify-between mb-10">
                 <div>
                    <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">Registration Desk</h4>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Enrolled Participants</p>
                 </div>
                 <div className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                    {registrations.length} Verified
                 </div>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                {registrations.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                     <Users size={40} className="text-slate-100 mb-4" />
                     <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">Awaiting First Enrollment</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {registrations.map((reg, idx) => (
                      <div key={reg._id} className="group flex items-center justify-between p-4 bg-slate-50 border border-transparent hover:border-indigo-100 hover:bg-white rounded-2xl transition-all">
                        <div className="flex items-center gap-5">
                          <span className="w-10 h-10 flex items-center justify-center bg-white text-slate-400 font-extrabold rounded-xl text-xs shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">{idx + 1}</span>
                          <div>
                            <p className="font-extrabold text-slate-900 text-sm tracking-tight">{reg.student.name}</p>
                            <p className="text-[11px] font-semibold text-slate-400 tracking-tight">{reg.student.email} • USN: {reg.student.usn}</p>
                          </div>
                        </div>
                        <button className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-emerald-500 hover:border-emerald-100 transition-all">
                          <Check size={16} strokeWidth={3} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}