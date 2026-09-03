import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Masara Fine Dine.",
};

export default function TermsOfService() {
  return (
    <div className="w-full bg-[#F5E9D5] text-[#3D081A] pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl mb-12">Terms of Service</h1>
        
        <div className="prose prose-burgundy max-w-none font-sans font-light text-[#3D081A]/80 space-y-6">
          <p className="font-medium text-[#3D081A]">Last Updated: September 2026</p>
          
          <h2 className="font-serif text-2xl text-[#3D081A] mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing our website and utilizing our reservation services, you agree to be bound by these Terms of Service. 
            If you disagree with any part of the terms, you may not access the service.
          </p>

          <h2 className="font-serif text-2xl text-[#3D081A] mt-8 mb-4">2. Reservations and Cancellations</h2>
          <p>
            Reservations are subject to availability. By making a reservation via our WhatsApp integration, you agree to provide 
            accurate and current information. We kindly ask that you notify us of any cancellations or modifications to your 
            reservation at least 24 hours in advance. Masara Fine Dine reserves the right to refuse service or cancel reservations 
            at our discretion.
          </p>

          <h2 className="font-serif text-2xl text-[#3D081A] mt-8 mb-4">3. Intellectual Property</h2>
          <p>
            The Service and its original content (including text, images, logos, and design elements), features, and functionality 
            are and will remain the exclusive property of Masara Fine Dine and its licensors. The Service is protected by copyright, 
            trademark, and other laws of India and foreign countries. Our trademarks and trade dress may not be used in connection 
            with any product or service without the prior written consent of Masara Fine Dine.
          </p>

          <h2 className="font-serif text-2xl text-[#3D081A] mt-8 mb-4">4. Dietary Requirements and Allergies</h2>
          <p>
            While we take the utmost care to accommodate dietary requirements and allergies, we cannot guarantee that our dishes 
            are completely free from allergens due to the nature of our kitchen environment. Please inform our staff of any severe 
            allergies prior to ordering.
          </p>

          <h2 className="font-serif text-2xl text-[#3D081A] mt-8 mb-4">5. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of Karnataka, India, without regard to its 
            conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver 
            of those rights.
          </p>
        </div>
      </div>
    </div>
  );
}
