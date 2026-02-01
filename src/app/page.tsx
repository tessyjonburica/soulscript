import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Approach } from "@/components/sections/Approach";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505]">
      <Navbar />
      <Hero />
      <TrustedBy />
      <About />
      <Approach />
      <Services />
      <WhyChooseUs />
      <ContactForm />
      <Footer />
    </main>
  );
}
