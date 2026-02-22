"use client";

import { useEffect, useState } from "react";
import {
  Send,
  Megaphone,
  Loader2,
  Users,
  UserCheck,
  GraduationCap,
  Search,
  Check,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminNotification() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [recipientType, setRecipientType] = useState("all_students");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    if (recipientType === "selected") {
      fetchUsers();
    }
  }, [recipientType]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers((data.users || []).filter((u) => u.role !== "admin"));
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllFiltered = () => {
    const filtered = filteredUsers.map((u) => u._id);
    setSelectedUsers((prev) => Array.from(new Set([...prev, ...filtered])));
  };

  const clearSelection = () => setSelectedUsers([]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      toast.warning("Please fill in both title and body");
      return;
    }

    if (recipientType === "selected" && selectedUsers.length === 0) {
      toast.warning("Please select at least one recipient");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          recipientType,
          recipientIds:
            recipientType === "selected" ? selectedUsers : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setTitle("");
        setBody("");
        setSelectedUsers([]);
      } else {
        toast.error(data.message || "Failed to send email");
      }
    } catch {
      toast.error("Failed to connect to server");
    } finally {
      setSending(false);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const recipientOptions = [
    { value: "all_students", label: "All Students", icon: GraduationCap },
    { value: "all_faculty", label: "All Faculty", icon: UserCheck },
    { value: "all", label: "Everyone", icon: Users },
    { value: "selected", label: "Select Recipients", icon: Mail },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      {/* ======= HEADER (UPDATED DECENT GRADIENT) ======= */}
      <div className="rounded-3xl p-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xl">
  <div className="flex items-center gap-4">
    
    <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl">
      <Megaphone size={26} />
    </div>

    <div>
      <h1 className="text-3xl md:text-4xl font-semibold">
        Email Notifications
      </h1>
      <p className="text-white/80 text-sm mt-1">
        Send announcements to students and faculty
      </p>
    </div>

  </div>
</div>

      <form onSubmit={handleSend} className="space-y-8">

        {/* ===== RECIPIENT SECTION ===== */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 space-y-6">

          <h2 className="text-lg font-semibold text-slate-800">
            Select Recipients
          </h2>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {recipientOptions.map((opt) => {
    const Icon = opt.icon;
    const isActive = recipientType === opt.value;

    const styles = {
      all_students: "bg-emerald-50 border-emerald-200 text-emerald-700",
      all_faculty: "bg-indigo-50 border-indigo-200 text-indigo-700",
      all: "bg-amber-50 border-amber-200 text-amber-700",
      selected: "bg-rose-50 border-rose-200 text-rose-700",
    };

    const activeStyles = {
      all_students: "bg-emerald-600 text-white border-emerald-600",
      all_faculty: "bg-indigo-600 text-white border-indigo-600",
      all: "bg-amber-500 text-white border-amber-500",
      selected: "bg-rose-500 text-white border-rose-500",
    };

    return (
      <button
        key={opt.value}
        type="button"
        onClick={() => setRecipientType(opt.value)}
        className={`p-4 rounded-xl border text-sm font-medium transition-all
          ${
            isActive
              ? activeStyles[opt.value]
              : styles[opt.value] + " hover:shadow-md"
          }`}
      >
        <Icon size={20} className="mx-auto mb-2" />
        {opt.label}
      </button>
    );
  })}
</div>

          {recipientType === "selected" && (
            <div className="space-y-4">

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={selectAllFiltered}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm"
                >
                  Clear
                </button>
              </div>

              {loadingUsers ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="animate-spin text-indigo-600" />
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-lg divide-y">
                  {filteredUsers.map((u) => {
                    const isSelected = selectedUsers.includes(u._id);
                    return (
                      <div
                        key={u._id}
                        onClick={() => toggleUser(u._id)}
                        className={`p-3 flex justify-between items-center cursor-pointer transition ${
                          isSelected
                            ? "bg-indigo-50"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <p className="font-medium text-slate-800">
                            {u.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {u.email}
                          </p>
                        </div>
                        {isSelected && (
                          <Check size={18} className="text-indigo-600" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===== EMAIL CONTENT ===== */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 space-y-6">

          <h2 className="text-lg font-semibold text-slate-800">
            Compose Email
          </h2>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Subject
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter subject..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              rows="6"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full mt-2 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Write your message..."
            />
          </div>
        </div>

        {/* ===== SEND BUTTON ===== */}
        <button
          type="submit"
          disabled={sending}
          className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all
            ${
              sending
                ? "bg-slate-300 text-slate-500"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
            }`}
        >
          {sending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              Sending...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Send size={20} />
              Send Email
            </span>
          )}
        </button>
      </form>
    </div>
  );
}