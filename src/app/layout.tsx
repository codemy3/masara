import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { ReservationTicket } from "@/components/ReservationTicket";
import { ScrollToTop } from "@/components/ScrollToTop";

import { Analytics } from "@vercel/analytics/react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport = {
  themeColor: "#3D081A",
};

export const metadata: Metadata = {
  title: {
    default: "Masara Fine Dine | Bangalore",
    template: "%s | Masara Fine Dine"
  },
  description: "A premium modern Indian dining experience in Bangalore. Masara is an experience, not simply a place to eat.",
  keywords: ["fine dining", "bangalore restaurant", "modern indian food", "masara", "mohammed ashiq"],
  openGraph: {
    title: "Masara Fine Dine | Bangalore",
    description: "A premium modern Indian dining experience in Bangalore.",
    url: "https://masarafinedine.com",
    siteName: "Masara Fine Dine",
    images: [
      {
        url: "/images/restaurant/02.webp",
        width: 1200,
        height: 630,
        alt: "Masara Ambience",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Masara Fine Dine | Bangalore",
    description: "A premium modern Indian dining experience in Bangalore.",
    images: ["/images/restaurant/02.webp"],
  },
  icons: {
    icon: "/images/logo/logo-dark.webp",
    apple: "/images/logo/logo-dark.webp",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col font-sans bg-burgundy text-ivory">
        <ScrollToTop />
        <Header />
        <main className="flex-1">
          {children}  
        </main>
        <Footer />
        <ReservationTicket />
        <Analytics />
      </body>
    </html>
  );
}
