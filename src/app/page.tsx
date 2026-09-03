import { Hero } from "@/components/sections/Hero";
import { IntroAndChef } from "@/components/sections/Introduction"; // Assuming this is your file name
import { Chef } from "@/components/sections/Chef";
import { FloatingChef } from "@/components/sections/FloatingChef";
import { Food } from "@/components/sections/Food";
import { Ambience } from "@/components/sections/Ambience";
import { Reservation } from "@/components/sections/Reservation";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      {/* CRITICAL: Removed the empty intro-trigger div. It was breaking GSAP's scroll math! */}
      <IntroAndChef />
      <Chef />
      <FloatingChef />
      <Food />
      <Ambience />
      <Reservation/>
    </div>
  );
}