'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Building2, Users, Globe, Package, ArrowRight, MapPin, Phone, Mail, PlaneTakeoff, Ship, Calendar, Anchor, Loader2 } from "lucide-react";
import { fetchAllShipments } from "@/app/api/fetchShipments";

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

const hashToRegion = {
  "asia-pacific": "apac",
  europe: "europe",
  "north-america": "americas",
  "emerging-markets": "mea",
};

const regionToHash = {
  apac: "asia-pacific",
  europe: "europe",
  americas: "north-america",
  mea: "emerging-markets",
};

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
  const [shipments, setShipments] = useState([]);
  const [loadingShipments, setLoadingShipments] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Fetch exports
  const fetchShipments = async (pageNumber) => {
    if (pageNumber === 1) setLoadingShipments(true);
    else setLoadingMore(true);

    try {
      const data = await fetchAllShipments(pageNumber, 20); // limits to 20 per UI load
      if (data.success) {
        // Map DB snake_case column names → frontend camelCase keys
        const mapped = data.data.map((row) => ({
          product: row.product_description,
          destinationCountry: row.country_of_destination,
          destinationPort: row.port_of_destination,
          mode: row.shipment_mode,
          date: row.sb_date,
          quantity: row.quantity,
          unit: row.unit,
          exportPort: row.indian_port,
        }));

        if (pageNumber === 1) {
          setShipments(mapped);
        } else {
          setShipments(prev => [...prev, ...mapped]);
        }

        if (data.pagination) {
          setHasMore(pageNumber < data.pagination.totalPages);
        } else {
          setHasMore(mapped.length === 20);
        }

      } else {
        if (pageNumber === 1) setShipments([]);
        console.error("Failed to fetch shipments:", data.error || data.message);
      }
    } catch (error) {
      console.error("Error fetching shipments:", error);
      if (pageNumber === 1) setShipments([]);
    } finally {
      if (pageNumber === 1) setLoadingShipments(false);
      else setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchShipments(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchShipments(nextPage);
  };

  const handleRegionClick = (id) => {
    setActiveRegion((prev) => {
      const next = prev === id ? null : id;
      if (next) {
        const hash = regionToHash[next] ?? next;
        window.history.replaceState(null, "", `#${hash}`);
      } else if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      return next;
    });
  };

  const selectedRegion = regions.find((r) => r.id === activeRegion) || null;

  // Compute dynamic details from shipments
  const regionalShipments = selectedRegion
    ? shipments.filter(s => selectedRegion.countryList.some(c => c.toLowerCase() === s.destinationCountry.toLowerCase()))
    : [];

  const dynamicCountries = [...new Set(regionalShipments.map(s => s.destinationCountry))];
  const displayCountries = dynamicCountries.length > 0 ? dynamicCountries : (selectedRegion?.countryList || []);

  const productCounts = {};
  regionalShipments.forEach(s => {
    productCounts[s.product] = (productCounts[s.product] || 0) + 1; // Count by number of shipments
  });
  
  const dynamicTopProducts = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5) // Top 5 logic
    .map(p => p[0]);
    
  const displayTopProducts = dynamicTopProducts.length > 0 ? dynamicTopProducts : (selectedRegion?.topProducts || []);

  useEffect(() => {
    const applyHashRegion = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const regionId = hashToRegion[hash];
      if (regionId) {
        setActiveRegion(regionId);
      }

      const target = document.getElementById(hash);
      if (!target) return;

      const offset = 92;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    applyHashRegion();
    window.addEventListener("hashchange", applyHashRegion);
    return () => window.removeEventListener("hashchange", applyHashRegion);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Page Hero */}
      <div style={{ background: "linear-gradient(135deg, #2A5C32 0%, #1a3c22 100%)" }} className="text-white py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              id={regionToHash[region.id] ?? region.id}
              onClick={() => handleRegionClick(region.id)}
              className={`text-left rounded-2xl p-6 border-2 transition-all duration-300 scroll-mt-28 ${
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
                  Serving expanding markets in the region with live export tracking.
                </p>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <div className="text-2xl font-black" style={{ fontFamily: "'Montserrat', sans-serif", color: selectedRegion.activeColor }}>{displayCountries.length}</div>
                  <div className="text-xs text-gray-500">Active Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-black flex items-center justify-center gap-1" style={{ fontFamily: "'Montserrat', sans-serif", color: selectedRegion.activeColor }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: selectedRegion.activeColor }} /> LIVE
                  </div>
                  <div className="text-xs text-gray-500">Data Feed</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Countries */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-white">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                  <Globe size={13} style={{ color: selectedRegion.activeColor }} /> Live Countries Served
                </h4>
                <div className="flex flex-wrap gap-2">
                  {displayCountries.map((c) => (
                    <span key={c} className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-gray-50 text-gray-700 border border-gray-100 transition-colors hover:border-gray-200">
                      {c}
                    </span>
                  ))}
                  {dynamicCountries.length === 0 && (
                    <span className="text-xs text-gray-400 italic mt-1 w-full">(Showing target markets. Awaiting live shipment data to update.)</span>
                  )}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-white flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                    <Package size={13} style={{ color: selectedRegion.activeColor }} /> High Request Products
                  </h4>
                  <ul className="space-y-3">
                    {displayTopProducts.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm font-medium text-gray-800">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedRegion.activeColor }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {dynamicTopProducts.length === 0 && (
                    <span className="text-xs text-gray-400 italic mt-3 block">(Showing internal product focus. Awaiting live shipment data to update.)</span>
                  )}
                </div>
                <Link
                  href="/products"
                  className="mt-6 flex items-center gap-1 text-xs font-bold transition-all hover:gap-2"
                  style={{ color: selectedRegion.activeColor }}
                >
                  View Full Portfolio <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Recent Global Shipments */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h2
                className="text-xl font-bold text-gray-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Recent Global Shipments
              </h2>
              <p className="text-sm text-gray-500 mt-1">Live export tracking from our distribution centers</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-[#f0f7f1] text-[#2A5C32] border border-[#d8ecd8]">
              <div className="w-2 h-2 rounded-full bg-[#2A5C32] animate-pulse"></div> Live Tracker
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-sm">
                <thead>
                  <tr className="border-b border-gray-100" style={{ backgroundColor: "#f5f8f5" }}>
                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Product Name</th>
                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Country</th>
                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Destination Port</th>
                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Mode</th>
                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Shipment Date</th>
                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Quantity</th>
                    <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Export Port</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loadingShipments ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#2A5C32]" />
                        <p>Loading recent shipments...</p>
                      </td>
                    </tr>
                  ) : shipments.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                        No recent shipments found.
                      </td>
                    </tr>
                  ) : (
                    shipments.map((s, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-semibold text-gray-800">{s.product}</div>
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-900 flex items-center gap-2">
                           <MapPin size={14} className="text-[#2A5C32]" /> {s.destinationCountry}
                        </td>
                        <td className="px-5 py-4 text-gray-600">{s.destinationPort}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                            {s.mode?.toLowerCase().includes("air") ? <PlaneTakeoff size={13} /> : s.mode?.toLowerCase().includes("sea") ? <Ship size={13} /> : <Package size={13} />}
                            {s.mode}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                          <div className="flex items-center gap-1.5"><Calendar size={13} className="text-gray-400" /> {s.date}</div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="font-bold text-gray-700">{s.quantity}</span> <span className="text-xs text-gray-400 ml-0.5">{s.unit}</span>
                        </td>
                        <td className="px-5 py-4">
                           <div className="flex items-center gap-1.5 text-xs text-gray-500">
                             <Anchor size={13} className="text-[#2A5C32] opacity-70" />
                             <span className="truncate max-w-[150px]" title={s.exportPort}>{s.exportPort}</span>
                           </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {hasMore && (
              <div className="flex justify-center p-6 border-t border-gray-100">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: loadingMore ? "#f1f5f2" : "#2A5C32",
                    color: loadingMore ? "#2A5C32" : "white",
                  }}
                >
                  {loadingMore ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "View More Shipments"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16" style={{ backgroundColor: "#f5f8f5" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
