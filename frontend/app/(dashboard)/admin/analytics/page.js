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
  ChevronDown,
  Info
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  AreaChart, Area,
  ResponsiveContainer,
} from "recharts";

// ─── Professional Theme Colors ───
const COLORS = {
  indigo: "#6366F1",
  mint: "#22C55E",
  amber: "#F59E0B",
  violet: "#8B5CF6",
  rose: "#F43F5E",
  slate: "#64748B",
  blue: "#3B82F6",
  dark: "#0F172A",
};

const PIE_COLORS = [COLORS.indigo, COLORS.mint, COLORS.amber, COLORS.violet, COLORS.rose, COLORS.blue];

// ─── Custom Tooltip (Refined) ───
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xl shadow-slate-200/50 backdrop-blur-md">
      <p className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-50 pb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-[12px] font-semibold text-slate-600">{p.name}</span>
          </div>
          <span className="text-[12px] font-extrabold text-slate-900">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Section Header (Refined) ───
function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm text-indigo-500">
        <Icon size={22} />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
        {title}
      </h3>
    </div>
  );
}

// ─── Stat Card (Refined) ───
function StatCard({ icon: Icon, title, value, colorClass }) {
  return (
    <div className="bg-white rounded-4xl p-6 shadow-sm border border-gray-50 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 rounded-2xl ${colorClass} shadow-sm group-hover:scale-110 transition-transform`}>
          <Icon size={20} />
        </div>
        <Info size={16} className="text-slate-200" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">
          {title}
        </p>
        <h4 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {value ? value.toLocaleString() : 0}
        </h4>
      </div>
    </div>
  );
}

