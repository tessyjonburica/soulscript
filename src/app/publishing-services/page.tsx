"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";

const publishingServices = [
    {
        title: "Manuscript Formatting",
        description: "Precision preparation of your text for professional review. We ensure your manuscript adheres to strict industry submission guidelines, removing technical friction between your story and the reader.",
        bullets: [
            "Standard industry styling (Chicago Manual)",
            "Front and back matter hierarchy",
            "Metadata-optimized document structure"
        ]
    },
    {
        title: "Interior Layout & Book Design",
        description: "A book is read, but it is also experienced. Our typography-first approach creates a rhythmic, effortless reading experience that honors the weight of your words.",
        bullets: [
            "Custom typographic systems & drop caps",
            "Print-ready PDF & reflowable eBook files",
            "Professional kerning and orphan management"
        ]
    },
    {
        title: "Cover Design & Branding",
        description: "Visual storytelling that commands attention on a shelf or screen. We create iconic covers that encapsulate your book's soul and speak directly to your target audience.",
        bullets: [
            "High-concept bespoke cover illustrations",
            "Full dust jacket, spine, and back copy layout",
            "Author brand style guide for marketing"
        ]
    },
    {
        title: "Illustration Management",
        description: "A hybrid approach to visual assets. We bridge the gap between traditional artistry and AI-assisted workflows to deliver stunning, cost-effective imagery.",
        bullets: [
            "Art direction and artist sourcing",
            "Ethical AI-assisted concept generation",
            "Cohesive visual narrative across chapters"
        ]
    },
    {
        title: "Publishing Setup",
        description: "We navigate the technical maze of global distribution. From ISBN acquisition to metadata optimization, we ensure your book is available everywhere readers shop.",
        bullets: [
            "KDP and IngramSpark account management",
            "Category research & keyword optimization",
            "ISBN, DOI, and LCCN registration"
        ]
    },
    {
        title: "Author Coaching",
        description: "Writing is a solitary act; publishing shouldn't be. Work 1-on-1 with experienced editors to refine your voice, overcome blocks, and build your platform.",
        bullets: [
            "Structure editing & story mapping",
            "Weekly accountability & feedback sessions",
            "Market positioning and launch strategy"
        ]
    },
    {
        title: "Children's Book Development",
        description: "A specialized service for the most discerning audience. We balance rhythmic prose with visual impact to create books that families treasure for generations.",
        bullets: [
            "Rhyme and meter technical assessment",
            "Character design and world-building",
            "Durable print format specifications"
        ]
    },
    {
        title: "Marketing Asset Creation",
        description: "Give your book the launch it deserves. We provide a full suite of digital and print assets to power your Promotions Campaigns across all platforms.",
        bullets: [
            "High-fidelity 3D book mockups",
            "Social media launch kits (IG, LI, FB)",
            "Press kit and Amazon A+ content design"
        ]
    }
];

export default function PublishingServicesPage() {
    return (
        <main className="flex min-h-screen flex-col bg-[#050505] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-48 pb-32 px-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 tracking-tight"
                    >
                        Publishing Services
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl font-serif italic text-white/60 mb-12"
                    >
                        From raw manuscript to industry-standard masterpiece.
                    </motion.h2>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-x-16 lg:gap-x-32 gap-y-32">
                    {publishingServices.map((service, idx) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: (idx % 2) * 0.1 }}
                            className="flex flex-col group"
                        >
                            <h3 className="text-3xl md:text-4xl font-serif mb-6 text-white group-hover:text-[#C1A06E] transition-colors duration-500">
                                {service.title}
                            </h3>
                            <p className="text-white/40 text-lg mb-10 leading-relaxed font-light tracking-wide max-w-lg">
                                {service.description}
                            </p>

                            <div className="space-y-6">
                                <h4 className="text-[#C1A06E] text-[10px] font-bold tracking-[0.4em] uppercase">
                                    What You Get
                                </h4>
                                <ul className="space-y-4">
                                    {service.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-start gap-4 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/60 leading-relaxed">
                                            <Plus size={14} className="text-[#C1A06E] mt-1 shrink-0" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-48 px-6 border-t border-white/5 relative overflow-hidden bg-[#080808]">
                {/* Background Book Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                    <BookOpen size={600} strokeWidth={0.5} />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-12"
                    >
                        Your story deserves a legacy. <br />
                        <span className="text-[#C1A06E] italic">Let&apos;s build it together.</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Button
                            className="rounded-none bg-[#C1A06E] text-black hover:bg-white transition-all px-12 py-7 text-[10px] font-bold tracking-[0.3em] uppercase"
                        >
                            Book a Discovery Call
                        </Button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
