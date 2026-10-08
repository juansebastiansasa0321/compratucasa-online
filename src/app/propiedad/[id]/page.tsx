import ImageMosaic from "@/components/ImageMosaic";
import PropertyMainInfo from "@/components/PropertyMainInfo";
import { getProperties } from "@/lib/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const properties = await getProperties();
    const property = properties.find(p => p.id === id);
    if (!property) return { title: "Propiedad no encontrada" };

    const baseKeywords = [
        `${property.propertyType} en venta en ${property.city || property.location}`,
        `comprar ${property.propertyType} en ${property.location}`,
        `propiedades en ${property.city || "Colombia"}`,
    ];

    const specificKeywords = id === 'casa-principal' ? [
        "casa en venta jamundi",
        "hontanar de las mercedes",
        "sector de las mercedes en jamundi",
        "casa nueva en hontanar de las mercedes",
        "comprar casa en jamundi",
        "casa 4 baños 3 habitaciones jamundi",
        "inversión inmobiliaria jamundí"
    ] : id === 'prop-1770485270714' ? [
        "casa en venta chia",
        "condominio tejar del rio chia",
        "casas en chia cundinamarca colombia",
        "venta de casas en chia",
        "comprar casa en chia colombia",
        "casa conjunto cerrado chia",
        "inmobiliaria chia cundinamarca"
    ] : [];

    return {
        title: `${property.title} - Venta | Compra Tu Casa`,
        description: property.description.substring(0, 160),
        keywords: [...baseKeywords, ...specificKeywords],
        openGraph: {
            title: `${property.title} - Oportunidad en ${property.location}`,
            description: property.description.substring(0, 160),
            images: property.heroImage ? [{ url: property.heroImage }] : [],
            type: "website",
        }
    };
}

export default async function PropiedadPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const properties = await getProperties();
    const currentProperty = properties.find(p => p.id === id);

    if (!currentProperty) {
        notFound();
    }

    const similarProperties = properties.filter(p => p.id !== currentProperty.id);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": currentProperty.propertyType?.toLowerCase() === 'apartamento' ? "Apartment" : "SingleFamilyResidence",
        "name": currentProperty.title,
        "description": currentProperty.description,
        "url": `https://compratucasa.co/propiedad/${currentProperty.id}`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": currentProperty.city || currentProperty.location,
            "addressRegion": "Valle del Cauca",
            "addressCountry": "CO",
            "streetAddress": currentProperty.location
        },
        "numberOfRooms": currentProperty.bedrooms,
        "numberOfBathroomsTotal": currentProperty.bathrooms,
        "floorSize": {
            "@type": "QuantitativeValue",
            "value": currentProperty.builtArea,
            "unitCode": "MTK"
        }
    };

    return (
        <main className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Header top bar for returning */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-3 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center">
                    <Link href="/#catalogo" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al catálogo
                    </Link>
                </div>
            </div>

            {/* Mosaico de Imágenes Estilo Portal */}
            <ImageMosaic images={currentProperty.images} />

            {/* Información Principal y Sidebar */}
            <PropertyMainInfo property={currentProperty} />

            {/* Sección de otras propiedades (si existen) */}
            {similarProperties.length > 0 && (
                <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white border-l-4 border-emerald-500 pl-3">Propiedades Similares</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {similarProperties.slice(0, 3).map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <footer className="bg-gray-900 text-white py-8 sm:py-10 md:py-12 text-center">
                <p className="mb-3 sm:mb-4 text-gray-400 text-sm sm:text-base">© 2026 Compra Tu Casa. Todos los derechos reservados.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                    <span>Términos y Condiciones</span>
                    <span>Política de Privacidad</span>
                </div>
            </footer>
        </main>
    );
}
