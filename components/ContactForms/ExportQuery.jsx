'use client';

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ExportQuery({ setSubmitted }) {
  const [form, setForm] = useState({
    name: "", email: "", countryCode: "+91", phone: "", company: "", country: "", products: "", message: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: digitsOnly });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-300">
      <div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Name *</label>
          <input
            name="name" value={form.name} onChange={handleChange} required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B4226] transition-colors"
            placeholder="John Smith"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address *</label>
          <input
            type="email" name="email" value={form.email} onChange={handleChange} required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B4226] transition-colors"
            placeholder="john@company.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</label>
          <div className="flex gap-2">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              className="w-32 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#6B4226] transition-colors bg-white"
            >
              <option value="+91">IN (+91)</option>
              <option value="+1">US (+1)</option>
              <option value="+44">UK (+44)</option>
              <option value="+971">UAE (+971)</option>
              <option value="+61">AU (+61)</option>
              <option value="+65">SG (+65)</option>
            </select>
            <input
              type="tel" name="phone" value={form.phone} onChange={handlePhoneChange}
              inputMode="numeric"
              pattern="[0-9]{10}"
              minLength={10}
              maxLength={10}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B4226] transition-colors"
              placeholder="9876543210"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Company Name *</label>
          <input
            name="company" value={form.company} onChange={handleChange} required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B4226] transition-colors"
            placeholder="Your Company Ltd."
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Target Country *</label>
          <input
            name="country" value={form.country} onChange={handleChange} required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B4226] transition-colors"
            placeholder="e.g., Kenya"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Products of Interest *</label>
        <input
          name="products" value={form.products} onChange={handleChange} required
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B4226] transition-colors"
          placeholder="e.g., Cardiology, Oncology, Specific Generic Names"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Additional Details *</label>
        <textarea
          name="message" value={form.message} onChange={handleChange} required rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6B4226] transition-colors resize-none"
          placeholder="Please provide details about your import requirements, volumes, etc."
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-xl transition-all hover:opacity-90"
        style={{ backgroundColor: "#6B4226" }}
      >
        Submit Export Query <ArrowRight size={16} />
      </button>
    </form>
  );
}
