"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, Users, Globe2, FlaskConical, CheckCircle, Leaf, Sparkles, FileText, Shield, TrendingUp, Building2, Phone, Mail, MapPin } from "lucide-react";

const certifications = [
  {
    name: "IEC Certificate",
    number: "CZGPC3313P",
    issueDate: "20/02/2025",
    authority: "DGFT, Ministry of Commerce and Industry",
    icon: Shield,
    color: "#2A5C32"
  },
  {
    name: "GST Registration",
    number: "23CZGPC3313P1ZH",
    issueDate: "18/03/2025",
    authority: "Government of India",
    icon: Award,
    color: "#0369a1"
  }
];

const values = [
  { icon: Award, title: "Quality First", desc: "Committed to delivering high-quality pharmaceutical and health care products.", gradient: "from-emerald-500 to-teal-600" },
  { icon: Globe2, title: "Export Ready", desc: "Authorized for import-export operations with proper licensing and certifications.", gradient: "from-blue-500 to-cyan-600" },
  { icon: Users, title: "Patient Centricity", desc: "Every decision guided by the impact on patient health and wellbeing.", gradient: "from-purple-500 to-pink-600" },
  { icon: Shield, title: "Compliance", desc: "Fully compliant with Indian regulatory standards including GST and foreign trade regulations.", gradient: "from-orange-500 to-red-600" },
  { icon: Leaf, title: "Natural Focus", desc: "Specializing in natural and herbal health care solutions.", gradient: "from-green-500 to-emerald-600" },
  { icon: CheckCircle, title: "Integrity", desc: "Transparent, ethical operations building trust with every stakeholder.", gradient: "from-indigo-500 to-purple-600" },
];

const businessCategories = [
  { name: "Chemicals or Allied Products", icon: FlaskConical },
  { name: "Food Products", icon: Sparkles },
  { name: "Pharmaceutical Products", icon: Award },
  { name: "Medical or Surgical Instruments", icon: Shield },
  { name: "Handicrafts", icon: Sparkles },
  { name: "Leather Products", icon: TrendingUp },
  { name: "Sports Goods", icon: Users },
  { name: "Textile & Apparel Products", icon: Sparkles },
  { name: "Agricultural or Allied Products", icon: Leaf },
];

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
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return [elementRef, isVisible];
};

// Counter animation component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      if (typeof end === 'number') {
        setCount(Math.floor(percentage * end));
      }

      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isVisible, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

