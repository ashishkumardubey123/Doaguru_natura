'use client';

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight, ChevronLeft, ChevronRight,
  Heart, Brain, Activity, Pill, Globe2, FlaskConical,
  Shield, Award, Users, TrendingUp, Calendar, ExternalLink, MapPin, Loader2
} from "lucide-react";
import { mediaNewsArticles } from "../data/mediaNews";
import { therapyFilters, dosageFilters, therapyColorMap } from "@/utils/utils";
import { useProductContext } from "@/Context/ProductContext";

// API Imports (Aapke backend ke liye)
import { fetchAllShipments } from "@/app/api/fetchShipments";
import { fetchAllCountryCoordinates } from "@/app/utils/countryCoordinates";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ─── DATA ────────────────────────────────────────────────────────────────────
const heroSlides = [
  {
    id: 1,
    image: "/media/banner1.webp",
    tag: "Manufacturing Excellence",
    headline: "World-Class Pharmaceutical\nManufacturing for Global Markets",
    subtext: "WHO-GMP certified facilities producing 500+ formulations across 25 dosage forms, exported to 50+ countries.",
    cta: "Explore Manufacturing",
    ctaPath: "/manufacturing",
    ctaSecondary: "View Products",
    ctaSecondaryPath: "/products",
  },
  {
    id: 2,
    image: "/media/bannar2.jpg",
    tag: "Research & Development",
    headline: "Innovation-Driven R&D\nShaping Tomorrow's Medicines",
    subtext: "Our dedicated research centers develop life-saving formulations, with 120+ active molecules under development.",
    cta: "Our R&D Pipeline",
    ctaPath: "/manufacturing#rnd",
    ctaSecondary: "Partner With Us",
    ctaSecondaryPath: "/contact",
  },
  {
    id: 3,
    image: "/media/banner3.webp",
    tag: "Global Reach",
    headline: "Connecting Healthcare\nAcross 50+ Nations",
    subtext: "Robust supply chain infrastructure ensuring timely delivery of quality medicines to every corner of the globe.",
    cta: "Global Presence",
    ctaPath: "/global-presence",
    ctaSecondary: "Export Query",
    ctaSecondaryPath: "/contact",
  },
];

const stats = [
  { value: "50+", label: "Countries Served", icon: Globe2 },
  { value: "500+", label: "Product SKUs", icon: Pill },
  { value: "2025", label: "Registered", icon: Award },
  { value: "9+", label: "Categories", icon: Users },
  { value: "IEC", label: "Certified", icon: FlaskConical },
  { value: "GST", label: "Compliant", icon: TrendingUp },
];

const therapyDescriptions = {
  immunity:       "Spirulina, Shilajit, Ashwagandha and multi-herb formulations to strengthen immunity, energy and cellular health.",
  digestion:      "Ayurvedic syrups, granules and asavas for improved digestion, acidity, piles, constipation and gut wellness.",
  "joint-care":   "Herbal oils, vatis and gels for joint mobility, arthritis relief, muscle pain and anti-inflammatory support.",
  respiratory:    "Tulsi-based extracts, syrups and churnas for cough, cold, chest congestion and respiratory allergy relief.",
  "womens-health": "Ashoka, Shatavari and Lodhra formulations for hormonal balance, menstrual health and reproductive wellness.",
  "hair-skin":    "Neem, Sariva and Bhringraj-based oils and syrups for healthy skin, hair growth and blood purification.",
  cardiac:        "Herbal cardiac tonics with Arjuna, Ginger and Garlic blend for heart health, BP and breathlessness.",
  diabetic:       "Karela, Gurmar, Neem and Methi combinations for natural blood sugar management and pancreatic support.",
  liver:          "Hepato-protective tonics with Guduchi, Punarnava and Himsara for liver health, jaundice and detox.",
  "bone-health":  "Calcium and herbal tonic combining Ashwagandha, Shatavari and Shilajit for bone density and joint flexibility.",
  "oral-care":    "Traditional herbal manjan and oral care blends for strong teeth, healthy gums and fresh breath.",
  mental:         "Brahmi, Shankhpushpi and Ashwagandha formulations for memory, focus, stress and mental clarity.",
};

const HERO_ZOOM_MS = 8500;
const HERO_FADE_MS = 1600;

