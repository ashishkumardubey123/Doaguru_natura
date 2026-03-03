'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronRight, Download, ExternalLink, Calendar,
  FileText, Image, TrendingUp, BarChart3, Users,
  Globe2, ArrowRight, Play, Camera, Newspaper, Filter,
  MapPin, Phone, Mail, X
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────
const sections = ["Annual Reports", "Press Releases", "Financial Results", "Image Gallery", "Media Contact"];

const hashToSection = {
  reports: "Annual Reports",
  press: "Press Releases",
  financials: "Financial Results",
  gallery: "Image Gallery",
  "media-contact": "Media Contact",
};

const sectionToHash = {
  "Annual Reports": "reports",
  "Press Releases": "press",
  "Financial Results": "financials",
  "Image Gallery": "gallery",
  "Media Contact": "media-contact",
};

const annualReports = [
  { year: "2024", title: "Annual Report 2023–24", desc: "Record revenue of USD 420M, driven by 28% export growth. Expansion into 8 new markets.", highlights: ["Revenue: USD 420M (+18% YoY)", "EBITDA Margin: 24.5%", "New Markets: 8", "R&D Spend: USD 33M"], size: "8.4 MB", pages: "156 pages", cover: "https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { year: "2023", title: "Annual Report 2022–23", desc: "Strategic pivot to regulated markets with 5 new USFDA ANDA approvals and EU GMP expansion.", highlights: ["Revenue: USD 356M (+14% YoY)", "EBITDA Margin: 22.8%", "ANDA Approvals: 5", "Export Share: 68%"], size: "7.1 MB", pages: "142 pages", cover: "https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { year: "2022", title: "Annual Report 2021–22", desc: "Post-pandemic resilience with accelerated capacity expansion and strong domestic + export growth.", highlights: ["Revenue: USD 312M (+21% YoY)", "EBITDA Margin: 21.2%", "New Plant: Unit III", "Headcount: 3,200+"], size: "6.8 MB", pages: "138 pages", cover: "https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { year: "2021", title: "Annual Report 2020–21", desc: "Resilience amid COVID-19. Pivoted manufacturing capacity to critical medicines for global supply chains.", highlights: ["Revenue: USD 258M (+8% YoY)", "COVID-19 Response", "New Certifications: 3", "WHO PQ: 4 products"], size: "5.9 MB", pages: "128 pages", cover: "https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
];

const pressReleases = [
  { date: "February 18, 2025", category: "Manufacturing", title: "Natura Health Care Receives WHO-GMP Certification for New Injectable Plant in Vadodara", excerpt: "The certification expands parenteral production capacity by 40%, strengthening the company's ability to supply critical injectables to regulated markets including the EU and Africa.", tag: "New" },
  { date: "January 30, 2025", category: "Business Development", title: "Strategic Distribution Agreement Signed for Sub-Saharan Africa Covering 8 Nations", excerpt: "A landmark 5-year exclusive distribution agreement will provide access to Natura Health Care's complete anti-infective and oncology range across Nigeria, Ghana, Kenya, and 5 other markets.", tag: "" },
  { date: "January 15, 2025", category: "R&D", title: "Phase III Clinical Trial Initiated for NHC-CV401 in Treatment-Resistant Hypertension", excerpt: "The multi-centre Phase III trial across 24 sites in India, Europe, and the UAE will enrol 850 patients over 18 months, with primary endpoint data expected in Q4 2026.", tag: "" },
  { date: "December 20, 2024", category: "Regulatory", title: "5 New ANDAs Approved by USFDA for Cardiovascular and Oncology Portfolio", excerpt: "The approvals add 5 new products to Natura's USFDA portfolio, bringing the total to 42 ANDAs, and enable immediate commercial launch in the US generics market.", tag: "" },
  { date: "November 12, 2024", category: "Corporate", title: "Natura Health Care Named in 'Top 50 Pharma Exporters' by Pharmexcil for 2024", excerpt: "The Pharmaceuticals Export Promotion Council of India recognised Natura among the top 50 pharmaceutical exporters for FY2023-24 based on export value and market diversification.", tag: "" },
  { date: "October 5, 2024", category: "Sustainability", title: "Company Achieves Carbon Neutrality for Manufacturing Operations in Gujarat", excerpt: "Through a combination of renewable energy adoption (solar + wind), waste reduction and carbon offsets, both Gujarat manufacturing units achieved net-zero carbon status.", tag: "" },
];

const financialResults = [
  { quarter: "Q3 FY2025", revenue: "USD 118M", growth: "+22%", ebitda: "27.2%", date: "January 2025" },
  { quarter: "Q2 FY2025", revenue: "USD 108M", growth: "+19%", ebitda: "25.8%", date: "October 2024" },
  { quarter: "Q1 FY2025", revenue: "USD 99M", growth: "+15%", ebitda: "24.1%", date: "July 2024" },
  { quarter: "Q4 FY2024", revenue: "USD 105M", growth: "+20%", ebitda: "26.3%", date: "April 2024" },
  { quarter: "Q3 FY2024", revenue: "USD 97M", growth: "+16%", ebitda: "23.9%", date: "January 2024" },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1757578097654-fdae0f7cf008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Manufacturing Unit I — Oral Solid Dosage Facility, Gujarat", cat: "Facilities" },
  { src: "https://images.unsplash.com/photo-1576765608689-c0e8f69a46b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Quality Control Laboratory — Natura Research Hub, Pune", cat: "R&D" },
  { src: "https://images.unsplash.com/photo-1581056771085-3ce30d907416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Analytical Testing — QC Release Laboratory", cat: "Quality" },
  { src: "https://images.unsplash.com/photo-1765206257996-9b4a5d886a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Global Export Operations — Supply Chain Team", cat: "Operations" },
  { src: "https://images.unsplash.com/photo-1766297246929-3b69ca8b175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "European Innovation Centre — Basel, Switzerland", cat: "R&D" },
  { src: "https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Patient-Centric Healthcare Programmes — Community Outreach", cat: "People" },
  { src: "https://images.unsplash.com/photo-1571645163064-77faa9676a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Annual Investor Summit 2024 — Zurich", cat: "Events" },
  { src: "https://images.unsplash.com/photo-1762439183787-54302c4dfb9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Natura Health Care Global Headquarters — Basel", cat: "Corporate" },
];

// ─── INVESTORS PAGE ────────────────────────────────────────────────────────
export default function Investors() {
  const [activeSection, setActiveSection] = useState("Annual Reports");
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [lightboxImg, setLightboxImg] = useState(null);

  const galleryCats = ["All", "Facilities", "R&D", "Quality", "Operations", "People", "Events", "Corporate"];
  const filteredGallery = galleryFilter === "All" ? galleryImages : galleryImages.filter((g) => g.cat === galleryFilter);

  const scrollToSection = (hash, behavior = "smooth") => {
    const target = document.getElementById(hash);
    if (!target) return;

    const offset = 92;
    const y = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior });
  };

  const handleSectionTabClick = (section) => {
    setActiveSection(section);
    const hash = sectionToHash[section];
    if (!hash) return;

    if (window.location.hash !== `#${hash}`) {
      window.history.replaceState(null, "", `#${hash}`);
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToSection(hash));
    });
  };

  useEffect(() => {
    const applyHashSection = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const section = hashToSection[hash];
      if (!section) return;

      setActiveSection(section);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToSection(hash));
      });
    };

    applyHashSection();
    window.addEventListener("hashchange", applyHashSection);
    return () => window.removeEventListener("hashchange", applyHashSection);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen" style={ { fontFamily: "'Inter', sans-serif" } }>
      {/* Hero Section */ }
      <div className="relative bg-[#1a3c22] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async"
            src="https://images.unsplash.com/photo-1571645163064-77faa9676a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            alt="Investors Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c22] via-[#1a3c22]/90 to-[#1a3c22]/40"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-green-300 text-sm mb-6 font-medium tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={ 14 } />
            <span className="text-white">Investors & Media</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm" style={ { fontFamily: "'Montserrat', sans-serif" } }>
            Investors & Media Centre
          </h1>
          <p className="text-green-50 max-w-xl text-lg md:text-xl leading-relaxed font-light">
            Financial results, annual reports, press releases, and media resources for analysts, investors, and journalists.
          </p>
        </div>
      </div>

      {/* KPI Strip */ }
      <div className="bg-white border-b border-gray-100 shadow-sm relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-gray-100">
            { [
              { icon: TrendingUp, label: "Revenue FY2024", value: "USD 420M", delta: "+18% YoY" },
              { icon: BarChart3, label: "EBITDA Margin", value: "24.5%", delta: "+1.7pp YoY" },
              { icon: Globe2, label: "Export Share", value: "72%", delta: "+4pp YoY" },
              { icon: Users, label: "Employees", value: "3,500+", delta: "+12% YoY" },
            ].map((k, index) => (
              <div key={ k.label } className={ `px-2 md:px-6 py-2 group ${index !== 0 && index !== 2 ? "border-l border-gray-100 md:border-0" : ""} ${index > 1 ? "mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-100 md:border-t-0" : ""}` }>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 group-hover:text-[#2A5C32] transition-colors">
                  <k.icon size={ 14 } />
                  { k.label }
                </div>
                <div className="font-black text-2xl md:text-3xl text-gray-900 mb-1" style={ { fontFamily: "'Montserrat', sans-serif" } }>{ k.value }</div>
                <div className="text-sm font-bold text-green-600 bg-green-50 inline-block px-2 py-0.5 rounded-md">{ k.delta }</div>
              </div>
            )) }
          </div>
        </div>
      </div>

      {/* Section Tabs - Sticky */ }
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hide scrollbar classes added to container */ }
          <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide" style={ { msOverflowStyle: 'none', scrollbarWidth: 'none' } }>
            <style jsx>{ `
              .scrollbar-hide::-webkit-scrollbar {
                  display: none;
              }
            `}</style>

            { sections.map((s) => (
              <button
                key={ s }
                onClick={ () => handleSectionTabClick(s) }
                className={ `flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${activeSection === s
                  ? "bg-[#2A5C32] text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }` }
                style={ activeSection === s ? { color: "#ffffff" } : {} }
              >
                { s === "Annual Reports" && <FileText size={ 16 } /> }
                { s === "Press Releases" && <Newspaper size={ 16 } /> }
                { s === "Financial Results" && <BarChart3 size={ 16 } /> }
                { s === "Image Gallery" && <Camera size={ 16 } /> }
                { s === "Media Contact" && <Users size={ 16 } /> }
                { s }
              </button>
            )) }
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* ─── ANNUAL REPORTS ─── */ }
        { activeSection === "Annual Reports" && (
          <div id="reports" className="scroll-mt-32 animate-in fade-in duration-500">
            <div className="mb-8">
              <h2 className="font-extrabold text-3xl text-gray-900" style={ { fontFamily: "'Montserrat', sans-serif" } }>Annual Reports</h2>
              <p className="text-gray-500 text-base mt-2">Comprehensive yearly performance summaries and audited financial statements.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              { annualReports.map((report) => (
                <div
                  key={ report.year }
                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group h-full flex flex-col"
                >
                  {/* Cover */ }
                  <div className="relative h-48 overflow-hidden">
                    <img loading="lazy" decoding="async" src={ report.cover } alt={ report.title } className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A5C32]/90 via-[#2A5C32]/40 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <div className="text-3xl font-black text-white drop-shadow-md" style={ { fontFamily: "'Montserrat', sans-serif" } }>FY{ report.year }</div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-[#2A5C32] transition-colors" style={ { fontFamily: "'Montserrat', sans-serif" } }>{ report.title }</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{ report.desc }</p>

                    {/* Highlights */ }
                    <div className="space-y-2 mb-6 bg-gray-50 p-4 rounded-xl">
                      { report.highlights.map((h) => (
                        <div key={ h } className="flex items-start gap-2 text-xs font-medium text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2A5C32] shrink-0 mt-1" />
                          { h }
                        </div>
                      )) }
                    </div>

                    {/* Bottom Action (Sticks to bottom due to flex-1 above) */ }
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-4 px-1">
                        <span>{ report.pages }</span>
                        <span>PDF { report.size }</span>
                      </div>

                      <button
                        className="w-full flex items-center justify-center gap-2 bg-[#2A5C32] hover:bg-[#1a3c22] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
                        style={ { color: "#ffffff" } } // Forced inline color to prevent CSS overrides
                      >
                        <Download size={ 16 } /> Download Report
                      </button>
                    </div>
                  </div>
                </div>
              )) }
            </div>

            {/* Corporate Presentations */ }
            <div className="mt-16 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-extrabold text-2xl text-gray-900 mb-6" style={ { fontFamily: "'Montserrat', sans-serif" } }>Investor Presentations & Documents</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                { [
                  { name: "Corporate Presentation Q3 FY25", size: "3.2 MB", date: "Jan 2025", icon: FileText },
                  { name: "Analyst Day 2024 Presentation", size: "5.8 MB", date: "Nov 2024", icon: BarChart3 },
                  { name: "ESG & Sustainability Report 2024", size: "4.1 MB", date: "Sep 2024", icon: Globe2 },
                  { name: "Product Portfolio Overview", size: "2.7 MB", date: "Dec 2024", icon: FileText },
                  { name: "Manufacturing Capability Deck", size: "6.3 MB", date: "Oct 2024", icon: FileText },
                  { name: "AGM Notice & Proceedings 2024", size: "1.8 MB", date: "Aug 2024", icon: Users },
                ].map((doc) => (
                  <div key={ doc.name } className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 hover:bg-[#f0f7f1] hover:shadow-md transition-all group border border-transparent hover:border-[#2A5C32]/20 cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:bg-[#2A5C32] transition-colors duration-300">
                      <doc.icon size={ 20 } className="text-[#2A5C32] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 text-sm truncate mb-1 group-hover:text-[#2A5C32] transition-colors">{ doc.name }</div>
                      <div className="text-xs font-medium text-gray-500">{ doc.date } • { doc.size }</div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#2A5C32] transition-colors shrink-0">
                      <Download size={ 14 } />
                    </button>
                  </div>
                )) }
              </div>
            </div>
          </div>
        ) }

        {/* ─── PRESS RELEASES ─── */ }
        { activeSection === "Press Releases" && (
          <div id="press" className="scroll-mt-32 animate-in fade-in duration-500 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="font-extrabold text-3xl text-gray-900" style={ { fontFamily: "'Montserrat', sans-serif" } }>Press Releases</h2>
                <p className="text-gray-500 text-base mt-2">Official company announcements and media statements.</p>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm shrink-0">
                <Filter size={ 16 } className="text-gray-400" />
                <select className="text-sm font-semibold bg-transparent text-gray-700 focus:outline-none cursor-pointer">
                  <option>All Categories</option>
                  <option>Manufacturing</option>
                  <option>R&D</option>
                  <option>Business Development</option>
                  <option>Regulatory</option>
                  <option>Corporate</option>
                  <option>Sustainability</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              { pressReleases.map((pr, i) => (
                <div
                  key={ i }
                  className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col md:flex-row gap-6"
                >
                  {/* Date Block */ }
                  <div className="shrink-0 flex md:flex-col items-center justify-center bg-[#f0f7f1] rounded-2xl p-4 md:w-24 md:h-24 group-hover:bg-[#2A5C32] transition-colors duration-300 gap-2 md:gap-0">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-green-100 transition-colors">{ pr.date.split(" ")[0].slice(0, 3) }</div>
                    <div className="text-2xl md:text-3xl font-black text-[#2A5C32] group-hover:text-white transition-colors" style={ { fontFamily: "'Montserrat', sans-serif" } }>
                      { pr.date.split(" ")[1].replace(",", "") }
                    </div>
                    <div className="text-xs font-bold text-gray-500 group-hover:text-green-100 transition-colors">{ pr.date.split(" ")[2] }</div>
                  </div>

                  {/* Content Block */ }
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600">{ pr.category }</span>
                      { pr.tag && <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#6B4226] text-white shadow-sm">{ pr.tag }</span> }
                    </div>
                    <h3 className="font-extrabold text-lg md:text-xl text-gray-900 mb-3 group-hover:text-[#2A5C32] transition-colors leading-tight" style={ { fontFamily: "'Montserrat', sans-serif" } }>
                      { pr.title }
                    </h3>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-5">{ pr.excerpt }</p>

                    <div className="flex items-center justify-between mt-auto">
                      <button
                        className="flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all active:scale-95"
                        style={ { color: "#2A5C32" } } // Forced inline color
                      >
                        Read Full Release <ArrowRight size={ 16 } />
                      </button>

                      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 hover:bg-[#2A5C32] hover:text-white transition-all shadow-sm active:scale-95">
                        <Download size={ 16 } />
                      </button>
                    </div>
                  </div>
                </div>
              )) }
            </div>

            <div className="mt-10 text-center">
              <button className="px-8 py-3.5 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:border-[#2A5C32] hover:text-[#2A5C32] transition-all active:scale-95">
                Load Older Releases
              </button>
            </div>
          </div>
        ) }

        {/* ─── FINANCIAL RESULTS ─── */ }
        { activeSection === "Financial Results" && (
          <div id="financials" className="scroll-mt-32 animate-in fade-in duration-500">
            <div className="mb-8">
              <h2 className="font-extrabold text-3xl text-gray-900 mb-2" style={ { fontFamily: "'Montserrat', sans-serif" } }>Financial Results</h2>
              <p className="text-gray-500 text-base">Quarterly and annual financial performance data for analysts and investors.</p>
            </div>

            {/* Revenue trend visual */ }
            <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-10 mb-10 shadow-lg shadow-gray-100/50">
              <h3 className="font-extrabold text-xl text-gray-800 mb-8" style={ { fontFamily: "'Montserrat', sans-serif" } }>Revenue Growth Trajectory (Last 5 Years)</h3>
              <div className="flex items-end gap-2 md:gap-6 h-56 md:h-64">
                { [
                  { year: "FY21", value: 258, pct: 55 },
                  { year: "FY22", value: 312, pct: 66 },
                  { year: "FY23", value: 356, pct: 76 },
                  { year: "FY24", value: 420, pct: 90 },
                  { year: "FY25E", value: 510, pct: 100 },
                ].map((d) => (
                  <div key={ d.year } className="flex-1 flex flex-col items-center gap-3 group">
                    <div className="text-xs md:text-sm font-black text-gray-700 bg-gray-50 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100">
                      ${ d.value }M
                    </div>
                    <div
                      className="w-full max-w-[80px] rounded-t-xl transition-all duration-700 ease-out hover:brightness-110"
                      style={ {
                        height: `${d.pct}%`,
                        backgroundColor: d.year === "FY24" ? "#2A5C32" : d.year === "FY25E" ? "#6B4226" : "#c8e6c9"
                      } }
                    />
                    <div className="text-xs md:text-sm text-gray-500 font-bold">{ d.year }</div>
                  </div>
                )) }
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8 pt-6 border-t border-gray-100 text-sm font-semibold text-gray-600">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-md bg-[#c8e6c9]" /> Historical Data</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-md bg-[#2A5C32]" /> FY2024 (Full Year)</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-md bg-[#6B4226]" /> FY2025 (Projected)</div>
              </div>
            </div>

            {/* Quarterly results table */ }
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 bg-[#f0f7f1] flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-[#2A5C32]" style={ { fontFamily: "'Montserrat', sans-serif" } }>Quarterly Earnings Data</h3>
                <button className="text-sm font-bold text-[#2A5C32] hover:underline flex items-center gap-1"><Download size={ 14 } /> Download All as ZIP</button>
              </div>

              {/* Responsive Table Wrapper */ }
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      { ["Quarter", "Revenue", "YoY Growth", "EBITDA Margin", "Date Published", "Action"].map((h) => (
                        <th key={ h } className="text-left px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-gray-500 whitespace-nowrap">{ h }</th>
                      )) }
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    { financialResults.map((r, i) => (
                      <tr key={ i } className="hover:bg-[#f0f7f1]/50 transition-colors">
                        <td className="px-6 py-5 font-bold text-gray-900 whitespace-nowrap">{ r.quarter }</td>
                        <td className="px-6 py-5 font-black text-gray-900 whitespace-nowrap">{ r.revenue }</td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 font-bold px-2.5 py-1 rounded-lg">
                            <TrendingUp size={ 14 } /> { r.growth }
                          </span>
                        </td>
                        <td className="px-6 py-5 font-semibold text-gray-700 whitespace-nowrap">{ r.ebitda }</td>
                        <td className="px-6 py-5 text-gray-500 whitespace-nowrap">{ r.date }</td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <button
                            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#f0f7f1] hover:bg-[#2A5C32] text-[#2A5C32] hover:text-white font-bold rounded-xl transition-colors active:scale-95"
                          >
                            <Download size={ 14 } /> PDF
                          </button>
                        </td>
                      </tr>
                    )) }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) }

        {/* ─── IMAGE GALLERY ─── */ }
        { activeSection === "Image Gallery" && (
          <div id="gallery" className="scroll-mt-32 animate-in fade-in duration-500">
            <div className="mb-8">
              <h2 className="font-extrabold text-3xl text-gray-900 mb-2" style={ { fontFamily: "'Montserrat', sans-serif" } }>Corporate Image Gallery</h2>
              <p className="text-gray-500 text-base">Official high-resolution photography for media use. Free to download for editorial purposes.</p>
            </div>

            {/* Category Filter */ }
            <div className="flex gap-2 flex-wrap mb-10 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm inline-flex">
              { galleryCats.map((cat) => (
                <button
                  key={ cat }
                  onClick={ () => setGalleryFilter(cat) }
                  className={ `text-sm px-5 py-2.5 rounded-xl font-bold transition-all active:scale-95 ${galleryFilter === cat
                    ? "bg-[#2A5C32] shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-gray-100"
                    }` }
                  style={ galleryFilter === cat ? { color: "#ffffff" } : {} }
                >
                  { cat }
                </button>
              )) }
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              { filteredGallery.map((img, i) => (
                <div
                  key={ i }
                  className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[4/3] bg-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  onClick={ () => setLightboxImg(img.src) }
                >
                  <img loading="lazy" decoding="async" src={ img.src } alt={ img.caption } className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                  {/* Overlay */ }
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center z-10">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3 translate-y-4 group-hover:translate-y-0">
                      <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-[#2A5C32] hover:text-white transition-colors shadow-lg" onClick={ (e) => { e.stopPropagation(); /* Download logic here */ } }>
                        <Download size={ 18 } />
                      </button>
                    </div>
                  </div>

                  {/* Caption */ }
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5 pt-12 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="inline-block px-2.5 py-1 bg-[#2A5C32] text-white text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">{ img.cat }</div>
                    <p className="text-xs text-gray-200 font-medium leading-relaxed">{ img.caption }</p>
                  </div>
                </div>
              )) }
            </div>
          </div>
        ) }

        {/* ─── MEDIA CONTACT ─── */ }
        { activeSection === "Media Contact" && (
          <div id="media-contact" className="max-w-4xl mx-auto scroll-mt-32 animate-in fade-in duration-500">
            <div className="mb-10 text-center md:text-left">
              <h2 className="font-extrabold text-3xl text-gray-900 mb-2" style={ { fontFamily: "'Montserrat', sans-serif" } }>Media & PR Contacts</h2>
              <p className="text-gray-500 text-base">For media enquiries, interview requests, and editorial resources, please contact our global communications team.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              { [
                { name: "Sarah Mitchell", title: "Head of Global Communications", region: "Global / Europe", email: "s.mitchell@naturahealthcare.com", phone: "+41 44 123 4570", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" },
                { name: "Rahul Khanna", title: "VP — Investor Relations", region: "Asia-Pacific / Emerging Markets", email: "r.khanna@naturahealthcare.com", phone: "+91 22 4567 8902", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" },
              ].map((contact) => (
                <div key={ contact.name } className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-5 border-4 border-gray-50 shadow-sm">
                    <img loading="lazy" decoding="async" src={ contact.image } alt={ contact.name } className="w-full h-full object-cover" />
                  </div>

                  <div className="mb-6 w-full pb-6 border-b border-gray-100">
                    <div className="font-extrabold text-xl text-gray-900 mb-1" style={ { fontFamily: "'Montserrat', sans-serif" } }>{ contact.name }</div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">{ contact.title }</div>
                    <div className="inline-block px-3 py-1 bg-[#f0f7f1] text-[#2A5C32] text-xs font-bold rounded-lg">{ contact.region }</div>
                  </div>

                  <div className="space-y-3 w-full">
                    <a href={ `mailto:${contact.email}` } className="flex items-center justify-center md:justify-start gap-3 text-sm font-medium text-gray-600 hover:text-[#2A5C32] p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#2A5C32] group-hover:text-white transition-colors">
                        <Mail size={ 14 } />
                      </div>
                      <span className="truncate">{ contact.email }</span>
                    </a>
                    <a href={ `tel:${contact.phone.replace(/\s+/g, '')}` } className="flex items-center justify-center md:justify-start gap-3 text-sm font-medium text-gray-600 hover:text-[#2A5C32] p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#2A5C32] group-hover:text-white transition-colors">
                        <Phone size={ 14 } />
                      </div>
                      { contact.phone }
                    </a>
                  </div>
                </div>
              )) }
            </div>

            <div className="bg-gradient-to-br from-[#1a3c22] to-[#2A5C32] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-700"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div className="max-w-xl">
                  <h3 className="font-extrabold text-3xl mb-3 drop-shadow-sm" style={ { fontFamily: "'Montserrat', sans-serif" } }>Media Kit Request</h3>
                  <p className="text-green-100 text-base leading-relaxed">
                    Journalists and analysts can request our complete media kit including high-resolution logos, executive photography, and our detailed corporate factsheet.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 inline-flex items-center gap-3 bg-white hover:bg-gray-50 px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-lg"
                  style={ { color: "#2A5C32" } } // Bulletproof text color
                >
                  Request Kit <ArrowRight size={ 18 } />
                </Link>
              </div>
            </div>
          </div>
        ) }
      </div>

      {/* Lightbox - Improved UI */ }
      { lightboxImg && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={ () => setLightboxImg(null) }
        >
          <button
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
            onClick={ () => setLightboxImg(null) }
          >
            <X size={ 24 } />
          </button>
          <img loading="lazy" decoding="async"
            src={ lightboxImg }
            alt="Gallery Fullscreen"
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
            onClick={ (e) => e.stopPropagation() } // Prevent clicking image from closing lightbox
          />
        </div>
      ) }
    </div>
  );
}