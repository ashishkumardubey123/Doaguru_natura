import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";

export default function Sitemap() {
  const sitemapLinks = [
    {
      category: "Company",
      links: [
        { name: "Home", url: "/" },
        { name: "About Us", url: "/about" },
        { name: "Global Presence", url: "/global-presence" },
        { name: "Investors", url: "/investors" },
        { name: "Media", url: "/media" },
        { name: "Contact Us", url: "/contact" },
      ]
    },
    {
      category: "Our Business",
      links: [
        { name: "Products", url: "/products" },
        { name: "Manufacturing", url: "/manufacturing" },
        { name: "Services", url: "/services" },
        { name: "Who We Serve", url: "/who-we-serve" },
      ]
    },
    {
      category: "Legal",
      links: [
        { name: "Privacy Policy", url: "/privacy-policy" },
        { name: "Terms and Conditions", url: "/terms-conditions" },
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div className="bg-[#1a3c22] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Map size={32} className="text-green-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Sitemap
          </h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Navigate through our website to find information about our company, products, services, and policies.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-12">
            {sitemapLinks.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-green-100" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {section.category}
                </h2>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link href={link.url} className="flex items-center gap-2 text-gray-600 hover:text-[#2A5C32] font-medium transition-colors group">
                        <ArrowRight size={14} className="text-gray-300 group-hover:text-[#2A5C32] transition-colors" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
