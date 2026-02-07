"use client";

import { Property, iconMap, PropertyFeature } from "@/data/properties";
import Link from "next/link";
import { MapPin, Share2, Heart, Phone, Mail, MessageCircle, Calendar } from "lucide-react";
import { Button } from "./ui/Button";

interface PropertyMainInfoProps {
    property: Property;
}

export default function PropertyMainInfo({ property }: PropertyMainInfoProps) {

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
        <section className="bg-gray-50 dark:bg-gray-900 py-8 min-h-screen">
            <div className="container mx-auto px-4 lg:px-8 max-w-[1600px]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Columna Principal (2/3) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Header Info */}
                        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="inline-block bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs mb-2">
                                        EN VENTA
                                    </span>
                                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">{property.title}</h1>
                                    <div className="flex items-center text-gray-500 text-sm sm:text-base">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {property.location}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={handleShare} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition" title="Compartir">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition" title="Guardar">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-emerald-600 mb-6">
                                {property.price}
                                <span className="text-sm font-normal text-gray-400 ml-2">COP</span>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 border-t border-b border-gray-100 dark:border-gray-700 py-6 my-6">
                                {property.features.slice(0, 6).map((feat, idx) => {
                                    const Icon = iconMap[feat.iconName] || iconMap.Ruler;
                                    return (
                                        <div key={idx} className="flex flex-col items-center text-center">
                                            <Icon className="w-6 h-6 text-gray-400 mb-2" />
                                            <span className="text-xs font-semibold">{feat.label}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Descripción</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {property.description}
                                </p>
                            </div>
                        </div>

                        {/* Características Detalladas */}
                        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm">
                            <h3 className="text-xl font-bold mb-6">Características Generales</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                {property.features.map((feat, idx) => {
                                    const Icon = iconMap[feat.iconName] || iconMap.Ruler;
                                    return (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-lg text-emerald-600">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{feat.label}</p>
                                                <p className="text-xs text-gray-500">{feat.desc}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Mapa */}
                        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm overflow-hidden">
                            <h3 className="text-xl font-bold mb-6">Ubicación</h3>
                            <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden relative flex items-center justify-center">
                                {property.mapUrl ? (
                                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: property.mapUrl }} /> // Renderizar iframe
                                ) : (
                                    <>
                                        <MapPin className="w-12 h-12 text-gray-400" />
                                        <span className="absolute bottom-4 text-xs text-gray-500 font-mono">Mapa no configurado</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>



                    {/* Sidebar Sticky (1/3) */}
                    <div className="relative">
                        <div className="sticky top-4 space-y-6">

                            {/* Contact Card */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden">
                                        {/* Placeholder agente */}
                                        <img src="https://i.pravatar.cc/150?img=33" alt="Agente" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Sebastian Agente</p>
                                        <p className="text-xs text-emerald-600 font-semibold">Vendedor Verificado</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <a
                                        href={`https://wa.me/573147872392?text=Hola, estoy interesado en la propiedad ${property.title}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-lg rounded-md flex items-center justify-center font-bold transition-colors"
                                    >
                                        <MessageCircle className="w-5 h-5 mr-2" /> Contactar por WhatsApp
                                    </a>
                                    <a
                                        href="tel:+573147872392"
                                        className="w-full h-12 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center font-bold transition-colors"
                                    >
                                        <Phone className="w-5 h-5 mr-2" /> Llamar Ahora
                                    </a>
                                </div>

                                <form
                                    className="mt-6 space-y-4"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.currentTarget);
                                        const name = formData.get('name') as string;
                                        const phone = formData.get('phone') as string;
                                        const message = formData.get('message') as string;

                                        const text = `Hola, soy ${name}. Mi teléfono es ${phone}. ${message}`;
                                        const url = `https://wa.me/573147872392?text=${encodeURIComponent(text)}`;
                                        window.open(url, '_blank');
                                    }}
                                >
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tu Nombre</label>
                                        <input name="name" type="text" required className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 outline-none focus:border-emerald-500 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tu Teléfono</label>
                                        <input name="phone" type="tel" required className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 outline-none focus:border-emerald-500 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mensaje</label>
                                        <textarea name="message" rows={3} className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 outline-none focus:border-emerald-500 transition" defaultValue={`Hola, estoy interesado en ${property.title}...`}></textarea>
                                    </div>
                                    <Button type="submit" className="w-full h-12 font-bold">Enviar Mensaje por WhatsApp</Button>
                                </form>
                            </div>

                            <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-xl flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-emerald-600 mt-1" />
                                <div>
                                    <h4 className="font-bold text-emerald-800 dark:text-emerald-400 text-sm">¿Quieres visitar?</h4>
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
