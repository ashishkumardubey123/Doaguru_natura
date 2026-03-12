'use client';

import { useState, useContext } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";
import { FormsContext } from "@/dataContext/FormsContext";

const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
const isValidPhone = (val) => val.length === 0 || val.length === 10;

const ErrorMsg = ({ msg }) => msg ? (
  <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 duration-200">
    <AlertCircle size={13} className="shrink-0" />
    {msg}
  </p>
) : null;

export default function BusinessPartnership({ setSubmitted }) {
  const { submitForm } = useContext(FormsContext);
  const [form, setForm] = useState({
    name: "", email: "", countryCode: "+91", phone: "", company: "", partnershipType: "", message: ""
  });
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: digitsOnly });
  };

  const show = (field) => touched[field] || submitAttempted;

  const emailError = show("email") && form.email && !isValidEmail(form.email)
    ? "Enter the correct email format –: name@example.com"
    : null;

  const phoneError = show("phone") && !isValidPhone(form.phone)
    ? "Phone number must have exactly 10 digits"
    : null;

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSubmitAttempted(true);
    if ((form.email && !isValidEmail(form.email)) || !isValidPhone(form.phone)) return;

    const payload = { ...form, phone: form.phone ? `${form.countryCode} ${form.phone}` : "" };
    const result = await submitForm("Business Partnership", payload);
    if (result.success) setSubmitted(true);
    else alert(result.message || "Failed to submit form");
  };

  const base = "w-full bg-white border-2 rounded-xl px-4 py-3 text-base sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 shadow-sm min-h-[48px]";
  const inputClass = (hasError) => `${base} ${hasError
    ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
    : "border-gray-100 hover:border-gray-200 focus:border-[#1d6fa4] focus:ring-[#1d6fa4]/10"}`;

  const labelClass = "text-sm font-bold text-gray-700 mb-2 block";
  const asterisk = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Name */}
      <div>
        <label className={labelClass}>Full Name {asterisk}</label>
        <input name="name" value={form.name} onChange={handleChange} required
          className={inputClass(false)} placeholder="e.g. Jane Doe" />
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label className={labelClass}>Email Address {asterisk}</label>
          <input type="email" name="email" value={form.email}
            onChange={handleChange} onBlur={handleBlur} required
            className={inputClass(!!emailError)} placeholder="jane@company.com"
            autoComplete="email" />
          <ErrorMsg msg={emailError} />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <div className="flex gap-2">
            <select name="countryCode" value={form.countryCode} onChange={handleChange}
              className="shrink-0 w-[90px] sm:w-[104px] bg-white border-2 border-gray-100 rounded-xl px-2 sm:px-3 py-3 text-base sm:text-sm text-gray-800 focus:outline-none focus:border-[#1d6fa4] focus:ring-4 focus:ring-[#1d6fa4]/10 transition-all shadow-sm cursor-pointer min-h-[48px]">
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
                className={inputClass(!!phoneError) + " w-full"} placeholder="9876543210"
                autoComplete="tel-national" />
              <ErrorMsg msg={phoneError} />
            </div>
          </div>
        </div>
      </div>

      {/* Company & Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label className={labelClass}>Company Name {asterisk}</label>
          <input name="company" value={form.company} onChange={handleChange} required
            className={inputClass(false)} placeholder="Your Company Ltd." />
        </div>
        <div>
          <label className={labelClass}>Partnership Type {asterisk}</label>
          <div className="relative">
            <select name="partnershipType" value={form.partnershipType} onChange={handleChange} required
              className={`${inputClass(false)} appearance-none cursor-pointer pr-10`}>
              <option value="" disabled>Select Partnership Type</option>
              <option value="distribution">Distribution</option>
              <option value="licensing">In/Out Licensing</option>
              <option value="joint-venture">Joint Venture</option>
              <option value="other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Proposal Details */}
      <div>
        <label className={labelClass}>Proposal Details {asterisk}</label>
        <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
          className={`${inputClass(false)} resize-none`}
          placeholder="Please provide a brief overview of the partnership opportunity, key markets, and expected outcomes..." />
      </div>

      {/* Submit */}
      <div className="pt-1">
        <button type="submit"
          className="w-full group flex items-center justify-center gap-2 font-semibold py-4 min-h-[52px] rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#1d6fa4]/20 active:scale-[0.98] cursor-pointer"
          style={{ backgroundColor: "#1d6fa4" }}>
          <span style={{ color: "#ffffff" }}>Submit Proposal</span>
          <ArrowRight size={18} style={{ color: "#ffffff" }} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <p className="text-xs text-center text-gray-400">
        Your information is securely encrypted and will only be used to respond to your inquiry.
      </p>
    </form>
  );
}