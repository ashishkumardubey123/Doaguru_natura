'use client';

import { useState, useContext } from "react";
import { ArrowRight } from "lucide-react";
import { FormsContext } from "@/dataContext/FormsContext";

export default function BusinessPartnership({ setSubmitted }) {
  const { submitForm } = useContext(FormsContext);
  const [form, setForm] = useState({
    name: "", email: "", countryCode: "+91", phone: "", company: "", partnershipType: "", message: ""
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

    const result = await submitForm("Business Partnership", payload);
    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.message || "Failed to submit form");
    }
  };

  const inputClass = "w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1d6fa4] focus:ring-4 focus:ring-[#1d6fa4]/10 transition-all duration-200 shadow-sm hover:border-gray-200";
  const labelClass = "text-sm font-bold text-gray-700 mb-2 block";
  const asterisk = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <form onSubmit={ handleSubmit } className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Name Field */ }
      <div>
        <label className={ labelClass }>Full Name { asterisk }</label>
        <input
          name="name" value={ form.name } onChange={ handleChange } required
          className={ inputClass } placeholder="e.g. Jane Doe"
        />
      </div>

      {/* Email & Phone Row */ }
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={ labelClass }>Email Address { asterisk }</label>
          <input
            type="email" name="email" value={ form.email } onChange={ handleChange } required
            className={ inputClass } placeholder="jane@company.com"
          />
        </div>
        <div>
          <label className={ labelClass }>Phone Number</label>
          <div className="flex gap-3">
            <select
              name="countryCode" value={ form.countryCode } onChange={ handleChange }
              className="w-28 bg-white border-2 border-gray-100 rounded-xl px-3 py-3.5 text-sm text-gray-800 focus:outline-none focus:border-[#1d6fa4] focus:ring-4 focus:ring-[#1d6fa4]/10 transition-all duration-200 shadow-sm cursor-pointer"
            >
              <option value="+91">IN (+91)</option>
              <option value="+1">US (+1)</option>
              <option value="+44">UK (+44)</option>
              <option value="+971">UAE (+971)</option>
              <option value="+61">AU (+61)</option>
              <option value="+65">SG (+65)</option>
            </select>
            <input
              type="tel" name="phone" value={ form.phone } onChange={ handlePhoneChange }
              inputMode="numeric" pattern="[0-9]{10}" minLength={ 10 } maxLength={ 10 }
              className={ `flex-1 ${inputClass}` } placeholder="9876543210"
            />
          </div>
        </div>
      </div>

      {/* Company & Type Row */ }
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={ labelClass }>Company Name { asterisk }</label>
          <input
            name="company" value={ form.company } onChange={ handleChange } required
            className={ inputClass } placeholder="Your Company Ltd."
          />
        </div>
        <div>
          <label className={ labelClass }>Partnership Type { asterisk }</label>
          <div className="relative">
            <select
              name="partnershipType" value={ form.partnershipType } onChange={ handleChange } required
              className={ `${inputClass} appearance-none cursor-pointer` }
            >
              <option value="" disabled className="text-gray-400">Select Partnership Type</option>
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

      {/* Proposal Details */ }
      <div>
        <label className={ labelClass }>Proposal Details { asterisk }</label>
        <textarea
          name="message" value={ form.message } onChange={ handleChange } required rows={ 5 }
          className={ `${inputClass} resize-none` }
          placeholder="Please provide a brief overview of the partnership opportunity, key markets, and expected outcomes..."
        />
      </div>

      {/* Submit Button */ }
      <div className="pt-2">
        <button
          type="submit"
          className="w-full group flex items-center justify-center gap-2 font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#1d6fa4]/20 hover:-translate-y-0.5  cursor-pointer"
          style={ { backgroundColor: "#1d6fa4" } }
        >
          <span style={ { color: "#ffffff" } }>Submit Proposal</span>
          <ArrowRight size={ 18 } style={ { color: "#ffffff" } } className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <p className="text-xs text-center text-gray-400 mt-4">
        Your information is securely encrypted and will only be used to respond to your inquiry.
      </p>
    </form>
  );
}
