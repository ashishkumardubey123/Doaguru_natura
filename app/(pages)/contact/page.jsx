'use client';

import { useState } from "react";
import Link from "next/link";
import {
  MapPin, Phone, Mail, Clock,
  CheckCircle, Handshake, Box, Globe2, MailQuestion,
  Globe, ArrowRight, Package
} from "lucide-react";

// Note: Ensure these components are available in your project
import GeneralInquiry from "@/components/ContactForms/GeneralInquiry";
import BusinessPartnership from "@/components/ContactForms/BusinessPartnership";
import ExportQuery from "@/components/ContactForms/ExportQuery";
import SupplierRegistration from "@/components/ContactForms/SupplierRegistration";

// ─── DATA ──────────────────────────────────────────────────────────────────
const inquiryTypes = [
  { value: "general", label: "General Inquiry", icon: MailQuestion, color: "#2A5C32", desc: "Ask us anything about Natura Health Care" },
  { value: "partnership", label: "Business Partnership", icon: Handshake, color: "#1d6fa4", desc: "Explore distribution or licensing opportunities" },
  { value: "export", label: "Export Query", icon: Globe2, color: "#6B4226", desc: "Inquire about our export capabilities & products" },
  { value: "supplier", label: "Supplier Registration", icon: Box, color: "#7c3aed", desc: "Register as a raw material or service supplier" },
];

