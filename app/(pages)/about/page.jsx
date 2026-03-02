import Link from "next/link";
import { ArrowRight, Award, Users, Globe2, FlaskConical, CheckCircle, Leaf } from "lucide-react";

const timeline = [
  { year: "1998", title: "Founded in Ahmedabad", desc: "Natura Health Care started as a small formulation unit with 50 employees and a vision to supply quality generics domestically." },
  { year: "2003", title: "First Export License", desc: "Obtained our first export license and started supplying to Sri Lanka and Nepal, marking the beginning of our global journey." },
  { year: "2008", title: "WHO-GMP Certification", desc: "Achieved WHO-GMP certification for our oral solids plant â€” opening doors to regulated markets across Asia, Africa and beyond." },
  { year: "2012", title: "USFDA Registration", desc: "Successfully registered two manufacturing units with the USFDA, enabling supply to the lucrative US generics market." },
  { year: "2016", title: "European Expansion", desc: "Established the Basel packaging and distribution hub, gaining EU GMP certification and access to European markets." },
  { year: "2020", title: "COVID-19 Response", desc: "Pivoted manufacturing capacity to produce critical medicines for COVID-19, supplying to 35 countries through UNICEF and WHO procurement." },
  { year: "2024", title: "50 Countries Milestone", desc: "Reached the milestone of serving 50+ countries with 500+ products, 8 manufacturing plants, and 3,500+ employees globally." },
];

const leadership = [
  {
    name: "Dr. Rajesh Mehta",
    role: "Chairman & Managing Director",
    bio: "25+ years in pharmaceutical industry. Former board member of Pharmexcil. Drives Natura's global vision and strategic direction.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
  },
  {
    name: "Mrs. Priya Sharma",
    role: "Chief Executive Officer",
    bio: "MBA from INSEAD. Led Natura's international expansion across Africa and the Americas. Champion of operational excellence.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
  },
  {
    name: "Dr. Klaus Weber",
    role: "Chief Scientific Officer",
    bio: "PhD Pharmaceutical Sciences, ETH Zurich. Heads our R&D strategy with 280+ scientists under his leadership.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
  },
  {
    name: "Mr. Arun Patel",
    role: "Chief Financial Officer",
    bio: "Chartered Accountant with 20+ years of experience in pharmaceutical finance. Led Natura's Series B and C funding rounds.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300",
  },
];

const values = [
  { icon: Award, title: "Quality First", desc: "Every product, every batch, every time â€” uncompromising quality is our foundation." },
  { icon: Globe2, title: "Global Mindset", desc: "We think globally but act locally, understanding the unique needs of every market we serve." },
  { icon: Users, title: "Patient Centricity", desc: "Every decision we make is guided by the impact it has on the patient at the end of the supply chain." },
  { icon: FlaskConical, title: "Innovation", desc: "Continuous investment in R&D ensures we stay at the forefront of pharmaceutical science." },
  { icon: Leaf, title: "Sustainability", desc: "We are committed to environmentally responsible manufacturing and carbon neutrality goals." },
  { icon: CheckCircle, title: "Integrity", desc: "Transparent, ethical, and compliant operations build trust with every stakeholder." },
];

