import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Masara Fine Dine.",
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-[#F5E9D5] text-[#3D081A] pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl mb-12">Privacy Policy</h1>
        
        <div className="prose prose-burgundy max-w-none font-sans font-light text-[#3D081A]/80 space-y-6">
          <p className="font-medium text-[#3D081A]">Last Updated: September 2026</p>
          
          <h2 className="font-serif text-2xl text-[#3D081A] mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to Masara Fine Dine. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
          </p>

          <h2 className="font-serif text-2xl text-[#3D081A] mt-8 mb-4">2. The Data We Collect About You</h2>
          <p>
            When you visit our website, we may collect certain information automatically, including your IP address, 
            browser type, and operating system. We also use analytics tools (such as Vercel Analytics) to understand 
            how visitors interact with our website to improve the user experience. 
          </p>
          <p>
            For reservations, we direct you to WhatsApp. Any personal data shared via WhatsApp (such as your name, 
            phone number, and reservation details) is governed by WhatsApp's privacy policy and is used by us solely 
            for the purpose of managing your reservation and communicating with you regarding your dining experience.
          </p>

          <h2 className="font-serif text-2xl text-[#3D081A] mt-8 mb-4">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data 
            in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling a reservation).</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2 className="font-serif text-2xl text-[#3D081A] mt-8 mb-4">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
            used or accessed in an unauthorised way, altered or disclosed. We do not store sensitive payment information 
            on our servers.
          </p>

          <h2 className="font-serif text-2xl text-[#3D081A] mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
            <br /><br />
            <strong>Masara Fine Dine</strong><br />
            No 7M -406 1st Floor 7th Main, 80 Feet, Hennur Main road<br />
            1st block, Banaswadi, Bengaluru, Karnataka 560043<br />
            Email: masara.blr@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
