"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  Trash2,
  ArrowUpDown,
  Shield,
  GraduationCap,
  UserCheck,
  Loader2,
  AlertTriangle,
  X,
  ChevronDown,
  Mail,
  Clock,
  IdCard,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState(null); // userId being acted on
  const [deleteConfirm, setDeleteConfirm] = useState(null); // userId to confirm delete

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
      console.error("Fetch users error:", err);
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
      } else {
        toast.error(data.message || "Failed to update role");
      }
    } catch (err) {
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
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
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
      } else {
        toast.error(data.message || "Failed to delete user");
      }
    } catch (err) {
      toast.error("Failed to connect to server");
    } finally {
      setActionLoading(null);
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-[#FFD600] text-black",
      faculty: "bg-[#01FFFF] text-black",
      student: "bg-[#FF71CE] text-black",
    };
    const icons = {
      admin: Shield,
      faculty: UserCheck,
      student: GraduationCap,
    };
    const Icon = icons[role] || Users;
    return (
      <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1 border-2 border-black rounded-lg ${styles[role] || "bg-gray-200"}`}>
        <Icon size={12} strokeWidth={3} />
        {role}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      approved: "bg-[#05FFA1]",
      pending: "bg-[#FEF9C3]",
      rejected: "bg-[#FDA4AF]",
    };
    return (
      <span className={`text-[10px] font-black uppercase px-3 py-1 border-2 border-black rounded-lg ${styles[status] || "bg-gray-200"}`}>
        {status}
      </span>
    );
  };

  const totalCounts = {
    all: users.length,
    student: users.filter((u) => u.role === "student").length,
    faculty: users.filter((u) => u.role === "faculty").length,
    admin: users.filter((u) => u.role === "admin").length,
  };

  return (
    <div className="space-y-10 font-mono animate-in fade-in duration-500">

      {/* Header */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-black p-8 md:p-10 bg-[#C4B5FD] text-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute top-5 right-8 w-28 h-8 bg-[#FFD600] border-2 border-black -rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-[10px] uppercase hidden md:flex">
          Admin Only
        </div>
        <div className="absolute -bottom-6 right-20 w-20 h-20 bg-[#01FFFF] border-4 border-black rounded-full hidden md:block" />

        <div className="relative z-10">
          <div className="inline-block px-5 py-2 bg-[#1E293B] border-2 border-black rounded-lg text-[10px] text-white font-black uppercase tracking-[0.2em] mb-6">
            User Management
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter">
            All Users
          </h1>
          <p className="mt-4 font-bold text-black/60 text-xs uppercase max-w-lg">
            View all users, change roles (student ↔ faculty), update approval status, or remove users from the system.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="grid md:grid-cols-3 gap-4">

          {/* Search */}
          <div className="relative">
            <Search size={18} strokeWidth={3} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="SEARCH NAME, EMAIL, USN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-4 border-black rounded-xl font-bold text-xs uppercase bg-white outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-4 py-3 border-4 border-black rounded-xl font-black text-xs uppercase bg-white appearance-none outline-none cursor-pointer focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admins</option>
            </select>
            <ChevronDown size={18} strokeWidth={3} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border-4 border-black rounded-xl font-black text-xs uppercase bg-white appearance-none outline-none cursor-pointer focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown size={18} strokeWidth={3} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Quick filter tags */}
        <div className="flex flex-wrap gap-3 mt-4">
          {["all", "student", "faculty", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-4 py-2 border-3 border-black rounded-xl font-black text-[10px] uppercase transition-all ${
                roleFilter === r
                  ? "bg-[#1E293B] text-white shadow-[3px_3px_0px_0px_rgba(255,214,0,1)] -translate-y-0.5"
                  : "bg-white hover:bg-[#FEF9C3] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              }`}
            >
              {r === "all" ? "All" : r} ({r === "all" ? users.length : users.filter(u => u.role === r).length})
            </button>
          ))}
        </div>
      </div>

      {/* Users List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={40} className="animate-spin" strokeWidth={3} />
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white border-4 border-black rounded-3xl p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          <Users size={48} strokeWidth={3} className="mx-auto mb-4 text-gray-300" />
          <p className="font-black text-lg uppercase text-gray-400">No users found</p>
          <p className="font-bold text-xs text-gray-300 uppercase mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden"
            >
              <div className="p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-black text-lg uppercase tracking-tight truncate">{user.name}</h3>
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] font-bold text-gray-500 uppercase">
                      <span className="flex items-center gap-1.5">
                        <Mail size={12} strokeWidth={3} />
                        {user.email}
                      </span>
                      {user.usn && (
                        <span className="flex items-center gap-1.5">
                          <IdCard size={12} strokeWidth={3} />
                          {user.usn}
                        </span>
                      )}
                      {user.class && (
                        <span className="flex items-center gap-1.5">
                          <BookOpen size={12} strokeWidth={3} />
                          {user.class.name}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} strokeWidth={3} />
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  {user.role !== "admin" && (
                    <div className="flex items-center gap-2 flex-wrap shrink-0">

                      {/* Change Role */}
                      {user.role === "student" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "faculty")}
                          disabled={actionLoading === user._id}
                          className="flex items-center gap-1.5 px-4 py-2 border-3 border-black rounded-xl bg-[#01FFFF] font-black text-[10px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
                        >
                          {actionLoading === user._id ? <Loader2 size={12} className="animate-spin" /> : <ArrowUpDown size={12} strokeWidth={3} />}
                          Promote to Faculty
                        </button>
                      )}

                      {user.role === "faculty" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "student")}
                          disabled={actionLoading === user._id}
                          className="flex items-center gap-1.5 px-4 py-2 border-3 border-black rounded-xl bg-[#FF71CE] font-black text-[10px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
                        >
                          {actionLoading === user._id ? <Loader2 size={12} className="animate-spin" /> : <ArrowUpDown size={12} strokeWidth={3} />}
                          Demote to Student
                        </button>
                      )}

                      {/* Change Status */}
                      {user.status !== "approved" && (
                        <button
                          onClick={() => handleStatusChange(user._id, "approved")}
                          disabled={actionLoading === user._id}
                          className="flex items-center gap-1.5 px-4 py-2 border-3 border-black rounded-xl bg-[#05FFA1] font-black text-[10px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
                        >
                          Approve
                        </button>
                      )}

                      {user.status === "approved" && (
                        <button
                          onClick={() => handleStatusChange(user._id, "rejected")}
                          disabled={actionLoading === user._id}
                          className="flex items-center gap-1.5 px-4 py-2 border-3 border-black rounded-xl bg-[#FEF9C3] font-black text-[10px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
                        >
                          Suspend
                        </button>
                      )}

                      {/* Delete */}
                      {deleteConfirm === user._id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(user._id)}
                            disabled={actionLoading === user._id}
                            className="flex items-center gap-1.5 px-4 py-2 border-3 border-black rounded-xl bg-red-500 text-white font-black text-[10px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
                          >
                            {actionLoading === user._id ? <Loader2 size={12} className="animate-spin" /> : <AlertTriangle size={12} strokeWidth={3} />}
                            Confirm Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="p-2 border-3 border-black rounded-xl bg-white hover:bg-gray-100 transition-colors"
                          >
                            <X size={14} strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(user._id)}
                          className="flex items-center gap-1.5 px-3 py-2 border-3 border-black rounded-xl bg-[#FDA4AF] font-black text-[10px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                        >
                          <Trash2 size={12} strokeWidth={3} />
                          Remove
                        </button>
                      )}
                    </div>
                  )}

                  {/* Admin badge */}
                  {user.role === "admin" && (
                    <div className="px-4 py-2 bg-[#FFD600] border-3 border-black rounded-xl font-black text-[10px] uppercase">
                      <Shield size={12} strokeWidth={3} className="inline mr-1" />
                      Protected
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer count */}
      {!loading && users.length > 0 && (
        <div className="text-center">
          <span className="inline-block px-6 py-2 bg-white border-4 border-black rounded-xl font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Showing {users.length} user{users.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
}
