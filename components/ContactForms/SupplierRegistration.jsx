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

export default function SupplierRegistration({ setSubmitted }) {
  const { submitForm } = useContext(FormsContext);
  const [form, setForm] = useState({
    company: "", contactPerson: "", email: "", countryCode: "+91", phone: "", supplyCategory: "", message: ""
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
    ? "Enter the correct email format – : name@example.com"
    : null;

  const phoneError = show("phone") && !isValidPhone(form.phone)
    ? "Phone number must have exactly 10 digits"
    : null;

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSubmitAttempted(true);
    if ((form.email && !isValidEmail(form.email)) || !isValidPhone(form.phone)) return;

    const payload = { ...form, phone: form.phone ? `${form.countryCode} ${form.phone}` : "" };
    const result = await submitForm("Supplier Registration", payload);
    if (result.success) setSubmitted(true);
    else alert(result.message || "Failed to submit form");
  };

  const handleDivSubmit = (e) => {
    setSubmitAttempted(true);
    const formElement = e.currentTarget.closest("form");
    if ((form.email && !isValidEmail(form.email)) || !isValidPhone(form.phone)) return;
    if (formElement && formElement.checkValidity()) handleSubmit(e);
    else if (formElement) formElement.reportValidity();
  };

  const base = "w-full border rounded-xl px-4 py-3 text-base sm:text-sm focus:outline-none focus:ring-4 transition-colors min-h-[48px]";
  const fieldCls = (hasError) => `${base} ${hasError
    ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
    : "border-gray-200 focus:border-[#7c3aed] focus:ring-[#7c3aed]/10"}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 animate-in fade-in duration-300">

      {/* Company & Contact Person */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Company Name *</label>
          <input name="company" value={form.company} onChange={handleChange} required
            className={fieldCls(false)} placeholder="Your Company Ltd." />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Contact Person *</label>
          <input name="contactPerson" value={form.contactPerson} onChange={handleChange} required
            className={fieldCls(false)} placeholder="John Smith" autoComplete="name" />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address *</label>
          <input type="email" name="email" value={form.email}
            onChange={handleChange} onBlur={handleBlur} required
            className={fieldCls(!!emailError)} placeholder="john@company.com"
            autoComplete="email" />
          <ErrorMsg msg={emailError} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</label>
          <div className="flex gap-2">
            <select name="countryCode" value={form.countryCode} onChange={handleChange}
              className="shrink-0 w-[88px] sm:w-[104px] border border-gray-200 rounded-xl px-2 sm:px-3 py-3 text-base sm:text-sm focus:outline-none focus:border-[#7c3aed] focus:ring-4 focus:ring-[#7c3aed]/10 transition-colors bg-white cursor-pointer min-h-[48px]">
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
                className={`${fieldCls(!!phoneError)} w-full`} placeholder="9876543210"
                autoComplete="tel-national" />
              <ErrorMsg msg={phoneError} />
            </div>
          </div>
        </div>
      </div>

      {/* Supply Category */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Supply Category *</label>
        <div className="relative">
          <select name="supplyCategory" value={form.supplyCategory} onChange={handleChange} required
            className={`${fieldCls(false)} appearance-none bg-white cursor-pointer pr-10`}>
            <option value="">Select Category</option>
            <option value="api">Active Pharmaceutical Ingredients (API)</option>
            <option value="excipients">Excipients</option>
            <option value="packaging">Packaging Materials</option>
            <option value="equipment">Machinery & Equipment</option>
            <option value="services">Services (IT, Logistics, etc.)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Company Profile */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Company Profile / Offerings *</label>
        <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
          className={`${fieldCls(false)} resize-none min-h-[120px]`}
          placeholder="Briefly describe your products or services..." />
      </div>

      {/* Submit */}
      <div role="button" tabIndex={0}
        onClick={handleDivSubmit}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDivSubmit(e); } }}
        className="w-full flex items-center justify-center gap-2 font-semibold py-4 min-h-[52px] rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#7c3aed]/25 active:scale-[0.98] cursor-pointer select-none"
        style={{ backgroundColor: "#7c3aed" }}>
        <span style={{ color: "#ffffff" }}>Register as Supplier</span>
        <ArrowRight size={18} style={{ color: "#ffffff" }} className="group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </form>
  );
}