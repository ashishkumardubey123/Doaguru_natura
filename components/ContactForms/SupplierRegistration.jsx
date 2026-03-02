'use client';

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function SupplierRegistration({ setSubmitted }) {
  const [form, setForm] = useState({
    company: "", contactPerson: "", email: "", countryCode: "+91", phone: "", supplyCategory: "", message: ""
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
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Company Name *</label>
          <input
            name="company" value={form.company} onChange={handleChange} required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c3aed] transition-colors"
            placeholder="Your Company Ltd."
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Contact Person *</label>
          <input
            name="contactPerson" value={form.contactPerson} onChange={handleChange} required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c3aed] transition-colors"
            placeholder="John Smith"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address *</label>
          <input
            type="email" name="email" value={form.email} onChange={handleChange} required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c3aed] transition-colors"
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
              className="w-32 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#7c3aed] transition-colors bg-white"
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
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c3aed] transition-colors"
              placeholder="9876543210"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Supply Category *</label>
        <select
          name="supplyCategory" value={form.supplyCategory} onChange={handleChange} required
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c3aed] transition-colors bg-white"
        >
          <option value="">Select Category</option>
          <option value="api">Active Pharmaceutical Ingredients (API)</option>
          <option value="excipients">Excipients</option>
          <option value="packaging">Packaging Materials</option>
          <option value="equipment">Machinery & Equipment</option>
          <option value="services">Services (IT, Logistics, etc.)</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Company Profile / Offerings *</label>
        <textarea
          name="message" value={form.message} onChange={handleChange} required rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c3aed] transition-colors resize-none"
          placeholder="Briefly describe your products or services..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-xl transition-all hover:opacity-90"
        style={{ backgroundColor: "#7c3aed" }}
      >
        Register as Supplier <ArrowRight size={16} />
      </button>
    </form>
  );
}
