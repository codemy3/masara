"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MohammedAshiq() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const journeyLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Image clip-path reveal from bottom
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      // 2. Subtle parallax on the image itself
      const imgTarget = imageWrapRef.current?.querySelector("img");
      if (imgTarget) {
        gsap.to(imgTarget, {
          y: "8%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 3. Section Indicator reveal
      gsap.fromTo(
        ".ashiq-indicator",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".ashiq-indicator", start: "top 80%" },
        }
      );

      // 4. Text reveal stagger from right
      gsap.fromTo(
        ".ashiq-text-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ashiq-text-reveal", start: "top 75%" },
        }
      );

      // 5. Journey line progressive draw
      gsap.fromTo(
        journeyLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: { trigger: journeyLineRef.current, start: "top 85%" },
        }
      );
      
      // 6. Journey text fade in after line draws
      gsap.fromTo(
        ".journey-step",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: journeyLineRef.current, start: "top 85%" },
        }
      );

      // 7. Typography subtle parallax
      gsap.to(".ashiq-typo-parallax", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 md:py-48 lg:py-56 bg-[#F5E9D5] text-[#3D081A] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        
        {/* Asymmetric Layout */}
        <div className="flex flex-col md:flex-row items-start gap-16 lg:gap-24">
          
          {/* LEFT: Image Column */}
          <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col relative">
            
            <div className="ashiq-indicator mb-10 md:mb-16 md:-ml-8 flex items-center gap-4">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-sans font-medium text-[#CBA365]">
                01
              </span>
              <div className="w-8 h-[1px] bg-[#CBA365]" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#3D081A]/60">
                The Mind
              </span>
            </div>

            <div
              ref={imageWrapRef}
              className="relative w-[90%] md:w-full aspect-[4/5] overflow-hidden shadow-2xl ml-auto md:ml-0 z-10"
            >
              <Image
                src="/images/chef/chef.webp"
                alt="Mohammed Ashiq"
                fill
                className="object-cover object-top scale-105 will-change-transform"
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
            
            {/* Minimal Name Tag */}
            <div className="absolute -bottom-8 md:-bottom-12 -right-4 md:-right-8 lg:-right-16 ashiq-text-reveal">
              <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#3D081A] opacity-10 tracking-tighter uppercase whitespace-nowrap">
                Mohammed Ashiq
              </h3>
            </div>
          </div>

          {/* RIGHT: Typography Column */}
          <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col pt-12 md:pt-32 ashiq-typo-parallax">
            
            <h2 className="font-serif leading-[0.9] tracking-tighter mb-12 lg:mb-16 max-w-2xl">
              <span className="block overflow-hidden py-1">
                <span className="ashiq-text-reveal block text-[11vw] md:text-[6vw] lg:text-[5.5vw] uppercase font-normal">
                  The Journey
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="ashiq-text-reveal block text-[11vw] md:text-[6vw] lg:text-[5.5vw] uppercase font-normal">
                  of a <em className="italic font-light text-[#CBA365] lowercase">self-taught</em>
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="ashiq-text-reveal block text-[11vw] md:text-[6vw] lg:text-[5.5vw] uppercase font-normal">
                  cook.
                </span>
              </span>
            </h2>

            <div className="max-w-md ml-0 md:ml-12 lg:ml-24">
              <p className="ashiq-text-reveal text-base md:text-lg font-sans font-light leading-relaxed text-[#3D081A]/80 mb-16">
                Mohammed Ashiq's journey began in Mangalore, inspired by his grandmother and driven by an uncompromising passion for authentic flavours. From saving money to open Kulki Hub, to eventually standing victorious on MasterChef India Season 8, his path has been defined by grit, instinct, and a deep reverence for the culinary heritage of India.
              </p>

              {/* Minimal Journey Line */}
              <div className="w-full">
                <div 
                  ref={journeyLineRef}
                  className="w-full h-[1px] bg-[#CBA365]/30 mb-4 origin-left"
                />
                <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#3D081A]/60">
                  <span className="journey-step">Mangalore</span>
                  <span className="journey-step text-[#CBA365] mx-1">→</span>
                  <span className="journey-step">Kulki Hub</span>
                  <span className="journey-step text-[#CBA365] mx-1">→</span>
                  <span className="journey-step">MasterChef India</span>
                  <span className="journey-step text-[#CBA365] mx-1">→</span>
                  <span className="journey-step text-[#3D081A]">Masara</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
