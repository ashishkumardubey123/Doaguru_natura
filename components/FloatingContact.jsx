'use client';

import { Phone, Mail, MessageCircle } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";



export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */ }
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300"
        style={ { backgroundColor: "#25D366" } }
        aria-label="WhatsApp"
      >
<FontAwesomeIcon icon={faWhatsapp} size="2xl" />      </a>

      {/* Email */ }
      <a
        href="mailto:info@naturahealthcare.com"
        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300"
        style={ { backgroundColor: "#EA4335" } }
        aria-label="Email"
      >
        <Mail size={ 24 } />
      </a>

      {/* Phone */ }
      <a
        href="tel:+1234567890"
        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300"
        style={ { backgroundColor: "#2A5C32" } }
        aria-label="Call Us"
      >
        <Phone size={ 24 } />
      </a>
    </div>
  );
}
