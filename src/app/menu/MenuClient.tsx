"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { DbMenuCategory } from "@/types/database";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------------------------
// MENU HERO
// ----------------------------------------------------------------------
function MenuHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.fromTo(
        ".menu-hero-reveal",
        { clipPath: "inset(100% 0 0 0)", y: 50 },
        { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.4, stagger: 0.15 },
        0.3
      );

      tl.fromTo(
        ".menu-hero-eyebrow",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.8
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[60svh] min-h-[500px] lg:h-[70svh] bg-[#3D081A] flex flex-col justify-center items-center text-center overflow-hidden"
    >
      <div className="absolute inset-6 md:inset-12 border border-[#CBA365]/30 pointer-events-none flex flex-col justify-between items-center opacity-70">
        <div className="w-full h-[1px] bg-[#CBA365]/30 absolute top-12" />
        <div className="w-full h-[1px] bg-[#CBA365]/30 absolute bottom-12" />
      </div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center pt-10">
        
        <div className="menu-hero-eyebrow mb-8 flex flex-col items-center">
          <div className="relative w-40 md:w-56 h-16 md:h-20 mb-8">
            <Image 
              src="/images/logo/logo-2.webp" 
              alt="Masara" 
              fill 
              className="object-contain"
              priority
            />
          </div>

          <div className="uppercase tracking-[0.4em] text-[10px] md:text-xs font-sans font-medium text-[#CBA365] flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-[#CBA365]" />
            Menu
            <span className="w-8 h-[1px] bg-[#CBA365]" />
          </div>
        </div>

        <h1 className="font-serif leading-[0.9] tracking-tighter text-[#F5E9D5]">
          <span className="block overflow-hidden py-1">
            <span className="menu-hero-reveal block text-[11vw] md:text-[6vw] uppercase font-normal">
              Culinary
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="menu-hero-reveal block text-[12vw] md:text-[7vw] italic font-light text-[#CBA365]">
              Artistry.
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// MENU NAVIGATION
// ----------------------------------------------------------------------
interface MenuNavigationProps {
  categories: DbMenuCategory[];
}

function MenuNavigation({ categories }: MenuNavigationProps) {
  const [activeId, setActiveId] = useState(categories[0]?.slug || "");

  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(cat => document.getElementById(cat.slug));
      let currentActive = categories[0]?.slug || "";
      
      for (const section of sections) {
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          currentActive = section.id;
        }
      }
      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  const scrollToSection = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-[#F5E9D5]/95 backdrop-blur-md border-b border-[#CBA365]/30 shadow-sm py-4">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <div className="flex items-center overflow-x-auto no-scrollbar gap-8 md:gap-12 hide-scroll-bar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToSection(category.slug)}
              className={`whitespace-nowrap text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 relative py-2 ${
                activeId === category.slug 
                  ? "text-[#3D081A]" 
                  : "text-[#3D081A]/40 hover:text-[#3D081A]/80"
              }`}
            >
              {category.name}
              <span 
                className={`absolute bottom-0 left-0 h-[2px] bg-[#CBA365] transition-all duration-300 ease-out ${
                  activeId === category.slug ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .hide-scroll-bar::-webkit-scrollbar { display: none; }
        .hide-scroll-bar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// ----------------------------------------------------------------------
// MENU LIST
// ----------------------------------------------------------------------
const categoryImages: Record<string, string> = {
  "chaats": "/images/food/food-01.webp",
  "veg-tandoor": "/images/food/food-28.webp",
  "appetizers": "/images/food/food-22.webp",
  "curries": "/images/food/food-08.webp",
  "veg-gravies": "/images/food/food-18.webp",
  "desserts": "/images/food/food-13.webp"
};

interface MenuListProps {
  categories: DbMenuCategory[];
}

function MenuList({ categories }: MenuListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".menu-category").forEach((section) => {
        const items = section.querySelectorAll(".menu-item-row");
        
        gsap.fromTo(
          section.querySelector(".category-header"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } }
        );

        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 80%" } }
          );
        }
      });

      gsap.utils.toArray<HTMLElement>(".menu-image-wrap").forEach((img) => {
        gsap.to(img.querySelector("img"), {
          y: "10%",
          ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [categories]);

  return (
    <div ref={containerRef} className="w-full bg-[#F5E9D5] text-[#3D081A] py-16 md:py-32 relative">
      <div className="absolute inset-x-4 inset-y-4 md:inset-x-8 md:inset-y-8 border-2 border-[#CBA365]/20 pointer-events-none hidden md:block" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {categories.map((category, index) => {
          const hasImage = !!categoryImages[category.slug];
          const isEven = index % 2 === 0;

          return (
            <div 
              key={category.id} 
              id={category.slug} 
              className="menu-category pt-10 pb-20 md:pt-16 md:pb-24 border-b border-[#3D081A]/10 last:border-b-0"
            >
              
              {/* CATEGORY HEADER: Spans full width, centered on mobile */}
              <div className="category-header mb-10 md:mb-16 text-center lg:text-left">
                <h2 className="font-serif text-4xl md:text-5xl text-[#3D081A] relative inline-block">
                  {category.name}
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-12 md:w-24 h-[2px] bg-[#CBA365]" />
                </h2>
                
                {category.description && (
                  <p className="font-sans text-sm md:text-base font-light text-[#3D081A]/70 leading-relaxed mt-6 max-w-2xl mx-auto lg:mx-0">
                    {category.description}
                  </p>
                )}
              </div>

              {/* CONTENT SPLIT: Image and Items side-by-side on Desktop, Stacked on Mobile */}
              <div className={`flex flex-col ${hasImage ? (isEven ? 'lg:flex-row' : 'lg:flex-row-reverse') : ''} gap-12 lg:gap-20 items-start`}>
                
                {/* CATEGORY IMAGE: Scaled down beautifully for mobile */}
                {hasImage && (
                  <div className="w-full lg:w-[45%] flex justify-center lg:sticky lg:top-32 mb-4 lg:mb-0">
                    <div className="menu-image-wrap relative w-full max-w-[260px] md:max-w-sm aspect-[3/4] overflow-hidden rounded-t-[15rem] shadow-xl border-4 border-[#F5E9D5] ring-1 ring-[#CBA365]/30">
                      <Image
                        src={categoryImages[category.slug]}
                        alt={category.name}
                        fill
                        className="object-cover scale-110 will-change-transform"
                        sizes="(max-width: 1024px) 70vw, 40vw"
                      />
                    </div>
                  </div>
                )}

                {/* MENU ITEMS */}
                <div className={`w-full ${hasImage ? 'lg:w-[55%]' : 'w-full'}`}>
                  <div className={`grid gap-x-12 gap-y-10 ${hasImage ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {category.menu_items.map((item) => (
                      <div key={item.id} className={`menu-item-row flex flex-col group ${!item.is_available ? 'opacity-40 grayscale' : ''}`}>
                        
                        <div className="flex justify-between items-baseline gap-2 mb-1 w-full">
                          {/* 
                            Added max-w-[70%] to ensure long dish names on mobile 
                            wrap nicely and don't destroy the dotted line/price.
                          */}
                          <h3 className="font-serif text-lg md:text-2xl text-[#3D081A] flex items-start gap-2 max-w-[70%] leading-snug">
                            <span>{item.name}</span>
                            {item.is_vegetarian && (
                              <span 
                                className="flex items-center justify-center w-[10px] h-[10px] md:w-[12px] md:h-[12px] border-[1px] border-green-700 rounded-[2px] flex-shrink-0 mt-1.5 md:mt-2" 
                                title="Vegetarian"
                              >
                                <span className="w-1 h-1 rounded-full bg-green-700"></span>
                              </span>
                            )}
                            {!item.is_available && (
                              <span className="font-sans text-[8px] uppercase tracking-widest text-[#3D081A] bg-[#3D081A]/10 px-2 py-0.5 rounded-full ml-1 mt-1">
                                Unavailable
                              </span>
                            )}
                          </h3>
                          
                          <div className="flex-grow border-b-[1.5px] border-dotted border-[#CBA365]/60 relative top-[-4px] md:top-[-6px] mx-1 md:mx-2 opacity-40 md:opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                          
                          <span className="font-serif text-lg md:text-2xl text-[#CBA365] shrink-0">
                            {item.price}/-
                          </span>
                        </div>
                        
                        {item.description && (
                          <p className="font-sans text-[12px] md:text-sm font-light text-[#3D081A]/70 leading-relaxed pr-8 md:pr-16 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// MENU CLIENT WRAPPER
// ----------------------------------------------------------------------
export function MenuClient({ categories }: { categories: DbMenuCategory[] }) {
  return (
    <div className="flex flex-col w-full relative">
      <MenuHero />
      {categories.length > 0 ? (
        <>
          <MenuNavigation categories={categories} />
          <MenuList categories={categories} />
        </>
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-[#F5E9D5] text-[#3D081A]">
          <p className="font-serif text-2xl">Menu is currently unavailable.</p>
        </div>
      )}
    </div>
  );
}