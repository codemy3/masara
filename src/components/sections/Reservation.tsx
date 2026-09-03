"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { restaurantData } from "@/data/restaurant";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Reservation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bgLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", 
        }
      });

      // 1. Gentle fade up for the text
      tl.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out" },
        0
      );

      // 2. Short line draw
      tl.fromTo(
        lineRef.current,
        { height: 0 },
        { height: "50px", ease: "none" },
        0.1
      );

      // 3. Content fades up closely behind
      tl.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0.2
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const whatsappNumber = restaurantData?.whatsappNumber || "917204111845";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Masara, I would like to reserve a table."
  )}`;

  return (
    <section 
      ref={sectionRef} 
      // Dramatically reduced padding for a tighter, cleaner section
      className="relative w-full py-16 md:py-24 bg-[#F5E9D5] text-[#3D081A] overflow-hidden flex flex-col items-center justify-center border-t border-[#3D081A]/10"
    >
      
      {/* Subtle Noise Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Tightly contained background logo */}
      <div 
        ref={bgLogoRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[400px] aspect-square opacity-[0.04] pointer-events-none z-0 will-change-transform"
      >
        <Image
          src="/images/logo/logo-2.webp"
          alt="Masara Background Crest"
          fill
          className="object-contain mix-blend-multiply filter brightness-0" 
        />
      </div>

      <div className="relative z-20 w-full flex flex-col items-center">
        
        {/* Fixed typography sizes so it never blows up on desktop */}
        <h2 
          ref={textRef}
          className="text-center flex flex-col items-center will-change-transform"
        >
          <span className="block text-4xl md:text-6xl font-serif uppercase leading-[0.9] tracking-tight">
            Reserve
          </span>
          <span className="block text-5xl md:text-7xl font-serif italic lowercase font-light text-[#3D081A]/70 leading-[0.9] tracking-tighter mt-1 md:mt-2">
            a table
          </span>
        </h2>

        {/* Shorter dividing line */}
        <div ref={lineRef} className="w-[1px] bg-[#3D081A]/30 mt-6 md:mt-8 mb-6 md:mb-8 will-change-[height]" />

        {/* Content & Button */}
        <div ref={contentRef} className="flex flex-col items-center text-center px-6 will-change-transform">
          <p className="text-xs md:text-sm font-light font-sans text-[#3D081A]/70 max-w-[280px] md:max-w-md mb-8 md:mb-10 leading-relaxed">
            Join us for an unforgettable dining experience in the heart of Bangalore. 
            Reservations are managed personally by our team.
          </p>
          
          <Link 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-4 px-8 py-4 overflow-hidden border border-[#3D081A] text-[#3D081A] transition-all duration-500 hover:shadow-[0_0_30px_rgba(61,8,26,0.15)]"
          >
            <div className="absolute inset-0 bg-[#3D081A] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
            
            <span className="relative z-10 text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] font-medium group-hover:text-[#F5E9D5] transition-colors duration-500">
              Book via WhatsApp
            </span>
            
            <ArrowRight className="relative z-10 w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 group-hover:text-[#F5E9D5] transition-all duration-500" />
          </Link>
        </div>

      </div>
    </section>
  );
}