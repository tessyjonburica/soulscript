"use client";

import { motion } from "framer-motion";

export function TrustedBy() {
  return (
    <section className="py-24 bg-[#050505] text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-16 block font-medium">TRUSTED BY GROWING BRANDS</span>
          <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-10 opacity-60">
            {["VANTAGE", "LUMOS", "AETHERIA", "NOVA", "ELITE"].map((brand) => (
              <span key={brand} className="text-lg md:text-xl font-serif tracking-[0.05em] text-white hover:text-primary transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
    </section>
  );
}
