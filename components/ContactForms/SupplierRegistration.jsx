'use client';

import { useState, useContext } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";
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
function CategoryChip({ label, selected, onToggle }) {
  const color = "#7c3aed";
  return (
    <div
      onClick={() => onToggle(label)}
      className={`flex items-center gap-2 cursor-pointer rounded-xl border px-3 py-2.5 text-xs font-medium transition-all duration-200 select-none
        ${selected
          ? "border-[#7c3aed] bg-violet-50 text-[#7c3aed] shadow-sm"
          : "border-gray-200 bg-white text-gray-600 hover:border-[#7c3aed]/50 hover:bg-violet-50/40"}`}
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

export default function SupplierRegistration({ setSubmitted }) {
  const { submitForm } = useContext(FormsContext);
  const [form, setForm] = useState({
    company: "", contactPerson: "", email: "", countryCode: "+91", phone: "", message: "",
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

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
    ? "Enter the correct email format – : name@example.com"
    : null;

  const phoneError = show("phone") && !isValidPhone(form.phone)
    ? "Phone number must have exactly 10 digits"
    : null;

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSubmitAttempted(true);
    if ((form.email && !isValidEmail(form.email)) || !isValidPhone(form.phone)) return;
    if (selectedCategories.length === 0) return;

    const allCategories = [...selectedCategories];
    if (selectedCategories.includes("Other") && otherText.trim()) {
      allCategories.splice(allCategories.indexOf("Other"), 1, `Other: ${otherText.trim()}`);
    }
    const payload = {
      ...form,
      phone: form.phone ? `${form.countryCode} ${form.phone}` : "",
      supplyCategory: allCategories.join(", "),
    };
    const result = await submitForm("Supplier Registration", payload);
    if (result.success) setSubmitted(true);
    else alert(result.message || "Failed to submit form");
  };

  const handleDivSubmit = (e) => {
    setSubmitAttempted(true);
    const formElement = e.currentTarget.closest("form");
    if ((form.email && !isValidEmail(form.email)) || !isValidPhone(form.phone)) return;
    if (selectedCategories.length === 0) return;
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

      {/* ── Supply Category ── */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 sm:p-5">
        <div className="flex items-start justify-between mb-1">
          <label className="text-sm font-semibold text-gray-700">Supply Category *</label>
          {selectedCategories.length > 0 && (
            <span className="text-[11px] font-semibold bg-[#7c3aed] text-white px-2.5 py-0.5 rounded-full">
              {selectedCategories.length} selected
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 mb-4">Select the product categories you can supply. You can choose multiple.</p>

        {/* Wellness Area */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#7c3aed]/80 mb-2">Wellness Area</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
          {therapyFilters.map((f) => (
            <CategoryChip key={f.id} label={f.label} selected={selectedCategories.includes(f.label)} onToggle={toggleCategory} />
          ))}
        </div>

        {/* Product Form */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#7c3aed]/80 mb-2">Product Form</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
          {dosageFilters.map((f) => (
            <CategoryChip key={f.id} label={f.label} selected={selectedCategories.includes(f.label)} onToggle={toggleCategory} />
          ))}
        </div>

        {/* Other */}
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#7c3aed]/80 mb-2">Other</p>
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
              className="w-full border border-[#7c3aed]/40 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#7c3aed]/10 focus:border-[#7c3aed] bg-white transition-all duration-200 animate-in fade-in slide-in-from-top-1"
            />
          )}
        </div>

        {submitAttempted && selectedCategories.length === 0 && (
          <p className="flex items-center gap-1.5 mt-3 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle size={13} className="shrink-0" />
            Please select at least one supply category
          </p>
        )}
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