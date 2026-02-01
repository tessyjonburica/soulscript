"use client";

import { motion } from "framer-motion";

export function TrustedBy() {
  return (
    <section className="py-32 bg-[#050505] text-center border-t border-white/5">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="container mx-auto px-6"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-16 block font-medium">TRUSTED BY GROWING BRANDS</span>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
          {["VANTAGE", "LUMOS", "AETHERIA", "NOVA", "ELITE"].map((brand) => (
            <span key={brand} className="text-xl md:text-2xl font-serif tracking-[0.1em] text-white/40 hover:text-white transition-all duration-500 cursor-default">
              {brand}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
