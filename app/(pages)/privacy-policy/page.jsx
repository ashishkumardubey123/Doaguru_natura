import LegalLayout from "@/components/LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="March 1, 2026">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>1. Introduction</h2>
        <p>
          Welcome to Natura Health Care. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>2. The Data We Collect About You</h2>
        <p>
          Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li><strong>Identity Data</strong> includes first name, maiden name, last name, username or similar identifier, marital status, title, date of birth and gender.</li>
          <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
          <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>3. How We Use Your Personal Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>4. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>5. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us at:
        </p>
        <p className="mt-2 font-medium text-gray-900">
          Email: privacy@naturahealthcare.com<br />
          Phone: +41 44 123 4567<br />
          Address: Life Science Park, Pharma Boulevard, Zurich, Switzerland CH-8000
        </p>
      </section>
    </LegalLayout>
  );
}
