'use client';

import { useState, useContext } from "react";
import { ArrowRight, User, Mail, MessageSquare, AlertCircle, Loader2 } from "lucide-react";
import { FormsContext } from "@/Context/FormsContext";

const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
const isValidPhone = (val) => val.length === 0 || val.length === 10;

const ErrorMsg = ({ msg }) => msg ? (
  <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 duration-200">
    <AlertCircle size={13} className="shrink-0" />
    {msg}
  </p>
) : null;

export default function GeneralInquiry({ setSubmitted }) {
  const { submitForm } = useContext(FormsContext);
  const [form, setForm] = useState({
    name: "", email: "", countryCode: "+91", phone: "", message: ""
  });
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: digitsOnly });
  };

  const show = (field) => touched[field] || submitAttempted;

  const emailError = show("email") && form.email && !isValidEmail(form.email)
    ? "Enter the correct email format – e.g.: name@example.com"
    : null;

  const phoneError = show("phone") && !isValidPhone(form.phone)
    ? "Phone number must have exactly 10 digits"
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if ((form.email && !isValidEmail(form.email)) || !isValidPhone(form.phone)) return;

    setIsSubmitting(true);
    try {
      const payload = { ...form, phone: form.phone ? `${form.countryCode} ${form.phone}` : "" };
      const result = await submitForm("General Inquiry", payload);
      if (result.success) setSubmitted(true);
      else alert(result.message || "Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const base = "w-full bg-gray-50/50 border text-gray-900 rounded-xl px-4 py-3 text-base sm:text-sm focus:outline-none focus:ring-4 focus:bg-white transition-all duration-500 ease-out placeholder:text-gray-400 shadow-sm min-h-[48px]";
  const inputCls = (hasError) => `${base} ${hasError
    ? "border-red-400 focus:border-red-400 focus:ring-red-400/15 hover:border-red-300"
    : "border-gray-200 focus:ring-[#2A5C32]/15 focus:border-[#2A5C32] hover:border-gray-300"}`;

  return (
    <form onSubmit={handleSubmit}
      className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out w-full max-w-2xl mx-auto">

      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 block">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2A5C32] transition-colors duration-500">
            <User size={18} />
          </div>
          <input name="name" value={form.name} onChange={handleChange} required
            className={`${inputCls(false)} pl-11`} placeholder="John Smith" autoComplete="name" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 block">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-500 ${emailError ? "text-red-400" : "text-gray-400 group-focus-within:text-[#2A5C32]"}`}>
              <Mail size={18} />
            </div>
            <input type="email" name="email" value={form.email}
              onChange={handleChange} onBlur={handleBlur} required
              className={`${inputCls(!!emailError)} pl-11`} placeholder="john@example.com"
              autoComplete="email" />
          </div>
          <ErrorMsg msg={emailError} />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 block">Phone Number</label>
          <div className="flex gap-2">
            <select name="countryCode" value={form.countryCode} onChange={handleChange}
              className="shrink-0 w-[88px] sm:w-[104px] bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl px-2 sm:px-3 py-3 text-base sm:text-sm focus:outline-none focus:ring-4 focus:ring-[#2A5C32]/15 focus:border-[#2A5C32] focus:bg-white transition-all duration-500 cursor-pointer shadow-sm hover:border-gray-300 min-h-[48px]">
              <option value="+91">IN +91</option>
              <option value="+1">US +1</option>
              <option value="+44">UK +44</option>
              <option value="+971">UAE +971</option>
              <option value="+61">AU +61</option>
              <option value="+65">SG +65</option>
            </select>
            <div className="flex-1 min-w-0">
              <input type="tel" name="phone" value={form.phone}
                onChange={handlePhoneChange} onBlur={handleBlur}
                inputMode="numeric" maxLength={10}
                className={`${inputCls(!!phoneError)} w-full`} placeholder="9876543210"
                autoComplete="tel-national" />
              <ErrorMsg msg={phoneError} />
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 block">
          Message <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute top-[14px] left-0 pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#2A5C32] transition-colors duration-500">
            <MessageSquare size={18} />
          </div>
          <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
            className={`${inputCls(false)} pl-11 resize-none`} placeholder="How can we help you?" />
        </div>
      </div>

      {/* Submit */}
      <div>
        <button type="submit" disabled={isSubmitting}
          className={`group w-full flex items-center justify-center gap-2 font-bold py-4 min-h-[52px] rounded-xl transition-all duration-300 ease-out hover:shadow-xl hover:shadow-[#2A5C32]/25 active:scale-[0.98] cursor-pointer ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
          style={{ backgroundColor: "#2A5C32" }}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin text-white" size={18} />
              <span style={{ color: "#ffffff" }}>Sending...</span>
            </>
          ) : (
            <>
              <span style={{ color: "#ffffff" }}>Send Message</span>
              <ArrowRight size={18} style={{ color: "#ffffff" }} className="transition-transform duration-500 ease-out group-hover:translate-x-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}