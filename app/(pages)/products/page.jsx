'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Search, ChevronDown, X, Package,
  Eye, Download, Tag, ArrowRight, SlidersHorizontal,
  LayoutGrid, List, ChevronRight, Sparkles
} from "lucide-react";

import {
  therapyFilters as defaultTherapyFilters,
  dosageFilters as defaultDosageFilters,
  therapyColorMap,
} from "@/utils/utils";
import { useProductContext } from "@/Context/ProductContext";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
// Custom hook to trigger fade-up animations when elements scroll into the viewport
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

// Helper: Retrieves the human-readable label for a given Therapy ID from dynamic filter data
function getTherapyLabel(filters, id) {
  return filters?.find((f) => f.id === id)?.label ?? id;
}

// Helper: Retrieves the human-readable label for a given Dosage form ID from dynamic filter data
function getDosageLabel(filters, id) {
  return filters?.find((f) => f.id === id)?.label ?? id;
}

// ─── BROCHURE BUTTON ─────────────────────────────────────────────────────────
// Reusable component that renders a direct download link for the product's PDF brochure
function BrochureButton({ iconOnly = false, fileUrl }) {
  return (
    <a
      href={fileUrl}
      download
      target="_blank"
      rel="noopener noreferrer"
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

 
// ─── PRODUCT CARD (for GRID view) ──────────────────────────────────────────────────────
// Card component optimized for a multi-column grid layout on larger screens
function ProductCardGrid({ product, onShowImage, therapyFilters, dosageFilters }) {
  const colors = therapyColorMap[product.therapy] ?? { bg: "#f0f7f1", text: "#2A5C32", dot: "#4caf50" };
  const TherapyIcon = therapyFilters?.find((f) => f.id === product.therapy)?.icon;
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-3xl border border-gray-100/80 hover:shadow-2xl hover:shadow-[#2A5C32]/10 transition-all duration-500 group flex flex-col h-full overflow-hidden relative ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* top ambient glow bar */}
      <div
        className="h-1.5 w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={ { background: `linear-gradient(90deg, ${colors.dot}, transparent)` } }
      />

      {/* Image OR icon area */}
      { product.image ? (
        <div className="relative h-52 overflow-hidden shrink-0 bg-gray-50/50">
          <img
            src={ product.image }
            alt={ product.name }
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          { product.tag && (
            <span
              className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl text-white shadow-sm z-10 backdrop-blur-md"
              style={ { backgroundColor: product.tagColor ?? "#2A5C32" } }
            >
              { product.tag }
            </span>
          ) }
        </div>
      ) : null }

      <div className="p-6 flex flex-col flex-1">
        {/* Header row — only show icon+tag when no image */}
        { !product.image && (
          <div className="flex items-start justify-between mb-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ring-4 ring-white shadow-sm"
              style={ { backgroundColor: colors.bg } }
            >
              { TherapyIcon && (
                <TherapyIcon size={ 20 } style={ { color: colors.text } } className="group-hover:scale-110 transition-transform duration-500" />
              ) }
            </div>
            { product.tag && (
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl text-white shadow-sm"
                style={ { backgroundColor: product.tagColor ?? "#2A5C32" } }
              >
                { product.tag }
              </span>
            ) }
          </div>
        ) }

        {/* Name & generic */}
        <h3
          className="font-extrabold text-lg text-gray-900 mb-1 group-hover:text-[#2A5C32] transition-colors leading-tight tracking-tight"
          style={ { fontFamily: "'Montserrat', sans-serif" } }
        >
          { product.name }
        </h3>
        <div className="text-xs text-gray-400 font-medium mb-4">{ product.genericName }</div>

        {/* Description */}
        <p className="text-[13px] text-gray-500 leading-relaxed mb-6 line-clamp-2 flex-1 font-light">
          { product.description }
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-sm border border-black/5"
            style={ { backgroundColor: colors.bg, color: colors.text } }
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 shadow-sm"
              style={ { backgroundColor: colors.dot } }
            />
            { getTherapyLabel(therapyFilters, product.therapy) }
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 shadow-sm">
            <Package size={ 12 } className="text-gray-400" />
            { product.packaging }
          </span>
        </div>

        {/* Dosage badge */}
        <div className="text-[11px] text-gray-400 mb-6 capitalize shrink-0 font-medium">
          Form: <span className="font-bold text-gray-700 ml-1">{ getDosageLabel(dosageFilters, product.dosageForm) }</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto pt-5 border-t border-gray-100/80">
          <button
            onClick={() => onShowImage(product)}
            className="flex-1 flex items-center justify-center gap-2 text-[13px] font-bold py-3 rounded-xl border border-gray-200/60 bg-gray-50/50 hover:bg-[#f0f7f1] hover:border-[#2A5C32]/20 active:scale-95 transition-all duration-300"
            style={ { color: "#2A5C32" } }
          >
            <Eye size={ 15 } /> Details
          </button>
          <BrochureButton fileUrl={product.brochure} />
        </div>
      </div>
    </div>
  );
}


// ─── PRODUCT CARD (For LIST View) ──────────────────────────────────────────────────────
// Card component optimized for a wide, horizontal list-style layout
function ProductCardList({ product, onShowImage, therapyFilters }) {
  const colors = therapyColorMap[product.therapy] ?? { bg: "#f0f7f1", text: "#2A5C32", dot: "#4caf50" };
  const TherapyIcon = therapyFilters?.find((f) => f.id === product.therapy)?.icon;
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div 
        ref={ref}
        className={`bg-white rounded-3xl border border-gray-100/80 hover:shadow-xl hover:shadow-[#2A5C32]/10 transition-all duration-500 group flex items-center gap-6 p-5 overflow-hidden relative ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={ { backgroundColor: colors.dot } }
      />

      {/* Icon */}
      { product.image ? (
        <div className="w-24 h-24 rounded-[28px] overflow-hidden shrink-0 ring-4 ring-white shadow-sm bg-gray-50">
          <img
            src={ product.image }
            alt={ product.name }
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      ) : (
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ring-4 ring-white shadow-sm"
          style={ { backgroundColor: colors.bg } }
        >
          { TherapyIcon && <TherapyIcon size={ 22 } style={ { color: colors.text } } className="group-hover:scale-110 transition-transform duration-500"/> }
        </div>
      ) }

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3
              className="font-extrabold text-lg text-gray-900 group-hover:text-[#2A5C32] transition-colors tracking-tight"
              style={ { fontFamily: "'Montserrat', sans-serif" } }
            >
              { product.name }
              { product.tag && (
                <span
                  className="ml-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-xl text-white shadow-sm align-middle"
                  style={ { backgroundColor: product.tagColor ?? "#2A5C32" } }
                >
                  { product.tag }
                </span>
              ) }
            </h3>
            <div className="text-xs text-gray-400 font-medium mb-1 pl-[1px]">{ product.genericName }</div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="inline-flex items-center text-[11px] font-bold px-3 py-1.5 rounded-xl border border-black/5"
              style={ { backgroundColor: colors.bg, color: colors.text } }
            >
              { getTherapyLabel(therapyFilters, product.therapy) }
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
               <Package size={ 12 } className="text-gray-400" />
              { product.packaging }
            </span>
          </div>
        </div>
        <p className="text-[14px] text-gray-500 leading-relaxed line-clamp-1 mt-2 font-light">
          { product.description }
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 shrink-0 ml-4 border-l border-gray-100 pl-6 py-2">
        <button onClick={() => onShowImage(product)} className="p-3 rounded-xl border border-gray-200/60 bg-gray-50 hover:bg-[#f0f7f1] active:scale-95 transition-all shadow-sm" style={ { color: "#2A5C32" } }>
          <Eye size={ 18 } />
        </button>
        <BrochureButton iconOnly fileUrl={product.brochure} />
      </div>
    </div>
  );
}

// ─── FILTER SIDEBAR CONTENT (reused in both desktop & mobile) ─────────────────
function FilterContent({ selectedTherapy, selectedDosage, toggleFilter, clearAll, hasFilters, therapyExpanded, setTherapyExpanded, dosageExpanded, setDosageExpanded, therapyFilters, dosageFilters }) {
  return (
    <div className="flex flex-col gap-5">
      { hasFilters && (
        <button
          onClick={ clearAll }
          className="w-full flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors active:scale-95 shadow-sm border border-red-100"
        >
          <X size={ 14 } /> Clear All Filters
        </button>
      ) }

      {/* Therapy Filter */}
      <div className="bg-white/90 backdrop-blur-3xl rounded-3xl border border-gray-100 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <button
          onClick={ () => setTherapyExpanded(!therapyExpanded) }
          className="flex items-center justify-between w-full mb-3 group outline-none"
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-gray-800 group-hover:text-[#2A5C32] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Wellness Area
          </span>
          <div className={`p-1 rounded-full transition-colors ${therapyExpanded ? "bg-[#2A5C32]/10 text-[#2A5C32]" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"}`}>
            <ChevronDown size={ 14 } className={ `transition-transform duration-300 ${therapyExpanded ? "rotate-180" : ""}` } />
          </div>
        </button>
        { therapyExpanded && (
           <div className="space-y-1 max-h-[250px] overflow-y-auto pr-2 mt-2
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-gray-200
              hover:[&::-webkit-scrollbar-thumb]:bg-[#2A5C32]/30">
            { therapyFilters.map((f) => {
              const active = selectedTherapy.includes(f.id);
              const colors = therapyColorMap[f.id] ?? { bg: "#f0f7f1", text: "#2A5C32", dot: "#4caf50" };
              return (
                <label
                  key={ f.id }
                  id={ f.id }
                  className={ `flex items-center justify-between gap-3 px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${active ? "bg-white shadow-sm ring-1 ring-black/5" : "hover:bg-gray-50/80 hover:shadow-sm"}` }
                  onClick={ () => toggleFilter(f.id, "therapy") }
                  style={active ? { backgroundColor: colors.bg } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={ `w-4 h-4 rounded-md flex items-center justify-center border-2 transition-all duration-300 shrink-0 ${active ? "border-transparent" : "border-gray-200 bg-white hover:border-[#2A5C32]/50"}` }
                      style={active ? { backgroundColor: colors.text } : {}}
                    >
                      { active && (
                        <svg viewBox="0 0 10 8" className="w-2.5 fill-none stroke-white" strokeWidth="2" strokeLinecap="round">
                          <path d="M1 4L4 7L9 1" strokeDasharray="12" strokeDashoffset="0" className="animate-[dash_0.3s_ease-out_forwards]" />
                        </svg>
                      ) }
                    </div>
                    <div className={`p-1.5 rounded-xl transition-colors ${active ? "bg-white/50" : "bg-white shadow-sm border border-gray-100"}`}>
                       <f.icon size={ 14 } style={ { color: active ? colors.text : "#9ca3af" } } className="transition-colors shrink-0" />
                    </div>
                    <span className={ `text-[13px] ${active ? "font-bold" : "text-gray-600 font-medium"}` } style={ active ? { color: colors.text } : {} }>
                      { f.label }
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 bg-white shadow-sm border border-gray-100/50 px-2 py-0.5 rounded-lg shrink-0">
                    { f.count }
                  </span>
                </label>
              );
            }) }
          </div>
        ) }
      </div>

      {/* Dosage Form Filter */}
      <div className="bg-white/90 backdrop-blur-3xl rounded-3xl border border-gray-100 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <button
          onClick={ () => setDosageExpanded(!dosageExpanded) }
          className="flex items-center justify-between w-full mb-3 group outline-none"
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-gray-800 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Product Form
          </span>
          <div className={`p-1 rounded-full transition-colors ${dosageExpanded ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"}`}>
            <ChevronDown size={ 14 } className={ `transition-transform duration-300 ${dosageExpanded ? "rotate-180" : ""}` } />
          </div>
        </button>
        { dosageExpanded && (
           <div className="space-y-1 max-h-[250px] overflow-y-auto pr-2 mt-2
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-gray-200
              hover:[&::-webkit-scrollbar-thumb]:bg-blue-200">
            { dosageFilters.map((f) => {
              const active = selectedDosage.includes(f.id);
              return (
                <label
                  key={ f.id }
                  id={ f.id }
                  className={ `flex items-center justify-between gap-3 px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${active ? "bg-blue-50 shadow-sm ring-1 ring-blue-100" : "hover:bg-gray-50/80 hover:shadow-sm"}` }
                  onClick={ () => toggleFilter(f.id, "dosage") }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={ `w-4 h-4 rounded-md flex items-center justify-center border-2 transition-all duration-300 shrink-0 ${active ? "border-blue-600 bg-blue-600" : "border-gray-200 bg-white hover:border-blue-400"}` }
                    >
                      { active && (
                        <svg viewBox="0 0 10 8" className="w-2.5 fill-none stroke-white" strokeWidth="2" strokeLinecap="round">
                          <path d="M1 4L4 7L9 1" strokeDasharray="12" strokeDashoffset="0" className="animate-[dash_0.3s_ease-out_forwards]" />
                        </svg>
                      ) }
                    </div>
                    <div className={`p-1.5 rounded-xl transition-colors ${active ? "bg-white/60 text-blue-600" : "bg-white text-gray-400 shadow-sm border border-gray-100"}`}>
                       <f.icon size={ 14 } className="transition-colors shrink-0" />
                    </div>
                    <span className={ `text-[13px] ${active ? "font-bold text-blue-700" : "font-medium text-gray-600"}` }>
                      { f.label }
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 bg-white shadow-sm border border-gray-100/50 px-2 py-0.5 rounded-lg shrink-0">
                    { f.count }
                  </span>
                </label>
              );
            }) }
          </div>
        ) }
      </div>

      {/* Download CTA */}
    
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
// Main entry point for the Products catalog page.
export default function Products() {
  // --- STATE DECLARATIONS ---
  // Global products data and loading state fetched from Context API
  const {
    productsData: allProducts,
    loading,
    therapyFilters: contextTherapyFilters,
    dosageFilters: contextDosageFilters,
  } = useProductContext();

  const therapyFilters = contextTherapyFilters?.length ? contextTherapyFilters : defaultTherapyFilters;
  const dosageFilters = contextDosageFilters?.length ? contextDosageFilters : defaultDosageFilters;

  // Active filter states for wellness area, product form, and text search
  const [selectedTherapy, setSelectedTherapy] = useState([]);
  const [selectedDosage, setSelectedDosage] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sidebar accordion toggle states
  const [therapyExpanded, setTherapyExpanded] = useState(true);
  const [dosageExpanded, setDosageExpanded] = useState(true);
  
  // Sorting and Display layout states
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");   // "grid" | "list"
  
  // Mobile overlay and Popup modal states
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedProductImage, setSelectedProductImage] = useState(null);
  
  // --- INFINITE SCROLL LOGIC ---
  // Infinite Scroll State - mapped to filter combinations
  // The resetKey ensures that infinite scroll resets its count when filters/search changes
  const ITEMS_PER_PAGE = 12;
  const resetKey = `${selectedTherapy.join()}-${selectedDosage.join()}-${searchQuery}-${sortBy}`;
  const [visibleCountMap, setVisibleCountMap] = useState({});

  const visibleCount = visibleCountMap[resetKey] ?? ITEMS_PER_PAGE;

  const searchRef = useRef(null);

  // --- LIFECYCLE / EFFECTS ---
  // hash-based filter: Allows linking directly to a specific filter category via URL (e.g. #tablets)
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
  }, [therapyFilters, dosageFilters]);

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


  // Pagination handler to load the next chunk of products
  const fetchMoreProducts = () => {
    setVisibleCountMap((prev) => ({
      ...prev,
      [resetKey]: (prev[resetKey] ?? ITEMS_PER_PAGE) + ITEMS_PER_PAGE,
    }));
  };

  // --- FILTER & SORT LOGIC ---
  // Toggles the selection of a specific filter category (Therapy or Dosage)
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

  // Derived state to quickly check if any filters are currently active/applied
  const hasFilters = selectedTherapy.length > 0 || selectedDosage.length > 0 || searchQuery.length > 0;
  const activeFilterCount = selectedTherapy.length + selectedDosage.length;

  const normalizedQuery = searchQuery.toLowerCase().replace(/\s+/g, "");

  // Client-side filtering logic: applies text search, therapy, and dosage form filters
  // A product is included in the 'filtered' list only if it matches ALL active criteria
  const filtered = (allProducts || []).filter((p) => {
    const matchTherapy = selectedTherapy.length === 0 || selectedTherapy.includes(p.therapy);
    const matchDosage = selectedDosage.length === 0 || selectedDosage.includes(p.dosageForm);
    const matchSearch = normalizedQuery === "" ||
      p.name.toLowerCase().replace(/\s+/g, "").includes(normalizedQuery) ||
      p.genericName.toLowerCase().replace(/\s+/g, "").includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery.toLowerCase());
    return matchTherapy && matchDosage && matchSearch;
  });

  // Client-side sorting logic: sorts the remaining filtered items
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "therapy") return a.therapy.localeCompare(b.therapy);
    if (sortBy === "dosage") return a.dosageForm.localeCompare(b.dosageForm);
    return 0;
  });

  // Consolidating props object for the Filter Sidebar component to keep JSX cleaner
  const sidebarProps = {
    selectedTherapy,
    selectedDosage,
    toggleFilter,
    clearAll,
    hasFilters,
    therapyExpanded,
    setTherapyExpanded,
    dosageExpanded,
    setDosageExpanded,
    therapyFilters,
    dosageFilters,
  };

  return (
    <div className="bg-[#f7f9f7] min-h-screen" style={ { fontFamily: "'Inter', sans-serif" } }>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div className="relative bg-[#020b06] text-white py-24 md:py-32 overflow-hidden">
        {/* Deep Green Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d522a]/40 via-[#0a1f0e]/80 to-[#020b06] z-0" />
        <div 
          className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        {/* Dynamic Glowing Orbs */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-emerald-500/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-[#1a3c22]/40 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-1.5 text-sm text-green-300/80 mb-8 font-medium">
              <Link href="/" className="hover:text-amber-400 transition-colors tracking-wide">Home</Link>
              <ChevronRight size={ 14 } className="text-green-500/60" />
              <span className="text-white/80 tracking-wide">Products</span>
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight"
              style={ { fontFamily: "'Montserrat', sans-serif" } }
            >
              Natura Health Care
              <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-emerald-100 to-white">
                Portfolio
              </span>
            </h1>
            <p className="text-green-100/70 text-lg md:text-xl leading-relaxed font-light mb-10 max-w-2xl">
              Over 300 authentic formulations — Asavas, Arishtas, Vatis, and Churnas. Crafted with absolute precision for holistic clinical wellness.
            </p>
            {/* sleek stat chips */}
            <div className="flex flex-wrap gap-4">
              { [
                { label: "Products", value: "300+" },
                { label: "Therapy Areas", value: "12" },
                { label: "Product Forms", value: "9" },
                { label: "Years of Trust", value: "25+" },
              ].map((s) => (
                <div key={ s.label } className="bg-white/5 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10 shadow-lg shadow-black/20 flex flex-col items-start gap-1">
                  <span className="text-2xl font-extrabold text-white" style={ { fontFamily: "'Montserrat', sans-serif" } }>{ s.value }</span>
                  <span className="text-[11px] uppercase tracking-wider text-green-200/60 font-semibold">{ s.label }</span>
                </div>
              )) }
            </div>
          </div>
          
          <div className="shrink-0 hidden lg:block">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 bg-[#2A5C32] rounded-full blur-[80px] opacity-50 animate-pulse"></div>
              <div className="relative w-full h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg flex items-center justify-center shadow-2xl">
                 <Package size={ 48 } className="text-green-300/80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */ }
      {/* ── STICKY SEARCH BAR ──────────────────────────────────────── */}
      <div className="sticky top-[108px] z-30 bg-white/70 backdrop-blur-3xl border-b border-[#2A5C32]/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* search */}
            <div className="relative flex-1 max-w-2xl group">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A5C32] transition-colors pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search products, wellness areas… (press "/" to focus)'
                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-full text-sm font-medium focus:outline-none focus:border-[#2A5C32] focus:ring-4 focus:ring-[#2A5C32]/10 transition-all bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] placeholder:text-gray-400 hover:border-gray-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Grid / List toggle */}
              <div className="hidden sm:flex items-center bg-white rounded-full border border-gray-200 p-1.5 gap-1 shadow-[0_4px_15px_rgba(0,0,0,0.02)]">
                <div className={`rounded-full transition-all overflow-hidden ${viewMode === "grid" ? "bg-[#2A5C32] text-white shadow-md shadow-[#2A5C32]/30" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"}`}>
                  <button
                    onClick={() => setViewMode("grid")}
                    className="px-5 py-2.5 flex items-center justify-center gap-2 bg-transparent outline-none font-semibold text-xs tracking-wide"
                  >
                    <LayoutGrid size={15} /> Grid
                  </button>
                </div>
                <div className={`rounded-full transition-all overflow-hidden ${viewMode === "list" ? "bg-[#2A5C32] text-white shadow-md shadow-[#2A5C32]/30" : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"}`}>
                  <button
                    onClick={() => setViewMode("list")}
                    className="px-5 py-2.5 flex items-center justify-center gap-2 bg-transparent outline-none font-semibold text-xs tracking-wide"
                  >
                    <List size={15} /> List
                  </button>
                </div>
              </div>

              {/* mobile filter toggle */}
              <div className="md:hidden flex-1 bg-white border border-gray-200 text-gray-700 rounded-full font-bold shadow-[0_4px_15px_rgba(0,0,0,0.02)] active:scale-95 transition-all relative">
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="w-full h-full flex items-center justify-center gap-2 px-6 py-4 bg-transparent outline-none text-sm"
                >
                  <SlidersHorizontal size={18} className="text-[#2A5C32]" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2A5C32] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* ── MAIN CONTENT ──────────────────────────────────────────── */}
<div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10 md:py-14">
  <div className="flex gap-7 relative">

    {/* ── MOBILE BOTTOM-SHEET OVERLAY ── */}
    {isMobileFiltersOpen && (
      <>
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileFiltersOpen(false)}
        />
        <div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#f7f9f7] rounded-t-3xl shadow-2xl overflow-hidden"
          style={{ maxHeight: "82vh" }}
        >
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 text-xs bg-[#2A5C32] text-white px-2 py-0.5 rounded-full">{activeFilterCount}</span>
              )}
            </h2>
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <div className="overflow-y-auto p-5" style={{ maxHeight: "calc(82vh - 80px)" }}>
            <FilterContent {...sidebarProps} />
          </div>
          <div className="p-4 border-t border-gray-100 bg-white">
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full bg-[#2A5C32] text-white font-bold py-3.5 rounded-2xl hover:bg-[#1a3c22] active:scale-95 transition-all"
            >
              Show {sorted.length} Results
            </button>
          </div>
        </div>
      </>
    )}

    {/* ── DESKTOP SIDEBAR ──────────────────────────────────── */}
    <aside className="hidden md:flex flex-col w-[280px] shrink-0">
      <div
       className="sticky top-[200px] overflow-y-auto space-y-0
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          hover:[&::-webkit-scrollbar-thumb]:bg-[#2A5C32]/40"
       style={{ maxHeight: "calc(100vh - 200px)", paddingBottom: "2rem" }}
      >
        <FilterContent {...sidebarProps} />
      </div>
    </aside>

    {/* ── PRODUCTS GRID ─────────────────────────────────────── */}
    <div className="flex-1 min-w-0">

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3 bg-white px-5 py-3.5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="text-sm text-gray-500">
          <span className="font-bold text-gray-900 text-lg">{sorted.length}</span>
          <span className="ml-1">products{hasFilters ? " found" : " in catalogue"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 hidden sm:block">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm font-medium border-2 border-gray-100 rounded-xl px-4 py-2 text-gray-800 focus:outline-none focus:border-[#2A5C32] focus:ring-2 focus:ring-[#2A5C32]/10 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer"
          >
            <option value="name">Name (A–Z)</option>
            <option value="therapy">Wellness Area</option>
            <option value="dosage">Product Form</option>
          </select>
        </div>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex items-center gap-2 flex-wrap mb-5">
          <span className="text-xs font-semibold text-gray-400">Active:</span>
          {selectedTherapy.map((id) => {
            const f = therapyFilters.find((x) => x.id === id);
            const cl = therapyColorMap[id] ?? { bg: "#f0f7f1", text: "#2A5C32" };
            return f ? (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold border shadow-sm"
                style={{ backgroundColor: cl.bg, color: cl.text, borderColor: cl.dot + "40" }}
              >
                {f.label}
                <button onClick={() => toggleFilter(id, "therapy")} className="rounded-full p-0.5 hover:bg-black/10 transition-colors">
                  <X size={11} />
                </button>
              </span>
            ) : null;
          })}
          {selectedDosage.map((id) => {
            const f = dosageFilters.find((x) => x.id === id);
            return f ? (
              <span key={id} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-semibold shadow-sm">
                {f.label}
                <button onClick={() => toggleFilter(id, "dosage")} className="rounded-full p-0.5 hover:bg-blue-200 transition-colors">
                  <X size={11} />
                </button>
              </span>
            ) : null;
          })}
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-600 font-semibold shadow-sm">
              &quot;{searchQuery}&quot;
              <button onClick={() => setSearchQuery("")} className="rounded-full p-0.5 hover:bg-gray-300 transition-colors">
                <X size={11} />
              </button>
            </span>
          )}
          <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors underline underline-offset-2">
            Clear all
          </button>
        </div>
      )}

      {/* No results or Loading */}
      {loading ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#2A5C32]/20 border-t-[#2A5C32] rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading products from backend...</p>
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles size={30} className="text-gray-300" />
          </div>
          <div className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            No products found
          </div>
          <p className="text-gray-400 mb-6 text-sm">Try adjusting your filters or search query.</p>
          <button
            onClick={clearAll}
            className="px-6 py-2.5 bg-[#f0f7f1] text-[#2A5C32] font-semibold rounded-xl hover:bg-[#e4efe5] active:scale-95 transition-all text-sm"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={visibleCount}
          next={fetchMoreProducts}
          hasMore={visibleCount < sorted.length}
          loader={
            <div className="col-span-full flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-[#2A5C32]/20 border-t-[#2A5C32] rounded-full animate-spin" />
            </div>
          }
          endMessage={
            <p className="col-span-full text-center py-10 text-gray-400 text-sm italic">
              You have seen all products.
            </p>
          }
          className="overflow-hidden"
        >
          {/* Main List/Grid View Rendering: checks 'viewMode' state to decide which Card component to use */}
          {viewMode === "grid" ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {sorted.slice(0, visibleCount).map((p) => (
                <ProductCardGrid
                  key={p.id}
                  product={p}
                  therapyFilters={therapyFilters}
                  dosageFilters={dosageFilters}
                  onShowImage={setSelectedProductImage}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {sorted.slice(0, visibleCount).map((p) => (
                <ProductCardList
                  key={p.id}
                  product={p}
                  therapyFilters={therapyFilters}
                  onShowImage={setSelectedProductImage}
                />
              ))}
            </div>
          )}
        </InfiniteScroll>
      )}

      {/* Footer CTA */}
      {/* Provides a clear next step (contacting sales) after browsing the catalog */}
      {sorted.length > 0 && (
        <div className="text-center mt-14 pb-6">
          <p className="text-sm text-gray-400 mb-6">
            Showing <span className="font-semibold text-gray-600">{sorted.length}</span> of 300+ products in our portfolio.
          </p>
          <Link href="/contact">
            <div className="inline-flex items-center gap-2 border-2 border-[#2A5C32] text-[#2A5C32] font-bold px-8 py-3.5 rounded-2xl transition-all duration-300 hover:bg-[#2A5C32] hover:text-white hover:shadow-lg hover:shadow-[#2A5C32]/25 group cursor-pointer">
              Request Full Catalogue
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      )}

    </div>
  </div>
</div>

      {/* ── IMAGE MODAL ──────────────────────────────────────────── */}
      {selectedProductImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020b06]/80 backdrop-blur-xl p-4 md:p-10 transition-all duration-500"
          onClick={() => setSelectedProductImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] transform translate-y-0 opacity-100 transition-all"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "fadeInUp 0.4s ease-out forwards" }}
          >
            <button 
              onClick={() => setSelectedProductImage(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 z-10"
            >
              <X size={24} />
            </button>
            
            <div className="flex-1 w-full bg-white/5 rounded-3xl p-6 flex items-center justify-center min-h-[300px]">
              {selectedProductImage.image ? (
                <img 
                  src={selectedProductImage.image} 
                  alt={selectedProductImage.name}
                  className="w-full max-h-[60vh] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white/30">
                  <Package size={80} className="mb-4 opacity-50 stroke-[1]" />
                  <p className="text-xl font-light">Image temporarily unavailable</p>
                </div>
              )}
            </div>

            <div className="flex-1 w-full text-left md:pr-4">
               <span
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 shadow-lg shadow-black/20"
                style={ { backgroundColor: selectedProductImage.tagColor ?? "#2A5C32", color: "white" } }
              >
                {selectedProductImage.tag || "Natura Certified"}
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-2 leading-tight tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {selectedProductImage.name}
              </h3>
              <p className="text-lg text-green-300/80 font-medium mb-6 tracking-wide">{selectedProductImage.genericName}</p>
              
              <div className="h-px bg-white/10 w-full mb-6 relative">
                 <div className="absolute top-0 left-0 h-px bg-gradient-to-r from-emerald-500 to-transparent w-1/3"></div>
              </div>

              <p className="text-green-100/60 leading-relaxed font-light mb-8">
                {selectedProductImage.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                   <div className="text-[10px] text-green-200/50 uppercase tracking-widest font-semibold mb-1.5">Wellness Area</div>
                   <div className="text-white font-bold text-sm">{getTherapyLabel(therapyFilters, selectedProductImage.therapy)}</div>
                </div>
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                   <div className="text-[10px] text-green-200/50 uppercase tracking-widest font-semibold mb-1.5">Packaging</div>
                   <div className="text-white font-bold text-sm">
                      {selectedProductImage.packaging} &bull; {getDosageLabel(dosageFilters, selectedProductImage.dosageForm)}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}