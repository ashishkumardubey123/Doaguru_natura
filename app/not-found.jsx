"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, Leaf, MapPinOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f8fafc] overflow-hidden px-4">
      {/* Background Decorative Elements */ }
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={ { y: [0, -20, 0], rotate: [0, 10, 0] } }
          transition={ { duration: 5, repeat: Infinity, ease: "easeInOut" } }
          className="absolute top-[10%] left-[15%] text-[#2A5C32]/10"
        >
          <Leaf size={ 120 } />
        </motion.div>
        <motion.div
          animate={ { y: [0, 20, 0], rotate: [0, -15, 0] } }
          transition={ { duration: 7, repeat: Infinity, ease: "easeInOut" } }
          className="absolute bottom-[10%] right-[10%] text-[#2A5C32]/10"
        >
          <Leaf size={ 160 } />
        </motion.div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#edf6ee] rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#f1f8f1] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Animated 404 Section */ }
        <motion.div
          initial={ { opacity: 0, y: 20 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { duration: 0.6 } }
          className="relative mb-2"
        >
          <motion.h1
            animate={ { y: [0, -10, 0] } }
            transition={ { duration: 4, repeat: Infinity, ease: "easeInOut" } }
            className="text-[9rem] sm:text-[12rem] font-black leading-none select-none tracking-tighter"
            style={ {
              fontFamily: "'Montserrat', sans-serif",
              background: "linear-gradient(135deg, #2A5C32 20%, #4caf50 50%, #1a3c22 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 20px 30px rgba(42, 92, 50, 0.15))"
            } }
          >
            404
          </motion.h1>

          <motion.div
            initial={ { scale: 0 } }
            animate={ { scale: 1 } }
            transition={ { delay: 0.5, type: "spring" } }
            className="absolute -right-2 top-1/2 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 rotate-12"
          >
            <MapPinOff className="text-[#2A5C32]" size={ 32 } />
          </motion.div>
        </motion.div>

        {/* Text Content */ }
        <motion.div
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          transition={ { delay: 0.3 } }
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 tracking-tight">
            Oops! You've wandered off the trail.
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-10 max-w-md mx-auto">
            The page you are looking for has been moved or doesn't exist.
            Let's get you back to where things are growing!
          </p>
        </motion.div>

        {/* Action Buttons */ }
        <motion.div
          initial={ { opacity: 0, y: 10 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { delay: 0.5 } }
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 bg-[#2A5C32] text-white font-bold px-8 py-4 rounded-2xl overflow-hidden transition-all hover:pr-10 active:scale-95"
          >
            <Home size={ 18 } />
            <span>Return Home</span>
            <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all">→</span>
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white border-2 border-gray-100 text-gray-700 font-bold px-8 py-4 rounded-2xl hover:border-[#2A5C32] hover:text-[#2A5C32] transition-all active:scale-95 shadow-sm"
          >
            <Search size={ 18 } />
            Browse Products
          </Link>
        </motion.div>

        {/* Back Button */ }
        <motion.button
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          transition={ { delay: 0.8 } }
          onClick={ () => window.history.back() }
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#2A5C32] transition-colors group"
        >
          <ArrowLeft size={ 16 } className="group-hover:-translate-x-1 transition-transform" />
          Go back to previous page
        </motion.button>
      </div>
    </div>
  );
}