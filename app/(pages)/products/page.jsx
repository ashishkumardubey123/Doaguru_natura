'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search, ChevronDown, X, Package,
  Eye, Download, Tag, ArrowRight, SlidersHorizontal,
  LayoutGrid, List, ChevronRight, Sparkles
} from "lucide-react";

import {
  therapyFilters,
  dosageFilters,
  allProducts,
  therapyColorMap,
} from "@/utils/utils";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function getTherapyLabel(id) {
  return therapyFilters.find((f) => f.id === id)?.label ?? id;
}

function getDosageLabel(id) {
  return dosageFilters.find((f) => f.id === id)?.label ?? id;
}

// ─── BROCHURE BUTTON ─────────────────────────────────────────────────────────
function BrochureButton({ iconOnly = false }) {
  return (
    <a
      href="/product/products.pdf"
      download="Natura_Product_Catalogue.pdf"
      onClick={ (e) => e.stopPropagation() }
      className={
        iconOnly
          ? "p-2.5 rounded-xl bg-[#2A5C32] hover:bg-[#1a3c22] active:scale-95 transition-all text-white flex items-center justify-center"
          : "flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl bg-[#2A5C32] hover:bg-[#1a3c22] hover:shadow-md hover:shadow-[#2A5C32]/20 active:scale-95 transition-all duration-200 text-white"
      }
    >
      <Download size={ iconOnly ? 16 : 13 } />
      { !iconOnly && "Brochure" }
    </a>
  );
}

// ─── PRODUCT CARD (GRID) ──────────────────────────────────────────────────────
function ProductCardGrid({ product }) {
  const colors = therapyColorMap[product.therapy] ?? { bg: "#f0f7f1", text: "#2A5C32", dot: "#4caf50" };
  const TherapyIcon = therapyFilters.find((f) => f.id === product.therapy)?.icon;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full overflow-hidden relative">
      {/* top accent bar */}
      <div
        className="h-1 w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={ { backgroundColor: colors.dot } }
      />

      {/* Image OR icon area */}
      { product.image ? (
        <div className="relative h-44 overflow-hidden shrink-0">
          <img
            src={ product.image }
            alt={ product.name }
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          { product.tag && (
            <span
              className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm z-10"
              style={ { backgroundColor: product.tagColor ?? "#2A5C32" } }
            >
              { product.tag }
            </span>
          ) }
        </div>
      ) : null }

      <div className="p-5 flex flex-col flex-1 mt-0.5">
        {/* Header row — only show icon+tag when no image */}
        { !product.image && (
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300"
              style={ { backgroundColor: colors.bg } }
            >
              { TherapyIcon && (
                <TherapyIcon size={ 18 } style={ { color: colors.text } } className="group-hover:scale-110 transition-transform" />
              ) }
            </div>
            { product.tag && (
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm"
                style={ { backgroundColor: product.tagColor ?? "#2A5C32" } }
              >
                { product.tag }
              </span>
            ) }
          </div>
        ) }

        {/* Name & generic */}
        <h3
          className="font-bold text-base text-gray-900 mb-0.5 group-hover:text-[#2A5C32] transition-colors leading-snug"
          style={ { fontFamily: "'Montserrat', sans-serif" } }
        >
          { product.name }
        </h3>
        <div className="text-[11px] text-gray-400 font-medium mb-3">{ product.genericName }</div>

        {/* Description */}
        <p className="text-[13px] text-gray-500 leading-relaxed mb-5 line-clamp-2 flex-1">
          { product.description }
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span
            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg"
            style={ { backgroundColor: colors.bg, color: colors.text } }
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={ { backgroundColor: colors.dot } }
            />
            { getTherapyLabel(product.therapy) }
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-100">
            <Package size={ 11 } />
            { product.packaging }
          </span>
        </div>

        {/* Dosage badge */}
        <div className="text-[11px] text-gray-400 mb-5 capitalize">
          Form: <span className="font-semibold text-gray-700">{ getDosageLabel(product.dosageForm) }</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-auto pt-4 border-t border-gray-100">
          <button
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl border-2 border-transparent hover:border-[#2A5C32]/10 bg-[#f0f7f1] hover:bg-[#e4efe5] active:scale-95 transition-all duration-200"
            style={ { color: "#2A5C32" } }
          >
            <Eye size={ 13 } /> Details
          </button>
          <BrochureButton />
        </div>
      </div>
    </div>
  );
}


