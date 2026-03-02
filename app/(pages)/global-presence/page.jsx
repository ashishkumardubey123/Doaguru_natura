'use client';

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Building2, Users, Globe, Package, ArrowRight, MapPin, Phone, Mail } from "lucide-react";

const regions = [
  {
    id: "apac",
    name: "Asia-Pacific",
    countries: 15,
    color: "#c8e6c9",
    activeColor: "#2A5C32",
    offices: [
      { city: "Mumbai", country: "India", phone: "+91 22 4567 8900", email: "india@naturahealthcare.com", type: "Regional HQ" },
      { city: "Singapore", country: "Singapore", phone: "+65 6789 0123", email: "apac@naturahealthcare.com", type: "APAC Hub" },
      { city: "Ho Chi Minh City", country: "Vietnam", phone: "+84 28 3456 7890", email: "vietnam@naturahealthcare.com", type: "Country Office" },
    ],
    countryList: ["India", "China", "Vietnam", "Philippines", "Indonesia", "Thailand", "Malaysia", "Bangladesh", "Sri Lanka", "Nepal", "Myanmar", "Cambodia", "Pakistan", "Japan", "South Korea"],
    topProducts: ["Cardiology Range", "Anti-Infectives", "Diabetes Portfolio"],
    teamSize: "850+",
  },
  {
    id: "mea",
    name: "Middle East & Africa",
    countries: 20,
    color: "#ffe0b2",
    activeColor: "#e65100",
    offices: [
      { city: "Dubai", country: "UAE", phone: "+971 4 234 5678", email: "mea@naturahealthcare.com", type: "Regional HQ" },
      { city: "Nairobi", country: "Kenya", phone: "+254 20 234 5678", email: "africa@naturahealthcare.com", type: "Africa Hub" },
      { city: "Riyadh", country: "Saudi Arabia", phone: "+966 11 234 5678", email: "ksa@naturahealthcare.com", type: "Country Office" },
    ],
    countryList: ["UAE", "Saudi Arabia", "Kenya", "Nigeria", "South Africa", "Ethiopia", "Tanzania", "Ghana", "Jordan", "Egypt", "Morocco", "Algeria", "Oman", "Qatar", "Bahrain", "Kuwait", "Iraq", "Uganda", "Zambia", "Zimbabwe"],
    topProducts: ["Anti-Infectives", "Oncology Range", "Cardiology"],
    teamSize: "620+",
  },
  {
    id: "europe",
    name: "Europe",
    countries: 8,
    color: "#bbdefb",
    activeColor: "#1565c0",
    offices: [
      { city: "Zurich", country: "Switzerland", phone: "+41 44 123 4567", email: "europe@naturahealthcare.com", type: "Global HQ" },
      { city: "London", country: "United Kingdom", phone: "+44 20 7890 1234", email: "uk@naturahealthcare.com", type: "Country Office" },
      { city: "Frankfurt", country: "Germany", phone: "+49 69 1234 5678", email: "germany@naturahealthcare.com", type: "Country Office" },
    ],
    countryList: ["Switzerland", "United Kingdom", "Germany", "France", "Netherlands", "Poland", "Spain", "Italy"],
    topProducts: ["Neurology Range", "Oncology", "Cardiology"],
    teamSize: "280+",
  },
  {
    id: "americas",
    name: "Americas",
    countries: 10,
    color: "#f3e5f5",
    activeColor: "#6a1b9a",
    offices: [
      { city: "Miami", country: "USA", phone: "+1 305 234 5678", email: "usa@naturahealthcare.com", type: "Americas HQ" },
      { city: "São Paulo", country: "Brazil", phone: "+55 11 2345 6789", email: "brazil@naturahealthcare.com", type: "Country Office" },
      { city: "Mexico City", country: "Mexico", phone: "+52 55 1234 5678", email: "mexico@naturahealthcare.com", type: "Country Office" },
    ],
    countryList: ["USA", "Brazil", "Mexico", "Colombia", "Argentina", "Peru", "Chile", "Canada", "Ecuador", "Venezuela"],
    topProducts: ["Generics Portfolio", "Cardiology", "Anti-Infectives"],
    teamSize: "340+",
  },
];

function WorldMap({ activeRegion, onRegionClick }) {
  return (
    <div className="w-full h-[400px] bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2A5C32 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="text-center z-10">
        <Globe size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 font-medium">Interactive Map Visualization</p>
        <p className="text-xs text-gray-400 mt-2">Select a region below to view details</p>
      </div>
    </div>
  );
}

