"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { restaurantData } from "@/data/restaurant";
import { usePathname } from "next/navigation";

export function ReservationTicket() {
  const [isClient, setIsClient] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const pathname = usePathname();
  
  const ticketWrapperRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLButtonElement>(null);
  const textRingRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsClient(true);
    const hasSeenTicket = sessionStorage.getItem("masara_ticket_shown");

    if (hasSeenTicket) {
      setShowBadge(true);
    } else {
      const timer = setTimeout(() => {
        setShowTicket(true);
        sessionStorage.setItem("masara_ticket_shown", "true");
      }, 30000); // Wait exactly 30 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  // Animate Ticket IN
  useEffect(() => {
    if (showTicket && ticketRef.current) {
      gsap.fromTo(
        ticketRef.current,
        { opacity: 0, scale: 0.5, rotationY: -15, y: 100 },
        { opacity: 1, scale: 1, rotationY: 0, y: 0, duration: 1, ease: "back.out(1.2)" }
      );
    }
  }, [showTicket]);

  // Animate Badge Spin
  useEffect(() => {
    if (showBadge && textRingRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }
      );

      const rotation = gsap.to(textRingRef.current, {
        rotation: 360,
        duration: 14,
        repeat: -1,
        ease: "linear",
      });

      const badge = badgeRef.current;
      if (badge) {
        const onEnter = () => {
          gsap.to(badge, { scale: 1.1, duration: 0.4, ease: "back.out(1.5)" });
          rotation.timeScale(0.3);
        };
        const onLeave = () => {
          gsap.to(badge, { scale: 1, duration: 0.4, ease: "power2.out" });
          rotation.timeScale(1);
        };

        badge.addEventListener("mouseenter", onEnter);
        badge.addEventListener("mouseleave", onLeave);

        return () => {
          badge.removeEventListener("mouseenter", onEnter);
          badge.removeEventListener("mouseleave", onLeave);
          rotation.kill();
        };
      }
    }
  }, [showBadge]);

  // Morph Ticket -> Badge
  const closeTicket = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ticketRef.current || !ticketWrapperRef.current) return;
    
    gsap.to(ticketWrapperRef.current, { backgroundColor: "rgba(0,0,0,0)", backdropFilter: "blur(0px)", duration: 0.4 });
    
    gsap.to(ticketRef.current, {
      opacity: 0,
      scale: 0.1,
      x: "45vw", 
      y: "45vh", 
      duration: 0.6,
      ease: "power3.in",
      onComplete: () => {
        setShowTicket(false);
        setShowBadge(true); 
      }
    });
  };

  // Morph Badge -> Ticket
  const openTicket = () => {
    setShowBadge(false);
    setShowTicket(true);
  };

  const whatsappNumber = restaurantData?.whatsappNumber || "917204111845";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Masara, I want to secure my table reservation before spots fill up."
  )}`;

  if (!isClient) return null;
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* 1. THE GOLDEN TICKET MODAL */}
      {showTicket && (
        <div 
          ref={ticketWrapperRef}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 perspective-[1000px] bg-[#1A040B]/70 backdrop-blur-sm transition-all"
          onClick={closeTicket}
        >
          <div
            ref={ticketRef}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md pointer-events-auto will-change-transform flex flex-col items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #a67c00 0%, #bf953f 25%, #fcf6ba 50%, #b38728 75%, #aa771c 100%)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              borderRadius: "6px"
            }}
          >
            {/* Shimmer line */}
            <div className="absolute inset-0 -translate-x-[150%] animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none" />

            <div className="absolute inset-2 border-[1px] border-[#FCF6BA]/60 rounded-[4px] pointer-events-none" />
            <div className="absolute inset-3 border border-[#AA771C]/30 rounded-[2px] pointer-events-none" />

            <button 
              onClick={closeTicket}
              className="absolute top-5 right-5 text-[#3D081A] hover:text-white transition-colors z-20"
              aria-label="Close"
            >
              <X size={20} strokeWidth={2} />
            </button>

            <div className="w-full py-14 px-8 flex flex-col items-center text-center relative z-10">
              
              <div className="relative w-10 h-10 mb-4">
                <Image src="/images/logo/logo-dark.webp" alt="Masara Crest" fill className="object-contain" />
              </div>

              <span className="text-[9px] uppercase tracking-[0.4em] font-sans font-bold text-[#3D081A]/70 mb-2">
                Limited Availability
              </span>

              <h2 className="font-serif text-3xl md:text-4xl text-[#3D081A] tracking-tight mb-4">
                Reserve Your Table <br />
                <span className="italic font-light text-[#3D081A]/90">Before We Fill Up</span>
              </h2>

              <div className="w-16 h-[1px] bg-[#3D081A]/30 mb-6" />

              <p className="font-sans text-xs text-[#3D081A]/80 font-light leading-relaxed mb-8 max-w-[260px]">
                Tables for tonight&apos;s service are filling quickly. Secure your exclusive dining experience now via WhatsApp.
              </p>

              <Link
                href={whatsappUrl}
                target="_blank"
                onClick={() => setShowTicket(false)}
                className="relative inline-flex items-center gap-3 px-8 py-4 bg-[#3D081A] text-[#F5E9D5] hover:bg-black transition-colors rounded-sm shadow-xl"
              >
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold">Secure Your Table</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. THE GOLDEN FLOATING SIGNET BUTTON (With Crest in middle) */}
      {showBadge && (
        <button
          onClick={openTicket}
          ref={badgeRef}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#BF953F] via-[#D4AF37] to-[#AA771C] shadow-[0_10px_30px_rgba(191,149,63,0.4)] will-change-transform group cursor-pointer border-[1.5px] border-[#3D081A]/40"
          aria-label="Open Reservation Ticket"
        >
          {/* Rotating Text Ring */}
          <svg
            ref={textRingRef}
            className="absolute inset-0 w-full h-full text-[#3D081A] will-change-transform opacity-90 pointer-events-none"
            viewBox="0 0 100 100"
          >
            <path id="textPath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
            <text className="uppercase font-sans font-bold fill-current" style={{ fontSize: "9px", letterSpacing: "0.18em" }}>
              <textPath href="#textPath" startOffset="0%">
                Reserve Your Table • Masara • 
              </textPath>
            </text>
          </svg>

          {/* Centered Crest Logo */}
          <div className="relative w-8 h-8 md:w-10 md:h-10 z-10 pointer-events-none group-hover:scale-110 transition-transform">
            <Image src="/images/logo/logo-2.webp" alt="Masara Crest" fill className="object-contain filter invert brightness-200" />
          </div>
        </button>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(150%); }
        }
      `}} />
    </>
  );
}