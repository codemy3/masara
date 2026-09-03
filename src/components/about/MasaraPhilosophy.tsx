"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const philosophyWords = [
  "Flavour",
  "Craft",
  "Detail",
  "Hospitality",
  "Experience",
];

export function MasaraPhilosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !wordsContainerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial Statement Reveal
      gsap.fromTo(
        ".philosophy-reveal",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );

      // 2. Scroll-linked Typographic Experiment
      // We pin the words container and update state based on scroll progress
      const totalWords = philosophyWords.length;

      ScrollTrigger.create({
        trigger: wordsContainerRef.current,
        start: "top center",
        end: "+=150%", // How long they scroll to see all words
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const newIndex = Math.min(
            Math.floor(self.progress * totalWords),
            totalWords - 1
          );
          if (newIndex !== activeWordIndex) {
            setActiveWordIndex(newIndex);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeWordIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-32 pb-64 md:pt-48 bg-[#F5E9D5] text-[#3D081A] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        
        {/* Intro Statement Area */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-32 md:mb-48">
          <div className="w-full md:w-[60%]">
            <div className="philosophy-reveal uppercase tracking-[0.4em] text-[10px] md:text-xs font-sans font-medium text-[#CBA365] mb-8">
              The Masara Philosophy
            </div>
            
            <h2 className="font-serif leading-[0.85] tracking-tighter">
              <span className="philosophy-reveal block text-[12vw] md:text-[6vw] uppercase font-normal">
                More Than
              </span>
              <span className="philosophy-reveal block text-[12vw] md:text-[6vw] uppercase font-normal">
                What's On
              </span>
              <span className="philosophy-reveal block text-[14vw] md:text-[7vw] italic font-light text-[#CBA365] lowercase pr-12">
                the plate.
              </span>
            </h2>
          </div>

          <div className="w-full md:w-[35%] pt-4 md:pt-24">
            <div className="philosophy-reveal w-12 h-[1px] bg-[#CBA365] mb-8" />
            <p className="philosophy-reveal font-sans text-base md:text-lg font-light leading-relaxed text-[#3D081A]/80">
              Masara is an approach to food that transcends the culinary. It is the obsessive attention to detail, the rhythm of service, and the atmosphere of the room working in absolute harmony.
            </p>
          </div>
        </div>

        {/* Typographic Experiment Area */}
        <div ref={wordsContainerRef} className="w-full h-[50vh] flex items-center justify-center relative">
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {philosophyWords.map((word, i) => {
              // Calculate distance from active index
              const distance = Math.abs(i - activeWordIndex);
              
              // Determine opacity, scale, and Y translation based on distance
              const isActive = i === activeWordIndex;
              const opacity = isActive ? 1 : distance === 1 ? 0.15 : 0;
              const scale = isActive ? 1 : distance === 1 ? 0.7 : 0.5;
              const yOffset = (i - activeWordIndex) * 120; // px spacing
              const blur = isActive ? "blur(0px)" : "blur(4px)";
              
              return (
                <h3
                  key={word}
                  className="absolute font-serif uppercase tracking-tighter text-[#3D081A] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap text-[15vw] md:text-[10vw] lg:text-[9vw]"
                  style={{
                    opacity,
                    transform: `translateY(${yOffset}px) scale(${scale})`,
                    filter: blur,
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  {word}
                </h3>
              );
            })}
          </div>

          {/* Thin Gold accent lines that border the active word */}
          <div className="absolute top-[20%] w-[1px] h-[60%] bg-[#CBA365]/30 left-[10%] md:left-[20%]" />
          <div className="absolute top-[20%] w-[1px] h-[60%] bg-[#CBA365]/30 right-[10%] md:right-[20%]" />
        </div>

      </div>
    </section>
  );
}
