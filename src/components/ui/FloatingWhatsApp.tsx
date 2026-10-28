"use client";

import { trackWhatsAppClick } from "@/lib/analytics";

export function FloatingWhatsApp() {
  const handleClick = () => {
    trackWhatsAppClick("floating_whatsapp_widget");
  };

  return (
    <aside
      aria-label="Direct WhatsApp contact"
      className="fixed bottom-6 right-6 z-40 flex items-center group print:hidden"
    >
      {/* Tooltip badge */}
      <span className="pointer-events-none mr-3 hidden rounded-full bg-foreground/90 px-3.5 py-1.5 text-xs font-medium text-background shadow-lg backdrop-blur transition-all duration-300 md:block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
        Chat with Design Team
      </span>

      <a
        href="https://wa.me/8801629658114?text=Hello%20Jam%20Space%2C%20I%20would%20like%20to%20discuss%20an%20interior%20project."
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        className="relative flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        {/* Soft pulse animation ring */}
        <span
          className="absolute inset-0 -z-10 rounded-full bg-[#25D366]/40 animate-ping opacity-75"
          style={{ animationDuration: "2.5s" }}
        />

        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 9.5c.3 1.2 1.8 2.7 3 3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </a>
    </aside>
  );
}

