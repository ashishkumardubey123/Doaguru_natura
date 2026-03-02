import LegalLayout from "@/components/LegalLayout";

export default function TermsConditions() {
  return (
    <LegalLayout title="Terms and Conditions" lastUpdated="March 1, 2026">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the Natura Health Care website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>2. Intellectual Property Rights</h2>
        <p>
          Other than the content you own, under these Terms, Natura Health Care and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>3. Restrictions</h2>
        <p>You are specifically restricted from all of the following:</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Publishing any Website material in any other media without prior written consent.</li>
          <li>Selling, sublicensing and/or otherwise commercializing any Website material.</li>
          <li>Publicly performing and/or showing any Website material.</li>
          <li>Using this Website in any way that is or may be damaging to this Website.</li>
          <li>Using this Website in any way that impacts user access to this Website.</li>
          <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>4. Medical Disclaimer</h2>
        <p>
          The information provided on this website is for general informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>5. Limitation of Liability</h2>
        <p>
          In no event shall Natura Health Care, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Natura Health Care, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>6. Governing Law & Jurisdiction</h2>
        <p>
          These Terms will be governed by and interpreted in accordance with the laws of Switzerland, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Switzerland for the resolution of any disputes.
        </p>
      </section>
    </LegalLayout>
  );
}
