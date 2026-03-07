'use client';

import { useState, useContext } from "react";
import { ArrowRight, User, Mail, MessageSquare } from "lucide-react";
import { FormsContext } from "@/dataContext/FormsContext";

export default function GeneralInquiry({ setSubmitted }) {
  const { submitForm } = useContext(FormsContext);
  const [form, setForm] = useState({
    name: "", email: "", countryCode: "+91", phone: "", message: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: digitsOnly });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      phone: form.phone ? `${form.countryCode} ${form.phone}` : ""
    };

    const result = await submitForm("General Inquiry", payload);
    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.message || "Failed to submit form");
    }
  };

  const inputClasses = "w-full bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-[#2A5C32]/15 focus:border-[#2A5C32] focus:bg-white transition-all duration-500 ease-out placeholder:text-gray-400 shadow-sm hover:border-gray-300";

  return (
    <form onSubmit={ handleSubmit } className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out w-full max-w-2xl mx-auto">
      {/* Name Field */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 block">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2A5C32] transition-colors duration-500">
            <User size={ 18 } />
          </div>
          <input
            name="name" value={ form.name } onChange={ handleChange } required
            className={ `${inputClasses} pl-11` } placeholder="John Smith"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 block">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2A5C32] transition-colors duration-500">
              <Mail size={ 18 } />
            </div>
            <input
              type="email" name="email" value={ form.email } onChange={ handleChange } required
              className={ `${inputClasses} pl-11` } placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 block">Phone Number</label>
          <div className="flex gap-2">
            <select
              name="countryCode" value={ form.countryCode } onChange={ handleChange }
              className="w-[110px] sm:w-32 bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl px-3 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-[#2A5C32]/15 focus:border-[#2A5C32] focus:bg-white transition-all duration-500 ease-out cursor-pointer shadow-sm hover:border-gray-300"
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
              className={ `${inputClasses} flex-1` } placeholder="9876543210"
            />
          </div>
        </div>
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 block">
          Message <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute top-4 left-0 pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#2A5C32] transition-colors duration-500">
            <MessageSquare size={ 18 } />
          </div>
          <textarea
            name="message" value={ form.message } onChange={ handleChange } required rows={ 5 }
            className={ `${inputClasses} pl-11 resize-none` } placeholder="How can we help you?"
          />
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="">
        <button
          type="submit"
          className="group w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl transition-all duration-800 ease-out  hover:shadow-xl hover:shadow-[#2A5C32]/25  active:shadow-md"
          style={ { backgroundColor: "#2A5C32" } }
        >
          <span style={ { color: "#ffffff" } }>Send Message</span>
          <ArrowRight size={ 18 } style={ { color: "#ffffff" } } className="transition-transform duration-500 ease-out group-hover:translate-x-2" />
        </button>
      </div>
    </form>
  );
}
