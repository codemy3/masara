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

// 1. Array containing both Food and Ambience Images
const allSources = [
  "/images/restaurant/01.webp",
  "/images/food/food-01.webp",
  "/images/restaurant/02.webp",
  "/images/food/food-02.webp",
  "/images/restaurant/03.webp",
  "/images/food/food-03.webp",
  "/images/restaurant/04.webp",
  "/images/food/food-04.webp",
  "/images/restaurant/5.webp",
  "/images/food/food-05.webp",
  "/images/restaurant/06.webp",
  ...Array.from({ length: 22 }, (_, i) => `/images/food/food-${(i + 6).toString().padStart(2, '0')}.webp`),
];

// 2. Assign dynamic aspects for the Pinterest look
const galleryImages = allSources.map((src, i) => {
  const aspects = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[16/9]"];
  return { src, aspect: aspects[i % aspects.length] };
});

// ----------------------------------------------------------------------
// HERO SECTION (REVERTED + GOLDEN TOUCH)
// ----------------------------------------------------------------------
function GalleryHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.fromTo(".gallery-glow", { opacity: 0 }, { opacity: 1, duration: 2 }, 0)
        .fromTo(".gallery-eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1 }, 0.2)
        .fromTo(".gallery-heading-line", { clipPath: "inset(100% 0 0 0)", y: 40 }, { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.2, stagger: 0.15 }, 0.4);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[60svh] bg-[#F5E9D5] flex flex-col justify-center items-center text-center pt-32 pb-12 overflow-hidden">
      
      {/* Subtle Golden Radial Glow */}
      <div className="gallery-glow absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#CBA365]/30 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Reverted Eyebrow with elegant golden flanking lines */}
        <div className="gallery-eyebrow uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-sans font-medium text-[#CBA365] mb-6 flex items-center justify-center w-full">
          <span className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-[#CBA365] to-transparent mr-4" />
          <span className="text-[8px] mr-2">❖</span>
          The Masara Collection
          <span className="text-[8px] ml-2">❖</span>
          <span className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-[#CBA365] to-transparent ml-4" />
        </div>
        
        <h1 className="font-serif leading-[0.9] tracking-tighter text-[#3D081A]">
          <span className="block overflow-hidden py-1">
            <span className="gallery-heading-line block text-[11vw] md:text-[6vw] uppercase font-normal">
              A Curated
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="gallery-heading-line block text-[11vw] md:text-[7vw] italic font-light">
              Exhibition.
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// GALLERY EXHIBITION (TRUE CSS MASONRY & FAST ANIMATION)
// ----------------------------------------------------------------------
function GalleryExhibition() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Much faster, cleaner reveal animation
      gsap.utils.toArray<HTMLElement>(".gallery-img-wrap").forEach((wrap) => {
        gsap.fromTo(
          wrap,
          { opacity: 0, scale: 0.95, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrap,
              start: "top 90%", // Triggers earlier so it doesn't look like it's struggling to load
              toggleActions: "play none none none" // Plays once, doesn't reset if you scroll up
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full pb-32 bg-[#F5E9D5]">
      <div className="container mx-auto px-4 md:px-10 max-w-7xl">
        
        {/* TRUE MASONRY: Using CSS columns guarantees perfect arrangement on all devices */}
        <div className="columns-2 md:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
          
          {galleryImages.map((img, i) => (
            <div 
              key={i} 
              // break-inside-avoid prevents images from being cut in half across columns
              className={`gallery-img-wrap relative w-full overflow-hidden p-1.5 md:p-3 bg-[#F5E9D5] border border-[#CBA365]/40 shadow-sm hover:shadow-xl hover:border-[#CBA365]/80 transition-all duration-500 break-inside-avoid ${img.aspect}`}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image 
                  src={img.src} 
                  alt={`Masara Gallery ${i + 1}`} 
                  fill 
                  quality={65} 
                  // prioritize the first 6 images so they load instantly
                  priority={i < 6}
                  loading={i < 6 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-1000 hover:scale-105" 
                  sizes="(max-width: 768px) 50vw, 33vw" 
                />
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// GALLERY CLOSING
// ----------------------------------------------------------------------
function GalleryClosing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".gallery-closing-reveal", { clipPath: "inset(100% 0 0 0)", y: 40 }, { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.4, stagger: 0.2, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
      gsap.fromTo(".gallery-closing-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 60%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 lg:py-48 bg-[#3D081A] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full container mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        <h2 className="font-serif leading-[0.85] tracking-tighter mb-12">
          <span className="block overflow-hidden py-1">
            <span className="gallery-closing-reveal block text-[9vw] md:text-[5vw] uppercase font-normal text-[#F5E9D5]">
              Experience
            </span>
          </span>
          <span className="block overflow-hidden py-1 mt-2">
            <span className="gallery-closing-reveal block text-[7vw] md:text-[4vw] italic font-light text-[#CBA365] lowercase">
              it yourself.
            </span>
          </span>
        </h2>
        <div className="gallery-closing-cta">
          <Link href="https://wa.me/917204111845" target="_blank" className="group relative inline-flex items-center gap-6 px-10 py-4 border border-[#CBA365] text-[#CBA365] overflow-hidden hover:text-[#3D081A] transition-colors duration-500">
            <div className="absolute inset-0 bg-[#CBA365] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-sans font-medium">
              Reserve a Table
            </span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Gallery() {
  return (
    <main className="flex flex-col w-full bg-[#F5E9D5]">
      <GalleryHero />
      <GalleryExhibition />
      <GalleryClosing />
    </main>
  );
}