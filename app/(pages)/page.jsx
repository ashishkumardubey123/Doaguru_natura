'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, ChevronLeft, ChevronRight,
  Heart, Brain, Activity, Pill, Globe2, FlaskConical,
  Shield, Award, Users, TrendingUp, Calendar, ExternalLink, MapPin
} from "lucide-react";

// â”€â”€â”€ DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1757578097654-fdae0f7cf008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440",
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
    image: "https://images.unsplash.com/photo-1576765608689-c0e8f69a46b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440",
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
    image: "https://images.unsplash.com/photo-1765206257996-9b4a5d886a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440",
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
  { value: "25+", label: "Years Experience", icon: Award },
  { value: "3,500+", label: "Employees Worldwide", icon: Users },
  { value: "8", label: "Manufacturing Plants", icon: FlaskConical },
  { value: "120+", label: "R&D Molecules", icon: TrendingUp },
];

const therapyAreas = [
  {
    icon: Heart,
    name: "Cardiology",
    desc: "Comprehensive cardiovascular portfolio including ACE inhibitors, beta-blockers, statins & anti-arrhythmics.",
    products: "80+ Products",
    color: "#e8f5e9",
    accent: "#2A5C32",
  },
  {
    icon: Brain,
    name: "Neurology & CNS",
    desc: "Epilepsy, Parkinson's, depression & anxiety management formulations developed with precision.",
    products: "65+ Products",
    color: "#f3e8ff",
    accent: "#7c3aed",
  },
  {
    icon: Activity,
    name: "Oncology",
    desc: "Targeted and supportive oncology therapies spanning oral chemo to injectables.",
    products: "40+ Products",
    color: "#fff3e8",
    accent: "#c2440c",
  },
  {
    icon: Pill,
    name: "Diabetes & Metabolism",
    desc: "Oral hypoglycaemics, insulin sensitizers & metabolic syndrome management solutions.",
    products: "55+ Products",
    color: "#e8f4ff",
    accent: "#1d6fa4",
  },
  {
    icon: Shield,
    name: "Anti-Infectives",
    desc: "Broad-spectrum antibiotics, antivirals & antifungals to combat emerging pathogens.",
    products: "70+ Products",
    color: "#e8fff0",
    accent: "#0f7a3c",
  },
  {
    icon: FlaskConical,
    name: "Gastroenterology",
    desc: "GI therapies including PPIs, antacids, bowel management & hepatology products.",
    products: "45+ Products",
    color: "#fef8e8",
    accent: "#92600a",
  },
];

