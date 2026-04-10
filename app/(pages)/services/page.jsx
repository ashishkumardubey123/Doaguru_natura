"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Globe, Package, FileText, FlaskConical,
  Truck, Shield, CheckCircle, Users, Building2, Search,
  Sparkles, Award, Target, Layers
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

const services = [
  {
    id: "pharma-trading",
    icon: Globe,
    title: "Pharmaceutical Trading",
    color: "#2A5C32",
    gradient: "from-emerald-600 to-[#1a3c22]",
    bg: "#e8f5e9",
    desc: "Comprehensive pharmaceutical trading services connecting global suppliers with healthcare distributors. We source quality medicines and medical products from certified manufacturers worldwide.",
    features: [
      "WHO-GMP certified product sourcing",
      "Generic and branded pharmaceutical supply",
      "Medical devices and surgical instruments",
      "API and raw material procurement",
      "Competitive pricing and bulk discounts",
    ],
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
  {
    id: "export-import",
    icon: Search,
    title: "International Import & Export",
    color: "#0369a1",
    gradient: "from-sky-500 to-blue-700",
    bg: "#e0f2fe",
    desc: "Seamless cross-border pharmaceutical trade with complete regulatory compliance. We handle all documentation, customs, and logistics for hassle-free international transactions.",
    features: [
      "IEC certified import-export operations",
      "Complete customs clearance support",
      "Export documentation and COA management",
      "Multi-country regulatory compliance",
      "Freight forwarding and shipping coordination",
    ],
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
 
  
  {
    id: "product-sourcing",
    icon: Search,
    title: "Product Sourcing Solutions",
    color: "#dc2626",
    gradient: "from-red-500 to-rose-700",
    bg: "#fee2e2",
    desc: "Expert product sourcing from verified manufacturers across multiple therapeutic categories. We connect you with the right suppliers for your specific pharmaceutical needs.",
    features: [
      "Multi-category product portfolio",
      "Manufacturer verification and selection",
      "Competitive price negotiations",
      "Sample procurement and evaluation",
      "Long-term supplier partnerships",
    ],
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
  {
    id: "documentation-support",
    icon: FileText,
    title: "Documentation & Regulatory Support",
    color: "#059669",
    gradient: "from-emerald-500 to-green-700",
    bg: "#d1fae5",
    desc: "Complete documentation and regulatory assistance for pharmaceutical trading operations. We handle all paperwork, licenses, and compliance requirements for smooth operations.",
    features: [
      "Export-import license management",
      "GST filing and tax documentation",
      "Health authority approvals coordination",
      "Product registration assistance",
      "Invoice and shipping documentation",
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
];

const whyChoose = [
  { icon: Shield, title: "Trusted Compliance", desc: "Fully registered and compliant with GST, IEC, and other international trade regulations.", gradient: "from-emerald-500 to-teal-600" },
  { icon: Globe, title: "Global Network", desc: "A robust logistics and partnership network spanning key international trade routes.", gradient: "from-blue-500 to-cyan-600" },
  { icon: Layers, title: "Multi-Category Expertise", desc: "Diverse portfolio ranging from pharmaceuticals to textiles and food products.", gradient: "from-purple-500 to-pink-600" },
  { icon: Users, title: "Dedicated Support", desc: "Single point of contact providing personalized solutions for your business needs.", gradient: "from-orange-500 to-red-600" },
  { icon: Award, title: "Quality Assurance", desc: "Stringent quality checks ensuring only the best products reach our clients.", gradient: "from-green-500 to-emerald-600" },
  { icon: Target, title: "Reliability", desc: "Proven track record of transparent, ethical, and timely business operations.", gradient: "from-indigo-500 to-purple-600" },
];

export default function Services() {
  const [heroRef, heroVisible] = useScrollAnimation();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1a3c22] via-[#2A5C32] to-[#1a3c22] text-white py-20 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div ref={heroRef} className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
          <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-green-200 mb-6 font-medium tracking-wide">
              <Link href="/" className="hover:text-white transition-colors hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white">Our Services</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white via-green-50 to-green-100 bg-clip-text text-transparent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Our Services
            </h1>
            
            <p className="text-green-100 max-w-2xl text-lg md:text-xl leading-relaxed mb-8">
              Comprehensive trading solutions â€” from global sourcing and export/import to logistics and contract manufacturing support.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#services-list" className="group px-8 py-4 bg-white text-[#2A5C32] rounded-full font-bold hover:bg-green-50 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 inline-flex items-center gap-2">
                Explore Services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Floating shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Services List */}
      <div id="services-list" className="max-w-[1440px] mx-auto px-4 md:px-6 py-16 md:py-24 scroll-mt-20">
        <div className="space-y-20 md:space-y-32">
          {services.map((service, i) => (
            <ServiceSection key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2A5C32] bg-white px-4 py-2 rounded-full mb-6 shadow-md">
              <Shield size={14} />
              Why Natura
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Why Choose Us as Your Trading Partner
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We bring unparalleled transparency, efficiency, and scale to your global sourcing operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <div
                key={item.title}
                className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <item.icon size={28} className="text-white" />
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#2A5C32] transition-colors duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A5C32] via-[#1a3c22] to-[#2A5C32] animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-200 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles size={14} />
            Let's Collaborate
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Need a Custom Trade Solution?
          </h2>
          
          <p className="text-green-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Our team will work with you to design a supply chain or procurement package that meets your specific business needs.
          </p>

          <Link href="/contact" className="group px-10 py-5 bg-white text-[#2A5C32] font-bold rounded-full transition-all duration-300 hover:bg-green-50 hover:shadow-2xl hover:shadow-white/20 inline-flex items-center gap-3 text-lg">
            Get a Custom Quote
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
      `}</style>
    </div>
  );
}

function ServiceSection({ service, index }) {
  const [ref, isVisible] = useScrollAnimation();
  const isReverse = index % 2 !== 0;

  return (
    <div 
      ref={ref}
      id={service.id} 
      className={`grid lg:grid-cols-2 gap-10 md:gap-16 items-center scroll-mt-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
    >
      <div className={isReverse ? "lg:col-start-2 lg:row-start-1" : ""}>
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}>
          <service.icon size={28} className="text-white" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {service.title}
        </h2>
        
        <p className="text-gray-600 leading-relaxed text-lg mb-8">
          {service.desc}
        </p>
        
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
          <ul className="space-y-4">
            {service.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={20} className="mt-0.5 shrink-0" style={{ color: service.color }} />
                <span className="text-gray-700 font-medium">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl"
          style={{ background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)` }}
        >
          Enquire Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className={`relative ${isReverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
        <div className="relative rounded-3xl overflow-hidden h-[400px] sm:h-[500px] shadow-2xl group">
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 mix-blend-multiply z-10 group-hover:opacity-10 transition-opacity duration-500`}></div>
          <img 
            loading="lazy" 
            decoding="async" 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          
          {/* Glass floating card */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl z-20 flex items-center justify-between group-hover:-translate-y-2 transition-transform duration-500">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                <service.icon size={18} className="text-white" />
              </div>
              <span className="font-bold text-gray-900">{service.title}</span>
            </div>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
          </div>
        </div>

        {/* Decorative background blob */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gray-100 rounded-full blur-3xl opacity-50"></div>
      </div>
    </div>
  );
}
