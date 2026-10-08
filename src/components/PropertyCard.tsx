import Image from "next/image";
import Link from "next/link";
import { Property } from "@/data/properties";

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Link href={`/propiedad/${property.id}`} className="block bg-white dark:bg-gray-800 rounded-2xl md:rounded-[28px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-gray-100/50 dark:border-gray-700 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 group flex flex-col scale-100 hover:scale-[1.01]">
            <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden">
            {property.heroImage ? (
                <Image unoptimized src={property.heroImage} alt={property.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-400 font-semibold tracking-wide uppercase">Sin imagen</div>
            )}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
                <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded shadow-md uppercase tracking-wide">
                    {property.status || "En Venta"}
                </div>
                {property.propertyType && (
                    <div className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded shadow-sm border border-gray-100">
                        {property.propertyType}
                    </div>
                )}
            </div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-grow">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 text-gray-900 dark:text-white line-clamp-1">{property.title}</h3>
            <p className="text-gray-500/80 dark:text-gray-400 font-medium text-sm mb-5 truncate flex items-center gap-1.5 tracking-wide uppercase">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                {property.city ? `${property.location}, ${property.city}` : property.location}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                    🛏️ {property.bedrooms || 0} Hab
                </span>
                <span className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                    🛁 {property.bathrooms || 0} Baños
                </span>
                {property.builtArea && (
                    <span className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                        📐 {property.builtArea}m²
                    </span>
                )}
            </div>

            <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-100 dark:border-gray-800/50">
                <span className="text-gray-900 dark:text-white font-black text-xl sm:text-2xl tracking-tighter">{property.price}</span>
                <span className="text-xs sm:text-sm px-5 py-3 sm:py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-full group-hover:bg-emerald-600 group-hover:dark:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_8px_20px_rgb(52,211,153,0.3)] transition-all duration-300">
                    Ver Detalles
                </span>
            </div>
            </div>
        </Link>
    );
}
