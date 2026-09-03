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

export function CinematicClosing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Image parallax and opacity fade-in
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 0.15, // Keep it very subtle
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            scrub: true,
          },
        }
      );

      // 2. Text Reveal
      gsap.fromTo(
        ".closing-reveal",
        { clipPath: "inset(100% 0 0 0)", y: 50 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 50%" },
        }
      );

      // 3. CTA fade up
      gsap.fromTo(
        ".closing-cta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 40%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[700px] bg-[#3D081A] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Subtle Atmospheric Background Image */}
      <div 
        ref={imageRef} 
        className="absolute inset-0 z-0 will-change-transform opacity-0 mix-blend-luminosity"
      >
        <Image
          src="/images/restaurant/5.webp"
          alt="Masara Atmosphere"
          fill
          className="object-cover object-center grayscale"
          sizes="100vw"
        />
        {/* Extra vignette to blend edges perfectly into burgundy */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#3D081A]/80 to-[#3D081A]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full container mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        
        {/* Massive Closing Statement */}
        <h2 className="font-serif leading-[0.85] tracking-tighter mb-16">
          <span className="block overflow-hidden py-1">
            <span className="closing-reveal block text-[13vw] md:text-[8vw] lg:text-[7vw] uppercase font-normal text-[#F5E9D5]">
              The Story
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="closing-reveal block text-[13vw] md:text-[8vw] lg:text-[7vw] uppercase font-normal text-[#F5E9D5]">
              Continues
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="closing-reveal block text-[15vw] md:text-[9vw] lg:text-[8vw] italic font-light text-[#CBA365] lowercase pr-6">
              at your table.
            </span>
          </span>
        </h2>

        {/* Primary CTA */}
        <div className="closing-cta mb-8">
          <Link
            href="https://wa.me/917204111845"
            target="_blank"
            className="group relative inline-flex items-center gap-6 px-12 py-5 bg-[#CBA365] text-[#3D081A] overflow-hidden"
          >
            {/* Hover fill effect */}
            <div className="absolute inset-0 bg-[#F5E9D5] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            
            <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-sans font-semibold">
              Reserve a Table
            </span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Secondary Link */}
        <div className="closing-cta">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#F5E9D5]/60 hover:text-[#CBA365] transition-colors duration-300"
          >
            <span className="border-b border-transparent group-hover:border-[#CBA365] pb-1 transition-colors duration-300">
              Explore the Menu
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
