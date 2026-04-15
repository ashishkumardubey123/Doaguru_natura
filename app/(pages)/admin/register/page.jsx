'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/Context/UserContext';
import Link from 'next/link';
import { 
  User, Mail, Phone, ShieldCheck, Lock, ArrowRight, 
  AlertCircle, Leaf, Eye, EyeOff, Info 
} from 'lucide-react';

export default function AdminRegister() {
  const { register, user, loading } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', role: 'Admin', password: ''
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
      formData.name, formData.email, formData.phone, formData.role, formData.password
    );
    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.message || 'Registration failed. Please try again.');
    }
  };

  if (loading) return null; 

  return (
    <>
      {/* 🌟 SINGLE Custom CSS Block - Error Fixed 🌟 */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatOrbs {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        /* Button Shimmer Effect */
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        
        .animate-fade-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        
        .animate-float-slow {
          animation: floatOrbs 12s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: floatOrbs 18s ease-in-out infinite reverse;
        }
      `}</style>

      <div className="min-h-screen bg-[#020617] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-emerald-500/30">
        
        {/* 🌟 Animated Premium Background 🌟 */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none animate-float-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px] pointer-events-none animate-float-slower"></div>
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[800px] h-[400px] bg-indigo-500/5 rounded-[100%] blur-[120px] pointer-events-none"></div>

        <div className="max-w-md w-full space-y-8 bg-slate-900/50 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.5)] border border-white/[0.05] relative z-10">
          
          {/* Header Section */}
          <div className="flex flex-col items-center animate-fade-up">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-900 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)] mb-5 transform transition-all duration-500 hover:scale-110 hover:rotate-6">
              <Leaf className="text-white w-8 h-8" />
            </div>
            <h2 className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">
              Join Natura
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400 font-medium">
              Create your admin workspace
            </p>
          </div>

          {/* Info Box */}
          <div className="animate-fade-up delay-100 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent px-5 py-4 text-sm text-amber-200/90 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <p className="font-semibold flex items-center gap-2 text-amber-400">
              <Info size={16} /> Approval System
            </p>
            <p className="mt-2 text-xs leading-relaxed text-amber-200/70">
              Admin accounts start in <span className="text-amber-400 font-medium">pending status</span> and require Super Admin approval. Only one Super Admin can exist in the system.
            </p>
          </div>

          {/* Form Section */}
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-center gap-3 animate-fade-up backdrop-blur-sm">
                <AlertCircle size={18} className="shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-5">
              {/* Name Input */}
              <div className="animate-fade-up delay-200">
                <label className="flex justify-between items-center text-sm font-semibold text-slate-300 mb-1.5 px-1">
                  <span>Full Name</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors duration-300" />
                  </div>
                  <input
                    name="name" type="text" required value={formData.name} onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-4 bg-slate-950/40 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-slate-900/60 sm:text-sm transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="animate-fade-up delay-300">
                <label className="flex justify-between items-center text-sm font-semibold text-slate-300 mb-1.5 px-1">
                  <span>Email Address</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors duration-300" />
                  </div>
                  <input
                    name="email" type="email" required value={formData.email} onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-4 bg-slate-950/40 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-slate-900/60 sm:text-sm transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="animate-fade-up delay-400">
                <label className="flex justify-between items-center text-sm font-semibold text-slate-300 mb-1.5 px-1">
                  <span>Phone Number</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors duration-300" />
                  </div>
                  <input
                    name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-4 bg-slate-950/40 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-slate-900/60 sm:text-sm transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              {/* Role Select */}
              <div className="animate-fade-up delay-500">
                <label className="flex justify-between items-center text-sm font-semibold text-slate-300 mb-1.5 px-1">
                  <span>Account Role</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors duration-300" />
                  </div>
                  <select
                    name="role" required value={formData.role} onChange={handleChange}
                    className="block w-full pl-11 pr-10 py-4 bg-slate-950/40 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-slate-900/60 sm:text-sm transition-all duration-300 appearance-none cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                  >
                    <option value="Admin" className="bg-slate-900">Admin</option>
                    <option value="SuperAdmin" className="bg-slate-900">Super Admin</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="animate-fade-up delay-600">
                <label className="flex justify-between items-center text-sm font-semibold text-slate-300 mb-1.5 px-1">
                  <span>Password</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors duration-300" />
                  </div>
                  <input
                    name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleChange}
                    className="block w-full pl-11 pr-12 py-4 bg-slate-950/40 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-slate-900/60 sm:text-sm transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-emerald-400 transition-colors duration-300 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-white animate-fade-up delay-700">
              <button
                type="submit"
                className="group relative w-full flex justify-center items-center gap-2 py-4 px-4 border border-white/10 text-sm font-bold rounded-2xl text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Button Shine Effect - Moved Keyframes to Top */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                
                Create Account
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
            
            {/* Footer Link */}
            <div className="text-center mt-6 animate-fade-up delay-700">
              <span className="text-sm text-slate-400">
                Already have an account?{' '}
              </span>
              <Link 
                href="/admin/login" 
                className="text-sm font-bold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors duration-300"
              >
                Sign In here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}