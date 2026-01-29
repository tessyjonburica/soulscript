"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ContactForm() {
    return (
        <section id="contact" className="py-32 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
                            You&apos;re busy. Let&apos;s scale your <br /> content output.
                        </h2>
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] mb-12">
                            Book a chat or start with a free audit
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <form className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <div className="space-y-3">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 ml-1">Full Name</label>
                                    <input type="text" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-primary outline-none transition-colors" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 ml-1">Company Name</label>
                                    <input type="text" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-primary outline-none transition-colors" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 ml-1">Website</label>
                                    <input type="text" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-primary outline-none transition-colors" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 ml-1">Email</label>
                                    <input type="email" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-primary outline-none transition-colors" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 ml-1">Phone Number</label>
                                    <input type="tel" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-primary outline-none transition-colors" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 ml-1">Primary Goal of Reachout</label>
                                    <select className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-primary outline-none transition-colors appearance-none cursor-pointer">
                                        <option className="bg-black text-white">Content Strategy</option>
                                        <option className="bg-black text-white">Copywriting</option>
                                        <option className="bg-black text-white">General Inquiry</option>
                                    </select>
                                </div>
                            </div>

                            <Button variant="primary" className="py-6 px-16 uppercase tracking-[0.4em] font-bold text-[10px] mt-8 bg-primary hover:bg-primary/90 text-black rounded-none">
                                SEND
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
