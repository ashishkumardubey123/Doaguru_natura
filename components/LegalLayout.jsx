import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({
  title,
  lastUpdated,
  subtitle,
  badge = "Legal",
  sections = [],
  children,
}) {
  return (
    <div className="relative min-h-screen bg-[#020b06] overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2A5C32]/40 via-[#04150d] to-[#020b06]" />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute -top-28 -left-12 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-12 w-80 h-80 rounded-full bg-[#2A5C32]/30 blur-3xl" />
      </div>

      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-green-100/80 hover:text-white transition-colors mb-6">
            <ArrowLeft size={ 16 } /> Back to Home
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] bg-emerald-200/10 border border-emerald-200/20 text-emerald-100">
              { badge }
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-white/[0.06] border border-white/10 text-green-100/90">
              Last Updated: { lastUpdated }
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
            {title}
          </h1>
          { subtitle && (
            <p className="text-green-100/75 max-w-3xl leading-relaxed text-sm sm:text-base">
              {subtitle}
            </p>
          ) }
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14 grid lg:grid-cols-[280px_1fr] gap-6 sm:gap-8">
        <aside className="lg:sticky lg:top-24 h-fit rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-5 sm:p-6">
          <h2 className="text-xs uppercase tracking-[0.18em] font-bold text-green-100/70 mb-4">On This Page</h2>
          { sections.length > 0 ? (
            <ul className="space-y-2.5">
              { sections.map((item) => (
                <li key={ item.id }>
                  <a
                    href={ `#${item.id}` }
                    className="block text-sm text-green-100/80 hover:text-white transition-colors leading-relaxed"
                  >
                    { item.label }
                  </a>
                </li>
              )) }
            </ul>
          ) : (
            <p className="text-sm text-green-100/65 leading-relaxed">
              Policy overview and legal details are listed in the main content.
            </p>
          ) }
        </aside>

        <div className="bg-white/95 rounded-3xl shadow-2xl shadow-black/20 border border-white/70 p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="text-gray-700 leading-relaxed space-y-6 sm:space-y-7">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
