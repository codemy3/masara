"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#3D081A] pt-12 pb-6 md:pt-16 md:pb-8 relative overflow-hidden">
      
      {/* Massive Background Logo Watermark (Royal Seal) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[45vw] aspect-square opacity-[0.03] pointer-events-none z-0 mix-blend-screen">
        <Image
          src="/images/logo/logo-2.webp"
          alt="Masara Royal Seal"
          fill
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Logo and Description */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-12">
          <Link href="/" className="relative h-16 w-44 mb-4 block hover:opacity-80 transition-opacity duration-300">
            <Image
              src="/images/logo/logo.webp"
              alt="Masara Fine Dine"
              fill
              className="object-contain"
            />
          </Link>
          <p className="max-w-md text-[#F5E9D5]/70 text-xs md:text-sm font-sans font-light leading-relaxed">
            Masara is an experience, not simply a place to eat. A premium modern Indian dining destination in the heart of Bangalore.
          </p>
        </div>

        {/* Middle Section: Elegant Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4 md:gap-8 mb-10 md:mb-12">
          
          {/* Explore Links */}
          <div className="col-span-1 flex flex-col items-start md:items-start text-left">
            <h6 className="text-[#D4AF37] mb-4 font-sans uppercase tracking-[0.3em] text-[9px] font-bold">
              Explore
            </h6>
            <ul className="space-y-3">
              {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="group flex items-center text-[#F5E9D5]/80 hover:text-[#D4AF37] transition-all text-xs font-sans tracking-wide"
                  >
                    <span className="w-0 h-[1px] bg-[#D4AF37] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Connect (Moved up for mobile 2-column layout) */}
          <div className="col-span-1 md:col-start-3 flex flex-col items-end md:items-end text-right md:border-none">
            <h6 className="text-[#D4AF37] mb-4 font-sans uppercase tracking-[0.3em] text-[9px] font-bold">
              Connect
            </h6>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/masara_india/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#F5E9D5] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#3D081A] transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://wa.me/917204111845" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#F5E9D5] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#3D081A] transition-all duration-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
            
            <p className="mt-4 text-[9px] font-sans text-[#F5E9D5]/50 italic tracking-wide max-w-[120px]">
              Follow our culinary journey.
            </p>
          </div>

          {/* Contact Details (Full width on mobile, middle column on desktop) */}
          <div className="col-span-2 md:col-span-1 md:col-start-2 flex flex-col items-center text-center border-t border-[#D4AF37]/10 pt-8 md:border-none md:pt-0">
            <h6 className="text-[#D4AF37] mb-4 font-sans uppercase tracking-[0.3em] text-[9px] font-bold">
              Visit Us
            </h6>
            <address className="not-italic flex flex-col items-center md:items-start gap-4 text-xs text-[#F5E9D5]/80 font-sans font-light leading-relaxed">
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#D4AF37] shrink-0 hidden md:block" />
                <p>
                  No 7M -406 1st Floor 7th Main,<br />
                  80 Feet, Hennur Main road, 1st block,<br />
                  Banaswadi, Bengaluru 560043
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <a href="tel:+917204111845" className="hover:text-[#D4AF37] transition-colors">
                  +91 72041 11845
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <a href="mailto:masara.blr@gmail.com" className="hover:text-[#D4AF37] transition-colors">
                  masara.blr@gmail.com
                </a>
              </div>
            </address>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 border-t border-[#D4AF37]/20 flex flex-col items-center justify-between gap-3 text-center md:flex-row">
          
          <div className="flex flex-col gap-1 text-[8px] md:text-[9px] text-[#F5E9D5]/50 font-sans uppercase tracking-widest text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Masara Fine Dine. All rights reserved.</p>
            <p>
              Operated by <span className="text-[#D4AF37] font-medium">NOSH VENTURES</span> 
              <span className="mx-2 hidden md:inline">|</span> 
              <span className="block md:inline mt-0.5 md:mt-0">GSTIN: 29AAYFN2875N1Z1</span>
            </p>
            <p className="mt-1 md:mt-0.5">
              Built by <a href="https://maithri-portfolio-amber.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors">Maithri</a>
            </p>
          </div>
          
          <div className="flex gap-6 text-[8px] md:text-[9px] text-[#F5E9D5]/50 font-sans uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">Terms</Link>
          </div>

        </div>
      </div>
    </footer>
  );
}