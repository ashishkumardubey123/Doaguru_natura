'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, ChevronDown, X,
  Pill, FlaskConical, Droplets, Layers, Syringe,
  Heart, Brain, Activity, Shield, Microscope,
  Download, Eye, Tag, ArrowRight, Package,
  SlidersHorizontal
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────
const therapyFilters = [
  { id: "cardiology", label: "Cardiology", icon: Heart, count: 82 },
  { id: "neurology", label: "Neurology & CNS", icon: Brain, count: 65 },
  { id: "oncology", label: "Oncology", icon: Activity, count: 41 },
  { id: "diabetes", label: "Diabetes & Metabolism", icon: Microscope, count: 57 },
  { id: "anti-infectives", label: "Anti-Infectives", icon: Shield, count: 73 },
  { id: "gastroenterology", label: "Gastroenterology", icon: FlaskConical, count: 46 },
  { id: "respiratory", label: "Respiratory", icon: Layers, count: 38 },
  { id: "dermatology", label: "Dermatology", icon: Pill, count: 29 },
];

const dosageFilters = [
  { id: "tablets", label: "Tablets", icon: Pill, count: 185 },
  { id: "capsules", label: "Capsules", icon: Layers, count: 124 },
  { id: "injectables", label: "Injectables", icon: Syringe, count: 76 },
  { id: "syrups", label: "Syrups & Suspensions", icon: Droplets, count: 58 },
  { id: "creams", label: "Topicals & Creams", icon: FlaskConical, count: 44 },
  { id: "drops", label: "Ophthalmic Drops", icon: Droplets, count: 22 },
];

const allProducts = [
  { id: 1, name: "Natrocard-40", genericName: "Atorvastatin 40mg", therapy: "cardiology", dosageForm: "tablets", strength: "40mg", packaging: "10×10 ALU Blister", tag: "Best Seller", tagColor: "#2A5C32", description: "High-intensity statin for cardiovascular risk reduction and hypercholesterolaemia." },
  { id: 2, name: "Cardimet-25", genericName: "Metoprolol Succinate 25mg", therapy: "cardiology", dosageForm: "tablets", strength: "25mg", packaging: "10×10 ALU Blister", description: "Extended-release beta-blocker for hypertension and heart failure management." },
  { id: 3, name: "Cardivast-5", genericName: "Amlodipine 5mg", therapy: "cardiology", dosageForm: "tablets", strength: "5mg", packaging: "3×10 Blister", description: "Calcium channel blocker for stable angina and essential hypertension." },
  { id: 4, name: "Natrocard-80", genericName: "Atorvastatin 80mg", therapy: "cardiology", dosageForm: "tablets", strength: "80mg", packaging: "10×10 ALU Blister", description: "High-dose statin therapy for secondary prevention post-ACS." },
  { id: 5, name: "NeuroZep-500", genericName: "Levetiracetam 500mg", therapy: "neurology", dosageForm: "tablets", strength: "500mg", packaging: "10×10 ALU Blister", tag: "New Launch", tagColor: "#1d6fa4", description: "Antiepileptic agent for partial seizures and generalised tonic-clonic seizures." },
  { id: 6, name: "Neuropar-25", genericName: "Carbidopa/Levodopa 25/100mg", therapy: "neurology", dosageForm: "tablets", strength: "25/100mg", packaging: "10×10 Blister", description: "First-line dopaminergic therapy for Parkinson's disease symptom management." },
  { id: 7, name: "NeuroGab-300", genericName: "Gabapentin 300mg", therapy: "neurology", dosageForm: "capsules", strength: "300mg", packaging: "3×10 Capsule Strip", description: "Anticonvulsant and neuropathic pain agent." },
  { id: 8, name: "OncoCap-500", genericName: "Capecitabine 500mg", therapy: "oncology", dosageForm: "tablets", strength: "500mg", packaging: "Bottle of 120", tag: "Export Special", tagColor: "#6B4226", description: "Oral fluoropyrimidine carbamate for colorectal and breast cancer." },
  { id: 9, name: "OncoRef-50", genericName: "Imatinib 50mg", therapy: "oncology", dosageForm: "capsules", strength: "50mg", packaging: "Bottle of 30", description: "Tyrosine kinase inhibitor for CML and GIST treatment." },
  { id: 10, name: "DiaMet-500", genericName: "Metformin HCl 500mg", therapy: "diabetes", dosageForm: "tablets", strength: "500mg", packaging: "10×10 ALU Blister", tag: "Best Seller", tagColor: "#2A5C32", description: "First-line oral biguanide for type 2 diabetes mellitus management." },
  { id: 11, name: "DiaGlip-1", genericName: "Glipizide 1mg", therapy: "diabetes", dosageForm: "tablets", strength: "1mg", packaging: "10×10 Blister", description: "Second-generation sulfonylurea for T2DM blood glucose control." },
  { id: 12, name: "InfectoAmox-500", genericName: "Amoxicillin 500mg", therapy: "anti-infectives", dosageForm: "capsules", strength: "500mg", packaging: "10×10 Blister", description: "Broad-spectrum aminopenicillin for respiratory and urinary tract infections." },
  { id: 13, name: "InfectoCef-200", genericName: "Cefixime 200mg", therapy: "anti-infectives", dosageForm: "tablets", strength: "200mg", packaging: "1×10 Strip", tag: "New Launch", tagColor: "#1d6fa4", description: "Third-generation cephalosporin for multi-drug resistant bacterial infections." },
  { id: 14, name: "InfectoAzi-500", genericName: "Azithromycin 500mg", therapy: "anti-infectives", dosageForm: "tablets", strength: "500mg", packaging: "1×3 Strip", description: "Macrolide antibiotic for atypical respiratory and STI management." },
  { id: 15, name: "GastroOme-20", genericName: "Omeprazole 20mg", therapy: "gastroenterology", dosageForm: "capsules", strength: "20mg", packaging: "3×10 Blister", description: "Proton pump inhibitor for GERD, peptic ulcer and H. pylori treatment." },
  { id: 16, name: "InjectoCef-1g", genericName: "Ceftriaxone 1g Inj.", therapy: "anti-infectives", dosageForm: "injectables", strength: "1g/vial", packaging: "Vial × 1", description: "3rd gen. cephalosporin injectable for severe bacterial infections." },
  { id: 17, name: "CardioInj-2.5", genericName: "Enalaprilat 2.5mg Inj.", therapy: "cardiology", dosageForm: "injectables", strength: "2.5mg/mL", packaging: "Vial × 1", description: "IV ACE inhibitor for hypertensive crisis management." },
  { id: 18, name: "SyrupAmox-125", genericName: "Amoxicillin 125mg/5mL", therapy: "anti-infectives", dosageForm: "syrups", strength: "125mg/5mL", packaging: "60mL Bottle", tag: "Paediatric", tagColor: "#0f7a3c", description: "Oral amoxicillin dry syrup for paediatric bacterial infections." },
];

