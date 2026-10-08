"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Property, PropertyFeature, COLOMBIAN_CITIES } from "@/data/properties";
import { getProperties, saveProperty, deleteProperty, uploadImage, reorderProperties } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, Save, X, Image as ImageIcon, LayoutList, Upload, ArrowUp, ArrowDown, Star } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Property | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const heroInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        const data = await getProperties();
        setProperties(data);
    };

    const handleEdit = (property: Property) => {
        setEditingId(property.id);
        setFormData({ ...property });
    };

    const handleCreate = () => {
        const newProperty: Property = {
            id: `prop-${Date.now()}`,
            title: "Nueva Propiedad",
            location: "Ubicación (Ej: Condominio, Barrio)",
            city: COLOMBIAN_CITIES[0],
            propertyType: "Apartamento",
            status: "Usado",
            bathrooms: 2,
            bedrooms: 3,
            parkingSpaces: 1,
            builtArea: 100,
            privateArea: 100,
            stratum: 4,
            adminFee: "$ 150.000",
            floorNumber: 2,
            totalFloors: "¡Pregúntale!",
            acceptsBarter: "¡Pregúntale!",
            remodeled: "No",
            age: "9 a 15 años",
            description: "Descripción de la propiedad...",
            price: "$ 500.000.000 COP",
            heroImage: "https://images.unsplash.com/photo-1600596542815-2a4d9f6fac90",
            images: [],
            features: [],
            agentName: "Sebastian",
            agentPhone: "3147872392",
            featured: false
        };
        setEditingId(newProperty.id);
        setFormData(newProperty);
    };

    const handleSave = async () => {
        if (formData) {
            await saveProperty(formData);
            setEditingId(null);
            setFormData(null);
            loadProperties();
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de eliminar esta propiedad?")) {
            await deleteProperty(id);
            loadProperties();
        }
    };

    const updateField = (field: keyof Property, value: any) => {
        if (formData) {
            setFormData({ ...formData, [field]: value });
        }
    };

    const addFeature = () => {
        if (formData) {
            const newFeature: PropertyFeature = { iconName: "Ruler", label: "", desc: "" };
            setFormData({ ...formData, features: [...formData.features, newFeature] });
        }
    };

    const removeFeature = (index: number) => {
        if (formData) {
            const newFeatures = [...formData.features];
            newFeatures.splice(index, 1);
            setFormData({ ...formData, features: newFeatures });
        }
    };

    const updateFeature = (index: number, field: keyof PropertyFeature, value: string) => {
        if (formData) {
            const newFeatures = [...formData.features];
            newFeatures[index] = { ...newFeatures[index], [field]: value };
            setFormData({ ...formData, features: newFeatures });
        }
    };

    const moveImage = (index: number, direction: 'up' | 'down') => {
        if (!formData) return;
        const newImages = [...formData.images];
        if (direction === 'up' && index > 0) {
            [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
        } else if (direction === 'down' && index < newImages.length - 1) {
            [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
        }
        setFormData({ ...formData, images: newImages });
    };

    const moveProperty = async (index: number, direction: 'up' | 'down') => {
        const newProps = [...properties];
        if (direction === 'up' && index > 0) {
            [newProps[index - 1], newProps[index]] = [newProps[index], newProps[index - 1]];
        } else if (direction === 'down' && index < newProps.length - 1) {
            [newProps[index], newProps[index + 1]] = [newProps[index + 1], newProps[index]];
        }
        setProperties(newProps);
        await reorderProperties(newProps.map(p => p.id));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'gallery') => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0 || !formData) return;

        setIsUploading(true);
        try {
            if (target === 'hero') {
                const formDataUpload = new FormData();
                formDataUpload.append("file", files[0]);
                const url = await uploadImage(formDataUpload);
                if (url) updateField("heroImage", url);
            } else {
                const newUrls: string[] = [];
                for (const file of files) {
                    const formDataUpload = new FormData();
                    formDataUpload.append("file", file);
                    const url = await uploadImage(formDataUpload);
                    if (url) newUrls.push(url);
                }
                setFormData({ ...formData, images: [...formData.images, ...newUrls] });
            }
        } catch (error) {
            console.error("Error uploading:", error);
            alert("Error al subir la(s) imagen(es)");
        } finally {
            setIsUploading(false);
            if (e.target) e.target.value = "";
        }
    };

    const removeImage = (index: number) => {
        if (formData) {
            const newImages = [...formData.images];
            newImages.splice(index, 1);
            setFormData({ ...formData, images: newImages });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-0">
                    <h1 className="text-2xl sm:text-3xl font-bold">Panel de Administración</h1>
                    <div className="flex gap-4">
                        <Link href="/dashboard/blog" className="flex items-center justify-center px-5 py-2.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                            Gestionar Blog
                        </Link>
                        {!editingId && (
                            <button onClick={handleCreate} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/30">
                                <Plus className="w-5 h-5" /> Nueva Propiedad
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {editingId && formData ? (
                        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg">
                            <div className="flex justify-between items-center mb-4 sm:mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold">
                                    {formData.id.startsWith('prop-') ? 'Crear Propiedad' : 'Editar Propiedad'}
                                </h2>
                                <Button variant="ghost" onClick={() => { setEditingId(null); setFormData(null); }}>
                                    <X className="h-5 h-5 sm:h-6 sm:w-6" />
                                </Button>
                            </div>

                            {/* Información Básica */}
                            <div className="mb-6 sm:mb-8">
                                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 border-b pb-2 flex items-center">
                                    <LayoutList className="mr-2 h-4 h-4 sm:h-5 sm:w-5" /> Información Básica
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium mb-1">Título</label>
                                        <input
                                            className="w-full p-2 text-sm sm:text-base border rounded dark:bg-gray-700"
                                            value={formData.title}
                                            onChange={(e) => updateField("title", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium mb-1">Ubicación exacta / Barrio</label>
                                        <input
                                            className="w-full p-2 text-sm sm:text-base border rounded dark:bg-gray-700"
                                            value={formData.location}
                                            onChange={(e) => updateField("location", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium mb-1">Ciudad</label>
                                        <input
                                            className="w-full p-2 text-sm sm:text-base border rounded dark:bg-gray-700"
                                            value={formData.city || ""}
                                            onChange={(e) => updateField("city", e.target.value)}
                                            list="colombian-cities"
                                            placeholder="Ej: Cali, Chía..."
                                        />
                                        <datalist id="colombian-cities">
                                            {COLOMBIAN_CITIES.map(c => <option key={c} value={c} />)}
                                        </datalist>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium mb-1">Precio (COP)</label>
                                        <input
                                            className="w-full p-2 text-sm sm:text-base border rounded dark:bg-gray-700"
                                            value={formData.price}
                                            placeholder="Ej: $ 500.000.000 COP"
                                            onChange={(e) => updateField("price", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium mb-1">Nombre Asesor</label>
                                        <input
                                            className="w-full p-2 text-sm sm:text-base border rounded dark:bg-gray-700"
                                            value={formData.agentName || ""}
                                            placeholder="Ej: Sebastian"
                                            onChange={(e) => updateField("agentName", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium mb-1">WhatsApp Asesor</label>
                                        <input
                                            className="w-full p-2 text-sm sm:text-base border rounded dark:bg-gray-700"
                                            value={formData.agentPhone || ""}
                                            placeholder="Ej: 3147872392"
                                            onChange={(e) => updateField("agentPhone", e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 sm:mt-6 bg-amber-50 dark:bg-amber-900/20 p-2 sm:p-3 rounded border border-amber-200 dark:border-amber-800">
                                        <input
                                            type="checkbox"
                                            id="featuredToggle"
                                            checked={formData.featured || false}
                                            onChange={(e) => updateField("featured", e.target.checked)}
                                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                                        />
                                        <label htmlFor="featuredToggle" className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-100 flex items-center cursor-pointer">
                                            <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-amber-500 fill-amber-500" /> Destacar en Página Principal
                                        </label>
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-xs sm:text-sm font-medium mb-1">URL Google Maps (Embed)</label>
                                        <input
                                            className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700 font-mono"
                                            value={formData.mapUrl || ""}
                                            onChange={(e) => updateField("mapUrl", e.target.value)}
                                            placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Ve a Google Maps {'>'} Compartir {'>'} Insertar un mapa {'>'} Copiar HTML.</p>
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-xs sm:text-sm font-medium mb-1">Descripción</label>
                                        <textarea
                                            className="w-full p-2 text-sm sm:text-base border rounded dark:bg-gray-700"
                                            rows={3}
                                            value={formData.description}
                                            onChange={(e) => updateField("description", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-xs sm:text-sm font-medium mb-1">Imagen Principal (URL o Subir)</label>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <input
                                                className="w-full p-2 text-sm sm:text-base border rounded dark:bg-gray-700"
                                                value={formData.heroImage}
                                                onChange={(e) => updateField("heroImage", e.target.value)}
                                                placeholder="http://... o sube una imagen"
                                            />
                                            <input
                                                type="file"
                                                hidden
                                                ref={heroInputRef}
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'hero')}
                                            />
                                            <Button
                                                variant="secondary"
                                                onClick={() => heroInputRef.current?.click()}
                                                disabled={isUploading}
                                                className="w-full sm:w-auto"
                                            >
                                                <Upload className="h-4 w-4 mr-2" /> Subir
                                            </Button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Recomendado: <strong>1920x1080px</strong> (Horizontal). Máx 2MB.
                                        </p>
                                        {formData.heroImage && (
                                            <div className="mt-2 relative w-24 h-16 sm:w-32 sm:h-20 rounded overflow-hidden">
                                                <Image src={formData.heroImage} alt="Hero" fill className="object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Detalles de la Propiedad (Fincaraíz Style) */}
                            <div className="mb-6 sm:mb-8 border-t pt-4">
                                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 pb-2 flex items-center">
                                    <LayoutList className="mr-2 h-4 h-4 sm:h-5 sm:w-5" /> Detalles de la Propiedad
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Tipo de Inmueble</label>
                                        <select className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.propertyType || ""} onChange={(e) => updateField("propertyType", e.target.value)}>
                                            <option value="Apartamento">Apartamento</option><option value="Casa">Casa</option><option value="Lote">Lote</option><option value="Oficina">Oficina</option><option value="Finca">Finca</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Estado</label>
                                        <select className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.status || ""} onChange={(e) => updateField("status", e.target.value)}>
                                            <option value="Usado">Usado</option><option value="Nuevo">Nuevo</option><option value="Sobre planos">Sobre planos</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Habitaciones</label>
                                        <input type="number" className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.bedrooms || 0} onChange={(e) => updateField("bedrooms", Number(e.target.value))} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Baños</label>
                                        <input type="number" className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.bathrooms || 0} onChange={(e) => updateField("bathrooms", Number(e.target.value))} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Parqueaderos</label>
                                        <input type="number" className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.parkingSpaces || 0} onChange={(e) => updateField("parkingSpaces", Number(e.target.value))} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Área Construida (m2)</label>
                                        <input type="number" className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.builtArea || 0} onChange={(e) => updateField("builtArea", Number(e.target.value))} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Área Privada (m2)</label>
                                        <input type="number" className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.privateArea || 0} onChange={(e) => updateField("privateArea", Number(e.target.value))} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Estrato</label>
                                        <input type="number" className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.stratum || 0} onChange={(e) => updateField("stratum", Number(e.target.value))} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Piso N°</label>
                                        <input type="number" className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.floorNumber || 0} onChange={(e) => updateField("floorNumber", Number(e.target.value))} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Administración</label>
                                        <input className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.adminFee || ""} placeholder="$ 0" onChange={(e) => updateField("adminFee", e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Antigüedad</label>
                                        <select className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.age || ""} onChange={(e) => updateField("age", e.target.value)}>
                                            <option value="Menos de 1 año">Menos de 1 año</option><option value="1 a 8 años">1 a 8 años</option><option value="9 a 15 años">9 a 15 años</option><option value="16 a 30 años">16 a 30 años</option><option value="Más de 30 años">Más de 30 años</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Cantidad de Pisos</label>
                                        <input className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.totalFloors || ""} placeholder="Ej: 2 o ¡Pregúntale!" onChange={(e) => updateField("totalFloors", e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Acepta permuta</label>
                                        <select className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.acceptsBarter || ""} onChange={(e) => updateField("acceptsBarter", e.target.value)}>
                                            <option value="¡Pregúntale!">¡Pregúntale!</option><option value="Sí">Sí</option><option value="No">No</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1">Remodelado</label>
                                        <select className="w-full p-2 text-xs sm:text-sm border rounded dark:bg-gray-700" value={formData.remodeled || ""} onChange={(e) => updateField("remodeled", e.target.value)}>
                                            <option value="¡Pregúntale!">¡Pregúntale!</option><option value="Sí">Sí</option><option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Características extra */}
                            <div className="mb-6 sm:mb-8">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 border-b pb-2 gap-2 sm:gap-0">
                                    <h3 className="text-base sm:text-lg font-semibold flex items-center">
                                        <LayoutList className="mr-2 h-4 h-4 sm:h-5 sm:w-5" /> Características
                                    </h3>
                                    <Button size="sm" onClick={addFeature} variant="secondary">
                                        <Plus className="h-4 w-4" /> Agregar
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                    {formData.features.map((feature, idx) => (
                                        <div key={idx} className="flex gap-2 items-start border p-2 sm:p-3 rounded bg-gray-50 dark:bg-gray-700/50">
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border rounded dark:bg-gray-700"
                                                    placeholder="Etiqueta (ej. 3 Baños)"
                                                    value={feature.label}
                                                    onChange={(e) => updateFeature(idx, "label", e.target.value)}
                                                />
                                                <input
                                                    className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border rounded dark:bg-gray-700"
                                                    placeholder="Descripción (ej. Completos)"
                                                    value={feature.desc}
                                                    onChange={(e) => updateFeature(idx, "desc", e.target.value)}
                                                />
                                                <select
                                                    className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border rounded dark:bg-gray-700"
                                                    value={feature.iconName}
                                                    onChange={(e) => updateFeature(idx, "iconName", e.target.value)}
                                                >
                                                    <option value="Bed">Cama</option>
                                                    <option value="Bath">Baño</option>
                                                    <option value="ChefHat">Cocina</option>
                                                    <option value="Ruler">Regla/Area</option>
                                                    <option value="CarFront">Carro</option>
                                                    <option value="TreePine">Arbol/Jardín</option>
                                                </select>
                                            </div>
                                            <button onClick={() => removeFeature(idx)} className="text-red-500 hover:text-red-700 shrink-0">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Imágenes */}
                            <div className="mb-6 sm:mb-8">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 border-b pb-2 gap-2">
                                    <h3 className="text-base sm:text-lg font-semibold flex items-center">
                                        <ImageIcon className="mr-2 h-4 h-4 sm:h-5 sm:w-5" /> Galería de Imágenes
                                    </h3>
                                    <input
                                        type="file"
                                        hidden
                                        multiple
                                        ref={galleryInputRef}
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'gallery')}
                                    />
                                    <div className="flex flex-col items-start sm:items-end">
                                        <Button size="sm" onClick={() => galleryInputRef.current?.click()} variant="secondary" disabled={isUploading}>
                                            <Upload className="h-4 w-4 mr-2" /> Subir Foto
                                        </Button>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Recomendado: <strong>1200x800px</strong>. Máx 1MB.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className="flex gap-2 items-center">
                                            <div className="relative w-12 h-8 sm:w-16 sm:h-10 rounded overflow-hidden shrink-0">
                                                <Image src={img} alt={`Img ${idx}`} fill className="object-cover" />
                                            </div>
                                            <input
                                                className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border rounded dark:bg-gray-700"
                                                placeholder="https://..."
                                                value={img}
                                                readOnly
                                            />
                                            <div className="flex gap-1 shrink-0">
                                                <button onClick={(e) => { e.preventDefault(); moveImage(idx, 'up'); }} disabled={idx === 0} className="p-1.5 text-gray-500 hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded transition-colors">
                                                    <ArrowUp className="h-4 w-4" />
                                                </button>
                                                <button onClick={(e) => { e.preventDefault(); moveImage(idx, 'down'); }} disabled={idx === formData.images.length - 1} className="p-1.5 text-gray-500 hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded transition-colors">
                                                    <ArrowDown className="h-4 w-4" />
                                                </button>
                                                <button onClick={(e) => { e.preventDefault(); removeImage(idx); }} className="p-1.5 text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-900/30 rounded ml-1 transition-colors">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4 border-t">
                                <Button variant="outline" onClick={() => { setEditingId(null); setFormData(null); }} className="w-full sm:w-auto">Cancelar</Button>
                                <Button onClick={handleSave} className="w-full sm:w-32" disabled={isUploading}>
                                    <Save className="mr-2 h-4 w-4" /> {isUploading ? 'Subiendo...' : 'Guardar'}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        properties.map((property, idx) => (
                            <div key={property.id} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                    {property.heroImage && (
                                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0">
                                            <Image src={property.heroImage} alt={property.title} fill className="object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg sm:text-xl font-bold truncate flex items-center gap-2">
                                            {property.title}
                                            {property.featured && <span title="Propiedad Destacada"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /></span>}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-500 truncate">{property.location}</p>
                                        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full mt-1">
                                            {property.price}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-2 w-full sm:w-auto items-center">
                                    <div className="flex flex-row gap-1 mr-2 hidden sm:flex">
                                        <Button variant="ghost" size="sm" className="px-2 h-9 bg-gray-50 dark:bg-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors" onClick={() => moveProperty(idx, 'up')} disabled={idx === 0}>
                                            <ArrowUp className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="px-2 h-9 bg-gray-50 dark:bg-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors" onClick={() => moveProperty(idx, 'down')} disabled={idx === properties.length - 1}>
                                            <ArrowDown className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Button variant="outline" onClick={() => handleEdit(property)} className="flex-1 sm:flex-none text-sm h-9">Editar</Button>
                                    <Button variant="secondary" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 h-9 px-3" onClick={() => handleDelete(property.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
