"use client";

import React, { useEffect, useState } from "react";
import { 
  X, 
  Ticket, 
  Users, 
  Calendar, 
  AlertCircle, 
  Zap, 
  Loader2, 
  MapPin, 
  Clock, 
  ArrowRight,
  Info,
  ChevronRight,
  Sparkles
} from "lucide-react";

/**
 * Student Events Page
 * Logic preserved exactly as provided.
 * UI updated to professional EduWay Orange theme with a refined modern look.
 */
export default function StudentEventsPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/student/events");
      const data = await res.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error("Fetch events error:", err);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/student/register-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: selectedEvent._id }),
      });

      const data = await res.json();
      alert(data.message);
      
      if (res.ok) {
        setSelectedEvent(null);
        fetchEvents();
      }
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in pb-20 px-4 md:px-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

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

      {/* ═══════════ HERO HEADER ═══════════ */}
      <div className="relative overflow-hidden bg-orange-500/90 text-white p-10 md:p-14 rounded-3xl md:rounded-[3rem] shadow-xl shadow-slate-200">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/2" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/10">
            <Sparkles size={14} className="text-black fill-black" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/80">Campus Engagement</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
            Upcoming <br /> <span className="text-black">Events</span>
          </h1>
          <p className="max-w-xl mt-6 font-medium text-black/80 leading-relaxed text-sm md:text-base opacity-90">
            Explore workshops, seminars, and cultural gatherings. Stay connected with your campus community and register for upcoming opportunities.
          </p>
        </div>
      </div>

      {/* ═══════════ EVENTS GRID ═══════════ */}
      {events.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-[3rem] p-20 text-center shadow-sm">
           <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
              <Calendar size={40} />
           </div>
           <p className="text-xl font-bold text-slate-900 mb-2 tracking-tight uppercase">No active events</p>
           <p className="text-slate-400 font-medium text-sm">The event calendar is currently empty. Check back soon for updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event._id} 
              className="group bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 md:hover:-translate-y-1 overflow-hidden flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <div className="bg-white/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
                    <Calendar size={14} className="text-[#F97316]" />
                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{new Date(event.eventDate).toLocaleDateString()}</span>
                  </div>
                </div>
                {event.isPaid && (
                  <div className="absolute top-4 right-4 bg-[#F97316] text-white px-3 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-orange-200">
                    Paid Entry
                  </div>
                )}
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-[#F97316] transition-colors">
                    {event.title}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-2">
                    {event.description}
                  </p>

                  <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                         <Users size={16} />
                      </div>
                      <span className="truncate">Lead: {event.studentCoordinator?.name || "Verified Coordinator"}</span>
                    </div>
                    <div className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest ${event.seatsLeft < 10 ? 'text-rose-500' : 'text-indigo-600'}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${event.seatsLeft < 10 ? 'bg-rose-50' : 'bg-indigo-50'}`}>
                         <Zap size={16} fill="currentColor" />
                      </div>
                      <span>Remaining Seats: {event.seatsLeft}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-50">
                  <button
                    disabled={event.registrationClosed || event.isRegistered}
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 group/btn
                      ${event.isRegistered 
                        ? "bg-emerald-50 text-emerald-600 cursor-default" 
                        : event.registrationClosed 
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                        : "bg-slate-900 text-white hover:bg-[#F97316] shadow-lg shadow-slate-200 hover:shadow-orange-200"
                      }`}
                  >
                    {event.isRegistered ? (
                      <>Joined Successfully <Check size={16} strokeWidth={3} /></>
                    ) : event.registrationClosed ? (
                      "Registration Closed"
                    ) : (
                      <>
                        Secure Spot 
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════ REGISTRATION MODAL ═══════════ */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedEvent(null)} />
          
          <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#F97316]" />
            
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
            >
              <X size={24} />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-100 rounded-lg text-[10px] font-bold text-[#F97316] uppercase tracking-widest mb-6">
              <Zap size={12} fill="currentColor" />
              Final Confirmation
            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
              {selectedEvent.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-6 mb-10 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-2"><Calendar size={14} className="text-[#F97316]" /> {new Date(selectedEvent.eventDate).toLocaleDateString()}</span>
              <span className="flex items-center gap-2"><Ticket size={14} className="text-[#F97316]" /> {selectedEvent.isPaid ? 'Verification Required' : 'Public Access'}</span>
              <span className="flex items-center gap-2"><MapPin size={14} className="text-[#F97316]" /> University Grounds</span>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-8">
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex items-start gap-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm">
                   <Info className="shrink-0 text-indigo-600" size={20} />
                </div>
                <div className="space-y-1">
                   <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">Important Notice</p>
                   <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    Attendance confirms your participation. {selectedEvent.isPaid ? "As a paid event, please ensure you complete payment processing at the registration desk upon arrival." : "Access is free for all verified university students."}
                   </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold uppercase tracking-[0.2em] text-sm shadow-xl shadow-slate-200 hover:bg-[#F97316] hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Synchronizing...
                  </>
                ) : (
                  <>
                    Confirm Attendance
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════ FOOTER INFO ═══════════ */}
      <div className="flex items-center justify-center pt-14">
        <div className="bg-white px-6 py-2.5 rounded-full border border-gray-100 flex items-center gap-3 shadow-sm">
          <Info size={16} className="text-[#F97316]" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Campus Hub Event Services // Secure Enrollment Node
          </p>
        </div>
      </div>
    </div>
  );
}

const Check = ({ className, size, strokeWidth }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);