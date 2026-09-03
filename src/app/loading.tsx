"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] w-full h-full bg-[#F5E9D5] flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Diamond Spinner */}
        <div className="relative w-12 h-12 mb-8 flex items-center justify-center">
          <div className="absolute w-full h-full border-[1.5px] border-[#CBA365]/20 rotate-45 rounded-sm" />
          <div className="absolute w-full h-full border-[1.5px] border-[#CBA365] border-t-transparent border-r-transparent rotate-45 rounded-sm animate-spin" style={{ animationDuration: '2s' }} />
          <div className="w-2 h-2 bg-[#3D081A] rotate-45" />
        </div>

        {/* Text */}
        <span className="text-[#3D081A] text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-sans font-medium animate-pulse">
          Curating...
        </span>
      </div>
    </div>
  );
}
