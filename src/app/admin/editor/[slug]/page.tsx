"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function EditorPage() {
    const params = useParams();
    const router = useRouter();
    const supabase = createClient();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [category, setCategory] = useState("General");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [published, setPublished] = useState(false);

    const isNew = params.slug === "new";

    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageExtension,
        ],
        content: "",
        editorProps: {
            attributes: {
                class: "prose prose-invert prose-lg max-w-none focus:outline-none min-h-[400px]",
            },
        },
    });

    useEffect(() => {
        const fetchPost = async () => {
            if (isNew) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("slug", params.slug)
                .single();

            if (data) {
                setTitle(data.title);
                setSlug(data.slug);
                setExcerpt(data.excerpt || "");
                setCoverImage(data.cover_image || "");
                setCategory(data.category || "General");
                setPublished(data.published);
                editor?.commands.setContent(data.content);
            }
            setLoading(false);
        };

        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) router.push("/admin/login");
            else fetchPost();
        };

        if (editor) checkUser();
    }, [editor, isNew, params.slug, router, supabase]);

    const handleSave = async () => {
        if (!title || !editor) return;
        setSaving(true);

        const content = editor.getHTML();
        const postData = {
            title,
            slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            excerpt,
            content,
            cover_image: coverImage,
            category,
            published,
            updated_at: new Date().toISOString(),
        };

        let error;
        if (isNew) {
            const { error: insertError } = await supabase.from("posts").insert([postData]);
            error = insertError;
        } else {
            const { error: updateError } = await supabase
                .from("posts")
                .update(postData)
                .eq("slug", params.slug);
            error = updateError;
        }

        setSaving(false);
        if (!error) {
            router.push("/admin/dashboard");
        } else {
            alert("Error saving post: " + error.message);
        }
    };

    const addImage = () => {
        const url = window.prompt("Enter image URL");
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    if (loading) return <div className="bg-[#050505] min-h-screen" />;

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Toolbar */}
            <div className="sticky top-0 z-20 bg-[#050505]/95 backdrop-blur border-b border-white/5 px-6 py-4 flex justify-between items-center">
                <Link href="/admin/dashboard" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs tracking-widest uppercase">
                    <ArrowLeft size={14} /> Back
                </Link>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 mr-6">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Status:</span>
                        <button
                            onClick={() => setPublished(!published)}
                            className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 border transition-all ${published ? "text-green-400 border-green-400/30 bg-green-400/10" : "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"}`}
                        >
                            {published ? "PUBLISHED" : "DRAFT"}
                        </button>
                    </div>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#C1A06E] text-black hover:bg-white text-xs font-bold tracking-[0.2em] px-6 rounded-none min-w-[120px]"
                    >
                        {saving ? <Loader2 className="animate-spin" size={16} /> : "SAVE POST"}
                    </Button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
                {/* Meta Fields */}
                <div className="space-y-6">
                    <input
                        type="text"
                        placeholder="Post Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent text-4xl md:text-5xl font-serif text-white placeholder-white/20 border-none focus:ring-0 px-0"
                    />
                    <input
                        type="text"
                        placeholder="Excerpt (for previews)..."
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        className="w-full bg-transparent text-lg font-light text-white/80 placeholder-white/20 border-none focus:ring-0 px-0"
                    />
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Cover Image URL..."
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 text-sm text-white px-4 py-2 focus:border-[#C1A06E] focus:outline-none placeholder-white/20"
                        />
                        <input
                            type="text"
                            placeholder="Custom Slug (optional)..."
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 text-sm text-white px-4 py-2 focus:border-[#C1A06E] focus:outline-none placeholder-white/20"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-white/5 border border-white/10 text-sm text-white px-4 py-2 focus:border-[#C1A06E] focus:outline-none placeholder-white/20 uppercase tracking-widest"
                        >
                            <option value="General">General</option>
                            <option value="Content Strategy">Content Strategy</option>
                            <option value="Conversion Copywriting">Conversion Copywriting</option>
                            <option value="SEO Writing">SEO Writing</option>
                            <option value="Brand Voice">Brand Voice</option>
                        </select>
                    </div>
                </div>

                {/* Editor Toolbar */}
                <div className="flex gap-2 border-y border-white/10 py-3 overflow-x-auto">
                    <button
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        className={`p-2 hover:bg-white/10 rounded transition-colors ${editor?.isActive('bold') ? 'text-[#C1A06E]' : 'text-white/60'}`}
                    >
                        <strong>B</strong>
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        className={`p-2 hover:bg-white/10 rounded transition-colors ${editor?.isActive('italic') ? 'text-[#C1A06E]' : 'text-white/60'}`}
                    >
                        <em>I</em>
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`p-2 hover:bg-white/10 rounded transition-colors ${editor?.isActive('heading', { level: 2 }) ? 'text-[#C1A06E]' : 'text-white/60'}`}
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`p-2 hover:bg-white/10 rounded transition-colors ${editor?.isActive('heading', { level: 3 }) ? 'text-[#C1A06E]' : 'text-white/60'}`}
                    >
                        H3
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        className={`p-2 hover:bg-white/10 rounded transition-colors ${editor?.isActive('bulletList') ? 'text-[#C1A06E]' : 'text-white/60'}`}
                    >
                        Lists
                    </button>
                    <button
                        onClick={addImage}
                        className="p-2 hover:bg-white/10 rounded transition-colors text-white/60"
                    >
                        <ImageIcon size={18} />
                    </button>
                </div>

                {/* Editor Content */}
                <EditorContent editor={editor} className="min-h-[500px]" />
            </div>
        </div>
    );
}
