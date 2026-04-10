"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, Building2, Truck, FlaskConical, 
  Clock, ShieldCheck, Award, CheckCircle2, 
  ArrowRight, Globe, Users, TrendingUp, Store, Factory, 
  ShoppingCart, Briefcase
} from "lucide-react";

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, []);

  return [elementRef, isVisible];
};

export default function WhoWeServe() {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [distRef, distVisible] = useScrollAnimation();
  const [b2bRef, b2bVisible] = useScrollAnimation();
  const [retailRef, retailVisible] = useScrollAnimation();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1a3c22] via-[#2A5C32] to-[#1a3c22] text-white py-20 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div ref={heroRef} className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
          <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-green-200 mb-6 font-medium tracking-wide">
              <Link href="/" className="hover:text-white transition-colors hover:underline">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white">Who We Serve</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-green-50 to-green-100 bg-clip-text text-transparent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Serving Diverse Global Markets
            </h1>
            
            <p className="text-green-100 max-w-2xl text-lg md:text-xl leading-relaxed mb-8">
              Reliable supply chain solutions and high-quality product sourcing tailored to meet the demands of international trading partners across multiple industries.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#distributors" className="group px-8 py-4 bg-white text-[#2A5C32] rounded-full font-bold hover:bg-green-50 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 inline-flex items-center gap-2">
                Explore Our Partners
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Distributors & Wholesalers */}
      <section ref={distRef} id="distributors" className="py-20 md:py-32 bg-white scroll-mt-20 overflow-hidden relative">
        <div className={`transition-all duration-1000 ${distVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute inset-0 bg-blue-100/50 rounded-3xl -rotate-3 scale-105 group-hover:-rotate-6 transition-transform duration-500"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                  <img loading="lazy" decoding="async" src="/media/Distributors.webp" alt="Global Distributors" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-700 rounded-full mb-6 font-bold text-sm tracking-wide uppercase">
                  <Globe size={16} /> Global Trade Partners
                </div>
                
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  International Distributors
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Natura Health Care actively partners with international distributors and wholesalers. We provide seamless access to multi-category goodsâ€”from pharmaceuticals to consumer productsâ€”ensuring continuous supply on competitive terms.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    "Multi-category product sourcing", "Competitive volume pricing",
                    "Dedicated shipping & logistics", "Regulatory & export documentation",
                    "Reliable long-term supply agreements", "Market entry support"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <CheckCircle2 size={20} className="text-[#2A5C32] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                  Partner with Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Enterprises & Manufacturers */}
      <section ref={b2bRef} id="b2b-enterprises" className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-green-50/50 scroll-mt-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-100/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className={`transition-all duration-1000 ${b2bVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-100 text-[#2A5C32] rounded-full mb-6 font-bold text-sm tracking-wide uppercase shadow-sm">
                  <Factory size={16} /> B2B Sourcing
                </div>
                
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Manufacturers & Enterprises
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  We supply critical raw materials, chemicals, APIs, and agricultural goods to manufacturing plants and large-scale enterprises. Our robust sourcing network guarantees quality materials for your uninterrupted production cycles.
                </p>
                
                <div className="space-y-4 mb-10">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-5 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                      <Truck className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Bulk Procurement</h4>
                      <p className="text-gray-500 mt-1">Efficient fulfillment of large-volume orders across multiple industrial categories.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-5 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                      <ShieldCheck className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Quality Assurance</h4>
                      <p className="text-gray-500 mt-1">Verified suppliers ensuring all materials meet strict international industry standards.</p>
                    </div>
                  </div>
                </div>

                <Link href="/contact" className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#2A5C32] to-[#1a3c22] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-green-900/30 transition-all duration-300 hover:-translate-y-1">
                  Request a Quote <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-green-200/50 rounded-3xl rotate-3 scale-105 group-hover:rotate-6 transition-transform duration-500"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                  <img loading="lazy" decoding="async" src="/media/aboutPage2.webp" alt="Manufacturing Enterprise" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retailers & Commercial Buyers */}
      <section ref={retailRef} id="commercial-retail" className="py-20 md:py-32 bg-white scroll-mt-20">
        <div className={`transition-all duration-1000 ${retailVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="max-w-[1440px] mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-50 text-rose-700 rounded-full mb-6 font-bold text-sm tracking-wide uppercase">
                <Store size={16} /> Commercial Supply
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Retailers & Commercial Buyers
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                From textiles to leather goods and sports equipment, we supply premium consumer products to retail chains, e-commerce platforms, and institutional buyers seeking consistent quality.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: ShoppingCart,
                  title: "Retail Chains & E-Commerce",
                  desc: "Sourcing fast-moving consumer goods, apparel, and lifestyle products tailored for retail environments.",
                  color: "text-rose-600",
                  bg: "bg-rose-50"
                },
                {
                  icon: Building2,
                  title: "Healthcare Institutions",
                  desc: "Supplying hospitals, clinics, and pharmacies with vital medical instruments, surgical items, and pharmaceuticals.",
                  color: "text-blue-600",
                  bg: "bg-blue-50"
                },
                {
                  icon: Briefcase,
                  title: "Institutional Buyers",
                  desc: "Fulfilling commercial contracts for food products, handicrafts, and bulk commodities.",
                  color: "text-amber-600",
                  bg: "bg-amber-50"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                  <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={32} className={item.color} />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-20 bg-gradient-to-r from-[#2A5C32] to-[#1a3c22] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ready to scale your business?</h2>
            <p className="text-green-200 text-lg">Join our network of international trading partners today.</p>
          </div>
          <Link href="/contact" className="shrink-0 bg-white text-[#2A5C32] font-bold px-10 py-4 rounded-full shadow-lg hover:bg-green-50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
            Let's Collaborate <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
