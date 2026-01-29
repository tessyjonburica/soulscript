"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Soul Script transformed our brand&apos;s voice. Our conversion rate increased by 20% within three months of the new copy going live.",
        author: "2Rhyme",
        role: "CEO, Startup X",
    },
    {
        quote: "The quality of the mirror content they delivered was unparalleled. It was as if they read our minds and truly &apos;got&apos; our vision.",
        author: "John Smith",
        role: "Marketing Director, Brand Y",
    },
];

export function WhyChooseUs() {
    return (
        <section id="why-us" className="py-24 px-6 bg-[#050505]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
                        Why Choose Us
                    </h2>
                    <p className="text-white/40 text-lg leading-relaxed max-w-lg mb-12 opacity-80">
                        We don&apos;t just write; we deliver results. Our approach is rooted in data and psychological triggers that drive action. Every word, every colon, every comma is chosen with intent.
                    </p>
                    <div className="flex gap-2">
                        <div className="w-16 h-[2px] bg-primary" />
                        <div className="w-4 h-[2px] bg-white/10" />
                        <div className="w-4 h-[2px] bg-white/10" />
                    </div>
                </motion.div>

                <div className="space-y-16">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={t.author}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative"
                        >
                            <Quote className="text-primary opacity-20 mb-6" size={24} />
                            <p className="text-white font-serif text-xl md:text-2xl leading-relaxed mb-8">
                                &quot;{t.quote}&quot;
                            </p>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em]">{t.author}</h4>
                                <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
