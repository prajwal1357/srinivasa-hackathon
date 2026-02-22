"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  BookOpen,
  GraduationCap,
  Bell,
  CalendarDays,
  Clock,
  FileText,
  Loader2,
  TrendingUp,
  BarChart3,
  Plus
} from "lucide-react";

// ─── Mock Data Fallback ───
const MOCK_STATS = {
  counts: {
    totalStudents: 12450,
    totalFaculty: 420,
    totalClasses: 86,
    pendingStudents: 12,
    pendingFaculty: 5,
    totalNotices: 24,
    totalNotes: 3412,
    totalEvents: 18,
    totalRegistrations: 890,
    approvedNotes: 2800,
    pendingNotes: 612
  },
  roleDistribution: [
    { label: "Students", count: 12450 },
    { label: "Faculty", count: 420 },
    { label: "Admin", count: 15 }
  ],
  statusDistribution: [
    { label: "Active", students: 11800, faculty: 390 },
    { label: "Pending", students: 450, faculty: 20 },
    { label: "Inactive", students: 200, faculty: 10 }
  ],
  notesByType: [
    { label: "PDFs", count: 2100 },
    { label: "Documents", count: 1312 }
  ],
  recentNotices: [
    { _id: "1", title: "Final Semester Schedule Out", createdBy: { name: "Dr. Arun" }, creatorRole: "admin" },
    { _id: "2", title: "New Lab Equipment Arrival", createdBy: { name: "Prof. Sarah" }, creatorRole: "faculty" },
    { _id: "3", title: "Campus Recruitment Drive", createdBy: { name: "Admin Office" }, creatorRole: "admin" }
  ],
  recentEvents: [
    { _id: "e1", title: "Tech Symposium 2025", eventDate: new Date().toISOString(), registeredCount: 450, maxSeats: 500 },
    { _id: "e2", title: "Inter-College Sports Meet", eventDate: new Date().toISOString(), registeredCount: 120, maxSeats: 200 }
  ]
};

