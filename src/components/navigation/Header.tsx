"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/menu", label: "Menu" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isHidden, setIsHidden] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();

  // Smart scroll logic to hide header at the top for full cinematic view
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only hide at top if on home page. Other pages like About might need it.
    // Actually, to keep it simple, let's keep the design intent but ensure it shows when menu is open.
    if (latest < 100 && pathname === "/") {
      setIsHidden(true);
      setIsScrolled(false);
    } else if (latest < 100) {
      setIsHidden(false); // Show at top on other pages
      setIsScrolled(false);
    } else {
      setIsHidden(false);
      setIsScrolled(true);
    }
  });

  if (pathname?.startsWith("/admin")) return null;

  return (
    <motion.header 
      initial={{ y: pathname === "/" ? "-100%" : "0%" }}
      animate={{ y: isHidden && !mobileMenuOpen ? "-100%" : "0%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-700 ${
        isScrolled || mobileMenuOpen || pathname !== "/"
          ? "bg-[#3D081A] backdrop-blur-xl border-b border-[#F5E9D5]/10 py-4 md:py-2" 
          : "bg-transparent border-b border-transparent py-6" // Taller padding at the top
      }`}
    >
      <div className="container mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="relative h-10 w-28 md:h-12 md:w-36 flex-shrink-0 z-50">
          <Image
            src="/images/logo/logo.webp"
            alt="Masara Fine Dine"
            fill
            sizes="(max-width: 768px) 120px, 150px"
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-10 lg:gap-14 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative py-2 text-xs uppercase tracking-[0.2em] font-medium text-[#F5E9D5] transition-colors"
            >
              <span className={`transition-opacity duration-300 ${hoveredLink && hoveredLink !== link.href ? 'opacity-40' : 'opacity-100'}`}>
                {link.label}
              </span>
              
              {/* Editorial Dot Indicator */}
              <AnimatePresence>
                {hoveredLink === link.href && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F5E9D5]"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        {/* CTA & MOBILE TOGGLE */}
        <div className="flex items-center gap-6 z-50">
          <Link href="https://wa.me/917204111845" target="_blank" className="hidden md:block">
            <Button variant="outline" className="px-6 py-5 rounded-none border-[#F5E9D5]/30 text-[#F5E9D5] hover:bg-[#F5E9D5] hover:text-[#3D081A] transition-all duration-300 text-xs tracking-[0.15em]">
              RESERVE
            </Button>
          </Link>
          
          {/* Luxury 2-Line Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center items-end gap-1.5 focus:outline-none"
          >
            <span className="sr-only">Toggle menu</span>
            <motion.div 
              animate={{ 
                rotate: mobileMenuOpen ? 45 : 0, 
                y: mobileMenuOpen ? 6 : 0,
                width: mobileMenuOpen ? "100%" : "100%"
              }}
              className="h-[1px] w-full bg-[#F5E9D5] origin-center transition-all duration-300"
            />
            <motion.div 
              animate={{ 
                rotate: mobileMenuOpen ? -45 : 0, 
                y: mobileMenuOpen ? -6 : 0,
                width: mobileMenuOpen ? "100%" : "60%" // Asymmetrical bottom line when closed
              }}
              className="h-[1px] bg-[#F5E9D5] origin-center transition-all duration-300"
            />
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#3D081A] border-t border-[#F5E9D5]/10 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-8 pb-20">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl uppercase tracking-[0.2em] font-medium text-[#F5E9D5]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-6"
              >
                <Link href="https://wa.me/917204111845" target="_blank" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="px-8 py-6 rounded-none border-[#F5E9D5]/30 text-[#F5E9D5] hover:bg-[#F5E9D5] hover:text-[#3D081A] transition-all duration-300 tracking-[0.15em]">
                    RESERVE
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}