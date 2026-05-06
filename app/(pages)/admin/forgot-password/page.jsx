'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { forgotPasswordApi, verifyOtpApi, resetPasswordApi } from '@/app/api/adminApi';

export default function ForgotPassword() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!newPassword) { setStrength(0); return; }
    let s = 0;
    if (newPassword.length >= 8) s++;
    if (/[A-Z]/.test(newPassword)) s++;
    if (/[0-9]/.test(newPassword)) s++;
    if (/[^A-Za-z0-9]/.test(newPassword)) s++;
    setStrength(s);
  }, [newPassword]);

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e', '#10b981'];

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await forgotPasswordApi(email);
      setSuccess(res.message);
      setStep(2);
    } catch (err) { setError(err.message || 'Failed to send OTP'); }
    finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await verifyOtpApi(email, otp);
      setSuccess(res.message);
      setStep(3);
    } catch (err) { setError(err.message || 'Invalid OTP'); }
    finally { setLoading(false); }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await resetPasswordApi(email, newPassword);
      setSuccess(res.message);
      setTimeout(() => router.push('/admin/login'), 2000);
    } catch (err) { setError(err.message || 'Failed to reset password'); }
    finally { setLoading(false); }
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    .fp-root {
      min-height: 100vh;
      background: #080f09;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
      position: relative;
      overflow: hidden;
      font-family: 'DM Sans', sans-serif;
    }

    .fp-aurora {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }
    .fp-aurora::before {
      content: '';
      position: absolute;
      top: -20%;
      left: -20%;
      width: 70%;
      height: 70%;
      background: radial-gradient(ellipse, rgba(16, 185, 129, 0.12) 0%, transparent 70%);
      animation: aurora1 12s ease-in-out infinite alternate;
    }
    .fp-aurora::after {
      content: '';
      position: absolute;
      bottom: -20%;
      right: -10%;
      width: 60%;
      height: 60%;
      background: radial-gradient(ellipse, rgba(52, 211, 153, 0.08) 0%, transparent 70%);
      animation: aurora2 15s ease-in-out infinite alternate;
    }
    @keyframes aurora1 { from { transform: translate(0,0) scale(1); } to { transform: translate(6%,4%) scale(1.1); } }
    @keyframes aurora2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-4%,-5%) scale(1.15); } }

    .fp-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px);
      background-size: 48px 48px;
      pointer-events: none;
    }

    .fp-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }
    .fp-orb-1 {
      width: 3px; height: 3px;
      background: rgba(52,211,153,0.6);
      top: 18%; left: 12%;
      box-shadow: 0 0 8px rgba(52,211,153,0.4);
      animation: float1 8s ease-in-out infinite;
    }
    .fp-orb-2 {
      width: 2px; height: 2px;
      background: rgba(52,211,153,0.4);
      top: 70%; right: 18%;
      animation: float2 11s ease-in-out infinite;
    }
    .fp-orb-3 {
      width: 4px; height: 4px;
      background: rgba(16,185,129,0.5);
      top: 40%; right: 8%;
      box-shadow: 0 0 10px rgba(16,185,129,0.3);
      animation: float1 9s ease-in-out infinite reverse;
    }
    @keyframes float1 {
      0%,100% { transform: translateY(0px) translateX(0px); }
      33% { transform: translateY(-18px) translateX(8px); }
      66% { transform: translateY(10px) translateX(-6px); }
    }
    @keyframes float2 {
      0%,100% { transform: translateY(0px); }
      50% { transform: translateY(-24px); }
    }

    .fp-card {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 440px;
      background: rgba(10, 20, 12, 0.8);
      border: 1px solid rgba(52, 211, 153, 0.15);
      border-radius: 24px;
      padding: 48px 44px;
      backdrop-filter: blur(24px);
      box-shadow:
        0 0 0 1px rgba(52, 211, 153, 0.06),
        0 32px 80px rgba(0,0,0,0.6),
        inset 0 1px 0 rgba(52,211,153,0.1);
      animation: cardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes cardIn {
      from { opacity: 0; transform: translateY(28px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .fp-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;
    }
    .fp-logo-ring {
      width: 64px; height: 64px;
      border-radius: 16px;
      background: linear-gradient(135deg, #052010 0%, #0d3b1a 100%);
      border: 1px solid rgba(52,211,153,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 30px rgba(16,185,129,0.2), inset 0 1px 0 rgba(52,211,153,0.15);
      position: relative;
    }
    .fp-logo-ring::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: 17px;
      background: linear-gradient(135deg, rgba(52,211,153,0.3), rgba(16,185,129,0.05));
      z-index: -1;
    }
    .fp-leaf {
      width: 28px; height: 28px;
      fill: #34d399;
      filter: drop-shadow(0 0 6px rgba(52,211,153,0.5));
    }

    .fp-steps {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      margin-bottom: 32px;
    }
    .fp-step-dot {
      width: 28px; height: 28px;
      border-radius: 50%;
      border: 1.5px solid rgba(52,211,153,0.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 11px;
      font-weight: 600;
      font-family: 'DM Sans', sans-serif;
      color: rgba(52,211,153,0.3);
      transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
      position: relative;
      z-index: 1;
    }
    .fp-step-dot.active {
      border-color: #34d399;
      background: rgba(52,211,153,0.12);
      color: #34d399;
      box-shadow: 0 0 14px rgba(52,211,153,0.25);
    }
    .fp-step-dot.done {
      border-color: #10b981;
      background: #10b981;
      color: #052010;
    }
    .fp-step-line {
      width: 48px;
      height: 1px;
      background: rgba(52,211,153,0.12);
      position: relative;
      overflow: hidden;
    }
    .fp-step-line-fill {
      position: absolute;
      left: 0; top: 0;
      height: 100%;
      background: linear-gradient(90deg, #10b981, #34d399);
      transition: width 0.6s cubic-bezier(0.16,1,0.3,1);
    }

    .fp-heading {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2rem;
      font-weight: 700;
      color: #f0fdf4;
      text-align: center;
      letter-spacing: -0.02em;
      line-height: 1.15;
      margin-bottom: 6px;
    }
    .fp-sub {
      font-size: 13px;
      color: rgba(167,243,208,0.55);
      text-align: center;
      font-weight: 400;
      margin-bottom: 28px;
      line-height: 1.5;
    }

    .fp-alert {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 20px;
      animation: alertIn 0.3s ease both;
    }
    @keyframes alertIn {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fp-alert-err {
      background: rgba(239,68,68,0.08);
      border: 1px solid rgba(239,68,68,0.2);
      color: #fca5a5;
    }
    .fp-alert-ok {
      background: rgba(16,185,129,0.08);
      border: 1px solid rgba(16,185,129,0.2);
      color: #6ee7b7;
    }
    .fp-alert-icon {
      width: 16px; height: 16px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .fp-field { margin-bottom: 20px; }
    .fp-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(167,243,208,0.5);
      margin-bottom: 8px;
    }
    .fp-input-wrap {
      position: relative;
    }
    .fp-input-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px; height: 16px;
      color: rgba(52,211,153,0.35);
      pointer-events: none;
      transition: color 0.2s;
    }
    .fp-input-wrap:focus-within .fp-input-icon {
      color: #34d399;
    }
    .fp-input {
      width: 100%;
      padding: 14px 14px 14px 42px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(52,211,153,0.12);
      border-radius: 12px;
      color: #f0fdf4;
      font-size: 14px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 400;
      outline: none;
      transition: all 0.25s ease;
      caret-color: #34d399;
    }
    .fp-input::placeholder { color: rgba(167,243,208,0.2); }
    .fp-input:focus {
      border-color: rgba(52,211,153,0.45);
      background: rgba(52,211,153,0.04);
      box-shadow: 0 0 0 3px rgba(52,211,153,0.08);
    }
    .fp-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .fp-otp-input {
      text-align: center;
      letter-spacing: 0.4em;
      font-size: 20px;
      font-weight: 600;
      padding-left: 42px;
    }

    .fp-eye {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: rgba(52,211,153,0.3);
      padding: 4px;
      display: flex; align-items: center;
      transition: color 0.2s;
    }
    .fp-eye:hover { color: #34d399; }

    .fp-strength {
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .fp-strength-bars {
      display: flex;
      gap: 4px;
    }
    .fp-strength-bar {
      flex: 1;
      height: 3px;
      border-radius: 4px;
      background: rgba(255,255,255,0.06);
      transition: background 0.4s ease;
      overflow: hidden;
    }
    .fp-strength-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    .fp-btn {
      width: 100%;
      padding: 15px;
      border-radius: 12px;
      border: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.04em;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.25s ease;
      margin-top: 8px;
    }
    .fp-btn-primary {
      background: linear-gradient(135deg, #059652 0%, #10b981 50%, #34d399 100%);
      color: #052010;
      box-shadow: 0 4px 20px rgba(16,185,129,0.3), 0 1px 0 rgba(255,255,255,0.15) inset;
    }
    .fp-btn-primary:hover:not(:disabled) {
      box-shadow: 0 6px 28px rgba(16,185,129,0.45), 0 1px 0 rgba(255,255,255,0.15) inset;
      transform: translateY(-1px);
    }
    .fp-btn-primary:active:not(:disabled) {
      transform: translateY(0px);
      box-shadow: 0 2px 12px rgba(16,185,129,0.25);
    }
    .fp-btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .fp-btn-primary::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(255,255,255,0.12), transparent);
      border-radius: inherit;
      pointer-events: none;
    }

    .fp-btn-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .fp-spinner {
      width: 16px; height: 16px;
      border: 2px solid rgba(5,32,16,0.25);
      border-top-color: #052010;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .fp-back {
      display: block;
      text-align: center;
      margin-top: 24px;
      font-size: 13px;
      font-weight: 500;
      color: rgba(167,243,208,0.35);
      text-decoration: none;
      transition: color 0.2s;
      letter-spacing: 0.01em;
    }
    .fp-back:hover { color: #6ee7b7; }
    .fp-back-arrow { margin-right: 4px; }

    .fp-form {
      animation: formIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
    }
    @keyframes formIn {
      from { opacity: 0; transform: translateX(16px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .fp-divider {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 20px 0 16px;
    }
    .fp-divider-line {
      flex: 1;
      height: 1px;
      background: rgba(52,211,153,0.08);
    }
    .fp-divider-text {
      font-size: 11px;
      color: rgba(167,243,208,0.25);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
  `;

  const LeafIcon = () => (
    <svg viewBox="0 0 24 24" className="fp-leaf" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 4-8 4s2-6-2-6c-2.87 0-5.23 2.6-5.5 6 0 0 2.5-1 5.5 1z"/>
    </svg>
  );

  const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="fp-input-icon">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
    </svg>
  );
  const KeyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="fp-input-icon">
      <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>
    </svg>
  );
  const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="fp-input-icon">
      <rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  );
  const EyeIcon = ({ off }) => off ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
      <path d="M9.88 9.88a3 3 0 104.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0112 5c7 0 10 7 10 7a13.16 13.16 0 01-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 002 12s3 7 10 7a9.74 9.74 0 005.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
  const AlertIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fp-alert-icon">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
  const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fp-alert-icon">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
  const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}>
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );

  const stepDone = (s) => step > s;
  const stepActive = (s) => step === s;

  return (
    <>
      <style>{styles}</style>
      <div className="fp-root">
        <div className="fp-aurora" />
        <div className="fp-grid" />
        <div className="fp-orb fp-orb-1" />
        <div className="fp-orb fp-orb-2" />
        <div className="fp-orb fp-orb-3" />

        <div className="fp-card">

          {/* Logo */}
          <div className="fp-logo">
            <div className="fp-logo-ring">
              <LeafIcon />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="fp-steps">
            {[1, 2, 3].map((s, i) => (
              <React.Fragment key={s}>
                <div className={`fp-step-dot ${stepDone(s) ? 'done' : ''} ${stepActive(s) ? 'active' : ''}`}>
                  {stepDone(s) ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{width:12,height:12}}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : s}
                </div>
                {i < 2 && (
                  <div className="fp-step-line">
                    <div className="fp-step-line-fill" style={{ width: step > s ? '100%' : '0%' }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Title */}
          <h1 className="fp-heading">
            {step === 1 && 'Forgot Password'}
            {step === 2 && 'Verify Code'}
            {step === 3 && 'New Password'}
          </h1>
          <p className="fp-sub">
            {step === 1 && 'Enter your email to receive a one-time passcode'}
            {step === 2 && <>Code sent to <span style={{color:'rgba(167,243,208,0.8)', fontWeight:500}}>{email}</span></>}
            {step === 3 && 'Choose a strong, secure password'}
          </p>

          {/* Alerts */}
          {error && (
            <div className="fp-alert fp-alert-err">
              <AlertIcon />
              <span>{error}</span>
            </div>
          )}
          {success && !error && (
            <div className="fp-alert fp-alert-ok">
              <CheckIcon />
              <span>{success}</span>
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form className="fp-form" onSubmit={handleSendOtp} key="step1">
              <div className="fp-field">
                <label className="fp-label">Email Address</label>
                <div className="fp-input-wrap">
                  <MailIcon />
                  <input
                    className="fp-input"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
              </div>
              <button type="submit" className="fp-btn fp-btn-primary" disabled={loading}>
                <span className="fp-btn-inner">
                  {loading ? <><div className="fp-spinner" /><span>Sending...</span></> : <><span>Send Code</span><ArrowIcon /></>}
                </span>
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form className="fp-form" onSubmit={handleVerifyOtp} key="step2">
              <div className="fp-field">
                <label className="fp-label">Enter 6-Digit Code</label>
                <div className="fp-input-wrap">
                  <KeyIcon />
                  <input
                    className="fp-input fp-otp-input"
                    type="text"
                    required
                    maxLength="6"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g,''))}
                    placeholder="• • • • • •"
                    disabled={loading}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                  />
                </div>
              </div>
              <button type="submit" className="fp-btn fp-btn-primary" disabled={loading}>
                <span className="fp-btn-inner">
                  {loading ? <><div className="fp-spinner" /><span>Verifying...</span></> : <><span>Verify Code</span><ArrowIcon /></>}
                </span>
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form className="fp-form" onSubmit={handleResetPassword} key="step3">
              <div className="fp-field">
                <label className="fp-label">New Password</label>
                <div className="fp-input-wrap">
                  <LockIcon />
                  <input
                    className="fp-input"
                    style={{ paddingRight: 42 }}
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    disabled={loading}
                    autoComplete="new-password"
                  />
                  <button type="button" className="fp-eye" onClick={() => setShowPassword(p => !p)}>
                    <EyeIcon off={showPassword} />
                  </button>
                </div>
                {newPassword && (
                  <div className="fp-strength">
                    <div className="fp-strength-bars">
                      {[1,2,3,4].map(n => (
                        <div key={n} className="fp-strength-bar"
                          style={{ background: strength >= n ? strengthColor[strength] : undefined }}
                        />
                      ))}
                    </div>
                    <span className="fp-strength-label" style={{ color: strengthColor[strength] }}>
                      {strengthLabel[strength]}
                    </span>
                  </div>
                )}
              </div>
              <button type="submit" className="fp-btn fp-btn-primary" disabled={loading}>
                <span className="fp-btn-inner">
                  {loading ? <><div className="fp-spinner" /><span>Updating...</span></> : <><span>Reset Password</span><ArrowIcon /></>}
                </span>
              </button>
            </form>
          )}

          <Link href="/admin/login" className="fp-back">
            <span className="fp-back-arrow">←</span> Back to Login
          </Link>

        </div>
      </div>
    </>
  );
}