'use client';

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight, Leaf } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="text-white relative overflow-hidden" style={ { backgroundColor: "#020b06", fontFamily: "'Inter', sans-serif" } }>
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#1d522a]/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Top accent bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#2A5C32] to-transparent" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 lg:pr-10">
            <div className="flex items-center gap-3 mb-1 -mt-8">
              <img src="/Logo/Footerlogo.webp" className="w-[320px] -ml-6" alt="logo" />
            </div>
            <p className="text-green-100/40 text-sm leading-relaxed mb-7 max-w-sm font-light">
              Committed to improving global health through the development, manufacturing, and distribution of high-quality pharmaceutical products across 50+ countries.
            </p>
            <div className="flex gap-3 mb-8">
              { [
                { Icon: Linkedin, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={ i }
                  href={ href }
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-green-100/40 hover:text-white hover:bg-[#2A5C32]/30 transition-all duration-300 border border-white/10 hover:border-[#2A5C32]/40"
                >
                  <Icon size={ 16 } />
                </a>
              )) }
            </div>

            <div className="flex flex-wrap gap-2">
              { ["WHO-GMP", "ISO 9001:2015", "USFDA", "EU GMP", "ISO 14001"].map((cert) => (
                <span
                  key={ cert }
                  className="text-[9px] font-bold px-3 py-1.5 rounded-xl border border-white/10 text-green-400/50 tracking-[0.15em] uppercase bg-white/[0.02]"
                >
                  { cert }
                </span>
              )) }
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-green-400/70 mb-6">Company</h4>
            <ul className="space-y-3.5">
              { [
                { label: "About Us", path: "/about" },
                { label: "Our Products", path: "/products" },
                { label: "Services", path: "/services" },
                { label: "Who We Serve", path: "/who-we-serve" },
                { label: "Global Presence", path: "/global-presence" },
              ].map((item) => (
                <li key={ item.label }>
                  <Link href={ item.path } className="text-[13px] text-green-100/40 hover:text-white transition-all duration-300 flex items-center gap-1.5 group font-medium">
                    <ArrowRight size={ 11 } className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-green-400" />
                    { item.label }
                  </Link>
                </li>
              )) }
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-green-400/70 mb-6">Contact Us</h4>
            <ul className="space-y-3.5">
              { [
                { label: "General Inquiry", path: "/contact?type=general", color: "#2A5C32" },
                { label: "Business Partnership", path: "/contact?type=partnership", color: "#1d6fa4" },
                { label: "Export Query", path: "/contact?type=export", color: "#6B4226" },
                { label: "Supplier Registration", path: "/contact?type=supplier", color: "#7c3aed" },
              ].map((item) => (
                <li key={ item.label }>
                  <Link href={ item.path } className="text-[13px] text-green-100/40 hover:text-white transition-all duration-300 flex items-center gap-2.5 group font-medium">
                    <span className="w-2 h-2 rounded-full shrink-0 ring-2 ring-black/20" style={ { backgroundColor: item.color } } />
                    { item.label }
                  </Link>
                </li>
              )) }
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-green-400/70 mb-6">Connect With Us</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={ 14 } className="text-green-400/60" />
                </div>
                <span className="text-[13px] text-green-100/40 leading-relaxed font-light">
                  Life Science Park, Pharma Boulevard,<br />
                  Zurich, Switzerland CH-8000
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                  <Phone size={ 14 } className="text-green-400/60" />
                </div>
                <a href="tel:+919098140945">
                  <span className="text-[13px] text-green-100/40 hover:text-white transition-colors font-medium">+91 9098140945</span>
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                  <Mail size={ 14 } className="text-green-400/60" />
                </div>
                <a href="mailto:info@naturahealthcare.com">
                  <span className="text-[13px] text-green-100/40 hover:text-white transition-colors font-medium">info@naturahealthcare.com</span>
                </a>
              </li>
            </ul>

            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-green-100/25 font-light">
            © { new Date().getFullYear() }  <Link href={ "/admin" }> Natura Health Care. Designed by </Link> <a href="https://doaguru.com/" target="blank"> <span className="font-bold text-green-100/40 hover:text-white transition-colors">DOAGuru InfoSystems</span></a>
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            { [
              { label: "Privacy Policy", path: "/privacy-policy" },
              { label: "Terms of Use", path: "/terms-conditions" },
              { label: "Sitemap", path: "/sitemap" },
            ].map((item) => (
              <Link
                key={ item.label }
                href={ item.path }
                className="text-[11px] text-green-100/25 hover:text-green-100/60 transition-colors font-medium"
              >
                { item.label }
              </Link>
            )) }
          </div>
        </div>
      </div>
    </footer>
  )
}