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

const foodItems = [
  { image: "/images/food/food-02.webp", sizeClasses: "w-[80vw] md:w-[45vw] aspect-[4/3] md:aspect-[16/10]", alignment: "self-center" },
  { image: "/images/food/food-08.webp", sizeClasses: "w-[60vw] md:w-[22vw] aspect-[3/4]", alignment: "self-end mb-4 md:mb-8" },
  { image: "/images/food/food-03.webp", sizeClasses: "w-[70vw] md:w-[30vw] aspect-[4/5]", alignment: "self-start mt-4 md:mt-8" },
  { image: "/images/food/food-04.webp", sizeClasses: "w-[65vw] md:w-[28vw] aspect-square", alignment: "self-center" },
  { image: "/images/food/food-05.webp", sizeClasses: "w-[75vw] md:w-[35vw] aspect-[3/2]", alignment: "self-end mb-6 md:mb-10" },
  { image: "/images/food/food-06.webp", sizeClasses: "w-[60vw] md:w-[25vw] aspect-[4/5]", alignment: "self-start mt-6 md:mt-12" },
  { image: "/images/food/food-07.webp", sizeClasses: "w-[85vw] md:w-[40vw] aspect-video", alignment: "self-center" },
  { image: "/images/food/food-09.webp", sizeClasses: "w-[50vw] md:w-[20vw] aspect-[3/4]", alignment: "self-end mb-4 md:mb-8" },
  { image: "/images/food/food-10.webp", sizeClasses: "w-[65vw] md:w-[28vw] aspect-[4/5]", alignment: "self-start mt-4 md:mt-10" },
  { image: "/images/food/food-11.webp", sizeClasses: "w-[70vw] md:w-[32vw] aspect-square", alignment: "self-center" },
  { image: "/images/food/food-12.webp", sizeClasses: "w-[80vw] md:w-[45vw] aspect-[16/10]", alignment: "self-end mb-8 md:mb-12" },
  { image: "/images/food/food-13.webp", sizeClasses: "w-[55vw] md:w-[24vw] aspect-[3/4]", alignment: "self-start mt-6 md:mt-10" },
  { image: "/images/food/food-14.webp", sizeClasses: "w-[60vw] md:w-[26vw] aspect-square", alignment: "self-center" },
  { image: "/images/food/food-15.webp", sizeClasses: "w-[75vw] md:w-[38vw] aspect-[4/3]", alignment: "self-end mb-4 md:mb-8" },
  { image: "/images/food/food-16.webp", sizeClasses: "w-[65vw] md:w-[30vw] aspect-[4/5]", alignment: "self-start mt-4 md:mt-8" },
  { image: "/images/food/food-17.webp", sizeClasses: "w-[85vw] md:w-[42vw] aspect-video", alignment: "self-center" },
  { image: "/images/food/food-18.webp", sizeClasses: "w-[50vw] md:w-[20vw] aspect-[3/4]", alignment: "self-end mb-8 md:mb-12" },
  { image: "/images/food/food-19.webp", sizeClasses: "w-[70vw] md:w-[32vw] aspect-[4/5]", alignment: "self-start mt-6 md:mt-10" },
  { image: "/images/food/food-20.webp", sizeClasses: "w-[60vw] md:w-[25vw] aspect-square", alignment: "self-center" },
  { image: "/images/food/food-21.webp", sizeClasses: "w-[80vw] md:w-[40vw] aspect-[3/2]", alignment: "self-end mb-4 md:mb-8" },
  { image: "/images/food/food-22.webp", sizeClasses: "w-[65vw] md:w-[28vw] aspect-[4/5]", alignment: "self-start mt-4 md:mt-12" },
  { image: "/images/food/food-23.webp", sizeClasses: "w-[75vw] md:w-[35vw] aspect-square", alignment: "self-center" },
  { image: "/images/food/food-24.webp", sizeClasses: "w-[85vw] md:w-[45vw] aspect-video", alignment: "self-end mb-6 md:mb-10" },
  { image: "/images/food/food-25.webp", sizeClasses: "w-[55vw] md:w-[22vw] aspect-[3/4]", alignment: "self-start mt-8 md:mt-12" },
  { image: "/images/food/food-26.webp", sizeClasses: "w-[70vw] md:w-[30vw] aspect-[4/5]", alignment: "self-center" },
  { image: "/images/food/food-27.webp", sizeClasses: "w-[65vw] md:w-[28vw] aspect-square", alignment: "self-end mb-4 md:mb-8" },
];

export function Food() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !marqueeTrackRef.current) return;

    const ctx = gsap.context(() => {
      
      // Fast, Infinite Marquee Loop
      const loop = gsap.to(marqueeTrackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 45, // Slowed down scroll speed for the large number of images
        ease: "none",
      });

      // Velocity Interaction (Speeds up even more when the user scrolls)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          
          if (velocity > 0) {
            gsap.to(loop, { 
              timeScale: 1 + velocity / 150, // More sensitive to scroll
              overwrite: true 
            });
            
            gsap.delayedCall(0.15, () => {
              gsap.to(loop, { timeScale: 1, ease: "power2.out" });
            });
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      // Changed to the requested background and tightened the vertical padding
      className="relative w-full pt-8 pb-12 md:pt-12 md:pb-16 bg-[#FCEFDF] text-[#3D081A] overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-6 md:mb-8 gap-4">
          <div>
            <span className="uppercase tracking-[0.3em] text-xs font-semibold mb-4 block text-[#3D081A]/70">
              Culinary Experience
            </span>
            <h2 className="text-[12vw] md:text-[8vw] font-serif leading-none tracking-tighter">
              The Table
            </h2>
          </div>

          <Link href="/menu" className="group inline-flex items-center gap-4 text-sm font-sans uppercase tracking-widest text-[#3D081A] hover:text-[#3D081A]/60 transition-colors pb-2">
            <span className="border-b border-[#3D081A]/30 pb-1">Explore the menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>

      {/* --- PURE VISUAL MARQUEE (No text overlays, tight spacing) --- */}
      <div className="relative w-full overflow-hidden flex cursor-ew-resize">
        <div 
          ref={marqueeTrackRef}
          // Tighter gaps between images to remove extra space
          className="flex gap-8 md:gap-12 pl-8 md:pl-12 will-change-transform w-max items-center"
        >
          {/* Duplicating the array for the seamless loop */}
          {[...foodItems, ...foodItems].map((item, index) => (
            <div 
              key={index}
              className={`relative flex-shrink-0 group ${item.alignment} ${item.sizeClasses}`}
            >
              {/* Image Frame with Magnetic Hover Scale and tinted shadow */}
              <div className="relative w-full h-full overflow-hidden shadow-[0_20px_40px_rgba(61,8,26,0.15)] bg-[#F5E9D5] rounded-none">
                <Image 
                  src={item.image} 
                  alt={`Masara Dish ${index}`}
                  fill 
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}