// ─── PRODUCT CARD (LIST) ──────────────────────────────────────────────────────
function ProductCardList({ product }) {
  const colors = therapyColorMap[product.therapy] ?? { bg: "#f0f7f1", text: "#2A5C32", dot: "#4caf50" };
  const TherapyIcon = therapyFilters.find((f) => f.id === product.therapy)?.icon;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group flex items-center gap-5 p-5 overflow-hidden relative">
      <div
        className="w-0.5 self-stretch rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={ { backgroundColor: colors.dot } }
      />

      {/* Icon */ }
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={ { backgroundColor: colors.bg } }
      >
        { TherapyIcon && <TherapyIcon size={ 20 } style={ { color: colors.text } } /> }
      </div>

      {/* Content */ }
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3
              className="font-bold text-base text-gray-900 group-hover:text-[#2A5C32] transition-colors"
              style={ { fontFamily: "'Montserrat', sans-serif" } }
            >
              { product.name }
              { product.tag && (
                <span
                  className="ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                  style={ { backgroundColor: product.tagColor ?? "#2A5C32" } }
                >
                  { product.tag }
                </span>
              ) }
            </h3>
            <div className="text-xs text-gray-400 mb-1">{ product.genericName }</div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
              style={ { backgroundColor: colors.bg, color: colors.text } }
            >
              { getTherapyLabel(product.therapy) }
            </span>
            <span className="text-[11px] text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg">
              { product.packaging }
            </span>
          </div>
        </div>
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-1 mt-1">
          { product.description }
        </p>
      </div>

      {/* Actions */ }
      <div className="flex items-center gap-2 shrink-0 ml-2">
        <button className="p-2.5 rounded-xl bg-[#f0f7f1] hover:bg-[#e4efe5] active:scale-95 transition-all" style={ { color: "#2A5C32" } }>
          <Eye size={ 16 } />
        </button>
        <BrochureButton iconOnly />
        <ChevronRight size={ 16 } className="text-gray-300 group-hover:text-[#2A5C32] group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
}

