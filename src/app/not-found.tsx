import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="w-full min-h-[80svh] bg-[#3D081A] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#CBA365]/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 w-24 h-24 mb-10 opacity-70">
        <Image 
          src="/images/logo/logo-dark.webp" 
          alt="Masara Crest" 
          fill 
          className="object-contain filter invert brightness-200" 
        />
      </div>

      <h1 className="font-serif text-6xl md:text-8xl text-[#F5E9D5] leading-none tracking-tighter mb-4">
        404
      </h1>
      
      <div className="w-12 h-[1px] bg-[#CBA365] my-6" />

      <h2 className="font-serif text-2xl md:text-3xl text-[#CBA365] italic font-light mb-4">
        This table is unavailable.
      </h2>

      <p className="font-sans text-sm md:text-base font-light text-[#F5E9D5]/70 max-w-md mb-10">
        The page you are looking for has been moved, removed, or never existed in our menu.
      </p>

      <Link
        href="/"
        className="group relative inline-flex items-center gap-4 px-10 py-4 overflow-hidden border-[1.5px] border-[#CBA365] text-[#CBA365] hover:text-[#3D081A]"
      >
        <div className="absolute inset-0 bg-[#CBA365] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
        
        <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] font-sans font-bold transition-colors duration-500">
          Return Home
        </span>
        <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
      </Link>
    </div>
  );
}
