"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  BookOpen,
  GraduationCap,
  Bell,
  CalendarDays,
  ArrowUpRight,
  Clock,
  FileText,
  Loader2,
  TrendingUp,
  BarChart3,
} from "lucide-react";

// ─── Pure SVG Bar Chart ───
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
          <g key={i}>
            <rect
              x={x} y={y} width={barWidth} height={barH}
              fill={colors[i % colors.length]}
              stroke="black" strokeWidth="3" rx="4"
            />
            <text x={x + barWidth / 2} y={height + 16} textAnchor="middle"
              className="text-[10px] font-black uppercase fill-black">{d.label}</text>
            <text x={x + barWidth / 2} y={y - 6} textAnchor="middle"
              className="text-[11px] font-black fill-black">{d.count}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Pure SVG Donut Chart ───
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
        fill={colors[i % colors.length]} stroke="black" strokeWidth="3"
      />
    );
  });

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size}>{slices}
        <circle cx={cx} cy={cy} r={r * 0.55} fill="white" stroke="black" strokeWidth="3" />
        <text x={cx} y={cy + 5} textAnchor="middle" className="text-xl font-black fill-black">{total}</text>
      </svg>
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-xs font-black uppercase">
            <div className="w-4 h-4 border-2 border-black rounded" style={{ background: colors[i] }} />
            {d.label}: {d.count}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Grouped Bar Chart for Status Distribution ───
