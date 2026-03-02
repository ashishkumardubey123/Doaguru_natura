'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, ChevronDown, X,
  Pill, FlaskConical, Droplets, Layers, Syringe,
  Heart, Brain, Activity, Shield, Microscope,
  Download, Eye, Tag, ArrowRight, Package
} from "lucide-react";

// â”€â”€â”€ DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
  { id: 1, name: "Natrocard-40", genericName: "Atorvastatin 40mg", therapy: "cardiology", dosageForm: "tablets", strength: "40mg", packaging: "10Ã—10 ALU Blister", tag: "Best Seller", tagColor: "#2A5C32", description: "High-intensity statin for cardiovascular risk reduction and hypercholesterolaemia." },
  { id: 2, name: "Cardimet-25", genericName: "Metoprolol Succinate 25mg", therapy: "cardiology", dosageForm: "tablets", strength: "25mg", packaging: "10Ã—10 ALU Blister", description: "Extended-release beta-blocker for hypertension and heart failure management." },
  { id: 3, name: "Cardivast-5", genericName: "Amlodipine 5mg", therapy: "cardiology", dosageForm: "tablets", strength: "5mg", packaging: "3Ã—10 Blister", description: "Calcium channel blocker for stable angina and essential hypertension." },
  { id: 4, name: "Natrocard-80", genericName: "Atorvastatin 80mg", therapy: "cardiology", dosageForm: "tablets", strength: "80mg", packaging: "10Ã—10 ALU Blister", description: "High-dose statin therapy for secondary prevention post-ACS." },
  { id: 5, name: "NeuroZep-500", genericName: "Levetiracetam 500mg", therapy: "neurology", dosageForm: "tablets", strength: "500mg", packaging: "10Ã—10 ALU Blister", tag: "New Launch", tagColor: "#1d6fa4", description: "Antiepileptic agent for partial seizures and generalised tonic-clonic seizures." },
  { id: 6, name: "Neuropar-25", genericName: "Carbidopa/Levodopa 25/100mg", therapy: "neurology", dosageForm: "tablets", strength: "25/100mg", packaging: "10Ã—10 Blister", description: "First-line dopaminergic therapy for Parkinson's disease symptom management." },
  { id: 7, name: "NeuroGab-300", genericName: "Gabapentin 300mg", therapy: "neurology", dosageForm: "capsules", strength: "300mg", packaging: "3Ã—10 Capsule Strip", description: "Anticonvulsant and neuropathic pain agent." },
  { id: 8, name: "OncoCap-500", genericName: "Capecitabine 500mg", therapy: "oncology", dosageForm: "tablets", strength: "500mg", packaging: "Bottle of 120", tag: "Export Special", tagColor: "#6B4226", description: "Oral fluoropyrimidine carbamate for colorectal and breast cancer." },
  { id: 9, name: "OncoRef-50", genericName: "Imatinib 50mg", therapy: "oncology", dosageForm: "capsules", strength: "50mg", packaging: "Bottle of 30", description: "Tyrosine kinase inhibitor for CML and GIST treatment." },
  { id: 10, name: "DiaMet-500", genericName: "Metformin HCl 500mg", therapy: "diabetes", dosageForm: "tablets", strength: "500mg", packaging: "10Ã—10 ALU Blister", tag: "Best Seller", tagColor: "#2A5C32", description: "First-line oral biguanide for type 2 diabetes mellitus management." },
  { id: 11, name: "DiaGlip-1", genericName: "Glipizide 1mg", therapy: "diabetes", dosageForm: "tablets", strength: "1mg", packaging: "10Ã—10 Blister", description: "Second-generation sulfonylurea for T2DM blood glucose control." },
  { id: 12, name: "InfectoAmox-500", genericName: "Amoxicillin 500mg", therapy: "anti-infectives", dosageForm: "capsules", strength: "500mg", packaging: "10Ã—10 Blister", description: "Broad-spectrum aminopenicillin for respiratory and urinary tract infections." },
  { id: 13, name: "InfectoCef-200", genericName: "Cefixime 200mg", therapy: "anti-infectives", dosageForm: "tablets", strength: "200mg", packaging: "1Ã—10 Strip", tag: "New Launch", tagColor: "#1d6fa4", description: "Third-generation cephalosporin for multi-drug resistant bacterial infections." },
  { id: 14, name: "InfectoAzi-500", genericName: "Azithromycin 500mg", therapy: "anti-infectives", dosageForm: "tablets", strength: "500mg", packaging: "1Ã—3 Strip", description: "Macrolide antibiotic for atypical respiratory and STI management." },
  { id: 15, name: "GastroOme-20", genericName: "Omeprazole 20mg", therapy: "gastroenterology", dosageForm: "capsules", strength: "20mg", packaging: "3Ã—10 Blister", description: "Proton pump inhibitor for GERD, peptic ulcer and H. pylori treatment." },
  { id: 16, name: "InjectoCef-1g", genericName: "Ceftriaxone 1g Inj.", therapy: "anti-infectives", dosageForm: "injectables", strength: "1g/vial", packaging: "Vial Ã— 1", description: "3rd gen. cephalosporin injectable for severe bacterial infections." },
  { id: 17, name: "CardioInj-2.5", genericName: "Enalaprilat 2.5mg Inj.", therapy: "cardiology", dosageForm: "injectables", strength: "2.5mg/mL", packaging: "Vial Ã— 1", description: "IV ACE inhibitor for hypertensive crisis management." },
  { id: 18, name: "SyrupAmox-125", genericName: "Amoxicillin 125mg/5mL", therapy: "anti-infectives", dosageForm: "syrups", strength: "125mg/5mL", packaging: "60mL Bottle", tag: "Paediatric", tagColor: "#0f7a3c", description: "Oral amoxicillin dry syrup for paediatric bacterial infections." },
];

