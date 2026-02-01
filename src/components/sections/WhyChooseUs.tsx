"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function WhyChooseUs() {
    return (
        <section className="py-32 bg-[#050505] overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-32 max-w-7xl mx-auto">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-10">
                            Why Choose Us
                        </h2>
                        <p className="text-white/40 text-lg leading-relaxed font-light tracking-wide max-w-md">
                            We don&apos;t just write, we deliver results. Our approach is rooted in data but polished with artistic finesse. Every project we take on is treated as a partnership, ensuring your goals become our benchmarks.
                        </p>
                    </motion.div>

                    {/* Right Column - Testimonials */}
                    <div className="space-y-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <Quote className="text-[#C1A06E] w-10 h-10 mb-6 opacity-60" fill="currentColor" />
                            <blockquote className="mb-8">
                                <p className="text-2xl md:text-3xl font-serif text-white italic leading-snug">
                                    &quot;Soul Script redefined our brand voice. Our conversion rate increased by 40% within three months of the new copy going live.&quot;
                                </p>
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <span className="text-[#C1A06E] text-[10px] font-bold tracking-[0.3em] uppercase">
                                    JULIAN REED • CMO, VANTAGE
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <Quote className="text-[#C1A06E] w-10 h-10 mb-6 opacity-60" fill="currentColor" />
                            <blockquote className="mb-8">
                                <p className="text-2xl md:text-3xl font-serif text-white italic leading-snug">
                                    &quot;The quality of human insight they bring is incomparable. It&apos;s rare to find an agency that truly &apos;gets&apos; the vision.&quot;
                                </p>
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <span className="text-[#C1A06E] text-[10px] font-bold tracking-[0.3em] uppercase">
                                    SARAH CHEN • FOUNDER, LUMOS
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
