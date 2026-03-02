import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import PopupBanner from '@/components/PopupBanner';
import ScrollRevealSections from '@/components/ScrollRevealSections';

export const metadata = {
  title: 'Natura Health Care',
  description: 'Global Pharmaceutical Excellence',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans text-gray-900 antialiased bg-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <ScrollRevealSections />
        <Footer />
        <FloatingContact />
        <PopupBanner />
      </body>
    </html>
  );
}