// â”€â”€â”€ PRODUCT CARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden">
      <div className="h-1.5" style={{ backgroundColor: "#2A5C32" }} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f0f7f1" }}>
            <Package size={20} style={{ color: "#2A5C32" }} />
          </div>
          {product.tag && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: product.tagColor || "#2A5C32" }}>
              {product.tag}
            </span>
          )}
        </div>
        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#2A5C32] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {product.name}
        </h3>
        <div className="text-xs text-gray-400 mb-3">{product.genericName}</div>
        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{product.description}</p>
        <div className="space-y-1.5 mb-5">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Tag size={11} className="text-gray-300" />
            <span>Strength: <span className="font-medium text-gray-700">{product.strength}</span></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Package size={11} className="text-gray-300" />
            <span>Pack: <span className="font-medium text-gray-700">{product.packaging}</span></span>
          </div>
        </div>
        <div className="flex gap-2 pt-4 border-t border-gray-50">
          <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-lg hover:bg-[#f0f7f1] transition-colors" style={{ color: "#2A5C32" }}>
            <Eye size={13} /> Details
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-lg text-white" style={{ backgroundColor: "#2A5C32" }}>
            <Download size={13} /> COA
          </button>
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Products() {
  const [selectedTherapy, setSelectedTherapy] = useState([]);
  const [selectedDosage, setSelectedDosage] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [therapyExpanded, setTherapyExpanded] = useState(true);
  const [dosageExpanded, setDosageExpanded] = useState(true);
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      if (therapyFilters.some(f => f.id === hash)) {
        // eslint-disable-next-line
        setSelectedTherapy([hash]);
      } else if (dosageFilters.some(f => f.id === hash)) {
        // eslint-disable-next-line
        setSelectedDosage([hash]);
      }
    }
  }, []);

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
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div className="relative bg-[#1a3c22] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async"
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            alt="Products Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c22] via-[#1a3c22]/80 to-transparent"></div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-sm text-green-300 mb-4 font-medium tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span>Products</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Products</h1>
          <p className="text-green-100 max-w-xl text-lg leading-relaxed">500+ formulations across 8 therapy areas and 6 dosage forms. WHO-GMP certified for global markets.</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-10">
        {/* Search Bar */}
        <div className="relative mb-8 max-w-lg">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.replace(/\s+/g, ""))}
            placeholder="Search by product name or generic name..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2A5C32] transition-colors bg-white"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 shrink-0 hidden md:block">
            {hasFilters && (
              <button onClick={clearAll} className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl mb-4 border-2 hover:bg-red-50 transition-colors text-red-500 border-red-200">
                <X size={12} /> Clear All Filters
              </button>
            )}

            {/* Therapy Filter */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
              <button onClick={() => setTherapyExpanded(!therapyExpanded)} className="flex items-center justify-between w-full mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Therapy Area</span>
                <ChevronDown size={14} className={`transition-transform ${therapyExpanded ? "rotate-180" : ""}`} />
              </button>
              {therapyExpanded && (
                <div className="space-y-1">
                  {therapyFilters.map((f) => (
                    <label key={f.id} id={f.id} className="flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-gray-50 group scroll-mt-24">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${selectedTherapy.includes(f.id) ? "border-[#2A5C32] bg-[#2A5C32]" : "border-gray-300"}`}
                          onClick={() => toggleFilter(f.id, "therapy")}
                        >
                          {selectedTherapy.includes(f.id) && (
                            <svg viewBox="0 0 10 8" className="w-2.5 fill-white">
                              <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </svg>
                          )}
                        </div>
                        <f.icon size={13} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{f.label}</span>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{f.count}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Dosage Form Filter */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
              <button onClick={() => setDosageExpanded(!dosageExpanded)} className="flex items-center justify-between w-full mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Dosage Form</span>
                <ChevronDown size={14} className={`transition-transform ${dosageExpanded ? "rotate-180" : ""}`} />
              </button>
              {dosageExpanded && (
                <div className="space-y-1">
                  {dosageFilters.map((f) => (
                    <label key={f.id} id={f.id} className="flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-gray-50 group scroll-mt-24">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${selectedDosage.includes(f.id) ? "border-[#2A5C32] bg-[#2A5C32]" : "border-gray-300"}`}
                          onClick={() => toggleFilter(f.id, "dosage")}
                        >
                          {selectedDosage.includes(f.id) && (
                            <svg viewBox="0 0 10 8" className="w-2.5 fill-white">
                              <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </svg>
                          )}
                        </div>
                        <f.icon size={13} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{f.label}</span>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{f.count}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Download CTA */}
            <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #2A5C32 0%, #1a3c22 100%)" }}>
              <Package size={22} className="text-green-300 mb-3" />
              <div className="font-bold mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Export Catalogue</div>
              <p className="text-green-200 text-xs leading-relaxed mb-4">Download our complete product catalogue with specifications and regulatory status.</p>
              <button className="w-full bg-white text-[#2A5C32] text-xs font-bold py-2.5 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                <Download size={13} /> Download PDF
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="text-sm text-gray-500">
                Showing <span className="font-bold text-gray-900">{sorted.length}</span> products
                {hasFilters && <span> (filtered from {allProducts.length})</span>}
              </div>
              {hasFilters && (
                <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                  {selectedTherapy.map((id) => {
                    const f = therapyFilters.find((x) => x.id === id);
                    return f ? (
                      <span key={id} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-[#e8f0e9] text-[#2A5C32] font-medium">
                        {f.label} <button onClick={() => toggleFilter(id, "therapy")}><X size={11} /></button>
                      </span>
                    ) : null;
                  })}
                  {selectedDosage.map((id) => {
                    const f = dosageFilters.find((x) => x.id === id);
                    return f ? (
                      <span key={id} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                        {f.label} <button onClick={() => toggleFilter(id, "dosage")}><X size={11} /></button>
                      </span>
                    ) : null;
                  })}
                </div>
              )}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#2A5C32] bg-white"
                >
                  <option value="name">Name (Aâ€“Z)</option>
                  <option value="therapy">Therapy Area</option>
                </select>
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <Package size={48} className="mx-auto mb-4 opacity-30" />
                <div className="font-semibold text-gray-500 mb-2">No products found</div>
                <p className="text-sm">Try adjusting your filters or search term.</p>
                <button onClick={clearAll} className="mt-4 text-[#2A5C32] font-semibold text-sm hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {sorted.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}

            {sorted.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-sm text-gray-400 mb-4">Showing {sorted.length} of 500+ products in our portfolio.</p>
                <button className="inline-flex items-center gap-2 border-2 font-semibold px-8 py-3.5 rounded-full transition-all hover:bg-[#2A5C32] hover:text-white" style={{ borderColor: "#2A5C32", color: "#2A5C32" }}>
                  Request Full Catalogue <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
