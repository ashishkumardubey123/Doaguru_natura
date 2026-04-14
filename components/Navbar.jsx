'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search, Globe, ChevronDown, Menu, X,
  ArrowRight, Leaf
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const megaMenuData = {
  "About Us": [
    {
      title: "Company",
      links: [
        { label: "Company Overview", desc: "Our story, mission & values", path: "/about#company-overview" },
        { label: "Leadership Team", desc: "Meet our executive leaders", path: "/about#leadership" },
        { label: "Our Journey", desc: "Excellence Since 2025", path: "/about#our-journey" },
        { label: "Certifications", desc: "Accreditations", path: "/about#certifications" },
      ],
    }
  ],
  "Products": [
    {
      title: "By Therapy Area",
      links: [
        { label: "Cardiology", desc: "Heart health solutions", path: "/products#cardiology" },
        { label: "Oncology", desc: "Cancer therapy portfolio", path: "/products#oncology" },
        { label: "Neurology", desc: "CNS & neuro medications", path: "/products#neurology" },
        { label: "Diabetes & Metabolism", desc: "Endocrine treatments", path: "/products#diabetes" },
        { label: "Anti-Infectives", desc: "Antibiotics & antivirals", path: "/products#anti-infectives" },
      ],
    },
    {
      title: "By Dosage Form",
      links: [
        { label: "Tablets & Capsules", desc: "Oral solid dosage", path: "/products#tablets" },
        { label: "Injectables", desc: "Parenteral solutions", path: "/products#injectables" },
        { label: "Syrups & Suspensions", desc: "Liquid formulations", path: "/products#syrups" },
        { label: "Topicals & Creams", desc: "Dermatological range", path: "/products#creams" },
      ],
    }
  ],
  "Manufacturing": [
    {
      title: "Facilities",
      links: [
        { label: "Manufacturing Plants", desc: "State-of-the-art units", path: "/manufacturing#overview" },
        { label: "Quality Assurance", desc: "QA systems & processes", path: "/manufacturing#qa" },
        { label: "GMP Compliance", desc: "WHO & FDA standards", path: "/manufacturing#gmp" },
        { label: "R&D Centers", desc: "Innovation laboratories", path: "/manufacturing#rnd" },
      ],
    }
  ],
  "Who We Serve": [
    {
      title: "Stakeholders",
      links: [
        { label: "Hospitals & Pharmacies", desc: "Direct healthcare supply", path: "/who-we-serve#hospitals" },
        { label: "Distributors", desc: "Trade partnerships", path: "/who-we-serve#distributors" },
        { label: "Pharma Companies", desc: "B2B services & sourcing", path: "/who-we-serve#pharma" },
        { label: "Government", desc: "Public health & tenders", path: "/who-we-serve#government" },
      ],
    }
  ],
  "Global Presence": [
    {
      title: "Regions",
      links: [
        { label: "North America", desc: "Operations in US & Canada", path: "/global-presence#north-america" },
        { label: "Europe", desc: "EU & UK markets", path: "/global-presence#europe" },
        { label: "Asia Pacific", desc: "APAC & India operations", path: "/global-presence#asia-pacific" },
        { label: "Emerging Markets", desc: "LATAM, Africa & MENA", path: "/global-presence#emerging-markets" },
      ],
    }
  ],
};

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Services", path: "/services" },
  { label: "Who We Serve", path: "/who-we-serve" },
  { label: "Global Presence", path: "/global-presence" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(null);
  const [activeMega, setActiveMega] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (label) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (megaMenuData[label]) setActiveMega(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 150);
  };

  useEffect(() => {
    setMobileOpen(false);
    setMobileMegaOpen(null);
    setActiveMega(null);
  }, [pathname]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileMegaOpen(null);
  };

  const toggleMobileMenu = () => {
    if (mobileOpen) {
      setMobileOpen(false);
      setMobileMegaOpen(null);
    } else {
      setMobileOpen(true);
    }
  };

  const updateHashState = (hash) => {
    if (window.location.hash !== `#${hash}`) {
      window.history.replaceState(null, "", `#${hash}`);
    }
    window.dispatchEvent(new Event("hashchange"));
  };

  const scrollToHashTarget = (hash) => {
    const element = document.getElementById(hash);
    if (!element) return false;

    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    updateHashState(hash);
    return true;
  };

  const handleLinkClick = (e, path) => {
    if (path.includes("#")) {
      const [pagePath, hash] = path.split("#");
      const normalizedPath = pagePath || "/";
      const isSamePage = pathname === normalizedPath;

      if (isSamePage) {
        e.preventDefault();
        const scrolledTo = scrollToHashTarget(hash);
        if (!scrolledTo) {
          updateHashState(hash);
        }
      }
    }
    setActiveMega(null);
    closeMobileMenu();
  };

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-xl transition-all duration-300 border-b border-gray-100 ${scrolled ? "shadow-lg shadow-black/5" : ""}`} style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* ─── Top Bar ─── */}
      <div className="bg-[#020b06] text-white py-2.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex justify-between items-center">
          <span className="tracking-[0.15em] hidden sm:block text-green-100/70 font-semibold uppercase text-[11px]">
            Global Pharmaceutical Excellence — Trusted by 50+ Countries
          </span>
          <div className="flex gap-5 items-center ml-auto sm:ml-0">
            <Link href="/sitemap" className="hover:text-green-300 transition-colors text-green-100/70 text-[11px] uppercase tracking-wider font-bold">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* ─── Main Header ─── */}
      <div className="max-w-[1440px] mx-auto flex items-stretch justify-between relative px-4 sm:px-6 h-[76px]">
        
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img src="./Logo/Navlogo.webp" className="w-40 sm:w-45 h-14 sm:h-16 object-contain" alt="Natura Logo" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-stretch gap-2 xl:gap-4">
          {navItems.map((item) => {
            const hasMega = !!megaMenuData[item.label];
            const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <div
                key={item.label}
                className="relative flex items-stretch"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.path}
                  className={`flex items-center gap-1.5 px-3 xl:px-4 text-[14px] font-bold tracking-wide transition-all duration-300 border-b-[3px] ${
                    isActive
                      ? "text-[#2A5C32] border-[#2A5C32]"
                      : "text-gray-700 border-transparent hover:text-[#2A5C32] hover:border-[#2A5C32]/30"
                  }`}
                >
                  {item.label}
                  {hasMega && (
                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeMega === item.label ? "rotate-180 text-[#2A5C32]" : "text-gray-400"}`} />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="tel:+919098140945"
            className="flex items-center gap-2 text-white text-[14px] font-bold px-7 py-3 rounded-full transition-all duration-300 bg-[#1a3c22] hover:bg-[#234e2a] hover:shadow-xl hover:shadow-[#2A5C32]/20 active:scale-95"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-12 h-12 my-auto rounded-2xl hover:bg-gray-100 transition-colors duration-300"
          onClick={toggleMobileMenu}
        >
          {mobileOpen ? <X size={26} className="text-gray-800" /> : <Menu size={26} className="text-gray-800" />}
        </button>
      </div>

      {/* ─── Search Bar (Optional) ─── */}
      {searchOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-inner">
          <div className="max-w-3xl mx-auto flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, therapy areas, countries..."
              className="flex-1 border-2 border-gray-100 rounded-full px-6 py-3 text-[14px] font-medium text-gray-800 focus:outline-none focus:border-[#2A5C32]/50 focus:bg-white bg-gray-50 transition-all"
              autoFocus
            />
            <button className="px-8 py-3 rounded-full text-white text-[14px] font-bold bg-[#1a3c22] hover:bg-[#234e2a] transition-colors shadow-md">
              Search
            </button>
          </div>
        </div>
      )}

      {/* ─── Mega Menu (Desktop) ─── */}
      {activeMega && (
        <div
          className="absolute left-0 right-0 z-50 bg-white/98 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border-t border-gray-100 origin-top animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ top: "100%" }}
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-[1440px] mx-auto px-6 xl:px-8 py-10">
            <div className="flex gap-12 xl:gap-16">
              <div className="flex gap-12 xl:gap-16 flex-1">
                {megaMenuData[activeMega].map((col) => (
                  <div key={col.title} className="min-w-[220px]">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#2A5C32]/70 mb-5">{col.title}</div>
                    <ul className="space-y-1.5">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.path}
                            className="group flex items-start gap-3 rounded-2xl p-3 hover:bg-[#f0f7f1] transition-all duration-300"
                            onClick={(e) => handleLinkClick(e, link.path)}
                          >
                            <div>
                              <div className="text-[14px] font-bold text-gray-800 group-hover:text-[#2A5C32] transition-colors tracking-tight">{link.label}</div>
                              <div className="text-[12px] text-gray-500 mt-0.5 font-medium leading-snug">{link.desc}</div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {/* Promo Panel */}
              <div
                className="w-64 rounded-[2rem] p-7 text-white flex-shrink-0 relative overflow-hidden shadow-2xl shadow-[#1a3c22]/20"
                style={{ background: "linear-gradient(135deg, #1a3c22 0%, #04150d 100%)" }}
              >
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-400/10 rounded-full blur-2xl" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-green-400 mb-4">
                      {activeMega === "Products" ? "New Launch" : "Quick Info"}
                    </div>
                    <div className="font-extrabold text-[17px] leading-snug mb-6 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {activeMega === "Products"
                        ? "500+ SKUs in 9+ Therapy Categories"
                        : activeMega === "Manufacturing"
                          ? "Globally Certified Compliance Excellence"
                          : activeMega === "Global Presence"
                            ? "Serving Healthcare in 50+ Countries"
                            : activeMega === "Who We Serve"
                              ? "Trusted by Top Partners Globally"
                              : "Excellence Since 2025: Premium Health"}
                    </div>
                  </div>
                  <Link href="/contact" className="inline-flex items-center w-fit gap-2 bg-white text-[#1a3c22] text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-green-50 transition-all duration-300 shadow-md">
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Mobile Menu ─── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/98 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] max-h-[calc(100dvh-100px)] overflow-y-auto">
          <div className="px-5 py-6 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const hasMega = !!megaMenuData[item.label];
              const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
              const isOpen = mobileMegaOpen === item.label;

              return (
                <div key={item.label}>
                  <div className={`flex items-center rounded-2xl transition-colors duration-300 ${isActive ? "bg-[#f0f7f1]" : "hover:bg-gray-50"}`}>
                    <Link
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      className={`flex-1 py-4 px-5 text-[15px] font-bold tracking-wide ${isActive ? "text-[#2A5C32]" : "text-gray-800"}`}
                    >
                      {item.label}
                    </Link>
                    {hasMega && (
                      <button
                        type="button"
                        onClick={() => setMobileMegaOpen((prev) => (prev === item.label ? null : item.label))}
                        className="px-5 py-4 text-gray-400 hover:text-[#2A5C32] transition-colors"
                      >
                        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-[#2A5C32]" : ""}`} />
                      </button>
                    )}
                  </div>

                  {hasMega && isOpen && (
                    <div className="pl-7 pr-4 py-3 space-y-4 mb-2 bg-gray-50/50 rounded-2xl mt-1">
                      {megaMenuData[item.label].map((col) => (
                        <div key={col.title}>
                          <div className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#2A5C32]/60 py-2">{col.title}</div>
                          {col.links.map((link) => (
                            <Link
                              key={link.label}
                              href={link.path}
                              onClick={(e) => handleLinkClick(e, link.path)}
                              className="block text-[14px] text-gray-600 py-2.5 hover:text-[#2A5C32] font-semibold transition-colors"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="mt-6">
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 bg-[#1a3c22] text-white py-4 rounded-2xl text-[15px] font-bold tracking-wide hover:bg-[#234e2a] transition-colors shadow-lg shadow-[#1a3c22]/20 active:scale-95"
              >
                Get in Touch <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}