// ─── HERO SLIDER ──────────────────────────────────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);

  const goTo = (idx) => {
    if (idx === current) return;
    setPrevious(current);
    setCurrent(idx);
  };
  const prev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length);
  const next = () => goTo((current + 1) % heroSlides.length);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevious(current);
      setCurrent((current + 1) % heroSlides.length);
    }, HERO_ZOOM_MS);
    return () => clearTimeout(timer);
  }, [current]);

  useEffect(() => {
    if (previous === null) return undefined;
    const fadeTimer = setTimeout(() => setPrevious(null), HERO_FADE_MS);
    return () => clearTimeout(fadeTimer);
  }, [previous]);

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] md:h-[680px] overflow-hidden bg-[#020b06]">
      { heroSlides.map((s, i) => {
        const isCurrent = i === current;
        const isPrevious = i === previous;
        const imageStateClass = isCurrent ? "hero-slide-media-active" : isPrevious ? "hero-slide-media-exit" : "hero-slide-media-idle";

        return (
          <div
            key={ s.id }
            className="absolute inset-0 transition-opacity ease-in-out"
            style={ {
              opacity: isCurrent ? 1 : 0,
              transitionDuration: `${HERO_FADE_MS}ms`,
              willChange: "opacity",
              zIndex: isCurrent ? 2 : isPrevious ? 1 : 0,
            } }
          >
            <div className="hero-slide-media-wrapper w-full h-full relative overflow-hidden">
              <img
                decoding="async"
                src={ s.image }
                alt={ s.tag }
                className={ `hero-slide-media absolute inset-0 m-auto min-w-full min-h-full object-cover object-top w-full h-full ${imageStateClass}` }
                style={ { "--hero-zoom-duration": `${HERO_ZOOM_MS}ms` } }
              />
            </div>
            {/* Premium cinematic gradient overlay */}
            <div className="absolute inset-0" style={ { background: "linear-gradient(100deg, rgba(2,11,6,0.92) 0%, rgba(10,31,14,0.7) 45%, rgba(0,0,0,0.25) 100%)" } } />
            {/* Subtle dot grid overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          </div>
        );
      }) }

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 h-full flex items-center">
        <div className="relative w-full max-w-3xl min-h-[300px] sm:min-h-[360px] text-white">
          { heroSlides.map((s, i) => {
            const isCurrent = i === current;
            const isPrevious = i === previous;
            const contentStateClass = isCurrent ? "hero-slide-content-active" : isPrevious ? "hero-slide-content-exit" : "hero-slide-content-idle";

            return (
              <div
                key={ `content-${s.id}` }
                className={ `hero-slide-content absolute inset-0 flex flex-col justify-center ${contentStateClass}` }
                style={ {
                  transitionDuration: `${HERO_FADE_MS}ms`,
                  zIndex: isCurrent ? 2 : isPrevious ? 1 : 0,
                  pointerEvents: isCurrent ? "auto" : "none",
                } }
              >
                <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6 w-fit backdrop-blur-md shadow-lg" style={ { backgroundColor: "rgba(42,92,50,0.7)", border: "1px solid rgba(255,255,255,0.15)" } }>
                  { s.tag }
                </span>
                <h1 className="mb-4 sm:mb-6 leading-[1.1]" style={ { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 5.5vw, 3.8rem)", whiteSpace: "pre-line", letterSpacing: "-0.02em" } }>
                  { s.headline }
                </h1>
                <p className="hidden sm:block text-green-100/70 text-sm sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl font-light">
                  { s.subtext }
                </p>
                <div className="flex gap-3 sm:gap-4 flex-wrap">
                  <Link href={ s.ctaPath } className="inline-flex items-center gap-2.5 font-bold px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300 bg-white text-[#1a3c22] hover:bg-green-50 hover:shadow-xl hover:shadow-white/10 active:scale-95">
                    { s.cta } <ArrowRight size={ 16 } />
                  </Link>
                  <Link href={ s.ctaSecondaryPath } className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-full hover:border-white/60 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 active:scale-95">
                    { s.ctaSecondary }
                  </Link>
                </div>
              </div>
            );
          }) }
        </div>
      </div>

      {/* Premium slide controls */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 sm:gap-5 bg-black/20 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/10">
        <button onClick={ prev } className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all duration-300 active:scale-90" aria-label="Previous slide"><ChevronLeft size={ 16 } /></button>
        <div className="flex gap-2.5">
          { heroSlides.map((_, i) => (
            <button key={ i } onClick={ () => goTo(i) } className="rounded-full transition-all duration-500" style={ { width: i === current ? "28px" : "8px", height: "8px", backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.3)" } } aria-label={ `Go to slide ${i + 1}` } />
          )) }
        </div>
        <button onClick={ next } className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all duration-300 active:scale-90" aria-label="Next slide"><ChevronRight size={ 16 } /></button>
      </div>
    </div>
  );
}

// ─── DARK THEME MAP COMPONENT FOR HOME PAGE ──────────────────────────────────
function HomeDarkMap({ mapDots = [], isLoading }) {
  const [hoveredDot, setHoveredDot] = useState(null);

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      {/* Dark background grid pattern */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      {isLoading ? (
        <div className="z-10 flex flex-col items-center text-green-400">
          <Loader2 className="w-8 h-8 animate-spin mb-2" />
          <p className="text-sm font-medium">Syncing Global Data...</p>
        </div>
      ) : (
        <ComposableMap projectionConfig={{ scale: 140 }} className="w-full h-full p-2 z-10">
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => (
              <Geography 
                key={geo.rsmKey} 
                geography={geo} 
                fill="#1a3c22" // Dark Green map to match your UI
                stroke="#2A5C32" 
                strokeWidth={0.5} 
                style={{ default: { outline: "none" }, hover: { fill: "#234e2a", outline: "none" } }} 
              />
            ))}
          </Geographies>

          {mapDots.map((dot, index) => (
            <Marker 
              key={index} 
              coordinates={dot.coordinates}
              onMouseEnter={() => setHoveredDot(dot.name)}
              onMouseLeave={() => setHoveredDot(null)}
              style={{ cursor: "pointer" }}
            >
              {/* White glowing dots for dark theme */}
              <circle r={6} fill="#ffffff" opacity="0.3">
                <animate attributeName="r" from="3" to="10" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r={2.5} fill="#ffffff" />
              
              {hoveredDot === dot.name && (
                <text 
                  textAnchor="middle" 
                  y={-10} 
                  style={{ 
                    fontFamily: "system-ui", 
                    fill: "#ffffff", 
                    fontSize: "10px", 
                    fontWeight: "bold",
                    pointerEvents: "none",
                  }}
                >
                  {dot.name}
                </text>
              )}
            </Marker>
          ))}
        </ComposableMap>
      )}
    </div>
  );
}


// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  const { productsData } = useProductContext();
  const allProducts = productsData || [];


  // --- MAP DATA LOGIC ---
  const [shipments, setShipments] = useState([]);
  const [exporters, setExporters] = useState([]);
  const [dbCountries, setDbCountries] = useState([]);
  const [loadingDB, setLoadingDB] = useState(true);
  const [loadingShipments, setLoadingShipments] = useState(true);

  // 1. Database se saari 195 countries mangwana
  useEffect(() => {
    const loadCountries = async () => {
      const countriesData = await fetchAllCountryCoordinates(); 
      setDbCountries(countriesData);
      setLoadingDB(false);
    };
    loadCountries();
  }, []);

  // 2. Shipments Fetch karna (Sirf Home page par map match karne ke liye)
  useEffect(() => {
    const getShipmentsForMap = async () => {
      try {
        const data = await fetchAllShipments(1, 100); 
        if (data.success) {
          const mapped = data.data.map((row) => ({
            destinationCountry: row.country_of_destination,
          }));
          setShipments(mapped);
          
          const uniqueExporters = [...new Set(data.data.map(row => row.exporter_name).filter(Boolean))];
          setExporters(uniqueExporters);
        }
      } catch (error) {
        console.error("Error fetching shipments:", error);
      } finally {
        setLoadingShipments(false);
      }
    };
    getShipmentsForMap();
  }, []);

  // 3. Match Shipments with DB (Map dots calculation)
 const activeMapDots = useMemo(() => {
    if (!dbCountries || dbCountries.length === 0) return [];

    return dbCountries.map(country => ({
      name: country.country_name,
      coordinates: [parseFloat(country.longitude), parseFloat(country.latitude)]
    }));
  }, [dbCountries]);

  return (
    <div>
      <HeroSlider />

      {/* ── Stats Strip ── */}
      <div className="relative bg-[#020b06] py-8 sm:py-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d522a]/30 via-transparent to-transparent" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            { stats.map((s) => (
              <div key={ s.label } className="flex items-center gap-3 sm:gap-4 text-white group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#2A5C32]/30 transition-colors duration-300 shrink-0">
                  <s.icon size={ 20 } className="text-green-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold leading-tight tracking-tight" style={ { fontFamily: "'Montserrat', sans-serif" } }>{ s.value }</div>
                  <div className="text-[10px] sm:text-xs text-green-300/60 leading-tight uppercase tracking-wider font-semibold">{ s.label }</div>
                </div>
              </div>
            )) }
          </div>
        </div>
      </div>

      {/* ── Company Intro ── */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#fafcfa]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] bg-[#2A5C32]/10 text-[#2A5C32] px-4 py-2 rounded-full">About Natura</span>
              <h2 className="mt-6 mb-5 sm:mb-6 text-gray-900 leading-[1.1]" style={ { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", letterSpacing: "-0.02em" } }>
                25+ Years of Pharmaceutical<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2A5C32] to-emerald-600">Excellence & Trust</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm sm:text-[16px] font-light">
                Natura Health Care is a globally recognised pharmaceutical company specialising in the development, manufacturing, and export of high-quality medicines. With 8 WHO-GMP certified facilities and a portfolio spanning 500+ formulations, we serve healthcare systems in 50+ countries.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8 sm:mb-10 text-sm sm:text-[16px] font-light">
                Our mission is simple: to ensure that life-saving, quality medicines are accessible and affordable to patients across the world, from emerging markets in Africa to regulated markets in Europe and North America.
              </p>
              <div className="flex gap-4 sm:gap-5 flex-wrap">
                <Link href="/about" className="inline-flex items-center gap-2 text-white font-bold px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-full bg-[#1a3c22] transition-all duration-300 hover:bg-[#234e2a] hover:shadow-xl hover:shadow-[#2A5C32]/15 active:scale-95">
                  Our Story <ArrowRight size={ 16 } />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 font-bold px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-full border-2 text-[#2A5C32] border-[#2A5C32]/30 hover:border-[#2A5C32] hover:bg-[#2A5C32] hover:text-white transition-all duration-300 active:scale-95">
                  Partner With Us
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 mt-2 lg:mt-0">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden h-40 sm:h-48 md:h-56 group shadow-lg shadow-black/5">
                <img loading="lazy" decoding="async" src="/media/About1.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Lab" />
              </div>
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden h-40 sm:h-48 md:h-56 sm:mt-10 group shadow-lg shadow-black/5">
                <img loading="lazy" decoding="async" src="/media/about2.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Research" />
              </div>
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden h-40 sm:h-48 md:h-56 sm:-mt-6 group shadow-lg shadow-black/5">
                <img loading="lazy" decoding="async" src="/media/about3.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Manufacturing" />
              </div>
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden h-40 sm:h-48 md:h-56 group shadow-lg shadow-black/5">
                <img loading="lazy" decoding="async" src="/media/about4.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Quality" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Therapy Areas ── */}
      <section className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] bg-[#2A5C32]/10 text-[#2A5C32] px-4 py-2 rounded-full">Our Portfolio</span>
            <h2 className="mt-6 text-gray-900" style={ { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.8rem)", letterSpacing: "-0.02em" } }>
              Therapy Areas We Excel In
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 font-light">
              Our diverse therapeutic portfolio ensures we can address the most critical healthcare needs across multiple disease areas worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            { therapyFilters.map((f) => {
              const colors = therapyColorMap[f.id] ?? { bg: "#f0f7f1", text: "#2A5C32", dot: "#4caf50" };
              const count = allProducts.filter((p) => p.therapy === f.id).length;
              const desc = therapyDescriptions[f.id] ?? "";
              return (
                <div key={ f.id } className="rounded-3xl p-5 sm:p-6 border border-gray-100/80 hover:shadow-2xl hover:shadow-[#2A5C32]/8 transition-all duration-500 group bg-white">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300 ring-4 ring-white shadow-sm group-hover:shadow-md" style={ { backgroundColor: colors.bg } }>
                    <f.icon size={ 20 } style={ { color: colors.text } } className="group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="font-extrabold text-gray-900 mb-2 leading-snug tracking-tight" style={ { fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem" } }>{ f.label }</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-5 line-clamp-3 font-light">{ desc }</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-sm border border-black/5" style={ { backgroundColor: colors.bg, color: colors.text } }>{ count } Products</span>
                    <Link href={ `/products#${f.id}` } className="text-[11px] font-bold flex items-center gap-1 hover:gap-2 transition-all duration-300" style={ { color: colors.text } }>
                      Browse <ArrowRight size={ 12 } />
                    </Link>
                  </div>
                </div>
              );
            }) }
          </div>
          <div className="text-center mt-10 sm:mt-14">
            <Link href="/products" className="inline-flex items-center gap-2 font-bold px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base rounded-full border-2 border-[#2A5C32]/30 text-[#2A5C32] hover:border-[#2A5C32] hover:bg-[#2A5C32] hover:text-white transition-all duration-300 active:scale-95">
              View Full Portfolio <ArrowRight size={ 16 } />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#fafcfa] border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10 sm:mb-14">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] bg-[#2A5C32]/10 text-[#2A5C32] px-4 py-2 rounded-full">Our Products</span>
              <h2 className="mt-6 text-gray-900" style={ { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.8rem)", letterSpacing: "-0.02em" } }>
                Featured Formulations
              </h2>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-1.5 text-sm font-bold hover:gap-3 transition-all duration-300" style={ { color: "#2A5C32" } }>
              View All <ArrowRight size={ 15 } />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            { allProducts.filter((p) => p.image).slice(0, 4).map((product) => {
              const colors = therapyColorMap[product.therapy] ?? { bg: "#f0f7f1", text: "#2A5C32", dot: "#4caf50" };
              const TherapyIcon = therapyFilters.find((f) => f.id === product.therapy)?.icon;
              const dosageLabel = dosageFilters.find((f) => f.id === product.dosageForm)?.label ?? product.dosageForm;
              return (
                <div key={ product.id } className="group bg-white rounded-3xl border border-gray-100/80 overflow-hidden hover:shadow-2xl hover:shadow-[#2A5C32]/8 transition-all duration-500 flex flex-col">
                  { product.image ? (
                    <div className="relative h-40 sm:h-44 overflow-hidden shrink-0">
                      <img loading="lazy" src={ product.image } alt={ product.name } className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent pointer-events-none" />
                      { product.tag && <span className="absolute top-3 left-3 text-[10px] font-bold px-3 py-1.5 rounded-xl text-white shadow-sm backdrop-blur-md" style={{ backgroundColor: product.tagColor ?? "#2A5C32" }}>{ product.tag }</span> }
                    </div>
                  ) : (
                    <div className="h-40 sm:h-44 flex items-center justify-center relative" style={{ backgroundColor: colors.bg }}>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: colors.text + "18" }}>
                        { TherapyIcon && <TherapyIcon size={ 32 } style={{ color: colors.text }} /> }
                      </div>
                      { product.tag && <span className="absolute top-3 left-3 text-[10px] font-bold px-3 py-1.5 rounded-xl text-white" style={{ backgroundColor: product.tagColor ?? "#2A5C32" }}>{ product.tag }</span> }
                      <span className="absolute top-3 right-3 text-[10px] font-bold px-3 py-1.5 rounded-xl" style={{ backgroundColor: colors.text + "18", color: colors.text }}>
                        { dosageLabel.split("&")[0].trim() }
                      </span>
                    </div>
                  ) }
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h3 className="font-extrabold text-gray-900 mb-1 leading-snug group-hover:text-[#2A5C32] transition-colors text-sm sm:text-base tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>{ product.name }</h3>
                    <div className="text-[11px] text-gray-400 font-medium mb-2">{ product.genericName }</div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2 font-light">{ product.description }</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100/80">
                      <span className="text-[11px] text-gray-400 font-medium">Pack: <span className="font-bold text-gray-700">{ product.packaging }</span></span>
                      <Link href="/products" className="flex items-center gap-1 text-xs font-bold hover:gap-2 transition-all duration-300" style={{ color: colors.text }}>Details <ArrowRight size={ 12 } /></Link>
                    </div>
                  </div>
                </div>
              );
            }) }
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/products" className="inline-flex items-center gap-1 text-sm font-bold" style={ { color: "#2A5C32" } }>
              View All Products <ArrowRight size={ 15 } />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Global Presence ── */}
      <section className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] bg-[#2A5C32]/10 text-[#2A5C32] px-4 py-2 rounded-full">Worldwide Operations</span>
              <h2 className="mt-6 mb-5 sm:mb-6 text-gray-900 leading-[1.1]" style={ { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", letterSpacing: "-0.02em" } }>
                A Truly Global{ " " }
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2A5C32] to-emerald-600">Pharmaceutical Partner</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-10 sm:mb-12 text-sm sm:text-base lg:text-lg font-light">
                With strategic regional offices, a robust distribution network, and regulatory approvals across continents, Natura Health Care delivers quality medicines where they are needed most.
              </p>

              <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-12">
                { [
                  { region: "Asia-Pacific", count: "15+", desc: "India, China, Vietnam, Philippines, Indonesia, Thailand +9" },
                  { region: "Middle East & Africa", count: "20+", desc: "UAE, Saudi Arabia, Kenya, Nigeria, South Africa +15", active: true },
                  { region: "Europe", count: "8+", desc: "Germany, UK, France, Netherlands, Poland +3" },
                  { region: "Americas", count: "10+", desc: "USA, Brazil, Mexico, Colombia, Canada +5" },
                ].map((item, i) => (
                  <div key={ i } className={ `flex items-center justify-between p-5 sm:p-6 rounded-3xl border transition-all duration-300 ${item.active ? 'border-[#2A5C32]/30 bg-[#f0f7f1] shadow-lg shadow-[#2A5C32]/5' : 'border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:shadow-sm'}` }>
                    <div className="flex items-center gap-4 sm:gap-5">
                      <div className={ `w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-extrabold text-sm sm:text-base shrink-0 ${item.active ? 'bg-[#2A5C32] text-white shadow-md shadow-[#2A5C32]/30' : 'bg-[#1a3c22] text-white'}` }>
                        { item.count }
                      </div>
                      <div>
                        <h4 className={ `font-extrabold text-base sm:text-lg tracking-tight ${item.active ? 'text-[#2A5C32]' : 'text-gray-900'}` } style={{ fontFamily: "'Montserrat', sans-serif" }}>{ item.region }</h4>
                        <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 leading-snug font-light">{ item.desc }</p>
                      </div>
                    </div>
                    <MapPin size={ 18 } className={ `shrink-0 ml-2 ${item.active ? 'text-[#2A5C32]' : 'text-gray-300'}` } />
                  </div>
                )) }
              </div>

              <Link href="/global-presence" className="inline-flex items-center gap-2 text-white font-bold px-8 sm:px-10 py-4 sm:py-4.5 text-sm sm:text-base rounded-full transition-all duration-300 bg-[#1a3c22] hover:bg-[#234e2a] hover:shadow-xl hover:shadow-[#2A5C32]/15 active:scale-95">
                Explore Global Presence <ArrowRight size={ 17 } />
              </Link>
            </div>

            {/* DARK MAP CONTAINER */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-[#020b06] p-8 sm:p-10 lg:p-14 text-center shadow-2xl shadow-black/20 mt-2 lg:mt-0 border border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d522a]/20 via-transparent to-transparent" />
              <div className="text-green-400/80 text-xs font-extrabold uppercase tracking-[0.2em] mb-2 relative z-10">Global Network</div>
              <div className="text-white text-4xl sm:text-5xl font-extrabold mb-8 sm:mb-12 tracking-tight relative z-10" style={ { fontFamily: "'Montserrat', sans-serif" } }>50+ Countries</div>

              <div className="relative aspect-[4/3] bg-[#0a1f0e] rounded-3xl border border-white/5 overflow-hidden mb-6 sm:mb-8 flex items-center justify-center">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <HomeDarkMap mapDots={activeMapDots} isLoading={loadingDB || loadingShipments} />
              </div>

              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2.5 text-xs text-green-400/70 font-semibold px-2 relative z-10">
                { ["Americas", "Europe", "Middle East & Africa", "Asia-Pacific"].map((r) => (
                  <div key={ r } className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400/60 shadow-sm shadow-green-400/30" />
                    { r }
                  </div>
                )) }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Manufacturing Highlight ── */}
      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden bg-[#020b06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#1d522a]/30 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
            <div className="text-white">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] bg-emerald-400/10 text-emerald-400 px-4 py-2 rounded-full">Certifications</span>
              <h2 className="mt-6 mb-5 sm:mb-6 leading-[1.1]" style={ { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", letterSpacing: "-0.02em" } }>
                Globally Certified &amp; <br />Compliance-Ready
              </h2>
              <p className="text-green-100/60 leading-relaxed mb-4 max-w-lg text-sm sm:text-base lg:text-lg font-light">
                Natura Health Care holds internationally recognised certifications for the trading and export of Herbal Nutra &amp; Food Supplements — issued by{ " " }
                <span className="text-green-300 font-semibold">IPQ Management System</span>, accredited with{ " " }
                <span className="text-green-300 font-semibold">UKAF CERT LIMITED</span> (UK).
              </p>
              <p className="text-green-400/50 text-xs sm:text-sm mb-8 sm:mb-10 max-w-lg font-light">
                Issued: 18 Feb 2026 &nbsp;|&nbsp; Valid until: 17 Feb 2029<br />Surveillance audits: Feb 2027 &amp; Feb 2028
              </p>
              <Link href="/certifications" className="inline-flex items-center gap-2 text-[#1a3c22] font-bold px-8 sm:px-10 py-4 text-sm sm:text-base rounded-full transition-all duration-300 bg-white hover:bg-green-50 hover:shadow-xl hover:shadow-white/10 active:scale-95">
                View Our Certifications <ArrowRight size={ 17 } />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mt-4 lg:mt-0">
              { [
                { icon: Shield, label: "HACCP Certified", certNo: "HACCP-26021810", sub: "Hazard Analysis & Critical Control Points" },
                { icon: Award, label: "U.S. FDA Compliant", certNo: "FDA-26021809", sub: "FDA Regulatory Guideline Compliance" },
                { icon: FlaskConical, label: "HALAL Certified", certNo: "HALAL-26021811", sub: "Islamic Shariah Law — Lawful for Muslim Consumption" },
                { icon: Activity, label: "UKAF Accredited", certNo: "UKAF-CB-021", sub: "IPQ Management System, London UK" },
              ].map((item) => (
                <div key={ item.certNo } className="bg-white/[0.03] backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 group">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-400/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-emerald-400/20 transition-colors duration-300">
                    <item.icon size={ 20 } className="text-green-400" />
                  </div>
                  <div className="text-white font-extrabold text-sm sm:text-base mb-1.5 leading-snug tracking-tight" style={ { fontFamily: "'Montserrat', sans-serif" } }>{ item.label }</div>
                  <div className="text-green-100/40 text-[10px] sm:text-xs mb-3 leading-snug font-light">{ item.sub }</div>
                  <div className="text-green-400/60 text-[10px] sm:text-xs font-mono tracking-wider">{ item.certNo }</div>
                </div>
              )) }
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners Marquee ── */}
      <section className="py-14 sm:py-20 bg-[#fafcfa] overflow-hidden border-y border-gray-100/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 mb-8 sm:mb-10 text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] bg-[#2A5C32]/10 text-[#2A5C32] px-4 py-2 rounded-full">Our Network</span>
          <h3 className="mt-5 text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Trusted By Global Partners & Investors</h3>
        </div>
        {exporters.length > 0 && (
          <div className="relative flex overflow-x-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#fafcfa] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#fafcfa] to-transparent z-10 pointer-events-none" />
            <div className="animate-marquee whitespace-nowrap flex items-center gap-6 sm:gap-8 py-4">
              { [...exporters, ...exporters].map((partner, i) => (
                <div key={ i } className="w-44 sm:w-60 h-18 sm:h-24 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-lg hover:shadow-[#2A5C32]/5 flex items-center justify-center shrink-0 mx-3 sm:mx-4 px-4 transition-all duration-300">
                  <span className="text-sm font-bold text-gray-500 text-center line-clamp-2 whitespace-normal break-words" style={ { fontFamily: "'Montserrat', sans-serif" } } title={partner}>{ partner }</span>
                </div>
              )) }
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-6 sm:gap-8 py-4">
              { [...exporters, ...exporters].map((partner, i) => (
                <div key={ i } className="w-44 sm:w-60 h-18 sm:h-24 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-lg hover:shadow-[#2A5C32]/5 flex items-center justify-center shrink-0 mx-3 sm:mx-4 px-4 transition-all duration-300">
                  <span className="text-sm font-bold text-gray-500 text-center line-clamp-2 whitespace-normal break-words" style={ { fontFamily: "'Montserrat', sans-serif" } } title={partner}>{ partner }</span>
                </div>
              )) }
            </div>
          </div>
        )}
      </section>

      {/* ── Testimonials ── */}
      {/* <section className="py-14 sm:py-20 md:py-24 bg-[#fdfbf7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest" style={ { color: "#6B4226" } }>Testimonials</span>
            <h2 className="mt-3 text-gray-900" style={ { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)" } }>
              What Our Partners Say
            </h2>
          </div>
          <div className="flex md:grid md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0">
            { [
              { quote: "Natura Health Care has been an invaluable partner in our supply chain. Their commitment to quality and timely delivery is unmatched.", name: "Dr. Sarah Jenkins", role: "Director of Procurement, Global Health Network", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150" },
              { quote: "The regulatory support we received for market entry was exceptional. They navigated complex compliance requirements with ease.", name: "Michael Chen", role: "VP of Operations, APAC Pharma Dist.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150" },
              { quote: "Consistently high-quality products and a dedicated account management team make them our preferred supplier for critical care medicines.", name: "Elena Rodriguez", role: "Head of Pharmacy, Metro General Hospital", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150" }
            ].map((testimonial, i) => (
              <div key={ i } className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 relative snap-start shrink-0 w-[82vw] sm:w-[70vw] md:w-auto">
                <div className="text-[#2A5C32] opacity-20 absolute top-5 right-5 sm:top-6 sm:right-6">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L16.41 14.592C16.657 13.935 16.78 13.25 16.78 12.536V3H24V12.536C24 15.36 23.14 17.82 21.42 19.916C19.7 22.012 17.51 23.33 14.85 23.87L14.017 21ZM3.017 21L5.41 14.592C5.657 13.935 5.78 13.25 5.78 12.536V3H13V12.536C13 15.36 12.14 17.82 10.42 19.916C8.7 22.012 6.51 23.33 3.85 23.87L3.017 21Z" /></svg>
                </div>
                <p className="text-gray-600 italic mb-6 sm:mb-8 relative z-10 leading-relaxed text-sm sm:text-base">&ldquo;{ testimonial.quote }&rdquo;</p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <img loading="lazy" decoding="async" src={ testimonial.image } alt={ testimonial.name } className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm" style={ { fontFamily: "'Montserrat', sans-serif" } }>{ testimonial.name }</h4>
                    <p className="text-xs text-gray-500">{ testimonial.role }</p>
                  </div>
                </div>
              </div>
            )) }
          </div>
        </div>
      </section> */}

      {/* ── Latest News ── */}
      {/* <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={ { color: "#6B4226" } }>News & Updates</span>
              <h2 className="mt-3 text-gray-900" style={ { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)" } }>Latest from Natura</h2>
            </div>
            <Link href="/media#news" className="hidden md:flex items-center gap-1 text-sm font-semibold" style={ { color: "#2A5C32" } }>All News <ArrowRight size={ 15 } /></Link>
          </div>
          <div className="flex md:grid md:grid-cols-3 gap-5 sm:gap-6 md:gap-7 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0">
            { mediaNewsArticles.map((item, i) => (
              <article key={ i } className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 bg-white snap-start shrink-0 w-[82vw] sm:w-[70vw] md:w-auto">
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img loading="lazy" decoding="async" src={ item.image } alt={ item.title } className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-xs font-bold px-3 py-1 rounded-full text-white" style={ { backgroundColor: "#2A5C32" } }>{ item.category }</span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 sm:mb-3"><Calendar size={ 11 } /> { item.date }</div>
                  <h3 className="font-bold text-gray-900 mb-2 sm:mb-3 leading-snug group-hover:text-[#2A5C32] transition-colors text-sm sm:text-base" style={ { fontFamily: "'Montserrat', sans-serif" } }>{ item.title }</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-3 sm:mb-4">{ item.excerpt }</p>
                  <Link href="/media#news" className="flex items-center gap-1 text-sm font-semibold" style={ { color: "#2A5C32" } }>Read More <ExternalLink size={ 13 } /></Link>
                </div>
              </article>
            )) }
          </div>
        </div>
      </section> */}

      {/* ── Purpose Banner ── */}
      <section className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
            <div className="relative rounded-[2.5rem] overflow-hidden h-72 sm:h-96 md:h-[460px] group shadow-2xl shadow-black/10">
              <img loading="lazy" decoding="async" src="/media/OurPurpose.webp" alt="Patient care" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0" style={ { background: "linear-gradient(0deg, rgba(2,11,6,0.6) 0%, rgba(42,92,50,0.2) 40%, transparent 70%)" } } />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] bg-[#2A5C32]/10 text-[#2A5C32] px-4 py-2 rounded-full">Our Purpose</span>
              <h2 className="mt-6 mb-5 sm:mb-6 text-gray-900 leading-[1.1]" style={ { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", letterSpacing: "-0.02em" } }>
                &quot;Improving Lives Through<br /><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2A5C32] to-emerald-600">Accessible Medicine&quot;</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 sm:mb-6 text-sm sm:text-[16px] font-light">At the heart of everything we do is the patient. We believe that high-quality, affordable medicines should be accessible to everyone, regardless of geography or economic status.</p>
              <p className="text-gray-500 leading-relaxed mb-8 sm:mb-10 text-sm sm:text-[16px] font-light">By maintaining the highest quality standards while optimizing our cost structures, we ensure that our medicines reach the patients who need them most — in both developed and emerging markets.</p>
              <div className="flex gap-4 sm:gap-5 flex-wrap">
                <Link href="/contact" className="inline-flex items-center gap-2 text-white font-bold px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-full bg-[#1a3c22] transition-all duration-300 hover:bg-[#234e2a] hover:shadow-xl hover:shadow-[#2A5C32]/15 active:scale-95">Partner With Us <ArrowRight size={ 16 } /></Link>
                <Link href="/products" className="inline-flex items-center gap-2 font-bold px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-full border-2 border-[#2A5C32]/30 text-[#2A5C32] hover:border-[#2A5C32] hover:bg-[#2A5C32] hover:text-white transition-all duration-300 active:scale-95">Our Products</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-[#020b06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#1d522a]/40 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 text-center text-white relative z-10">
          <h2 className="mb-4 sm:mb-5" style={ { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 4.5vw, 3rem)", letterSpacing: "-0.02em" } }>Ready to Establish a Supply Partnership?</h2>
          <p className="text-green-100/50 mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-lg px-2 font-light leading-relaxed">Whether you&apos;re a healthcare distributor, import-export company, or institutional buyer — we have the capacity and portfolio to serve your needs.</p>
          <div className="flex justify-center gap-4 sm:gap-5 flex-wrap">
            <Link href="/contact" className="inline-flex items-center gap-2.5 bg-white text-[#1a3c22] font-bold px-8 sm:px-10 py-4 sm:py-4.5 text-sm sm:text-base rounded-full transition-all duration-300 hover:bg-green-50 hover:shadow-xl hover:shadow-white/10 active:scale-95">Start a Conversation <ArrowRight size={ 16 } /></Link>
            <Link href="/products" className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 sm:px-10 py-4 sm:py-4.5 text-sm sm:text-base rounded-full hover:border-white/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 active:scale-95">Browse Products</Link>
          </div>
        </div>
      </section>
    </div>
  );
}