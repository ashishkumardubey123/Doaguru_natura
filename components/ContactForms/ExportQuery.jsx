'use client';

import { useState, useContext } from "react";
import { ArrowRight, User, Mail, Phone, Building2, Globe, Package, MessageSquare } from "lucide-react";
import { FormsContext } from "@/dataContext/FormsContext";

export default function ExportQuery({ setSubmitted }) {
  const { submitForm } = useContext(FormsContext);
  const [form, setForm] = useState({
    name: "", email: "", countryCode: "+91", phone: "", company: "", country: "", products: "", message: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: digitsOnly });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const payload = {
      ...form,
      phone: form.phone ? `${form.countryCode} ${form.phone}` : ""
    };

    const result = await submitForm("Export Query", payload);
    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.message || "Failed to submit form");
    }
  };

  const handleDivSubmit = (e) => {
    const formElement = e.currentTarget.closest("form");
    if (formElement && formElement.checkValidity()) {
      handleSubmit(e);
    } else if (formElement) {
      formElement.reportValidity();
    }
  };

  const inputBaseClasses = "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 pl-11 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#6B4226]/10 focus:border-[#6B4226] transition-all duration-300";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-[#6B4226]/5 border border-gray-100 max-w-4xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Name Field */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Full Name *</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              name="name" value={form.name} onChange={handleChange} required
              className={inputBaseClasses} placeholder="John Smith"
            />
          </div>
        </div>

        {/* Email & Phone Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email" name="email" value={form.email} onChange={handleChange} required
                className={inputBaseClasses} placeholder="john@company.com"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone Number</label>
            <div className="flex gap-2">
              <select
                name="countryCode" value={form.countryCode} onChange={handleChange}
                className="w-[110px] bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-700 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#6B4226]/10 focus:border-[#6B4226] transition-all duration-300 cursor-pointer"
              >
                <option value="+91">IN (+91)</option>
                <option value="+1">US (+1)</option>
                <option value="+44">UK (+44)</option>
                <option value="+971">UAE (+971)</option>
                <option value="+61">AU (+61)</option>
                <option value="+65">SG (+65)</option>
              </select>
              <div className="relative flex-1">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel" name="phone" value={form.phone} onChange={handlePhoneChange}
                  inputMode="numeric" pattern="[0-9]{10}" minLength={10} maxLength={10}
                  className={inputBaseClasses} placeholder="9876543210"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company & Country Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Company Name *</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="company" value={form.company} onChange={handleChange} required
                className={inputBaseClasses} placeholder="Your Company Ltd."
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Target Country *</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="country" value={form.country} onChange={handleChange} required
                className={inputBaseClasses} placeholder="e.g., Kenya"
              />
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Products of Interest *</label>
          <div className="relative">
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              name="products" value={form.products} onChange={handleChange} required
              className={inputBaseClasses} placeholder="e.g., Cardiology, Oncology, Specific Generic Names"
            />
          </div>
        </div>

        {/* Textarea */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Additional Details *</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
            <textarea
              name="message" value={form.message} onChange={handleChange} required rows={4}
              className={`${inputBaseClasses} resize-y min-h-[120px]`}
              placeholder="Please provide details about your import requirements, volumes, etc."
            />
          </div>
        </div>

        {/* Submit Button Replaced with Div */}
        <div
          role="button" tabIndex={0} onClick={handleDivSubmit}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDivSubmit(e); } }}
          className="w-full group flex items-center justify-center gap-2 font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#6B4226]/20 hover:-translate-y-0.5  cursor-pointer"
          style={{ backgroundColor: "#6B4226" }}
        >
          <span style={{ color: "#ffffff" }}>Submit Export Query</span>
          <ArrowRight size={18} style={{ color: "#ffffff" }} className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </form>
    </div>
  );
}
