"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface GalleryProps {
    images: string[];
}

export default function Gallery({ images }: GalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section id="galeria" className="py-20 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Galería de Fotos</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            layoutId={`img-${index}`}
                            className="relative aspect-video cursor-pointer overflow-hidden rounded-xl"
                            onClick={() => setSelectedImage(src)}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Image
                                src={src}
                                alt={`Vista propiedad ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2"
                        >
                            <X size={32} />
                        </button>
                        <motion.div
                            layoutId={selectedImage === images.find(img => img === selectedImage) ? `img-${images.indexOf(selectedImage)}` : undefined}
                            className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden"
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
