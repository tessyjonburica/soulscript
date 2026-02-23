"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Edit2, Trash2 } from "lucide-react";
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
            StarterKit.configure({
                heading: {
                    levels: [2, 3],
                },
            }),
            ImageExtension,
        ],
        content: "",
        editorProps: {
            attributes: {
                class: "prose prose-invert prose-lg max-w-none focus:outline-none min-h-[500px] pb-32",
            },
            handlePaste: (view, event) => {
                // Future enhancement: custom paste logic if needed
                return false;
            }
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

    const handleSave = async (shouldPublish?: boolean) => {
        if (!title || !editor) return;
        setSaving(true);

        const content = editor.getHTML();
        const finalPublished = typeof shouldPublish === 'boolean' ? shouldPublish : published;

        const generatedSlug = slug || title.toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");

        const postData = {
            title,
            slug: generatedSlug,
            excerpt,
            content,
            cover_image: coverImage,
            category,
            published: finalPublished,
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
            setPublished(finalPublished);
            if (isNew || generatedSlug !== params.slug) {
                router.push(`/admin/editor/${generatedSlug}`);
            } else {
                alert(shouldPublish ? "Post published successfully!" : "Changes saved successfully!");
            }
        } else {
            alert("Error saving post: " + error.message);
        }
    };

    if (loading) return (
        <div className="bg-[#050505] min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-[#C1A06E]" size={32} />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Header / Toolbar */}
            <div className="sticky top-0 z-30 bg-[#050505]/95 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/dashboard" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
                            <ArrowLeft size={14} /> Back
                        </Link>
                        <div className="flex items-center gap-3 border-l border-white/10 pl-6 h-6">
                            <span className={`w-2 h-2 rounded-full ${published ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                            <span className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">
                                {published ? 'LIVE ON SITE' : 'DRAFT MODE'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {!published ? (
                            <>
                                <button
                                    onClick={() => handleSave(false)}
                                    disabled={saving || uploading}
                                    className="text-[10px] font-bold tracking-[0.2em] text-white/60 hover:text-white transition-colors p-3 uppercase border border-white/5 bg-white/5"
                                >
                                    SAVE DRAFT
                                </button>
                                <Button
                                    onClick={() => handleSave(true)}
                                    disabled={saving || uploading}
                                    className="bg-[#C1A06E] text-black hover:bg-white text-[10px] font-bold tracking-[0.2em] px-8 py-6 rounded-none min-w-[140px] uppercase h-auto"
                                >
                                    {saving ? <Loader2 className="animate-spin" size={16} /> : "PUBLISH NOW"}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href={`/blog/${slug}`} target="_blank" className="text-[10px] font-bold tracking-[0.2em] text-white/40 hover:text-[#C1A06E] transition-colors p-3 uppercase mr-2">
                                    VIEW LIVE POST
                                </Link>
                                <Button
                                    onClick={() => handleSave()}
                                    disabled={saving || uploading}
                                    className="bg-transparent border border-[#C1A06E]/30 text-[#C1A06E] hover:bg-[#C1A06E] hover:text-black text-[10px] font-bold tracking-[0.2em] px-8 py-6 rounded-none min-w-[140px] uppercase h-auto"
                                >
                                    {saving ? <Loader2 className="animate-spin" size={16} /> : "UPDATE POST"}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Meta & Cover Section */}
                <div className="mb-16 space-y-12">
                    {/* Cover Image Preview/Upload */}
                    <div className="relative group">
                        <div className={`relative aspect-[21/9] w-full overflow-hidden bg-white/[0.02] border border-dashed border-white/10 transition-all ${!coverImage ? 'hover:border-[#C1A06E]/30' : ''}`}>
                            {coverImage ? (
                                <>
                                    <Image src={coverImage} alt="Cover Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <label className="cursor-pointer bg-black/60 border border-white/20 p-3 hover:bg-[#C1A06E] hover:text-black transition-all">
                                            <input type="file" className="hidden" accept="image/*" onChange={handleCoverImageUpload} />
                                            <Edit2 size={16} />
                                        </label>
                                        <button
                                            onClick={() => setCoverImage("")}
                                            className="bg-black/60 border border-white/20 p-3 hover:bg-red-500/80 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                                    <input type="file" className="hidden" accept="image/*" onChange={handleCoverImageUpload} />
                                    <ImageIcon size={32} className="text-white/10 mb-4" />
                                    <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">
                                        {uploading ? 'UPLOADING...' : 'UPLOAD COVER IMAGE'}
                                    </span>
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="ARTICLE TITLE..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-transparent text-5xl md:text-7xl font-serif text-white placeholder-white/5 border-none focus:ring-0 p-0 leading-tight"
                        />
                        <textarea
                            placeholder="Write a compelling excerpt for the blog preview..."
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className="w-full bg-transparent text-xl font-light text-white/40 placeholder-white/5 border-none focus:ring-0 p-0 leading-relaxed resize-none h-24"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                        <div className="space-y-3">
                            <label className="text-[9px] font-bold tracking-[0.3em] text-[#C1A06E] uppercase">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/5 text-white text-xs font-bold tracking-widest px-6 py-4 focus:border-[#C1A06E] focus:outline-none appearance-none cursor-pointer uppercase"
                            >
                                <option value="General">General</option>
                                <option value="Content Strategy">Content Strategy</option>
                                <option value="Conversion Copywriting">Conversion Copywriting</option>
                                <option value="SEO Writing">SEO Writing</option>
                                <option value="Brand Voice">Brand Voice</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[9px] font-bold tracking-[0.3em] text-[#C1A06E] uppercase">Custom Slug (Optional)</label>
                            <input
                                type="text"
                                placeholder="the-art-of-legacy"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/5 text-white text-xs font-light px-6 py-4 focus:border-[#C1A06E] focus:outline-none placeholder-white/10"
                            />
                        </div>
                    </div>
                </div>

                {/* Editor Surface */}
                <div className="space-y-8">
                    {/* Floating/Sticky Editor Toolbar */}
                    <div className="sticky top-24 z-20 flex flex-wrap gap-1 bg-[#1a1a1a]/80 backdrop-blur border border-white/10 p-2 max-w-fit mx-auto shadow-2xl">
                        <ToolbarButton
                            active={editor?.isActive('bold')}
                            onClick={() => editor?.chain().focus().toggleBold().run()}
                            icon={<span className="font-bold">B</span>}
                        />
                        <ToolbarButton
                            active={editor?.isActive('italic')}
                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                            icon={<span className="italic px-1">I</span>}
                        />
                        <ToolbarButton
                            active={editor?.isActive('heading', { level: 2 })}
                            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                            icon={<span className="text-xs font-bold">H2</span>}
                        />
                        <ToolbarButton
                            active={editor?.isActive('heading', { level: 3 })}
                            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                            icon={<span className="text-xs font-bold">H3</span>}
                        />
                        <ToolbarButton
                            active={editor?.isActive('bulletList')}
                            onClick={() => editor?.chain().focus().toggleBulletList().run()}
                            icon={<span className="text-xs">LIST</span>}
                        />
                        <ToolbarButton
                            active={editor?.isActive('blockquote')}
                            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                            icon={<span className="text-xs">QUOTE</span>}
                        />
                        <div className="w-[1px] h-6 bg-white/10 mx-2 self-center" />
                        <ToolbarButton
                            onClick={addImage}
                            icon={<ImageIcon size={16} />}
                        />
                    </div>

                    <div className="relative">
                        {!editor?.getText() && (
                            <div className="absolute top-0 left-0 text-white/5 text-xl font-light pointer-events-none select-none">
                                Start telling your story...
                            </div>
                        )}
                        <EditorContent editor={editor} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ToolbarButton({ active, onClick, icon }: { active?: boolean, onClick: () => void, icon: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={`min-w-[40px] h-10 flex items-center justify-center p-2 transition-all hover:bg-white/5 ${active ? 'text-[#C1A06E] bg-white/5' : 'text-white/40'}`}
        >
            {icon}
        </button>
    );
}
