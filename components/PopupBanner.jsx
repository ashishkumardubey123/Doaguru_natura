'use client';

import { useState, useEffect } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PopupBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
      if (!hasSeenPopup) {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenPopup", "true");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#020b06]/60 backdrop-blur-md animate-in fade-in duration-500">
      <div 
        className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl shadow-black/40 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 border border-white/20"
      >
        {/* ── Floating Glass Close Button ── */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white transition-all duration-300 shadow-lg active:scale-90"
          aria-label="Close popup"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {/* ── Image/Graphic Header ── */}
        <div className="relative h-56 w-full bg-[#04150d] overflow-hidden group">
          <img 
            loading="lazy" 
            decoding="async"
                src="https://images.unsplash.com/photo-1581056771085-3ce30d907416?auto=format&fit=crop&w=800&q=80"
            alt="New Facility"
            className="w-full h-full object-cover opacity-70 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
          />
          {/* Deep cinematic gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020b06] via-transparent to-black/30"></div>
          
          {/* Glowing Badge */}
          <div className="absolute bottom-5 left-6 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <Sparkles size={13} className="text-emerald-300" /> 
            <span className="text-emerald-300 font-extrabold tracking-[0.15em] text-[10px] uppercase mt-0.5">
              Breaking News
            </span>
          </div>
        </div>

        {/* ── Content Section ── */}
        <div className="p-8 sm:p-10">
          <h3 
            className="text-[22px] sm:text-[26px] font-extrabold text-gray-900 leading-tight mb-3.5 tracking-tight" 
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            New WHO-GMP Certified Facility Now Operational
          </h3>
          <p className="text-[14px] text-gray-500 mb-8 leading-relaxed font-light">
            We are thrilled to announce the opening of our state-of-the-art injectable manufacturing plant in Gujarat, expanding our global production capacity by <strong className="font-semibold text-gray-700">40%</strong>.
          </p>
          
          {/* ── Action Buttons ── */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/media"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[#1a3c22] text-white text-[14px] font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:bg-[#234e2a] hover:shadow-xl hover:shadow-[#2A5C32]/20 active:scale-95"
            >
              Read Full Press Release <ArrowRight size={16} />
            </Link>
            
            <button
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto text-center text-[13px] font-bold text-gray-400 hover:text-gray-800 transition-colors py-2 px-4 rounded-full hover:bg-gray-50 active:bg-gray-100"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}