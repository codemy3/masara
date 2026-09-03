"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------------------------
// HERO SECTION (REFINED & ELEGANT)
// ----------------------------------------------------------------------
function ContactHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.fromTo(".contact-eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1 }, 0.2)
        .fromTo(".contact-heading-line", { clipPath: "inset(100% 0 0 0)", y: 40 }, { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.2, stagger: 0.15 }, 0.4);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[50svh] lg:min-h-[60svh] bg-[#F5E9D5] flex flex-col justify-center items-center text-center pt-32 pb-12">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Elegant Eyebrow Matching Menu/Gallery */}
        <div className="contact-eyebrow uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-sans font-medium text-[#CBA365] mb-6 flex items-center justify-center w-full">
          <span className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-[#CBA365] to-transparent mr-4" />
          <span className="text-[8px] mr-2">❖</span>
          Connect With Us
          <span className="text-[8px] ml-2">❖</span>
          <span className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-[#CBA365] to-transparent ml-4" />
        </div>
        
        <h1 className="font-serif leading-[0.9] tracking-tighter text-[#3D081A]">
          <span className="block overflow-hidden py-1">
            <span className="contact-heading-line block text-[11vw] md:text-[6vw] uppercase font-normal">
              Always at
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="contact-heading-line block text-[11vw] md:text-[7vw] italic font-light text-[#CBA365]">
              your service.
            </span>
          </span>
        </h1>
        
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// INTERACTIVE PILLARS (LIGHT THEME)
// ----------------------------------------------------------------------
const contactData = [
  {
    num: "01",
    title: "Location",
    content: (
      <>
        No 7M -406 1st Floor 7th Main,<br />
        80 Feet, Hennur Main road,<br />
        Banaswadi, Bengaluru 560043
      </>
    ),
    link: "https://maps.google.com/?q=Masara+Indian+Restaurant+Bengaluru",
    cta: "Get Directions"
  },
  {
    num: "02",
    title: "Reservations",
    content: (
      <>
        Secure your exclusive dining<br />
        experience. Call or WhatsApp<br />
        our concierge desk directly.
      </>
    ),
    link: "https://wa.me/917204111845",
    cta: "+91 72041 11845"
  },
  {
    num: "03",
    title: "Email",
    content: (
      <>
        For event collaborations, press<br />
        inquiries, and private dining<br />
        arrangements.
      </>
    ),
    link: "mailto:masara.blr@gmail.com",
    cta: "masara.blr@gmail.com"
  }
];

function ContactPillars() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pillar-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F5E9D5] pb-24">
      <div className="container mx-auto px-4 md:px-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          
          {contactData.map((item, index) => (
            <a 
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pillar-card group relative flex flex-col justify-between h-[350px] md:h-[400px] p-8 md:p-12 border border-[#3D081A]/15 overflow-hidden cursor-pointer bg-[#F5E9D5]"
            >
              {/* Hover Fill Background - Inverted for light theme */}
              <div className="absolute inset-0 bg-[#3D081A] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />

              {/* Top Content */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="font-sans text-xs tracking-widest text-[#CBA365] transition-colors duration-500 delay-100">
                  [{item.num}]
                </span>
                <div className="w-10 h-10 rounded-full border border-[#3D081A]/30 flex items-center justify-center group-hover:border-[#CBA365] group-hover:rotate-45 transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4 text-[#3D081A] group-hover:text-[#CBA365] transition-colors duration-500 delay-100" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 mt-auto">
                <h3 className="font-serif text-3xl md:text-4xl mb-6 text-[#3D081A] group-hover:text-[#F5E9D5] transition-colors duration-500 delay-100">
                  {item.title}
                </h3>
                <p className="font-sans text-sm font-light leading-relaxed text-[#3D081A]/70 group-hover:text-[#F5E9D5]/80 transition-colors duration-500 delay-100 mb-8">
                  {item.content}
                </p>
                <div className="inline-block border-b border-[#3D081A]/30 group-hover:border-[#CBA365]/60 pb-1">
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#3D081A] group-hover:text-[#CBA365] transition-colors duration-500 delay-100 font-medium">
                    {item.cta}
                  </span>
                </div>
              </div>
            </a>
          ))}

        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// FULL COLOR MAP
// ----------------------------------------------------------------------
function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power4.out", scrollTrigger: { trigger: mapRef.current, start: "top 85%" } }
      );
    }, mapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-[#F5E9D5] pb-32 px-4 md:px-10">
      <div className="container mx-auto max-w-7xl">
        <div ref={mapRef} className="relative w-full h-[50vh] md:h-[70vh] border-4 border-[#3D081A] p-2 bg-[#F5E9D5] overflow-hidden">
          {/* Grayscale and overlays completely removed */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3517.738693797831!2d77.63848767621283!3d13.021160881066358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae172d3285ad85%3A0xc6c55e249e91689!2sMasara%20Indian%20Restaurant!5e1!3m2!1sen!2sin!4v1788413944164!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// MAIN EXPORT
// ----------------------------------------------------------------------
export default function Contact() {
  return (
    <main className="flex flex-col w-full bg-[#F5E9D5]">
      <ContactHero />
      <ContactPillars />
      <ContactMap />
    </main>
  );
}