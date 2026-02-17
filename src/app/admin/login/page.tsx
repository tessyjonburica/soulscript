"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/admin/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center px-6">
            <div className="w-full max-w-md space-y-8">
                <div className="flex justify-center">
                    <Image
                        src="/Logo-white.png"
                        alt="Soul Script Press"
                        width={280}
                        height={64}
                        className="h-16 w-auto opacity-90"
                    />
                </div>

                <h2 className="text-center text-2xl font-serif text-white/90">
                    Admin Access
                </h2>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-white/10 placeholder-white/40 text-white bg-white/5 focus:outline-none focus:ring-[#C1A06E] focus:border-[#C1A06E] focus:z-10 sm:text-sm tracking-wide"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-white/10 placeholder-white/40 text-white bg-white/5 focus:outline-none focus:ring-[#C1A06E] focus:border-[#C1A06E] focus:z-10 sm:text-sm tracking-wide"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-400 text-xs text-center tracking-wide">
                            {error}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-xs font-bold uppercase tracking-[0.2em] text-black bg-[#C1A06E] hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C1A06E] transition-all duration-300"
                        >
                            {loading ? "Signing in..." : "Enter Studio"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
