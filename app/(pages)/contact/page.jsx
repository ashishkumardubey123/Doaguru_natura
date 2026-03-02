'use client';

import { useState } from "react";
import Link from "next/link";
import {
  MapPin, Phone, Mail, Clock,
  CheckCircle, Handshake, Box, Globe2, MailQuestion,
  Globe, ArrowRight, Package
} from "lucide-react";
import GeneralInquiry from "@/components/ContactForms/GeneralInquiry";
import BusinessPartnership from "@/components/ContactForms/BusinessPartnership";
import ExportQuery from "@/components/ContactForms/ExportQuery";
import SupplierRegistration from "@/components/ContactForms/SupplierRegistration";

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
    hours: "Monâ€“Fri: 9:00 AM â€“ 6:00 PM CET",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d2701.558330758416!2d8.53805561562215!3d47.3815559791703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a08e110c4d7%3A0x6a086208579d40!2sZurich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
  },
  {
    id: "apac",
    region: "ASIA-PACIFIC HQ",
    city: "Mumbai, India",
    address: "Bandra-Kurla Complex, Mumbai 400 051, India",
    phone: "+91 22 4567 8900",
    email: "india@naturahealthcare.com",
    hours: "Monâ€“Sat: 9:00 AM â€“ 6:00 PM IST",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3771.44304419965!2d72.8656144153832!3d19.06533355792182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e123f8d27b%3A0x437996b49a236a78!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
  },
  {
    id: "mea",
    region: "MEA HQ",
    city: "Dubai, UAE",
    address: "DAFZA Free Zone, Dubai, UAE",
    phone: "+971 4 234 5678",
    email: "mea@naturahealthcare.com",
    hours: "Monâ€“Fri: 9:00 AM â€“ 6:00 PM GST",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3608.324317926887!2d55.35760831501062!3d25.25968298386708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c5b5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sDubai%20Airport%20Freezone!5e0!3m2!1sen!2sae!4v1625000000000!5m2!1sen!2sae"
  },
  {
    id: "americas",
    region: "AMERICAS HQ",
    city: "Miami, USA",
    address: "Brickell City Centre, Miami FL 33131, USA",
    phone: "+1 305 234 5678",
    email: "usa@naturahealthcare.com",
    hours: "Monâ€“Fri: 9:00 AM â€“ 6:00 PM EST",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3593.058204680216!2d-80.1947024849767!3d25.76695698363412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69c6c6c6c6c%3A0x6c6c6c6c6c6c6c6c!2sBrickell%20City%20Centre!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
  },
];

