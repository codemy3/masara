"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export function CinematicIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      // 1. Initial Burgundy Screen fades out to reveal image mask
      tl.to(overlayRef.current, { 
        clipPath: "inset(0 0 100% 0)", 
        duration: 1.8,
        ease: "power4.inOut"
      }, 0.2);

      // 2. Image slow scale down
      tl.fromTo(
        imageRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 2.5, ease: "power2.out" },
        0.5
      );

      // 3. Small top-right indicator reveal
      tl.fromTo(
        ".intro-indicator",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1 },
        1.2
      );

      // 4. Gold line draws down
      tl.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5 },
        1.4
      );

      // 5. Eyebrow reveal
      tl.fromTo(
        ".intro-eyebrow",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.2 },
        1.6
      );

      // 6. Huge Headline clip-path reveal (staggered lines)
      tl.fromTo(
        ".intro-heading-line",
        { clipPath: "inset(100% 0 0 0)", y: 50 },
        { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.4, stagger: 0.15 },
        1.8
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[700px] overflow-hidden bg-[#3D081A]"
    >
      {/* 
        The image wrapper and image.
        We'll use a sophisticated crop and position. 
      */}
      <div 
        ref={imageWrapRef} 
        className="absolute inset-0 md:inset-y-0 md:right-0 md:w-[85%] overflow-hidden"
      >
        <Image
          ref={imageRef}
          src="/images/restaurant/02.webp"
          alt="Masara Fine Dine"
          fill
          className="object-cover object-[70%_center] will-change-transform"
          priority
          sizes="100vw"
        />
        {/* Subtle gradient to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D081A] via-[#3D081A]/60 to-transparent md:w-[60%]" />
        <div className="absolute inset-0 bg-[#3D081A]/20" />
      </div>

      {/* 
        Initial Burgundy Overlay for the "Opening Film" effect.
        It starts fully covering the screen, then animates up.
      */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-[#3D081A] z-20 pointer-events-none"
      />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full container mx-auto px-6 md:px-10 max-w-7xl">
        
        {/* Top Right Asymmetric Indicator */}
        <div className="absolute top-32 md:top-40 right-6 md:right-10 flex flex-col items-end intro-indicator">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-sans font-medium text-[#CBA365]">
            01
          </span>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-sans text-[#F5E9D5]/50 mt-1">
            Origins
          </span>
        </div>

        {/* Lower Left Headline Area */}
        <div className="absolute bottom-20 md:bottom-32 left-6 md:left-10 flex items-end gap-6 md:gap-10">
          
          {/* Vertical Gold Line */}
          <div 
            ref={lineRef}
            className="hidden md:block w-[1px] h-32 lg:h-48 bg-[#CBA365] origin-top mb-2"
          />

          <div>
            {/* Eyebrow */}
            <div className="intro-eyebrow uppercase tracking-[0.4em] text-[10px] md:text-xs font-sans font-medium text-[#CBA365] mb-6 md:mb-8">
              The Story
            </div>

            {/* Massive Headline */}
            <h1 className="font-serif text-[#F5E9D5] leading-[0.85] tracking-tighter">
              <span className="block overflow-hidden py-1">
                <span className="intro-heading-line block text-[15vw] md:text-[9vw] lg:text-[8vw] uppercase font-normal">
                  Behind
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="intro-heading-line block text-[15vw] md:text-[9vw] lg:text-[8vw] italic font-light text-[#CBA365] lowercase pr-8">
                  Masara.
                </span>
              </span>
            </h1>
          </div>
        </div>

      </div>
    </section>
  );
}
