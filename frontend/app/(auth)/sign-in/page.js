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

const App = () => {
  const [role, setRole] = useState('student'); // 'student' or 'faculty'
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rollNo: '',
    usn: '',
    classId: '',
  });

  // Fetch classes for the dropdown
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Mocking the class list
        const mockClasses = [
          { _id: '1', name: '1st Year BCA A' },
          { _id: '2', name: '2nd Year BCA B' },
          { _id: '3', name: '3rd Year BCA A' },
        ];
        setClasses(mockClasses);
      } catch (err) {
        console.error("Error fetching classes");
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
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role,
          classId: role === 'student' ? formData.classId : undefined,
          usn: role === 'student' ? formData.usn : undefined,
          rollNo: role === 'student' ? formData.rollNo : undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage({ type: 'success', text: data.message });
      setFormData({ name: '', email: '', password: '', confirmPassword: '', rollNo: '', usn: '', classId: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        
        {/* Branding/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200 mb-4">
            <GraduationCap size={28} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create an account</h1>
          <p className="text-slate-500 text-sm mt-1">Join our academic portal to get started</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* Role Toggle Tabs */}
          <div className="flex p-1 bg-slate-100/80 m-6 rounded-xl">
            <button
              onClick={() => setRole('student')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                role === 'student' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <User size={16} />
              Student
            </button>
            <button
              onClick={() => setRole('faculty')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                role === 'faculty' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <IdCard size={16} />
              Faculty
            </button>
          </div>

          <div className="px-8 pb-8">
            {/* Notifications */}
            {message.text && (
              <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm font-medium border ${
                message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                : 'bg-rose-50 text-rose-700 border-rose-100'
              }`}>
                {message.type === 'success' ? <CheckCircle size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="alex@institution.edu"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Student Fields Row */}
              {role === 'student' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Roll No</label>
                    <input
                      required
                      type="text"
                      name="rollNo"
                      placeholder="001"
                      value={formData.rollNo}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">USN</label>
                    <input
                      required
                      type="text"
                      name="usn"
                      placeholder="1XX00..."
                      value={formData.usn}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-mono uppercase"
                    />
                  </div>
                </div>
              )}

              {/* Class Selection */}
              {role === 'student' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Current Class</label>
                  <div className="relative group">
                    <BookOpen className="absolute left-3 top-3 text-slate-400 group-focus-within:text-indigo-500" size={18} />
                    <select
                      required
                      name="classId"
                      value={formData.classId}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select your class</option>
                      {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={16} />
                  </div>
                </div>
              )}

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 text-slate-400 group-focus-within:text-indigo-500" size={18} />
                    <input
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Confirm</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 text-slate-400 group-focus-within:text-indigo-500" size={18} />
                    <input
                      required
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 active:scale-[0.98]"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
              </button>
            </form>
          </div>
        </div>

        {/* Informational Footer */}
        <p className="mt-8 text-center text-xs text-slate-400 leading-relaxed px-4">
          By signing up, you agree to our terms of service. Your account will be 
          <span className="font-semibold text-slate-500"> pending </span> 
          until verified by a {role === 'student' ? 'Faculty' : 'System Admin'}.
        </p>
      </div>
    </div>
  );
};

export default App;