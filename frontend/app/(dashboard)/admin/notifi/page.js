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
  X,
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

  // Fetch users when "selected" mode is chosen
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
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const selectAllFiltered = () => {
    const filtered = filteredUsers.map((u) => u._id);
    setSelectedUsers((prev) => {
      const newSet = new Set([...prev, ...filtered]);
      return Array.from(newSet);
    });
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
          recipientIds: recipientType === "selected" ? selectedUsers : undefined,
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
    } catch (err) {
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
    { value: "all_students", label: "All Students", icon: GraduationCap, color: "bg-[#FF71CE]" },
    { value: "all_faculty", label: "All Faculty", icon: UserCheck, color: "bg-[#01FFFF]" },
    { value: "all", label: "Everyone", icon: Users, color: "bg-[#FFD600]" },
    { value: "selected", label: "Select Recipients", icon: Mail, color: "bg-[#05FFA1]" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 font-mono animate-in fade-in duration-500">

      {/* Header */}
      <div className="relative overflow-hidden bg-[#FF8A5B] border-4 border-black p-8 rounded-[2rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute -top-1 -right-4 w-32 h-10 bg-[#FFD600] border-2 border-black rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-[10px] uppercase z-20 hidden md:flex">
          Email Mode
        </div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="bg-[#1E293B] p-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,214,0,1)] -rotate-3">
            <Megaphone size={40} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Send Email
            </h1>
            <p className="font-black uppercase text-xs mt-2 tracking-widest bg-white/40 inline-block px-2 border border-black">
              Admin Email Notifications
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSend} className="space-y-8">

        {/* Recipient Selection */}
        <div className="bg-white border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <span className="inline-block bg-[#1E293B] text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
            Step 1 — Select Recipients
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recipientOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = recipientType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRecipientType(opt.value)}
                  className={`p-4 border-4 border-black rounded-2xl font-black text-xs uppercase text-center transition-all
                    ${isActive
                      ? `${opt.color} shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] -translate-y-1`
                      : "bg-white hover:bg-gray-50 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                >
                  <Icon size={24} strokeWidth={3} className="mx-auto mb-2" />
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Individual User Selection */}
          {recipientType === "selected" && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search size={16} strokeWidth={3} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="SEARCH USERS..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-4 border-black rounded-xl font-bold text-xs uppercase outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  />
                </div>
                <button type="button" onClick={selectAllFiltered}
                  className="px-4 py-3 border-4 border-black rounded-xl bg-[#05FFA1] font-black text-[10px] uppercase hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all whitespace-nowrap">
                  Select All
                </button>
                <button type="button" onClick={clearSelection}
                  className="px-4 py-3 border-4 border-black rounded-xl bg-[#FDA4AF] font-black text-[10px] uppercase hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all whitespace-nowrap">
                  Clear
                </button>
              </div>

              {selectedUsers.length > 0 && (
                <div className="px-4 py-2 bg-[#FEF9C3] border-3 border-black rounded-xl font-black text-xs uppercase">
                  {selectedUsers.length} recipient{selectedUsers.length !== 1 ? "s" : ""} selected
                </div>
              )}

              {loadingUsers ? (
                <div className="flex justify-center py-8">
                  <Loader2 size={24} className="animate-spin" strokeWidth={3} />
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto border-4 border-black rounded-xl divide-y-2 divide-black">
                  {filteredUsers.map((u) => {
                    const isSelected = selectedUsers.includes(u._id);
                    return (
                      <div
                        key={u._id}
                        onClick={() => toggleUser(u._id)}
                        className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected ? "bg-[#05FFA1]" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div>
                          <p className="font-black text-xs uppercase">{u.name}</p>
                          <p className="text-[10px] font-bold text-gray-500">{u.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 border-2 border-black rounded-lg ${
                            u.role === "faculty" ? "bg-[#01FFFF]" : "bg-[#FF71CE]"
                          }`}>
                            {u.role}
                          </span>
                          {isSelected && <Check size={16} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                  {filteredUsers.length === 0 && (
                    <p className="p-4 text-center font-bold text-xs text-gray-400 uppercase">No users found</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Email Content */}
        <div className="bg-white border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <span className="inline-block bg-[#1E293B] text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Step 2 — Compose Email
          </span>

          <div className="space-y-3">
            <label className="font-black text-xs uppercase">Subject</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-4 border-4 border-black rounded-2xl font-black text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all outline-none placeholder:text-black/20"
              placeholder="e.g., URGENT: END SEMESTER SCHEDULE"
            />
          </div>

          <div className="space-y-3">
            <label className="font-black text-xs uppercase">Body</label>
            <textarea
              rows="8"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              className="w-full p-4 border-4 border-black rounded-2xl font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all outline-none leading-relaxed placeholder:text-black/20"
              placeholder="Write your email content here..."
            />
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={sending}
          className={`w-full flex items-center justify-center gap-4 border-4 border-black p-6 rounded-2xl font-black uppercase italic tracking-tighter text-2xl transition-all
            ${sending
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#4ADE80] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            }`}
        >
          {sending ? (
            <>
              <Loader2 size={28} className="animate-spin" strokeWidth={3} />
              Sending...
            </>
          ) : (
            <>
              <Send size={28} strokeWidth={3} />
              Send Email
            </>
          )}
        </button>
      </form>
    </div>
  );
}