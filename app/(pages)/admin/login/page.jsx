'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/dataContext/UserContext';
import Link from 'next/link';
import { 
  Mail, 
  Lock, 
  LogIn, 
  AlertCircle,
  Leaf,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AdminLogin() {
  const { login, user, loading } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ✅ Password toggle state
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/admin');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.message || 'Invalid email or password');
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white relative z-10">
        
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-[#1a3c22] to-[#2A5C32] rounded-2xl flex items-center justify-center shadow-lg mb-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <Leaf className="text-white w-7 h-7" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-slate-800 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500 font-medium">
            Sign in to access Natura Admin Panel
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {error && (
            <div className="bg-red-50/80 border border-red-100 text-red-600 p-4 rounded-xl text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#2A5C32] transition-colors" />
              </div>
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2A5C32]/20 focus:border-[#2A5C32] focus:bg-white sm:text-sm transition-all duration-200"
                placeholder="Email Address"
              />
            </div>

            {/* ✅ Password Input with Toggle */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#2A5C32] transition-colors" />
              </div>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2A5C32]/20 focus:border-[#2A5C32] focus:bg-white sm:text-sm transition-all duration-200"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#2A5C32] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-[#1a3c22] to-[#2A5C32] hover:from-[#132c18] hover:to-[#1e4224] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2A5C32] shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Sign In
              <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="text-center mt-6">
            <span className="text-sm text-slate-500">
              Don't have an account?{' '}
            </span>
            <Link 
              href="/admin/register" 
              className="text-sm font-bold text-[#2A5C32] hover:text-[#1a3c22] hover:underline transition-colors"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}