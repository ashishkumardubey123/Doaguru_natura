import LegalLayout from "@/components/LegalLayout";

const privacySections = [
  {
    id: "introduction",
    title: "1. Introduction",
    body: "Natura Health Care is committed to protecting your privacy. This policy explains what personal information we collect, why we collect it, and how we handle it when you use our website or contact our team.",
  },
  {
    id: "data-we-collect",
    title: "2. Data We Collect",
    body: "We collect only the information required to provide business communication, support, and service improvements.",
    bullets: [
      "Identity Data: name, role, and organization details you submit through our forms.",
      "Contact Data: email address, phone number, and related communication details.",
      "Technical Data: IP address, browser type, device information, and site usage patterns.",
      "Usage Data: page interactions, session behavior, and product interest signals.",
    ],
  },
  {
    id: "how-we-use",
    title: "3. How We Use Personal Data",
    body: "Your information is processed only for legitimate and lawful business purposes.",
    bullets: [
      "To respond to inquiries, quotations, and partnership requests.",
      "To improve website performance, usability, and content relevance.",
      "To maintain security, detect abuse, and prevent unauthorized access.",
      "To comply with applicable legal and regulatory obligations.",
    ],
  },
  {
    id: "sharing-retention",
    title: "4. Data Sharing and Retention",
    body: "We do not sell personal data. Information may be shared with trusted service providers that support hosting, analytics, and communication systems under confidentiality controls. Data is retained only as long as required for operational, legal, or compliance purposes.",
  },
  {
    id: "security-rights",
    title: "5. Data Security and Your Rights",
    body: "We apply technical and organizational safeguards to protect personal data against unauthorized access, alteration, disclosure, or loss. Subject to applicable law, you may request access, correction, or deletion of your information.",
  },
  {
    id: "contact",
    title: "6. Contact",
    body: "For privacy requests or policy questions, contact our compliance team.",
    contact: [
      "Email: privacy@naturahealthcare.com",
      "Phone: +41 44 123 4567",
      "Address: Life Science Park, Pharma Boulevard, Zurich, Switzerland CH-8000",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="April 14, 2026"
      subtitle="This page explains how Natura Health Care collects, uses, stores, and protects personal information across its digital touchpoints."
      sections={ privacySections.map((section) => ({ id: section.id, label: section.title })) }
    >
      { privacySections.map((section) => (
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

          { Array.isArray(section.contact) && section.contact.length > 0 && (
            <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 sm:p-5">
              { section.contact.map((line) => (
                <p key={ line } className="text-sm sm:text-base text-[#1a3c22] font-medium leading-relaxed">{ line }</p>
              )) }
            </div>
          ) }
        </section>
      )) }
    </LegalLayout>
  );
}
