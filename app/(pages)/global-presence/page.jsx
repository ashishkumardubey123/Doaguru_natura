'use client';

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { 
  ChevronRight, Globe, Package, ArrowRight, MapPin, 
  PlaneTakeoff, Ship, Calendar, Anchor, Loader2, Activity,
  Database, Network
} from "lucide-react";
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
    gradient: "from-emerald-500 to-green-700",
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
    gradient: "from-amber-500 to-orange-700",
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
    gradient: "from-blue-500 to-indigo-700",
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
    gradient: "from-purple-500 to-fuchsia-700",
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

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, []);

  return [elementRef, isVisible];
};

function WorldMap({ mapDots = [], isLoading }) {
  const [hoveredDot, setHoveredDot] = useState(null);

  return (
    <div
      className="w-full relative overflow-hidden rounded-[2.5rem] group bg-[#020b06]"
      style={{
        minHeight: 720,
        boxShadow: "0 40px 100px rgba(10,31,14,0.3), inset 0 2px 20px rgba(255,255,255,0.05)",
        border: "1px solid rgba(42,92,50,0.4)",
      }}
    >
      {/* Background Glow & Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d522a]/40 via-[#0a1f0e]/80 to-[#020b06] z-0" />
      <div 
        className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none transition-opacity duration-1000 group-hover:opacity-60">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-teal-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Grid line texture overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Top header HUD */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-wrap items-center justify-between gap-4 p-6 bg-gradient-to-b from-[#0a1f0e] to-transparent pointer-events-none">
        <div className="flex items-center gap-3 bg-[#0a1f0e]/80 backdrop-blur-md border border-emerald-500/30 rounded-2xl px-4 py-2 pointer-events-auto shadow-lg">
          <Activity size={16} className="text-emerald-400 animate-pulse" />
          <span className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase">
            Global Supply Oracle
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {!isLoading && mapDots.length > 0 && (
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 pointer-events-auto">
              <Globe size={14} className="text-emerald-300" />
              <span className="text-xs font-bold text-white tracking-widest uppercase">{mapDots.length} Active Nodes</span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/50 rounded-2xl px-4 py-2 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span className="text-xs font-black tracking-widest text-[#6ee7a0] uppercase">Live Sync</span>
          </div>
        </div>
      </div>

      {/* Map rendering */}
      {isLoading ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/20 backdrop-blur-sm">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin"></div>
            <Network size={24} className="absolute text-emerald-400 animate-pulse" />
          </div>
          <p className="text-sm font-bold text-emerald-300 tracking-[0.15em] uppercase">
            Initializing Geo-Matrix...
          </p>
        </div>
      ) : (
        <div className="absolute inset-x-0 inset-y-0 pt-20 pb-16 z-10 flex items-center justify-center">
          <ComposableMap
            projectionConfig={{ scale: 215, center: [0, 15] }}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#153621"
                    stroke="#0a1f0e"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none", transition: "fill 0.3s" },
                      hover: { fill: "#1f5032", outline: "none" },
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
                style={{ cursor: "crosshair" }}
              >
                {/* Sonar pulses */}
                <circle r={12} fill="none" stroke="#4ade80" strokeWidth={1} opacity="0">
                  <animate attributeName="r" from="4" to="24" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle r={8} fill="none" stroke="#86efac" strokeWidth={1.5} opacity="0">
                  <animate attributeName="r" from="2" to="16" dur="3s" begin="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="3s" begin="1s" repeatCount="indefinite" />
                </circle>
                
                {/* Core Node */}
                <circle
                  r={4}
                  fill={hoveredDot === dot.name ? "#ffffff" : "#4ade80"}
                  stroke={hoveredDot === dot.name ? "#86efac" : "rgba(255,255,255,0.4)"}
                  strokeWidth={hoveredDot === dot.name ? 2 : 1}
                  style={{ 
                    filter: hoveredDot === dot.name ? "drop-shadow(0 0 8px #ffffff)" : "drop-shadow(0 0 5px rgba(74,222,128,1))", 
                    transition: "all 0.3s ease-out" 
                  }}
                />
                
                {/* HUD Tooltip */}
                {hoveredDot === dot.name && (
                  <g>
                    <rect
                      x={-45} y={-38} width={90} height={24}
                      rx={6} ry={6}
                      fill="rgba(10,31,14,0.95)"
                      stroke="#4ade80"
                      strokeWidth={1}
                      style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}
                    />
                    <text
                      textAnchor="middle"
                      y={-22}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fill: "#a7f3d0",
                        fontSize: "10px",
                        fontWeight: "800",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
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
        </div>
      )}

      {/* Bottom HUD bar */}
      {!isLoading && mapDots.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-[#0a1f0e] to-transparent pointer-events-none flex items-end justify-between">
          <p className="text-xs text-emerald-500/80 font-medium tracking-widest uppercase flex items-center gap-2">
            <MapPin size={12} /> Target Coordinates Synced
          </p>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] text-emerald-400/50 uppercase tracking-[0.2em] font-bold">Node Status</span>
            <div className="w-32 h-1 bg-emerald-900/50 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full animate-pulse blur-[1px]"></div>
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
  const [loadingDB, setLoadingDB] = useState(true);

  const [headerRef, headerVisible] = useScrollAnimation();
  const [mapRef, mapVisible] = useScrollAnimation();
  const [cardsRef, cardsVisible] = useScrollAnimation();
  const [panelRef, panelVisible] = useScrollAnimation();
  const [tableRef, tableVisible] = useScrollAnimation();

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
    .slice(0, 5) // Top 5
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
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-gray-50/30">
      
      {/* Hero Section */}
      <div className="relative bg-[#0a1f0e] text-white py-24 md:py-32 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2A5C32]/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a3c22]/30 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f0e] to-transparent"></div>
        </div>

        <div ref={headerRef} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center gap-2 text-emerald-400/80 text-sm mb-6 font-semibold tracking-wide uppercase">
              <Link href="/" className="hover:text-emerald-300 transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white">Global Reach</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Global Scale.<br/>Local Precision.
            </h1>
            <p className="text-emerald-100/70 max-w-2xl text-lg md:text-xl leading-relaxed">
              Tracking our worldwide supply chain operations in real-time. We deliver critical materials, pharmaceuticals, and goods to 50+ countries with complete transparency.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-16">
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.04)] rounded-[2rem] p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            {[
              { value: "50+", label: "Destinations", icon: Globe },
              { value: "10k+", label: "Shipments", icon: Package },
              { value: "4", label: "Continental Hubs", icon: Database },
              { value: "Live", label: "Data Sync", icon: Activity },
            ].map((s, i) => (
              <div key={s.label} className={`flex flex-col items-center justify-center text-center ${i % 2 === 0 ? "pr-4" : "pl-4"} md:px-4`}>
                <s.icon size={24} className="text-emerald-500 mb-3 opacity-80" />
                <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Interactive World Map */}
        <div ref={mapRef} className={`mb-20 transition-all duration-1000 ${mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="text-center mb-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700 mb-2">Live Supply Chain</h2>
            <p className="text-gray-500 text-lg">
              Explore our distribution network across global regions.
            </p>
          </div>
          <WorldMap mapDots={activeMapDots} isLoading={loadingDB || loadingShipments} />
        </div>

        {/* Region Cards */}
        <div ref={cardsRef} className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {regions.map((region) => (
            <button
              key={region.id}
              id={regionToHash[region.id] ?? region.id}
              onClick={() => handleRegionClick(region.id)}
              className="group relative text-left rounded-[2rem] p-6 sm:p-8 transition-all duration-500 scroll-mt-32 overflow-hidden"
              style={{
                backgroundColor: activeRegion === region.id ? 'white' : 'rgba(255,255,255,0.7)',
                boxShadow: activeRegion === region.id ? `0 20px 40px ${region.activeColor}20` : '0 10px 30px rgba(0,0,0,0.03)',
                border: `1px solid ${activeRegion === region.id ? region.activeColor : 'rgba(0,0,0,0.05)'}`
              }}
            >
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${region.gradient} opacity-0 transition-opacity duration-300 ${activeRegion === region.id ? 'opacity-5' : 'group-hover:opacity-[0.02]'}`}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 ${activeRegion === region.id ? 'scale-110 shadow-lg' : ''}`} style={{ backgroundColor: `${region.activeColor}15` }}>
                     <Globe size={24} style={{ color: region.activeColor }} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-gray-900 border border-transparent transition-colors"
                        style={activeRegion === region.id ? { backgroundColor: region.activeColor, color: 'white' } : { backgroundColor: 'white', color: '#111827', borderColor: '#e5e7eb' }}>
                    {region.countries} Hubs
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {region.name}
                </h3>
                <div className="flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: activeRegion === region.id ? region.activeColor : '#6b7280' }}>
                  Analyze Data <ArrowRight size={14} className={`transition-transform duration-300 ${activeRegion === region.id ? 'translate-x-1' : ''}`} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Region Panel */}
        {selectedRegion && (
          <div ref={panelRef} className="rounded-[2.5rem] p-8 md:p-12 mb-20 relative overflow-hidden animate-in fade-in slide-in-from-top-8 duration-700 bg-white shadow-2xl border-2" style={{ borderColor: `${selectedRegion.activeColor}20` }}>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-10" style={{ backgroundColor: selectedRegion.activeColor }}></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between mb-12 gap-8">
              <div className="max-w-xl">
                <div className="inline-flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white" style={{ backgroundColor: selectedRegion.activeColor }}>Active Region</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-gray-100 text-gray-500 border border-gray-200">Analytics Sync</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {selectedRegion.name}
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Real-time visibility into our distribution network crossing {selectedRegion.name}. Displaying live metrics for target countries and highest volume products based on active customs data.
                </p>
              </div>
              
              <div className="flex bg-gray-50 rounded-3xl p-6 border border-gray-100 shadow-inner gap-8 shrink-0">
                <div className="text-center px-4">
                  <div className="text-4xl font-black mb-1" style={{ fontFamily: "'Montserrat', sans-serif", color: selectedRegion.activeColor }}>{displayCountries.length}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Paths</div>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="text-center px-4">
                  <div className="text-4xl font-black mb-1 flex items-center justify-center gap-2" style={{ fontFamily: "'Montserrat', sans-serif", color: selectedRegion.activeColor }}>
                    <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: selectedRegion.activeColor }} /> LIVE
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Data Feed</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              {/* Countries Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${selectedRegion.activeColor}15`, color: selectedRegion.activeColor }}>
                    <MapPin size={16} />
                  </div>
                  Registered Destinations
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {displayCountries.map((c) => (
                    <span key={c} className="text-xs font-bold uppercase tracking-wider px-3py-2 rounded-xl bg-gray-50 text-gray-700 border border-gray-100 hover:border-gray-300 transition-colors cursor-default select-none px-3 py-1.5 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedRegion.activeColor }}></div>
                      {c}
                    </span>
                  ))}
                  {dynamicCountries.length === 0 && (
                    <div className="w-full text-center py-6">
                      <span className="text-sm font-medium text-gray-400 italic bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 inline-block">Awaiting live customs data for this sector.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Top Products Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${selectedRegion.activeColor}15`, color: selectedRegion.activeColor }}>
                      <Package size={16} />
                    </div>
                    High-Volume Categories
                  </h4>
                  <div className="space-y-3">
                    {displayTopProducts.map((p) => (
                      <div key={p} className="flex items-center gap-4 text-sm font-medium text-gray-800 bg-gray-50/50 border border-gray-100 p-3 rounded-xl">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${selectedRegion.activeColor}10`, color: selectedRegion.activeColor }}>
                          <Loader2 size={14} className="opacity-50" />
                        </div>
                        <span className="truncate">{p}</span>
                      </div>
                    ))}
                    {dynamicTopProducts.length === 0 && (
                      <div className="w-full text-center py-6">
                         <span className="text-sm font-medium text-gray-400 italic bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 inline-block">Populating active load manifests.</span>
                      </div>
                    )}
                  </div>
                </div>
                <Link
                  href="/products"
                  className="mt-8 flex items-center justify-center gap-2 text-sm font-bold bg-gray-50 py-4 rounded-xl transition-colors hover:bg-gray-100 group"
                  style={{ color: selectedRegion.activeColor }}
                >
                  View Complete Catalog <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Data Table Section */}
        <div ref={tableRef} className={`transition-all duration-1000 ${tableVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2 flex items-center gap-2">
                <Database size={14} /> Customs Data Ledger
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {selectedRegion ? `${selectedRegion.name} Log` : "Global Shipment Log"}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Real-Time Feed
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-sm text-left">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100">
                    <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-widest text-gray-400">Material / Product</th>
                    <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-widest text-gray-400">Destination</th>
                    <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-widest text-gray-400">Port of Entry</th>
                    <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-widest text-gray-400">Logistics</th>
                    <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-widest text-gray-400">Date Logged</th>
                    <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-widest text-gray-400">Volume</th>
                    <th className="px-6 py-5 text-xs font-extrabold uppercase tracking-widest text-gray-400">Origin Node</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loadingShipments ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-20 text-center">
                        <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-emerald-500" />
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Compiling Database...</p>
                      </td>
                    </tr>
                  ) : (selectedRegion ? regionalShipments : shipments).length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-20 text-center text-gray-400">
                         <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100"><Database size={24} className="text-gray-300" /></div>
                         <p className="font-medium text-gray-500">No verifiable shipments in current query window.</p>
                      </td>
                    </tr>
                  ) : (
                    (selectedRegion ? regionalShipments : shipments).map((s, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{s.product}</div>
                        </td>
                        <td className="px-6 py-5">
                           <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 uppercase tracking-wide">
                             <MapPin size={12} className="text-emerald-500" /> {s.destinationCountry}
                           </div>
                        </td>
                        <td className="px-6 py-5 text-gray-600 font-medium">{s.destinationPort}</td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600 border border-gray-200">
                            {s.mode?.toLowerCase().includes("air") ? <PlaneTakeoff size={13} className="text-blue-500" /> : s.mode?.toLowerCase().includes("sea") ? <Ship size={13} className="text-blue-500" /> : <Package size={13} className="text-gray-400" />}
                            {s.mode}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-gray-600 font-medium"><Calendar size={14} className="text-gray-400" /> {s.date}</div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="text-base font-extrabold text-gray-900">{s.quantity}</span> <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 ml-1 bg-emerald-50 px-2 py-1 rounded-md">{s.unit}</span>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                             <Anchor size={14} className="text-gray-400" />
                             <span className="truncate max-w-[150px]">{s.exportPort}</span>
                           </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white border-t border-gray-100 gap-4">
              <span className="text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                Log Page <span className="font-extrabold text-gray-900">{page}</span> of <span className="font-extrabold text-gray-900">{totalPages}</span>
              </span>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1 || loadingMore}
                  className="px-5 py-2.5 text-sm font-bold uppercase tracking-widest border border-gray-200 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-gray-700 shadow-sm hover:shadow active:scale-95"
                >
                  Prev
                </button>
                
                <div className="relative group">
                  <select 
                     value={page}
                     onChange={(e) => handlePageChange(Number(e.target.value))}
                     disabled={loadingMore}
                     className="appearance-none pl-5 pr-10 py-2.5 text-sm font-bold border border-gray-200 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm cursor-pointer transition-all"
                  >
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>Index {num}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-emerald-600">
                    <ChevronRight size={16} className="rotate-90 group-hover:translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <button 
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages || loadingMore}
                  className="px-5 py-2.5 text-sm font-bold uppercase tracking-widest border border-gray-200 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-gray-700 shadow-sm hover:shadow active:scale-95"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern CTA */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a1f0e]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
             <Globe size={32} className="text-emerald-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to integrate with our network?
          </h2>
          <p className="text-emerald-100/60 text-lg mb-8 max-w-2xl">
            Secure priority routing and bulk supply agreements by partnering with our international trade desks.
          </p>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 bg-white text-[#0a1f0e] font-extrabold px-10 py-5 rounded-full overflow-hidden transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-emerald-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 uppercase tracking-widest text-sm">Initiate Partnership</span> 
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

