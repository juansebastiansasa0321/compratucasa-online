"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Grid3X3, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageMosaicProps {
    images: string[];
}

export default function ImageMosaic({ images }: ImageMosaicProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);

    // Asegurarnos de tener al menos 5 imágenes para el grid ideal
    const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];

    // Las primeras 5 fotos para el mosaico principal
    const mainImage = displayImages[0];
    const secondaryImages = displayImages.slice(1, 5);

    const openLightbox = (index: number) => setSelectedIndex(index);

    const handleNext = useCallback(() => {
        setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "Escape") setSelectedIndex(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, handleNext, handlePrev]);

    return (
        <section className="bg-white dark:bg-black relative">
            {/* Mobile Grid */}
            <div className="md:hidden">
                <div className="relative h-[400px] w-full">
                    <Image
                        src={mainImage}
                        alt="Principal"
                        fill
                        className="object-cover"
                        onClick={() => openLightbox(0)}
                    />
                    <button
                        onClick={() => setShowAll(true)}
                        className="absolute bottom-4 right-4 bg-white/90 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center shadow-lg hover:bg-white transition"
                    >
                        <Grid3X3 className="w-4 h-4 mr-2" /> Ver todas ({images.length})
                    </button>
                </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-4 grid-rows-2 h-[500px] gap-2 p-2 mx-auto max-w-[1600px]">
                {/* Main Image */}
                <div
                    className="col-span-2 row-span-2 relative rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(0)}
                >
                    <Image src={mainImage} alt="Principal" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>

                {/* Secondary Images */}
                {secondaryImages.map((src, idx) => {
                    const actualIndex = idx + 1;
                    return (
                        <div
                            key={idx}
                            className="relative rounded-xl overflow-hidden cursor-pointer group"
                            onClick={() => openLightbox(actualIndex)}
                        >
                            <Image src={src} alt={`Imagen ${actualIndex}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />

                            {/* Overlay en la última imagen si hay más */}
                            {idx === 3 && images.length > 5 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                                    <span className="text-white font-bold text-lg flex items-center">
                                        +{images.length - 5} Fotos
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Floating Button for Gallery */}
            <div className="hidden md:block absolute bottom-4 right-8 z-10">
                <button
                    onClick={() => setShowAll(true)}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                    <Grid3X3 className="w-4 h-4" /> Mostrar todas las fotos
                </button>
            </div>

            {/* Lightbox / Gallery Modal */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm"
                        onClick={() => setSelectedIndex(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedIndex(null)}
                            className="absolute top-4 right-4 text-white/50 hover:text-white p-2 z-50 transition-colors"
                        >
                            <X size={32} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 text-white/50 hover:text-white p-2 z-50 transition-colors hidden md:block"
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        >
                            <ChevronLeft size={48} />
                        </button>
                        <button
                            className="absolute right-4 text-white/50 hover:text-white p-2 z-50 transition-colors hidden md:block"
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        >
                            <ChevronRight size={48} />
                        </button>

                        {/* Counter */}
                        <div className="absolute top-6 text-white text-sm font-mono bg-black/50 px-4 py-1.5 rounded-full z-[60]">
                            {selectedIndex + 1} / {images.length}
                        </div>

                        {/* Main Image Container */}
                        <div className="relative w-full h-[65vh] sm:h-[75vh] max-w-6xl px-4 flex items-center justify-center mt-12 sm:mt-8" onClick={(e) => e.stopPropagation()}>
                            <motion.div
                                key={selectedIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={images[selectedIndex]}
                                    alt="Fullscreen"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* Thumbnails Carousel */}
                        <div className="relative w-full max-w-4xl mx-auto mt-4 sm:mt-6 px-4 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 justify-start sm:justify-center items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedIndex(idx)}
                                        className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                                            idx === selectedIndex 
                                            ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-black opacity-100 scale-105' 
                                            : 'opacity-40 hover:opacity-100'
                                        }`}
                                    >
                                        <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Full Gallery Grid Modal */}
                {showAll && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed inset-0 z-[55] bg-white dark:bg-black overflow-y-auto"
                    >
                        <div className="sticky top-0 bg-white dark:bg-black/80 backdrop-blur-md p-4 flex justify-between items-center z-10 border-b dark:border-gray-800">
                            <h2 className="text-xl font-bold">Galería de Fotos ({images.length})</h2>
                            <button onClick={() => setShowAll(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
                            {images.map((img, idx) => (
                                <div key={idx} className="aspect-video relative rounded-lg overflow-hidden cursor-pointer group" onClick={() => { setShowAll(false); setSelectedIndex(idx); }}>
                                    <Image src={img} alt={`Galeria ${idx}`} fill className="object-cover group-hover:scale-105 transition-transform" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