export default function About() {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [overviewRef, overviewVisible] = useScrollAnimation();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section with Parallax Effect */}
      <div className="relative bg-gradient-to-br from-[#1a3c22] via-[#2A5C32] to-[#1a3c22] text-white py-20 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div ref={heroRef} className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
          <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-green-200 mb-6 font-medium tracking-wide">
              <Link href="/" className="hover:text-white transition-colors hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white">About Us</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 md:mb-8 tracking-tight bg-gradient-to-r from-white via-green-50 to-green-100 bg-clip-text text-transparent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              About Natura Health Care
            </h1>
            
            <p className="text-green-100 max-w-2xl text-lg md:text-xl leading-relaxed mb-8">
              Your trusted partner in pharmaceutical and health care products, committed to quality and compliance.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#certifications" className="group px-8 py-4 bg-white text-[#2A5C32] rounded-full font-bold hover:bg-green-50 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 inline-flex items-center gap-2">
                View Certifications
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="px-8 py-4 border-2 border-white/30 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Floating shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Stats Section with Animated Counters */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Registered", value: "2025", suffix: "" },
              { label: "Certified", value: "IEC", suffix: "" },
              { label: "Compliant", value: "GST", suffix: "" },
              { label: "Categories", value: 9, suffix: "+" },
            ].map((stat, i) => (
              <div 
                key={stat.label} 
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#2A5C32] to-[#0f7a3c] bg-clip-text text-transparent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {typeof stat.value === 'number' ? <AnimatedCounter end={stat.value} suffix={stat.suffix} /> : stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview with Stagger Animation */}
      <section ref={overviewRef} id="company-overview" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Image with Hover Effect */}
            <div className={`relative rounded-3xl overflow-hidden h-[350px] sm:h-[420px] lg:h-[550px] shadow-2xl group transition-all duration-700 ${overviewVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#2A5C32]/20 to-transparent z-10 group-hover:from-[#2A5C32]/10 transition-all duration-500"></div>
              <img loading="lazy" decoding="async"
                src="/media/aboutPage2.webp"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Natura Health Care"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl group-hover:shadow-2xl transition-all duration-500 z-20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2A5C32] to-[#0f7a3c] flex items-center justify-center">
                    <Building2 className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#2A5C32]" style={{ fontFamily: "'Montserrat', sans-serif" }}>2025</div>
                    <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">Established</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content with Stagger Effect */}
            <div className={`transition-all duration-700 delay-200 ${overviewVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2A5C32] bg-[#f0f7f1] px-4 py-2 rounded-full mb-6">
                <Sparkles size={14} />
                Who We Are
              </div>
              
              <h2 className="mb-6 text-gray-900 leading-tight text-3xl md:text-5xl font-extrabold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                A Registered Pharmaceutical{" "}
                <span className="bg-gradient-to-r from-[#2A5C32] to-[#0f7a3c] bg-clip-text text-transparent">
                  Trading Company
                </span>
              </h2>
              
              <div className="space-y-4 mb-8">
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  Natura Health Care is a proprietorship firm registered in Indore, Madhya Pradesh, specializing in pharmaceutical products, health care items, and related goods. We are authorized for both import and export operations under the Government of India's foreign trade regulations.
                </p>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  Our business is built on the foundation of regulatory compliance, quality assurance, and customer trust. With proper licensing and certifications, we operate across multiple product categories.
                </p>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                {["IEC Certified", "GST Registered", "Multi-Category", "Quality Assured"].map((feature, i) => (
                  <div 
                    key={feature}
                    className="px-4 py-2 bg-gradient-to-r from-[#2A5C32]/10 to-[#0f7a3c]/10 rounded-full text-sm font-semibold text-[#2A5C32] border border-[#2A5C32]/20 hover:border-[#2A5C32] hover:shadow-lg transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Categories with Card Flip Animation */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2A5C32] bg-white px-4 py-2 rounded-full mb-6 shadow-md">
              <Globe2 size={14} />
              Our Business
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Product Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Authorized to import and export across multiple categories
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {businessCategories.map((category, i) => (
              <div
                key={category.name}
                className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#2A5C32] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2A5C32]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2A5C32] to-[#0f7a3c] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <category.icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800 group-hover:text-[#2A5C32] transition-colors duration-300">
                      {category.name}
                    </span>
                  </div>
                  <CheckCircle size={20} className="text-[#2A5C32] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values with 3D Card Effect */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B4226] bg-orange-50 px-4 py-2 rounded-full mb-6">
              <Award size={14} />
              What Drives Us
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${v.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <v.icon size={28} className="text-white" />
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {v.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>

                {/* Corner decoration */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Details with Split Layout */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B4226] bg-white px-4 py-2 rounded-full mb-6 shadow-md">
              <Building2 size={14} />
              Company Information
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Business Details
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Company Info Card */}
            <div className="group bg-white rounded-3xl p-8 md:p-10 border-2 border-gray-100 hover:border-[#2A5C32] hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#2A5C32]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2A5C32] to-[#0f7a3c] flex items-center justify-center shadow-lg">
                    <FileText className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-2xl text-[#2A5C32]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Company Information
                  </h3>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Legal Name", value: "Kushagra Chaturvedi" },
                    { label: "Trade Name", value: "NATURA HEALTH CARE" },
                    { label: "Constitution", value: "Proprietorship" },
                    { label: "PAN", value: "CZGPC3313P" },
                  ].map((item, i) => (
                    <div 
                      key={item.label}
                      className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-3 rounded-lg transition-all duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <span className="text-gray-600 font-medium">{item.label}:</span>
                      <span className="font-bold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="group bg-gradient-to-br from-[#2A5C32] to-[#1a3c22] rounded-3xl p-8 md:p-10 text-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Registered Address
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="font-semibold text-lg">31 R.R. Avenue, Tulsi Nagar</p>
                  <p className="text-green-100">Near Mahalaxmi Nagar, Nipania</p>
                  <p className="text-green-100">Indore, Madhya Pradesh - 452010/452016</p>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-300">
                    <Phone size={18} className="text-green-200" />
                    <span className="text-green-100">+91 7000657818</span>
                  </div>
                  <div className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-300">
                    <Mail size={18} className="text-green-200" />
                    <span className="text-green-100 break-all">chandrayanherbal@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications with 3D Cards */}
      <section id="certifications" className="py-16 md:py-24 bg-white scroll-mt-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-100 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-green-100 rounded-full opacity-10 blur-3xl"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B4226] bg-orange-50 px-4 py-2 rounded-full mb-6">
              <Shield size={14} />
              Our Credentials
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Certifications & Licenses
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Officially recognized and certified by Government of India
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {certifications.map((cert, i) => (
              <div
                key={cert.number}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-10 border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden"
                style={{ 
                  animationDelay: `${i * 200}ms`,
                  transform: 'perspective(1000px) rotateX(0deg)'
                }}
              >
                {/* Animated gradient background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${cert.color}15 0%, ${cert.color}05 100%)`
                  }}
                ></div>

                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `radial-gradient(circle, ${cert.color}20 0%, transparent 70%)` }}></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                      style={{ background: `linear-gradient(135deg, ${cert.color} 0%, ${cert.color}dd 100%)` }}
                    >
                      <cert.icon className="text-white" size={28} />
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      VERIFIED
                    </div>
                  </div>

                  <h3 className="font-bold text-2xl text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {cert.name}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cert.color }}></div>
                      <span className="text-sm text-gray-600">Certificate Number:</span>
                      <span className="font-bold text-gray-900">{cert.number}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cert.color }}></div>
                      <span className="text-sm text-gray-600">Issued on:</span>
                      <span className="font-semibold text-gray-900">{cert.issueDate}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {cert.authority}
                    </p>
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient Animation */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A5C32] via-[#1a3c22] to-[#2A5C32] animate-gradient-shift"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-200 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles size={14} />
            Get in Touch
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Partner with{" "}
            <span className="bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent">
              Natura Health Care?
            </span>
          </h2>
          
          <p className="text-green-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with us for pharmaceutical and health care product requirements. We're here to serve you with quality and compliance.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="group px-10 py-5 bg-white text-[#2A5C32] font-bold rounded-full transition-all duration-300 hover:bg-green-50 hover:shadow-2xl hover:shadow-white/20 inline-flex items-center gap-3 text-lg">
              Contact Us Today
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link href="/products" className="px-10 py-5 border-2 border-white/30 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-3 text-lg">
              View Products
            </Link>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Add custom styles for animations */}
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