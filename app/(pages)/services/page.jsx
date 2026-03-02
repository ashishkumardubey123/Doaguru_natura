import Link from "next/link";
import {
  ArrowRight, Globe, Package, FileText, FlaskConical,
  Truck, Shield, CheckCircle, Users, Building2
} from "lucide-react";

const services = [
  {
    id: "export-services",
    icon: Globe,
    title: "Export Services",
    color: "#2A5C32",
    bg: "#e8f5e9",
    desc: "End-to-end pharmaceutical export solutions to 50+ countries with full regulatory support, documentation, and logistics coordination.",
    features: [
      "Export documentation & customs compliance",
      "Product registration assistance in target markets",
      "Cold chain logistics management",
      "INCOTERMS-based flexible shipping",
      "Order tracking & delivery confirmation",
      "Regulatory dossier preparation (CTD/ACTD)",
    ],
    image: "https://images.unsplash.com/photo-1765206257996-9b4a5d886a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "import-services",
    icon: Package,
    title: "Import Services",
    color: "#1d6fa4",
    bg: "#e8f4ff",
    desc: "Streamlined pharmaceutical import services with end-to-end handling of customs, quality testing, and local distribution setup.",
    features: [
      "Import clearance & customs documentation",
      "Local quality testing at approved labs",
      "Warehousing & temperature-controlled storage",
      "Distribution network setup",
      "Regulatory compliance review",
      "Re-labelling & secondary packaging",
    ],
    image: "https://images.unsplash.com/photo-1757578097654-fdae0f7cf008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "regulatory-support",
    icon: FileText,
    title: "Regulatory Support",
    color: "#7c3aed",
    bg: "#f3e8ff",
    desc: "Expert regulatory affairs support for product registrations, dossier submissions, and compliance management across multiple jurisdictions.",
    features: [
      "CTD/ACTD dossier preparation",
      "Product registration in 50+ countries",
      "WHO PQ application support",
      "Regulatory intelligence & monitoring",
      "GMP audit preparation & support",
      "Variation & renewal management",
    ],
    image: "https://images.unsplash.com/photo-1576765608689-c0e8f69a46b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "contract-mfg",
    icon: FlaskConical,
    title: "Contract Manufacturing",
    color: "#c2440c",
    bg: "#fff3e8",
    desc: "Full-scale contract manufacturing services on our WHO-GMP certified, USFDA-registered facilities for third-party brands and generic companies.",
    features: [
      "Formulation development & optimisation",
      "Technology transfer & scale-up",
      "Dedicated manufacturing capacity",
      "Full QC/QA testing & release",
      "Customised packaging & labelling",
      "Stability studies (ICH compliant)",
    ],
    image: "https://images.unsplash.com/photo-1581056771085-3ce30d907416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

const whyChoose = [
  { icon: Shield, title: "WHO-GMP Certified", desc: "All manufacturing sites certified to WHO-GMP and other international standards." },
  { icon: Globe, title: "Global Logistics", desc: "Established freight and cold chain partnerships across all major trade routes." },
  { icon: FileText, title: "Regulatory Expertise", desc: "In-house regulatory teams with registrations in 50+ countries." },
  { icon: Users, title: "Dedicated Account Managers", desc: "Single point of contact for all your supply and business needs." },
  { icon: Truck, title: "On-Time Delivery", desc: "98.5% on-time delivery rate with real-time order tracking systems." },
  { icon: Building2, title: "8 Manufacturing Plants", desc: "Diverse manufacturing capacity from tablets to sterile injectables." },
];

export default function Services() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0f2415] to-[#2A5C32] text-white py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-green-300 mb-3">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Our Services</span>
          </div>
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Services</h1>
          <p className="text-green-200 max-w-2xl text-lg">Comprehensive pharmaceutical solutions â€” from export & import to regulatory support and contract manufacturing.</p>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="space-y-16">
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid lg:grid-cols-2 gap-14 items-center scroll-mt-20 ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}
            >
              <div className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: service.bg }}>
                  <service.icon size={26} style={{ color: service.color }} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>{service.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle size={16} style={{ color: service.color, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:opacity-90"
                  style={{ backgroundColor: service.color }}
                >
                  Enquire About This Service <ArrowRight size={16} />
                </Link>
              </div>
              <div className={`relative rounded-3xl overflow-hidden h-[400px] ${i % 2 !== 0 ? "lg:col-start-1" : ""}`}>
                <img loading="lazy" decoding="async" src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${service.color}33 0%, transparent 60%)` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-20" style={{ backgroundColor: "#f7f9f8" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>Why Natura</span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Why Choose Us as Your Pharma Partner</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#e8f0e9" }}>
                  <item.icon size={22} style={{ color: "#2A5C32" }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #2A5C32 0%, #1a3c22 100%)" }}>
        <div className="max-w-[1440px] mx-auto px-6 text-center text-white">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Need a Custom Service Solution?</h2>
          <p className="text-green-200 mb-8 max-w-lg mx-auto">Our team will work with you to design a service package that meets your specific pharmaceutical supply needs.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white font-bold px-8 py-3.5 rounded-full" style={{ color: "#2A5C32" }}>
            Get a Custom Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
