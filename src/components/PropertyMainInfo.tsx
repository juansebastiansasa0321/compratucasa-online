"use client";

import { Property, iconMap, PropertyFeature } from "@/data/properties";
import PropertyDetails from "./PropertyDetails";
import Link from "next/link";
import { MapPin, Share2, Heart, Phone, Mail, MessageCircle, Calendar } from "lucide-react";
import { Button } from "./ui/Button";
import { trackWhatsAppClick } from "@/lib/tracking";

interface PropertyMainInfoProps {
    property: Property;
}

export default function PropertyMainInfo({ property }: PropertyMainInfoProps) {
    const agentName = property.agentName || "Sebastian";
    const rawPhone = property.agentPhone || "3147872392";
    const agentPhoneClean = rawPhone.replace(/\D/g, '');

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: property.title,
                text: `Mira esta propiedad: ${property.title}`,
                url: window.location.href,
            });
        } else {
            alert("Enlace copiado al portapapeles");
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 min-h-screen">
            <div className="container mx-auto px-4 lg:px-8 max-w-[1600px]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

                    {/* Columna Principal (2/3) - Order 1 en móvil */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8 order-2 lg:order-1">

                        {/* Header Info */}
                        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3 sm:gap-0">
                                <div className="flex-1">
                                    <span className="inline-block bg-emerald-100 text-emerald-700 font-bold px-2 sm:px-3 py-1 rounded-full text-xs mb-2">
                                        EN VENTA
                                    </span>
                                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">{property.title}</h1>
                                    <div className="flex items-center text-gray-500 text-xs sm:text-sm md:text-base">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                        {property.location}
                                    </div>
                                </div>
                                <div className="flex gap-2 self-start">
                                    <button onClick={handleShare} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition" title="Compartir">
                                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition" title="Guardar">
                                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-4 sm:mb-6">
                                {property.price}
                                <span className="text-xs sm:text-sm font-normal text-gray-400 ml-2">COP</span>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 border-t border-b border-gray-100 dark:border-gray-700 py-4 sm:py-6 my-4 sm:my-6">
                                {property.features.slice(0, 6).map((feat, idx) => {
                                    const Icon = iconMap[feat.iconName] || iconMap.Ruler;
                                    return (
                                        <div key={idx} className="flex flex-col items-center text-center">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mb-1 sm:mb-2" />
                                            <span className="text-xs font-semibold">{feat.label}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Descripción</h3>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {property.description}
                                </p>
                            </div>
                        </div>

                        {/* Detalles de la Propiedad (Estilo Fincaraíz) */}
                        <PropertyDetails property={property} />

                        {/* Características Detalladas */}
                        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Características Generales</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-y-4 sm:gap-x-8">
                                {property.features.map((feat, idx) => {
                                    const Icon = iconMap[feat.iconName] || iconMap.Ruler;
                                    return (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-lg text-emerald-600 shrink-0">
                                                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-xs sm:text-sm">{feat.label}</p>
                                                <p className="text-xs text-gray-500">{feat.desc}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Mapa */}
                        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Ubicación</h3>
                            <div className="w-full h-[250px] sm:h-[300px] bg-gray-200 dark:bg-gray-700 rounded-lg sm:rounded-xl overflow-hidden relative flex items-center justify-center">
                                {property.mapUrl ? (
                                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: property.mapUrl }} /> // Renderizar iframe
                                ) : (
                                    <>
                                        <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                                        <span className="absolute bottom-4 text-xs text-gray-500 font-mono">Mapa no configurado</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>



                    {/* Sidebar Sticky (1/3) - Order 1 en móvil para aparecer primero */}
                    <div className="relative order-1 lg:order-2">
                        <div className="lg:sticky lg:top-4 space-y-4 sm:space-y-6">

                            {/* Contact Card */}
                            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-full overflow-hidden shrink-0">
                                        {/* Placeholder agente */}
                                        <img src="https://i.pravatar.cc/150?img=33" alt="Agente" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-base sm:text-lg">{agentName}</p>
                                        <p className="text-xs text-emerald-600 font-semibold">Vendedor Verificado</p>
                                    </div>
                                </div>


                                <form
                                    className="mt-4 sm:mt-6 space-y-3 sm:space-y-4"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.currentTarget);
                                        const name = formData.get('name') as string;
                                        const phone = formData.get('phone') as string;
                                        const message = formData.get('message') as string;

                                        const text = `Hola, soy ${name}. Mi teléfono es ${phone}. ${message}`;
                                        const url = `https://wa.me/57${agentPhoneClean}?text=${encodeURIComponent(text)}`;
                                        trackWhatsAppClick();
                                        window.open(url, '_blank');
                                    }}
                                >
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tu Nombre</label>
                                        <input name="name" type="text" required className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 outline-none focus:border-emerald-500 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tu Teléfono</label>
                                        <input name="phone" type="tel" required className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 outline-none focus:border-emerald-500 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mensaje</label>
                                        <textarea name="message" rows={3} className="w-full p-2 sm:p-3 text-sm sm:text-base bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 outline-none focus:border-emerald-500 transition" defaultValue={`Hola, estoy interesado en ${property.title}...`}></textarea>
                                    </div>
                                    <Button type="submit" className="w-full h-11 sm:h-12 font-bold text-sm sm:text-base">Enviar Mensaje por WhatsApp</Button>
                                </form>
                            </div>

                            <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-start gap-2 sm:gap-3">
                                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-emerald-800 dark:text-emerald-400 text-xs sm:text-sm">¿Quieres visitar?</h4>
                                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">Agenda una visita presencial o virtual con nosotros.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
}
