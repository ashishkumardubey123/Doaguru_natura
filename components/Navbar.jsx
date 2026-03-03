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
        { label: "Our Journey", desc: "25 Years of Growth", path: "/about#our-journey" },
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
  "Investors & Media": [
    {
      title: "Investors",
      links: [
        { label: "Annual Reports", desc: "Financial summaries", path: "/investors#reports" },
        { label: "Financial Results", desc: "Quarterly updates", path: "/investors#financials" },
      ],
    },
    {
      title: "Media",
      links: [
        { label: "Press Releases", desc: "Latest announcements", path: "/investors#press" },
        { label: "Image Gallery", desc: "Photo library", path: "/investors#gallery" },
      ],
    },
  ],
};

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Manufacturing", path: "/manufacturing" },
  { label: "Who We Serve", path: "/who-we-serve" },
  { label: "Global Presence", path: "/global-presence" },
  { label: "Investors & Media", path: "/investors" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(null);
  const [activeMega, setActiveMega] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const timeoutRef = useRef(null);

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
        const scrolled = scrollToHashTarget(hash);
        if (!scrolled) {
          // For conditional sections (tabbed pages), update hash and let page listeners open section.
          updateHashState(hash);
        }
      }
    }

    setActiveMega(null);
    closeMobileMenu(); // ✅ Resets both mobileOpen and mobileMegaOpen together
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm" style={ { fontFamily: "'Inter', sans-serif" } }>
      {/* Top Bar */ }
      <div style={ { backgroundColor: "#2A5C32" } } className="text-white py-1.5 text-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex justify-between items-center">
          <span className="tracking-wide hidden sm:block">Global Pharmaceutical Excellence — Trusted by 50+ Countries</span>
          <div className="flex gap-5 items-center">
            <Link href="/sitemap" className="hover:text-green-200 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Main Header */ }
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-0 flex items-stretch justify-between relative">
        {/* Logo */ }
        <Link href="/" className="flex items-center gap-3 py-4 shrink-0">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white"
            style={ { backgroundColor: "#2A5C32" } }
          >
            <Leaf size={ 20 } fill="white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl tracking-tight" style={ { fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#2A5C32" } }>
              Natura
            </span>
            <span className="text-xs tracking-widest uppercase" style={ { color: "#6B4226", fontWeight: 600 } }>
              Health Care
            </span>
          </div>
        </Link>

        {/* Desktop Nav */ }
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
                  className={ `flex items-center gap-1 px-3 py-5 text-sm font-bold transition-colors border-b-2 h-full ${isActive
                      ? "text-[#2A5C32] border-[#2A5C32]"
                      : "text-gray-700 border-transparent hover:text-[#2A5C32]"
                    }` }
                >
                  { item.label }
                  { hasMega && <ChevronDown size={ 13 } className="opacity-60" /> }
                </Link>
              </div>
            );
          }) }
        </nav>

        {/* Right Actions */ }
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="tel:+919302300834"
            className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:opacity-90"
            style={ { backgroundColor: "#2A5C32" } }
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Hamburger */ }
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 my-auto rounded-full hover:bg-gray-100"
          onClick={ toggleMobileMenu } // ✅ Uses the combined toggle handler
        >
          { mobileOpen ? <X size={ 20 } /> : <Menu size={ 20 } /> }
        </button>
      </div>

      {/* Search Bar */ }
      { searchOpen && (
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
              className="px-6 py-2.5 rounded-full text-white text-sm font-semibold"
              style={ { backgroundColor: "#2A5C32" } }
            >
              Search
            </button>
          </div>
        </div>
      ) }

      {/* Mega Menu */ }
      { activeMega && (
        <div
          className="absolute left-0 right-0 z-50 bg-white shadow-2xl border-t-2"
          style={ { top: "100%", borderColor: "#2A5C32" } }
          onMouseEnter={ () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); } }
          onMouseLeave={ handleMouseLeave }
        >
          <div className="max-w-[1440px] mx-auto px-8 py-8">
            <div className="flex gap-12">
              <div className="flex gap-12 flex-1">
                { megaMenuData[activeMega].map((col) => (
                  <div key={ col.title } className="min-w-[180px]">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">{ col.title }</div>
                    <ul className="space-y-1">
                      { col.links.map((link) => (
                        <li key={ link.label }>
                          <Link
                            href={ link.path }
                            className="group flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition-colors"
                            onClick={ (e) => handleLinkClick(e, link.path) }
                          >
                            <div>
                              <div className="text-sm font-medium text-gray-800 group-hover:text-[#2A5C32] transition-colors">{ link.label }</div>
                              <div className="text-xs text-gray-400 mt-0.5">{ link.desc }</div>
                            </div>
                          </Link>
                        </li>
                      )) }
                    </ul>
                  </div>
                )) }
              </div>
              {/* Promo Panel */ }
              <div
                className="w-56 rounded-2xl p-6 text-white flex-shrink-0"
                style={ { background: "linear-gradient(135deg, #2A5C32 0%, #1a3c22 100%)" } }
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-green-300 mb-3">
                  { activeMega === "Products" ? "New Launch" : activeMega === "Investors & Media" ? "Latest Report" : "Quick Info" }
                </div>
                <div className="font-bold text-sm leading-snug mb-3" style={ { fontFamily: "'Montserrat', sans-serif" } }>
                  { activeMega === "Products"
                    ? "500+ Products across 25 dosage forms"
                    : activeMega === "Manufacturing"
                      ? "8 WHO-GMP certified facilities worldwide"
                      : activeMega === "Global Presence"
                        ? "Operations in 50+ countries across 4 regions"
                        : activeMega === "Investors & Media"
                          ? "FY2024 Revenue: USD 420M (+18% YoY)"
                          : "25+ years of pharmaceutical excellence" }
                </div>
                <Link href="/contact" className="mt-2 inline-block bg-white text-[#2A5C32] text-xs font-bold px-4 py-2 rounded-full hover:bg-green-50 transition-colors">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) }

      {/* Mobile Menu */ }
      { mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg max-h-[calc(100dvh-100px)] overflow-y-auto">
          <div className="px-6 py-4 flex flex-col gap-1">
            { navItems.map((item) => {
              const hasMega = !!megaMenuData[item.label];
              const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
              const isOpen = mobileMegaOpen === item.label;

              return (
                <div key={ item.label }>
                  <div
                    className={ `flex items-center rounded-lg border-b border-gray-50 ${isActive ? "bg-[#f5f8f5]" : ""
                      }` }
                  >
                    <Link
                      href={ item.path }
                      onClick={ (e) => handleLinkClick(e, item.path) }
                      className={ `flex-1 py-3 px-4 text-sm font-medium ${isActive ? "text-[#2A5C32]" : "text-gray-700"
                        }` }
                    >
                      { item.label }
                    </Link>
                    { hasMega && (
                      <button
                        type="button"
                        onClick={ () => setMobileMegaOpen((prev) => (prev === item.label ? null : item.label)) }
                        className="px-4 py-3 text-gray-500 hover:text-[#2A5C32]"
                        aria-label={ `Toggle ${item.label} submenu` }
                        aria-expanded={ isOpen }
                        aria-controls={ `mobile-submenu-${item.label.replace(/\s+/g, "-").toLowerCase()}` }
                      >
                        <ChevronDown size={ 16 } className={ `transition-transform ${isOpen ? "rotate-180" : ""}` } />
                      </button>
                    ) }
                  </div>

                  { hasMega && isOpen && (
                    <div
                      id={ `mobile-submenu-${item.label.replace(/\s+/g, "-").toLowerCase()}` }
                      className="pl-6 pr-3 py-2 space-y-2 border-b border-gray-50"
                    >
                      { megaMenuData[item.label].map((col) => (
                        <div key={ col.title }>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 py-1">{ col.title }</div>
                          { col.links.map((link) => (
                            <Link
                              key={ link.label }
                              href={ link.path }
                              onClick={ (e) => handleLinkClick(e, link.path) }
                              className="block text-xs text-gray-500 py-1 hover:text-[#2A5C32]"
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
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={ closeMobileMenu } // ✅ Resets both states together
                className="text-center bg-[#2A5C32] text-white py-3 rounded-full text-sm font-semibold"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      ) }
    </header>
  );
}
