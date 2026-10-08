import PropertyGallery from "@/components/PropertyGallery";
import ContactSection from "@/components/ContactSection";
import FeaturedProperty from "@/components/FeaturedProperty";
import { getProperties } from "@/lib/actions";

export const dynamic = 'force-dynamic';

export default async function Home() {
    const properties = await getProperties();

    return (
        <main className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            
            {/* Hero Section Premium */}
            <section className="relative w-full min-h-[70vh] sm:min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-gray-900">
                <div className="absolute inset-0 z-0">
                    {/* Imagen premium de villa moderna en la montaña/naturaleza */}
                    <img src="https://images.unsplash.com/photo-1613490908571-9f9b54dc1ce3?q=80&w=2070&auto=format&fit=crop" alt="Hero background" className="w-full h-full object-cover brightness-[0.7] transform scale-105 animate-[pulse_30s_ease-in-out_infinite_alternate]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-gray-900/95 mix-blend-multiply"></div>
                </div>
                
                <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12 flex-1 flex flex-col justify-center items-center">
                    <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs sm:text-sm text-emerald-300 font-medium tracking-widest uppercase">
                        Exclusividad Inmobiliaria
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-xl">
                        La Inversión Perfecta en <br className="hidden md:block" />
                        <span className="text-emerald-400">Jamundí, Chía, Cali y Bogotá</span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light drop-shadow-md">
                        Accede a lo más selecto del mercado inmobiliario. Diseños de vanguardia, confort absoluto y alta valorización a tu alcance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">
                        <a href="#catalogo" className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-semibold text-base transition-all transform hover:-translate-y-1 shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)]">
                            Explorar Catálogo
                        </a>
                        <a href="#contacto" className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold text-base transition-all transform hover:-translate-y-1">
                            Solicitar Asesoría
                        </a>
                    </div>
                </div>

                <div className="relative z-10 pb-10 flex flex-col items-center opacity-80 mt-auto hidden sm:flex">
                    <span className="text-white/60 text-[10px] mb-2 uppercase tracking-[0.2em] font-medium">Descubre Más</span>
                    <div className="w-5 h-8 border border-white/40 rounded-full flex justify-center pt-1.5">
                        <div className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </section>

            {/* Featured Property Section (SPA) */}
            {properties.find(p => p.featured) && (
                <FeaturedProperty property={properties.find(p => p.featured)!} />
            )}

            {/* Catálogo Central (SPA) */}
            <section id="catalogo" className="pt-16 pb-20 bg-gray-50 dark:bg-gray-900 relative z-20">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100 dark:border-gray-700">
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Nuestro Inventario</h2>
                        <p className="text-gray-600 dark:text-gray-400">Filtra y encuentra rápidamente las propiedades que tenemos para ti.</p>
                    </div>
                    
                    <PropertyGallery initialProperties={properties} />
                </div>
            </section>

            {/* Formulario de Contacto (SPA) */}
            <ContactSection />

            <footer className="bg-gray-900 text-white py-8 sm:py-10 md:py-12 text-center">
                <p className="mb-3 sm:mb-4 text-gray-400 text-sm sm:text-base">© 2026 Compra Tu Casa. Todos los derechos reservados.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                    <span>Términos y Condiciones</span>
                    <span>Política de Privacidad</span>
                </div>
            </footer>
        </main>
    )
}
