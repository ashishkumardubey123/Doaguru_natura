import Link from "next/link";
import {
  Shield, Award, FlaskConical,
  CheckCircle, ArrowRight, Building2, Microscope,
  Thermometer, Activity
} from "lucide-react";

const facilities = [
  {
    name: "Unit I â€” Oral Solids",
    location: "Ahmedabad, Gujarat, India",
    certifications: ["WHO-GMP", "ISO 9001", "USFDA"],
    capacity: "5 Billion tablets/year",
    area: "120,000 sq. ft.",
    products: "Tablets, Capsules, Dry Powder",
    image: "https://images.unsplash.com/photo-1757578097654-fdae0f7cf008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    name: "Unit II â€” Injectables",
    location: "Vadodara, Gujarat, India",
    certifications: ["WHO-GMP", "EU GMP", "ISO 13485"],
    capacity: "200 Million vials/year",
    area: "85,000 sq. ft.",
    products: "IV Bags, Vials, Ampoules",
    image: "https://images.unsplash.com/photo-1581056771085-3ce30d907416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    name: "Unit III â€” API Synthesis",
    location: "Hyderabad, Telangana, India",
    certifications: ["WHO-GMP", "USFDA", "PICS GMP"],
    capacity: "1,200 MT bulk API/year",
    area: "250,000 sq. ft.",
    products: "Active Pharmaceutical Ingredients",
    image: "https://images.unsplash.com/photo-1766297246929-3b69ca8b175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    name: "European Packaging Hub",
    location: "Basel, Switzerland",
    certifications: ["EU GMP", "ISO 9001", "GDP Certified"],
    capacity: "15 Million units/year",
    area: "30,000 sq. ft.",
    products: "Secondary Packaging, Labelling",
    image: "https://images.unsplash.com/photo-1762439183787-54302c4dfb9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

const qaProcesses = [
  {
    title: "Incoming Material Testing",
    desc: "Every raw material and excipient undergoes rigorous identity, purity, and potency testing before release to manufacturing.",
    icon: FlaskConical,
    steps: ["Vendor qualification audit", "CoA verification", "Identity testing by HPLC/GC", "Microbial testing", "Release to manufacturing"],
  },
  {
    title: "In-Process Quality Control",
    desc: "Real-time monitoring during production ensures every batch meets defined parameters.",
    icon: Activity,
    steps: ["Weight variation checks", "Dissolution testing", "Blend uniformity", "Coating weight gain", "Leak testing for injectables"],
  },
  {
    title: "Finished Product Testing",
    desc: "Comprehensive batch release testing includes physical, chemical, microbiological, and stability assessments.",
    icon: Microscope,
    steps: ["Assay & related substances", "Dissolution profile", "Sterility testing", "Particulate matter analysis", "Container closure integrity"],
  },
  {
    title: "Stability Programme",
    desc: "Accelerated and real-time stability studies across ICH-defined zones ensure shelf-life substantiation.",
    icon: Thermometer,
    steps: ["ICH Q1A compliant design", "25Â°C/60% RH long-term", "40Â°C/75% RH accelerated", "Photostability studies", "Data trending and review"],
  },
];

const gmpItems = [
  {
    title: "USFDA Compliance",
    desc: "Three of our manufacturing units are registered with the USFDA and have successfully completed multiple pre-approval and surveillance inspections with zero critical observations.",
    detail: "Last inspection: October 2024 â€” No Action Indicated (NAI)",
  },
  {
    title: "WHO-GMP Pre-qualification",
    desc: "All facilities comply with WHO-GMP Technical Report Series standards, enabling supply to UNICEF, MSF, and international healthcare procurement agencies.",
    detail: "Current valid certificates for all 8 manufacturing units.",
  },
  {
    title: "European GMP (EMA)",
    desc: "Our Basel hub and two Indian formulation plants hold current EU GMP certificates issued by competent authorities in Switzerland and Germany.",
    detail: "Batch certification capability for EU market supply.",
  },
  {
    title: "PICS GMP Compliance",
    desc: "Full compliance with Pharmaceutical Inspection Co-operation Scheme requirements enables regulatory acceptance across 50+ PICS member countries.",
    detail: "Part I, II, and III documentation maintained.",
  },
];

const rdCenters = [
  {
    name: "Central R&D Institute",
    location: "Ahmedabad, Gujarat, India",
    focus: "Formulation Development & Optimisation",
    scientists: "280+",
    molecules: "80+",
    image: "https://images.unsplash.com/photo-1576765608689-c0e8f69a46b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    name: "API Research Centre",
    location: "Hyderabad, Telangana, India",
    focus: "Novel API Synthesis & Process Chemistry",
    scientists: "120+",
    molecules: "40+",
    image: "https://images.unsplash.com/photo-1766297246929-3b69ca8b175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    name: "Bioequivalence Centre",
    location: "Zurich, Switzerland",
    focus: "Clinical Pharmacology & BE Studies",
    scientists: "45+",
    molecules: "25+",
    image: "https://images.unsplash.com/photo-1581056771085-3ce30d907416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

export default function Manufacturing() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0f2415] to-[#2A5C32] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-green-300 mb-3">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Manufacturing</span>
          </div>
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Manufacturing Excellence</h1>
          <p className="text-green-200 max-w-xl">8 WHO-GMP certified facilities across India & Europe, producing 500+ formulations for global markets.</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        {/* Overview Tab */}
        <div id="overview" className="scroll-mt-24 mb-20">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>Our Facilities</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              State-of-the-Art Manufacturing Plants
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl">
              Our manufacturing infrastructure spans across India and Europe, designed to the highest international standards with full traceability, automation, and quality systems.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {facilities.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img loading="lazy" decoding="async" src={f.image} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>{f.name}</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Building2 size={14} /> {f.location}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-400 mb-1">Capacity</div>
                      <div className="text-sm font-semibold text-gray-800">{f.capacity}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-400 mb-1">Facility Area</div>
                      <div className="text-sm font-semibold text-gray-800">{f.area}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-2">Products</div>
                    <div className="text-sm text-gray-700">{f.products}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {f.certifications.map((c) => (
                      <span key={c} className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#2A5C32" }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Assurance Tab */}
        <div id="qa" className="scroll-mt-24 mb-20">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>QA Systems</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Quality from Source to Patient</h2>
            <p className="mt-3 text-gray-500 max-w-2xl">Our multi-layered quality system ensures that every batch that leaves our facilities meets or exceeds international pharmacopoeial standards.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {qaProcesses.map((qa, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:border-[#d7e9da] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#f0f7f1" }}>
                  <qa.icon size={22} style={{ color: "#2A5C32" }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{qa.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{qa.desc}</p>
                <ul className="space-y-2">
                  {qa.steps.map((step, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} style={{ color: "#2A5C32" }} />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* GMP Compliance Tab */}
        <div id="gmp" className="scroll-mt-24 mb-20">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>Regulatory Compliance</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>GMP & Regulatory Standing</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {gmpItems.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border-l-4 border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:border-[#d7e9da] transition-all duration-300" style={{ borderLeftColor: "#2A5C32" }}>
                <h3 className="font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg" style={{ backgroundColor: "#f0f7f1", color: "#2A5C32" }}>
                  <CheckCircle size={13} /> {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* R&D Centers Tab */}
        <div id="rnd" className="scroll-mt-24 mb-10">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>Innovation</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Research & Development Centres</h2>
            <p className="mt-3 text-gray-500 max-w-2xl">Our R&D network drives continuous innovation in formulation science, API chemistry, and clinical development.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {rdCenters.map((center, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 hover:border-[#d7e9da] transition-all duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img loading="lazy" decoding="async" src={center.image} alt={center.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{center.name}</h3>
                  <div className="text-xs text-gray-400 mb-3">{center.location}</div>
                  <div className="text-sm text-gray-600 mb-4">{center.focus}</div>
                  <div className="flex gap-4">
                    <div>
                      <div className="text-lg font-bold" style={{ color: "#2A5C32", fontFamily: "'Montserrat', sans-serif" }}>{center.scientists}</div>
                      <div className="text-xs text-gray-400">Scientists</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold" style={{ color: "#2A5C32", fontFamily: "'Montserrat', sans-serif" }}>{center.molecules}</div>
                      <div className="text-xs text-gray-400">Molecules</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #2A5C32 0%, #1a3c22 100%)" }}>
        <div className="max-w-[1440px] mx-auto px-6 text-center text-white">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Interested in Contract Manufacturing?</h2>
          <p className="text-green-200 mb-8 max-w-lg mx-auto">Partner with our WHO-GMP certified facilities for your manufacturing requirements.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#2A5C32] font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-[#f0f7f1] hover:text-[#1f4b28] hover:shadow-lg">
            Enquire Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
