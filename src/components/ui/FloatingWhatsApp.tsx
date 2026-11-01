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

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1660_660)">
            <path d="M0.4375 23.8155L2.07164 17.8491C1.06209 16.0988 0.531804 14.1133 0.534243 12.0927C0.536904 5.74403 5.7034 0.579102 12.0523 0.579102C15.1331 0.580667 18.0249 1.77962 20.1998 3.95601C22.3746 6.13241 23.5712 9.0253 23.5701 12.102C23.5673 18.4502 18.4 23.6161 12.0521 23.6161H12.0471C10.1196 23.6153 8.22559 23.1317 6.54324 22.2144L0.4375 23.8155Z" fill="white" />
            <path d="M12.0574 2.52346C6.77676 2.52346 2.48236 6.8163 2.48048 12.0928C2.47788 13.8946 2.98527 15.6604 3.94398 17.1859L4.17175 17.548L3.20448 21.0793L6.82779 20.1292L7.17766 20.3365C8.64712 21.2086 10.332 21.6697 12.0502 21.6707H12.0538C17.3303 21.6707 21.6247 17.3774 21.6268 12.1005C21.6307 10.8428 21.3852 9.59678 20.9044 8.4346C20.4235 7.27242 19.7169 6.21717 18.8254 5.32994C17.9389 4.43785 16.8843 3.73047 15.7225 3.24874C14.5608 2.767 13.315 2.52049 12.0574 2.52346Z" fill="#57D163" />
            <path d="M9.17319 7.27832C8.95748 6.79915 8.73049 6.78944 8.52558 6.78115L7.97393 6.77441C7.78201 6.77441 7.47018 6.84642 7.20656 7.13446C6.94295 7.4225 6.19922 8.11864 6.19922 9.53455C6.19922 10.9505 7.23051 12.3186 7.37422 12.5109C7.51792 12.7031 9.36511 15.7013 12.2904 16.8549C14.7213 17.8136 15.216 17.6229 15.7439 17.575C16.2717 17.5271 17.4466 16.8789 17.6862 16.2068C17.9259 15.5348 17.9261 14.959 17.8542 14.8386C17.7823 14.7183 17.5904 14.6467 17.3024 14.5027C17.0144 14.3587 15.5997 13.6626 15.3359 13.5664C15.0721 13.4703 14.8804 13.4226 14.6883 13.7106C14.4962 13.9986 13.9454 14.6466 13.7774 14.8386C13.6094 15.0307 13.4418 15.0548 13.1537 14.911C12.8657 14.7671 11.939 14.4631 10.8394 13.4827C9.98392 12.7199 9.40644 11.7778 9.23832 11.4899C9.07019 11.202 9.22047 11.0461 9.3648 10.9027C9.49395 10.7737 9.65252 10.5666 9.7967 10.3987C9.94087 10.2307 9.98831 10.1106 10.0841 9.91886C10.1799 9.7271 10.1322 9.55866 10.0602 9.4148C9.98815 9.27094 9.42898 7.84751 9.17319 7.27832Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_1660_660">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>

      </a>
    </aside>
  );
}