// ─── FILTER SIDEBAR CONTENT (reused in both desktop & mobile) ─────────────────
function FilterContent({ selectedTherapy, selectedDosage, toggleFilter, clearAll, hasFilters, therapyExpanded, setTherapyExpanded, dosageExpanded, setDosageExpanded }) {
  return (
    <>
      { hasFilters && (
        <button
          onClick={ clearAll }
          className="w-full flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-xl mb-5 bg-red-50 hover:bg-red-100 text-red-500 transition-colors active:scale-95"
        >
          <X size={ 14 } /> Clear All Filters
        </button>
      ) }

      {/* Therapy Filter */ }
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 shadow-sm">
        <button
          onClick={ () => setTherapyExpanded(!therapyExpanded) }
          className="flex items-center justify-between w-full mb-3 group"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-700 group-hover:text-[#2A5C32] transition-colors">
            Wellness Area
          </span>
          <ChevronDown size={ 15 } className={ `text-gray-400 transition-transform duration-200 ${therapyExpanded ? "rotate-180" : ""}` } />
        </button>
        { therapyExpanded && (
          <div className="space-y-0.5 max-h-[220px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            { therapyFilters.map((f) => {
              const active = selectedTherapy.includes(f.id);
              const colors = therapyColorMap[f.id] ?? { bg: "#f0f7f1", text: "#2A5C32", dot: "#4caf50" };
              return (
                <label
                  key={ f.id }
                  id={ f.id }
                  className={ `flex items-center justify-between gap-3 px-2.5 py-2 rounded-xl cursor-pointer transition-all ${active ? "bg-[#f0f7f1]" : "hover:bg-gray-50"}` }
                  onClick={ () => toggleFilter(f.id, "therapy") }
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={ `w-4 h-4 rounded-md flex items-center justify-center border-2 transition-all duration-200 shrink-0 ${active ? "border-[#2A5C32] bg-[#2A5C32]" : "border-gray-200 bg-white hover:border-[#2A5C32]"}` }
                    >
                      { active && (
                        <svg viewBox="0 0 10 8" className="w-2.5 fill-none stroke-white" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M1 4L4 7L9 1" />
                        </svg>
                      ) }
                    </div>
                    <f.icon size={ 13 } style={ { color: active ? colors.text : "#9ca3af" } } className="transition-colors shrink-0" />
                    <span className={ `text-[13px] ${active ? "font-semibold" : "text-gray-600"}` } style={ active ? { color: colors.text } : {} }>
                      { f.label }
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded-md shrink-0">
                    { f.count }
                  </span>
                </label>
              );
            }) }
          </div>
        ) }
      </div>

      {/* Dosage Form Filter */ }
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 shadow-sm">
        <button
          onClick={ () => setDosageExpanded(!dosageExpanded) }
          className="flex items-center justify-between w-full mb-3 group"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-700 group-hover:text-[#2A5C32] transition-colors">
            Product Form
          </span>
          <ChevronDown size={ 15 } className={ `text-gray-400 transition-transform duration-200 ${dosageExpanded ? "rotate-180" : ""}` } />
        </button>
        { dosageExpanded && (
          <div className="space-y-0.5 max-h-[220px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            { dosageFilters.map((f) => {
              const active = selectedDosage.includes(f.id);
              return (
                <label
                  key={ f.id }
                  id={ f.id }
                  className={ `flex items-center justify-between gap-3 px-2.5 py-2 rounded-xl cursor-pointer transition-all ${active ? "bg-blue-50" : "hover:bg-gray-50"}` }
                  onClick={ () => toggleFilter(f.id, "dosage") }
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={ `w-4 h-4 rounded-md flex items-center justify-center border-2 transition-all duration-200 shrink-0 ${active ? "border-blue-600 bg-blue-600" : "border-gray-200 bg-white hover:border-blue-400"}` }
                    >
                      { active && (
                        <svg viewBox="0 0 10 8" className="w-2.5 fill-none stroke-white" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M1 4L4 7L9 1" />
                        </svg>
                      ) }
                    </div>
                    <f.icon size={ 13 } className={ `${active ? "text-blue-600" : "text-gray-400"} shrink-0 transition-colors` } />
                    <span className={ `text-[13px] ${active ? "font-semibold text-blue-700" : "text-gray-600"}` }>
                      { f.label }
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded-md shrink-0">
                    { f.count }
                  </span>
                </label>
              );
            }) }
          </div>
        ) }
      </div>

      {/* Download CTA */ }
      <div
        className="rounded-2xl p-5 text-white shadow-lg relative overflow-hidden"
        style={ { background: "linear-gradient(135deg, #2A5C32 0%, #0f2415 100%)" } }
      >
        <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-0 -left-6 w-20 h-20 bg-white/5 rounded-full blur-lg" />
        <Package size={ 24 } className="text-green-300 mb-3 relative z-10" />
        <div className="font-bold text-base mb-1.5 relative z-10" style={ { fontFamily: "'Montserrat', sans-serif" } }>
          Export Catalogue
        </div>
        <p className="text-green-200/80 text-xs leading-relaxed mb-4 relative z-10">
          Complete product list with latest pricing and formulation details.
        </p>
        <a
          href="/product/products.pdf"
          download="Natura_Product_Catalogue.pdf"
          className="w-full bg-white text-sm font-bold py-2.5 rounded-xl hover:bg-green-50 active:scale-95 transition-all flex items-center justify-center gap-2 relative z-10"
          style={ { color: "#2A5C32" } }
        >
          <Download size={ 14 } /> Download PDF
        </a>
      </div>
    </>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Products() {
  const [selectedTherapy, setSelectedTherapy] = useState([]);
  const [selectedDosage, setSelectedDosage] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [therapyExpanded, setTherapyExpanded] = useState(true);
  const [dosageExpanded, setDosageExpanded] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");   // "grid" | "list"
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const searchRef = useRef(null);

  // hash-based filter
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      if (therapyFilters.some((f) => f.id === hash)) {
        setSelectedTherapy([hash]);
        setSelectedDosage([]);
      } else if (dosageFilters.some((f) => f.id === hash)) {
        setSelectedDosage([hash]);
        setSelectedTherapy([]);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  // body scroll lock when mobile filter open
  useEffect(() => {
    document.body.style.overflow = isMobileFiltersOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileFiltersOpen]);

  // keyboard shortcut – "/" to focus search
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggleFilter = (id, type) => {
    if (type === "therapy") {
      setSelectedTherapy((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
    } else {
      setSelectedDosage((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
    }
  };

  const clearAll = () => {
    setSelectedTherapy([]);
    setSelectedDosage([]);
    setSearchQuery("");
  };

  const hasFilters = selectedTherapy.length > 0 || selectedDosage.length > 0 || searchQuery.length > 0;
  const activeFilterCount = selectedTherapy.length + selectedDosage.length;

  const normalizedQuery = searchQuery.toLowerCase().replace(/\s+/g, "");

  const filtered = allProducts.filter((p) => {
    const matchTherapy = selectedTherapy.length === 0 || selectedTherapy.includes(p.therapy);
    const matchDosage = selectedDosage.length === 0 || selectedDosage.includes(p.dosageForm);
    const matchSearch = normalizedQuery === "" ||
      p.name.toLowerCase().replace(/\s+/g, "").includes(normalizedQuery) ||
      p.genericName.toLowerCase().replace(/\s+/g, "").includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery.toLowerCase());
    return matchTherapy && matchDosage && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "therapy") return a.therapy.localeCompare(b.therapy);
    if (sortBy === "dosage") return a.dosageForm.localeCompare(b.dosageForm);
    return 0;
  });

  const sidebarProps = {
    selectedTherapy, selectedDosage, toggleFilter, clearAll, hasFilters,
    therapyExpanded, setTherapyExpanded, dosageExpanded, setDosageExpanded,
  };

  return (
    <div className="bg-[#f7f9f7] min-h-screen" style={ { fontFamily: "'Inter', sans-serif" } }>

      {/* ── HERO ─────────────────────────────────────────────────── */ }
      <div className="relative bg-[#1a3c22] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440"
            className="w-full h-full object-cover opacity-15 mix-blend-overlay"
            alt="Natura Health Care Products Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c22] via-[#1a3c22]/95 to-[#1a3c22]/40" />
          {/* decorative dots */ }
          <div className="absolute inset-0 opacity-10" style={ {
            backgroundImage: "radial-gradient(circle, #4caf50 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          } } />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="flex items-center gap-1.5 text-sm text-green-300/80 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={ 14 } className="text-green-500/60" />
            <span className="text-white">Products</span>
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 tracking-tight"
            style={ { fontFamily: "'Montserrat', sans-serif" } }
          >
            Natura Health Care
            <span className="block text-green-300">Portfolio</span>
          </h1>
          <p className="text-green-100/80 max-w-xl text-base md:text-lg leading-relaxed font-light mb-8">
            300+ authentic Ayurvedic formulations — Asavas, Arishtas, Vatis, Churnas & more,
            crafted for holistic wellness.
          </p>
          {/* stat chips */ }
          <div className="flex flex-wrap gap-3">
            { [
              { label: "Products", value: "300+" },
              { label: "Therapy Areas", value: "12" },
              { label: "Product Forms", value: "9" },
              { label: "Years of Trust", value: "25+" },
            ].map((s) => (
              <div key={ s.label } className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-2.5 border border-white/10">
                <span className="text-lg font-extrabold text-white" style={ { fontFamily: "'Montserrat', sans-serif" } }>{ s.value }</span>
                <span className="text-xs text-green-200/70 font-medium">{ s.label }</span>
              </div>
            )) }
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */ }
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10 md:py-14">

        {/* Search + controls row */ }
        <div className="flex flex-col sm:flex-row gap-3 mb-8 items-stretch sm:items-center">
          {/* search */ }
          <div className="relative flex-1 max-w-xl group">
            <Search size={ 16 } className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A5C32] transition-colors pointer-events-none" />
            <input
              ref={ searchRef }
              type="text"
              value={ searchQuery }
              onChange={ (e) => setSearchQuery(e.target.value) }
              placeholder='Search products, herbs… (press "/" to focus)'
              className="w-full pl-11 pr-10 py-3.5 border-2 border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#2A5C32] focus:ring-4 focus:ring-[#2A5C32]/10 transition-all bg-white shadow-sm placeholder:text-gray-400"
            />
            { searchQuery && (
              <button
                onClick={ () => setSearchQuery("") }
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={ 13 } />
              </button>
            ) }
          </div>

          {/* view toggle */ }
          <div className="hidden sm:flex items-center bg-white rounded-2xl border-2 border-gray-200 p-1 gap-1 shadow-sm">
            <button
              onClick={ () => setViewMode("grid") }
              className={ `p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-[#2A5C32] text-white shadow-sm" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"}` }
            >
              <LayoutGrid size={ 16 } />
            </button>
            <button
              onClick={ () => setViewMode("list") }
              className={ `p-2.5 rounded-xl transition-all ${viewMode === "list" ? "bg-[#2A5C32] text-white shadow-sm" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"}` }
            >
              <List size={ 16 } />
            </button>
          </div>

          {/* mobile filter toggle */ }
          <button
            onClick={ () => setIsMobileFiltersOpen(true) }
            className="md:hidden flex items-center justify-center gap-2 px-5 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold shadow-sm active:scale-95 transition-all relative"
          >
            <SlidersHorizontal size={ 17 } className="text-[#2A5C32]" />
            Filters
            { activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#2A5C32] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                { activeFilterCount }
              </span>
            ) }
          </button>
        </div>

        <div className="flex gap-7 relative">

          {/* ── MOBILE BOTTOM-SHEET OVERLAY ── */ }
          { isMobileFiltersOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                onClick={ () => setIsMobileFiltersOpen(false) }
              />
              <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#f7f9f7] rounded-t-3xl shadow-2xl overflow-hidden"
                style={ { maxHeight: "82vh" } }
              >
                {/* drag handle */ }
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 bg-gray-300 rounded-full" />
                </div>
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                  <h2 className="font-bold text-lg text-gray-900" style={ { fontFamily: "'Montserrat', sans-serif" } }>
                    Filters
                    { activeFilterCount > 0 && (
                      <span className="ml-2 text-xs bg-[#2A5C32] text-white px-2 py-0.5 rounded-full">{ activeFilterCount }</span>
                    ) }
                  </h2>
                  <button
                    onClick={ () => setIsMobileFiltersOpen(false) }
                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
                  >
                    <X size={ 16 } />
                  </button>
                </div>
                <div className="overflow-y-auto p-5" style={ { maxHeight: "calc(82vh - 80px)" } }>
                  <FilterContent { ...sidebarProps } />
                </div>
                <div className="p-4 border-t border-gray-100 bg-white">
                  <button
                    onClick={ () => setIsMobileFiltersOpen(false) }
                    className="w-full bg-[#2A5C32] text-white font-bold py-3.5 rounded-2xl hover:bg-[#1a3c22] active:scale-95 transition-all"
                  >
                    Show { sorted.length } Results
                  </button>
                </div>
              </div>
            </>
          ) }

          {/* ── DESKTOP SIDEBAR ──────────────────────────────────── */}
          <aside className="hidden md:flex flex-col w-64 shrink-0">
            <div
              className="sticky top-0 overflow-y-auto space-y-0
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                hover:[&::-webkit-scrollbar-thumb]:bg-[#2A5C32]/40"
              style={{ maxHeight: "100vh", paddingBottom: "2rem" }}
            >
              <FilterContent { ...sidebarProps } />
            </div>
          </aside>

          {/* ── PRODUCTS GRID ─────────────────────────────────────── */ }
          <div className="flex-1 min-w-0">

            {/* Toolbar */ }
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3 bg-white px-5 py-3.5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-sm text-gray-500">
                <span className="font-bold text-gray-900 text-lg">{ sorted.length }</span>
                <span className="ml-1">products{ hasFilters ? " found" : " in catalogue" }</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 hidden sm:block">Sort:</span>
                <select
                  value={ sortBy }
                  onChange={ (e) => setSortBy(e.target.value) }
                  className="text-sm font-medium border-2 border-gray-100 rounded-xl px-4 py-2 text-gray-800 focus:outline-none focus:border-[#2A5C32] focus:ring-2 focus:ring-[#2A5C32]/10 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <option value="name">Name (A–Z)</option>
                  <option value="therapy">Wellness Area</option>
                  <option value="dosage">Product Form</option>
                </select>
              </div>
            </div>

            {/* Active filter chips */ }
            { hasFilters && (
              <div className="flex items-center gap-2 flex-wrap mb-5">
                <span className="text-xs font-semibold text-gray-400">Active:</span>
                { selectedTherapy.map((id) => {
                  const f = therapyFilters.find((x) => x.id === id);
                  const cl = therapyColorMap[id] ?? { bg: "#f0f7f1", text: "#2A5C32" };
                  return f ? (
                    <span
                      key={ id }
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold border shadow-sm"
                      style={ { backgroundColor: cl.bg, color: cl.text, borderColor: cl.dot + "40" } }
                    >
                      { f.label }
                      <button onClick={ () => toggleFilter(id, "therapy") } className="rounded-full p-0.5 hover:bg-black/10 transition-colors">
                        <X size={ 11 } />
                      </button>
                    </span>
                  ) : null;
                }) }
                { selectedDosage.map((id) => {
                  const f = dosageFilters.find((x) => x.id === id);
                  return f ? (
                    <span key={ id } className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-semibold shadow-sm">
                      { f.label }
                      <button onClick={ () => toggleFilter(id, "dosage") } className="rounded-full p-0.5 hover:bg-blue-200 transition-colors">
                        <X size={ 11 } />
                      </button>
                    </span>
                  ) : null;
                }) }
                { searchQuery && (
                  <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-600 font-semibold shadow-sm">
                    "{ searchQuery }"
                    <button onClick={ () => setSearchQuery("") } className="rounded-full p-0.5 hover:bg-gray-300 transition-colors">
                      <X size={ 11 } />
                    </button>
                  </span>
                ) }
                <button onClick={ clearAll } className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors underline underline-offset-2">
                  Clear all
                </button>
              </div>
            ) }

            {/* No results */ }
            { sorted.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={ 30 } className="text-gray-300" />
                </div>
                <div className="text-xl font-bold text-gray-800 mb-2" style={ { fontFamily: "'Montserrat', sans-serif" } }>
                  No products found
                </div>
                <p className="text-gray-400 mb-6 text-sm">Try adjusting your filters or search query.</p>
                <button
                  onClick={ clearAll }
                  className="px-6 py-2.5 bg-[#f0f7f1] text-[#2A5C32] font-semibold rounded-xl hover:bg-[#e4efe5] active:scale-95 transition-all text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                { sorted.map((p) => <ProductCardGrid key={ p.id } product={ p } />) }
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                { sorted.map((p) => <ProductCardList key={ p.id } product={ p } />) }
              </div>
            ) }

            {/* Footer CTA */ }
            { sorted.length > 0 && (
              <div className="text-center mt-14 pb-6">
                <p className="text-sm text-gray-400 mb-6">
                  Showing <span className="font-semibold text-gray-600">{ sorted.length }</span> of 300+ products in our portfolio.
                </p>
                <Link href="/contact">

                  <div className="inline-flex items-center gap-2 border-2 border-[#2A5C32] text-[#2A5C32] font-bold px-8 py-3.5 rounded-2xl transition-all duration-300 hover:bg-[#2A5C32] hover:text-white hover:shadow-lg hover:shadow-[#2A5C32]/25 group cursor-pointer">
                    Request Full Catalogue
                    <ArrowRight size={ 16 } className="transition-transform group-hover:translate-x-1" />
                  </div>

                </Link>
              </div>
            ) }
          </div>
        </div>
      </div>
    </div>
  );
}