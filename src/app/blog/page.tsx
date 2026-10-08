import { getPosts } from "@/lib/blog-actions";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "Blog Inmobiliario | Consejos, Guías y Mercado",
    description: "Encuentra la mejor información sobre el mercado inmobiliario, consejos para comprar y vender, y guías de inversión.",
};

export default async function BlogPage() {
    const allPosts = await getPosts();
    const posts = allPosts.filter(p => p.published);

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Blog Inmobiliario</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">Mantente al día con las últimas noticias, guías y consejos del mercado inmobiliario en Colombia.</p>
                </div>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => {
                            const date = new Date(post.date).toLocaleDateString("es-CO", { year: 'numeric', month: 'long', day: 'numeric' });
                            return (
                                <Link href={`/blog/${post.slug}`} key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow group flex flex-col">
                                    <div className="relative h-56 w-full overflow-hidden">
                                        {post.coverImage ? (
                                            <Image unoptimized src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">Sin Imagen</div>
                                        )}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            {post.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-xs text-gray-400 mb-3 flex items-center gap-2 font-medium">
                                            <span>{date}</span> • <span>{post.author}</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">{post.title}</h2>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">{post.excerpt}</p>
                                        <div className="mt-auto font-bold text-sm text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Leer artículo completo <span aria-hidden="true">&rarr;</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-gray-500">Aún no hay artículos publicados.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
