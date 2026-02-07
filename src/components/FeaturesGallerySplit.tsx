"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PropertyFeature, iconMap } from "@/data/properties";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";

interface FeaturesGallerySplitProps {
    features: PropertyFeature[];
    images: string[];
}

export default function FeaturesGallerySplit({ features, images }: FeaturesGallerySplitProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Divide images into chunks for masonry effect (optional, or just simple grid)
    // For simplicity and robustness, we'll use a clean 2-column grid in the right panel.

    return (
        <section className="bg-white dark:bg-black min-h-screen">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* Left Column: Features (Sticky) */}
                    <div className="w-full lg:w-1/3 lg:h-screen lg:sticky lg:top-0 py-12 lg:py-24 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                                Detalles que <br />
                                <span className="text-emerald-500">Enamoran</span>
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">
                                Cada espacio ha sido meticulosamente diseñado para ofrecerte el máximo confort y estilo de vida.
                            </p>

                            <div className="grid grid-cols-1 gap-6">
                                {features.map((feature, index) => {
                                    const Icon = iconMap[feature.iconName] || iconMap.Ruler;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-500/30 transition-colors"
                                        >
                                            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-emerald-500">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white">{feature.label}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Gallery (Scrollable) */}
                    <div className="w-full lg:w-2/3 py-12 lg:py-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {images.map((src, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`relative group rounded-2xl overflow-hidden cursor-pointer ${index % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/5]"
                                        }`}
                                    onClick={() => setSelectedImage(src)}
                                >
                                    <Image
                                        src={src}
                                        alt={`Gallery image ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                                            <Maximize2 className="w-6 h-6" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 text-white/50 hover:text-white z-50 p-2 transition-colors"
                        >
                            <X size={40} />
                        </button>
                        <motion.div
                            layoutId={selectedImage}
                            className="relative w-full max-w-7xl h-[85vh] rounded-lg overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Vista ampliada"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
