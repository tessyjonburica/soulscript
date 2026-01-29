"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function GetToKnowUs() {
    return (
        <section id="about" className="py-24 px-6 bg-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-[4/3] bg-zinc-900 overflow-hidden group"
                >
                    <Image
                        src="/office_space_soulscript.png" /* This will be the generated image */
                        alt="Our Creative Space"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-20" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-10">
                        Get To Know Us
                    </h2>
                    <div className="space-y-8 text-white/60 text-lg leading-relaxed max-w-xl">
                        <p>
                            Under a goal-oriented collective of writers, strategists, and storytellers who believe that brand voice is the soul of a business. We don&apos;t just write copy; we build narratives that resonate with your audience and drive action.
                        </p>
                        <p>
                            Our mission is to help brands tell their story in a way that is authentic, impactful, and results-driven. Whether you&apos;re a startup or an established brand, we&apos;re here to help you scale your soul.
                        </p>
                    </div>
                    <div className="mt-16 w-32 h-[1px] bg-primary/40" />
                </motion.div>
            </div>
        </section>
    );
}
