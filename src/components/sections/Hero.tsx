"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { restaurantData } from "@/data/restaurant";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLHeadingElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const leftEditorialRef = useRef<HTMLDivElement>(null);
  const rightEditorialRef = useRef<HTMLDivElement>(null);
  const travelingLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // Universal Timeline (Smooth scrub at 1.5)
    mm.add("all", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        videoContainerRef.current,
        { width: "100vw", height: "100vh", borderRadius: "0px", ease: "power2.inOut", duration: 1 },
        0
      )
      // Slide text away in the foreground
      .to(leftTextRef.current, { x: "-45vw", opacity: 0, ease: "power2.inOut", duration: 1 }, 0)
      .to(rightTextRef.current, { x: "45vw", opacity: 0, ease: "power2.inOut", duration: 1 }, 0)
      .to(emblemRef.current, { scale: 1.4, opacity: 0, ease: "power2.inOut", duration: 0.9 }, 0)
      .to(
        [leftEditorialRef.current, rightEditorialRef.current],
        { opacity: 0, y: -30, ease: "power2.inOut", duration: 0.8 },
        0
      )
      .to(scrollIndicatorRef.current, { opacity: 0, y: 15, ease: "power1.out", duration: 0.4 }, 0)
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.4 },
        0.7
      );
    });

    // Mobile-Specific Logo Travel
    mm.add("(max-width: 767px)", () => {
      // Crossfade exactly with Introduction section scroll, keeping it near the top!
      gsap.fromTo(travelingLogoRef.current,
        { y: 0, scale: 1, opacity: 1 },
        {
          y: "96vh", // Shift down to match Intro logo
          scale: 1,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#intro-section",
            start: "top bottom", 
            end: "top 25%",      
            scrub: 1, 
          }
        }
      );
    });

    // Desktop-Specific Logo Travel
    mm.add("(min-width: 768px)", () => {
      // Crossfade exactly with Introduction section scroll
      gsap.fromTo(travelingLogoRef.current,
        { y: 0, scale: 1, opacity: 1 },
        {
          y: "75vh", // Move down by 75vh to match Intro logo
          scale: 0.69, // Perfectly scales 130px to 90px
          opacity: 0, 
          ease: "none",
          scrollTrigger: {
            trigger: "#intro-section",
            start: "top bottom", 
            end: "top 25%",      
            scrub: 1, // Must match Intro scrub speed exactly
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  const whatsappNumber = restaurantData?.whatsappNumber || "917204111845";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Masara, I would like to reserve a table.")}`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[600px] overflow-x-clip overflow-y-visible bg-[#3D081A] flex items-center justify-center z-40 select-none"
    >
      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Emblem Watermark */}
      <div
        ref={emblemRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[680px] md:h-[680px] z-0 pointer-events-none opacity-[0.12] flex items-center justify-center will-change-transform"
      >
        <Image src="/images/logo/logo-2.webp" alt="Masara Emblem" fill priority className="object-contain filter invert brightness-200 drop-shadow-[0_0_40px_rgba(245,233,213,0.3)]" />
      </div>

      {/* LEFT EDITORIAL */}
      <div
        ref={leftEditorialRef}
        className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 md:gap-6 pointer-events-none"
      >
        <span className="text-[#D4AF37] text-[6px] md:text-[9px] tracking-[0.4em] uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Est. 2024</span>
        <div className="w-[1px] h-10 md:h-16 bg-[#D4AF37]/40 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
        <span className="text-[#D4AF37] text-[7px] md:text-[10px] tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Culinary Artistry</span>
      </div>

      {/* RIGHT EDITORIAL */}
      <div
        ref={rightEditorialRef}
        className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 md:gap-6 pointer-events-none"
      >
        <span className="text-[#D4AF37] text-[7px] md:text-[10px] tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" style={{ writingMode: "vertical-rl" }}>Bangalore, India</span>
        <div className="w-[1px] h-10 md:h-16 bg-[#D4AF37]/40 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
        <span className="text-[#D4AF37] text-[6px] md:text-[9px] tracking-[0.4em] uppercase drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" style={{ writingMode: "vertical-rl" }}>Fine Dining</span>
      </div>

      {/* Z-INDEX RESTORED: Text is proudly in front of the video */}
      <h1
        ref={leftTextRef}
        className="absolute left-[8%] md:left-[5%] z-30 flex flex-col justify-center pointer-events-none text-[#F5E9D5] text-[22vw] font-serif leading-none tracking-[-0.05em] uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] will-change-transform"
      >
        MAS
      </h1>

      {/* ARCHED VIDEO */}
      <motion.div
        ref={videoContainerRef}
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 overflow-hidden w-[180px] h-[320px] md:w-[380px] md:h-[580px] rounded-t-[300px] rounded-b-2xl will-change-[width,height,transform] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
      >
        <div className="absolute inset-0 bg-black/25 z-20 pointer-events-none" />
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover scale-105">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Z-INDEX RESTORED */}
      <h1
        ref={rightTextRef}
        className="absolute right-[8%] md:right-[5%] z-30 flex flex-col justify-center pointer-events-none text-[#F5E9D5] text-[22vw] font-serif leading-none tracking-[-0.05em] uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] will-change-transform"
      >
        ARA
      </h1>

      {/* TRAVELING LOGO - Made larger and strictly responsive for Mobile vs Desktop */}
      <div 
        ref={travelingLogoRef}
        className="absolute top-[12%] md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 z-[60] w-[75px] h-[75px] md:w-[130px] md:h-[130px] pointer-events-none will-change-transform"
      >
        <Image 
          src="/images/logo/logo-2.webp" 
          alt="Masara Crest" 
          fill 
          priority
          className="object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
        />
      </div>

      {/* SCROLL INDICATOR */}
      <div ref={scrollIndicatorRef} className="absolute bottom-4 md:bottom-8 flex flex-col items-center gap-2 md:gap-3 z-30">
        <span className="text-[7px] md:text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">Scroll</span>
        <div className="w-[1px] h-8 md:h-12 bg-[#D4AF37]/20 overflow-hidden relative">
          <motion.div animate={{ y: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-full h-1/2 bg-[#D4AF37] absolute top-0 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
        </div>
      </div>

      {/* BESPOKE LUXURY CTA */}
      <div ref={ctaRef} className="absolute bottom-16 md:bottom-20 z-40 opacity-0 translate-y-10">
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center">
          <span className="relative text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans font-medium text-[#F5E9D5] group-hover:text-[#D4AF37] transition-colors duration-500 pb-2">
            Reserve Your Table
            
            {/* Base faded line */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-[#D4AF37]/30" />
            
            {/* Animated solid gold line on hover */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#D4AF37] transition-all duration-500 ease-out group-hover:w-full" />
          </span>
        </Link>
      </div>
    </section>
  );
}