"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
    return (
        <section id="about" className="py-24 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Image Placeholder - Left */}
                    <div className="relative h-[600px] bg-white/5 w-full overflow-hidden grayscale opacity-80">
                        {/* Placeholder for the office image */}
                        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                            <span className="text-white/20 uppercase tracking-widest text-xs">Office Image</span>
                        </div>
                    </div>

                    {/* Content - Right */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif text-white mb-8"
                        >
                            Get To Know Us
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6 text-white/70 text-lg font-light leading-relaxed"
                        >
                            <p>
                                We&apos;re a global content collective of writers, strategists, and storytellers who believe that brand voice is the most valuable asset in the digital age. We don&apos;t believe in generic templates or AI-generated fluff.
                            </p>
                            <p>
                                Our promise is simple: We deliver content that sounds like you, but better. If you don&apos;t like what you get, you don&apos;t have to pay. That&apos;s the Soul Script guarantee.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
