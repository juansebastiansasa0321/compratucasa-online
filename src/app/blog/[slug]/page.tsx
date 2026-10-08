import { getPostBySlug, getPosts } from "@/lib/blog-actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: "Post no encontrado" };

    return {
        title: `${post.title} | Blog Inmobiliario`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const date = new Date(post.date).toLocaleDateString("es-CO", { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 pb-20">
            {/* Header / Hero */}
            <div className="relative h-[40vh] min-h-[400px] w-full bg-gray-900 flex items-center overflow-hidden">
                {post.coverImage && (
                    <Image unoptimized src={post.coverImage} alt={post.title} fill className="object-cover opacity-40 brightness-75" priority />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full pt-20">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al Blog
                    </Link>
                    
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {post.tags.map(tag => (
                            <span key={tag} className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>
                    
                    <div className="flex items-center gap-4 text-gray-300 text-sm">
                        <span className="font-bold text-white">{post.author}</span>
                        <span>•</span>
                        <span>{date}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 bg-white dark:bg-gray-900">
                <div className="prose prose-lg dark:prose-invert prose-emerald max-w-none">
                    {post.content.split('\n\n').map((paragraph, idx) => {
                        const trimmed = paragraph.trim();
                        if (!trimmed) return null;

                        // Markdown Image Match
                        if (trimmed.startsWith('![')) {
                            const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
                            if (match) {
                                const altText = match[1];
                                const imgUrl = match[2];
                                return (
                                    <figure key={idx} className="my-10 sm:my-14 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xl bg-gray-50 dark:bg-gray-800">
                                        <div className="relative w-full overflow-hidden" style={{ minHeight: '300px' }}>
                                            <img src={imgUrl} alt={altText || 'Imagen del blog'} className="w-full h-auto object-cover max-h-[70vh]" />
                                        </div>
                                        {altText && altText !== "Imagen del blog" && (
                                            <figcaption className="text-center text-sm text-gray-500 py-3 font-medium bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                                                {altText}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            }
                        }

                        if (trimmed.startsWith('### ')) {
                            return <h3 key={idx} className="text-xl md:text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{trimmed.replace('### ', '')}</h3>
                        }
                        if (trimmed.startsWith('## ')) {
                            return <h2 key={idx} className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-gray-900 dark:text-white">{trimmed.replace('## ', '')}</h2>
                        }
                        return <p key={idx} className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-[17px]">{trimmed}</p>
                    })}
                </div>
                
                <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <p className="font-bold text-gray-900 dark:text-white">Escrito por {post.author}</p>
                    <Link href="/contacto" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors">
                        Solicitar Asesoría
                    </Link>
                </div>
            </div>
        </main>
    )
}
