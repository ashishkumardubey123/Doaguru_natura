import Link from "next/link";
import { Calendar, ArrowRight, Download, Camera, ExternalLink } from "lucide-react";

const newsArticles = [
  {
    date: "February 18, 2025", category: "Manufacturing",
    title: "WHO-GMP Certification Granted for New Injectable Facility",
    excerpt: "Our Vadodara injectable facility has passed WHO-GMP inspection, expanding critical medicine production capacity by 40%.",
    image: "https://images.unsplash.com/photo-1581056771085-3ce30d907416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    date: "January 30, 2025", category: "Partnerships",
    title: "8-Country Africa Distribution Deal Signed",
    excerpt: "A landmark five-year distribution agreement will expand access to Natura's anti-infective and oncology portfolio across Sub-Saharan Africa.",
    image: "https://images.unsplash.com/photo-1571645163064-77faa9676a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    date: "January 15, 2025", category: "R&D",
    title: "Phase III Trials Begin for NHC-CV401",
    excerpt: "Our novel cardiovascular compound NHC-CV401 has entered Phase III clinical trials targeting treatment-resistant hypertension.",
    image: "https://images.unsplash.com/photo-1766297246929-3b69ca8b175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
];

const pressReleases = [
  { date: "February 18, 2025", category: "Manufacturing", title: "Natura Health Care Receives WHO-GMP Certification for New Injectable Plant in Vadodara", excerpt: "The certification expands parenteral production capacity by 40%.", tag: "New" },
  { date: "January 30, 2025", category: "Business Development", title: "Strategic Distribution Agreement Signed for Sub-Saharan Africa Covering 8 Nations", excerpt: "A landmark 5-year exclusive distribution agreement covering Nigeria, Ghana, Kenya and 5 other markets." },
  { date: "January 15, 2025", category: "R&D", title: "Phase III Clinical Trial Initiated for NHC-CV401 in Treatment-Resistant Hypertension", excerpt: "The multi-centre Phase III trial across 24 sites in India, Europe, and the UAE will enrol 850 patients." },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1757578097654-fdae0f7cf008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Oral Solids Manufacturing â€” Ahmedabad Unit I" },
  { src: "https://images.unsplash.com/photo-1576765608689-c0e8f69a46b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Central R&D Institute" },
  { src: "https://images.unsplash.com/photo-1581056771085-3ce30d907416?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "Injectable Production Line â€” Vadodara" },
  { src: "https://images.unsplash.com/photo-1766297246929-3b69ca8b175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", caption: "QC Laboratory" },
];

export default function Media() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0f2415] to-[#2A5C32] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-green-300 mb-3">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Media</span>
          </div>
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>News & Media</h1>
          <p className="text-green-200 max-w-xl">Latest news, press releases, and photo gallery from Natura Health Care.</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        {/* News */}
        <div id="news" className="scroll-mt-24 mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>Latest News & Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {newsArticles.map((article, i) => (
              <article key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img loading="lazy" decoding="async" src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: "#2A5C32" }}>
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Calendar size={11} /> {article.date}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#2A5C32] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{article.excerpt}</p>
                  <button className="flex items-center gap-1 text-sm font-semibold text-[#2A5C32] hover:text-[#234e2a] transition-colors">
                    Read More <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Press Releases */}
        <div id="press" className="scroll-mt-24 mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>Press Releases</h2>
          <div className="space-y-4">
            {pressReleases.map((pr, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#2A5C32" }}>{pr.category}</span>
                      {pr.tag && <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white bg-red-500">NEW</span>}
                      <span className="flex items-center gap-1.5 text-xs text-gray-400"><Calendar size={11} />{pr.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 leading-snug" style={{ fontFamily: "'Montserrat', sans-serif" }}>{pr.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{pr.excerpt}</p>
                  </div>
                  <button className="shrink-0 flex items-center gap-1 text-sm font-semibold text-[#2A5C32] hover:text-[#234e2a] transition-colors">
                    Read <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div id="gallery" className="scroll-mt-24 mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>Photo Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden h-52 cursor-pointer">
                <img loading="lazy" decoding="async" src={img.src} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all" />
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium leading-snug">{img.caption}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <Camera size={14} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