// ─── Chart Card Wrapper (Refined) ───
function ChartCard({ children, title, className = "" }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm ${className}`}>
      {title && <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">{title}</p>}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}

export default function AnalyticsPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/admin/analytics");
        if (!res.ok) throw new Error("Failed to fetch real-time analytics data.");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Analytics fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={48} className="animate-spin text-indigo-500" strokeWidth={2} />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">Synchronizing Real Data</p>
      </div>
    );
  }

  if (error || !data || data.message) {
    return (
      <div className="p-20 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-2">
          <Info size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Data Connection Error</h2>
        <p className="text-slate-500 max-w-xs text-sm font-medium leading-relaxed">
          Unable to establish a connection with the analytics endpoint. Please check your API configuration.
        </p>
      </div>
    );
  }

  const { overview, userStatus, roleDistribution, noticesByRole, noteStats, classStats, eventStats, registrationTrend, notesByUploader } = data;

  const statusComparison = [
    { name: "Approved", Students: userStatus?.students?.approved || 0, Faculty: userStatus?.faculty?.approved || 0 },
    { name: "Pending", Students: userStatus?.students?.pending || 0, Faculty: userStatus?.faculty?.pending || 0 },
    { name: "Rejected", Students: userStatus?.students?.rejected || 0, Faculty: userStatus?.faculty?.rejected || 0 },
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-10" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .recharts-cartesian-axis-tick-value {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          fill: #94A3B8;
        }
      `}} />

      {/* ═══════════ PAGE HEADER ═══════════ */}
      <div className="relative overflow-hidden bg-slate-900 text-white p-10 md:p-14 rounded-[3rem] shadow-xl shadow-slate-200">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/10">
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 animate-ping"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Real-Time Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            Analytics & <br /> Insights
          </h1>
          <p className="max-w-xl mt-6 font-medium text-slate-400 leading-relaxed text-sm md:text-base">
            Live departmental analytics — streaming user engagement, resource metrics, and academic performance directly from your database.
          </p>
        </div>
      </div>

      {/* ═══════════ OVERVIEW KPIs ═══════════ */}
      <section className="space-y-8">
        <SectionHeader icon={BarChart3} title="Quick Overview" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Users} title="Students" value={overview?.totalStudents} colorClass="bg-indigo-50 text-indigo-600" />
          <StatCard icon={UserCheck} title="Faculty" value={overview?.totalFaculty} colorClass="bg-green-50 text-green-600" />
          <StatCard icon={GraduationCap} title="Classes" value={overview?.totalClasses} colorClass="bg-amber-50 text-amber-600" />
          <StatCard icon={BookOpen} title="Resources" value={overview?.totalNotes} colorClass="bg-violet-50 text-violet-600" />
          <StatCard icon={Bell} title="Notices" value={(noticesByRole?.[0]?.value || 0) + (noticesByRole?.[1]?.value || 0)} colorClass="bg-rose-50 text-rose-600" />
          <StatCard icon={CalendarDays} title="Events" value={overview?.totalEvents} colorClass="bg-blue-50 text-blue-600" />
          <StatCard icon={FileText} title="Registrations" value={overview?.totalRegistrations} colorClass="bg-indigo-50 text-indigo-600" />
          <StatCard icon={Target} title="Assignments" value={overview?.totalAssignments} colorClass="bg-amber-50 text-amber-600" />
        </div>
      </section>

      {/* ═══════════ USER ANALYTICS ═══════════ */}
      <section className="space-y-8">
        <SectionHeader icon={Users} title="Community Demographics" />

        <div className="grid lg:grid-cols-2 gap-8">
          <ChartCard title="User Role Distribution">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={roleDistribution || []}
                  cx="50%" cy="50%"
                  innerRadius={65} outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {(roleDistribution || []).map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} className="opacity-90 hover:opacity-100 transition-opacity" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="font-bold text-[11px] uppercase text-slate-500 tracking-wider ml-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Verification Status">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={statusComparison} barGap={8}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="font-bold text-[11px] uppercase text-slate-500 tracking-wider ml-2">{value}</span>}
                />
                <Bar dataKey="Students" fill={COLORS.indigo} radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="Faculty" fill={COLORS.mint} radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      {/* ═══════════ REGISTRATION TREND ═══════════ */}
      {registrationTrend?.length > 0 && (
        <section className="space-y-8">
          <SectionHeader icon={TrendingUp} title="Platform Growth" />

          <ChartCard title="New Signups Activity (Last 6 Months)">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={registrationTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.indigo} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={COLORS.indigo} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradFaculty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.mint} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={COLORS.mint} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right"
                  height={36}
                  formatter={(value) => <span className="font-bold text-[11px] uppercase text-slate-500 tracking-wider ml-2">{value}</span>}
                />
                <Area type="monotone" dataKey="students" name="Students"
                  stroke={COLORS.indigo} strokeWidth={3} fill="url(#gradStudents)" />
                <Area type="monotone" dataKey="faculty" name="Faculty"
                  stroke={COLORS.mint} strokeWidth={3} fill="url(#gradFaculty)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>
      )}

      {/* ═══════════ RESOURCE ANALYTICS ═══════════ */}
      <section className="space-y-8">
        <SectionHeader icon={BookOpen} title="Content Distribution" />

        <div className="grid lg:grid-cols-3 gap-8">
          <ChartCard title="By Format">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={noteStats?.byType || []}
                  cx="50%" cy="50%"
                  innerRadius={50} outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={COLORS.mint} />
                  <Cell fill={COLORS.amber} />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span className="font-bold text-[10px] uppercase text-slate-500 ml-1">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Resource Workflow">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={noteStats?.byStatus || []}
                  cx="50%" cy="50%"
                  innerRadius={50} outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={COLORS.mint} />
                  <Cell fill="#CBD5E1" />
                  <Cell fill={COLORS.rose} />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span className="font-bold text-[10px] uppercase text-slate-500 ml-1">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Uploader Segments">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={notesByUploader || []}
                  cx="50%" cy="50%"
                  innerRadius={50} outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={COLORS.violet} />
                  <Cell fill={COLORS.blue} />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span className="font-bold text-[10px] uppercase text-slate-500 ml-1">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      {/* ═══════════ NOTICES & EVENTS ═══════════ */}
      <section className="space-y-8">
        <SectionHeader icon={Bell} title="System Activity" />

        <div className="grid lg:grid-cols-2 gap-8">
          <ChartCard title="Notices Volume by Creator">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={noticesByRole || []} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Notices" radius={[0, 8, 8, 0]} barSize={32}>
                  {(noticesByRole || []).map((_, i) => (
                    <Cell key={i} fill={i === 0 ? COLORS.amber : COLORS.indigo} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {eventStats?.length > 0 && (
            <ChartCard title="Event Capacity Utilization">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={eventStats}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" hide />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend formatter={(value) => <span className="font-bold text-[10px] uppercase text-slate-500 ml-1">{value}</span>} />
                  <Bar dataKey="registered" name="Registered" fill={COLORS.mint} radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="capacity" name="Max Capacity" fill="#F1F5F9" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
        </div>
      </section>

      {/* ═══════════ CLASS-LEVEL BREAKDOWN ═══════════ */}
      {classStats?.length > 0 && (
        <section className="space-y-8">
          <SectionHeader icon={GraduationCap} title="Class Breakdown" />

          <ChartCard title="Resource Distribution per Class">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={classStats} barGap={4}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} interval={0} fontSize={10} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right"
                  height={36}
                  formatter={(value) => <span className="font-bold text-[10px] uppercase text-slate-500 tracking-wider ml-2">{value}</span>}
                />
                <Bar dataKey="students" name="Students" fill={COLORS.indigo} radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="notes" name="Resources" fill={COLORS.mint} radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="faculty" name="Faculty" fill={COLORS.rose} radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="notices" name="Notices" fill={COLORS.amber} radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden mt-8">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 tracking-tight">Class Intelligence Table</h4>
              <button className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest border border-indigo-100 px-4 py-1.5 rounded-full hover:bg-indigo-50 transition-colors">Export Data</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-6 font-bold text-[10px] uppercase tracking-widest text-slate-400">Class Identifier</th>
                    <th className="p-6 font-bold text-[10px] uppercase tracking-widest text-slate-400 text-center">Students</th>
                    <th className="p-6 font-bold text-[10px] uppercase tracking-widest text-slate-400 text-center">Faculty</th>
                    <th className="p-6 font-bold text-[10px] uppercase tracking-widest text-slate-400 text-center">Resources</th>
                    <th className="p-6 font-bold text-[10px] uppercase tracking-widest text-slate-400 text-center">Notices</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {classStats.map((cls, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-colors">
                      <td className="p-6 font-bold text-slate-700 tracking-tight">{cls.name}</td>
                      <td className="p-6 text-center">
                        <span className="text-sm font-bold text-slate-600">{cls.students}</span>
                      </td>
                      <td className="p-6 text-center">
                        <span className="text-sm font-bold text-slate-600">{cls.faculty}</span>
                      </td>
                      <td className="p-6 text-center">
                        <span className="text-sm font-bold text-slate-600">{cls.notes}</span>
                      </td>
                      <td className="p-6 text-center">
                        <span className="text-sm font-bold text-slate-600">{cls.notices}</span>
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