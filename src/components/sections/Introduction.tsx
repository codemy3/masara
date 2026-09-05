"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function IntroAndChef() {
  const containerRef = useRef<HTMLDivElement>(null);
  const darkLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {


      gsap.fromTo(
        ".intro-reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 70%" } }
      );

      const bentoItems = gsap.utils.toArray(".bento-item");
      
      const mm = gsap.matchMedia();

      mm.add({
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)"
      }, (context) => {
        const { isMobile, isDesktop } = context.conditions as { isMobile: boolean, isDesktop: boolean };

        // THE PERFECT SYNC LOGO ANIMATION
        gsap.fromTo(
          darkLogoRef.current,
          { 
            y: isMobile ? "-96vh" : "-75vh", 
            scale: isMobile ? 1 : 1.44, 
            opacity: 0 
          },
          { 
            y: 0, 
            scale: 1, 
            opacity: 1, 
            ease: "none", 
            scrollTrigger: { 
              trigger: containerRef.current, 
              start: "top bottom", 
              end: "top 25%", 
              scrub: 1 
            } 
          }
        );

        gsap.set(bentoItems, {
          x: ((i: number) => {
            if (isDesktop) return [-600, 600, -500, 500, -700, 700, -400][i % 7];
            // MOBILE: Scatter gently to the sides
            return (i === 1) ? "-10vw" : (i === 3) ? "15vw" : 0;
          }) as unknown as any, 
          
          y: ((i: number) => {
            if (isDesktop) return [-600, -500, 600, 500, -400, 700, 400][i % 7];
            // MOBILE FIX: Pushed down so they hover in the blank space BELOW the text
            return (i === 1) ? "-12vh" : (i === 3) ? "-18vh" : 0;
          }) as unknown as any,
          
          rotation: (i: number) => {
            if (isDesktop) return [-30, 45, -15, 25, -40, 20, -10][i % 7];
            return (i === 1) ? -15 : (i === 3) ? 12 : 0;
          },
          
          scale: (i: number) => {
            if (isDesktop) return 1.2;
            return (i === 1 || i === 3) ? 0.85 : 1;
          },
          
          opacity: 1 
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: isMobile ? "+=50%" : "+=80%", // 1 scroll snap
            scrub: 1.5,
            pin: true,
            pinSpacing: true, 
            anticipatePin: 1,
          }
        });

        // MOBILE FIX: The text stays visible (opacity: 1) on mobile to fill the top blank space!
        tl.to(".intro-text-wrapper", { 
          opacity: isMobile ? 1 : 0, 
          scale: isMobile ? 0.95 : 0.8, 
          duration: 0.5, 
          ease: "power2.inOut" 
        }, 0);

        tl.to(bentoItems, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          stagger: 0.05,
          duration: 1,
          ease: "power3.out"
        }, 0.2);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="intro-section"
      ref={containerRef} 
      // FIXED: -mt-[6vh] and rounded-t-[3rem] creates the curved separator cutting over the hero
      className="relative w-full h-[100svh] min-h-[600px] bg-[#F5E9D5] text-[#3D081A] overflow-hidden flex flex-col items-center justify-center z-10 rounded-t-[2.5rem] md:rounded-t-[4rem] -mt-[6vh] shadow-[0_-20px_40px_rgba(0,0,0,0.5)] border-t border-[#D4AF37]/30"
    >
      
      {/* FIXED: Removed md:inset-0 so the text naturally sits at the top on desktop */}
      <div className="intro-text-wrapper absolute left-0 right-0 top-[14vh] md:top-[16vh] container mx-auto px-6 flex flex-col items-center z-30 pointer-events-none">
        
        <div ref={darkLogoRef} className="relative w-[75px] h-[75px] md:w-[90px] md:h-[90px] mb-4 md:mb-8 will-change-transform">
          <Image src="/images/logo/logo-dark.webp" alt="Masara Crest Dark" fill className="object-contain drop-shadow-sm" />
        </div>
        
        <h2 className="text-center md:text-[7.5vw] font-serif leading-[0.9] tracking-tighter mb-4 md:mb-6 flex flex-col items-center">
          <span className="intro-reveal block uppercase font-normal tracking-[-0.04em] whitespace-nowrap text-[10vw] md:text-[7.5vw]">
            Where flavour
          </span>
          <span className="intro-reveal block italic lowercase font-light text-[#3D081A]/70 my-1 text-[13vw] md:text-[8.5vw]">
            becomes
          </span>
          <span className="intro-reveal block uppercase font-normal tracking-[-0.04em] text-[11.5vw] md:text-[7.5vw]">
            an experience.
          </span>
        </h2>
      </div>

      {/* FIXED: Replaced md:inset-0 with md:bottom-[5vh] so it anchors properly. Lowered md:h-[80vh] to md:h-[65vh] so nothing gets cut off on laptop screens! */}
      <div className="absolute left-0 right-0 bottom-[2vh] md:bottom-[5vh] z-20 flex items-center justify-center p-4 md:p-8 pointer-events-none">
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-5 md:grid-rows-3 gap-3 md:gap-4 w-full max-w-6xl h-[45vh] md:h-[60vh] lg:h-[65vh]">
          
          <div className="bento-item w-full h-full col-span-1 row-span-1 bg-[#3D081A] text-[#F5E9D5] border-[2px] border-[#3D081A] shadow-xl flex flex-col items-center justify-center p-2 text-center will-change-transform">
            <span className="font-serif italic text-base md:text-2xl leading-tight">Masara<br/><span className="text-[7px] md:text-[10px] font-sans uppercase tracking-widest text-[#D4AF37] not-italic">Culinary Artistry</span></span>
          </div>

          <div className="bento-item w-full h-full col-span-1 row-span-1 relative overflow-hidden border-[2px] border-[#3D081A] shadow-xl bg-[#F5E9D5] will-change-transform">
            <Image src="/images/food/food-02.webp" alt="Food Detail" fill className="object-cover" />
          </div>

          <div className="bento-item w-full h-full col-span-2 row-span-1 md:row-span-2 relative overflow-hidden border-[2px] border-[#3D081A] shadow-xl bg-[#3D081A] will-change-transform">
            <Image src="/images/restaurant/02.webp" alt="Ambience" fill className="object-cover" />
          </div>

          <div 
            id="grid-chef-photo" 
            className="bento-item w-full h-full col-span-1 row-span-2 relative overflow-hidden border-[2px] border-[#3D081A] shadow-xl bg-[#3D081A] will-change-transform"
          >
            <Image src="/images/chef/chef.webp" alt="Chef Muhammad Ashiq" fill className="object-cover" />
          </div>

          <div className="bento-item w-full h-full col-span-1 row-span-1 bg-[#F5E9D5] border-[2px] border-[#3D081A] shadow-xl flex flex-col items-center justify-center p-2 text-center will-change-transform">
             <span className="font-serif text-xs md:text-xl text-[#3D081A] leading-tight italic">a quiet corner of<br/><span className="font-bold uppercase tracking-tighter text-[1.1em] not-italic">Bangalore</span></span>
          </div>

          <div className="bento-item w-full h-full col-span-1 row-span-1 bg-[#F5E9D5] border-[2px] border-[#3D081A] shadow-xl flex items-center justify-center p-4 will-change-transform">
            <div className="w-[35px] h-[35px] md:w-[80px] md:h-[80px] relative">
               <Image src="/images/logo/logo-dark.webp" alt="Crest" fill className="object-contain" />
            </div>
          </div>

          <div className="bento-item w-full h-full col-span-2 md:col-span-2 row-span-1 bg-[#3D081A] border-[2px] border-[#3D081A] shadow-xl flex flex-col items-center justify-center p-3 md:p-4 text-center will-change-transform">
            <span className="font-serif italic text-[#D4AF37] text-xl md:text-4xl tracking-tight leading-none">Stay for the experience.</span>
          </div>

        </div>
      </div>

    </section>
  );
}