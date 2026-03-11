'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/dataContext/UserContext';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  Leaf,
  Eye,
  EyeOff,
  Info // ✅ Added Info icon for helper text
} from 'lucide-react';

export default function AdminRegister() {
  const { register, user, loading } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Admin',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/admin');
    }
  }, [user, loading, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(
      formData.name, 
      formData.email, 
      formData.phone, 
      formData.role, 
      formData.password
    );
    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.message || 'Registration failed. Please try again.');
    }
  };

  if (loading) return null; 

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white/50 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-[#1a3c22] to-[#2A5C32] rounded-2xl flex items-center justify-center shadow-lg mb-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <Leaf className="text-white w-7 h-7" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-slate-800 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500 font-medium">
            Register for Natura Admin Panel
          </p>
        </div>

        {/* Form Section */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50/80 border border-red-100 text-red-600 p-4 rounded-xl text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <div className="space-y-5">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1.5 px-1">
                <span>Full Name <span className="text-red-500">*</span></span>
                <span className="text-[10px] font-medium text-red-400 uppercase tracking-wider">Required</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-[#2A5C32] transition-colors" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2A5C32]/20 focus:border-[#2A5C32] focus:bg-white sm:text-sm transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>
              {/* ✅ Helper Text for Name */}
              <p className="mt-1.5 ml-1 text-xs text-slate-500 flex items-center gap-1">
               
         
              </p>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1.5 px-1">
                <span>Email Address <span className="text-red-500">*</span></span>
                <span className="text-[10px] font-medium text-red-400 uppercase tracking-wider">Required</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#2A5C32] transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2A5C32]/20 focus:border-[#2A5C32] focus:bg-white sm:text-sm transition-all duration-200"
                  placeholder="admin@example.com"
                />
              </div>
              {/* ✅ Helper Text for Email */}
              <p className="mt-1.5 ml-1 text-xs text-slate-500 flex items-center gap-1">
                <Info size={12} className="text-[#2A5C32]" />
                Must be a unique, unregistered email.
              </p>
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1.5 px-1">
                <span>Phone Number <span className="text-red-500">*</span></span>
                <span className="text-[10px] font-medium text-red-400 uppercase tracking-wider">Required</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-[#2A5C32] transition-colors" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2A5C32]/20 focus:border-[#2A5C32] focus:bg-white sm:text-sm transition-all duration-200"
                  placeholder="+91 9876543210"
                />
              </div>
              {/* ✅ Helper Text for Phone */}
              <p className="mt-1.5 ml-1 text-xs text-slate-500 flex items-center gap-1">
                <Info size={12} className="text-[#2A5C32]" />
                Must be a unique phone number.
              </p>
            </div>

            {/* Role Select */}
            <div>
              <label htmlFor="role" className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1.5 px-1">
                <span>Account Role <span className="text-red-500">*</span></span>
                <span className="text-[10px] font-medium text-red-400 uppercase tracking-wider">Required</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <ShieldCheck className="h-5 w-5 text-slate-400 group-focus-within:text-[#2A5C32] transition-colors" />
                </div>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2A5C32]/20 focus:border-[#2A5C32] focus:bg-white sm:text-sm transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="Admin">Admin</option>
                  <option value="SuperAdmin">Super Admin</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="flex justify-between items-center text-sm font-semibold text-slate-700 mb-1.5 px-1">
                <span>Password <span className="text-red-500">*</span></span>
                <span className="text-[10px] font-medium text-red-400 uppercase tracking-wider">Required</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#2A5C32] transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2A5C32]/20 focus:border-[#2A5C32] focus:bg-white sm:text-sm transition-all duration-200"
                  placeholder="Choose a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#2A5C32] transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 text-white">
            <button
              type="submit"
              className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-[#1a3c22] to-[#2A5C32] hover:from-[#132c18] hover:to-[#1e4224] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A5C32] shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Create Account
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Footer Link */}
          <div className="text-center mt-6">
            <span className="text-sm text-slate-500">
              Already have an account?{' '}
            </span>
      
            <Link 
              href="/admin/login" 
              className="text-sm font-bold text-[#2A5C32] hover:text-[#1a3c22] hover:underline transition-colors"
            >
              Sign In here
            </Link>

          </div>
        </form>
      </div>
    </div>
  );
}