'use client';

import { useState, useEffect } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PopupBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      // Check if user has seen it before (optional, but good practice)
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 text-gray-600 hover:bg-black/20 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Image/Graphic Header */}
        <div className="relative h-48 w-full bg-[#1a3c22] overflow-hidden">
          <img loading="lazy" decoding="async"
            src="https://images.unsplash.com/photo-1581056771085-3ce30d907416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
            alt="New Facility"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c22] to-transparent"></div>
          <div className="absolute bottom-4 left-6 flex items-center gap-2 text-green-300 font-bold tracking-widest text-xs uppercase">
            <Sparkles size={14} /> Breaking News
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            New WHO-GMP Certified Facility Now Operational
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We are thrilled to announce the opening of our state-of-the-art injectable manufacturing plant in Gujarat, expanding our global production capacity by 40%.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link
              href="/media"
              onClick={() => setIsOpen(false)}
              className="w-full md:w-auto inline-flex justify-center items-center gap-2 text-white font-semibold px-6 py-3 rounded-full transition-transform hover:scale-105"
              style={{ backgroundColor: "#2A5C32" }}
            >
              Read Full Press Release <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full md:w-auto text-center text-sm font-medium text-gray-500 hover:text-gray-800"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