// ─── PRODUCT CARD ────────────────────────────────────────────────────────
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full overflow-hidden relative">
      <div className="h-1.5 w-full absolute top-0 left-0 bg-[#2A5C32] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="p-6 flex flex-col flex-1 mt-1">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#f0f7f1] group-hover:bg-[#2A5C32] transition-colors duration-300">
            <Package size={20} className="text-[#2A5C32] group-hover:text-white transition-colors duration-300" />
          </div>
          {product.tag && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-white shadow-sm" style={{ backgroundColor: product.tagColor || "#2A5C32" }}>
              {product.tag}
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#2A5C32] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {product.name}
        </h3>
        <div className="text-xs text-gray-400 font-medium mb-3">{product.genericName}</div>
        <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2 flex-1">{product.description}</p>
        
        <div className="space-y-2 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100/50">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Tag size={12} className="text-[#2A5C32]" />
            <span>Strength: <span className="font-semibold text-gray-800">{product.strength}</span></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Package size={12} className="text-[#2A5C32]" />
            <span>Pack: <span className="font-semibold text-gray-800">{product.packaging}</span></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
          <button 
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl border-2 border-transparent hover:border-[#2A5C32]/10 bg-[#f0f7f1] hover:bg-[#e4efe5] active:scale-95 transition-all duration-200"
            style={{ color: "#2A5C32" }}
          >
            <Eye size={14} /> Details
          </button>
          <button 
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl bg-[#2A5C32] hover:bg-[#1a3c22] hover:shadow-md hover:shadow-[#2A5C32]/20 active:scale-95 transition-all duration-200"
            style={{ color: "#ffffff" }}
          >
            <Download size={14} /> COA
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────
export default function Products() {
  const [selectedTherapy, setSelectedTherapy] = useState([]);
  const [selectedDosage, setSelectedDosage] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [therapyExpanded, setTherapyExpanded] = useState(true);
  const [dosageExpanded, setDosageExpanded] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  
  // Mobile sidebar state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const applyHashFilter = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      if (therapyFilters.some((f) => f.id === hash)) {
        setSelectedTherapy([hash]);
        setSelectedDosage([]);
        setTherapyExpanded(true);
      } else if (dosageFilters.some((f) => f.id === hash)) {
        setSelectedDosage([hash]);
        setSelectedTherapy([]);
        setDosageExpanded(true);
      }
    };

    applyHashFilter();
    window.addEventListener("hashchange", applyHashFilter);
    return () => window.removeEventListener("hashchange", applyHashFilter);
  }, []);

  // Lock body scroll when mobile filters are open
  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMobileFiltersOpen]);

  const toggleFilter = (id, type) => {
    if (type === "therapy") {
      setSelectedTherapy((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    } else {
      setSelectedDosage((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    }
  };

  const clearAll = () => { setSelectedTherapy([]); setSelectedDosage([]); setSearchQuery(""); };
  const hasFilters = selectedTherapy.length > 0 || selectedDosage.length > 0 || searchQuery.length > 0;
  const normalizedQuery = searchQuery.toLowerCase().replace(/\s+/g, "");

  const filtered = allProducts.filter((p) => {
    const matchTherapy = selectedTherapy.length === 0 || selectedTherapy.includes(p.therapy);
    const matchDosage = selectedDosage.length === 0 || selectedDosage.includes(p.dosageForm);
    const normalizedName = p.name.toLowerCase().replace(/\s+/g, "");
    const normalizedGeneric = p.genericName.toLowerCase().replace(/\s+/g, "");
    const matchSearch = normalizedQuery === "" ||
      normalizedName.includes(normalizedQuery) ||
      normalizedGeneric.includes(normalizedQuery);
    return matchTherapy && matchDosage && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return a.therapy.localeCompare(b.therapy);
  });

  return (
    <div className="bg-gray-50 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div className="relative bg-[#1a3c22] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async"
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            alt="Products Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c22] via-[#1a3c22]/90 to-[#1a3c22]/40"></div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-sm text-green-300 mb-6 font-medium tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Products</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Our Portfolio
          </h1>
          <p className="text-green-50 max-w-xl text-lg md:text-xl leading-relaxed font-light">
            500+ formulations across 8 therapy areas and 6 dosage forms. WHO-GMP certified for global markets.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10 md:py-16">
        
        {/* Search & Mobile Filter Toggle Area */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
          <div className="relative w-full max-w-lg group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A5C32] transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand or generic name..."
              className="w-full pl-12 pr-10 py-3.5 border-2 border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-[#2A5C32] focus:ring-4 focus:ring-[#2A5C32]/10 transition-all bg-white shadow-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full transition-colors">
                <X size={14} />
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-semibold shadow-sm active:scale-95 transition-all"
          >
            <SlidersHorizontal size={18} className="text-[#2A5C32]" />
            Filters {hasFilters && <span className="bg-[#2A5C32] text-white text-[10px] px-2 py-0.5 rounded-full">{selectedTherapy.length + selectedDosage.length}</span>}
          </button>
        </div>

        <div className="flex gap-8 relative">
          
          {/* Mobile Filter Overlay */}
          {isMobileFiltersOpen && (
            <div 
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity" 
              onClick={() => setIsMobileFiltersOpen(false)}
            />
          )}

          {/* Sidebar Filters */}
          <aside className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-gray-50 p-6 overflow-y-auto transition-transform duration-300 transform md:relative md:translate-x-0 md:bg-transparent md:p-0 md:w-64 md:z-0 md:block md:shrink-0 ${isMobileFiltersOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}>
            
            <div className="flex items-center justify-between mb-6 md:hidden">
              <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Filters</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors">
                <X size={16} />
              </button>
            </div>

            {hasFilters && (
              <button onClick={clearAll} className="w-full flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-xl mb-6 bg-red-50 hover:bg-red-100 text-red-600 transition-colors active:scale-95">
                <X size={14} /> Clear All Filters
              </button>
            )}

            {/* Therapy Filter */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5 shadow-sm">
              <button onClick={() => setTherapyExpanded(!therapyExpanded)} className="flex items-center justify-between w-full mb-4 group">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-800 group-hover:text-[#2A5C32] transition-colors">Therapy Area</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${therapyExpanded ? "rotate-180" : ""}`} />
              </button>
              {therapyExpanded && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  {therapyFilters.map((f) => (
                    <label key={f.id} id={f.id} className="flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-[#f0f7f1] group transition-colors">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all duration-200 ${selectedTherapy.includes(f.id) ? "border-[#2A5C32] bg-[#2A5C32] shadow-sm" : "border-gray-300 bg-white group-hover:border-[#2A5C32]"}`}
                          onClick={() => toggleFilter(f.id, "therapy")}
                        >
                          {selectedTherapy.includes(f.id) && (
                            <svg viewBox="0 0 10 8" className="w-2.5 fill-white">
                              <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </svg>
                          )}
                        </div>
                        <f.icon size={15} className={`${selectedTherapy.includes(f.id) ? "text-[#2A5C32]" : "text-gray-400 group-hover:text-[#2A5C32]"} transition-colors`} />
                        <span className={`text-sm ${selectedTherapy.includes(f.id) ? "text-[#2A5C32] font-semibold" : "text-gray-600"}`}>{f.label}</span>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">{f.count}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Dosage Form Filter */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm">
              <button onClick={() => setDosageExpanded(!dosageExpanded)} className="flex items-center justify-between w-full mb-4 group">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-800 group-hover:text-[#2A5C32] transition-colors">Dosage Form</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${dosageExpanded ? "rotate-180" : ""}`} />
              </button>
              {dosageExpanded && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  {dosageFilters.map((f) => (
                    <label key={f.id} id={f.id} className="flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-[#f0f7f1] group transition-colors">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all duration-200 ${selectedDosage.includes(f.id) ? "border-[#2A5C32] bg-[#2A5C32] shadow-sm" : "border-gray-300 bg-white group-hover:border-[#2A5C32]"}`}
                          onClick={() => toggleFilter(f.id, "dosage")}
                        >
                          {selectedDosage.includes(f.id) && (
                            <svg viewBox="0 0 10 8" className="w-2.5 fill-white">
                              <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </svg>
                          )}
                        </div>
                        <f.icon size={15} className={`${selectedDosage.includes(f.id) ? "text-[#2A5C32]" : "text-gray-400 group-hover:text-[#2A5C32]"} transition-colors`} />
                        <span className={`text-sm ${selectedDosage.includes(f.id) ? "text-[#2A5C32] font-semibold" : "text-gray-600"}`}>{f.label}</span>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">{f.count}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Download CTA */}
            <div className="rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group" style={{ background: "linear-gradient(135deg, #2A5C32 0%, #15301a 100%)" }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500"></div>
              <Package size={28} className="text-green-300 mb-4 relative z-10" />
              <div className="font-bold text-lg mb-2 relative z-10" style={{ fontFamily: "'Montserrat', sans-serif" }}>Export Catalogue</div>
              <p className="text-green-100 text-xs leading-relaxed mb-6 relative z-10 opacity-90">Download our complete product portfolio with detailed specifications and regulatory statuses.</p>
              <button 
                className="w-full bg-white text-sm font-bold py-3 rounded-xl hover:bg-gray-50 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 relative z-10"
                style={{ color: "#2A5C32" }}
              >
                <Download size={16} /> Download PDF
              </button>
            </div>
          </aside>

          {/* Products Grid Area */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-sm text-gray-500">
                Showing <span className="font-bold text-gray-900 text-base">{sorted.length}</span> products
                {hasFilters && <span> (filtered)</span>}
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-medium text-gray-500 hidden sm:inline-block">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-medium border-2 border-gray-100 rounded-xl px-4 py-2 text-gray-800 focus:outline-none focus:border-[#2A5C32] focus:ring-4 focus:ring-[#2A5C32]/10 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer w-full sm:w-auto"
                >
                  <option value="name">Product Name (A–Z)</option>
                  <option value="therapy">Therapy Area</option>
                </select>
              </div> 
            </div>

            {/* Active Filters Display */}
            {hasFilters && (
              <div className="flex items-center gap-2 flex-wrap mb-6">
                <span className="text-xs font-semibold text-gray-400 mr-1">Active Filters:</span>
                {selectedTherapy.map((id) => {
                  const f = therapyFilters.find((x) => x.id === id);
                  return f ? (
                    <span key={id} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#f0f7f1] border border-[#2A5C32]/20 text-[#2A5C32] font-semibold shadow-sm">
                      {f.label} <button onClick={() => toggleFilter(id, "therapy")} className="hover:bg-[#2A5C32]/10 rounded-full p-0.5 transition-colors"><X size={12} /></button>
                    </span>
                  ) : null;
                })}
                {selectedDosage.map((id) => {
                  const f = dosageFilters.find((x) => x.id === id);
                  return f ? (
                    <span key={id} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-semibold shadow-sm">
                      {f.label} <button onClick={() => toggleFilter(id, "dosage")} className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"><X size={12} /></button>
                    </span>
                  ) : null;
                })}
              </div>
            )}

            {sorted.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package size={32} className="text-gray-400" />
                </div>
                <div className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>No products found</div>
                <p className="text-gray-500 mb-6">Try adjusting your filters or searching for something else.</p>
                <button onClick={clearAll} className="px-6 py-2.5 bg-[#f0f7f1] text-[#2A5C32] font-semibold rounded-xl hover:bg-[#e4efe5] active:scale-95 transition-all">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sorted.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )} 

            {sorted.length > 0 && (
              <div className="text-center mt-16 pb-8">
                <p className="text-sm font-medium text-gray-400 mb-5">Showing {sorted.length} of 500+ products in our portfolio.</p>
                <button className="inline-flex items-center gap-2 border-2 border-[#2A5C32] text-[#2A5C32] font-bold px-8 py-3.5 rounded-xl transition-all duration-300 hover:bg-[#2A5C32] hover:text-white hover:shadow-lg hover:shadow-[#2A5C32]/20 active:scale-95">
                  Request Full Catalogue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}