"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/data/posts";
import { getPosts, savePost, deletePost } from "@/lib/blog-actions";
import { uploadImage } from "@/lib/actions";
import { Edit2, Plus, Trash2, Link as LinkIcon, Save, X, ImagePlus, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogDashboardPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
        published: true,
        tags: ["Inmobiliaria"]
    });
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadingContentImg, setIsUploadingContentImg] = useState(false);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setIsLoading(true);
        const data = await getPosts();
        setPosts(data);
        setIsLoading(false);
    };

    const handleEdit = (post: BlogPost) => {
        setCurrentPost(post);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de que quieres eliminar este artículo?")) {
            await deletePost(id);
            await loadPosts();
        }
    };

    const handleAddNew = () => {
        setCurrentPost({
            title: "",
            excerpt: "",
            content: "",
            author: "Compra Tu Casa",
            coverImage: "",
            published: true,
            tags: ["Inmobiliaria"]
        });
        setIsEditing(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await savePost(currentPost as Omit<BlogPost, 'id' | 'date' | 'slug'>, currentPost.id);
            setIsEditing(false);
            setCurrentPost({});
            await loadPosts();
            alert("Artículo guardado correctamente");
        } catch (error) {
            console.error("Error saving post:", error);
            alert("Error al guardar el artículo");
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formDataUpload = new FormData();
            formDataUpload.append("file", file);
            const url = await uploadImage(formDataUpload);
            if (url) {
                setCurrentPost({ ...currentPost, coverImage: url });
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error al subir la imagen");
        } finally {
            setIsUploading(false);
            if (e.target) e.target.value = "";
        }
    };

    const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingContentImg(true);
        try {
            const formDataUpload = new FormData();
            formDataUpload.append("file", file);
            const url = await uploadImage(formDataUpload);
            if (url) {
                const markdownImage = `\n\n![Imagen del blog](${url})\n\n`;
                setCurrentPost({ ...currentPost, content: (currentPost.content || "") + markdownImage });
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error al insertar la imagen");
        } finally {
            setIsUploadingContentImg(false);
            if (e.target) e.target.value = "";
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin del Blog</h1>
                        <p className="text-gray-500 mt-1">Gestiona los artículos y noticias de tu Inmobiliaria</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/dashboard" className="px-5 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                            Ir a Propiedades
                        </Link>
                        {!isEditing && (
                            <button onClick={handleAddNew} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/30">
                                <Plus className="w-5 h-5" /> Nuevo Artículo
                            </button>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                            <h2 className="text-2xl font-bold">{currentPost.id ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-red-500">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Título del Artículo</label>
                                        <input type="text" value={currentPost.title || ""} onChange={e => setCurrentPost({...currentPost, title: e.target.value})} required className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none" placeholder="Ej: Las mejores zonas para invertir..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Resumen (Excerpt)</label>
                                        <textarea value={currentPost.excerpt || ""} onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})} required rows={3} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none" placeholder="Un breve resumen que aparecerá en la tarjeta del blog..."></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Autor</label>
                                            <input type="text" value={currentPost.author || ""} onChange={e => setCurrentPost({...currentPost, author: e.target.value})} required className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Estado</label>
                                            <select value={currentPost.published ? "true" : "false"} onChange={e => setCurrentPost({...currentPost, published: e.target.value === "true"})} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none">
                                                <option value="true">Publicado</option>
                                                <option value="false">Borrador</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Imagen de Portada (Subir o URL)</label>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <input type="text" value={currentPost.coverImage || ""} onChange={e => setCurrentPost({...currentPost, coverImage: e.target.value})} className="flex-1 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none" placeholder="/uploads/... o https://..." />
                                            <input type="file" hidden id="coverUpload" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                                            <label htmlFor="coverUpload" className={`flex items-center justify-center gap-2 px-6 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                                <Upload className="w-4 h-4" /> {isUploading ? 'Subiendo...' : 'Subir Imagen'}
                                            </label>
                                        </div>
                                        {currentPost.coverImage && (
                                            <div className="mt-3 relative h-32 w-48 rounded-lg overflow-hidden border border-gray-200">
                                                <Image unoptimized src={currentPost.coverImage} fill className="object-cover" alt="Preview" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                                            Contenido Principal <span className="font-normal text-xs text-emerald-600 block mt-1">Tip: Usa doble salto de línea para separar párrafos. Usa "## " al inicio de un párrafo para hacer un Subtítulo.</span>
                                        </label>
                                        <div>
                                            <input type="file" hidden id="contentUpload" accept="image/*" onChange={handleContentImageUpload} disabled={isUploadingContentImg} />
                                            <label htmlFor="contentUpload" className={`flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 font-bold rounded-lg cursor-pointer hover:bg-emerald-200 transition text-xs sm:text-sm ${isUploadingContentImg ? 'opacity-50 pointer-events-none' : ''}`}>
                                                <ImagePlus className="w-4 h-4" /> {isUploadingContentImg ? 'Subiendo...' : 'Insertar Foto dentro del Texto'}
                                            </label>
                                        </div>
                                    </div>
                                    <textarea value={currentPost.content || ""} onChange={e => setCurrentPost({...currentPost, content: e.target.value})} required rows={22} className="w-full h-[500px] p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none leading-relaxed font-mono text-sm resize-none"></textarea>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700 mt-6">
                                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-800 mr-4">Cancelar</button>
                                <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 shadow-xl transition-all hover:-translate-y-1">
                                    <Save className="w-5 h-5" /> Guardar Artículo
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {isLoading ? (
                            <div className="p-12 text-center text-gray-500">Cargando artículos...</div>
                        ) : posts.length === 0 ? (
                            <div className="p-16 text-center">
                                <h3 className="text-xl font-bold mb-2">No tienes artículos publicados</h3>
                                <p className="text-gray-500">Comienza a escribir en tu blog para atraer más clientes.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                                            <th className="p-5 font-bold text-gray-500 text-sm uppercase tracking-wide">Artículo</th>
                                            <th className="p-5 font-bold text-gray-500 text-sm uppercase tracking-wide hidden md:table-cell">Fecha</th>
                                            <th className="p-5 font-bold text-gray-500 text-sm uppercase tracking-wide hidden sm:table-cell">Estado</th>
                                            <th className="p-5 font-bold text-gray-500 text-sm uppercase tracking-wide text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {posts.map(post => (
                                            <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                                <td className="p-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative w-16 h-12 rounded bg-gray-100 hidden sm:block shrink-0 overflow-hidden">
                                                            {post.coverImage && <Image unoptimized src={post.coverImage} fill className="object-cover" alt="" />}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{post.title}</p>
                                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                                <LinkIcon className="w-3 h-3" /> /blog/{post.slug}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5 text-gray-500 text-sm hidden md:table-cell">
                                                    {new Date(post.date).toLocaleDateString()}
                                                </td>
                                                <td className="p-5 hidden sm:table-cell">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${post.published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                        {post.published ? 'Publicado' : 'Borrador'}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition" title="Ver en vivo">
                                                            <LinkIcon className="w-4 h-4" />
                                                        </Link>
                                                        <button onClick={() => handleEdit(post)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Editar">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Eliminar">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