export default function About() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div className="relative bg-[#1a3c22] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async"
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1440"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            alt="About Us Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c22] via-[#1a3c22]/80 to-transparent"></div>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-green-300 mb-4 font-medium tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>About Natura Health Care</h1>
          <p className="text-green-100 max-w-2xl text-base md:text-lg leading-relaxed">
            25 years of pharmaceutical excellence. From a single formulation unit in Ahmedabad to a global leader serving 50+ countries.
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <section id="company-overview" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden h-[300px] sm:h-[380px] lg:h-[500px] shadow-2xl">
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1757578097654-fdae0f7cf008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Natura manufacturing"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-3xl font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>8</div>
                <div className="text-sm font-medium text-green-300 uppercase tracking-wider">Global Plants</div>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2A5C32] bg-[#f0f7f1] px-3 py-1.5 rounded-full">Who We Are</span>
              <h2 className="mt-5 md:mt-6 mb-4 md:mb-6 text-gray-900 leading-tight text-3xl md:text-4xl font-extrabold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                A Global Pharmaceutical Company Driven by Purpose
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 md:mb-6 text-base md:text-lg">
                Natura Health Care is a fully integrated pharmaceutical company with capabilities spanning API synthesis, formulation development, manufacturing, regulatory affairs, and global distribution. Founded in 1998, we have grown from a domestic generics supplier to a trusted partner for health ministries, hospital networks, and international aid organizations worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
                Our 8 manufacturing facilitiesâ€”certified by WHO, USFDA, and EU GMP authoritiesâ€”produce over 500 formulations across 25 dosage forms. Our portfolio addresses critical therapy areas including cardiology, oncology, neurology, diabetes, and infectious diseases.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                {[
                  { v: "1998", l: "Founded" }, { v: "500+", l: "Products" },
                  { v: "50+", l: "Countries" }, { v: "3,500+", l: "Employees" },
                ].map((s) => (
                  <div key={s.l} className="bg-gray-50 rounded-2xl p-4 md:p-5 border border-gray-100 text-center hover:border-[#2A5C32] hover:shadow-md transition-all">
                    <div className="text-3xl font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif", color: "#2A5C32" }}>{s.v}</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey / Timeline */}
      <section id="our-journey" className="py-16 md:py-24 scroll-mt-20 relative overflow-hidden" style={{ backgroundColor: "#f7f9f8" }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full opacity-10 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full opacity-10 -ml-48 -mb-48"></div>
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-5 -translate-x-1/2"></div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full" style={{ color: "#2A5C32", backgroundColor: "#e8f0e9" }}>Our Story</span>
            <h2 className="mt-5 md:mt-6 text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>25 Years of Pharmaceutical Excellence</h2>
            <p className="mt-3 text-sm md:text-base text-gray-600 max-w-3xl mx-auto">From a single formulation unit in Ahmedabad to a global pharmaceutical leader. Witness our remarkable journey of innovation, growth, and impact across 50+ countries.</p>
          </div>
          <div className="relative lg:mt-16">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2A5C32] via-[#2A5C32] to-transparent -translate-x-1/2 hidden lg:block" />
            <div className="space-y-8 lg:space-y-12">
              {timeline.map((item, i) => {
                const colorSchemes = [
                  { primary: "#2A5C32", light: "#e8f0e9", accent: "#0f7a3c" },
                  { primary: "#1a6f5e", light: "#e0f5f1", accent: "#0d9488" },
                  { primary: "#0369a1", light: "#e0f2fe", accent: "#0284c7" },
                  { primary: "#7c2d12", light: "#fed7aa", accent: "#ea580c" },
                  { primary: "#6b21a8", light: "#f3e8ff", accent: "#a855f7" },
                  { primary: "#1e40af", light: "#dbeafe", accent: "#2563eb" },
                  { primary: "#15803d", light: "#f0fdf4", accent: "#22c55e" },
                ];
                const colors = colorSchemes[i % colorSchemes.length];
                const isLeftCard = i % 2 === 0;
                
                const TimelineCard = () => (
                  <div className={`bg-white rounded-2xl border-2 p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:-translate-y-1`} style={{ borderColor: colors.primary }}>
                    <div className="flex items-center justify-between mb-4 gap-3">
                      <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full" style={{ backgroundColor: colors.primary }}>{item.year}</span>
                      <span className="text-2xl" style={{ color: colors.primary }}>âœ¦</span>
                    </div>
                    <div className="font-bold text-xl text-gray-900 mb-3 group-hover:text-white group-hover:px-3 group-hover:py-2 group-hover:rounded-lg group-hover:transition-all" style={{ fontFamily: "'Montserrat', sans-serif", color: colors.primary }}>{item.title}</div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                    <div className="h-1 w-0 group-hover:w-full transition-all duration-300 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                  </div>
                );
                
                return (
                  <div key={i} className="flex gap-4 lg:gap-12 items-stretch">
                    {/* Left Card */}
                    <div className="hidden lg:flex flex-1 flex-col justify-center">
                      {isLeftCard ? <TimelineCard /> : null}
                    </div>
                    
                    {/* Center Timeline Dot */}
                    <div className="hidden lg:flex w-16 h-16 rounded-full items-center justify-center shrink-0 text-white font-bold text-lg z-20 ring-4 shadow-lg transition-transform hover:scale-110 duration-300" style={{ backgroundColor: colors.primary, ringColor: colors.light }}>
                      {i + 1}
                    </div>
                    
                    {/* Right Card */}
                    <div className="hidden lg:flex flex-1 flex-col justify-center">
                      {!isLeftCard ? <TimelineCard /> : null}
                    </div>
                    
                    {/* Mobile Timeline Card */}
                    <div className="lg:hidden flex-1">
                      <div className={`bg-white rounded-2xl border-2 p-5 shadow-md hover:shadow-xl transition-all`} style={{ borderColor: colors.primary }}>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: colors.primary }}>
                              {i + 1}
                            </div>
                            <span className="text-xs font-bold text-white px-2.5 py-1 rounded-full" style={{ backgroundColor: colors.primary }}>{item.year}</span>
                          </div>
                          <span className="text-xl" style={{ color: colors.primary }}>âœ¦</span>
                        </div>
                        <div className="font-bold text-gray-900 mb-2 text-sm" style={{ fontFamily: "'Montserrat', sans-serif", color: colors.primary }}>{item.title}</div>
                        <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>What Drives Us</span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-gray-50 rounded-2xl p-5 md:p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#e8f0e9" }}>
                  <v.icon size={22} style={{ color: "#2A5C32" }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-16 md:py-20 scroll-mt-20" style={{ backgroundColor: "#f7f9f8" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>Our Team</span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Leadership Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {leadership.map((person) => (
              <div key={person.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-52 md:h-56 overflow-hidden">
                  <img loading="lazy" decoding="async" src={person.image} alt={person.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-bold text-gray-900 mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{person.name}</h3>
                  <div className="text-xs font-semibold mb-3" style={{ color: "#2A5C32" }}>{person.role}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B4226" }}>Our Credentials</span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>Certifications & Accreditations</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
            {["WHO-GMP", "ISO 9001:2015", "USFDA Registered", "EU GMP", "ISO 14001:2015", "PICS GMP"].map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2 md:gap-3 bg-gray-50 rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-gray-100 hover:shadow-md transition-all"
              >
                <CheckCircle size={20} style={{ color: "#2A5C32" }} />
                <span className="font-bold text-sm md:text-base text-gray-800">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-16" style={{ background: "linear-gradient(135deg, #2A5C32 0%, #1a3c22 100%)" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 text-center text-white">
          <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ready to Partner with Natura?</h2>
          <p className="text-green-200 text-sm md:text-base mb-7 md:mb-8 max-w-lg mx-auto">Join hundreds of distributors and healthcare organisations that trust Natura Health Care.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white font-bold px-8 py-3.5 rounded-full" style={{ color: "#2A5C32" }}>
            Contact Us Today <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
