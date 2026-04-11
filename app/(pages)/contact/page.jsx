'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin, Phone, Mail, Clock,
  CheckCircle, Handshake, Box, Globe2, MailQuestion,
  Globe, ArrowRight, Package, Building2, FileText
} from "lucide-react";

import GeneralInquiry from "@/components/ContactForms/GeneralInquiry";
import BusinessPartnership from "@/components/ContactForms/BusinessPartnership";
import ExportQuery from "@/components/ContactForms/ExportQuery";
import SupplierRegistration from "@/components/ContactForms/SupplierRegistration";

// ─── DATA ──────────────────────────────────────────────────────────────────
const inquiryTypes = [
  { value: "general",     label: "General Inquiry",       icon: MailQuestion, color: "#2A5C32", desc: "Ask us anything about Natura Health Care" },
  { value: "partnership", label: "Business Partnership",  icon: Handshake,    color: "#1d6fa4", desc: "Explore distribution or licensing opportunities" },
  { value: "export",      label: "Export Query",          icon: Globe2,       color: "#6B4226", desc: "Inquire about our export capabilities & products" },
  { value: "supplier",    label: "Supplier Registration", icon: Box,          color: "#7c3aed", desc: "Register as a raw material or service supplier" },
];

// ✅ REAL office data from GST Certificate, IEC & Rent Agreement
const offices = [
  {
    id: "indore",
    region: "REGISTERED OFFICE",
    city: "Indore, India",
    address: "31, R.R. Avenue, Tulsi Nagar, Near Mahalaxmi Nagar, Indore – 452010, Madhya Pradesh, India",
    phone: "+91 70006 57818",
    email: "chandrayanherbal@gmail.com",
    hours: "Mon–Sat: 10:00 AM – 7:00 PM IST",
    gst: "23CZGPC3313P1ZH",
    iec: "CZGPC3313P",
    // Google Maps embed — no API key required for basic iframe embed
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0!2d75.9285!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd4e5f1a2b7d%3A0x9e6c2b3d1a4f2e8c!2sRR%20Avenue%2C%20Tulsi%20Nagar%2C%20Nipania%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v1712700000000!5m2!1sen!2sin",
  },
];

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function Contact() {
  const [selectedType, setSelectedType]   = useState("");
  const [submitted, setSubmitted]         = useState(false);
  const [selectedOffice]                  = useState(offices[0]); // only one office

  useEffect(() => {
    const params     = new URLSearchParams(window.location.search);
    const type       = params.get("type");
    const validTypes = inquiryTypes.map(t => t.value);
    if (type && validTypes.includes(type)) setSelectedType(type);
  }, []);

  const selectedTypeData = inquiryTypes.find(t => t.value === selectedType);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-gray-50 min-h-screen">

      {/* ── Hero ── */}
      <div className="relative bg-[#1a3c22] text-white py-12 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async"
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            alt="Contact Us Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c22] via-[#1a3c22]/90 to-[#1a3c22]/40" />
        </div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-green-300 text-xs md:text-sm mb-4 md:mb-6 font-medium tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight drop-shadow-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Get in Touch
          </h1>
          <p className="text-green-50 max-w-xl text-base md:text-xl leading-relaxed font-light">
            Our team is ready to assist with your pharmaceutical needs. Reach out to the right team for prompt support.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">

          {/* ── MAIN COLUMN : CONTACT FORM ── */}
          <div className="w-full lg:col-span-2 space-y-6 md:space-y-8 order-1 lg:order-2">
            <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-10 shadow-lg shadow-gray-100/50">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>Send Us a Message</h2>
              <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-8">
                Please select your reason for inquiry to help us route your message correctly.
              </p>

              {/* Inquiry Type Grid */}
              <div className="mb-8 md:mb-10">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">
                  Select Topic <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {inquiryTypes.map((type) => {
                    const isSelected = selectedType === type.value;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setSelectedType(type.value);
                          setSubmitted(false);
                        }}
                        className={`flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 ${
                          isSelected
                            ? "bg-white shadow-md scale-105 hover:scale-105"
                            : "border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-300"
                        }`}
                        style={{ borderColor: isSelected ? type.color : undefined }}
                      >
                        <div
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
                            isSelected ? "text-white" : "bg-white text-gray-400 shadow-sm"
                          }`}
                          style={{ backgroundColor: isSelected ? type.color : undefined }}
                        >
                          <type.icon size={20} className="md:w-[22px] md:h-[22px]" />
                        </div>
                        <div className={`text-[11px] md:text-xs font-bold text-center leading-tight ${isSelected ? "text-gray-900" : "text-gray-500"}`}>
                          {labelArrayToText(type.label)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Form Area */}
              <div className="min-h-[300px] md:min-h-[400px]">
                {selectedType === "" ? (
                  <div className="text-center py-12 md:py-20 px-4 md:px-6 border-2 border-dashed border-gray-200 bg-gray-50 rounded-3xl animate-in fade-in">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4 md:mb-5">
                      <MailQuestion size={32} className="text-gray-300 md:w-[36px] md:h-[36px]" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-700 mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}>Awaiting Selection</h3>
                    <p className="text-gray-500 text-xs md:text-sm max-w-sm mx-auto">
                      Please select a reason for your inquiry from the options above to reveal the correct contact form.
                    </p>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-200">
                    <div className="flex items-start md:items-center gap-3 mb-6 md:mb-8 p-3 md:p-4 rounded-xl border"
                         style={{ backgroundColor: `${selectedTypeData.color}08`, borderColor: `${selectedTypeData.color}20` }}>
                      <CheckCircle size={18} className="mt-0.5 md:mt-0 shrink-0 md:w-[20px] md:h-[20px]"
                                   style={{ color: selectedTypeData.color }} />
                      <span className="text-xs md:text-sm font-bold text-gray-800">{selectedTypeData.desc}</span>
                    </div>

                    {submitted ? (
                      <div className="text-center py-12 md:py-16 px-4 md:px-6 border border-gray-100 rounded-3xl bg-white shadow-sm animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 shadow-md"
                             style={{ backgroundColor: selectedTypeData.color }}>
                          <CheckCircle size={32} className="text-white md:w-[36px] md:h-[36px]" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 md:mb-3"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}>Message Sent!</h3>
                        <p className="text-gray-500 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
                          Thank you for reaching out. Our team has received your inquiry and will respond within 1–2 business days.
                        </p>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3 md:px-8 md:py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 w-full sm:w-auto text-sm md:text-base"
                          style={{ backgroundColor: selectedTypeData.color, color: "#ffffff" }}
                        >
                          Send Another Message
                        </button>
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-3xl border border-gray-100">
                        {selectedType === "general"     && <GeneralInquiry     setSubmitted={setSubmitted} />}
                        {selectedType === "partnership" && <BusinessPartnership setSubmitted={setSubmitted} />}
                        {selectedType === "export"      && <ExportQuery         setSubmitted={setSubmitted} />}
                        {selectedType === "supplier"    && <SupplierRegistration setSubmitted={setSubmitted} />}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: Clock,       title: "< 48 Hours",      sub: "Avg. Response Time" },
                { icon: Globe,       title: "EN & HI",         sub: "Languages Supported" },
                { icon: CheckCircle, title: "10,000+",         sub: "Inquiries Annually"  },
              ].map((stat, i) => (
                <div key={i}
                     className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6 text-center flex flex-col items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f0f7f1] flex items-center justify-center mb-3 md:mb-4 group-hover:bg-[#2A5C32] transition-colors duration-300">
                    <stat.icon size={20} className="text-[#2A5C32] group-hover:text-white transition-colors duration-300 md:w-[22px] md:h-[22px]" />
                  </div>
                  <div className="font-extrabold text-gray-900 text-base md:text-lg mb-1"
                       style={{ fontFamily: "'Montserrat', sans-serif" }}>{stat.title}</div>
                  <div className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SIDEBAR : OFFICE ── */}
          <div className="w-full lg:col-span-1 space-y-6 order-2 lg:order-1 pt-4 lg:pt-0">
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Office</h3>

            {/* Single Office Card — always selected */}
            <div className="w-full text-left p-4 md:p-5 rounded-2xl border-2 border-[#2A5C32] bg-[#f0f7f1] shadow-md flex items-start gap-3 md:gap-4">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-[#2A5C32] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Building2 size={18} className="md:w-[20px] md:h-[20px]" />
              </div>
              <div className="flex-1 min-w-0 mt-0.5">
                <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1 text-[#2A5C32]">
                  {selectedOffice.region}
                </div>
                <div className="font-extrabold text-gray-900 text-sm md:text-base"
                     style={{ fontFamily: "'Montserrat', sans-serif" }}>{selectedOffice.city}</div>
                <div className="text-[11px] md:text-xs font-medium text-gray-500 mt-1 leading-snug">
                  {selectedOffice.address}
                </div>
              </div>
              <CheckCircle size={16} className="text-[#2A5C32] shrink-0 mt-2 md:w-[18px] md:h-[18px]" />
            </div>

            {/* Office Detail Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-8 shadow-sm">
              <h4 className="font-extrabold text-gray-900 mb-5 md:mb-6 text-base md:text-lg flex flex-wrap items-center gap-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <span>{selectedOffice.region}</span>
                <span className="text-gray-300 font-light hidden sm:inline">|</span>
                <span className="text-[#2A5C32]">{selectedOffice.city}</span>
              </h4>

              <div className="space-y-4 md:space-y-5">
                {/* Address */}
                <div className="flex gap-3 md:gap-4 items-start group">
                  <div className="bg-gray-50 p-2 md:p-2.5 rounded-lg group-hover:bg-[#f0f7f1] transition-colors shrink-0">
                    <MapPin size={16} className="text-gray-400 group-hover:text-[#2A5C32] transition-colors md:w-[18px] md:h-[18px]" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-600 leading-relaxed mt-0.5 md:mt-1">
                    {selectedOffice.address}
                  </span>
                </div>

                {/* Phone */}
                <div className="flex gap-3 md:gap-4 items-center group">
                  <div className="bg-gray-50 p-2 md:p-2.5 rounded-lg group-hover:bg-[#f0f7f1] transition-colors shrink-0">
                    <Phone size={16} className="text-gray-400 group-hover:text-[#2A5C32] transition-colors md:w-[18px] md:h-[18px]" />
                  </div>
                  <a href={`tel:${selectedOffice.phone.replace(/\s+/g, '')}`}
                     className="text-xs md:text-sm font-bold text-gray-600 hover:text-[#2A5C32] transition-colors">
                    {selectedOffice.phone}
                  </a>
                </div>

                {/* Email */}
                <div className="flex gap-3 md:gap-4 items-center group">
                  <div className="bg-gray-50 p-2 md:p-2.5 rounded-lg group-hover:bg-[#f0f7f1] transition-colors shrink-0">
                    <Mail size={16} className="text-gray-400 group-hover:text-[#2A5C32] transition-colors md:w-[18px] md:h-[18px]" />
                  </div>
                  <a href={`mailto:${selectedOffice.email}`}
                     className="text-xs md:text-sm font-bold text-gray-600 hover:text-[#2A5C32] transition-colors break-all">
                    {selectedOffice.email}
                  </a>
                </div>

                {/* Hours */}
                <div className="flex gap-3 md:gap-4 items-center group">
                  <div className="bg-gray-50 p-2 md:p-2.5 rounded-lg group-hover:bg-[#f0f7f1] transition-colors shrink-0">
                    <Clock size={16} className="text-gray-400 group-hover:text-[#2A5C32] transition-colors md:w-[18px] md:h-[18px]" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-600">{selectedOffice.hours}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  {/* GST Number */}
                  <div className="flex gap-3 md:gap-4 items-center group">
                    <div className="bg-gray-50 p-2 md:p-2.5 rounded-lg group-hover:bg-[#f0f7f1] transition-colors shrink-0">
                      <FileText size={16} className="text-gray-400 group-hover:text-[#2A5C32] transition-colors md:w-[18px] md:h-[18px]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">GSTIN</div>
                      <span className="text-xs md:text-sm font-bold text-gray-700 tracking-wider">
                        {selectedOffice.gst}
                      </span>
                    </div>
                  </div>

                  {/* IEC Number */}
                  <div className="flex gap-3 md:gap-4 items-center group">
                    <div className="bg-gray-50 p-2 md:p-2.5 rounded-lg group-hover:bg-[#f0f7f1] transition-colors shrink-0">
                      <Globe2 size={16} className="text-gray-400 group-hover:text-[#2A5C32] transition-colors md:w-[18px] md:h-[18px]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">IEC (Export Code)</div>
                      <span className="text-xs md:text-sm font-bold text-gray-700 tracking-wider">
                        {selectedOffice.iec}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Google Map ── */}
            <div className="w-full h-52 md:h-60 bg-gray-100 rounded-3xl overflow-hidden border-4 border-white shadow-md relative group">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none z-10" />
              <iframe
                src={selectedOffice.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Natura Health Care – Indore Office"
                className="grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>

            {/* Bottom Links */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
              <Link href="/products"
                    className="flex-1 flex items-center justify-between p-3 md:p-4 rounded-2xl border-2 border-transparent bg-white shadow-sm hover:border-[#2A5C32]/20 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all group">
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold text-gray-800 group-hover:text-[#2A5C32] transition-colors">
                  <Package size={16} className="text-[#2A5C32] md:w-[18px] md:h-[18px]" /> Products
                </div>
                <ArrowRight size={14} className="text-gray-300 group-hover:text-[#2A5C32] group-hover:translate-x-1 transition-all md:w-[16px] md:h-[16px]" />
              </Link>
              <Link href="/about"
                    className="flex-1 flex items-center justify-between p-3 md:p-4 rounded-2xl border-2 border-transparent bg-white shadow-sm hover:border-[#2A5C32]/20 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all group">
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold text-gray-800 group-hover:text-[#2A5C32] transition-colors">
                  <Globe size={16} className="text-[#2A5C32] md:w-[18px] md:h-[18px]" /> About Us
                </div>
                <ArrowRight size={14} className="text-gray-300 group-hover:text-[#2A5C32] group-hover:translate-x-1 transition-all md:w-[16px] md:h-[16px]" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function labelArrayToText(label) {
  if (label === "Business Partnership")  return "Business Partner";
  if (label === "Supplier Registration") return "Supplier Reg.";
  return label;
}