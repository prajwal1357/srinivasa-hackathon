"use client";

import { useEffect, useState } from "react";
import {
  Users,
  TrendingUp,
  UserCheck,
  BookOpen,
  BarChart3,
  Target,
  CalendarDays,
  FileText,
  Loader2,
  Bell,
  GraduationCap,
  Upload,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  AreaChart, Area,
  RadialBarChart, RadialBar,
  ResponsiveContainer,
} from "recharts";

// ─── Neo-Brutalist Theme Colors ───
const COLORS = {
  cyan: "#01FFFF",
  pink: "#FF71CE",
  yellow: "#FFD600",
  green: "#05FFA1",
  coral: "#FF8A5B",
  lilac: "#C4B5FD",
  red: "#FDA4AF",
  blue: "#93C5FD",
  darkBg: "#1E293B",
};

const PIE_COLORS = [COLORS.cyan, COLORS.pink, COLORS.yellow, COLORS.green, COLORS.coral, COLORS.lilac];

// ─── Custom Tooltip ───
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border-3 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono">
      <p className="font-black text-xs uppercase mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-[11px] font-bold" style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

// ─── Section Header ───
function SectionHeader({ icon: Icon, title, color = COLORS.coral }) {
  return (
    <div className="inline-block bg-[#1E293B] text-white px-6 py-2 border-4 border-black rounded-xl shadow-[6px_6px_0px_0px]" style={{ boxShadow: `6px 6px 0px 0px ${color}` }}>
      <h3 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3">
        <Icon size={24} strokeWidth={3} />
        {title}
      </h3>
    </div>
  );
}

// ─── Stat Card ───
function StatCard({ icon: Icon, title, value, color }) {
  return (
    <div className={`${color} p-5 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col justify-between min-h-[140px]`}>
      <div className="flex justify-between items-start">
        <div className="bg-white p-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Icon size={18} strokeWidth={3} className="text-black" />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-black font-black uppercase text-[9px] tracking-widest opacity-60 mb-1">{title}</p>
        <h4 className="text-3xl font-black tracking-tighter text-black">{value}</h4>
      </div>
    </div>
  );
}

