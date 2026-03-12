'use client';

import { useState, useContext } from "react";
import { ArrowRight, User, Mail, Phone, Building2, Globe, Package, MessageSquare, AlertCircle } from "lucide-react";
import { FormsContext } from "@/dataContext/FormsContext";

const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
const isValidPhone = (val) => val.length === 0 || val.length === 10;

const ErrorMsg = ({ msg }) => msg ? (
  <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 duration-200">
    <AlertCircle size={13} className="shrink-0" />
    {msg}
  </p>
) : null;

export default function ExportQuery({ setSubmitted }) {
  const { submitForm } = useContext(FormsContext);
  const [form, setForm] = useState({
    name: "", email: "", countryCode: "+91", phone: "", company: "", country: "", products: "", message: ""
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
    ? "Enter the correct email format -: name@example.com"
    : null;

  const phoneError = show("phone") && !isValidPhone(form.phone)
    ? "Phone number must have exactly 10 digits"
    : null;

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSubmitAttempted(true);
    if ((form.email && !isValidEmail(form.email)) || !isValidPhone(form.phone)) return;

    const payload = { ...form, phone: form.phone ? `${form.countryCode} ${form.phone}` : "" };
    const result = await submitForm("Export Query", payload);
    if (result.success) setSubmitted(true);
    else alert(result.message || "Failed to submit form");
  };

  const handleDivSubmit = (e) => {
    const formElement = e.currentTarget.closest("form");
    if (formElement && formElement.checkValidity()) handleSubmit(e);
    else if (formElement) formElement.reportValidity();
  };

  const base = "w-full bg-gray-50/50 border rounded-xl px-4 py-3 pl-11 text-base sm:text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-4 transition-all duration-300 min-h-[48px]";
  const inputCls = (hasError) => `${base} ${hasError
    ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
    : "border-gray-200 focus:ring-[#6B4226]/10 focus:border-[#6B4226]"}`;

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl shadow-[#6B4226]/5 border border-gray-100 max-w-4xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Name */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Full Name *</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <input name="name" value={form.name} onChange={handleChange} required
              className={inputCls(false)} placeholder="John Smith" autoComplete="name" />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address *</label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${emailError ? "text-red-400" : "text-gray-400"}`} size={18} />
              <input type="email" name="email" value={form.email}
                onChange={handleChange} onBlur={handleBlur} required
                className={inputCls(!!emailError)} placeholder="john@company.com"
                autoComplete="email" />
            </div>
            <ErrorMsg msg={emailError} />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone Number</label>
            <div className="flex gap-2">
              <select name="countryCode" value={form.countryCode} onChange={handleChange}
                className="shrink-0 w-[88px] sm:w-[104px] bg-gray-50/50 border border-gray-200 rounded-xl px-2 sm:px-3 py-3 text-base sm:text-sm text-gray-700 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#6B4226]/10 focus:border-[#6B4226] transition-all cursor-pointer min-h-[48px]">
                <option value="+91">IN +91</option>
                <option value="+1">US +1</option>
                <option value="+44">UK +44</option>
                <option value="+971">UAE +971</option>
                <option value="+61">AU +61</option>
                <option value="+65">SG +65</option>
              </select>
              <div className="relative flex-1 min-w-0">
                <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${phoneError ? "text-red-400" : "text-gray-400"}`} size={18} />
                <input type="tel" name="phone" value={form.phone}
                  onChange={handlePhoneChange} onBlur={handleBlur}
                  inputMode="numeric" maxLength={10}
                  className={inputCls(!!phoneError)} placeholder="9876543210"
                  autoComplete="tel-national" />
                <ErrorMsg msg={phoneError} />
              </div>
            </div>
          </div>
        </div>

        {/* Company & Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Company Name *</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <input name="company" value={form.company} onChange={handleChange} required
                className={inputCls(false)} placeholder="Your Company Ltd." />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Target Country *</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <input name="country" value={form.country} onChange={handleChange} required
                className={inputCls(false)} placeholder="e.g., Kenya" autoComplete="country-name" />
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Products of Interest *</label>
          <div className="relative">
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <input name="products" value={form.products} onChange={handleChange} required
              className={inputCls(false)} placeholder="e.g., Cardiology, Oncology, Specific Generic Names" />
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Additional Details *</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-[14px] text-gray-400 pointer-events-none" size={18} />
            <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
              className={`${inputCls(false)} resize-y min-h-[120px]`}
              placeholder="Please provide details about your import requirements, volumes, etc." />
          </div>
        </div>

        {/* Submit */}
        <div role="button" tabIndex={0}
          onClick={handleDivSubmit}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDivSubmit(e); } }}
          className="w-full group flex items-center justify-center gap-2 font-semibold py-4 min-h-[52px] rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#6B4226]/20 active:scale-[0.98] cursor-pointer select-none"
          style={{ backgroundColor: "#6B4226" }}>
          <span style={{ color: "#ffffff" }}>Submit Export Query</span>
          <ArrowRight size={18} style={{ color: "#ffffff" }} className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </form>
    </div>
  );
}