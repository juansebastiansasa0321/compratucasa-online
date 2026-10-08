import { Property } from "@/data/properties";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Star } from "lucide-react";

export default function FeaturedProperty({ property }: { property: Property }) {
    if (!property) return null;

    return (
        <section className="py-12 sm:py-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-amber-50 dark:bg-amber-900/30 rounded-xl text-amber-500">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-500" />
                    </div>
                    <div>
                        <span className="text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs block mb-0.5">Recomendación Exclusiva</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Propiedad Destacada</h2>
                    </div>
                </div>
                
                <Link href={`/propiedad/${property.id}`} className="relative rounded-3xl md:rounded-[36px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 group flex flex-col lg:flex-row bg-white dark:bg-gray-800 border border-gray-50 dark:border-gray-700 cursor-pointer block scale-100 hover:scale-[1.01]">
                    <div className="relative w-full lg:w-3/5 h-[350px] sm:h-[450px] lg:h-[500px] overflow-hidden">
                        <Image unoptimized src={property.heroImage} alt={property.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/10 to-transparent"></div>
                        <div className="absolute top-5 left-5 sm:top-6 sm:left-6 bg-white/95 text-gray-900 dark:bg-gray-900/95 dark:text-white text-[10px] sm:text-xs font-black px-4 py-2 rounded-full shadow-lg uppercase tracking-widest backdrop-blur-md">
                            {property.status || "Exclusivo"}
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-2/5 p-8 sm:p-10 lg:p-12 flex flex-col justify-center relative">
                        <div className="flex items-center text-gray-400 font-bold mb-3 text-[10px] sm:text-xs tracking-widest uppercase">
                            <MapPin className="w-4 h-4 mr-1.5" /> {property.city ? `${property.location}, ${property.city}` : property.location}
                        </div>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight tracking-tight">
                            {property.title}
                        </h3>
                        <p className="text-base sm:text-lg text-gray-500/90 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed font-medium">
                            {property.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-3 mb-10">
                            <span className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-full text-sm font-bold flex items-center gap-2">
                                🛏️ {property.bedrooms || 0} Hab
                            </span>
                            <span className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-full text-sm font-bold flex items-center gap-2">
                                🛁 {property.bathrooms || 0} Baños
                            </span>
                        </div>

                        <div className="mt-auto border-t border-gray-100 dark:border-gray-800/50 pt-8 flex flex-col gap-5">
                            <div>
                                <span className="block text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5">Precio de inversión</span>
                                <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{property.price}</span>
                            </div>
                            <span className="w-full px-8 py-4 sm:py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-full transition-all duration-300 shadow-xl group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-[0_8px_30px_rgb(52,211,153,0.3)] flex items-center justify-center gap-3 text-sm sm:text-base tracking-wide">
                                Descubrir Propiedad <ArrowRight className="w-5 h-5" />
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}
