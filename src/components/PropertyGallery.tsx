"use client";

import { useState, useMemo } from "react";
import { Property, COLOMBIAN_CITIES } from "@/data/properties";
import PropertyCard from "./PropertyCard";
import { Search, Filter, X } from "lucide-react";

export default function PropertyGallery({ initialProperties }: { initialProperties: Property[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [city, setCity] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [status, setStatus] = useState("");
    
    // Derived state for filtering
    const filteredProperties = useMemo(() => {
        return initialProperties.filter((p) => {
            const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  p.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCity = city ? p.city === city : true;
            const matchesType = propertyType ? p.propertyType === propertyType : true;
            const matchesStatus = status ? p.status === status : true;
            
            return matchesSearch && matchesCity && matchesType && matchesStatus;
        });
    }, [initialProperties, searchTerm, city, propertyType, status]);

    const clearFilters = () => {
        setSearchTerm("");
        setCity("");
        setPropertyType("");
        setStatus("");
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 lg:w-72 shrink-0 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 self-start md:sticky md:top-24">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                        <Filter className="w-5 h-5 text-emerald-600" />
                        Filtros
                    </h2>
                    {(searchTerm || city || propertyType || status) && (
                        <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1">
                            <X className="w-3 h-3" /> Limpiar
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-5">
                    {/* Search */}
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 sm:mb-2">Búsqueda rápida</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
                                placeholder="Nombre o zona..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-[11px] sm:top-3" />
                        </div>
                    </div>

                    {/* City */}
                    <div className="col-span-1">
                        <label className="block text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 sm:mb-2">Ciudad</label>
                        <select
                            className="w-full p-2 sm:py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer shadow-sm appearance-none"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="">Todas</option>
                            {COLOMBIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Property Type */}
                    <div className="col-span-1">
                        <label className="block text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 sm:mb-2">Inmueble</label>
                        <select
                            className="w-full p-2 sm:py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer shadow-sm appearance-none"
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                        >
                            <option value="">Cualquiera</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Casa">Casa</option>
                            <option value="Lote">Lote</option>
                            <option value="Finca">Finca</option>
                            <option value="Oficina">Oficina</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 sm:mb-2">Estado</label>
                        <select
                            className="w-full p-2 sm:py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer shadow-sm appearance-none"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Todos los estados</option>
                            <option value="Nuevo">Nuevo</option>
                            <option value="Usado">Usado</option>
                            <option value="Sobre planos">Sobre planos</option>
                        </select>
                    </div>
                </div>
            </aside>

            {/* Gallery Grid */}
            <div className="flex-1">
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Mostrando <span className="text-gray-900 dark:text-white font-bold">{filteredProperties.length}</span> resultados
                    </p>
                </div>

                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                        {filteredProperties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No encontramos resultados</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-6">Prueba ajustando los filtros de búsqueda o eliminándolos para ver el inventario completo.</p>
                        <button onClick={clearFilters} className="px-6 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-full hover:bg-emerald-200 transition">
                            Limpiar todos los filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
