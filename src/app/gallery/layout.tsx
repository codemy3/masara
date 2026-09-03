import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Masara Fine Dine | The Exhibition",
  description:
    "A visual journey through Masara. Explore our culinary craft, atmosphere, and the intricate details that make the Masara experience.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
