"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function GalleryPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Refs for independent parallax image control
  const imgLeftRef = useRef<HTMLDivElement>(null);
  const imgTopRightRef = useRef<HTMLDivElement>(null);
  const imgBottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)"
    }, (context) => {
      const isDesktop = context.conditions ? !!context.conditions.isDesktop : false;

      const ctx = gsap.context(() => {
        
        // 1. Text Reveal Animation
        gsap.fromTo(
          ".gallery-title-word",
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.1, 
            duration: 1.2, 
            ease: "power3.out", 
            scrollTrigger: { trigger: headerRef.current, start: "top 75%" } 
          }
        );

        // 2. The Deep Parallax Scroll Timeline
        // This binds the vertical movement of the images directly to the user's scrollbar
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });

        // Desktop gets aggressive, beautiful parallax. Mobile gets a subtler effect to prevent overlapping.
        const yOffsetLeft = isDesktop ? -150 : -50;
        const yOffsetTopRight = isDesktop ? 80 : 30; // Counter-scrolls downwards
        const yOffsetBottomRight = isDesktop ? -200 : -80; // Moves up the fastest

        tl.to(imgLeftRef.current, { y: yOffsetLeft, ease: "none" }, 0)
          .to(imgTopRightRef.current, { y: yOffsetTopRight, ease: "none" }, 0)
          .to(imgBottomRightRef.current, { y: yOffsetBottomRight, ease: "none" }, 0);

      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      // Light ivory background provides a crisp canvas for the photography
      className="relative w-full py-24 md:py-40 bg-[#F5E9D5] text-[#3D081A] overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* --- HEADER --- */}
        <div 
          ref={headerRef}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 md:mb-32 gap-8"
        >
          <h2 className="text-[14vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter uppercase flex flex-col">
            <div className="overflow-hidden py-1">
              <span className="gallery-title-word block tracking-[-0.04em]">The Masara</span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="gallery-title-word block italic lowercase font-light text-[#D4AF37] text-[15vw] md:text-[9vw] mt-1 md:mt-2">
                Moments
              </span>
            </div>
          </h2>
          
          <div className="overflow-hidden pb-2">
            <Link 
              href="/gallery" 
              className="gallery-title-word group inline-flex items-center gap-4 text-xs font-sans uppercase tracking-widest text-[#3D081A] hover:text-[#D4AF37] transition-colors"
            >
              <span className="border-b border-[#3D081A] group-hover:border-[#D4AF37] pb-1 transition-colors">
                View Full Gallery
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* --- EDITORIAL BROKEN-GRID GALLERY --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start relative pb-24 md:pb-0">
          
          {/* Left Column - Large Portrait (Moves Up Slowly) */}
          <div 
            ref={imgLeftRef} 
            className="md:col-span-5 relative z-20 will-change-transform"
          >
            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden shadow-2xl group bg-[#3D081A]">
              <Image 
                src="/images/food/food-22.webp" 
                alt="Gallery Moment 1" 
                fill 
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
              />
            </div>
          </div>

          {/* Right Column - Two Offset Images */}
          <div className="md:col-span-7 flex flex-col gap-16 md:gap-32 mt-12 md:mt-24 relative z-10">
            
            {/* Top Right - Landscape (Counter-Scrolls Downwards) */}
            <div 
              ref={imgTopRightRef} 
              className="w-[90%] md:w-[85%] ml-auto will-change-transform"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden shadow-xl group bg-[#3D081A]">
                <Image 
                  src="/images/restaurant/5.webp" 
                  alt="Gallery Moment 2" 
                  fill 
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                />
              </div>
            </div>

            {/* Bottom Right - Small Portrait (Moves Up Fast) */}
            <div 
              ref={imgBottomRightRef} 
              className="w-[75%] md:w-[60%] mr-auto md:ml-12 md:mr-0 will-change-transform"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden shadow-2xl group bg-[#3D081A]">
                <Image 
                  src="/images/food/food-15.webp" 
                  alt="Gallery Moment 3" 
                  fill 
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                />
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}