export default function GlobalPresence() {
  const [activeRegion, setActiveRegion] = useState(null);

  const handleRegionClick = (id) => {
    setActiveRegion((prev) => (prev === id ? null : id));
  };

  const selectedRegion = regions.find((r) => r.id === activeRegion) || null;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Page Hero */}
      <div style={{ background: "linear-gradient(135deg, #2A5C32 0%, #1a3c22 100%)" }} className="text-white py-16">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center gap-2 text-green-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Global Presence</span>
          </div>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }} className="mb-3">
            Our Global Footprint
          </h1>
          <p className="text-green-200 max-w-xl">
            Delivering quality medicines to 50+ countries through a network of regional offices, strategic partners, and robust supply chains spanning 4 continents.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "50+", label: "Countries" },
              { value: "4", label: "Regional Offices" },
              { value: "200+", label: "Distribution Partners" },
              { value: "2,090+", label: "Global Employees" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black" style={{ fontFamily: "'Montserrat', sans-serif", color: "#2A5C32" }}>{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-12">
        {/* Instruction */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Click a region</span> on the map or the cards below to explore our local presence.
          </p>
        </div>

        {/* Interactive World Map */}
        <div className="mb-12">
          <WorldMap activeRegion={activeRegion} onRegionClick={handleRegionClick} />
        </div>

        {/* Region Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => handleRegionClick(region.id)}
              className={`text-left rounded-2xl p-6 border-2 transition-all duration-300 ${
                activeRegion === region.id
                  ? "shadow-lg -translate-y-1"
                  : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-md"
              }`}
              style={
                activeRegion === region.id
                  ? { borderColor: region.activeColor, backgroundColor: `${region.color}40` }
                  : {}
              }
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: region.activeColor }}
                />
                <span
                  className="text-xs font-bold px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: region.activeColor }}
                >
                  {region.countries} Countries
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {region.name}
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Building2 size={11} /> {region.offices.length} Offices</span>
                <span className="flex items-center gap-1"><Users size={11} /> {region.teamSize} Staff</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Region Panel */}
        {selectedRegion && (
          <div
            className="rounded-3xl p-8 mb-14 animate-in fade-in slide-in-from-top-4 duration-300"
            style={{ backgroundColor: `${selectedRegion.color}40`, border: `2px solid ${selectedRegion.activeColor}30` }}
          >
            <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
              <div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif", color: selectedRegion.activeColor }}
                >
                  {selectedRegion.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  Serving {selectedRegion.countries} markets with {selectedRegion.offices.length} strategic office locations.
                </p>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <div className="text-2xl font-black" style={{ fontFamily: "'Montserrat', sans-serif", color: selectedRegion.activeColor }}>{selectedRegion.countries}+</div>
                  <div className="text-xs text-gray-500">Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-black" style={{ fontFamily: "'Montserrat', sans-serif", color: selectedRegion.activeColor }}>{selectedRegion.teamSize}</div>
                  <div className="text-xs text-gray-500">Employees</div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Office Contacts */}
              <div className="lg:col-span-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Regional Offices</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedRegion.offices.map((office) => (
                    <div key={office.city} className="bg-white rounded-2xl p-5 shadow-sm border border-white">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{office.city}</div>
                          <div className="text-xs text-gray-400">{office.country}</div>
                        </div>
                        <span
                          className="text-[10px] font-bold px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: selectedRegion.activeColor }}
                        >
                          {office.type}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone size={11} style={{ color: selectedRegion.activeColor }} />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Mail size={11} style={{ color: selectedRegion.activeColor }} />
                          <span>{office.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side info */}
              <div className="space-y-5">
                {/* Countries */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                    <Globe size={12} /> Countries Served
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRegion.countryList.map((c) => (
                      <span key={c} className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                    <Package size={12} /> Top Product Categories
                  </h4>
                  <ul className="space-y-2">
                    {selectedRegion.topProducts.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedRegion.activeColor }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/products"
                    className="mt-4 flex items-center gap-1 text-xs font-semibold transition-colors"
                    style={{ color: selectedRegion.activeColor }}
                  >
                    View Regional Portfolio <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Offices Table */}
        <div>
          <h2
            className="text-xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            All Office Locations
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100" style={{ backgroundColor: "#f5f8f5" }}>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">City</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Country</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Region</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Type</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {regions.flatMap((r) =>
                  r.offices.map((o) => (
                    <tr key={`${r.id}-${o.city}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={13} style={{ color: r.activeColor }} />
                          <span className="font-semibold text-gray-800">{o.city}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{o.country}</td>
                      <td className="px-6 py-4">
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                          style={{ backgroundColor: r.activeColor }}
                        >
                          {r.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{o.type}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-gray-500">{o.phone}</span>
                          <span className="text-xs text-[#2A5C32]">{o.email}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16" style={{ backgroundColor: "#f5f8f5" }}>
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <h2 className="font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.6rem" }}>
            Looking to Partner in Your Region?
          </h2>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">
            Contact our regional office or submit a partnership inquiry to explore export and distribution opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:opacity-90"
            style={{ backgroundColor: "#2A5C32" }}
          >
            Submit Partnership Inquiry <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
