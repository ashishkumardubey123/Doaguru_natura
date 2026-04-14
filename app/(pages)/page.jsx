'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

import {
  ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, // <-- ArrowUpRight add kiya
  Heart, Brain, Activity, Pill, Globe2, FlaskConical,
  Shield, Award, Users, TrendingUp, Calendar, ExternalLink, MapPin, Loader2
} from "lucide-react";
import { mediaNewsArticles } from "../data/mediaNews";
import { therapyColorMap } from "@/utils/utils";
import { useProductContext } from "@/Context/ProductContext";

// API Imports (Aapke backend ke liye)
import { fetchAllShipments } from "@/app/api/fetchShipments";
import { fetchAllCountryCoordinates } from "@/app/utils/countryCoordinates";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

   

/* ─── Utility: animate count up ───────────────────────────────────── */
function useCountUp(target, duration = 1200, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || target === 0) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return active ? value : target;
}

 function TherapyCard({ filter, count, desc, colorMap, index, featured = false }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const animCount = useCountUp(count, 900, hovered);
 
  const colors = colorMap[filter.id] ?? { bg: "#1a3d22", text: "#86efac", dot: "#4ade80", glow: "#22c55e" };
 
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
 
  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-[28px] overflow-hidden cursor-pointer
        transition-all duration-700 ease-out
        ${featured ? "sm:col-span-2 sm:row-span-1" : ""}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{
        transitionDelay: `${index * 80}ms`,
        background: "linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)",
        border: hovered
          ? `1px solid ${colors.glow}55`
          : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: hovered
          ? `0 0 0 1px ${colors.glow}22, 0 32px 64px -16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)`
          : "0 8px 32px -8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-6px) scale(1.005)" : "translateY(0) scale(1)",
        padding: featured ? "2rem 2rem" : "1.5rem",
      }}
    >
      {/* Ambient glow blob */}
      <div
        className="absolute pointer-events-none transition-all duration-700"
        style={{
          top: "-40%", right: "-20%",
          width: "70%", height: "70%",
          borderRadius: "50%",
          background: colors.glow,
          opacity: hovered ? 0.12 : 0.05,
          filter: "blur(48px)",
        }}
      />
 
      {/* Top shimmer line */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${colors.glow}66, transparent)`, opacity: hovered ? 1 : 0.4, transition: "opacity 0.5s" }} />
 
      {/* Decorative oversized background letter */}
      <div className="absolute right-3 bottom-2 select-none pointer-events-none leading-none font-black"
        style={{
          fontSize: featured ? "7rem" : "5.5rem",
          color: colors.glow,
          opacity: hovered ? 0.06 : 0.035,
          fontFamily: "'Montserrat', sans-serif",
          transition: "opacity 0.5s, transform 0.5s",
          transform: hovered ? "scale(1.08) rotate(-4deg)" : "scale(1) rotate(0deg)",
        }}
      >
        {filter.label?.[0] ?? "T"}
      </div>
 
      {/* Header row */}
      <div className="relative flex items-start justify-between mb-5 gap-3">
        {/* Icon box */}
        <div
          className="flex items-center justify-center rounded-2xl transition-all duration-500 ring-1"
          style={{
            width: featured ? 52 : 44,
            height: featured ? 52 : 44,
            background: `linear-gradient(135deg, ${colors.bg}dd, ${colors.bg}88)`,
            ringColor: `${colors.glow}33`,
            boxShadow: hovered ? `0 0 20px ${colors.glow}44` : "none",
            transition: "box-shadow 0.5s",
          }}
        >
          <filter.icon
            size={featured ? 22 : 18}
            style={{ color: colors.text, transition: "transform 0.4s", transform: hovered ? "scale(1.15) rotate(-6deg)" : "scale(1)" }}
          />
        </div>
 
        {/* Count badge */}
        <div
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black tracking-wide"
          style={{
            background: `${colors.bg}99`,
            color: colors.text,
            border: `1px solid ${colors.glow}33`,
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: colors.dot, boxShadow: `0 0 6px ${colors.dot}` }}
          />
          {animCount} Products
        </div>
      </div>
 
      {/* Title */}
      <h3
        className="font-black text-white leading-tight mb-2.5 tracking-tight"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: featured ? "1.2rem" : "1rem",
        }}
      >
        {filter.label}
      </h3>
 
      {/* Description */}
      <p
        className="leading-relaxed font-light mb-6"
        style={{
          color: "rgba(187, 247, 208, 0.65)",
          fontSize: "0.78rem",
          lineHeight: 1.7,
          display: "-webkit-box",
          WebkitLineClamp: featured ? 3 : 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {desc}
      </p>
 
      {/* CTA link */}
      <Link
        href={`/products#${filter.id}`}
        className="inline-flex items-center gap-1.5 text-xs font-bold rounded-full transition-all duration-300"
        style={{
          color: hovered ? "#fff" : colors.text,
          gap: hovered ? "8px" : "6px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        Explore Range
        <span
          className="inline-flex items-center justify-center rounded-full"
          style={{
            width: 22, height: 22,
            background: hovered ? colors.glow : `${colors.glow}33`,
            color: hovered ? "#072112" : colors.text,
            transition: "all 0.3s",
          }}
        >
          <ArrowRight size={11} />
        </span>
      </Link>
    </article>
  );
}

