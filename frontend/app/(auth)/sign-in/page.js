"use client";
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  GraduationCap, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  BookOpen, 
  IdCard,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

const SignupPage = () => {
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    usn: '',
    classId: '',
  });

  // Fetch classes for students
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('/auth/classes');
        if (response.ok) {
          const data = await response.json();
          setClasses(data);
        }
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'usn' ? value.toUpperCase() : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email.toLowerCase(),
          password: formData.password,
          role,
          ...(role === 'student' && {
            ...(formData.classId && { classId: formData.classId }),
            ...(formData.usn && { usn: formData.usn }),
          }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage({ type: 'success', text: data.message });
      setFormData({ name: '', email: '', password: '', confirmPassword: '', usn: '', classId: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-200 mb-4 transform transition-hover hover:rotate-6">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-slate-500 text-sm mt-2">Join the portal as a {role}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          
          {/* Role Toggle */}
          <div className="flex p-1.5 bg-slate-100/80 m-6 rounded-2xl">
            <button
              type="button"
              onClick={() => { setRole('student'); setMessage({type:'', text:''}); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                role === 'student' 
                ? 'bg-white text-indigo-600 shadow-md transform scale-[1.02]' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <User size={18} />
              Student
            </button>
            <button
              type="button"
              onClick={() => { setRole('faculty'); setMessage({type:'', text:''}); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                role === 'faculty' 
                ? 'bg-white text-indigo-600 shadow-md transform scale-[1.02]' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <IdCard size={18} />
              Faculty
            </button>
          </div>

          <div className="px-8 pb-10">
            {/* Status Messages */}
            {message.text && (
              <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 text-sm font-semibold border ${
                message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                : 'bg-rose-50 text-rose-700 border-rose-100'
              }`}>
                {message.type === 'success' ? <CheckCircle size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="name@institution.edu"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Student-only: USN & Class */}
              {role === 'student' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">USN</label>
                    <input
                      type="text"
                      name="usn"
                      placeholder="e.g. 1SI22CS045"
                      value={formData.usn}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-mono"
                    />
                  </div>

                  {classes.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Class</label>
                      <div className="relative">
                        <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                          name="classId"
                          value={formData.classId}
                          onChange={handleChange}
                          className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select Class (optional)</option>
                          {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      required
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-3 mt-6 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.97]"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Processing...</span>
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Link to login */}
            <div className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-indigo-600 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 px-4 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            By signing up, you agree to our terms. Your account will be 
            <span className="font-bold text-slate-500"> pending </span> 
            until approved by an administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;