const offices = [
  {
    id: "global",
    region: "GLOBAL HQ",
    city: "Zurich, Switzerland",
    address: "Life Science Park, Pharma Blvd., Zurich CH-8000",
    phone: "+41 44 123 4567",
    email: "info@naturahealthcare.com",
    hours: "Mon–Fri: 9:00 AM – 6:00 PM CET",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d2701.558330758416!2d8.53805561562215!3d47.3815559791703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a08e110c4d7%3A0x6a086208579d40!2sZurich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
  },
  {
    id: "apac",
    region: "ASIA-PACIFIC HQ",
    city: "Mumbai, India",
    address: "Bandra-Kurla Complex, Mumbai 400 051, India",
    phone: "+91 22 4567 8900",
    email: "india@naturahealthcare.com",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM IST",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3771.44304419965!2d72.8656144153832!3d19.06533355792182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e123f8d27b%3A0x437996b49a236a78!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
  },
  {
    id: "mea",
    region: "MEA HQ",
    city: "Dubai, UAE",
    address: "DAFZA Free Zone, Dubai, UAE",
    phone: "+971 4 234 5678",
    email: "mea@naturahealthcare.com",
    hours: "Mon–Fri: 9:00 AM – 6:00 PM GST",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3608.324317926887!2d55.35760831501062!3d25.25968298386708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c5b5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sDubai%20Airport%20Freezone!5e0!3m2!1sen!2sae!4v1625000000000!5m2!1sen!2sae"
  },
  {
    id: "americas",
    region: "AMERICAS HQ",
    city: "Miami, USA",
    address: "Brickell City Centre, Miami FL 33131, USA",
    phone: "+1 305 234 5678",
    email: "usa@naturahealthcare.com",
    hours: "Mon–Fri: 9:00 AM – 6:00 PM EST",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3593.058204680216!2d-80.1947024849767!3d25.76695698363412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69c6c6c6c6c%3A0x6c6c6c6c6c6c6c6c!2sBrickell%20City%20Centre!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
  },
];

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function Contact() {
  const [selectedType, setSelectedType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(offices[0]);

  const selectedTypeData = inquiryTypes.find(t => t.value === selectedType);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <div className="relative bg-[#1a3c22] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async"
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            alt="Contact Us Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c22] via-[#1a3c22]/90 to-[#1a3c22]/40"></div>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-green-300 text-sm mb-6 font-medium tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Get in Touch
          </h1>
          <p className="text-green-50 max-w-xl text-lg md:text-xl leading-relaxed font-light">
            Our global team is ready to assist with your pharmaceutical needs. Reach out to the right team for prompt support.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          
          {/* ─── SIDEBAR: OFFICES ─── */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-extrabold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Global Offices</h3>
            
            {/* Office Selection List */}
            <div className="space-y-4">
              {offices.map((office) => (
                <button
                  key={office.id}
                  onClick={() => setSelectedOffice(office)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-start gap-4 group hover:-translate-y-1 hover:shadow-lg active:scale-95 ${
                    selectedOffice.id === office.id 
                      ? "border-[#2A5C32] bg-[#f0f7f1] shadow-md" 
                      : "border-gray-100 hover:border-[#2A5C32]/30 hover:bg-[#f7fbf8] bg-white shadow-sm"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    selectedOffice.id === office.id ? "bg-[#2A5C32] text-white shadow-sm" : "bg-gray-50 border border-gray-100 text-gray-400 group-hover:bg-[#e7f3e9] group-hover:text-[#2A5C32] group-hover:border-transparent"
                  }`}>
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1 min-w-0 mt-0.5">
                    <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors ${
                      selectedOffice.id === office.id ? "text-[#2A5C32]" : "text-gray-400 group-hover:text-[#2A5C32]/70"
                    }`}>{office.region}</div>
                    <div className="font-extrabold text-gray-900 text-base truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>{office.city}</div>
                    <div className="text-xs font-medium text-gray-500 mt-1 truncate">{office.address}</div>
                  </div>
                  {selectedOffice.id === office.id && (
                    <CheckCircle size={18} className="text-[#2A5C32] shrink-0 mt-2" />
                  )}
                </button>
              ))}
            </div>

            {/* Selected Office Details Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
              <h4 className="font-extrabold text-gray-900 mb-6 text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {selectedOffice.region} <span className="text-gray-300 font-light mx-1">|</span> <span className="text-[#2A5C32]">{selectedOffice.city}</span>
              </h4>
              <div className="space-y-5">
                <div className="flex gap-4 items-start group">
                  <div className="bg-gray-50 p-2.5 rounded-lg group-hover:bg-[#f0f7f1] group-hover:text-[#2A5C32] transition-colors shrink-0">
                    <MapPin size={18} className="text-gray-400 group-hover:text-[#2A5C32] transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 leading-relaxed mt-1">{selectedOffice.address}</span>
                </div>
                <div className="flex gap-4 items-center group">
                  <div className="bg-gray-50 p-2.5 rounded-lg group-hover:bg-[#f0f7f1] group-hover:text-[#2A5C32] transition-colors shrink-0">
                    <Phone size={18} className="text-gray-400 group-hover:text-[#2A5C32] transition-colors" />
                  </div>
                  <a href={`tel:${selectedOffice.phone.replace(/\s+/g, '')}`} className="text-sm font-bold text-gray-600 hover:text-[#2A5C32] transition-colors">{selectedOffice.phone}</a>
                </div>
                <div className="flex gap-4 items-center group">
                  <div className="bg-gray-50 p-2.5 rounded-lg group-hover:bg-[#f0f7f1] group-hover:text-[#2A5C32] transition-colors shrink-0">
                    <Mail size={18} className="text-gray-400 group-hover:text-[#2A5C32] transition-colors" />
                  </div>
                  <a href={`mailto:${selectedOffice.email}`} className="text-sm font-bold text-gray-600 hover:text-[#2A5C32] transition-colors">{selectedOffice.email}</a>
                </div>
                <div className="flex gap-4 items-center group">
                  <div className="bg-gray-50 p-2.5 rounded-lg group-hover:bg-[#f0f7f1] group-hover:text-[#2A5C32] transition-colors shrink-0">
                    <Clock size={18} className="text-gray-400 group-hover:text-[#2A5C32] transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{selectedOffice.hours}</span>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <div className="w-full h-56 bg-gray-100 rounded-3xl overflow-hidden border-4 border-white shadow-md relative group">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none z-10"></div>
              <iframe
                src={selectedOffice.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title={`${selectedOffice.city} Map`}
                className="grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/global-presence" className="flex-1 flex items-center justify-between p-4 rounded-2xl border-2 border-transparent bg-white shadow-sm hover:border-[#2A5C32]/20 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all group">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-800 group-hover:text-[#2A5C32] transition-colors">
                  <Globe size={18} className="text-[#2A5C32]"/> All Offices
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-[#2A5C32] group-hover:translate-x-1 transition-all" />
              </Link>
              <Link href="/products" className="flex-1 flex items-center justify-between p-4 rounded-2xl border-2 border-transparent bg-white shadow-sm hover:border-[#2A5C32]/20 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all group">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-800 group-hover:text-[#2A5C32] transition-colors">
                  <Package size={18} className="text-[#2A5C32]"/> Products
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-[#2A5C32] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          {/* ─── MAIN COLUMN: CONTACT FORM ─── */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-10 shadow-lg shadow-gray-100/50">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Send Us a Message</h2>
              <p className="text-gray-500 text-base mb-8">Please select your reason for inquiry to help us route your message correctly.</p>

              {/* Inquiry Type Selection Grid */}
              <div className="mb-10">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Select Topic <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {inquiryTypes.map((type) => {
                    const isSelected = selectedType === type.value;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setSelectedType(type.value)}
                        className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 ${
                          isSelected ? "bg-white shadow-md scale-105 hover:scale-105" : "border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-300"
                        }`}
                        style={{ borderColor: isSelected ? type.color : undefined }}
                      >
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isSelected ? "text-white" : "bg-white text-gray-400 shadow-sm"}`}
                          style={{ backgroundColor: isSelected ? type.color : undefined }}
                        >
                          <type.icon size={22} />
                        </div>
                        <div className={`text-xs font-bold text-center leading-tight ${isSelected ? "text-gray-900" : "text-gray-500"}`}>
                          {labelArrayToText(type.label)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Forms Area */}
              <div className="min-h-[400px]">
                {selectedType === "" ? (
                  <div className="text-center py-20 px-6 border-2 border-dashed border-gray-200 bg-gray-50 rounded-3xl animate-in fade-in">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-5">
                      <MailQuestion size={36} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Awaiting Selection</h3>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">Please select a reason for your inquiry from the options above to reveal the correct contact form.</p>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
                    
                    {/* Active Selection Banner */}
                    <div className="flex items-start md:items-center gap-3 mb-8 p-4 rounded-xl border" style={{ backgroundColor: `${selectedTypeData.color}08`, borderColor: `${selectedTypeData.color}20` }}>
                      <CheckCircle size={20} className="mt-0.5 md:mt-0 shrink-0" style={{ color: selectedTypeData.color }} />
                      <span className="text-sm font-bold text-gray-800">
                        {selectedTypeData.desc}
                      </span>
                    </div>
                    
                    {/* Success State */}
                    {submitted ? (
                      <div className="text-center py-16 px-6 border border-gray-100 rounded-3xl bg-white shadow-sm animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md" style={{ backgroundColor: selectedTypeData.color }}>
                          <CheckCircle size={36} className="text-white" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Message Sent!</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto text-base">Thank you for reaching out. Our team has received your inquiry and will respond within 1–2 business days.</p>
                        <button
                          onClick={() => { setSubmitted(false); setSelectedType(""); }}
                          className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
                          style={{ backgroundColor: selectedTypeData.color, color: "#ffffff" }} // Bulletproof color
                        >
                          Send Another Message
                        </button>
                      </div>
                    ) : (
                      /* Forms Render */
                      <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-100">
                        {selectedType === "general" && <GeneralInquiry setSubmitted={setSubmitted} />}
                        {selectedType === "partnership" && <BusinessPartnership setSubmitted={setSubmitted} />}
                        {selectedType === "export" && <ExportQuery setSubmitted={setSubmitted} />}
                        {selectedType === "supplier" && <SupplierRegistration setSubmitted={setSubmitted} />}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Service Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: "< 48 Hours", sub: "Avg. Response Time" },
                { icon: Globe, title: "EN, DE, FR, HI", sub: "Languages Supported" },
                { icon: CheckCircle, title: "10,000+", sub: "Inquiries Annually" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 text-center flex flex-col items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-full bg-[#f0f7f1] flex items-center justify-center mb-4 group-hover:bg-[#2A5C32] transition-colors duration-300">
                    <stat.icon size={22} className="text-[#2A5C32] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="font-extrabold text-gray-900 text-lg mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{stat.title}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.sub}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Helper for breaking labels if needed
function labelArrayToText(label) {
  if (label === "Business Partnership") return "Business Partner";
  if (label === "Supplier Registration") return "Supplier Reg.";
  return label;
}