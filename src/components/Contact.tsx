"use client";

import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "./ui/Button";

export default function Contact() {
    const handleWhatsApp = () => {
        // Replace with actual number
        window.open("https://wa.me/573000000000?text=Hola,%20estoy%20interesado%20en%20la%20casa...", "_blank");
    };

    return (
        <section id="contacto" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-8 bg-emerald-600 text-white">
                            <h3 className="text-2xl font-bold mb-6">Contáctanos</h3>
                            <p className="mb-8 text-emerald-100">
                                ¿Te interesa esta propiedad? Escríbenos para agendar una visita o recibir más información.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Phone className="w-5 h-5 text-emerald-200" />
                                    <span>+57 300 000 0000</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Mail className="w-5 h-5 text-emerald-200" />
                                    <span>contacto@casacali.com</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <MapPin className="w-5 h-5 text-emerald-200" />
                                    <span>Cali / Jamundí, Valle del Cauca</span>
                                </div>
                            </div>

                            <div className="mt-12">
                                <Button
                                    onClick={handleWhatsApp}
                                    className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-bold"
                                >
                                    Chat en WhatsApp
                                </Button>
                            </div>
                        </div>

                        <div className="p-8">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                        placeholder="Tu nombre completo"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">Mensaje</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                        placeholder="Hola, me gustaría saber el precio..."
                                    ></textarea>
                                </div>
                                <Button className="w-full" type="submit">
                                    Enviar Mensaje <Send className="ml-2 w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
