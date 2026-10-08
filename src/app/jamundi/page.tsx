import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { getProperties } from "@/lib/actions";
import { iconMap } from "@/data/properties";

export const metadata = {
    title: "Casa en Venta en Jamundí - Hontanar de las Mercedes | CompraTuCasa",
    description: "Descubre espectaculares casas campestres en venta en el exclusivo sector Hontanar de las Mercedes, Jamundí. La mejor inversión inmobiliaria cerca a Cali con amplios espacios y naturaleza.",
    keywords: [
        "casa en venta jamundi", 
        "Hontanar de las Mercedes Jamundi", 
        "casas en hontanar de las mercedes",
        "venta de casas en jamundí", 
        "comprar casa campestre jamundi", 
        "casas exclusivas en jamundi",
        "condominio hontanar de las mercedes"
    ],
    openGraph: {
        title: "Casas en Venta en Hontanar de las Mercedes, Jamundí",
        description: "Vive rodeado de naturaleza con alta valorización. Conoce nuestras propiedades exclusivas en Hontanar de las Mercedes.",
        type: "website",
    },
    alternates: {
        canonical: "https://compratucasa.co/jamundi",
    }
};

export default async function JamundiLanding() {
    const properties = await getProperties();
    // Buscar propiedad de Jamundí o usar la primera como fallback
    const property = properties.find(p => p.location.toLowerCase().includes("jamundi") || p.location.toLowerCase().includes("jamundí")) || properties[0];

    if (!property) return <div>No hay propiedades disponibles.</div>;

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
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
                    <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 backdrop-blur-sm">
                        OPORTUNIDAD EXCLUSIVA: {property.price}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
                        Tu Nueva Vida en <br />
                        <span className="text-emerald-400">Jamundí</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                        {property.title}. <br className="hidden sm:block" />
                        <span className="hidden sm:inline">Donde la naturaleza se encuentra con el diseño moderno.</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Link
                            href={`/propiedad/${property.id}`}
                            className="px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full text-base sm:text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            Ver Galería de Fotos <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Información Detallada */}
            <section className="py-16 sm:py-20 md:py-28 bg-gray-50/80">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12 sm:mb-16 md:mb-20">
                        <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 block">Detalles Exclusivos</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Sobre esta Propiedad</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
                            {property.description}
                        </p>
                    </div>

                    {/* Grid de Características Principales */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                        {property.features.map((feature, idx) => {
                            const Icon = iconMap[feature.iconName] || CheckCircle2;
                            return (
                                <div key={idx} className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center group">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                                        <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-2">{feature.label}</h3>
                                    <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">{feature.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Galería Destacada Landing */}
            <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Espacios Diseñados para Ti</h2>
                        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
                            Cada rincón de esta propiedad ha sido pensado para tu confort y el de tu familia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
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
                                <div key={i} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                                    <div className="relative h-48 sm:h-56 md:h-64">
                                        <Image src={img} alt={`Detalle ${i}`} fill className="object-cover group-hover:scale-105 transition-transform" />
                                    </div>
                                    <div className="p-6 sm:p-8">
                                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">{titles[i]}</h3>
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{descriptions[i]}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-16 sm:py-20 md:py-24 bg-gray-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">¿Listo para cambiar tu vida?</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
                        Tenemos una propiedad exclusiva esperando por ti. No dejes pasar esta oportunidad única de vivir como mereces.
                    </p>
                    <Link
                        href={`/propiedad/${property.id}`}
                        className="inline-flex px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 hover:bg-emerald-500 hover:text-white font-bold rounded-full text-base sm:text-lg md:text-xl transition-all items-center gap-2 sm:gap-3"
                    >
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6" /> <span className="hidden sm:inline">Conocer la Casa Disponible en Jamundí</span><span className="sm:hidden">Ver Casa en Jamundí</span>
                    </Link>
                </div>
            </section>
        </main>
    );
}
