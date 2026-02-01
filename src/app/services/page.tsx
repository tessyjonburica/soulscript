"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Plus } from "lucide-react";

const services = [
    {
        title: "Social Media Copywriting",
        description: "Engagement-focused micro-copy that stops the scroll and starts conversations on LinkedIn, Instagram, and Twitter.",
        bullets: [
            "30-day content calendars",
            "Platform-specific tone optimization",
            "High-conversion CTA strategies"
        ]
    },
    {
        title: "Ad Copywriting",
        description: "Direct-response copy for Meta, Google, and LinkedIn ads designed to lower your CAC and boost ROAS.",
        bullets: [
            "A/B variant testing scripts",
            "Psychology-driven hook development",
            "Multi-channel campaign alignment"
        ]
    },
    {
        title: "Product Description Writing",
        description: "Turning features into benefits with evocative language that compels your customers to click 'Add to Cart'.",
        bullets: [
            "Brand-aligned voice integration",
            "Technical specification translation",
            "SEO-optimized keywords"
        ]
    },
    {
        title: "Pitch Deck Copywriting",
        description: "Strategic narratives for founders looking to raise capital. We distill your vision into a winning investment story.",
        bullets: [
            "12-15 slide narrative structure",
            "Value proposition sharpening",
            "Investor-ready executive summaries"
        ]
    },
    {
        title: "Website Copywriting",
        description: "The foundation of your digital presence. We build websites that don't just look pretty, but actually sell.",
        bullets: [
            "Homepage & About page storytelling",
            "Service/Product page optimization",
            "User journey flow mapping"
        ]
    },
    {
        title: "SEO Writing",
        description: "Thought leadership and blog content that ranks on Page 1 while maintaining your sophisticated brand voice.",
        bullets: [
            "Keyword research & clustering",
            "Long-form authority articles",
            "On-page metadata optimization"
        ]
    },
    {
        title: "Whitepaper Copywriting",
        description: "Deep-dive technical reports and industry insights that establish your brand as a leading authority.",
        bullets: [
            "Data-driven research synthesis",
            "Subject matter expert interviews",
            "Lead-magnet design coordination"
        ]
    },
    {
        title: "Scriptwriting",
        description: "Compelling scripts for brand films, YouTube channels, and podcast intros that hold attention until the end.",
        bullets: [
            "Visual-to-audio pacing guides",
            "Storyboarding support",
            "Natural-dialogue refinement"
        ]
    }
];

export default function ServicesPage() {
    return (
        <main className="flex min-h-screen flex-col bg-[#050505] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-48 pb-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8"
                    >
                        Our Services
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl font-serif italic text-[#C1A06E] mb-12"
                    >
                        Great products don&apos;t sell themselves, clear communication does.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-white/40 text-lg leading-relaxed max-w-2xl mx-auto font-light tracking-wide"
                    >
                        We turn complex ideas into persuasive messages that resonate with your audience and drive measurable action. Our approach combines psychological triggers with elegant storytelling.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-32">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: (idx % 2) * 0.2 }}
                            className="flex flex-col"
                        >
                            <h3 className="text-3xl md:text-4xl font-serif mb-6 text-white group-hover:text-[#C1A06E] transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-white/40 text-lg mb-10 leading-relaxed font-light">
                                {service.description}
                            </p>
                            <ul className="space-y-4">
                                {service.bullets.map((bullet) => (
                                    <li key={bullet} className="flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/60">
                                        <Plus size={14} className="text-[#C1A06E]" />
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-48 px-6 border-t border-white/5 bg-[#080808]">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl lg:text-8xl font-serif leading-[1.1] tracking-tight"
                    >
                        Your brand deserves attention. <br className="hidden md:block" />
                        <span className="relative inline-block mt-4">
                            Let&apos;s
                            <span className="text-[#C1A06E] italic ml-4">write something</span>
                            <span className="block h-[1px] w-full bg-[#C1A06E]/30 absolute -bottom-2"></span>
                        </span>
                        <span className="ml-4">that works</span>
                    </motion.h2>
                </div>
            </section>

            <Footer />
        </main>
    );
}
