"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FloatingChef() {
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!floatingRef.current) return;

    const gridChef = document.getElementById("grid-chef-photo");
    const chefSection = document.getElementById("chef-section");
    const chefSlot = document.getElementById("chef-image-slot");

    if (!gridChef || !chefSection || !chefSlot) return;

    const ctx = gsap.context(() => {
      gsap.set(floatingRef.current, { autoAlpha: 0 });

      let mm = gsap.matchMedia();

      mm.add({
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)"
      }, (context) => {
        let { isMobile } = context.conditions as { isMobile: boolean };

        ScrollTrigger.create({
          trigger: chefSection,
          // MOBILE FIX: We delay the start slightly on mobile because the scroll distance is shorter
          start: isMobile ? "top 90%" : "top bottom", 
          end: "top 20%",      
          scrub: true,
          
          onEnter: () => {
            gsap.set(gridChef, { autoAlpha: 0 }); 
            gsap.set(floatingRef.current, { autoAlpha: 1 }); 
            gsap.set(chefSlot, { autoAlpha: 0 }); 
          },
          onLeave: () => {
            gsap.set(gridChef, { autoAlpha: 0 });
            gsap.set(floatingRef.current, { autoAlpha: 0 }); 
            gsap.set(chefSlot, { autoAlpha: 1 }); 
          },
          onEnterBack: () => {
            gsap.set(gridChef, { autoAlpha: 0 });
            gsap.set(floatingRef.current, { autoAlpha: 1 });
            gsap.set(chefSlot, { autoAlpha: 0 });
          },
          onLeaveBack: () => {
            gsap.set(gridChef, { autoAlpha: 1 }); 
            gsap.set(floatingRef.current, { autoAlpha: 0 });
            gsap.set(chefSlot, { autoAlpha: 0 });
          },

          onUpdate: (self) => {
            const start = gridChef.getBoundingClientRect();
            const end = chefSlot.getBoundingClientRect();
            
            gsap.set(floatingRef.current, {
              top: start.top + (end.top - start.top) * self.progress,
              left: start.left + (end.left - start.left) * self.progress,
              width: start.width + (end.width - start.width) * self.progress,
              height: start.height + (end.height - start.height) * self.progress,
            });
          }
        });
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={floatingRef}
      className="fixed z-40 overflow-hidden shadow-2xl pointer-events-none rounded-none will-change-[top,left,width,height]"
    >
      <Image src="/images/chef/chef.webp" alt="Muhammad Ashiq" fill priority className="object-cover" />
    </div>
  );
}