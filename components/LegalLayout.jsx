import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="bg-gray-50 min-h-screen pb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <div className="bg-[#1a3c22] text-white py-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-green-300 hover:text-white transition-colors mb-6">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {title}
          </h1>
          <p className="text-green-200 text-sm">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1000px] mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
          <div className="text-gray-700 leading-relaxed space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
