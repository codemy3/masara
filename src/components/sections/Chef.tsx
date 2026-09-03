"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chef() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      
      // Elegant Staggered Text Reveal
      gsap.fromTo(
        ".chef-text-reveal",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 55%" } }
      );

    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="chef-section"
      ref={sectionRef} 
      className="relative w-full pt-12 pb-24 md:py-32 bg-[#3D081A] text-[#F5E9D5] overflow-visible z-10"
    >
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* LEFT SIDE: Typographic Story */}
        <div className="w-full md:w-1/2 z-20 pl-0 md:pr-12 flex flex-col justify-center">
          
          <div className="overflow-hidden mb-6">
            <span className="chef-text-reveal block uppercase tracking-[0.3em] text-xs font-semibold text-[#F5E9D5]/70">
              MasterChef India
            </span>
          </div>
          
          <h3 className="text-[14vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter mb-8 relative z-20 mix-blend-difference md:mix-blend-normal text-[#F5E9D5]">
            <div className="overflow-hidden py-1">
              <span className="chef-text-reveal block uppercase tracking-[-0.04em]">THE CRAFT</span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="chef-text-reveal block italic lowercase font-light text-[#F5E9D5]/70 text-[15vw] md:text-[9vw] my-1">behind</span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="chef-text-reveal block uppercase tracking-[-0.04em]">MASARA</span>
            </div>
          </h3>
          
          <div className="overflow-hidden max-w-md mb-10">
            <p className="chef-text-reveal text-base md:text-lg font-light leading-relaxed font-sans text-[#F5E9D5]/90">
              Driven by a passion for elevated hospitality, Muhammad Ashiq brings a refined vision to Bangalore&apos;s dining landscape. Every dish is an exploration of heritage, reinvented with meticulous technique.
            </p>
          </div>
          
          <div className="overflow-hidden">
            <Link href="/about" className="chef-text-reveal group inline-flex items-center gap-4 text-sm font-sans uppercase tracking-widest text-[#F5E9D5] hover:text-[#F5E9D5]/60 transition-colors">
              <span className="border-b border-[#F5E9D5] pb-1">Meet the Chef</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

        </div>

        {/* RIGHT SIDE: Static image — starts hidden, revealed when FloatingChef lands */}
        <div className="w-full md:w-1/2 mt-16 md:mt-0 flex justify-end z-10">
          <div 
            id="chef-image-slot"
            className="relative w-[90%] md:w-[85%] aspect-[3/4] overflow-hidden shadow-2xl will-change-transform rounded-none"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <Image src="/images/chef/chef.webp" alt="Muhammad Ashiq" fill className="object-cover" />
          </div>
        </div>

      </div>
    </section>
  );
}