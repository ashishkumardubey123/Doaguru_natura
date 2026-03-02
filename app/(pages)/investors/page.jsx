'use client';

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight, Download, ExternalLink, Calendar,
  FileText, Image, TrendingUp, BarChart3, Users,
  Globe2, ArrowRight, Play, Camera, Newspaper, Filter,
  MapPin, Phone, Mail
} from "lucide-react";

// â”€â”€â”€ DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const sections = ["Annual Reports", "Press Releases", "Financial Results", "Image Gallery", "Media Contact"];

const annualReports = [
  {
    year: "2024",
    title: "Annual Report 2023â€“24",
    desc: "Record revenue of USD 420M, driven by 28% export growth. Expansion into 8 new markets.",
    highlights: ["Revenue: USD 420M (+18% YoY)", "EBITDA Margin: 24.5%", "New Markets: 8", "R&D Spend: USD 33M"],
    size: "8.4 MB",
    pages: "156 pages",
    cover: "https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    year: "2023",
    title: "Annual Report 2022â€“23",
    desc: "Strategic pivot to regulated markets with 5 new USFDA ANDA approvals and EU GMP expansion.",
    highlights: ["Revenue: USD 356M (+14% YoY)", "EBITDA Margin: 22.8%", "ANDA Approvals: 5", "Export Share: 68%"],
    size: "7.1 MB",
    pages: "142 pages",
    cover: "https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    year: "2022",
    title: "Annual Report 2021â€“22",
    desc: "Post-pandemic resilience with accelerated capacity expansion and strong domestic + export growth.",
    highlights: ["Revenue: USD 312M (+21% YoY)", "EBITDA Margin: 21.2%", "New Plant: Unit III", "Headcount: 3,200+"],
    size: "6.8 MB",
    pages: "138 pages",
    cover: "https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    year: "2021",
    title: "Annual Report 2020â€“21",
    desc: "Resilience amid COVID-19. Pivoted manufacturing capacity to critical medicines for global supply chains.",
    highlights: ["Revenue: USD 258M (+8% YoY)", "COVID-19 Response", "New Certifications: 3", "WHO PQ: 4 products"],
    size: "5.9 MB",
    pages: "128 pages",
    cover: "https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

const pressReleases = [
  {
    date: "February 18, 2025",
    category: "Manufacturing",
    title: "Natura Health Care Receives WHO-GMP Certification for New Injectable Plant in Vadodara",
    excerpt: "The certification expands parenteral production capacity by 40%, strengthening the company's ability to supply critical injectables to regulated markets including the EU and Africa.",
    tag: "New",
  },
  {
    date: "January 30, 2025",
    category: "Business Development",
    title: "Strategic Distribution Agreement Signed for Sub-Saharan Africa Covering 8 Nations",
    excerpt: "A landmark 5-year exclusive distribution agreement will provide access to Natura Health Care's complete anti-infective and oncology range across Nigeria, Ghana, Kenya, and 5 other markets.",
    tag: "",
  },
  {
    date: "January 15, 2025",
    category: "R&D",
    title: "Phase III Clinical Trial Initiated for NHC-CV401 in Treatment-Resistant Hypertension",
    excerpt: "The multi-centre Phase III trial across 24 sites in India, Europe, and the UAE will enrol 850 patients over 18 months, with primary endpoint data expected in Q4 2026.",
    tag: "",
  },
  {
    date: "December 20, 2024",
    category: "Regulatory",
    title: "5 New ANDAs Approved by USFDA for Cardiovascular and Oncology Portfolio",
    excerpt: "The approvals add 5 new products to Natura's USFDA portfolio, bringing the total to 42 ANDAs, and enable immediate commercial launch in the US generics market.",
    tag: "",
  },
  {
    date: "November 12, 2024",
    category: "Corporate",
    title: "Natura Health Care Named in 'Top 50 Pharma Exporters' by Pharmexcil for 2024",
    excerpt: "The Pharmaceuticals Export Promotion Council of India recognised Natura among the top 50 pharmaceutical exporters for FY2023-24 based on export value and market diversification.",
    tag: "",
  },
  {
    date: "October 5, 2024",
    category: "Sustainability",
    title: "Company Achieves Carbon Neutrality for Manufacturing Operations in Gujarat",
    excerpt: "Through a combination of renewable energy adoption (solar + wind), waste reduction and carbon offsets, both Gujarat manufacturing units achieved net-zero carbon status.",
    tag: "",
  },
];

const financialResults = [
  { quarter: "Q3 FY2025", revenue: "USD 118M", growth: "+22%", ebitda: "27.2%", date: "January 2025" },
  { quarter: "Q2 FY2025", revenue: "USD 108M", growth: "+19%", ebitda: "25.8%", date: "October 2024" },
  { quarter: "Q1 FY2025", revenue: "USD 99M", growth: "+15%", ebitda: "24.1%", date: "July 2024" },
  { quarter: "Q4 FY2024", revenue: "USD 105M", growth: "+20%", ebitda: "26.3%", date: "April 2024" },
  { quarter: "Q3 FY2024", revenue: "USD 97M", growth: "+16%", ebitda: "23.9%", date: "January 2024" },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1757578097654-fdae0f7cf008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Manufacturing Unit I â€” Oral Solid Dosage Facility, Gujarat", cat: "Facilities" },
  { src: "https://images.unsplash.com/photo-1576765608689-c0e8f69a46b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Quality Control Laboratory â€” Natura Research Hub, Pune", cat: "R&D" },
  { src: "https://images.unsplash.com/photo-1581056771085-3ce30d907416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Analytical Testing â€” QC Release Laboratory", cat: "Quality" },
  { src: "https://images.unsplash.com/photo-1765206257996-9b4a5d886a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Global Export Operations â€” Supply Chain Team", cat: "Operations" },
  { src: "https://images.unsplash.com/photo-1766297246929-3b69ca8b175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "European Innovation Centre â€” Basel, Switzerland", cat: "R&D" },
  { src: "https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Patient-Centric Healthcare Programmes â€” Community Outreach", cat: "People" },
  { src: "https://images.unsplash.com/photo-1571645163064-77faa9676a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Annual Investor Summit 2024 â€” Zurich", cat: "Events" },
  { src: "https://images.unsplash.com/photo-1762439183787-54302c4dfb9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Natura Health Care Global Headquarters â€” Basel", cat: "Corporate" },
];

// â”€â”€â”€ INVESTORS PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Investors() {
  const [activeSection, setActiveSection] = useState("Annual Reports");
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [lightboxImg, setLightboxImg] = useState(null);

  const galleryCats = ["All", "Facilities", "R&D", "Quality", "Operations", "People", "Events", "Corporate"];
  const filteredGallery = galleryFilter === "All" ? galleryImages : galleryImages.filter((g) => g.cat === galleryFilter);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #2A5C32 0%, #1a3c22 100%)" }} className="text-white py-16">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center gap-2 text-green-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Investors & Media</span>
          </div>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }} className="mb-3">
            Investors & Media Centre
          </h1>
          <p className="text-green-200 max-w-xl">
            Financial results, annual reports, press releases, and media resources for analysts, investors, and journalists.
          </p>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-gray-100">
            {[
              { icon: TrendingUp, label: "Revenue FY2024", value: "USD 420M", delta: "+18% YoY", up: true },
              { icon: BarChart3, label: "EBITDA Margin", value: "24.5%", delta: "+1.7pp YoY", up: true },
              { icon: Globe2, label: "Export Share", value: "72%", delta: "+4pp YoY", up: true },
              { icon: Users, label: "Employees", value: "3,500+", delta: "+12% YoY", up: true },
            ].map((k) => (
              <div key={k.label} className="px-6 py-2 first:pl-0">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <k.icon size={12} />
                  {k.label}
                </div>
                <div className="font-black text-xl text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>{k.value}</div>
                <div className="text-xs font-medium text-green-600 mt-0.5">{k.delta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex gap-0 overflow-x-auto">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                  activeSection === s ? "border-[#2A5C32] text-[#2A5C32]" : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {s === "Annual Reports" && <FileText size={14} />}
                {s === "Press Releases" && <Newspaper size={14} />}
                {s === "Financial Results" && <BarChart3 size={14} />}
                {s === "Image Gallery" && <Camera size={14} />}
                {s === "Media Contact" && <Users size={14} />}
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-14">
        {/* â”€â”€ ANNUAL REPORTS â”€â”€ */}
        {activeSection === "Annual Reports" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-bold text-2xl text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Annual Reports</h2>
                <p className="text-gray-500 text-sm mt-1">Comprehensive yearly performance summaries and audited financial statements.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {annualReports.map((report, i) => (
                <div
                  key={report.year}
                  className={`bg-white rounded-3xl border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${i === 0 ? "border-[#2A5C32] ring-2 ring-[#2A5C32]/10" : "border-gray-100"}`}
                >
                  {/* Cover */}
                  <div className="relative h-44 overflow-hidden">
                    <img loading="lazy" decoding="async" src={report.cover} alt={report.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(42,92,50,0.8) 0%, transparent 60%)" }} />
                    {i === 0 && (
                      <div className="absolute top-3 right-3 bg-[#2A5C32] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Latest</div>
                    )}
                    <div className="absolute bottom-3 left-4">
                      <div className="text-2xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>FY{report.year}</div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-sm mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{report.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{report.desc}</p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-5">
                      {report.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2 text-xs text-gray-600">
                          <div className="w-1 h-1 rounded-full bg-[#2A5C32] shrink-0" />
                          {h}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span>{report.pages}</span>
                      <span>PDF {report.size}</span>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 bg-[#2A5C32] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-[#234e2a] transition-colors">
                      <Download size={14} /> Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Corporate Presentations */}
            <div className="mt-12 bg-[#f5f8f5] rounded-3xl p-8">
              <h3 className="font-bold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Investor Presentations & Documents</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: "Corporate Presentation Q3 FY25", size: "3.2 MB", date: "Jan 2025", icon: FileText },
                  { name: "Analyst Day 2024 Presentation", size: "5.8 MB", date: "Nov 2024", icon: BarChart3 },
                  { name: "ESG & Sustainability Report 2024", size: "4.1 MB", date: "Sep 2024", icon: Globe2 },
                  { name: "Product Portfolio Overview", size: "2.7 MB", date: "Dec 2024", icon: FileText },
                  { name: "Manufacturing Capability Deck", size: "6.3 MB", date: "Oct 2024", icon: FileText },
                  { name: "AGM Notice & Proceedings 2024", size: "1.8 MB", date: "Aug 2024", icon: Users },
                ].map((doc) => (
                  <div key={doc.name} className="bg-white rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow group border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-[#e8f0e9] flex items-center justify-center shrink-0">
                      <doc.icon size={18} style={{ color: "#2A5C32" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-sm truncate">{doc.name}</div>
                      <div className="text-xs text-gray-400">{doc.date} Â· {doc.size}</div>
                    </div>
                    <button className="text-gray-300 group-hover:text-[#2A5C32] transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* â”€â”€ PRESS RELEASES â”€â”€ */}
        {activeSection === "Press Releases" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-bold text-2xl text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Press Releases</h2>
                <p className="text-gray-500 text-sm mt-1">Official company announcements and media statements.</p>
              </div>
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-gray-400" />
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-[#2A5C32]">
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

            <div className="space-y-5">
              {pressReleases.map((pr, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-[#2A5C32]/30 transition-all group"
                >
                  <div className="flex items-start gap-5">
                    {/* Date pill */}
                    <div className="shrink-0 text-center bg-[#f5f8f5] rounded-xl p-3 w-16">
                      <div className="text-xs text-gray-400">{pr.date.split(" ")[0]}</div>
                      <div className="text-2xl font-black text-[#2A5C32]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {pr.date.split(" ")[1].replace(",", "")}
                      </div>
                      <div className="text-xs text-gray-400">{pr.date.split(" ")[2]}</div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#e8f0e9] text-[#2A5C32]">{pr.category}</span>
                        {pr.tag && <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#6B4226] text-white">{pr.tag}</span>}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#2A5C32] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {pr.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-3">{pr.excerpt}</p>
                      <button className="flex items-center gap-1 text-sm font-semibold text-[#2A5C32] hover:gap-2 transition-all">
                        Read Full Release <ArrowRight size={14} />
                      </button>
                    </div>

                    <button className="shrink-0 text-gray-300 hover:text-[#2A5C32] transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€ FINANCIAL RESULTS â”€â”€ */}
        {activeSection === "Financial Results" && (
          <div>
            <h2 className="font-bold text-2xl text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Financial Results</h2>
            <p className="text-gray-500 text-sm mb-8">Quarterly and annual financial performance data for analysts and investors.</p>

            {/* Revenue trend visual */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 mb-8 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Revenue Trend (Last 4 Years)</h3>
              <div className="flex items-end gap-4 h-48">
                {[
                  { year: "FY21", value: 258, pct: 55 },
                  { year: "FY22", value: 312, pct: 66 },
                  { year: "FY23", value: 356, pct: 76 },
                  { year: "FY24", value: 420, pct: 90 },
                  { year: "FY25E", value: 510, pct: 100 },
                ].map((d) => (
                  <div key={d.year} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs font-bold text-gray-700">USD {d.value}M</div>
                    <div
                      className="w-full rounded-t-lg transition-all duration-500"
                      style={{ height: `${d.pct}%`, backgroundColor: d.year === "FY24" ? "#2A5C32" : d.year === "FY25E" ? "#6B4226" : "#c8e6c9" }}
                    />
                    <div className="text-xs text-gray-500 font-medium">{d.year}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-xs text-gray-400">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-[#c8e6c9]" /> Historical</div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-[#2A5C32]" /> FY2024 (Full Year)</div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-[#6B4226]" /> FY2025 (Estimate)</div>
              </div>
            </div>

            {/* Quarterly results table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100" style={{ backgroundColor: "#f5f8f5" }}>
                <h3 className="font-bold text-gray-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>Quarterly Results</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {["Quarter", "Revenue", "YoY Growth", "EBITDA Margin", "Date Published", "Download"].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {financialResults.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-800">{r.quarter}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{r.revenue}</td>
                      <td className="px-6 py-4">
                        <span className="text-green-600 font-bold">{r.growth}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{r.ebitda}</td>
                      <td className="px-6 py-4 text-gray-500">{r.date}</td>
                      <td className="px-6 py-4">
                        <button className="text-[#2A5C32] hover:opacity-70 transition-opacity flex items-center gap-1 text-xs font-semibold">
                          <Download size={13} /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* â”€â”€ IMAGE GALLERY â”€â”€ */}
        {activeSection === "Image Gallery" && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="font-bold text-2xl text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Image Gallery</h2>
                <p className="text-gray-500 text-sm mt-1">Official high-resolution photography for media use. Free to download for editorial purposes.</p>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap mb-8">
              {galleryCats.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`text-sm px-4 py-1.5 rounded-full font-medium transition-all ${
                    galleryFilter === cat
                      ? "text-white bg-[#2A5C32]"
                      : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredGallery.map((img, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-video bg-gray-100"
                  onClick={() => setLightboxImg(img.src)}
                >
                  <img loading="lazy" decoding="async" src={img.src} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                        <ExternalLink size={16} />
                      </button>
                      <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-xs font-bold text-white mb-0.5">{img.cat}</div>
                    <p className="text-[10px] text-gray-300 leading-tight">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€ MEDIA CONTACT â”€â”€ */}
        {activeSection === "Media Contact" && (
          <div className="max-w-3xl">
            <h2 className="font-bold text-2xl text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Media & PR Contacts</h2>
            <p className="text-gray-500 text-sm mb-10">For media enquiries, interview requests, and editorial resources, please contact our communications team.</p>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {[
                {
                  name: "Sarah Mitchell",
                  title: "Head of Global Communications",
                  region: "Global / Europe",
                  email: "s.mitchell@naturahealthcare.com",
                  phone: "+41 44 123 4570",
                  image: "https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
                },
                {
                  name: "Rahul Khanna",
                  title: "VP â€” Investor Relations",
                  region: "Asia-Pacific / Emerging Markets",
                  email: "r.khanna@naturahealthcare.com",
                  phone: "+91 22 4567 8902",
                  image: "https://images.unsplash.com/photo-1571645163064-77faa9676a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
                },
              ].map((contact) => (
                <div key={contact.name} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 shrink-0">
                      <img loading="lazy" decoding="async" src={contact.image} alt={contact.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{contact.name}</div>
                      <div className="text-xs text-gray-500">{contact.title}</div>
                      <div className="text-xs text-[#2A5C32] font-medium mt-0.5">{contact.region}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2A5C32]">
                      <ExternalLink size={13} className="text-gray-300" /> {contact.email}
                    </a>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ExternalLink size={13} className="text-gray-300" /> {contact.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#f5f8f5] rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Media Kit Request</h3>
              <p className="text-sm text-gray-500 mb-5">
                Journalists and analysts can request our complete media kit including high-resolution logos, executive photography, and company factsheet.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#2A5C32] text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                Request Media Kit <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-8"
          onClick={() => setLightboxImg(null)}
        >
          <img loading="lazy" decoding="async"
            src={lightboxImg}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
