import Link from "next/link";
import Image from "next/image";

const footerLinks = {
    explore: [
        { name: "HOME", href: "/" },
        { name: "ABOUT", href: "#about" },
        { name: "BLOG", href: "#blog" },
    ],
    services: [
        { name: "COPYWRITING", href: "#" },
        { name: "CONTENT", href: "#" },
        { name: "PUBLISHING", href: "#" },
    ],
    connect: [
        { name: "LINKEDIN", href: "#" },
        { name: "INSTAGRAM", href: "#" },
    ]
};

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-16 mb-24">
                    {/* Left Side: Brand Identity */}
                    <div className="max-w-xs">
                        <Link href="/" className="mb-10 block">
                            <Image
                                src="/Logo-white.png"
                                alt="Soul Script"
                                width={320}
                                height={72}
                                className="h-18 w-auto"
                            />
                        </Link>
                        <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] leading-relaxed font-bold">
                            A GLOBAL CONTENT COLLECTIVE CRAFTING NARRATIVES FOR THE NEXT GENERATION OF BRANDS.
                        </p>
                    </div>

                    {/* Right Side: Link Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
                        <div>
                            <h4 className="text-[#C1A06E] font-bold mb-8 uppercase text-[10px] tracking-[0.4em]">Explore</h4>
                            <ul className="space-y-4">
                                {footerLinks.explore.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-white/20 hover:text-white text-[9px] uppercase tracking-[0.3em] font-bold transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[#C1A06E] font-bold mb-8 uppercase text-[10px] tracking-[0.4em]">Services</h4>
                            <ul className="space-y-4">
                                {footerLinks.services.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-white/20 hover:text-white text-[9px] uppercase tracking-[0.3em] font-bold transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[#C1A06E] font-bold mb-8 uppercase text-[10px] tracking-[0.4em]">Connect</h4>
                            <ul className="space-y-4">
                                {footerLinks.connect.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-white/20 hover:text-white text-[9px] uppercase tracking-[0.3em] font-bold transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Legal */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-8">
                    <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">
                        © SOUL SCRIPT 2024
                    </p>
                    <div className="flex gap-12">
                        <Link href="#" className="text-white/20 hover:text-white text-[9px] uppercase tracking-[0.3em] font-bold transition-colors">
                            PRIVACY POLICY
                        </Link>
                        <Link href="#" className="text-white/20 hover:text-white text-[9px] uppercase tracking-[0.3em] font-bold transition-colors">
                            TERMS
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