// ─── Chart Card Wrapper ───
function ChartCard({ children, title, className = "" }) {
  return (
    <div className={`bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      {title && <p className="font-black text-sm uppercase tracking-tight mb-5 text-gray-600">{title}</p>}
      {children}
    </div>
  );
}

export default function AnalyticsPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/analytics");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Analytics fetch error:", err);
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

  if (!data || data.message) {
    return <div className="p-10 font-black text-xl uppercase">Failed to load analytics data.</div>;
  }

  const { overview, userStatus, roleDistribution, noticesByRole, noteStats, classStats, eventStats, registrationTrend, notesByUploader } = data;

  // Student status for stacked bar
  const statusComparison = [
    { name: "Approved", Students: userStatus.students.approved, Faculty: userStatus.faculty.approved },
    { name: "Pending", Students: userStatus.students.pending, Faculty: userStatus.faculty.pending },
    { name: "Rejected", Students: userStatus.students.rejected, Faculty: userStatus.faculty.rejected },
  ];

  return (
    <div className="space-y-14 font-mono animate-in fade-in duration-700 pb-10">

      {/* ═══════════ PAGE HEADER ═══════════ */}
      <div className="relative overflow-hidden bg-[#FF8A5B] border-4 border-black p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute top-6 right-10 w-32 h-10 bg-[#FFD600] border-2 border-black -rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-[10px] uppercase z-20 hidden md:flex">
          Live Metrics
        </div>
        <div className="absolute -bottom-4 right-28 w-24 h-24 bg-[#01FFFF] border-4 border-black rounded-full rotate-12 hidden md:block" />
        
        <div className="relative z-10">
          <div className="inline-block px-4 py-1 bg-[#1E293B] border-2 border-black rounded-full text-[10px] text-white font-black uppercase tracking-widest mb-6">
            Intelligence Layer
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter">
            Analytics &<br />Insights
          </h1>
          <p className="max-w-xl mt-4 font-bold text-black/70 leading-snug uppercase text-xs">
            Real-time department analytics — user engagement, resource activity, event performance, and class-level breakdowns.
          </p>
        </div>
      </div>

      {/* ═══════════ OVERVIEW KPIs ═══════════ */}
      <section className="space-y-6">
        <SectionHeader icon={BarChart3} title="Overview" color={COLORS.cyan} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <StatCard icon={Users} title="Students" value={overview.totalStudents} color="bg-[#CCFBF1]" />
          <StatCard icon={UserCheck} title="Faculty" value={overview.totalFaculty} color="bg-[#FFEDD5]" />
          <StatCard icon={GraduationCap} title="Classes" value={overview.totalClasses} color="bg-[#DBEAFE]" />
          <StatCard icon={BookOpen} title="Resources" value={overview.totalNotes} color="bg-[#F3E8FF]" />
          <StatCard icon={Bell} title="Notices" value={(data.noticesByRole?.[0]?.value || 0) + (data.noticesByRole?.[1]?.value || 0)} color="bg-[#FEF9C3]" />
          <StatCard icon={CalendarDays} title="Events" value={overview.totalEvents} color="bg-[#FFD1D1]" />
          <StatCard icon={FileText} title="Registrations" value={overview.totalRegistrations} color="bg-[#CCFBF1]" />
          <StatCard icon={Target} title="Class Assignments" value={overview.totalAssignments} color="bg-[#FFEDD5]" />
        </div>
      </section>

      {/* ═══════════ USER ANALYTICS ═══════════ */}
      <section className="space-y-6">
        <SectionHeader icon={Users} title="User Analytics" color={COLORS.pink} />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Role Distribution Pie */}
          <ChartCard title="User Role Distribution">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%" cy="50%"
                  innerRadius={55} outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="#000" strokeWidth={2}
                >
                  {roleDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span className="font-black text-xs uppercase">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Status Comparison Bar */}
          <ChartCard title="Approval Status Breakdown">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={statusComparison} barGap={6}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 900 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span className="font-black text-xs uppercase">{value}</span>}
                />
                <Bar dataKey="Students" fill={COLORS.cyan} stroke="#000" strokeWidth={2} radius={[6, 6, 0, 0]} />
                <Bar dataKey="Faculty" fill={COLORS.pink} stroke="#000" strokeWidth={2} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      {/* ═══════════ REGISTRATION TREND ═══════════ */}
      {registrationTrend.length > 0 && (
        <section className="space-y-6">
          <SectionHeader icon={TrendingUp} title="Registration Trend" color={COLORS.green} />

          <ChartCard title="New User Signups (Last 6 Months)">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={registrationTrend}>
                <defs>
                  <linearGradient id="gradStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.6} />
                    <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="gradFaculty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.pink} stopOpacity={0.6} />
                    <stop offset="95%" stopColor={COLORS.pink} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 900 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span className="font-black text-xs uppercase">{value}</span>}
                />
                <Area type="monotone" dataKey="students" name="Students"
                  stroke={COLORS.cyan} strokeWidth={3} fill="url(#gradStudents)" />
                <Area type="monotone" dataKey="faculty" name="Faculty"
                  stroke={COLORS.pink} strokeWidth={3} fill="url(#gradFaculty)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>
      )}

      {/* ═══════════ RESOURCE ANALYTICS ═══════════ */}
      <section className="space-y-6">
        <SectionHeader icon={BookOpen} title="Resource Analytics" color={COLORS.yellow} />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Notes by Type Pie */}
          <ChartCard title="Resources by Type">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={noteStats.byType}
                  cx="50%" cy="50%"
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="#000" strokeWidth={2}
                >
                  <Cell fill={COLORS.green} />
                  <Cell fill={COLORS.coral} />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span className="font-black text-[10px] uppercase">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Note Approval Status */}
          <ChartCard title="Approval Status">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={noteStats.byStatus}
                  cx="50%" cy="50%"
                  innerRadius={45} outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="#000" strokeWidth={2}
                >
                  <Cell fill={COLORS.green} />
                  <Cell fill={COLORS.yellow} />
                  <Cell fill={COLORS.red} />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span className="font-black text-[10px] uppercase">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Uploads by Role */}
          <ChartCard title="Uploads by Role">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={notesByUploader}
                  cx="50%" cy="50%"
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="#000" strokeWidth={2}
                >
                  <Cell fill={COLORS.lilac} />
                  <Cell fill={COLORS.cyan} />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span className="font-black text-[10px] uppercase">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      {/* ═══════════ NOTICES ANALYTICS ═══════════ */}
      <section className="space-y-6">
        <SectionHeader icon={Bell} title="Notice Distribution" color={COLORS.lilac} />

        <div className="grid md:grid-cols-2 gap-8">
          <ChartCard title="Notices by Creator Role">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={noticesByRole} layout="vertical" barSize={40}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fontWeight: 900 }} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Notices" stroke="#000" strokeWidth={2} radius={[0, 8, 8, 0]}>
                  <Cell fill={COLORS.yellow} />
                  <Cell fill={COLORS.cyan} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Event Registrations */}
          {eventStats.length > 0 && (
            <ChartCard title="Event Popularity (Registrations vs Capacity)">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={eventStats} barGap={4}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 800 }} interval={0} angle={-20} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    formatter={(value) => <span className="font-black text-[10px] uppercase">{value}</span>}
                  />
                  <Bar dataKey="registered" name="Registered" fill={COLORS.green} stroke="#000" strokeWidth={2} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="capacity" name="Max Capacity" fill={COLORS.blue} stroke="#000" strokeWidth={2} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
        </div>
      </section>

      {/* ═══════════ CLASS-LEVEL BREAKDOWN ═══════════ */}
      {classStats.length > 0 && (
        <section className="space-y-6">
          <SectionHeader icon={GraduationCap} title="Class-Level Breakdown" color={COLORS.coral} />

          <ChartCard title="Students, Resources & Faculty per Class">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={classStats} barGap={3}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 900 }} interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span className="font-black text-xs uppercase">{value}</span>}
                />
                <Bar dataKey="students" name="Students" fill={COLORS.cyan} stroke="#000" strokeWidth={2} radius={[4, 4, 0, 0]} />
                <Bar dataKey="notes" name="Resources" fill={COLORS.green} stroke="#000" strokeWidth={2} radius={[4, 4, 0, 0]} />
                <Bar dataKey="faculty" name="Faculty" fill={COLORS.pink} stroke="#000" strokeWidth={2} radius={[4, 4, 0, 0]} />
                <Bar dataKey="notices" name="Notices" fill={COLORS.yellow} stroke="#000" strokeWidth={2} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Per-class Table */}
          <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="p-6 border-b-4 border-black bg-[#FEF9C3]">
              <p className="font-black text-sm uppercase tracking-tight">Class Details Table</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-4 border-black bg-[#F1F5F9]">
                    <th className="text-left p-4 font-black text-xs uppercase">Class</th>
                    <th className="text-center p-4 font-black text-xs uppercase">Students</th>
                    <th className="text-center p-4 font-black text-xs uppercase">Faculty</th>
                    <th className="text-center p-4 font-black text-xs uppercase">Resources</th>
                    <th className="text-center p-4 font-black text-xs uppercase">Notices</th>
                  </tr>
                </thead>
                <tbody>
                  {classStats.map((cls, i) => (
                    <tr key={i} className="border-b-2 border-black hover:bg-[#FEF9C3] transition-colors">
                      <td className="p-4 font-black text-sm uppercase">{cls.name}</td>
                      <td className="p-4 text-center">
                        <span className="inline-block bg-[#CCFBF1] border-2 border-black rounded-lg px-3 py-1 font-black text-sm">{cls.students}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-block bg-[#FFD1D1] border-2 border-black rounded-lg px-3 py-1 font-black text-sm">{cls.faculty}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-block bg-[#DBEAFE] border-2 border-black rounded-lg px-3 py-1 font-black text-sm">{cls.notes}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-block bg-[#FEF9C3] border-2 border-black rounded-lg px-3 py-1 font-black text-sm">{cls.notices}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}