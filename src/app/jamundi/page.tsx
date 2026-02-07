import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { getProperties } from "@/lib/actions";

export const metadata = {
    title: "Vivir en Jamundí | La Mejor Zona de Desarrollo",
    description: "Descubre por qué Jamundí es el lugar ideal para invertir en tu futuro hogar. Naturaleza, valorización y tranquilidad.",
};

export default async function JamundiLanding() {
    const properties = await getProperties();
    // Buscar propiedad de Jamundí o usar la primera como fallback
    const property = properties.find(p => p.location.toLowerCase().includes("jamundi") || p.location.toLowerCase().includes("jamundí")) || properties[0];

    if (!property) return <div>No hay propiedades disponibles.</div>;

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover brightness-50"
                        poster={property.heroImage || "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=2070"}
                    >
                        <source src="/videocasa1_optimized.mp4" type="video/mp4" />
                        Tu navegador no soporta videos HTML5.
                    </video>
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                    <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                        OPORTUNIDAD EXCLUSIVA: {property.price}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Tu Nueva Vida en <br />
                        <span className="text-emerald-400">Jamundí</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {property.title}. <br />
                        Donde la naturaleza se encuentra con el diseño moderno.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/?id=${property.id}`}
                            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            Ver Galería Completa <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Información Detallada */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">Detalles Exclusivos</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">Sobre esta Propiedad</h2>
                        <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                            {property.description}
                        </p>
                    </div>

                    {/* Grid de Características Principales */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {property.features.map((feature, idx) => (
                            <div key={idx} className="bg-gray-50 p-6 rounded-2xl text-center hover:bg-emerald-50 transition-colors border border-gray-100">
                                <div className="font-bold text-2xl text-gray-900 mb-1">{feature.label}</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wide">{feature.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Galería Destacada Landing */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Espacios Diseñados para Ti</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Cada rincón de esta propiedad ha sido pensado para tu confort y el de tu familia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Usamos las primeras 3 imágenes de la galería real, o fallbacks si no hay suficientes */}
                        {[0, 1, 2].map((i) => {
                            const img = property.images[i] || property.heroImage;
                            // Títulos genéricos para las destacados, o podrías agregar lógica para detectar habitaciones si tuvieras metadata de fotos
                            const titles = ["Espacios Amplios", "Acabados Modernos", "Entorno Natural"];
                            const descriptions = [
                                "Salas y comedores iluminados naturalmente.",
                                "Cocina y baños con los mejores materiales.",
                                "Vive rodeado de verde y aire puro."
                            ];

                            return (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                                    <div className="relative h-64">
                                        <Image src={img} alt={`Detalle ${i}`} fill className="object-cover group-hover:scale-105 transition-transform" />
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-xl font-bold mb-3 text-gray-900">{titles[i]}</h3>
                                        <p className="text-gray-600 leading-relaxed">{descriptions[i]}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-gray-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-8">¿Listo para cambiar tu vida?</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Tenemos una propiedad exclusiva esperando por ti. No dejes pasar esta oportunidad única de vivir como mereces.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex px-10 py-5 bg-white text-gray-900 hover:bg-emerald-500 hover:text-white font-bold rounded-full text-xl transition-all items-center gap-3"
                    >
                        <MapPin className="w-6 h-6" /> Conocer la Casa Disponible en Jamundí
                    </Link>
                </div>
            </section>
        </main>
    );
}
