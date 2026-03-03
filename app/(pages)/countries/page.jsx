'use client';

import { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Globe } from "lucide-react";

const regionData = {
  "Asia-Pacific": {
    color: "#2A5C32",
    bg: "#e8f5e9",
    countries: [
      { name: "India", products: "Full Portfolio", status: "Approved" },
      { name: "China", products: "API, Generic Formulations", status: "Approved" },
      { name: "Vietnam", products: "Anti-Infectives, Cardiology", status: "Approved" },
      { name: "Philippines", products: "Cardiology, Diabetes", status: "Approved" },
      { name: "Indonesia", products: "Anti-Infectives, Generics", status: "Approved" },
      { name: "Thailand", products: "Oncology, Neurology", status: "Approved" },
      { name: "Malaysia", products: "Full Portfolio", status: "Approved" },
      { name: "Bangladesh", products: "Anti-Infectives, Cardiology", status: "Approved" },
      { name: "Sri Lanka", products: "Generics Portfolio", status: "Approved" },
      { name: "Nepal", products: "Essential Medicines", status: "Approved" },
      { name: "Myanmar", products: "Anti-Infectives", status: "In Progress" },
      { name: "Cambodia", products: "Essential Medicines", status: "In Progress" },
      { name: "Pakistan", products: "Anti-Infectives, Diabetes", status: "Approved" },
      { name: "Japan", products: "Select Generics", status: "In Progress" },
      { name: "South Korea", products: "Oncology, Cardiology", status: "Approved" },
    ],
  },
  "Middle East & Africa": {
    color: "#e65100",
    bg: "#ffe0b2",
    countries: [
      { name: "UAE", products: "Full Portfolio", status: "Approved" },
      { name: "Saudi Arabia", products: "Cardiology, Oncology", status: "Approved" },
      { name: "Kenya", products: "Anti-Infectives, Essential Medicines", status: "Approved" },
      { name: "Nigeria", products: "Anti-Infectives, Generics", status: "Approved" },
      { name: "South Africa", products: "Oncology, Cardiology", status: "Approved" },
      { name: "Ethiopia", products: "Essential Medicines", status: "Approved" },
      { name: "Tanzania", products: "Anti-Infectives", status: "Approved" },
      { name: "Ghana", products: "Generics Portfolio", status: "Approved" },
      { name: "Jordan", products: "Cardiology, Neurology", status: "Approved" },
      { name: "Egypt", products: "Full Portfolio", status: "Approved" },
      { name: "Morocco", products: "Cardiology, Diabetes", status: "Approved" },
      { name: "Algeria", products: "Generics Portfolio", status: "In Progress" },
      { name: "Oman", products: "Cardiology, Oncology", status: "Approved" },
      { name: "Qatar", products: "Specialty Range", status: "Approved" },
      { name: "Kuwait", products: "Cardiology, Diabetes", status: "Approved" },
      { name: "Iraq", products: "Anti-Infectives", status: "Approved" },
      { name: "Uganda", products: "Essential Medicines", status: "Approved" },
      { name: "Zambia", products: "Anti-Infectives", status: "Approved" },
      { name: "Zimbabwe", products: "Essential Medicines", status: "Approved" },
      { name: "Bahrain", products: "Specialty Range", status: "Approved" },
    ],
  },
  "Europe": {
    color: "#1565c0",
    bg: "#bbdefb",
    countries: [
      { name: "Switzerland", products: "Full Portfolio (Global HQ)", status: "Approved" },
      { name: "United Kingdom", products: "Generics, Oncology", status: "Approved" },
      { name: "Germany", products: "Generics Portfolio", status: "Approved" },
      { name: "France", products: "Cardiology, Neurology", status: "Approved" },
      { name: "Netherlands", products: "Generics, API", status: "Approved" },
      { name: "Poland", products: "Generics Portfolio", status: "Approved" },
      { name: "Spain", products: "Cardiology, Oncology", status: "Approved" },
      { name: "Italy", products: "Generics, Specialty", status: "Approved" },
    ],
  },
  "Americas": {
    color: "#6a1b9a",
    bg: "#f3e5f5",
    countries: [
      { name: "USA", products: "USFDA ANDAs — Cardiology, Oncology", status: "Approved" },
      { name: "Brazil", products: "Generics Portfolio", status: "Approved" },
      { name: "Mexico", products: "Anti-Infectives, Cardiology", status: "Approved" },
      { name: "Colombia", products: "Generics Portfolio", status: "Approved" },
      { name: "Argentina", products: "Cardiology, Neurology", status: "Approved" },
      { name: "Peru", products: "Anti-Infectives, Generics", status: "Approved" },
      { name: "Chile", products: "Cardiology, Oncology", status: "Approved" },
      { name: "Canada", products: "Select Generics", status: "In Progress" },
      { name: "Ecuador", products: "Anti-Infectives", status: "Approved" },
      { name: "Venezuela", products: "Essential Medicines", status: "In Progress" },
    ],
  },
};

export default function Countries() {
  const [activeRegion, setActiveRegion] = useState("Asia-Pacific");
  const [search, setSearch] = useState("");

  const region = regionData[activeRegion];
  const filtered = region.countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = Object.values(regionData).reduce((acc, r) => acc + r.countries.length, 0);
  const approved = Object.values(regionData).reduce(
    (acc, r) => acc + r.countries.filter((c) => c.status === "Approved").length, 0
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0f2415] to-[#2A5C32] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-green-300 mb-3">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Countries</span>
          </div>
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Countries We Serve</h1>
          <p className="text-green-200 max-w-xl">Regulatory approvals and product access in {total}+ countries across 4 regions.</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{ backgroundColor: "#f7f9f8" }} className="py-8 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: `${total}+`, l: "Countries Served" },
              { v: `${approved}`, l: "Regulatory Approvals" },
              { v: "4", l: "Geographic Regions" },
              { v: "500+", l: "Products Registered" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-3xl font-bold" style={{ color: "#2A5C32", fontFamily: "'Montserrat', sans-serif" }}>{s.v}</div>
                <div className="text-sm text-gray-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        {/* Region Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(regionData).map(([region, data]) => (
            <button
              key={region}
              onClick={() => { setActiveRegion(region); setSearch(""); }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border-2 ${
                activeRegion === region ? "text-white border-transparent" : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
              style={{
                backgroundColor: activeRegion === region ? data.color : "transparent",
              }}
            >
              {region} ({data.countries.length})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-sm">
          <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search country..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2A5C32] transition-colors"
          />
        </div>

        {/* Country Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((country, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: region.color }} />
                  <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>{country.name}</h3>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: country.status === "Approved" ? "#2A5C32" : "#F59E0B" }}
                >
                  {country.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{country.products}</p>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Globe size={48} className="mx-auto mb-3 opacity-30" />
            <p>No countries found matching &quot;{search}&quot;</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #2A5C32 0%, #1a3c22 100%)" }}>
        <div className="max-w-[1440px] mx-auto px-6 text-center text-white">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Not Listed? We Can Help.</h2>
          <p className="text-green-200 mb-8 max-w-lg mx-auto">Our regulatory team is actively working to expand into new markets. Reach out to discuss your country&apos;s requirements.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#2A5C32] font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-[#f0f7f1] hover:text-[#1f4b28] hover:shadow-lg">
            Enquire About Your Country <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
