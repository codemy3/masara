"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stages = [
  {
    id: "01",
    title: "The Beginning",
    subtitle: "A foundation built on flavor.",
    image: "/images/food/food-02.webp",
  },
  {
    id: "02",
    title: "MasterChef India",
    subtitle: "A national stage for Mangalorean craft.",
    image: "/images/food/food-12.webp",
  },
  {
    id: "03",
    title: "Masara",
    subtitle: "The culmination of a lifetime of passion.",
    image: "/images/food/food-13.webp",
  },
];

export function TheJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      // 1. Initial Heading Reveal
      gsap.fromTo(
        ".journey-huge-text",
        { clipPath: "inset(100% 0 0 0)", y: 50 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );

      // 2. Cinematic Pinned Scroll Experience
      const totalStages = stages.length;
      
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: "+=300%", // 3 viewports of scrolling
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Update the progress line width
          if (progressLineRef.current) {
            gsap.set(progressLineRef.current, { scaleX: self.progress });
          }

          // Calculate which stage we are in (0, 1, or 2)
          const newStage = Math.min(
            Math.floor(self.progress * totalStages),
            totalStages - 1
          );
          
          if (newStage !== activeStage) {
            setActiveStage(newStage);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, activeStage]);

  if (isMobile) {
    return (
      <section className="w-full py-24 bg-[#3D081A] text-[#F5E9D5]">
        <div className="container mx-auto px-6">
          <h2 className="font-serif leading-[0.9] tracking-tighter mb-16 text-[15vw]">
            <span className="block uppercase text-[#CBA365]">From Passion</span>
            <span className="block uppercase text-[#CBA365]/60">To Masterchef</span>
            <span className="block uppercase">To Masara.</span>
          </h2>
          <div className="space-y-20">
            {stages.map((stage) => (
              <div key={stage.id} className="flex flex-col">
                <span className="text-[#CBA365] font-serif text-4xl mb-2">{stage.id}</span>
                <h3 className="font-sans text-xl uppercase tracking-widest mb-2">{stage.title}</h3>
                <p className="font-serif italic text-[#F5E9D5]/70 mb-8">{stage.subtitle}</p>
                <div className="relative w-full aspect-[4/5]">
                  <Image src={stage.image} alt={stage.title} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // DESKTOP: Immersive Pinned Experience
  const currentStage = stages[activeStage];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#3D081A] text-[#F5E9D5] overflow-hidden"
    >
      {/* Intro Typography Area (Scrolls Normally) */}
      <div className="container mx-auto px-10 max-w-7xl pt-40 pb-20">
        <h2 className="font-serif leading-[0.85] tracking-tighter text-[8vw] lg:text-[7vw]">
          <span className="block overflow-hidden py-1">
            <span className="journey-huge-text block uppercase font-normal text-[#CBA365]">
              From Passion
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="journey-huge-text block uppercase font-normal text-[#CBA365]/60 pl-12 lg:pl-24">
              To Masterchef
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="journey-huge-text block uppercase font-normal pl-24 lg:pl-48">
              To Masara.
            </span>
          </span>
        </h2>
      </div>

      {/* Pinned Cinematic Area */}
      <div ref={pinRef} className="relative w-full h-[100svh] min-h-[700px] flex items-center">
        
        {/* Massive Background Number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span 
            className="font-serif text-[45vw] font-light text-[#F5E9D5]/[0.03] leading-none transition-all duration-1000 ease-out"
            key={currentStage.id}
          >
            {currentStage.id}
          </span>
        </div>

        <div className="container mx-auto px-10 max-w-7xl relative z-10 w-full flex justify-between items-center h-full pb-20">
          
          {/* LEFT: Transforming Typography */}
          <div className="w-[45%] flex flex-col pt-10">
            <div className="mb-4">
              <span className="text-xs uppercase tracking-[0.4em] font-sans text-[#CBA365]">
                Stage {currentStage.id}
              </span>
            </div>
            
            {/* The Text that changes */}
            <div className="h-32 relative">
              {stages.map((stage, i) => (
                <div 
                  key={stage.id} 
                  className="absolute top-0 left-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ 
                    opacity: i === activeStage ? 1 : 0,
                    transform: `translateY(${i === activeStage ? '0px' : i < activeStage ? '-40px' : '40px'})`,
                    pointerEvents: i === activeStage ? 'auto' : 'none'
                  }}
                >
                  <h3 className="font-sans text-3xl lg:text-4xl uppercase tracking-[0.1em] font-medium mb-4">
                    {stage.title}
                  </h3>
                  <p className="font-serif text-2xl lg:text-3xl italic font-light text-[#F5E9D5]/70">
                    {stage.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Global Progress Line (Grows as you scroll through the 300% pin) */}
            <div className="mt-20 w-full max-w-sm h-[1px] bg-[#F5E9D5]/10 relative origin-left">
              <div 
                ref={progressLineRef} 
                className="absolute inset-0 bg-[#CBA365] origin-left scale-x-0 will-change-transform" 
              />
            </div>
          </div>

          {/* RIGHT: Transforming Image Mask */}
          <div className="w-[45%] h-[65vh] relative flex justify-end items-center">
            {stages.map((stage, i) => (
              <div 
                key={stage.id}
                className="absolute w-[80%] aspect-[3/4] overflow-hidden shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ 
                  opacity: i === activeStage ? 1 : 0,
                  clipPath: i === activeStage ? "inset(0% 0% 0% 0%)" : i < activeStage ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
                  transform: `scale(${i === activeStage ? 1 : 1.1}) rotate(${i === activeStage ? 0 : i < activeStage ? -2 : 2}deg)`,
                  zIndex: i === activeStage ? 10 : 1
                }}
              >
                <Image
                  src={stage.image}
                  alt={stage.title}
                  fill
                  className="object-cover"
                  sizes="40vw"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
