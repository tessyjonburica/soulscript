import Link from "next/link";

const footerLinks = {
    company: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "#about" },
        { name: "Blog", href: "#blog" },
    ],
    services: [
        { name: "Content Strategy", href: "#" },
        { name: "Copywriting", href: "#" },
        { name: "Social Media", href: "#" },
    ],
    support: [
        { name: "Email", href: "mailto:hello@soulscript.com" },
        { name: "Instagram", href: "#" },
    ]
};

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
                                <span className="text-black font-bold text-xl">S</span>
                            </div>
                            <span className="text-white font-serif text-xl tracking-tight uppercase">Soul Script</span>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                            Scale your content output without losing your brand voice.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-serif mb-8 uppercase text-[10px] tracking-[0.4em]">Company</h4>
                        <ul className="space-y-5">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/20 hover:text-primary text-[9px] uppercase tracking-[0.3em] font-bold transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-serif mb-8 uppercase text-[10px] tracking-[0.4em]">What We Do</h4>
                        <ul className="space-y-5">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/20 hover:text-primary text-[9px] uppercase tracking-[0.3em] font-bold transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-serif mb-8 uppercase text-[10px] tracking-[0.4em]">Say Hello</h4>
                        <ul className="space-y-5">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/20 hover:text-primary text-[9px] uppercase tracking-[0.3em] font-bold transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5">
                    <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-0">
                        © {new Date().getFullYear()} Soul Script. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">Privacy Policy</p>
                        <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">Terms of Service</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
