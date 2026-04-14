import LegalLayout from "@/components/LegalLayout";

const termsSections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: "By accessing or using the Natura Health Care website, you agree to these Terms of Use. If you do not agree, please discontinue use of the website.",
  },
  {
    id: "intellectual-property",
    title: "2. Intellectual Property",
    body: "All website content, including text, graphics, branding, and media assets, is owned by Natura Health Care or its licensors unless otherwise specified. You may view website content for personal or business reference only.",
  },
  {
    id: "acceptable-use",
    title: "3. Acceptable Use and Restrictions",
    body: "You must use this website in a lawful and responsible manner.",
    bullets: [
      "Do not copy, republish, or commercially exploit website content without written approval.",
      "Do not interfere with website security, performance, or availability.",
      "Do not use this website for unlawful, deceptive, or harmful activities.",
      "Do not attempt to access systems, data, or services without authorization.",
    ],
  },
  {
    id: "medical-disclaimer",
    title: "4. Medical Disclaimer",
    body: "Information on this website is provided for general educational and business purposes. It does not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for clinical guidance.",
  },
  {
    id: "liability",
    title: "5. Limitation of Liability",
    body: "Natura Health Care is not liable for indirect, incidental, consequential, or special damages arising from website use, to the extent permitted by applicable law.",
  },
  {
    id: "governing-law",
    title: "6. Governing Law and Jurisdiction",
    body: "These Terms of Use are governed by the laws of Switzerland. Any dispute related to these terms will be subject to the applicable courts in Switzerland.",
  },
  {
    id: "changes",
    title: "7. Changes to Terms",
    body: "We may update these terms from time to time. Continued use of the website after updates indicates acceptance of the revised terms.",
  },
];

export default function TermsConditions() {
  return (
    <LegalLayout
      title="Terms of Use"
      lastUpdated="April 14, 2026"
      subtitle="These terms define the legal conditions for accessing and using the Natura Health Care website and related digital content."
      sections={ termsSections.map((section) => ({ id: section.id, label: section.title })) }
    >
      { termsSections.map((section) => (
        <section
          id={ section.id }
          key={ section.id }
          className="scroll-mt-28 rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50/45 p-5 sm:p-6"
        >
          <h2
            className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3"
            style={ { fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.015em" } }
          >
            { section.title }
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{ section.body }</p>

          { Array.isArray(section.bullets) && section.bullets.length > 0 && (
            <ul className="mt-4 space-y-2.5">
              { section.bullets.map((item) => (
                <li key={ item } className="flex gap-2.5 text-sm sm:text-base text-gray-600 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2A5C32] shrink-0" />
                  <span>{ item }</span>
                </li>
              )) }
            </ul>
          ) }
        </section>
      )) }
    </LegalLayout>
  );
}
