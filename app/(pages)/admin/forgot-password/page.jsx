'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { forgotPasswordApi, verifyOtpApi, resetPasswordApi } from '@/app/api/adminApi';
import { 
  Mail, 
  Lock, 
  KeyRound, 
  AlertCircle,
  CheckCircle2,
  Leaf,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

export default function ForgotPassword() {
  const router = useRouter();
  
  // States
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await forgotPasswordApi(email);
      setSuccess(res.message);
      setStep(2); // OTP wale step par jao
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await verifyOtpApi(email, otp); // Email automatically backend ko ja raha hai
      setSuccess(res.message);
      setStep(3); // Reset Password wale step par jao
    } catch (err) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await resetPasswordApi(email, newPassword); // Wapas email automatically gaya
      setSuccess(res.message);
      
      // 2 second baad login page par bhej do
      setTimeout(() => {
        router.push('/admin/login'); // Ya '/admin' agar page usi folder me hai
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white/50 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-[#1a3c22] to-[#2A5C32] rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Leaf className="text-white w-7 h-7" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-slate-800 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {step === 1 ? 'Forgot Password' : step === 2 ? 'Verify OTP' : 'Reset Password'}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500 font-medium">
            {step === 1 && "Enter your email to receive an OTP"}
            {step === 2 && `OTP sent to ${email}`}
            {step === 3 && "Enter your new secure password"}
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50/80 border border-red-100 text-red-600 p-4 rounded-xl text-sm flex items-center gap-3 animate-in fade-in">
            <AlertCircle size={18} className="shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-50/80 border border-green-100 text-green-600 p-4 rounded-xl text-sm flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 size={18} className="shrink-0" />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {/* STEP 1 FORM: EMAIL */}
        {step === 1 && (
          <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 px-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#2A5C32] transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2A5C32]/20 focus:border-[#2A5C32] focus:bg-white sm:text-sm"
                  placeholder="admin@example.com"
                  disabled={loading}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-[#1a3c22] to-[#2A5C32] hover:from-[#132c18] hover:to-[#1e4224] focus:outline-none shadow-md disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send OTP'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        )}

        {/* STEP 2 FORM: OTP */}
        {step === 2 && (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 px-1">Enter 6-digit OTP</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-slate-400 group-focus-within:text-[#2A5C32]" />
                </div>
                <input
                  type="text"
                  required
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 tracking-[0.5em] font-bold focus:outline-none focus:ring-2 focus:ring-[#2A5C32]/20 focus:border-[#2A5C32] focus:bg-white sm:text-lg text-center"
                  placeholder="------"
                  disabled={loading}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-[#1a3c22] to-[#2A5C32] hover:from-[#132c18] hover:to-[#1e4224] focus:outline-none shadow-md disabled:opacity-70"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {/* STEP 3 FORM: NEW PASSWORD */}
        {step === 3 && (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 px-1">New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#2A5C32]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2A5C32]/20 focus:border-[#2A5C32] focus:bg-white sm:text-sm"
                  placeholder="Enter new password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#2A5C32] focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-[#1a3c22] to-[#2A5C32] hover:from-[#132c18] hover:to-[#1e4224] focus:outline-none shadow-md disabled:opacity-70"
            >
              {loading ? 'Updating...' : 'Reset Password'}
            </button>
          </form>
        )}

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <Link 
            href="/admin/login" 
            className="text-sm font-bold text-slate-500 hover:text-[#2A5C32] transition-colors"
          >
            ← Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}