//  TherapySection component with enhanced visuals, animations and responsive design, showcasing therapy areas with dynamic data from context. 
 function TherapySection({ therapyFilters, allProducts, therapyColorMap, therapyDescriptions }) {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);
 
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setSectionVisible(true);
    }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);
 
  const totalProducts = allProducts?.length ?? 0;
  const totalTherapies = therapyFilters?.length ?? 0;
 
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #020d06 0%, #04150d 40%, #021008 100%)",
        padding: "6rem 0 7rem",
      }}
    >
      {/* ── Background canvas ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(42,92,50,0.4) 0%, transparent 70%)" }} />
 
        {/* Dot grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(134,239,172,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
 
        {/* Floating ambient orbs */}
        <div className="absolute animate-pulse"
          style={{ top: "-5%", left: "-8%", width: 400, height: 400, borderRadius: "50%", background: "rgba(34,197,94,0.12)", filter: "blur(80px)", animationDuration: "6s" }} />
        <div className="absolute animate-pulse"
          style={{ bottom: "-8%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "rgba(42,92,50,0.18)", filter: "blur(100px)", animationDuration: "8s", animationDelay: "2s" }} />
        <div className="absolute animate-pulse"
          style={{ top: "40%", left: "60%", width: 250, height: 250, borderRadius: "50%", background: "rgba(74,222,128,0.07)", filter: "blur(60px)", animationDuration: "10s", animationDelay: "1s" }} />
 
        {/* Decorative oversized text watermark */}
        <div className="absolute inset-0 flex items-center justify-center select-none"
          style={{
            fontSize: "clamp(6rem, 20vw, 18rem)",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            color: "rgba(134,239,172,0.018)",
            letterSpacing: "-0.05em",
            userSelect: "none",
          }}
        >
          HEALTH
        </div>
      </div>
 
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
 
        {/* ── Section Header ── */}
        <div
          className="mb-14 sm:mb-20"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Label pill */}
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] rounded-full"
              style={{
                background: "rgba(134,239,172,0.08)",
                border: "1px solid rgba(134,239,172,0.18)",
                color: "#86efac",
                padding: "8px 20px",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px #4ade80" }} />
              Our Portfolio
            </span>
          </div>
 
          {/* Heading */}
          <h2
            className="text-center text-white mb-5 leading-none tracking-tight"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Therapy Areas{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #4ade80 0%, #86efac 40%, #34d399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              We Excel In
            </span>
          </h2>
 
          {/* Subtitle */}
          <p
            className="text-center mx-auto max-w-xl leading-relaxed font-light"
            style={{ color: "rgba(187,247,208,0.6)", fontSize: "clamp(0.85rem, 2vw, 1rem)" }}
          >
            A diverse therapeutic portfolio addressing critical healthcare needs across multiple disease areas worldwide.
          </p>
 
          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {[
              { label: `${totalTherapies} Therapy Segments`, dot: "#4ade80" },
              { label: `${totalProducts} Portfolio Products`, dot: "#86efac" },
              { label: "Global Reach", dot: "#34d399" },
            ].map((stat, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 text-[11px] font-bold rounded-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#bbf7d0",
                  padding: "8px 16px",
                  backdropFilter: "blur(12px)",
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.6s ${0.3 + i * 0.1}s, transform 0.6s ${0.3 + i * 0.1}s`,
                }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: stat.dot, boxShadow: `0 0 6px ${stat.dot}88` }} />
                {stat.label}
              </div>
            ))}
          </div>
        </div>
 
        {/* ── Cards Grid ── */}
        {therapyFilters?.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
            style={{ gridAutoRows: "1fr" }}
          >
            {therapyFilters.map((f, index) => {
              const count = allProducts?.filter((p) => p.therapy === f.id).length ?? 0;
              const desc = therapyDescriptions?.[f.id] ?? "";
              return (
                <TherapyCard
                  key={`therapy-${f.id || `fallback-${index}`}`}
                  filter={f}
                  count={count}
                  desc={desc}
                  colorMap={therapyColorMap}
                  index={index}
                  featured={index === 0}
                />
              );
            })}
          </div>
        ) : (
          /* ── Loading skeleton ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-[28px] h-56 animate-pulse"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  animationDelay: `${i * 150}ms`,
                }}
              />
            ))}
          </div>
        )}
 
        {/* ── CTA button ── */}
        <div
          className="flex justify-center mt-14 sm:mt-16"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s 0.5s, transform 0.8s 0.5s",
          }}
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 font-black rounded-full transition-all duration-300 active:scale-95"
            style={{
              background: "#fff",
              color: "#072112",
              padding: "16px 36px",
              fontSize: "0.9rem",
              letterSpacing: "-0.01em",
              boxShadow: "0 0 0 0 rgba(74,222,128,0)",
              transition: "box-shadow 0.3s, background 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f0fdf4";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(74,222,128,0.25), 0 16px 40px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.boxShadow = "0 0 0 0 rgba(74,222,128,0)";
            }}
          >
            View Full Portfolio
            <span
              className="inline-flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: 30, height: 30,
                background: "#072112",
                color: "#4ade80",
              }}
            >
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}




// ─── DATA ────────────────────────────────────────────────────────────────────
const heroSlides = [
  {
    id: 1,
    image: "/media/banner1.jpeg",
    tag: "Quality Manufacturing",
    headline: "Pure, Consistent &\nReliable Product Manufacturing",
    subtext: "From sourcing to packaging, every batch is produced with strict quality checks, hygiene standards, and process consistency.",
    cta: "Explore Manufacturing",
    ctaPath: "/manufacturing",
    ctaSecondary: "View Products",
    ctaSecondaryPath: "/products",
  },
  {
    id: 2,
    image: "/media/WhatsApp_Image.jpeg",
    tag: "Product Portfolio",
    headline: "Wellness-Focused Formulations\nfor Everyday Healthcare",
    subtext: "A growing portfolio across immunity, digestion, joint care, respiratory and more, designed for modern health needs.",
    cta: "Browse Categories",
    ctaPath: "/products",
    ctaSecondary: "Partner With Us",
    ctaSecondaryPath: "/contact",
  },
  {
    id: 3,
    image: "/media/banner3.jpeg",
    tag: "Global Presence",
    headline: "Export-Ready Operations\nfor Worldwide Distribution",
    subtext: "Strong documentation, dependable logistics, and responsive support helping partners scale confidently across international markets.",
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
        <ComposableMap projectionConfig={{ scale: 155 }} className="w-full h-full p-1 sm:p-2 z-10">
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
  const { productsData, therapyFilters: contextTherapyFilters, dosageFilters: contextDosageFilters } = useProductContext();
  const allProducts = productsData || [];
  const therapyFilters = contextTherapyFilters;
  const dosageFilters = contextDosageFilters;


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
      <section className="py-16 sm:py-24 md:py-17 bg-[#fafcfa]">
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

    {/* ── NEW Animated Therapy Areas ── */}
      <TherapySection 
        therapyFilters={therapyFilters} 
        allProducts={allProducts} 
        therapyColorMap={therapyColorMap} 
        therapyDescriptions={therapyDescriptions} 
      />

      {/* ── Featured Products ── */}
      <section className="py-16 sm:py-24 md:pt-10 bg-[#fafcfa] border-t border-gray-100">
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
              const TherapyIcon = therapyFilters?.find((f) => f.id === product.therapy)?.icon;
              const dosageLabel = dosageFilters?.find((f) => f.id === product.dosageForm)?.label ?? product.dosageForm;
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
      <section className="py-16 sm:py-24 md:py-17 bg-white">
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

              <div className="relative aspect-[5/4] bg-[#0a1f0e] rounded-3xl border border-white/5 overflow-hidden mb-6 sm:mb-8 flex items-center justify-center">
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
      <section className="py-16 sm:py-24 md:py-30 relative overflow-hidden bg-[#020b06]">
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
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#fafcfa] via-white to-[#fafcfa] overflow-hidden border-y border-gray-100/80 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-[#2A5C32]/5 blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-emerald-100/40 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 mb-8 sm:mb-10 text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] bg-[#2A5C32]/10 text-[#2A5C32] px-4 py-2 rounded-full animate-fadeInUp">Our Network</span>
          <h3 className="mt-5 text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight animate-fadeInUp" style={{ fontFamily: "'Montserrat', sans-serif", animationDelay: '0.2s' }}>Trusted By Global Partners & Investors</h3>
        </div>
        {exporters.length > 0 && (
          <div className="relative flex overflow-x-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#fafcfa] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#fafcfa] to-transparent z-10 pointer-events-none" />
            <div className="animate-marquee whitespace-nowrap flex items-center gap-6 sm:gap-8 py-4">
              { [...exporters, ...exporters].map((partner, i) => (
                <div key={ i } className="group w-44 sm:w-60 h-18 sm:h-24 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:shadow-[#2A5C32]/10 hover:border-[#2A5C32]/20 flex items-center justify-center shrink-0 mx-3 sm:mx-4 px-4 transition-all duration-500 hover:scale-105 hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2A5C32]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#2A5C32]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs text-[#2A5C32] font-bold">✓</span>
                  </div>
                  <span className="text-sm font-bold text-gray-600 group-hover:text-[#2A5C32] text-center line-clamp-2 whitespace-normal break-words transition-colors duration-300 relative z-10" style={ { fontFamily: "'Montserrat', sans-serif" } } title={partner}>{ partner }</span>
                </div>
              )) }
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-6 sm:gap-8 py-4">
              { [...exporters, ...exporters].map((partner, i) => (
                <div key={ i } className="group w-44 sm:w-60 h-18 sm:h-24 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl hover:shadow-[#2A5C32]/10 hover:border-[#2A5C32]/20 flex items-center justify-center shrink-0 mx-3 sm:mx-4 px-4 transition-all duration-500 hover:scale-105 hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2A5C32]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#2A5C32]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs text-[#2A5C32] font-bold">✓</span>
                  </div>
                  <span className="text-sm font-bold text-gray-600 group-hover:text-[#2A5C32] text-center line-clamp-2 whitespace-normal break-words transition-colors duration-300 relative z-10" style={ { fontFamily: "'Montserrat', sans-serif" } } title={partner}>{ partner }</span>
                </div>
              )) }
            </div>
          </div>
        )}
      </section>

      {/* ── Testimonials ── */}
      

      {/* ── Latest News ── */}
     

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
