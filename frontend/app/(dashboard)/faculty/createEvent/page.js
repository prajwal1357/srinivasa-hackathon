"use client";
import { useState, useEffect } from "react";
import { 
  Plus, Users, Calendar, Ticket, ArrowRight, 
  Trash2, Eye, Info, X, Loader2 
} from "lucide-react";

export default function FacultyEventsPage() {
  const [students, setStudents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // For Details View
  const [registrations, setRegistrations] = useState([]); // Students for selected event

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

  // Fetch registered students when an event is selected
  useEffect(() => {
    if (selectedEvent) {
      fetchEventRegistrations(selectedEvent._id);
    }
  }, [selectedEvent]);

  const fetchStudents = async () => {
    const res = await fetch("/api/faculty/students?status=approved");
    const data = await res.json();
    setStudents(data.students || []);
  };

  const fetchMyEvents = async () => {
    const res = await fetch("/api/faculty/my-events");
    const data = await res.json();
    setMyEvents(data.events || []);
  };

  const fetchEventRegistrations = async (eventId) => {
    const res = await fetch(`/api/faculty/event-registrations?eventId=${eventId}`);
    const data = await res.json();
    setRegistrations(data.registrations || []);
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
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-8 min-h-screen bg-[#FFF7ED]">
      
      {/* LEFT COLUMN: CREATE FORM */}
      <div className="lg:w-1/3">
        <div className="sticky top-8 bg-white border-4 border-black p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#FDE047] p-2 border-2 border-black rounded-lg">
              <Plus size={20} strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">New Event</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="title" value={form.title} placeholder="Event Title" required onChange={handleChange}
              className="w-full border-4 border-black p-3 rounded-xl font-bold focus:bg-[#FFFBEB] outline-none" />
            
            <textarea name="description" value={form.description} placeholder="Short Description" required onChange={handleChange}
              className="w-full border-4 border-black p-3 rounded-xl font-bold h-24 focus:bg-[#FFFBEB] outline-none" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase ml-1">Deadline</label>
                <input type="date" name="registrationDeadline" value={form.registrationDeadline} required onChange={handleChange}
                  className="w-full border-4 border-black p-2 rounded-xl font-bold text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase ml-1">Event Date</label>
                <input type="date" name="eventDate" value={form.eventDate} required onChange={handleChange}
                  className="w-full border-4 border-black p-2 rounded-xl font-bold text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <input type="number" name="maxSeats" value={form.maxSeats} placeholder="Max Seats" required onChange={handleChange}
                className="w-full border-4 border-black p-3 rounded-xl font-bold outline-none" />
               
               <div className="flex items-center justify-center gap-2 border-4 border-black rounded-xl bg-white px-2">
                  <input type="checkbox" name="isPaid" checked={form.isPaid} onChange={handleChange} className="w-5 h-5 accent-black" />
                  <label className="text-[10px] font-black uppercase">Paid?</label>
               </div>
            </div>

            <select name="studentCoordinator" value={form.studentCoordinator} required onChange={handleChange}
              className="w-full border-4 border-black p-3 rounded-xl font-bold outline-none appearance-none bg-white">
              <option value="">Select Coordinator</option>
              {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>

            <input type="file" name="image" required onChange={handleChange}
              className="w-full text-xs font-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-2 file:border-black file:bg-[#FDE047] file:font-black" />

            <button type="submit" disabled={loading}
              className="w-full bg-[#FB923C] border-4 border-black py-4 rounded-2xl font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              {loading ? "Creating..." : "Launch Event"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN: EVENTS LIST */}
      <div className="lg:w-2/3">
        <header className="mb-8">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic">Manage Your Events</h2>
          <p className="text-sm font-bold text-black/40">Total Events Created: {myEvents.length}</p>
        </header>

        <div className="grid gap-6">
          {myEvents.map((event) => (
            <div key={event._id} onClick={() => setSelectedEvent(event)}
              className="group bg-white border-4 border-black rounded-[2rem] p-6 flex items-center gap-6 cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FDE047] transition-all">
              
              <img src={event.imageUrl} className="w-24 h-24 object-cover border-4 border-black rounded-2xl" alt="" />
              
              <div className="flex-1">
                <h3 className="text-xl font-black uppercase leading-tight">{event.title}</h3>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-black text-white px-2 py-1 rounded-md">
                    <Users size={12}/> {event.registeredCount} / {event.maxSeats}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase border-2 border-black px-2 py-1 rounded-md bg-white">
                    <Calendar size={12}/> {new Date(event.eventDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="p-4 border-4 border-black rounded-2xl group-hover:bg-black group-hover:text-white transition-colors">
                <ArrowRight size={24} strokeWidth={3} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- EVENT DETAIL MODAL --- */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedEvent(null)} />
          <div className="relative w-full max-w-4xl bg-white border-4 border-black rounded-[3rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95">
            
            {/* Modal Left: Info */}
            <div className="md:w-1/3 bg-[#0F172A] text-white p-10 border-r-4 border-black">
              <button onClick={() => setSelectedEvent(null)} className="mb-8 p-2 border-2 border-white rounded-xl hover:bg-white hover:text-black transition-all">
                <X size={20} />
              </button>
              <h3 className="text-3xl font-black uppercase italic mb-4 leading-none">{selectedEvent.title}</h3>
              <p className="text-sm font-bold text-white/60 mb-8">{selectedEvent.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FB923C] border-2 border-white rounded-lg flex items-center justify-center">
                    <Ticket size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">{selectedEvent.isPaid ? "Paid Event" : "Free"}</span>
                </div>
              </div>
            </div>

            {/* Modal Right: Student List */}
            <div className="md:w-2/3 p-10 max-h-[80vh] overflow-y-auto">
              <h4 className="text-2xl font-black uppercase italic border-b-4 border-black pb-4 mb-6">Registered Students</h4>
              
              {registrations.length === 0 ? (
                <div className="text-center py-20 border-4 border-dashed border-black rounded-3xl">
                   <p className="font-black text-black/20 uppercase tracking-widest">No Registrations Yet</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {registrations.map((reg, idx) => (
                    <div key={reg._id} className="flex items-center justify-between p-4 border-4 border-black rounded-2xl bg-[#FFFBEB]">
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 flex items-center justify-center bg-black text-white font-black rounded-lg text-xs">{idx + 1}</span>
                        <div>
                          <p className="font-black uppercase text-sm leading-none">{reg.student.name}</p>
                          <p className="text-[10px] font-bold text-black/40 mt-1 uppercase tracking-tighter">{reg.student.email} | USN: {reg.student.usn}</p>
                        </div>
                      </div>
                      <div className="bg-green-400 border-2 border-black p-1 rounded-md">
                        <Info size={14} strokeWidth={3} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}