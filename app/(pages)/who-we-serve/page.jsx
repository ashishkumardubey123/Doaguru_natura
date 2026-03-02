'use client';

import Link from "next/link";
import { ChevronRight, Building2, Truck, FlaskConical, Landmark, Clock, ShieldCheck, Award, PhoneCall, CheckCircle2, ArrowRight, Globe, Package, Users, TrendingUp } from "lucide-react";

export default function WhoWeServe() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div className="relative bg-[#0f2415] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
          <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440" alt="Hospital Building" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2415] to-[#2A5C32]/80 z-0"></div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-green-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Who We Serve</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Serving Diverse Healthcare Stakeholders
          </h1>
          <p className="text-green-100 max-w-2xl text-lg">
            Tailored pharmaceutical supply solutions for every segment of the healthcare ecosystem.
          </p>
        </div>
      </div>

      {/* Hospitals & Pharmacies */}
      <section id="hospitals" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-[#2A5C32]">
                  <Building2 size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Healthcare Providers</div>
                  <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Hospitals & Pharmacies</h2>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We supply directly to public and private hospital networks, retail pharmacy chains, and institutional buying groups worldwide. Our hospital supply programme ensures critical medicines are always available â€” from oncology injectables to cardiac generics â€” with all regulatory documentation in order.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4 flex gap-4">
                  <Clock className="text-[#2A5C32] shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Emergency Supply</h4>
                    <p className="text-xs text-gray-500 mt-1">48â€“72 hour dispatch for urgent hospital procurement with temperature-controlled delivery</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex gap-4">
                  <ShieldCheck className="text-[#2A5C32] shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Direct Import Support</h4>
                    <p className="text-xs text-gray-500 mt-1">Country-specific import permit assistance and customs clearance coordination</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex gap-4">
                  <Award className="text-[#2A5C32] shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Quality Guarantee</h4>
                    <p className="text-xs text-gray-500 mt-1">Every product supplied with full batch documentation, COA, and shelf-life assurance</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex gap-4">
                  <PhoneCall className="text-[#2A5C32] shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Dedicated Account Manager</h4>
                    <p className="text-xs text-gray-500 mt-1">Single point of contact for all hospital procurement queries and emergency requests</p>
                  </div>
                </div>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#0f7a3c] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0c6330] transition-colors">
                Partner with Us <ArrowRight size={16} />
              </Link>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" alt="Hospital" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Distributors */}
      <section id="distributors" className="py-20 bg-[#fdfbf7] scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-3xl overflow-hidden shadow-xl">
              <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" alt="Warehouse" className="w-full h-full object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Truck size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Trade Partners</div>
                  <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Distributors</h2>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Natura Health Care actively seeks exclusive and non-exclusive distribution partnerships across our 50+ target markets. Distributors benefit from competitive pricing, strong brand equity, regulatory support, and dedicated field marketing resources.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Exclusive territory agreements", "Competitive ex-works pricing",
                  "Marketing and promotional materials", "Product training and MedEd support",
                  "Regulatory registration assistance", "Co-branding opportunities",
                  "Annual business review meetings", "Flexible payment terms"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-[#0f7a3c] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
                  <div className="text-xl font-bold text-[#0f7a3c]">500+</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">SKUs Available</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
                  <div className="text-xl font-bold text-[#0f7a3c]">$50K</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Min. Order Value</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
                  <div className="text-xl font-bold text-[#0f7a3c]">30</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Payment Days (NET)</div>
                </div>
              </div>

              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#0f7a3c] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0c6330] transition-colors">
                Become a Distributor <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pharma Companies */}
      <section id="pharma" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <FlaskConical size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500">B2B Pharma</div>
                  <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Pharma Companies</h2>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We provide specialized B2B pharmaceutical services to innovator and generic companies including comparator product sourcing for clinical trials, contract manufacturing, technology licensing, and parallel import services for market entry.
              </p>
              
              <div className="space-y-3 mb-8">
                {[
                  "Reference & comparator products for Phase Iâ€“IV clinical trials",
                  "Contract manufacturing for generic & specialty products",
                  "API sourcing and supply agreements",
                  "Technology transfer and in-licensing arrangements",
                  "Market entry via parallel import in EU, UK, Switzerland",
                  "Dossier preparation and regulatory filing support"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-[#0f7a3c] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Partnership Process</div>
                <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                  <span className="bg-green-50 text-[#0f7a3c] px-3 py-1.5 rounded-full">Initial Discussion</span>
                  <ArrowRight size={14} className="text-gray-300" />
                  <span className="bg-green-50 text-[#0f7a3c] px-3 py-1.5 rounded-full">NDA/CDA</span>
                  <ArrowRight size={14} className="text-gray-300" />
                  <span className="bg-green-50 text-[#0f7a3c] px-3 py-1.5 rounded-full">Technical Review</span>
                  <ArrowRight size={14} className="text-gray-300" />
                  <span className="bg-green-50 text-[#0f7a3c] px-3 py-1.5 rounded-full">Quality Agreement</span>
                  <ArrowRight size={14} className="text-gray-300" />
                  <span className="bg-green-50 text-[#0f7a3c] px-3 py-1.5 rounded-full">Commercial Terms</span>
                  <ArrowRight size={14} className="text-gray-300" />
                  <span className="bg-green-50 text-[#0f7a3c] px-3 py-1.5 rounded-full">Launch</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" alt="Scientist" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Government & Public Health */}
      <section id="government" className="py-20 bg-[#fdfbf7] scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <Landmark size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Public Sector</div>
                  <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Government & Public Health</h2>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Natura Health Care actively participates in government health ministry tenders, national health insurance supply programmes, UNICEF and WHO procurement, and emergency health stockpiling contracts across 30+ countries.
              </p>
              
              <h3 className="font-bold text-gray-900 mb-4">Tender Participation Process</h3>
              <div className="space-y-4">
                {[
                  { title: "Tender Identification", desc: "Active monitoring of government and international agency tenders across all target markets" },
                  { title: "Eligibility Assessment", desc: "Verification of product registration, GMP status, and local regulatory approvals" },
                  { title: "Dossier Submission", desc: "Complete tender package: technical dossiers, price schedules, certificates, samples" },
                  { title: "Evaluation Support", desc: "Response to technical queries, factory inspections, and compliance reviews" },
                  { title: "Contract Execution", desc: "Supply agreement signing, performance bond, and delivery schedule confirmation" },
                  { title: "Delivery & Reporting", desc: "On-time delivery with all required documentation and periodic progress reporting" }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#0f7a3c] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{step.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                  <Globe className="mx-auto text-[#0f7a3c] mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-900">30+</div>
                  <div className="text-xs text-gray-500 mt-1">Government Tender Markets</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                  <Package className="mx-auto text-[#0f7a3c] mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-900">150+</div>
                  <div className="text-xs text-gray-500 mt-1">Tender SKUs Available</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                  <Award className="mx-auto text-[#0f7a3c] mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-xs text-gray-500 mt-1">On-Time Delivery Rate</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                  <Users className="mx-auto text-[#0f7a3c] mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-xs text-gray-500 mt-1">UN Agency Partnerships</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                  <TrendingUp className="mx-auto text-[#0f7a3c] mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-900">USD 85M+</div>
                  <div className="text-xs text-gray-500 mt-1">Govt. Contracts FY24</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                  <ShieldCheck className="mx-auto text-[#0f7a3c] mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-900">WHO PQ</div>
                  <div className="text-xs text-gray-500 mt-1">Pre-Qualified Products</div>
                </div>
              </div>
              <Link href="/contact" className="w-full flex items-center justify-center gap-2 bg-[#0f7a3c] text-white font-semibold px-6 py-4 rounded-xl hover:bg-[#0c6330] transition-colors">
                Submit Tender Inquiry <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
