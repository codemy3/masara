"use client";

import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Typography";
import { FadeIn } from "@/components/motion/FadeIn";
import { TextReveal } from "@/components/motion/TextReveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Ambience() {
  return (
    <Section className="bg-burgundy-900 py-0 overflow-hidden" fullWidth containerClass="px-0 md:px-0">
      <div className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center">
        
        {/* Full Bleed Image with Slow Reveal */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-burgundy-900/60 z-10 pointer-events-none" />
          <ImageReveal
            src="/images/restaurant/02.webp"
            alt="Masara Ambience"
            direction="up"
            duration={2}
            className="w-full h-full"
            imageClassName="opacity-60"
          />
        </div>

        {/* Cinematic Text Overlay */}
        <div className="relative z-20 container mx-auto px-4 md:px-8 flex flex-col items-center text-center pointer-events-none">
          <FadeIn direction="down" delay={0.6} duration={1}>
            <div className="w-px h-16 md:h-24 bg-champagne mb-8 mx-auto opacity-50 origin-top" />
          </FadeIn>
          
          <Heading level={2} className="text-4xl md:text-6xl lg:text-7xl leading-[1.2] tracking-wide text-ivory max-w-4xl mx-auto uppercase flex flex-col items-center">
            <TextReveal delay={0.8} stagger={0.1}>
              Come for the food.
            </TextReveal>
            <span className="italic text-champagne lowercase font-light block mt-4">
              <TextReveal delay={1.4} stagger={0.1}>
                Stay for the experience.
              </TextReveal>
            </span>
          </Heading>

          <FadeIn direction="up" delay={2} duration={1}>
            <div className="w-px h-16 md:h-24 bg-champagne mt-8 mx-auto opacity-50 origin-bottom" />
          </FadeIn>
          
          <FadeIn direction="up" delay={2.2} duration={1}>
            <Link href="/gallery" className="pointer-events-auto group inline-flex items-center gap-4 mt-8 text-sm font-sans uppercase tracking-widest text-ivory hover:text-champagne transition-colors">
              <span className="border-b border-ivory/50 pb-1 group-hover:border-champagne/50">View the Gallery</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </FadeIn>
        </div>
        
      </div>
    </Section>
  );
}
