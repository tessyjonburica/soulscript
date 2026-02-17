"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const categories = ["ALL POSTS", "CONTENT STRATEGY", "CONVERSION COPYWRITING", "SEO WRITING", "BRAND VOICE"];

const blogPosts = [
    {
        id: 1,
        title: "The Architecture of High-Converting Sales Pages",
        excerpt: "Deep-dive into what makes a sales page truly unstoppable: the psychology, structure, and microcopy decisions that separate amateurs from six-figure launches.",
        category: "CONVERSION COPYWRITING",
        date: "DEC 2024",
        imagePath: "/office_space_soulscript.png",
        featured: true
    },
    {
        id: 2,
        title: "Why AI Will Never Replace The Human Copywriter (But It Might Enhance It)",
        excerpt: "A nuanced take on the role of AI in modern content creation and what truly matters in brand voice.",
        category: "SEO",
        date: "NOV 2024",
        imagePath: "/office_space_soulscript.png"
    },
    {
        id: 3,
        title: "Five Subtle Approaches to Thought-Bought Verifications",
        excerpt: "The delicate art of establishing authority without sounding pretentious or salesy.",
        category: "CONTENT STRATEGY",
        date: "NOV 2024",
        imagePath: "/office_space_soulscript.png"
    },
    {
        id: 4,
        title: "Part-Gig Post-Boosts Should be Carefully Digital Wallets",
        excerpt: "Understanding the evolving landscape of digital content monetization.",
        category: "STRATEGY",
        date: "OCT 2024",
        imagePath: "/office_space_soulscript.png"
    },
    {
        id: 5,
        title: "Forcing Copy Art Wizards of Current Microcopy Delight Applications",
        excerpt: "How micro-moments in copy can drastically shift user behavior.",
        category: "BRAND VOICE",
        date: "SEPT 2024",
        imagePath: "/office_space_soulscript.png"
    },
    {
        id: 6,
        title: "Your Launch Automated Management Stack Without Freaking Out",
        excerpt: "Streamlining your content workflow without losing the human touch.",
        category: "SEO",
        date: "SEPT 2024",
        imagePath: "/office_space_soulscript.png"
    },
    {
        id: 7,
        title: "Art-Aging Genuine Messages with Current Microcopy Style Strategies",
        excerpt: "Balancing timeless messaging with contemporary design trends.",
        category: "BRAND VOICE",
        date: "AUG 2024",
        imagePath: "/office_space_soulscript.png"
    }
];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("ALL POSTS");
    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = blogPosts.filter(post => !post.featured);

    return (
        <main className="flex min-h-screen flex-col bg-[#050505] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-48 pb-24 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 tracking-tight"
                    >
                    <span className="italic text-[#C1A06E]">Blog</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white/40 text-lg mb-12 font-light max-w-2xl mx-auto"
                    >
                        Insights on creative writing, conversion copywriting, and the creator-to-brand playbook.
                    </motion.p>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-6 md:gap-12"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`text-[9px] font-bold tracking-[0.3em] uppercase transition-colors ${activeCategory === category ? "text-[#C1A06E]" : "text-white/40 hover:text-white"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="py-24 px-6 border-t border-white/10">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] bg-white/5 overflow-hidden">
                                <Image
                                    src={featuredPost.imagePath}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover grayscale opacity-80 hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <p className="text-[#C1A06E] text-[10px] font-bold tracking-[0.4em] uppercase mb-6">
                                    {featuredPost.category} · {featuredPost.date}
                                </p>
                                <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-white/40 text-lg leading-relaxed mb-10 font-light">
                                    {featuredPost.excerpt}
                                </p>
                                <button className="text-[#C1A06E] text-[10px] font-bold tracking-[0.3em] border-b border-[#C1A06E]/30 pb-1 hover:border-[#C1A06E] transition-all duration-300 uppercase">
                                    Read The Article
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Blog Grid */}
            <section className="py-24 px-6 border-t border-white/10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {regularPosts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] bg-white/5 overflow-hidden mb-6">
                                <Image
                                    src={post.imagePath}
                                    alt={post.title}
                                    fill
                                    className="object-cover grayscale opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>
                            <p className="text-[#C1A06E] text-[9px] font-bold tracking-[0.3em] uppercase mb-4">
                                {post.category} · {post.date}
                            </p>
                            <h3 className="text-2xl md:text-3xl font-serif mb-6 leading-tight group-hover:text-[#C1A06E] transition-colors">
                                {post.title}
                            </h3>
                            <button className="text-white/60 text-[9px] font-bold tracking-[0.3em] uppercase hover:text-[#C1A06E] transition-colors flex items-center gap-2">
                                READ MORE <ArrowRight size={12} />
                            </button>
                        </motion.article>
                    ))}
                </div>

                {/* Load More Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-20"
                >
                    <Button
                        variant="outline"
                        className="rounded-none border-[#C1A06E]/30 text-[#C1A06E] hover:bg-[#C1A06E] hover:text-black transition-all px-12 py-7 text-[10px] font-bold tracking-[0.3em] uppercase"
                    >
                        Load More Articles
                    </Button>
                </motion.div>
            </section>

            {/* Newsletter Section */}
            <section className="py-32 px-6 border-t border-white/10 bg-[#080808]">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight"
                    >
                        Join The Inner Circle
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white/40 text-lg mb-12 font-light max-w-xl mx-auto"
                    >
                        Curated insights delivered weekly and the insider edge on what converts. No fluff, no spam.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
                    >
                        <input
                            type="email"
                            placeholder="YOUR EMAIL"
                            className="flex-1 bg-transparent border border-white/10 px-6 py-4 text-[10px] font-bold tracking-[0.3em] uppercase text-white placeholder:text-white/30 focus:outline-none focus:border-[#C1A06E] transition-colors"
                        />
                        <Button
                            className="rounded-none bg-[#C1A06E] text-black hover:bg-white transition-all px-12 py-4 text-[10px] font-bold tracking-[0.3em] uppercase"
                        >
                            Subscribe
                        </Button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
