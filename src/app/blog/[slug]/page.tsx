"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function BlogPostPage() {
    const params = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("slug", params.slug)
                .single();

            if (data) setPost(data);
            setLoading(false);
        };
        if (params.slug) fetchPost();
    }, [params.slug]);

    if (loading) return <div className="min-h-screen bg-[#050505]" />;
    if (!post) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">Post not found</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navbar />

            <main className="pt-32 pb-24">
                <article className="max-w-4xl mx-auto px-6">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-[#C1A06E] text-[10px] font-bold tracking-[0.3em] uppercase mb-8 hover:text-white transition-colors">
                            <ArrowLeft size={14} /> Back to Journal
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
                            {post.title}
                        </h1>
                        <div className="flex justify-center items-center gap-6 text-white/40 text-xs tracking-widest uppercase">
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>Research</span>
                        </div>
                    </div>

                    {/* Cover Image */}
                    {post.cover_image && (
                        <div className="relative aspect-video w-full overflow-hidden mb-16">
                            <Image
                                src={post.cover_image}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-white prose-p:text-white/80 prose-p:font-light prose-p:leading-relaxed prose-a:text-[#C1A06E] prose-blockquote:border-l-[#C1A06E] prose-blockquote:text-white/90 prose-blockquote:italic"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </main>

            <Footer />
        </div>
    );
}
