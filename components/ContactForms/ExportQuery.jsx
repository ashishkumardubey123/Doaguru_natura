'use client';

import { useState, useContext } from "react";
import { ArrowRight, User, Mail, Phone, Building2, Globe, MessageSquare, AlertCircle, Loader2 } from "lucide-react";
import { FormsContext } from "@/Context/FormsContext";
import { therapyFilters, dosageFilters } from "@/utils/utils";

const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
const isValidPhone = (val) => val.length === 0 || val.length === 10;

const ErrorMsg = ({ msg }) => msg ? (
  <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 duration-200">
    <AlertCircle size={13} className="shrink-0" />
    {msg}
  </p>
) : null;

// Declared outside to avoid "component created during render" lint error
function CategoryChip({ label, selected, onToggle, color = "#6B4226", hoverBg = "orange" }) {
  return (
    <div
      onClick={() => onToggle(label)}
      className={`flex items-center gap-2 cursor-pointer rounded-xl border px-3 py-2.5 text-xs font-medium transition-all duration-200 select-none
        ${selected
          ? `border-[${color}] bg-orange-50 shadow-sm`
          : `border-gray-200 bg-white text-gray-600 hover:border-[${color}]/50 hover:bg-orange-50/40`}`}
      style={selected ? { borderColor: color, color } : {}}
    >
      <span
        className="w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 transition-all duration-200"
        style={selected ? { borderColor: color, backgroundColor: color } : { borderColor: "#D1D5DB", backgroundColor: "white" }}
      >
        {selected && (
          <svg viewBox="0 0 10 8" className="w-2.5 fill-white">
            <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        )}
      </span>
      {label}
    </div>
  );
}

export default function ExportQuery({ setSubmitted }) {
  const { submitForm } = useContext(FormsContext);
  const [form, setForm] = useState({
    name: "", email: "", countryCode: "+91", phone: "", company: "", country: "", message: "",
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: digitsOnly });
  };

  const toggleCategory = (label) => {
    setSelectedCategories((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
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
    if (selectedCategories.length === 0) return;

    setIsSubmitting(true);
    try {
      const allCategories = [...selectedCategories];
      if (selectedCategories.includes("Other") && otherText.trim()) {
        allCategories.splice(allCategories.indexOf("Other"), 1, `Other: ${otherText.trim()}`);
      }
      const payload = {
        ...form,
        phone: form.phone ? `${form.countryCode} ${form.phone}` : "",
        products: allCategories.join(", "),
      };
      const result = await submitForm("Export Query", payload);
      if (result.success) setSubmitted(true);
      else alert(result.message || "Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDivSubmit = (e) => {
    if (isSubmitting) return;
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

        {/* ── Products of Interest ── */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 sm:p-5">
          <div className="flex items-start justify-between mb-1">
            <label className="text-sm font-semibold text-gray-700">Products of Interest *</label>
            {selectedCategories.length > 0 && (
              <span className="text-[11px] font-semibold bg-[#6B4226] text-white px-2.5 py-0.5 rounded-full">
                {selectedCategories.length} selected
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mb-4">Select the product categories you are interested in. You can choose multiple.</p>

          {/* Wellness Area */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#6B4226]/80 mb-2">Wellness Area</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
            {therapyFilters.map((f) => (
              <CategoryChip key={f.id} label={f.label} selected={selectedCategories.includes(f.label)} onToggle={toggleCategory} />
            ))}
          </div>

          {/* Product Form */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#6B4226]/80 mb-2">Product Form</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
            {dosageFilters.map((f) => (
              <CategoryChip key={f.id} label={f.label} selected={selectedCategories.includes(f.label)} onToggle={toggleCategory} />
            ))}
          </div>

          {/* Other */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#6B4226]/80 mb-2">Other</p>
          <div className="flex flex-col gap-2">
            <div className="w-fit">
              <CategoryChip label="Other" selected={selectedCategories.includes("Other")} onToggle={toggleCategory} />
            </div>
            {selectedCategories.includes("Other") && (
              <input
                type="text"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder="Please specify your category..."
                className="w-full border border-[#6B4226]/40 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#6B4226]/10 focus:border-[#6B4226] bg-white transition-all duration-200 animate-in fade-in slide-in-from-top-1"
              />
            )}
          </div>

          {submitAttempted && selectedCategories.length === 0 && (
            <p className="flex items-center gap-1.5 mt-3 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 duration-200">
              <AlertCircle size={13} className="shrink-0" />
              Please select at least one product category
            </p>
          )}
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
          className={`w-full group flex items-center justify-center gap-2 font-semibold py-4 min-h-[52px] rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#6B4226]/20 active:scale-[0.98] cursor-pointer select-none ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
          style={{ backgroundColor: "#6B4226" }}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin text-white" size={18} />
              <span style={{ color: "#ffffff" }}>Sending...</span>
            </>
          ) : (
            <>
              <span style={{ color: "#ffffff" }}>Submit Export Query</span>
              <ArrowRight size={18} style={{ color: "#ffffff" }} className="group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </div>
      </form>
    </div>
  );
}