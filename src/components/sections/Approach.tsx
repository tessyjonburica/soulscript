"use client";

import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";

const approachItems = [
    { id: 1, title: "STORYTELLING", pos: "top" },
    { id: 2, title: "AUTHENTICITY", pos: "right" },
    { id: 3, title: "STRATEGY", pos: "bottom" },
    { id: 4, title: "CONVERSION", pos: "left" },
];

export function Approach() {
    return (
        <section className="py-24 px-6 bg-[#050505] overflow-hidden">
            <div className="max-w-4xl mx-auto text-center mb-32">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif text-white mb-10"
                >
                    Our Approach
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-light"
                >
                    In a world full of AI-generated noise, we believe in the power of human connection. Trust is built through authenticity. We provide 100% human-written content that resonates on a deeper level than any algorithm ever could.
                </motion.p>
            </div>

            <div className="relative max-w-2xl mx-auto aspect-square flex items-center justify-center">
                {/* Concentric Rings */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 border border-white rounded-full"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute inset-[15%] border border-white rounded-full"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="absolute inset-[30%] border border-[#C1A06E] rounded-full"
                />

                {/* Center Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="relative z-10 w-24 h-24 bg-[#1a1a1a] border border-[#C1A06E]/30 flex items-center justify-center rounded-full"
                >
                    <Wand2 className="text-[#C1A06E]" size={32} />
                </motion.div>

                {/* Approach Items */}
                {approachItems.map((item, idx) => {
                    const positions = {
                        top: "top-0 left-1/2 -translate-x-1/2 -translate-y-12",
                        right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 translate-x-12",
                        bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-12",
                        left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -translate-x-12",
                    };

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 + (idx * 0.1) }}
                            className={`absolute ${positions[item.pos as keyof typeof positions]}`}
                        >
                            <span className="text-[#C1A06E] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] whitespace-nowrap">
                                {item.title}
                            </span>
                            {/* Optional lines pointing to center could be added here if needed */}
                        </motion.div>
                    );
                })}

                {/* Connecting Lines placeholders - thin lines from center or ring to text */}
                <div className="absolute inset-0 pointer-events-none">
                    <span className="absolute top-[12%] left-1/2 w-[1px] h-[20%] bg-[#C1A06E]/20 -translate-x-1/2" />
                    <span className="absolute bottom-[12%] left-1/2 w-[1px] h-[20%] bg-[#C1A06E]/20 -translate-x-1/2" />
                    <span className="absolute left-[12%] top-1/2 w-[20%] h-[1px] bg-[#C1A06E]/20 -translate-y-1/2" />
                    <span className="absolute right-[12%] top-1/2 w-[20%] h-[1px] bg-[#C1A06E]/20 -translate-y-1/2" />
                </div>

            </div>
        </section>
    );
}
