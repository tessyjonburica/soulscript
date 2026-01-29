"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, PenTool, Layout } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: PenTool,
        title: "Copywriting Services",
        description: "Strategic sales pages, landing pages, and email sequences that convert browsers into loyal customers.",
        link: "#",
        linkText: "LEARN MORE ABOUT COPY",
    },
    {
        icon: Layout,
        title: "Content Writing Services",
        description: "Thought-leadership, blog articles, and white papers that establish your brand as an authority in your niche.",
        link: "#",
        linkText: "LEARN MORE ABOUT CONTENT",
    },
];

export function Services() {
    return (
        <section id="services" className="py-24 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center lg:text-left"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                        Whether It&apos;s Conversion Led Copy or <br className="hidden lg:block" /> Clear Content, We&apos;ve Got You Covered
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="group"
                        >
                            <div className="w-12 h-12 border border-white/10 flex items-center justify-center rounded-sm mb-8 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                                <service.icon size={20} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-6">{service.title}</h3>
                            <p className="text-white/40 text-lg mb-8 leading-relaxed opacity-80">
                                {service.description}
                            </p>
                            <Link
                                href={service.link}
                                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-primary transition-all"
                            >
                                {service.linkText} <ArrowUpRight size={12} className="opacity-50" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 border-t border-white/5 pt-12 flex justify-center"
                >
                    <button className="text-[10px] uppercase tracking-[0.4em] text-white/20 hover:text-primary transition-colors">
                        View All Services & Portfolio
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
