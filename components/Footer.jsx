'use client';

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight, Leaf } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer style={ { backgroundColor: "#0f2415", fontFamily: "'Inter', sans-serif" } } className="text-white">
      {/* Top accent bar */ }
      <div style={ { backgroundColor: "#2A5C32" } } className="h-1" />

      <div className="max-w-[1440px] mx-auto px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */ }
          <div className="lg:col-span-2 pr-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={ { backgroundColor: "#2A5C32" } }>
                <Leaf size={ 20 } fill="white" className="text-white" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight" style={ { fontFamily: "'Montserrat', sans-serif" } }>Natura Health Care</div>
                <div className="text-xs tracking-widest uppercase text-green-400">Global Pharmaceuticals</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Committed to improving global health through the development, manufacturing, and distribution of high-quality pharmaceutical products across 50+ countries.
            </p>
            <div className="flex gap-3 mb-8">
              { [Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={ i }
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2A5C32] transition-all border border-gray-700"
                >
                  <Icon size={ 15 } />
                </a>
              )) }
            </div>
            {/* Certifications */ }
            <div className="flex flex-wrap gap-2">
              { ["WHO-GMP", "ISO 9001:2015", "USFDA", "EU GMP", "ISO 14001"].map((cert) => (
                <span
                  key={ cert }
                  className="text-[10px] font-bold px-2.5 py-1 rounded border border-green-800 text-green-400 tracking-wider uppercase"
                >
                  { cert }
                </span>
              )) }
            </div>
          </div>

          {/* Quick Links */ }
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-green-400 mb-5">Company</h4>
            <ul className="space-y-3">
              { [
                { label: "About Us", path: "/about" },
                { label: "Our Products", path: "/products" },
                { label: "Manufacturing", path: "/manufacturing" },
                { label: "Who We Serve", path: "/who-we-serve" },
                { label: "Global Presence", path: "/global-presence" },
                { label: "Corporate Governance", path: "/investors" },
              ].map((item) => (
                <li key={ item.label }>
                  <Link href={ item.path } className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
                    <ArrowRight size={ 11 } className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400" />
                    { item.label }
                  </Link>
                </li>
              )) }
            </ul>
          </div>

          {/* Investors & Media */ }
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-green-400 mb-5">Investors & Media</h4>
            <ul className="space-y-3">
              { [
                { label: "Annual Reports", path: "/investors#reports" },
                { label: "Press Releases", path: "/investors#press" },
                { label: "Financial Results", path: "/investors#financials" },
                { label: "Image Gallery", path: "/investors#gallery" },
                { label: "Media Contact", path: "/contact" },
              ].map((item) => (
                <li key={ item.label }>
                  <Link href={ item.path } className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
                    <ArrowRight size={ 11 } className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400" />
                    { item.label }
                  </Link>
                </li>
              )) }
            </ul>
          </div>

          {/* Contact + Newsletter */ }
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-green-400 mb-5">Contact</h4>
            <ul className="space-y-4 mb-7">
              <li className="flex gap-3 items-start">
                <MapPin size={ 15 } className="text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400 leading-relaxed">
                  Life Science Park, Pharma Boulevard,<br />
                  Zurich, Switzerland CH-8000
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={ 15 } className="text-green-500 shrink-0" />
                <a
                  href="tel:+41441234567"

                >

                  <span className="text-sm text-gray-400">+41 44 123 4567</span>
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={ 15 } className="text-green-500 shrink-0" />
                <a href="mailto:info@naturahealthcare.com" >
                  <span className="text-sm text-gray-400">info@naturahealthcare.com</span>
                </a>
              </li>
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-3">Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                placeholder="Your email"
                className="flex-1 bg-white/5 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2A5C32] transition-colors"
              />
              <button
                className="px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90"
                style={ { backgroundColor: "#6B4226" } }
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */ }
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © { new Date().getFullYear() } Natura Health Care. Designed by <a href="https://doaguru.com/" target="blank"> <span className="font-semibold">DOAGuru InfoSystems</span></a>
          </p>
          <div className="flex gap-6">
            { [
              { label: "Privacy Policy", path: "/privacy-policy" },
              { label: "Terms of Use", path: "/terms-conditions" },
              { label: "Sitemap", path: "/sitemap" },
            ].map((item) => (
              <a
                key={ item.label }
                href={ item.path }
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                { item.label }
              </a>
            )) }
          </div>
        </div>
      </div>
    </footer>
  )
}
