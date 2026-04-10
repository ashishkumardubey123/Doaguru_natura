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
  // { label: "Manufacturing", path: "/manufacturing" },
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

  // Track scroll for shadow
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

  // Reset all menu state on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileMegaOpen(null);
    setActiveMega(null);
  }, [pathname]);

  // ✅ Removed the second useEffect that called setMobileMegaOpen inside it.
  // Instead, both states are reset together in the handlers below.

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileMegaOpen(null); // ✅ Reset together at the source
  };

  const toggleMobileMenu = () => {
    if (mobileOpen) {
      // Closing — reset both together
      setMobileOpen(false);
      setMobileMegaOpen(null); // ✅ Reset together at the source
    } else {
      setMobileOpen(true);
    }
  };

  const updateHashState = (hash) => {
    if (window.location.hash !== `#${hash}`) {
      window.history.replaceState(null, "", `#${hash}`);
    }
    // notify pages that rely on hash listeners for tab/section/filter state
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
          // For conditional sections (tabbed pages), update hash and let page listeners open section.
          updateHashState(hash);
        }
      }
    }

    setActiveMega(null);
    closeMobileMenu(); // ✅ Resets both mobileOpen and mobileMegaOpen together
  };

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-xl transition-all duration-300 ${scrolled ? "shadow-lg shadow-black/5" : "shadow-sm"}`} style={ { fontFamily: "'Inter', sans-serif" } }>
      {/* Top Bar */}
      <div className="bg-[#020b06] text-white py-2 text-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex justify-between items-center">
          <span className="tracking-[0.15em] hidden sm:block text-green-300/60 font-medium uppercase text-[10px]">Global Pharmaceutical Excellence — Trusted by 50+ Countries</span>
          <div className="flex gap-5 items-center">
            <Link href="/sitemap" className="hover:text-green-300 transition-colors text-green-100/50 text-[10px] uppercase tracking-wider font-semibold">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-[1440px] mx-auto py-0 flex items-stretch justify-between relative px-4 sm:px-6">
        <Link href="/" className="flex items-center shrink-0">
          <img src="./Logo/Navlogo.webp" className="w-45 my-2 h-16 object-contain" alt="logo" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-stretch gap-0">
          { navItems.map((item) => {
            const hasMega = !!megaMenuData[item.label];
            const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <div
                key={ item.label }
                className="relative flex items-center"
                onMouseEnter={ () => handleMouseEnter(item.label) }
                onMouseLeave={ handleMouseLeave }
              >
                <Link
                  href={ item.path }
                  className={ `flex items-center gap-1.5 px-4 py-5 text-[13px] font-bold tracking-wide transition-all duration-300 border-b-2 h-full ${isActive
                    ? "text-[#2A5C32] border-[#2A5C32]"
                    : "text-gray-600 border-transparent hover:text-[#2A5C32]"
                    }` }
                >
                  { item.label }
                  { hasMega && <ChevronDown size={ 12 } className={`transition-transform duration-300 ${activeMega === item.label ? "rotate-180" : ""} opacity-50`} /> }
                </Link>
              </div>
            );
          }) }
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="tel:+919098140945"
            className="flex items-center gap-2 text-white text-[13px] font-bold px-6 py-2.5 rounded-full transition-all duration-300 bg-[#1a3c22] hover:bg-[#234e2a] hover:shadow-lg hover:shadow-[#2A5C32]/15 active:scale-95"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-12 h-12 my-auto rounded-2xl hover:bg-gray-100 transition-colors duration-300"
          onClick={ toggleMobileMenu }
        >
          { mobileOpen ? <X size={ 24 } className="text-gray-700" /> : <Menu size={ 24 } className="text-gray-700" /> }
        </button>
      </div>

      {/* Search Bar */}
      {
        searchOpen && (
          <div className="border-t border-gray-100 bg-white px-4 sm:px-8 py-4">
            <div className="max-w-2xl mx-auto flex gap-3">
              <input
                type="text"
                value={ searchQuery }
                onChange={ (e) => setSearchQuery(e.target.value) }
                placeholder="Search products, therapy areas, countries..."
                className="flex-1 border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-[#2A5C32] transition-colors"
                autoFocus
              />
              <button
                className="px-6 py-2.5 rounded-full text-white text-sm font-bold bg-[#1a3c22] hover:bg-[#234e2a] transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        )
      }

      {/* Mega Menu */}
      {
        activeMega && (
          <div
            className="absolute left-0 right-0 z-50 bg-white/98 backdrop-blur-xl shadow-2xl shadow-black/10 border-t border-gray-100"
            style={ { top: "100%" } }
            onMouseEnter={ () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); } }
            onMouseLeave={ handleMouseLeave }
          >
            <div className="max-w-[1440px] mx-auto px-8 py-10">
              <div className="flex gap-14">
                <div className="flex gap-14 flex-1">
                  { megaMenuData[activeMega].map((col) => (
                    <div key={ col.title } className="min-w-[200px]">
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#2A5C32]/60 mb-5">{ col.title }</div>
                      <ul className="space-y-1">
                        { col.links.map((link) => (
                          <li key={ link.label }>
                            <Link
                              href={ link.path }
                              className="group flex items-start gap-3 rounded-2xl p-3.5 hover:bg-[#f0f7f1] transition-all duration-300"
                              onClick={ (e) => handleLinkClick(e, link.path) }
                            >
                              <div>
                                <div className="text-[13px] font-bold text-gray-800 group-hover:text-[#2A5C32] transition-colors tracking-tight">{ link.label }</div>
                                <div className="text-[11px] text-gray-400 mt-0.5 font-light">{ link.desc }</div>
                              </div>
                            </Link>
                          </li>
                        )) }
                      </ul>
                    </div>
                  )) }
                </div>
                {/* Promo Panel */}
                <div
                  className="w-52 rounded-[2rem] p-6 text-white flex-shrink-0 relative overflow-hidden"
                  style={ { background: "linear-gradient(135deg, #1a3c22 0%, #020b06 100%)" } }
                >
                  <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  <div className="relative z-10">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-green-400/60 mb-3.5">
                      { activeMega === "Products" ? "New Launch" : "Quick Info" }
                    </div>
                    <div className="font-extrabold text-sm leading-snug mb-5 tracking-tight" style={ { fontFamily: "'Montserrat', sans-serif" } }>
                      { activeMega === "Products"
                        ? "500+ SKUs in 9+ Categories"
                        : activeMega === "Manufacturing"
                          ? "Certified Compliance Excellence"
                          : activeMega === "Global Presence"
                            ? "Serving 50+ Countries Globally"
                            : activeMega === "Who We Serve"
                              ? "Trusted Partners in 50+ Nations"
                              : "Established 2025: Premium Health" }
                    </div>
                    <Link href="/contact" className="inline-flex items-center gap-1.5 bg-white text-[#1a3c22] text-[11px] font-bold px-4 py-2 rounded-full hover:bg-green-50 transition-all duration-300 shadow-sm">
                      Learn More <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Mobile Menu */}
      {
        mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/98 backdrop-blur-xl shadow-2xl shadow-black/10 max-h-[calc(100dvh-100px)] overflow-y-auto">
            <div className="px-5 py-5 flex flex-col gap-1">
              { navItems.map((item) => {
                const hasMega = !!megaMenuData[item.label];
                const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
                const isOpen = mobileMegaOpen === item.label;

                return (
                  <div key={ item.label }>
                    <div
                      className={ `flex items-center rounded-2xl transition-colors duration-300 ${isActive ? "bg-[#f0f7f1]" : "hover:bg-gray-50"
                        }` }
                    >
                      <Link
                        href={ item.path }
                        onClick={ (e) => handleLinkClick(e, item.path) }
                        className={ `flex-1 py-3.5 px-4 text-[13px] font-bold tracking-wide ${isActive ? "text-[#2A5C32]" : "text-gray-700"
                          }` }
                      >
                        { item.label }
                      </Link>
                      { hasMega && (
                        <button
                          type="button"
                          onClick={ () => setMobileMegaOpen((prev) => (prev === item.label ? null : item.label)) }
                          className="px-4 py-3 text-gray-400 hover:text-[#2A5C32] transition-colors"
                          aria-label={ `Toggle ${item.label} submenu` }
                          aria-expanded={ isOpen }
                          aria-controls={ `mobile-submenu-${item.label.replace(/\s+/g, "-").toLowerCase()}` }
                        >
                          <ChevronDown size={ 16 } className={ `transition-transform duration-300 ${isOpen ? "rotate-180" : ""}` } />
                        </button>
                      ) }
                    </div>

                    { hasMega && isOpen && (
                      <div
                        id={ `mobile-submenu-${item.label.replace(/\s+/g, "-").toLowerCase()}` }
                        className="pl-6 pr-3 py-3 space-y-3 mb-1"
                      >
                        { megaMenuData[item.label].map((col) => (
                          <div key={ col.title }>
                            <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#2A5C32]/50 py-1.5">{ col.title }</div>
                            { col.links.map((link) => (
                              <Link
                                key={ link.label }
                                href={ link.path }
                                onClick={ (e) => handleLinkClick(e, link.path) }
                                className="block text-[12px] text-gray-500 py-1.5 hover:text-[#2A5C32] font-medium transition-colors"
                              >
                                { link.label }
                              </Link>
                            )) }
                          </div>
                        )) }
                      </div>
                    ) }
                  </div>
                );
              }) }
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={ closeMobileMenu } // ✅ Resets both states together
                  className="text-center bg-[#1a3c22] text-white py-3.5 rounded-2xl text-[13px] font-bold tracking-wide hover:bg-[#234e2a] transition-colors active:scale-95"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        )
      }
    </header>
  );
}