function GroupedBarChart({ data, height = 160 }) {
  const max = Math.max(...data.flatMap(d => [d.students, d.faculty]), 1);
  const groupWidth = 90, barW = 28, gap = 20;
  const totalWidth = data.length * (groupWidth + gap) + 20;

  return (
    <svg viewBox={`0 0 ${totalWidth} ${height + 50}`} className="w-full max-w-md">
      {data.map((d, i) => {
        const x = 10 + i * (groupWidth + gap);
        const sH = (d.students / max) * height;
        const fH = (d.faculty / max) * height;
        return (
          <g key={i}>
            <rect x={x} y={height - sH} width={barW} height={sH}
              fill="#01FFFF" stroke="black" strokeWidth="2.5" rx="3" />
            <text x={x + barW / 2} y={height - sH - 4} textAnchor="middle"
              className="text-[9px] font-black fill-black">{d.students}</text>

            <rect x={x + barW + 6} y={height - fH} width={barW} height={fH}
              fill="#FF71CE" stroke="black" strokeWidth="2.5" rx="3" />
            <text x={x + barW + 6 + barW / 2} y={height - fH - 4} textAnchor="middle"
              className="text-[9px] font-black fill-black">{d.faculty}</text>

            <text x={x + groupWidth / 2} y={height + 18} textAnchor="middle"
              className="text-[10px] font-black uppercase fill-black">{d.label}</text>
          </g>
        );
      })}
      {/* Legend */}
      <rect x={10} y={height + 30} width={12} height={12} fill="#01FFFF" stroke="black" strokeWidth="2" />
      <text x={26} y={height + 40} className="text-[9px] font-black fill-black">Students</text>
      <rect x={90} y={height + 30} width={12} height={12} fill="#FF71CE" stroke="black" strokeWidth="2" />
      <text x={106} y={height + 40} className="text-[9px] font-black fill-black">Faculty</text>
    </svg>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={48} className="animate-spin text-black" strokeWidth={3} />
      </div>
    );
  }

  if (!stats) {
    return <div className="p-10 font-black text-xl uppercase">Failed to load dashboard data.</div>;
  }

  const { counts, roleDistribution, statusDistribution, notesByType, recentNotices, recentEvents } = stats;

  const kpis = [
    { title: "Total Students", value: counts.totalStudents, icon: Users, color: "bg-[#CCFBF1]" },
    { title: "Total Faculty", value: counts.totalFaculty, icon: UserCheck, color: "bg-[#FFEDD5]" },
    { title: "Classes", value: counts.totalClasses, icon: GraduationCap, color: "bg-[#DBEAFE]" },
    { title: "Pending Students", value: counts.pendingStudents, icon: Clock, color: "bg-[#FEF9C3]" },
    { title: "Pending Faculty", value: counts.pendingFaculty, icon: Clock, color: "bg-[#F3E8FF]" },
    { title: "Total Notices", value: counts.totalNotices, icon: Bell, color: "bg-[#FFD1D1]" },
    { title: "Resources", value: counts.totalNotes, icon: BookOpen, color: "bg-[#DBEAFE]" },
    { title: "Events", value: counts.totalEvents, icon: CalendarDays, color: "bg-[#CCFBF1]" },
    { title: "Registrations", value: counts.totalRegistrations, icon: FileText, color: "bg-[#FFEDD5]" },
  ];

  return (
    <div className="space-y-12 font-mono animate-in fade-in duration-500">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-black p-10 bg-[#FF8A5B] text-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute top-6 right-12 w-28 h-8 bg-[#FFD600] border-2 border-black -rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-[10px] uppercase hidden md:flex">
          Live Data
        </div>
        <div className="absolute -bottom-4 right-24 w-20 h-20 bg-[#3B82F6] border-4 border-black rounded-full rotate-45 hidden md:block" />
        <div className="relative z-10">
          <div className="inline-block px-5 py-2 bg-[#1E293B] border-2 border-black rounded-lg text-[10px] text-white font-black uppercase tracking-[0.2em] mb-8 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
            HOD / Admin Console
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-4">
            Department<br />Dashboard
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-xs">
            <div className="px-4 py-2 bg-white border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Term: 2025–26
            </div>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="w-3 h-3 bg-[#4ADE80] rounded-full animate-ping" />
              <span className="font-black uppercase tracking-widest text-[10px]">System Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {kpis.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index}
              className={`group relative border-4 border-black rounded-[2rem] p-7 transition-all duration-300 
                ${item.color} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 cursor-pointer`}>
              <div className="flex flex-col justify-between h-full space-y-8">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Icon size={28} strokeWidth={3} className="text-black" />
                  </div>
                  <div className="bg-white border-2 border-black p-2 rounded-full group-hover:bg-[#FFD600] transition-colors">
                    <ArrowUpRight size={18} strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <p className="text-black text-[10px] font-black uppercase tracking-tight opacity-60">{item.title}</p>
                  <h2 className="text-4xl font-black mt-1 text-black tracking-tighter">{item.value}</h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* Role Distribution Donut */}
        <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[#FFD600] border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <TrendingUp size={20} strokeWidth={3} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight">User Distribution</h3>
          </div>
          <DonutChart data={roleDistribution} colors={["#01FFFF", "#FF71CE", "#FFD600"]} />
        </div>

        {/* Status Grouped Bar */}
        <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[#01FFFF] border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <BarChart3 size={20} strokeWidth={3} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight">Approval Status</h3>
          </div>
          <GroupedBarChart data={statusDistribution} />
        </div>

        {/* Notes by Type Bar */}
        <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[#FF71CE] border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <BookOpen size={20} strokeWidth={3} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight">Resources by Type</h3>
          </div>
          <BarChart data={notesByType} colors={["#05FFA1", "#FF8A5B"]} />
        </div>

        {/* Note Approval Donut */}
        <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[#05FFA1] border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <FileText size={20} strokeWidth={3} />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight">Note Approvals</h3>
          </div>
          <DonutChart
            data={[
              { label: "Approved", count: counts.approvedNotes },
              { label: "Pending", count: counts.pendingNotes },
            ]}
            colors={["#05FFA1", "#FEF9C3"]}
          />
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* Recent Notices */}
        <div className="bg-[#FEF9C3] border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
            <Bell size={22} strokeWidth={3} /> Latest Notices
          </h3>
          <div className="space-y-3">
            {recentNotices.length === 0 ? (
              <p className="font-bold text-sm italic text-gray-500 uppercase">No notices yet</p>
            ) : (
              recentNotices.map((n) => (
                <div key={n._id} className="bg-white border-3 border-black rounded-xl p-4 flex justify-between items-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div>
                    <p className="font-black text-sm uppercase">{n.title}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">
                      by {n.createdBy?.name || "Unknown"} • {n.creatorRole}
                    </p>
                  </div>
                  <span className={`text-[9px] font-black uppercase px-2 py-1 border-2 border-black rounded-lg ${n.creatorRole === "admin" ? "bg-[#FFD600]" : "bg-[#01FFFF]"}`}>
                    {n.creatorRole}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-[#DBEAFE] border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
            <CalendarDays size={22} strokeWidth={3} /> Upcoming Events
          </h3>
          <div className="space-y-3">
            {recentEvents.length === 0 ? (
              <p className="font-bold text-sm italic text-gray-500 uppercase">No events yet</p>
            ) : (
              recentEvents.map((e) => (
                <div key={e._id} className="bg-white border-3 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-black text-sm uppercase">{e.title}</p>
                  <div className="flex gap-4 mt-2 text-[10px] font-black text-gray-600 uppercase">
                    <span>📅 {new Date(e.eventDate).toLocaleDateString()}</span>
                    <span>💺 {e.registeredCount}/{e.maxSeats}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}