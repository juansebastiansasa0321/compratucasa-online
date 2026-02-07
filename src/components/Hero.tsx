"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
    title: string;
    subtitle: string;
    backgroundImage: string;
}

export default function Hero({ title, subtitle, backgroundImage }: HeroProps) {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url("${backgroundImage}")` }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8 max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-200"
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                >
                    <a
                        href="#contacto"
                        className="group flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-lg font-bold text-white transition-all hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                    >
                        Agendar Visita
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                        href="#detalles"
                        className="flex items-center justify-center rounded-full border-2 border-white px-8 py-3 text-lg font-bold text-white transition-all hover:bg-white/10"
                    >
                        Ver Detalles
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce"
            >
                <span className="text-sm font-medium text-white/80">Desliza para ver más</span>
            </motion.div>
        </section>
    );
}
