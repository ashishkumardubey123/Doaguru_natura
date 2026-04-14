import Link from "next/link";
import { ArrowRight, Building2, BriefcaseBusiness, Scale, Map } from "lucide-react";

const sitemapLinks = [
  {
    category: "Company",
    description: "Core pages about Natura Health Care and corporate information.",
    icon: Building2,
    links: [
      { name: "Home", url: "/" },
      { name: "About Us", url: "/about" },
      { name: "Global Presence", url: "/global-presence" },
      { name: "Media", url: "/media" },
      { name: "Contact Us", url: "/contact" },
    ],
  },
  {
    category: "Our Business",
    description: "Explore product lines, manufacturing, and service capabilities.",
    icon: BriefcaseBusiness,
    links: [
      { name: "Products", url: "/products" },
      { name: "Manufacturing", url: "/manufacturing" },
      { name: "Services", url: "/services" },
      { name: "Who We Serve", url: "/who-we-serve" },
    ],
  },
  {
    category: "Legal",
    description: "Policies, terms, and legal information related to website usage.",
    icon: Scale,
    links: [
      { name: "Privacy Policy", url: "/privacy-policy" },
      { name: "Terms of Use", url: "/terms-conditions" },
    ],
  },
];

const totalLinks = sitemapLinks.reduce((sum, section) => sum + section.links.length, 0);

export default function Sitemap() {
  return (
    <div className="relative min-h-screen bg-[#020b06] overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2A5C32]/40 via-[#04150d] to-[#020b06]" />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute -top-24 -left-12 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-12 w-80 h-80 rounded-full bg-[#2A5C32]/30 blur-3xl" />
      </div>

      <section className="relative z-10 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-5">
            <Map size={ 28 } className="text-emerald-200" />
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] bg-emerald-200/10 border border-emerald-200/20 text-emerald-100">
              Navigation
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-white/[0.06] border border-white/10 text-green-100/90">
              { totalLinks } Total Links
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
            Sitemap
          </h1>
          <p className="text-green-100/75 max-w-3xl leading-relaxed text-sm sm:text-base">
            Browse all major pages from one place to quickly access company, business, and legal information.
          </p>
        </div>
      </section>

      <section className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          { sitemapLinks.map((section) => (
            <article
              key={ section.category }
              className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.07] hover:border-emerald-300/30 hover:shadow-2xl hover:shadow-black/25"
            >
              <div className="w-11 h-11 rounded-2xl bg-emerald-200/10 border border-emerald-200/20 flex items-center justify-center mb-4">
                <section.icon size={ 20 } className="text-emerald-200" />
              </div>
              <h2 className="text-xl font-extrabold text-white mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                { section.category }
              </h2>
              <p className="text-sm text-green-100/70 leading-relaxed mb-5">{ section.description }</p>
              <ul className="space-y-2.5">
                { section.links.map((item) => (
                  <li key={ item.url }>
                    <Link
                      href={ item.url }
                      className="group flex items-center justify-between text-sm sm:text-[15px] text-green-50/85 hover:text-white transition-colors"
                    >
                      <span>{ item.name }</span>
                      <ArrowRight size={ 15 } className="text-green-200/70 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                )) }
              </ul>
            </article>
          )) }
        </div>
      </section>
    </div>
  );
}
