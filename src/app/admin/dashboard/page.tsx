"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, LogOut } from "lucide-react";
import Image from "next/image";

interface Post {
    id: string;
    title: string;
    slug: string;
    category: string;
    published: boolean;
    created_at: string;
}

export default function AdminDashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/admin/login");
            } else {
                fetchPosts();
            }
        };
        checkUser();
    }, [router, supabase.auth]);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            const { error } = await supabase.from("posts").delete().eq("id", id);
            if (error) throw error;
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex justify-center items-center">
                <p className="text-white/60 text-xs tracking-[0.2em] animate-pulse">LOADING STUDIO...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Header */}
            <header className="border-b border-white/5 py-6 px-6 md:px-12 sticky top-0 bg-[#050505]/90 backdrop-blur-md z-10">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Image
                                src="/Logo-white.png"
                                alt="Soul Script Press"
                                width={160}
                                height={40}
                                className="h-10 w-auto opacity-90"
                            />
                        </Link>
                        <span className="text-white/20 text-xl font-light">|</span>
                        <span className="text-white/60 text-xs tracking-[0.2em] font-bold">STUDIO</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/blog" target="_blank" className="text-xs text-white/40 hover:text-white transition-colors tracking-widest hidden md:block">
                            VIEW LIVE BLOG
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-white/40 hover:text-white transition-colors"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">Dashboard</h1>
                        <p className="text-white/40 text-sm font-light">Manage your content and legacy.</p>
                    </div>
                    <Link href="/admin/editor/new">
                        <Button className="bg-[#C1A06E] text-black hover:bg-white text-xs font-bold tracking-[0.2em] px-6 py-6 rounded-none transition-all duration-300">
                            <Plus size={16} className="mr-2" /> NEW POST
                        </Button>
                    </Link>
                </div>

                {/* Posts List */}
                <div className="space-y-4">
                    {posts.length === 0 ? (
                        <div className="text-center py-24 border border-white/5 border-dashed rounded-lg">
                            <p className="text-white/40 text-sm font-light mb-6">No stories told yet.</p>
                            <Link href="/admin/editor/new">
                                <span className="text-[#C1A06E] text-xs font-bold tracking-[0.2em] border-b border-[#C1A06E]/30 pb-1 hover:border-[#C1A06E] transition-all cursor-pointer">
                                    START WRITING
                                </span>
                            </Link>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div
                                key={post.id}
                                className="group flex flex-col md:flex-row md:items-center justify-between p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
                            >
                                <div className="mb-4 md:mb-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`w-2 h-2 rounded-full ${post.published ? 'bg-green-500/50' : 'bg-yellow-500/50'}`}></span>
                                        <span className="text-[9px] text-white/40 tracking-[0.2em] uppercase">
                                            {post.published ? 'PUBLISHED' : 'DRAFT'}
                                        </span>
                                        <span className="text-white/20">•</span>
                                        <span className="text-[9px] text-white/40 tracking-widest uppercase">
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-serif text-white/90 group-hover:text-[#C1A06E] transition-colors duration-300">
                                        {post.title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Link href={`/admin/editor/${post.slug}`}>
                                        <Button variant="ghost" size="sm" className="text-white/40 hover:text-white hover:bg-white/10">
                                            <Edit2 size={16} />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white/40 hover:text-red-400 hover:bg-red-400/10"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