export default function Contact() {
  const [selectedType, setSelectedType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(offices[0]);

  const selectedTypeData = inquiryTypes.find(t => t.value === selectedType);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#1a3c22] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async"
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            alt="Contact Us Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c22] via-[#1a3c22]/80 to-transparent"></div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-sm text-green-300 mb-4 font-medium tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span>Contact Us</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get in Touch</h1>
          <p className="text-green-100 max-w-xl text-lg leading-relaxed">Our global team is ready to assist with your pharmaceutical needs. Reach out to the right team for prompt support.</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          
          {/* Sidebar â€” Offices */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Offices</h3>
            
            {/* Office List */}
            <div className="space-y-3">
              {offices.map((office) => (
                <button
                  key={office.id}
                  onClick={() => setSelectedOffice(office)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
                    selectedOffice.id === office.id 
                      ? "border-[#2A5C32] bg-[#f0f7f1]" 
                      : "border-gray-100 hover:border-gray-200 bg-white"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    selectedOffice.id === office.id ? "bg-[#2A5C32] text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    <MapPin size={16} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                      selectedOffice.id === office.id ? "text-[#2A5C32]" : "text-gray-500"
                    }`}>{office.region}</div>
                    <div className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>{office.city}</div>
                    <div className="text-xs text-gray-500 mt-1 truncate">{office.address}</div>
                  </div>
                  {selectedOffice.id === office.id && (
                    <CheckCircle size={16} className="text-[#2A5C32] shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Selected Office Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h4 className="font-bold text-gray-900 mb-4 text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {selectedOffice.region} â€” {selectedOffice.city}
              </h4>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600 leading-relaxed">{selectedOffice.address}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone size={16} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-600">{selectedOffice.phone}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail size={16} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-600">{selectedOffice.email}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Clock size={16} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-600">{selectedOffice.hours}</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-48 bg-gray-200 rounded-2xl overflow-hidden border border-gray-100">
              <iframe
                src={selectedOffice.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title={`${selectedOffice.city} Map`}
              ></iframe>
            </div>

            {/* Bottom Links */}
            <div className="flex gap-3">
              <Link href="/global-presence" className="flex-1 flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 bg-white">
                <div className="flex items-center gap-2"><Globe size={16} className="text-[#2A5C32]"/> All Offices</div>
                <ArrowRight size={14} className="text-gray-400" />
              </Link>
              <Link href="/products" className="flex-1 flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 bg-white">
                <div className="flex items-center gap-2"><Package size={16} className="text-[#2A5C32]"/> Products</div>
                <ArrowRight size={14} className="text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Contact Form Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-8">Please select your reason for inquiry to help us route your message correctly.</p>

              {/* Inquiry Type Selection */}
              <div className="mb-8">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4 block">Reason for Inquiry <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {inquiryTypes.map((type) => {
                    const isSelected = selectedType === type.value;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setSelectedType(type.value)}
                        className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          isSelected ? "bg-white" : "border-gray-100 bg-gray-50 hover:border-gray-200"
                        }`}
                        style={{ borderColor: isSelected ? type.color : undefined }}
                      >
                        <type.icon size={24} style={{ color: isSelected ? type.color : "#9ca3af" }} />
                        <div className={`text-xs font-semibold text-center ${isSelected ? "text-gray-900" : "text-gray-500"}`}>
                          {type.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Forms */}
              {selectedType === "" ? (
                <div className="text-center py-16 border border-gray-100 bg-gray-50 rounded-xl">
                  <MailQuestion size={32} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 text-sm">Please select a reason for inquiry above to see the relevant form.</p>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 mb-6 p-3 rounded-lg" style={{ backgroundColor: `${selectedTypeData.color}15` }}>
                    <CheckCircle size={16} style={{ color: selectedTypeData.color }} />
                    <span className="text-sm font-medium text-gray-700">{selectedTypeData.desc}</span>
                  </div>
                  
                  {submitted ? (
                    <div className="text-center py-12 border border-gray-100 rounded-xl">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${selectedTypeData.color}15` }}>
                        <CheckCircle size={32} style={{ color: selectedTypeData.color }} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Message Sent!</h3>
                      <p className="text-gray-500 mb-6">Thank you for reaching out. Our team will respond within 1â€“2 business days.</p>
                      <button
                        onClick={() => { setSubmitted(false); setSelectedType(""); }}
                        className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full transition-opacity hover:opacity-90"
                        style={{ backgroundColor: selectedTypeData.color }}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <>
                      {selectedType === "general" && <GeneralInquiry setSubmitted={setSubmitted} />}
                      {selectedType === "partnership" && <BusinessPartnership setSubmitted={setSubmitted} />}
                      {selectedType === "export" && <ExportQuery setSubmitted={setSubmitted} />}
                      {selectedType === "supplier" && <SupplierRegistration setSubmitted={setSubmitted} />}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Stats Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5 text-center flex flex-col items-center justify-center">
                <Clock size={20} className="text-[#2A5C32] mb-2" />
                <div className="font-bold text-gray-900 text-sm mb-1">&lt; 2 Business Days</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Response Time</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5 text-center flex flex-col items-center justify-center">
                <Globe size={20} className="text-[#2A5C32] mb-2" />
                <div className="font-bold text-gray-900 text-sm mb-1">EN, DE, FR, HI, AR</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Languages</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5 text-center flex flex-col items-center justify-center">
                <CheckCircle size={20} className="text-[#2A5C32] mb-2" />
                <div className="font-bold text-gray-900 text-sm mb-1">10,000+ Annually</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Inquiries Handled</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
