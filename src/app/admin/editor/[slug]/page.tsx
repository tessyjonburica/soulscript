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
    const [uploading, setUploading] = useState(false);

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

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('blog-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
            return null;
        } finally {
            setUploading(false);
        }
    };



    const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        const file = e.target.files[0];
        const url = await handleImageUpload(file);
        if (url) {
            setCoverImage(url);
        }
    };

    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const url = await handleImageUpload(file);
                if (url && editor) {
                    editor.chain().focus().setImage({ src: url }).run();
                }
            }
        };
        input.click();
    };

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
                        disabled={saving || uploading}
                        className="bg-[#C1A06E] text-black hover:bg-white text-xs font-bold tracking-[0.2em] px-6 rounded-none min-w-[120px]"
                    >
                        {saving ? <Loader2 className="animate-spin" size={16} /> : "SAVE CHANGES"}
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
                    <div className="flex gap-4 items-start">
                        <div className="flex-1 space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block">Cover Image</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Image URL..."
                                    value={coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                    className="flex-1 bg-white/5 border border-white/10 text-sm text-white px-4 py-2 focus:border-[#C1A06E] focus:outline-none placeholder-white/20"
                                />
                                <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-3 py-2 flex items-center justify-center transition-colors">
                                    <input type="file" className="hidden" accept="image/*" onChange={handleCoverImageUpload} />
                                    <ImageIcon size={18} />
                                </label>
                            </div>
                            {uploading && <p className="text-[10px] text-[#C1A06E] animate-pulse">Uploading...</p>}
                        </div>

                        <div className="flex-1 space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block">Slug (Optional)</label>
                            <input
                                type="text"
                                placeholder="custom-slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 text-sm text-white px-4 py-2 focus:border-[#C1A06E] focus:outline-none placeholder-white/20"
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 text-sm text-white px-4 py-2 focus:border-[#C1A06E] focus:outline-none placeholder-white/20 uppercase tracking-widest"
                            >
                                <option value="General">General</option>
                                <option value="Content Strategy">Content Strategy</option>
                                <option value="Conversion Copywriting">Conversion Copywriting</option>
                                <option value="SEO Writing">SEO Writing</option>
                                <option value="Brand Voice">Brand Voice</option>
                            </select>
                        </div>
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
                        title="Upload Image"
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
