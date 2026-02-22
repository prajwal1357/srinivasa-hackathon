"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  Shield,
  GraduationCap,
  UserCheck,
  Loader2,
  Mail,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (roleFilter !== "all") params.set("role", roleFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => fetchUsers(), 300);
    return () => clearTimeout(timeout);
  }, [roleFilter, statusFilter, searchQuery]);

  const handleRoleChange = async (userId, newRole) => {
    setActionLoading(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Role changed to ${newRole}`);
        fetchUsers();
      } else toast.error(data.message || "Failed to update role");
    } catch {
      toast.error("Failed to connect to server");
    } finally {
      setActionLoading(null);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    setActionLoading(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Status changed to ${newStatus}`);
        fetchUsers();
      } else toast.error(data.message || "Failed to update status");
    } catch {
      toast.error("Failed to connect to server");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (userId) => {
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "User removed");
        setDeleteConfirm(null);
        fetchUsers();
      } else toast.error(data.message || "Failed to delete user");
    } catch {
      toast.error("Failed to connect to server");
    } finally {
      setActionLoading(null);
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-red-100 text-red-600",
      faculty: "bg-indigo-100 text-indigo-600",
      student: "bg-emerald-100 text-emerald-600",
    };
    const icons = {
      admin: Shield,
      faculty: UserCheck,
      student: GraduationCap,
    };
    const Icon = icons[role] || Users;

    return (
      <span
        className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${styles[role]}`}
      >
        <Icon size={12} />
        {role}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      approved: "bg-emerald-100 text-emerald-600",
      pending: "bg-yellow-100 text-yellow-600",
      rejected: "bg-rose-100 text-rose-600",
    };

    return (
      <span
        className={`text-xs font-medium px-3 py-1 rounded-full ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="rounded-3xl p-10 bg-gradient-to-br from-black to-gray-500 text-white shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold">
          User Management
        </h1>
        <p className="mt-4 text-white/80 max-w-xl">
          Manage user roles, approval status and system access.
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
        <div className="grid md:grid-cols-3 gap-4">

          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admins</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* USERS LIST */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-indigo-600" size={36} />
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-lg border border-slate-100 text-center">
          <Users size={40} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">
            No users found
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {user.name}
                    </h3>
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.status)}
                  </div>

                  <div className="mt-3 text-sm text-slate-500 flex flex-wrap gap-6">
                    <span className="flex items-center gap-1">
                      <Mail size={14} />
                      {user.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">

                  {/* Role Dropdown */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-slate-500">Role:</label>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      disabled={actionLoading === user._id}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium bg-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-slate-500">Status:</label>
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user._id, e.target.value)}
                      disabled={actionLoading === user._id}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium bg-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => setDeleteConfirm(user._id)}
                    disabled={actionLoading === user._id}
                    className="px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}