const newsItems = [
  {
    date: "February 18, 2025",
    category: "Press Release",
    title: "Natura Health Care Receives WHO-GMP Certification for New Injectable Plant",
    excerpt: "Our third manufacturing facility in Gujarat has received WHO-GMP certification, expanding injectable production capacity by 40%.",
    image: "https://images.unsplash.com/photo-1581056771085-3ce30d907416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    date: "January 30, 2025",
    category: "Business News",
    title: "Strategic Partnership Signed with Regional Distributor Across 8 African Nations",
    excerpt: "This landmark agreement will bring affordable, quality medicines to an additional 200 million potential patients across Sub-Saharan Africa.",
    image: "https://images.unsplash.com/photo-1571645163064-77faa9676a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    date: "January 10, 2025",
    category: "R&D Update",
    title: "Phase III Trials Commence for Novel Cardiovascular Formulation NHC-CV401",
    excerpt: "Our flagship R&D program advances to Phase III clinical trials, targeting treatment-resistant hypertension patients.",
    image: "https://images.unsplash.com/photo-1766297246929-3b69ca8b175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

const certifications = [
  { name: "WHO-GMP", desc: "World Health Org." },
  { name: "ISO 9001", desc: "Quality Management" },
  { name: "USFDA", desc: "US Registration" },
  { name: "EU GMP", desc: "European Standards" },
  { name: "ISO 14001", desc: "Environmental" },
  { name: "PICS GMP", desc: "Intl. Cooperation" },
];

const featuredProducts = [
  {
    name: "Amlodipine Besylate Tablets USP",
    category: "Cardiology",
    dosage: "Tablets",
    strength: "5mg, 10mg",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Amoxicillin & Clavulanate Potassium",
    category: "Anti-Infectives",
    dosage: "Tablets",
    strength: "500mg/125mg, 875mg/125mg",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Pantoprazole Sodium Delayed-Release",
    category: "Gastroenterology",
    dosage: "Tablets",
    strength: "20mg, 40mg",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    name: "Metformin Hydrochloride ER",
    category: "Diabetes & Metabolism",
    dosage: "Tablets",
    strength: "500mg, 750mg, 1000mg",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

// â”€â”€â”€ HERO SLIDER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const goTo = (idx) => setCurrent(idx);
  const prev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length);
  const next = () => goTo((current + 1) % heroSlides.length);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const slide = heroSlides[current];

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gray-900">
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img loading="lazy" decoding="async" src={s.image} alt={s.tag} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
        </div>
      ))}

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{ backgroundColor: "rgba(42,92,50,0.8)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            {slide.tag}
          </span>
          <h1
            className="mb-5 leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.2rem)", whiteSpace: "pre-line" }}
          >
            {slide.headline}
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-xl">{slide.subtext}</p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href={slide.ctaPath}
              className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full transition-all duration-200 bg-[#2A5C32] text-white hover:bg-[#234e2a] hover:shadow-lg"
            >
              {slide.cta} <ArrowRight size={16} />
            </Link>
            <Link
              href={slide.ctaSecondaryPath}
              className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-semibold px-7 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition-all"
            >
              {slide.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
        <button onClick={prev} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all backdrop-blur-sm">
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all"
              style={{ width: i === current ? "24px" : "8px", height: "8px", backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.4)" }}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all backdrop-blur-sm">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

// â”€â”€â”€ MAIN PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Home() {
  return (
    <div>
      <HeroSlider />

      {/* Stats Strip */}
      <div style={{ backgroundColor: "#2A5C32" }} className="py-6">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3 text-white">
                <s.icon size={22} className="text-green-300 shrink-0" />
                <div>
                  <div className="text-xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.value}</div>
                  <div className="text-xs text-green-300">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>About Natura</span>
              <h2
                className="mt-3 mb-5 text-gray-900 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
              >
                25+ Years of Pharmaceutical<br />
                <span style={{ color: "#2A5C32" }}>Excellence & Trust</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Natura Health Care is a globally recognised pharmaceutical company specialising in the development, manufacturing, and export of high-quality medicines. With 8 WHO-GMP certified facilities and a portfolio spanning 500+ formulations, we serve healthcare systems in 50+ countries.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our mission is simple: to ensure that life-saving, quality medicines are accessible and affordable to patients across the world, from emerging markets in Africa to regulated markets in Europe and North America.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full bg-[#2A5C32] transition-all duration-200 hover:bg-[#234e2a] hover:shadow-lg"
                >
                  Our Story <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full border-2 text-[#2A5C32] border-[#2A5C32] hover:bg-[#2A5C32] hover:text-white transition-all duration-200"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden h-48">
                <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1581056771085-3ce30d907416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" className="w-full h-full object-cover" alt="Lab" />
              </div>
              <div className="rounded-2xl overflow-hidden h-48 mt-8">
                <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1576765608689-c0e8f69a46b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" className="w-full h-full object-cover" alt="Research" />
              </div>
              <div className="rounded-2xl overflow-hidden h-48 -mt-4">
                <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1766297246929-3b69ca8b175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" className="w-full h-full object-cover" alt="Manufacturing" />
              </div>
              <div className="rounded-2xl overflow-hidden h-48">
                <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1762439183787-54302c4dfb9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" className="w-full h-full object-cover" alt="Quality" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therapy Areas */}
      <section style={{ backgroundColor: "#f7f9f8" }} className="py-24">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>Our Portfolio</span>
            <h2
              className="mt-3 text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}
            >
              Therapy Areas We Excel In
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Our diverse therapeutic portfolio ensures we can address the most critical healthcare needs across multiple disease areas worldwide.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapyAreas.map((area) => (
              <div
                key={area.name}
                className="rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group bg-white"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: area.color }}
                >
                  <area.icon size={22} style={{ color: area.accent }} />
                </div>
                <h3
                  className="font-bold text-gray-900 mb-2 group-hover:transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.05rem" }}
                >
                  {area.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{area.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: area.color, color: area.accent }}>
                    {area.products}
                  </span>
                  <Link href="/products" className="text-xs font-semibold flex items-center gap-1" style={{ color: area.accent }}>
                    Browse <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-full border-2 border-[#2A5C32] text-[#2A5C32] hover:bg-[#2A5C32] hover:text-white transition-all duration-200"
            >
              View Full Portfolio <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>Our Products</span>
              <h2
                className="mt-3 text-gray-900"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}
              >
                Featured Formulations
              </h2>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-1 text-sm font-semibold" style={{ color: "#2A5C32" }}>
              View All Products <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <div key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 bg-gray-50 flex items-center justify-center p-6">
                  <img loading="lazy" decoding="async" src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#2A5C32" }}>
                    {product.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#2A5C32] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {product.name}
                  </h3>
                  <div className="flex flex-col gap-1 mb-4">
                    <div className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Dosage Form:</span> {product.dosage}</div>
                    <div className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Strength:</span> {product.strength}</div>
                  </div>
                  <Link href="/products" className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#2A5C32" }}>
                    View Details <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/products" className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "#2A5C32" }}>
              View All Products <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>



      {/* Global Presence Highlight */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>Worldwide Operations</span>
              <h2
                className="mt-3 mb-5 text-gray-900 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                A Truly Global <span style={{ color: "#2A5C32" }}>Pharmaceutical Partner</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                With strategic regional offices, a robust distribution network, and regulatory approvals across continents, Natura Health Care delivers quality medicines where they are needed most.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  { region: "Asia-Pacific", count: "15+", desc: "India, China, Vietnam, Philippines, Indonesia, Thailand +9" },
                  { region: "Middle East & Africa", count: "20+", desc: "UAE, Saudi Arabia, Kenya, Nigeria, South Africa +15", active: true },
                  { region: "Europe", count: "8+", desc: "Germany, UK, France, Netherlands, Poland +3" },
                  { region: "Americas", count: "10+", desc: "USA, Brazil, Mexico, Colombia, Canada +5" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${item.active ? 'border-[#2A5C32] bg-[#f0f7f1] shadow-sm' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${item.active ? 'bg-[#2A5C32] text-white' : 'bg-[#1a3c22] text-white'}`}>
                        {item.count}
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg ${item.active ? 'text-[#2A5C32]' : 'text-gray-900'}`}>{item.region}</h4>
                        <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                      </div>
                    </div>
                    <MapPin size={20} className={item.active ? 'text-[#2A5C32]' : 'text-gray-300'} />
                  </div>
                ))}
              </div>

              <Link
                href="/global-presence"
                className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 bg-[#1a3c22] hover:bg-[#234e2a] hover:shadow-lg"
              >
                Explore Global Presence <ArrowRight size={18} />
              </Link>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-[#1a3c22] p-8 lg:p-12 text-center shadow-2xl">
              <div className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">Global Network</div>
              <div className="text-white text-4xl font-bold mb-10" style={{ fontFamily: "'Montserrat', sans-serif" }}>50+ Countries</div>
              
              <div className="relative aspect-[4/3] bg-[#0f2415] rounded-2xl border border-white/10 overflow-hidden mb-8 flex items-center justify-center">
                {/* Abstract Map Representation */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                
                {/* Map Polygons (Simplified) */}
                <svg viewBox="0 0 400 200" className="w-full h-full opacity-60 drop-shadow-lg">
                  <path d="M 50 50 L 100 40 L 120 80 L 100 150 L 60 120 Z" fill="#2A5C32" />
                  <path d="M 150 30 L 220 20 L 250 60 L 200 140 L 160 100 Z" fill="#2A5C32" />
                  <path d="M 260 40 L 350 30 L 380 90 L 320 160 L 270 110 Z" fill="#2A5C32" />
                  <path d="M 180 120 L 240 110 L 260 160 L 200 180 Z" fill="#2A5C32" />
                </svg>

                {/* Map Points */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
                <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
                <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
              </div>

              <div className="flex justify-between text-xs text-green-400 font-medium px-4">
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> Americas</div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> Europe</div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> Middle East & Africa</div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> Asia-Pacific</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Highlight */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "#1a3c22" }}>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async"
            src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            alt="Manufacturing Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c22] via-[#1a3c22]/90 to-transparent"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <span className="text-xs font-bold uppercase tracking-widest text-green-400">Manufacturing & Quality</span>
              <h2
                className="mt-3 mb-5 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                GMP-Certified Plants Built<br />for Global Compliance
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg text-lg">
                8 WHO-GMP certified manufacturing facilities across India and Europe. USFDA inspected. EU GMP approved. Producing 500+ formulations with zero compromise on quality.
              </p>
              <Link
                href="/manufacturing"
                className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 bg-[#2A5C32] hover:bg-[#234e2a] hover:shadow-lg"
              >
                Explore Our Facilities <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {[
                { icon: Shield, label: "WHO-GMP Certified", sub: "All 8 facilities" },
                { icon: Award, label: "USFDA Inspected", sub: "3 plants registered" },
                { icon: FlaskConical, label: "R&D Investment", sub: "8% of revenue" },
                { icon: Activity, label: "Batch Pass Rate", sub: "99.8% first-pass" },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                  <item.icon size={24} className="text-green-400 mb-4" />
                  <div className="text-white font-bold text-lg mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.label}</div>
                  <div className="text-green-300 text-sm">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investors & Partners Marquee */}
      <section className="py-16 bg-white overflow-hidden border-y border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 mb-8 text-center">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Trusted By Global Partners & Investors</h3>
        </div>
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 py-4">
            {["Apex Capital", "Global Health Fund", "MediVentures", "BioPharma Partners", "Nexus Healthcare", "Summit Investments", "CureCapital", "LifeScience Group"].map((partner, i) => (
              <div key={i} className="w-56 h-24 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center shrink-0 mx-4">
                <span className="text-xl font-bold text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>{partner}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-8 py-4">
            {["Apex Capital", "Global Health Fund", "MediVentures", "BioPharma Partners", "Nexus Healthcare", "Summit Investments", "CureCapital", "LifeScience Group"].map((partner, i) => (
              <div key={i} className="w-56 h-24 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center shrink-0 mx-4">
                <span className="text-xl font-bold text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#fdfbf7]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>Testimonials</span>
            <h2
              className="mt-3 text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
            >
              What Our Partners Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Natura Health Care has been an invaluable partner in our supply chain. Their commitment to quality and timely delivery is unmatched.",
                name: "Dr. Sarah Jenkins",
                role: "Director of Procurement, Global Health Network",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150"
              },
              {
                quote: "The regulatory support we received for market entry was exceptional. They navigated complex compliance requirements with ease.",
                name: "Michael Chen",
                role: "VP of Operations, APAC Pharma Dist.",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150"
              },
              {
                quote: "Consistently high-quality products and a dedicated account management team make them our preferred supplier for critical care medicines.",
                name: "Elena Rodriguez",
                role: "Head of Pharmacy, Metro General Hospital",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=150"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
                <div className="text-[#2A5C32] opacity-20 absolute top-6 right-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.41 14.592C16.657 13.935 16.78 13.25 16.78 12.536V3H24V12.536C24 15.36 23.14 17.82 21.42 19.916C19.7 22.012 17.51 23.33 14.85 23.87L14.017 21ZM3.017 21L5.41 14.592C5.657 13.935 5.78 13.25 5.78 12.536V3H13V12.536C13 15.36 12.14 17.82 10.42 19.916C8.7 22.012 6.51 23.33 3.85 23.87L3.017 21Z" />
                  </svg>
                </div>
                <p className="text-gray-600 italic mb-8 relative z-10 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img loading="lazy" decoding="async" src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>News & Updates</span>
              <h2
                className="mt-3 text-gray-900"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}
              >
                Latest from Natura
              </h2>
            </div>
            <Link href="/media" className="hidden md:flex items-center gap-1 text-sm font-semibold" style={{ color: "#2A5C32" }}>
              All News <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {newsItems.map((item, i) => (
              <article
                key={i}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="relative h-48 overflow-hidden">
                  <img loading="lazy" decoding="async" src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: "#2A5C32" }}>
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Calendar size={12} /> {item.date}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#2A5C32] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.excerpt}</p>
                  <Link href="/media" className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#2A5C32" }}>
                    Read More <ExternalLink size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose Banner */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden h-[400px]">
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Patient care"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(42,92,50,0.5) 0%, transparent 60%)" }} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>Our Purpose</span>
              <h2
                className="mt-3 mb-5 text-gray-900 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
              >
                &quot;Improving Lives Through<br />
                <span style={{ color: "#2A5C32" }}>Accessible Medicine&quot;</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At the heart of everything we do is the patient. We believe that high-quality, affordable medicines should be accessible to everyone, regardless of geography or economic status.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                By maintaining the highest quality standards while optimizing our cost structures, we ensure that our medicines reach the patients who need them most â€” in both developed and emerging markets.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full bg-[#2A5C32] transition-all duration-200 hover:bg-[#234e2a] hover:shadow-lg"
                >
                  Partner With Us <ArrowRight size={16} />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full border-2 border-[#2A5C32] text-[#2A5C32] hover:bg-[#2A5C32] hover:text-white transition-all duration-200"
                >
                  Our Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #2A5C32 0%, #1a3c22 100%)" }}>
        <div className="max-w-[1440px] mx-auto px-6 text-center text-white">
          <h2
            className="mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Ready to Establish a Supply Partnership?
          </h2>
          <p className="text-green-200 mb-8 max-w-xl mx-auto">
            Whether you&apos;re a healthcare distributor, import-export company, or institutional buyer â€” we have the capacity and portfolio to serve your needs.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#2A5C32] font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-[#f0f7f1] hover:text-[#1f4b28] hover:shadow-lg"
            >
              Start a Conversation <ArrowRight size={16} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-semibold px-8 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
