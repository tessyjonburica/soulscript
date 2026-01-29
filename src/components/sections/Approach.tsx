"use client";

import { motion } from "framer-motion";
import { PenTool, Target, Zap, Waves } from "lucide-react";

const approachItems = [
    { id: 1, title: "AUDIT THE VOID", icon: Zap, pos: "top" },
    { id: 2, title: "PLAN AND WRITE", icon: PenTool, pos: "right" },
    { id: 3, title: "A/B TEST", icon: Target, pos: "bottom" },
    { id: 4, title: "PLAN AND PUBLISH", icon: Waves, pos: "left" },
];

export function Approach() {
    return (
        <section className="py-24 px-6 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif text-white mb-8"
                >
                    Our Approach
                </motion.h2>
                <p className="text-white/40 max-w-3xl mx-auto text-[10px] uppercase tracking-[0.4em] leading-relaxed">
                    An unmatched powerhouse, with refined elegance at every turn. You can call it Soul Script, and it&apos;s the premium content output you&apos;ve ever dreamt of.
                </p>
            </div>

            <div className="relative max-w-xl mx-auto aspect-square flex items-center justify-center">
                {/* Animated Rings */}
                <div className="absolute inset-0 border border-white/5 rounded-full" />
                <div className="absolute inset-[15%] border border-white/5 rounded-full" />
                <div className="absolute inset-[30%] border border-primary/20 rounded-full animate-pulse" />

                {/* Center Icon */}
                <div className="relative z-10 w-20 h-20 bg-primary flex items-center justify-center rounded-full rotate-45 transform">
                    <PenTool className="-rotate-45 text-black" size={32} />
                </div>

                {/* Approach Items */}
                {approachItems.map((item, idx) => {
                    const positions = {
                        top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                        right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
                        bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                        left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    };

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className={`absolute ${positions[item.pos as keyof typeof positions]} flex flex-col items-center gap-6`}
                        >
                            <div className="w-14 h-14 bg-zinc-900 border border-white/5 flex items-center justify-center rounded-full text-primary/40">
                                <item.icon size={24} strokeWidth={1} />
                            </div>
                            <span className="text-white/40 text-[9px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">{item.title}</span>
                        </motion.div>
                    );
                })}

                {/* Connecting Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full -z-0 pointer-events-none opacity-20">
                    <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                    <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                </svg>
            </div>
        </section>
    );
}
