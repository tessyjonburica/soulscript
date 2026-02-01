"use client";

import { motion } from "framer-motion";
import { PenLine, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
    {
        title: "Copywriting Services",
        description: "Strategic sales pages, landing pages, and direct-response campaigns that turn visitors into loyal customers.",
        icon: PenLine,
        linkText: "INQUIRE FOR COPY",
    },
    {
        title: "Content Writing Services",
        description: "Thought leadership, blog articles, and long-form content that establishes authority and drives organic growth.",
        icon: FileText,
        linkText: "INQUIRE FOR CONTENT",
    },
];

export function Services() {
    return (
        <section className="py-32 bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white max-w-5xl mx-auto leading-[1.1]">
                        Whether It&apos;s Conversion Led Copy or Clear Content, We&apos;ve Got You Covered
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 lg:gap-32 max-w-6xl mx-auto mb-24">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                            className="group"
                        >
                            <div className="mb-12">
                                <service.icon className="text-[#C1A06E] w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-serif text-white mb-8 group-hover:text-[#C1A06E] transition-colors duration-300">
                                {service.title}
                            </h3>
                            <p className="text-white/40 text-lg leading-relaxed mb-10 font-light tracking-wide">
                                {service.description}
                            </p>
                            <button className="text-[#C1A06E] text-[10px] font-bold tracking-[0.3em] border-b border-[#C1A06E]/30 pb-1 hover:border-[#C1A06E] transition-all duration-300">
                                {service.linkText}
                            </button>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center"
                >
                    <Button variant="outline" className="rounded-none border-[#C1A06E]/30 text-[#C1A06E] hover:bg-[#C1A06E] hover:text-black transition-all px-10 py-7 text-[10px] font-bold tracking-[0.3em] uppercase">
                        BOOK A DISCOVERY CALL
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
