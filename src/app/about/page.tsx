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

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {

      const heroTl = gsap.timeline();

      heroTl.fromTo(".hero-top-frame",
        { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.2
      );

      heroTl.fromTo(".hero-reveal",
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }, 0.4
      );

      heroTl.fromTo(".gold-line-x",
        { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power3.inOut" }, 0.7
      );

      heroTl.fromTo(".hero-img-wrap",
        { clipPath: "inset(100% 0 0 0)", y: 30 },
        { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.5, stagger: 0.2, ease: "power4.out" }, 1
      );

      const sections = gsap.utils.toArray(".story-section");
      sections.forEach((sec: any) => {
        gsap.fromTo(sec.querySelectorAll(".fade-up"),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: sec, start: "top 80%" }
          }
        );
      });

      // Parallax for small overlapping elements
      gsap.to(".parallax-fast", {
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: ".parallax-container", start: "top bottom", end: "bottom top", scrub: true }
      });

      // NEW: Cinematic Parallax for the Philosophy background image
      gsap.to(".bg-parallax", {
        y: "20%",
        ease: "none",
        scrollTrigger: { trigger: ".bg-parallax-container", start: "top bottom", end: "bottom top", scrub: true }
      });

      gsap.to(".gold-diamond", {
        rotation: 360,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom bottom", scrub: 1 }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#F5E9D5] text-[#3D081A] overflow-hidden selection:bg-[#3D081A] selection:text-[#F5E9D5]">

      {/* ---------------- SECTION 1: RICH VISUAL HERO ---------------- */}
      <section className="relative w-full min-h-[100svh] flex flex-col justify-between px-6 md:px-12 pt-8">

        <div className="hero-top-frame w-full max-w-7xl mx-auto flex justify-between items-center border-b border-[#D4AF37]/30 pb-4 mb-12">
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-sans text-[#3D081A]/60">
            Masara Bangalore
          </span>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-sans text-[#3D081A]/60">
            Est. 2024
          </span>
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-4 md:mt-10 mb-12">
          <div className="flex items-center gap-4 mb-6 hero-reveal">
            <div className="w-2 h-2 bg-[#D4AF37] rotate-45 gold-diamond" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans text-[#D4AF37] font-semibold">
              The Story of Masara
            </span>
            <div className="w-2 h-2 bg-[#D4AF37] rotate-45 gold-diamond" />
          </div>

          <h1 className="font-serif text-[12.5vw] md:text-[7.5vw] leading-[0.9] tracking-tighter mb-8 hero-reveal">
            Rooted in tradition.<br />
            <span className="italic font-light text-[#3D081A]/80">Crafted for tomorrow.</span>
          </h1>

          <div className="w-full max-w-2xl h-[1px] bg-[#D4AF37]/40 origin-center gold-line-x" />
        </div>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-[45vh] md:h-[55vh] items-end pb-8">
          <div className="hero-img-wrap hidden md:block relative w-full h-[80%]">
            <Image src="/images/restaurant/02.webp" alt="Ambience" fill className="object-cover border-[2px] border-[#3D081A]" priority />
          </div>
          <div className="hero-img-wrap relative w-full h-full z-10">
            <Image src="/images/food/food-28.webp" alt="Culinary Artistry" fill className="object-cover border-[2px] border-[#D4AF37]" priority />
          </div>
          <div className="hero-img-wrap hidden md:block relative w-full h-[60%]">
            <Image src="/images/restaurant/03.webp" alt="Details" fill className="object-cover border-[2px] border-[#3D081A]" priority />
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 2: THE CHEF (AUTHENTIC STORY) ---------------- */}
      <section className="story-section parallax-container relative w-full py-24 md:py-32 px-6 md:px-12 bg-[#3D081A] text-[#F5E9D5] border-y border-[#D4AF37]/30">

        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          <div className="w-full lg:w-1/2 flex flex-col order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6 fade-up">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#D4AF37] font-semibold">The Mastermind</span>
              <div className="w-16 h-[1px] bg-[#D4AF37]/60" />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8 fade-up text-[#D4AF37]">
              Mohammed Ashiq
            </h2>

            <p className="font-sans text-sm md:text-base font-light leading-relaxed text-[#F5E9D5]/80 mb-6 fade-up">
              The journey began with an uncompromising love for coastal flavours. From opening the beloved Kulki Hub, to capturing the nation's attention and standing victorious on MasterChef India Season 8, his path has been defined by instinct and grit.
            </p>
            <p className="font-sans text-sm md:text-base font-light leading-relaxed text-[#F5E9D5]/80 fade-up">
              Today, Masara stands in Bangalore not just as a restaurant, but as the culmination of that lifelong pursuit—bringing authentic, elevated Indian artistry to the table in a setting designed for the discerning palate.
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-[85%] md:w-[75%] aspect-[4/5] fade-up">
              <Image src="/images/chef/chef-1.webp" alt="Mohammed Ashiq" fill className="object-cover border-[3px] border-[#D4AF37]/20" />

              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-[2px] border-l-[2px] border-[#D4AF37]" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-[2px] border-r-[2px] border-[#D4AF37]" />

              <div className="absolute -bottom-8 -left-6 md:-left-12 w-[50%] aspect-square border-[2px] border-[#3D081A] shadow-2xl parallax-fast z-10 hidden md:block">
                <Image src="/images/food/food-02.webp" alt="Kitchen Detail" fill className="object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- SECTION 3: THE PHILOSOPHY (FLOATING CARD DESIGN) ---------------- */}
      <section className="story-section bg-parallax-container relative w-full h-[85vh] md:h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden px-4 md:px-12">

        {/* Massive Parallax Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/restaurant/01.webp" // You can swap this to a wide atmosphere/ambience shot if preferred
            alt="Masara Experience"
            fill
            className="object-cover scale-[1.15] bg-parallax"
          />
          {/* Dark gradient overlay so the light card pops */}
          <div className="absolute inset-0 bg-[#3D081A]/40" />
        </div>

        {/* The Floating Cinematic Card */}
        <div className="relative z-10 w-full max-w-5xl bg-[#F5E9D5]/95 backdrop-blur-sm border border-[#D4AF37]/20 p-10 md:p-16 lg:p-24 shadow-[0_30px_60px_rgba(0,0,0,0.4)] fade-up flex flex-col items-center text-center rounded-sm">

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-8 text-[#3D081A]">
            More than <span className="italic font-light text-[#D4AF37]">a meal.</span>
          </h2>

          <h3 className="font-sans text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#3D081A] mb-8">
            "We do not just serve food; we craft memories."
          </h3>

          <div className="w-16 h-[1px] bg-[#D4AF37] mb-8" />

          <p className="font-sans text-sm md:text-lg font-light leading-relaxed text-[#3D081A]/80 max-w-3xl">
            Masara is an approach to hospitality that transcends the plate. Located in the heart of Bangalore, it is the obsessive attention to detail, the rhythm of the room, and the perfect balance of spices working in absolute harmony.
          </p>

        </div>
      </section>

      {/* ---------------- SECTION 4: THE CLOSING CTA ---------------- */}
      <section className="story-section relative w-full pt-20 pb-32 flex flex-col items-center justify-center text-center px-6">
        <div className="w-[1px] h-20 bg-[#D4AF37] mb-10 fade-up" />

        <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#3D081A] mb-10 fade-up">
          The story continues <span className="italic font-light text-[#D4AF37]">at your table.</span>
        </h3>

        <Link
          href="https://wa.me/917204111845"
          target="_blank"
          className="fade-up group relative inline-flex items-center gap-4 px-10 py-4 overflow-hidden border-[1.5px] border-[#3D081A] text-[#3D081A] hover:border-[#D4AF37]"
        >
          <div className="absolute inset-0 bg-[#3D081A] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />

          <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] font-sans font-bold group-hover:text-[#F5E9D5] transition-colors duration-500">
            Reserve Your Experience
          </span>
          <ArrowRight className="relative z-10 w-4 h-4 group-hover:text-[#F5E9D5] group-hover:translate-x-1 transition-all duration-300" />
        </Link>
      </section>

    </div>
  );
}