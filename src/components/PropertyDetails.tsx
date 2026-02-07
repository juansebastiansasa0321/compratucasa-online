"use client";

import { motion } from "framer-motion";
import { PropertyFeature, iconMap } from "@/data/properties";

interface PropertyDetailsProps {
    features: PropertyFeature[];
}

export default function PropertyDetails({ features }: PropertyDetailsProps) {
    return (
        <section id="detalles" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Detalles de la Propiedad</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Cada rincón ha sido diseñado pensando en tu comodidad y la de tu familia.
                        Acabados de lujo y espacios optimizados.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = iconMap[feature.iconName] || iconMap.Ruler;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <Icon className="w-10 h-10 text-emerald-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{feature.label}</h3>
                                <p className="text-sm text-gray-500 text-center">{feature.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
