"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-12 px-6 overflow-hidden bg-[#050505]">
      {/* Background radial gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40 blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="text-[#C1A06E] uppercase tracking-[0.4em] text-[10px] font-bold">Soul Script</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 leading-[1.05] tracking-tight"
        >
          Scale your content output <br />
          <span className="text-[#C1A06E] italic font-light">without losing your brand<br className="hidden md:block" /> voice.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed tracking-wide font-light"
        >
          We craft conversion-driven copy and content for startups and creative
          brands ready to grow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="outline" size="lg" className="rounded-none border-[#C1A06E] text-[#C1A06E] hover:bg-[#C1A06E] hover:text-black uppercase tracking-[0.2em] text-[11px] font-bold px-12 py-6">
            BOOK A DISCOVERY CALL
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
