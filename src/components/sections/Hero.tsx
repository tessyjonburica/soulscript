"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 blur-[100px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="text-primary uppercase tracking-[0.4em] text-[10px] font-bold">Soul Script</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[1.1] tracking-tight"
        >
          Scale your content output <br /> 
          <span className="text-primary italic">without losing your brand voice.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-white/60 text-lg md:text-base max-w-xl mx-auto mb-12 leading-relaxed tracking-wide opacity-80"
        >
          We craft conversion-driven copy and content for startups and creative brands ready to grow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="primary" size="lg" className="rounded-none uppercase tracking-[0.2em] text-[10px] font-bold px-10">
            Book a Strategy Call
          </Button>
        </motion.div>

        {/* Secondary Nav Links (Trusted By / Menu) */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="mt-32 border-t border-white/5 pt-8"
        >
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-4">
             {["PORTFOLIO", "ABOUT", "APPROACH", "BLOG", "ELITE"].map((link) => (
                <Link key={link} href={`#${link.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors">
                  {link}
                </Link>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
