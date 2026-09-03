import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Masara Fine Dine | The Story Behind The Table",
  description:
    "Discover the story behind Masara. From Mohammed Ashiq's self-taught journey from Mangalore to MasterChef India, to an uncompromising philosophy of flavor and hospitality in Bangalore.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
