"use client";

import { useState, useEffect, useRef } from "react";
import { Property, PropertyFeature } from "@/data/properties";
import { getProperties, saveProperty, deleteProperty, uploadImage } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, Save, X, Image as ImageIcon, LayoutList, Upload } from "lucide-react";
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
            location: "Ubicación",
            description: "Descripción de la propiedad...",
            price: "A consultar",
            heroImage: "https://images.unsplash.com/photo-1600596542815-2a4d9f6fac90",
            images: [],
            features: [],
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'gallery') => {
        const file = e.target.files?.[0];
        if (!file || !formData) return;

        setIsUploading(true);
        try {
            const formDataUpload = new FormData();
            formDataUpload.append("file", file);
            const url = await uploadImage(formDataUpload);

            if (url) {
                if (target === 'hero') {
                    updateField("heroImage", url);
                } else {
                    setFormData({ ...formData, images: [...formData.images, url] });
                }
            }
        } catch (error) {
            console.error("Error uploading:", error);
            alert("Error al subir la imagen");
        } finally {
            setIsUploading(false);
            // Reset input
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Panel de Administración</h1>
                    {!editingId && (
                        <Button onClick={handleCreate}>
                            <Plus className="mr-2 h-4 w-4" /> Agregar Propiedad
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {editingId && formData ? (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">
                                    {formData.id.startsWith('prop-') ? 'Crear Propiedad' : 'Editar Propiedad'}
                                </h2>
                                <Button variant="ghost" onClick={() => { setEditingId(null); setFormData(null); }}>
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                            {/* Información Básica */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4 border-b pb-2 flex items-center">
                                    <LayoutList className="mr-2 h-5 w-5" /> Información Básica
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Título</label>
                                        <input
                                            className="w-full p-2 border rounded dark:bg-gray-700"
                                            value={formData.title}
                                            onChange={(e) => updateField("title", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Ubicación</label>
                                        <input
                                            className="w-full p-2 border rounded dark:bg-gray-700"
                                            value={formData.location}
                                            onChange={(e) => updateField("location", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Precio</label>
                                        <input
                                            className="w-full p-2 border rounded dark:bg-gray-700"
                                            value={formData.price}
                                            onChange={(e) => updateField("price", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-1">URL Google Maps (Embed)</label>
                                        <input
                                            className="w-full p-2 border rounded dark:bg-gray-700 text-sm font-mono"
                                            value={formData.mapUrl || ""}
                                            onChange={(e) => updateField("mapUrl", e.target.value)}
                                            placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Ve a Google Maps {'>'} Compartir {'>'} Insertar un mapa {'>'} Copiar HTML.</p>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-1">Descripción</label>
                                        <textarea
                                            className="w-full p-2 border rounded dark:bg-gray-700"
                                            rows={3}
                                            value={formData.description}
                                            onChange={(e) => updateField("description", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-1">Imagen Principal (URL o Subir)</label>
                                        <div className="flex gap-2">
                                            <input
                                                className="w-full p-2 border rounded dark:bg-gray-700"
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
                                            >
                                                <Upload className="h-4 w-4 mr-2" /> Subir
                                            </Button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Recomendado: <strong>1920x1080px</strong> (Horizontal). Máx 2MB.
                                        </p>
                                        {formData.heroImage && (
                                            <div className="mt-2 relative w-32 h-20 rounded overflow-hidden">
                                                <Image src={formData.heroImage} alt="Hero" fill className="object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Características */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4 border-b pb-2">
                                    <h3 className="text-lg font-semibold flex items-center">
                                        <LayoutList className="mr-2 h-5 w-5" /> Características
                                    </h3>
                                    <Button size="sm" onClick={addFeature} variant="secondary">
                                        <Plus className="h-4 w-4" /> Agregar
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {formData.features.map((feature, idx) => (
                                        <div key={idx} className="flex gap-2 items-start border p-3 rounded bg-gray-50 dark:bg-gray-700/50">
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    className="w-full p-1 text-sm border rounded dark:bg-gray-700"
                                                    placeholder="Etiqueta (ej. 3 Baños)"
                                                    value={feature.label}
                                                    onChange={(e) => updateFeature(idx, "label", e.target.value)}
                                                />
                                                <input
                                                    className="w-full p-1 text-sm border rounded dark:bg-gray-700"
                                                    placeholder="Descripción (ej. Completos)"
                                                    value={feature.desc}
                                                    onChange={(e) => updateFeature(idx, "desc", e.target.value)}
                                                />
                                                <select
                                                    className="w-full p-1 text-sm border rounded dark:bg-gray-700"
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
                                            <button onClick={() => removeFeature(idx)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Imágenes */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4 border-b pb-2">
                                    <h3 className="text-lg font-semibold flex items-center">
                                        <ImageIcon className="mr-2 h-5 w-5" /> Galería de Imágenes
                                    </h3>
                                    <input
                                        type="file"
                                        hidden
                                        ref={galleryInputRef}
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'gallery')}
                                    />
                                    <div className="flex flex-col items-end">
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
                                            <div className="relative w-16 h-10 rounded overflow-hidden">
                                                <Image src={img} alt={`Img ${idx}`} fill className="object-cover" />
                                            </div>
                                            <input
                                                className="w-full p-2 border rounded dark:bg-gray-700"
                                                placeholder="https://..."
                                                value={img}
                                                readOnly
                                            />
                                            <button onClick={() => removeImage(idx)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2 pt-4 border-t">
                                <Button variant="outline" onClick={() => { setEditingId(null); setFormData(null); }}>Cancelar</Button>
                                <Button onClick={handleSave} className="w-32" disabled={isUploading}>
                                    <Save className="mr-2 h-4 w-4" /> {isUploading ? 'Subiendo...' : 'Guardar'}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        properties.map((property) => (
                            <div key={property.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    {property.heroImage && (
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                            <Image src={property.heroImage} alt={property.title} fill className="object-cover" />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-bold">{property.title}</h3>
                                        <p className="text-gray-500">{property.location}</p>
                                        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full mt-1">
                                            {property.price}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" onClick={() => handleEdit(property)}>Editar</Button>
                                    <Button variant="secondary" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200" onClick={() => handleDelete(property.id)}>
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
