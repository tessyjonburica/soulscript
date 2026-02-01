"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SERVICES", href: "/services" },
    { name: "PUBLISHING SERVICES", href: "/publishing-services" },
    { name: "BLOG", href: "/blog" },
    { name: "ABOUT", href: "#about" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                scrolled ? "bg-[#050505]/60 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/Logo-white.png"
                        alt="Soul Script"
                        width={280}
                        height={64}
                        className="h-16 w-auto"
                        priority
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[9px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-[0.4em]"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:block">
                    <Button variant="outline" size="sm" className="rounded-none border-white/10 text-white hover:border-primary text-[9px] tracking-[0.3em] uppercase px-6 font-bold">
                        BOOK A DISCOVERY CALL
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-white/70 hover:text-primary text-sm uppercase tracking-widest"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button variant="primary" className="w-full uppercase text-[10px] tracking-widest bg-primary text-black hover:bg-white transition-colors">
                                Book a Discovery Call
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
