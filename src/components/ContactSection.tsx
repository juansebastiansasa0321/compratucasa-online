"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";

export default function ContactSection() {
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const message = formData.get('message') as string;

        const text = `Hola, soy ${name}. Mi correo es ${email}. Mi teléfono es ${phone}.\n\nMensaje: ${message}`;
        const url = `https://wa.me/573147872392?text=${encodeURIComponent(text)}`;
        trackWhatsAppClick();
        window.open(url, '_blank');
        
        setIsSent(true);
        setTimeout(() => setIsSent(false), 5000);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <section id="contacto" className="py-16 sm:py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">¿Listo para el siguiente paso?</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Estamos aquí para ayudarte a encontrar el hogar de tus sueños o vender tu propiedad al mejor precio de mercado.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Info */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Información de Contacto</h3>
                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Teléfono / WhatsApp</h4>
                                    <a href="https://wa.me/573147872392" target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick} className="block text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">+57 314 7872392</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Correo Electrónico</h4>
                                    <a href="mailto:juansebastiansasa@gmail.com" className="block text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">juansebastiansasa@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Ubicación Estratégica</h4>
                                    <p className="text-gray-600 dark:text-gray-400">Bogotá, Chía, Cali & Jamundí</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Envíanos un mensaje</h3>
                        {isSent && (
                            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                <span className="font-medium">¡Información enviada con éxito!</span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Nombre Completo</label>
                                <input type="text" name="name" required className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Ej: Juan Pérez" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
                                    <input type="email" name="email" required className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors" placeholder="ejemplo@correo.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                                    <input type="tel" name="phone" className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors" placeholder="+57 300 000 0000" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">¿Qué buscas?</label>
                                <textarea name="message" rows={3} required className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Me interesa una propiedad..."></textarea>
                            </div>
                            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg font-bold text-lg transition-colors shadow-lg shadow-emerald-500/30">
                                <Send className="w-5 h-5" /> Enviar por WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