// ─── Pure SVG Bar Chart (Refined) ───
function BarChart({ data, colors, height = 180 }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const barWidth = Math.min(60, Math.floor(240 / data.length));
  const gap = 12;
  const totalWidth = data.length * (barWidth + gap);

  return (
    <svg viewBox={`0 0 ${totalWidth + 20} ${height + 40}`} className="w-full max-w-sm">
      {data.map((d, i) => {
        const barH = (d.count / max) * height;
        const x = 10 + i * (barWidth + gap);
        const y = height - barH;
        return (
          <g key={i} className="group cursor-pointer">
            <rect
              x={x} y={y} width={barWidth} height={barH}
              fill={colors[i % colors.length]}
              className="transition-all duration-300 opacity-90 hover:opacity-100"
              rx="6"
            />
            <text x={x + barWidth / 2} y={height + 16} textAnchor="middle"
              className="text-[10px] font-bold fill-slate-400 uppercase tracking-wider">{d.label}</text>
            <text x={x + barWidth / 2} y={y - 6} textAnchor="middle"
              className="text-[11px] font-bold fill-slate-900">{d.count}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Pure SVG Donut Chart (Refined) ───
function DonutChart({ data, colors, size = 160 }) {
  const total = data.reduce((s, d) => s + d.count, 0) || 1;
  const cx = size / 2, cy = size / 2, r = size / 2 - 20;
  let cumAngle = -90;

  const slices = data.map((d, i) => {
    const angle = (d.count / total) * 360;
    const startRad = (cumAngle * Math.PI) / 180;
    const endRad = ((cumAngle + angle) * Math.PI) / 180;
    cumAngle += angle;
    const large = angle > 180 ? 1 : 0;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    return (
      <path key={i}
        d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`}
        fill={colors[i % colors.length]}
        className="opacity-90 hover:opacity-100 transition-opacity"
      />
    );
  });

  return (
    <div className="flex items-center gap-8">
      <svg width={size} height={size}>{slices}
        <circle cx={cx} cy={cy} r={r * 0.65} fill="white" />
        <text x={cx} y={cy + 5} textAnchor="middle" className="text-2xl font-extrabold fill-slate-900">{total}</text>
      </svg>
      <div className="space-y-3">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shadow-sm" style={{ background: colors[i] }} />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d.label}</span>
              <span className="text-sm font-bold text-slate-900">{d.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Grouped Bar Chart for Status Distribution (Refined) ───
function GroupedBarChart({ data, height = 160 }) {
  const max = Math.max(...data.flatMap(d => [d.students, d.faculty]), 1);
  const groupWidth = 90, barW = 24, gap = 20;
  const totalWidth = data.length * (groupWidth + gap) + 20;

  return (
    <svg viewBox={`0 0 ${totalWidth} ${height + 60}`} className="w-full max-w-md">
      {data.map((d, i) => {
        const x = 10 + i * (groupWidth + gap);
        const sH = (d.students / max) * height;
        const fH = (d.faculty / max) * height;
        return (
          <g key={i}>
            <rect x={x} y={height - sH} width={barW} height={sH}
              fill="#6366F1" className="opacity-80" rx="4" />
            <text x={x + barW / 2} y={height - sH - 4} textAnchor="middle"
              className="text-[9px] font-bold fill-slate-400">{d.students}</text>

            <rect x={x + barW + 8} y={height - fH} width={barW} height={fH}
              fill="#22C55E" className="opacity-80" rx="4" />
            <text x={x + barW + 8 + barW / 2} y={height - fH - 4} textAnchor="middle"
              className="text-[9px] font-bold fill-slate-400">{d.faculty}</text>

            <text x={x + groupWidth / 2} y={height + 22} textAnchor="middle"
              className="text-[10px] font-bold uppercase tracking-widest fill-slate-400">{d.label}</text>
          </g>
        );
      })}
      {/* Legend */}
      <g transform={`translate(10, ${height + 45})`}>
        <rect width={10} height={10} fill="#6366F1" rx="2" />
        <text x={16} y={9} className="text-[10px] font-bold fill-slate-500 uppercase tracking-widest">Students</text>
        <rect x={85} width={10} height={10} fill="#22C55E" rx="2" />
        <text x={101} y={9} className="text-[10px] font-bold fill-slate-500 uppercase tracking-widest">Faculty</text>
      </g>
    </svg>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // We try to fetch, but use a try/catch to handle environment specific parsing errors
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          // If response not ok, fallback to mock
          setStats(MOCK_STATS);
        }
      } catch (err) {
        // Catching 'Failed to parse URL' or network errors
        console.warn("API unavailable, using mock data fallback.");
        setStats(MOCK_STATS);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={48} className="animate-spin text-indigo-500" strokeWidth={2} />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">Gathering Data</p>
      </div>
    );
  }

  // At this point stats is either from API or MOCK_STATS
  const { counts, roleDistribution, statusDistribution, notesByType, recentNotices, recentEvents } = stats || MOCK_STATS;

  const kpis = [
    { title: "Total Students", value: counts.totalStudents, icon: Users, color: "bg-[#EEF2FF]", text: "text-indigo-600" },
    { title: "Total Faculty", value: counts.totalFaculty, icon: UserCheck, color: "bg-[#E7F7EF]", text: "text-green-600" },
    { title: "Classes", value: counts.totalClasses, icon: GraduationCap, color: "bg-[#FFFBEB]", text: "text-amber-600" },
    { title: "Pending Students", value: counts.pendingStudents, icon: Clock, color: "bg-slate-50", text: "text-slate-500" },
    { title: "Pending Faculty", value: counts.pendingFaculty, icon: Clock, color: "bg-slate-50", text: "text-slate-500" },
    { title: "Total Notices", value: counts.totalNotices, icon: Bell, color: "bg-[#F5F3FF]", text: "text-violet-600" },
    { title: "Resources", value: counts.totalNotes, icon: BookOpen, color: "bg-[#EEF2FF]", text: "text-indigo-600" },
    { title: "Events", value: counts.totalEvents, icon: CalendarDays, color: "bg-[#E7F7EF]", text: "text-green-600" },
    { title: "Registrations", value: counts.totalRegistrations, icon: FileText, color: "bg-[#FFEDD5]", text: "text-amber-600" },
  ];

  return (
    <div className="space-y-10 animate-fade-in" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] p-10 bg-slate-900 text-white shadow-xl shadow-slate-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/10">
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 animate-ping"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Management Console</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Departmental <br /> Overview
          </h1>
          <p className="text-slate-400 font-medium max-w-md mb-10 leading-relaxed">
            Real-time analytics and system oversight for the 2025–26 academic term.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-white">
              Srinivasa University
            </div>
            <div className="px-4 py-2 bg-green-500/20 border border-green-500/20 rounded-xl text-xs font-bold uppercase tracking-widest text-green-400">
              Systems Live
            </div>
          </div>
        </div>
      </div >

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index}
              className="group relative bg-white border border-gray-50 rounded-4xl p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col h-full gap-8">
                <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${item.color} ${item.text} shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-slate-200 group-hover:text-indigo-500 transition-colors">
                    <Plus size={20} />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">{item.title}</p>
                  <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{item.value.toLocaleString()}</h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">User Base Distribution</h3>
            </div>
          </div>
          <DonutChart data={roleDistribution} colors={["#6366F1", "#A855F7", "#F59E0B"]} />
        </div>

        <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-green-50 text-green-600 rounded-xl">
              <BarChart3 size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Verification Status</h3>
          </div>
          <GroupedBarChart data={statusDistribution} />
        </div>

        <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <BookOpen size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Academic Resources</h3>
          </div>
          <BarChart data={notesByType} colors={["#6366F1", "#22C55E"]} />
        </div>

        <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 bg-violet-50 text-violet-600 rounded-xl">
              <FileText size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Resource Approval Flow</h3>
          </div>
          <DonutChart
            data={[
              { label: "Approved", count: counts.approvedNotes },
              { label: "In Review", count: counts.pendingNotes },
            ]}
            colors={["#22C55E", "#F1F5F9"]}
          />
        </div>
      </div>

      {/* Activity Logs */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 shadow-sm overflow-hidden relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <Bell size={22} className="text-amber-500" /> Latest Broadcasts
            </h3>
            <button className="text-xs font-bold bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors uppercase tracking-widest">View All</button>
          </div>
          <div className="space-y-3">
            {recentNotices.length === 0 ? (
              <div className="py-10 text-center text-slate-400 font-medium">No active broadcasts.</div>
            ) : (
              recentNotices.map((n) => (
                <div key={n._id} className="group p-4 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 rounded-2xl transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-900 text-sm mb-1">{n.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {n.createdBy?.name || "System"} • {n.creatorRole}
                      </p>
                    </div>
                    <span className={`text-[9px] font-extrabold uppercase px-2 py-1 rounded-lg ${n.creatorRole === "admin" ? "bg-indigo-100 text-indigo-600" : "bg-green-100 text-green-600"}`}>
                      {n.creatorRole}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-sm overflow-hidden text-white relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
           <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
                <CalendarDays size={22} className="text-green-400" /> Upcoming Events
              </h3>
              <Plus size={20} className="text-slate-500 cursor-pointer hover:text-white" />
            </div>
            <div className="space-y-3">
              {recentEvents.length === 0 ? (
                <div className="py-10 text-center text-slate-500 font-medium">No scheduled events.</div>
              ) : (
                recentEvents.map((e) => (
                  <div key={e._id} className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all cursor-pointer">
                    <p className="font-bold text-sm mb-2">{e.title}</p>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><CalendarDays size={12} /> {new Date(e.eventDate).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1.5"><Users size={12} /> {e.registeredCount} / {e.maxSeats}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
           </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}