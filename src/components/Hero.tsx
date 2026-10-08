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
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear scale-105"
                style={{ backgroundImage: `url("${backgroundImage}")` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-black/30" />
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-sm"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-10 max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-300 font-medium tracking-wide drop-shadow-sm"
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col w-full sm:w-auto space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                >
                    <a
                        href="#contacto"
                        className="group flex w-full sm:w-auto items-center justify-center rounded-full bg-emerald-600 px-10 py-4 sm:py-5 text-lg font-black text-white transition-all hover:bg-emerald-500 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(16,185,129,0.3)]"
                    >
                        Agendar Visita
                        <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                    </a>
                    <a
                        href="#detalles"
                        className="flex w-full sm:w-auto items-center justify-center rounded-full border-2 border-white/80 backdrop-blur-md px-10 py-4 sm:py-5 text-lg font-bold text-white transition-all hover:bg-white hover:text-gray-900"
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
