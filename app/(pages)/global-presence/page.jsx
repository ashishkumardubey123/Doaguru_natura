'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Globe, Package, ArrowRight, MapPin, Phone, Mail, PlaneTakeoff, Ship, Calendar, Anchor, Loader2 } from "lucide-react";
import { fetchAllShipments } from "@/app/api/fetchShipments";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { fetchAllCountryCoordinates } from "@/app/utils/countryCoordinates";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
// countryList is used ONLY for filtering shipment data — no dummy display fallback
const regions = [
  {
    id: "apac",
    name: "Asia-Pacific",
    countries: 15,
    color: "#c8e6c9",
    activeColor: "#2A5C32",
    countryList: [
      "india", "china", "vietnam", "philippines", "indonesia", "thailand",
      "malaysia", "bangladesh", "sri lanka", "nepal", "myanmar", "cambodia",
      "pakistan", "japan", "south korea", "singapore", "hong kong", "taiwan",
      "laos", "brunei", "timor-leste", "mongolia", "bhutan", "maldives",
    ],
  },
  {
    id: "mea",
    name: "Middle East & Africa",
    countries: 20,
    color: "#ffe0b2",
    activeColor: "#e65100",
    countryList: [
      "uae", "saudi arabia", "kenya", "nigeria", "south africa", "ethiopia",
      "tanzania", "ghana", "jordan", "egypt", "morocco", "algeria", "oman",
      "qatar", "bahrain", "kuwait", "iraq", "uganda", "zambia", "zimbabwe",
      "united arab emirates", "iran", "israel", "lebanon", "syria", "yemen",
      "libya", "tunisia", "sudan", "cameroon", "senegal", "mozambique",
      "angola", "madagascar", "ivory coast", "côte d'ivoire", "mali",
    ],
  },
  {
    id: "europe",
    name: "Europe",
    countries: 8,
    color: "#bbdefb",
    activeColor: "#1565c0",
    countryList: [
      "switzerland", "united kingdom", "germany", "france", "netherlands",
      "poland", "spain", "italy", "sweden", "norway", "denmark", "finland",
      "belgium", "austria", "portugal", "greece", "czech republic", "slovakia",
      "hungary", "romania", "bulgaria", "croatia", "ukraine", "russia",
      "uk", "great britain", "england",
    ],
  },
  {
    id: "americas",
    name: "Americas",
    countries: 10,
    color: "#f3e5f5",
    activeColor: "#6a1b9a",
    countryList: [
      "usa", "united states", "united states of america", "brazil", "mexico",
      "colombia", "argentina", "peru", "chile", "canada", "ecuador",
      "venezuela", "bolivia", "paraguay", "uruguay", "guyana", "suriname",
      "panama", "costa rica", "guatemala", "honduras", "el salvador",
      "nicaragua", "cuba", "dominican republic", "haiti", "jamaica",
    ],
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

function WorldMap({ mapDots = [], isLoading }) {
  const [hoveredDot, setHoveredDot] = useState(null);

  return (
    <div
      className="w-full relative overflow-hidden rounded-3xl"
      style={{
        background: "linear-gradient(135deg, #0a1f0e 0%, #0f2d15 40%, #12361a 70%, #0e2410 100%)",
        minHeight: 480,
        boxShadow: "0 32px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
        border: "1px solid rgba(42,92,50,0.4)",
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(42,92,50,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(42,92,50,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(42,92,50,0.18) 0%, transparent 70%)" }} />
      <div className="absolute bottom-10 right-1/4 w-56 h-56 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(42,92,50,0.12) 0%, transparent 70%)" }} />

      {/* Top header bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold tracking-[0.18em] text-emerald-400 uppercase">
            Live Export Tracking
          </span>
        </div>
        <div className="flex items-center gap-3">
          {!isLoading && mapDots.length > 0 && (
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
              <Globe size={11} className="text-emerald-400" />
              <span className="text-xs font-semibold text-white/80">{mapDots.length} Countries Active</span>
            </div>
          )}
          <div
            className="text-xs font-black tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5"
            style={{
              background: "rgba(42,92,50,0.35)",
              border: "1px solid rgba(42,92,50,0.6)",
              color: "#6ee7a0",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            LIVE
          </div>
        </div>
      </div>

      {/* Map */}
      {isLoading ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
          <div className="relative">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-400" />
            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-emerald-500" />
          </div>
          <p className="text-sm font-semibold text-emerald-300/80 tracking-wide">
            Loading Map Data...
          </p>
        </div>
      ) : (
        <ComposableMap
          projectionConfig={{ scale: 147 }}
          style={{ width: "100%", height: "100%" }}
          className="z-10"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1d4a26"
                  stroke="#0a1f0e"
                  strokeWidth={0.6}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#255c30", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {mapDots.map((dot, index) => (
            <Marker
              key={index}
              coordinates={dot.coordinates}
              onMouseEnter={() => setHoveredDot(dot.name)}
              onMouseLeave={() => setHoveredDot(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Outer pulse ring 1 */}
              <circle r={10} fill="none" stroke="#4ade80" strokeWidth={0.8} opacity="0">
                <animate attributeName="r" from="4" to="16" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.7" to="0" dur="2.4s" repeatCount="indefinite" />
              </circle>
              {/* Outer pulse ring 2 (offset) */}
              <circle r={6} fill="none" stroke="#86efac" strokeWidth={1} opacity="0">
                <animate attributeName="r" from="3" to="11" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
              </circle>
              {/* Glowing core dot */}
              <circle
                r={3.5}
                fill={hoveredDot === dot.name ? "#86efac" : "#4ade80"}
                stroke={hoveredDot === dot.name ? "#fff" : "rgba(255,255,255,0.5)"}
                strokeWidth={1.2}
                style={{ filter: "drop-shadow(0 0 4px rgba(74,222,128,0.9))", transition: "all 0.2s" }}
              />
              {/* Tooltip on hover */}
              {hoveredDot === dot.name && (
                <g>
                  <rect
                    x={-38} y={-30} width={76} height={20}
                    rx={5} ry={5}
                    fill="rgba(10,31,14,0.92)"
                    stroke="rgba(74,222,128,0.4)"
                    strokeWidth={0.8}
                  />
                  <text
                    textAnchor="middle"
                    y={-15}
                    style={{
                      fontFamily: "Inter, system-ui",
                      fill: "#86efac",
                      fontSize: "9px",
                      fontWeight: "700",
                      letterSpacing: "0.04em",
                      pointerEvents: "none",
                    }}
                  >
                    {dot.name}
                  </text>
                </g>
              )}
            </Marker>
          ))}
        </ComposableMap>
      )}

      {/* Empty state */}
      {!isLoading && mapDots.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div
            className="text-center p-6 rounded-2xl backdrop-blur-md"
            style={{
              background: "rgba(10,31,14,0.7)",
              border: "1px solid rgba(42,92,50,0.4)",
            }}
          >
            <Globe size={36} className="mx-auto text-emerald-500/50 mb-3" />
            <p className="text-emerald-300/60 text-sm font-medium">Awaiting shipment data...</p>
          </div>
        </div>
      )}

      {/* Bottom stats bar */}
      {!isLoading && mapDots.length > 0 && (
        <div
          className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3"
          style={{
            background: "linear-gradient(to top, rgba(10,31,14,0.95) 0%, transparent 100%)",
          }}
        >
          <p className="text-xs text-white/30 flex items-center gap-1.5">
            <MapPin size={10} className="text-emerald-500/60" />
            Hover a dot to see country name
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(74,222,128,0.8)" }} />
              <span className="text-xs text-white/40 font-medium">Active Shipment Country</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---


export default function GlobalPresence() {
  const [activeRegion, setActiveRegion] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [loadingShipments, setLoadingShipments] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [dbCountries, setDbCountries] = useState([]);
  const [loadingDB, setLoadingDB] = useState(true)

  useEffect(() => {
    const loadCountries = async () => {
      const countriesData = await fetchAllCountryCoordinates(); 
      setDbCountries(countriesData);
      setLoadingDB(false);
    };
    loadCountries();
  }, []);

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
const activeMapDots = useMemo(() => {
    if (!dbCountries || dbCountries.length === 0) return [];

    return dbCountries.map(country => ({
      name: country.country_name,
      coordinates: [parseFloat(country.longitude), parseFloat(country.latitude)]
    }));
  }, [dbCountries]);

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

  // Filter shipments to only those matching the selected region's country list
  const regionalShipments = selectedRegion
    ? shipments.filter(s => {
        const dest = s.destinationCountry?.trim().toLowerCase();
        return dest && selectedRegion.countryList.some(c => c === dest || dest.includes(c) || c.includes(dest));
      })
    : [];

  const dynamicCountries = [...new Set(regionalShipments.map(s => s.destinationCountry).filter(Boolean))];
  const displayCountries = dynamicCountries;

  const productCounts = {};
  regionalShipments.forEach(s => {
    productCounts[s.product] = (productCounts[s.product] || 0) + 1; // Count by number of shipments
  });
  
  const dynamicTopProducts = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5) // Top 5 logic
    .map(p => p[0]);
    
  const displayTopProducts = dynamicTopProducts.length > 0 ? dynamicTopProducts : [];

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
  <WorldMap 
    mapDots={activeMapDots} 
    isLoading={loadingDB || loadingShipments} 
  />
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

        {/* Recent Shipments */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h2
                className="text-xl font-bold text-gray-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {selectedRegion ? `Recent ${selectedRegion.name} Shipments` : "Recent Global Shipments"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {selectedRegion ? `Live export tracking for ${selectedRegion.name}` : "Live export tracking from our distribution centers"}
              </p>
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
                  ) : (selectedRegion ? regionalShipments : shipments).length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                        No recent shipments found{selectedRegion ? ` for ${selectedRegion.name}` : ""}.
                      </td>
                    </tr>
                  ) : (
                    (selectedRegion ? regionalShipments : shipments).map((s, idx) => (
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
