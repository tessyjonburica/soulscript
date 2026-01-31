import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Approach } from "@/components/sections/Approach";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505]">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Approach />
      <About />
      <ContactForm />
      <Footer />
    </main>
  );
}
