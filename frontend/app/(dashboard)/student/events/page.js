"use client";
import { useEffect, useState } from "react";
import { X, Ticket, Users, Calendar, AlertCircle, Zap } from "lucide-react";

export default function StudentEventsPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Tracks the modal state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch("/api/student/events");
    const data = await res.json();
    setEvents(data.events || []);
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
    <div className="p-4 md:p-8">
      <header className="mb-12 border-b-8 border-black pb-6">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
          Upcoming Events
        </h1>
      </header>

      {events.length === 0 ? (
        <div className="border-4 border-dashed border-black p-20 text-center rounded-3xl">
           <p className="font-black uppercase text-black/20 text-2xl italic">No events found in the database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event._id} className="bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
              <div className="relative h-48 border-b-4 border-black">
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                {event.isPaid && (
                  <div className="absolute top-4 right-4 bg-[#FDE047] border-2 border-black px-3 py-1 font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Paid Event
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2 italic">
                  {event.title}
                </h2>
                <p className="text-xs font-bold text-slate-500 mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase">
                    <Users size={14} /> Coordinator: {event.studentCoordinator?.name}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-600">
                    <Zap size={14} fill="currentColor" /> Seats Left: {event.seatsLeft}
                  </div>
                </div>

                <button
                  disabled={event.registrationClosed || event.isRegistered}
                  onClick={() => setSelectedEvent(event)}
                  className={`w-full py-4 border-4 border-black rounded-xl font-black uppercase italic transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1
                    ${event.isRegistered 
                      ? "bg-green-400 cursor-default shadow-none translate-x-1 translate-y-1" 
                      : event.registrationClosed 
                      ? "bg-gray-200 text-gray-400 grayscale" 
                      : "bg-[#FB923C] hover:bg-[#FDE047]"
                    }`}
                >
                  {event.isRegistered ? "Already Joined" : event.registrationClosed ? "Closed" : "Join Event"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- REGISTRATION MODAL --- */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)} />
          
          <div className="relative w-full max-w-lg bg-[#FFF7ED] border-4 border-black rounded-[2.5rem] shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] p-8 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 p-2 border-2 border-black rounded-lg hover:bg-rose-400 transition-colors"
            >
              <X size={20} strokeWidth={3} />
            </button>

            <div className="inline-block px-4 py-1 bg-[#FDE047] border-2 border-black rounded-lg text-[10px] font-black uppercase mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Confirm Registration
            </div>

            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2">
              {selectedEvent.title}
            </h3>
            
            <div className="flex items-center gap-4 mb-8 text-[10px] font-black uppercase opacity-60 italic">
              <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(selectedEvent.eventDate).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Ticket size={12}/> {selectedEvent.isPaid ? 'Cash Payment Required' : 'Free Entry'}</span>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div className="bg-white border-4 border-black p-4 rounded-2xl flex items-start gap-3">
                <AlertCircle className="shrink-0 text-indigo-600" size={20} />
                <p className="text-[11px] font-bold leading-relaxed">
                  By clicking confirm, you agree to attend the event. 
                  {selectedEvent.isPaid && " This is a paid event; please coordinate payment with the student coordinator upon arrival."}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#0F172A] text-white border-4 border-black rounded-2xl font-black uppercase italic text-lg shadow-[6px_6px_0px_0px_rgba(251,146,60,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50"
              >
                {loading ? "Processing..." : "Confirm & Register"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}