'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Building2, Users, Globe, Package, ArrowRight, MapPin, Phone, Mail, PlaneTakeoff, Ship, Calendar, Anchor, Loader2 } from "lucide-react";
import { fetchAllShipments } from "@/app/api/fetchShipments";
import countryCoords from "@/app/utils/countryCoordinates";

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

function WorldMap({ activeRegion, onRegionClick, shipments = [] }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Extract unique countries from shipments
  const servedCountries = [...new Set(shipments.map(s => s.destinationCountry?.toUpperCase()).filter(Boolean))];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className="w-full bg-gradient-to-br from-[#f0f7f1] to-[#e8f0e9] rounded-3xl border border-gray-200 relative overflow-hidden"
      style={{ minHeight: 420 }}
      onMouseMove={handleMouseMove}
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#2A5C32 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      {/* Map Title */}
      <div className="absolute top-5 left-6 z-10 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#2A5C32] animate-pulse"></div>
        <span className="text-xs font-bold text-[#2A5C32] uppercase tracking-widest">Live Export Map</span>
        <span className="text-[10px] text-gray-400 ml-1">({servedCountries.length} countries)</span>
      </div>

      {/* SVG World Map */}
      <svg viewBox="0 0 1000 500" className="w-full h-full" style={{ minHeight: 400 }}>
        {/* Simplified continent outlines */}
        {/* North America */}
        <path d="M50,80 L80,60 L120,55 L160,50 L200,55 L230,70 L250,90 L260,120 L250,150 L240,180 L220,200 L200,210 L180,220 L160,230 L140,225 L120,210 L100,200 L80,190 L60,170 L50,140 L45,110 Z" fill="#d4e8d6" stroke="#b8d4ba" strokeWidth="1" opacity="0.7" />
        {/* Central America */}
        <path d="M120,210 L140,225 L150,240 L155,260 L145,270 L135,265 L125,255 L115,240 L110,225 Z" fill="#d4e8d6" stroke="#b8d4ba" strokeWidth="1" opacity="0.7" />
        {/* South America */}
        <path d="M155,260 L175,255 L200,260 L220,275 L235,300 L240,330 L235,360 L225,385 L210,395 L195,390 L185,375 L175,355 L165,340 L160,320 L155,300 L150,280 Z" fill="#d4e8d6" stroke="#b8d4ba" strokeWidth="1" opacity="0.7" />
        {/* Europe */}
        <path d="M370,60 L400,55 L430,60 L460,70 L480,80 L485,100 L480,120 L470,140 L460,155 L445,160 L430,155 L415,145 L400,140 L385,130 L375,115 L370,95 Z" fill="#d4e8d6" stroke="#b8d4ba" strokeWidth="1" opacity="0.7" />
        {/* UK/Ireland */}
        <path d="M375,95 L385,90 L395,95 L395,110 L388,115 L378,110 Z" fill="#d4e8d6" stroke="#b8d4ba" strokeWidth="1" opacity="0.7" />
        {/* Africa */}
        <path d="M390,170 L420,165 L450,170 L475,180 L500,200 L520,230 L530,260 L530,290 L525,320 L515,345 L500,365 L480,370 L460,365 L445,350 L430,330 L420,305 L415,280 L410,255 L400,230 L390,205 L385,185 Z" fill="#d4e8d6" stroke="#b8d4ba" strokeWidth="1" opacity="0.7" />
        {/* Middle East */}
        <path d="M520,155 L545,150 L570,155 L590,170 L595,190 L585,205 L570,210 L555,205 L540,195 L525,180 L520,165 Z" fill="#d4e8d6" stroke="#b8d4ba" strokeWidth="1" opacity="0.7" />
        {/* India */}
        <path d="M620,180 L645,170 L670,175 L690,190 L700,210 L705,235 L700,260 L690,280 L675,290 L660,285 L650,270 L640,250 L630,230 L625,210 L620,195 Z" fill="#c8e0ca" stroke="#a8cca8" strokeWidth="1" opacity="0.8" />
        {/* China/East Asia */}
        <path d="M680,100 L720,90 L760,95 L800,100 L830,115 L840,135 L835,160 L820,180 L800,190 L775,195 L750,190 L730,180 L715,165 L700,150 L690,130 L685,115 Z" fill="#d4e8d6" stroke="#b8d4ba" strokeWidth="1" opacity="0.7" />
        {/* Southeast Asia */}
        <path d="M720,210 L745,200 L770,210 L785,230 L790,250 L780,265 L765,270 L750,268 L735,260 L725,245 L720,225 Z" fill="#d4e8d6" stroke="#b8d4ba" strokeWidth="1" opacity="0.7" />
        {/* Japan */}
        <path d="M845,130 L855,120 L865,125 L870,140 L865,155 L855,160 L845,155 L840,145 Z" fill="#d4e8d6" stroke="#b8d4ba" strokeWidth="1" opacity="0.7" />
        {/* Australia */}
        <path d="M780,330 L820,315 L860,310 L900,315 L920,330 L930,350 L925,375 L910,390 L890,395 L860,390 L835,380 L810,370 L795,355 L785,340 Z" fill="#d4e8d6" stroke="#b8d4ba" strokeWidth="1" opacity="0.7" />
        {/* Russia (simplified) */}
        <path d="M460,30 L520,25 L580,20 L640,22 L700,25 L760,30 L820,40 L860,55 L870,75 L850,90 L820,95 L780,90 L740,85 L700,80 L660,75 L620,70 L580,65 L540,60 L500,55 L470,50 L460,40 Z" fill="#d4e8d6" stroke="#b8d4ba" strokeWidth="1" opacity="0.5" />

        {/* Country dots */}
        {servedCountries.map((country) => {
          const coords = countryCoords[country];
          if (!coords) return null;
          const cx = coords[0] * 10; // Convert % to SVG coordinate (0-1000)
          const cy = coords[1] * 10; // Convert % to SVG coordinate (0-500 scaled)
          return (
            <g key={country}
              onMouseEnter={() => setHoveredCountry(country)}
              onMouseLeave={() => setHoveredCountry(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Pulsating ring */}
              <circle cx={cx} cy={cy} r="12" fill="none" stroke="#2A5C32" strokeWidth="1.5" opacity="0.3">
                <animate attributeName="r" from="6" to="18" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Solid dot */}
              <circle cx={cx} cy={cy} r="5" fill="#2A5C32" stroke="#fff" strokeWidth="2" />
            </g>
          );
        })}
      </svg>

      {/* Hover Tooltip */}
      {hoveredCountry && (
        <div
          className="absolute z-50 pointer-events-none px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-lg"
          style={{
            backgroundColor: '#1a3c22',
            left: mousePos.x + 12,
            top: mousePos.y - 30,
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          {hoveredCountry.charAt(0) + hoveredCountry.slice(1).toLowerCase()}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1a3c22]"></div>
        </div>
      )}

      {/* Legend */}
      {servedCountries.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <Globe size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400 text-sm font-medium">Upload shipment data to see served countries</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GlobalPresence() {
  const [activeRegion, setActiveRegion] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [loadingShipments, setLoadingShipments] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch exports
  const fetchShipments = async (pageNumber) => {
    if (pageNumber === 1) setLoadingShipments(true);
    else setLoadingMore(true);

    try {
      const data = await fetchAllShipments(pageNumber, 50); // Fetch 50 records per page
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

        setShipments(mapped);

        if (data.pagination) {
          setTotalPages(data.pagination.totalPages || 1);
        }

      } else {
        setShipments([]);
        console.error("Failed to fetch shipments:", data.error || data.message);
      }
    } catch (error) {
      console.error("Error fetching shipments:", error);
      setShipments([]);
    } finally {
      setLoadingShipments(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchShipments(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    fetchShipments(newPage);
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
          <WorldMap activeRegion={activeRegion} onRegionClick={handleRegionClick} shipments={shipments} />
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

            <div className="flex items-center justify-between p-5 border-t border-gray-100 bg-gray-50/50">
              <span className="text-sm text-gray-500">
                Page <span className="font-semibold text-gray-800">{page}</span> of <span className="font-semibold text-gray-800">{totalPages}</span>
              </span>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1 || loadingMore}
                  className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 shadow-sm"
                >
                  Previous
                </button>
                
                <div className="relative">
                  <select 
                     value={page}
                     onChange={(e) => handlePageChange(Number(e.target.value))}
                     disabled={loadingMore}
                     className="appearance-none pl-4 pr-9 py-2 text-sm font-medium border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2A5C32]/20 shadow-sm cursor-pointer"
                  >
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>Page {num}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                <button 
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages || loadingMore}
                  className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 shadow-sm"
                >
                  Next
                </button>
              </div>
            </div>
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
