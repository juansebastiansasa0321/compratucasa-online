import { LucideIcon, Bed, Bath, ChefHat, Ruler, CarFront, TreePine } from "lucide-react";

export interface PropertyFeature {
    iconName: "Bed" | "Bath" | "ChefHat" | "Ruler" | "CarFront" | "TreePine";
    label: string;
    desc: string;
}

export interface Property {
    id: string;
    title: string;
    location: string;
    city?: string;
    description: string;
    price: string;
    features: PropertyFeature[];
    images: string[];
    heroImage: string;
    mapUrl?: string;

    // Fincaraiz style specific details
    propertyType?: string; // Apartamento, Casa, Lote, etc.
    status?: string; // Nuevo, Usado, Sobre planos
    bathrooms?: number;
    age?: string; // "1 a 8 años", "16 a 30 años", etc.
    bedrooms?: number;
    parkingSpaces?: number;
    builtArea?: number; // m2
    privateArea?: number; // m2
    stratum?: number;
    adminFee?: string; // e.g. "$ 142.000"
    floorNumber?: number;
    totalFloors?: string; // "¡Pregúntale!" or number
    acceptsBarter?: string; // "¡Pregúntale!" or boolean string
    remodeled?: string; // "¡Pregúntale!" or boolean string
    agentName?: string;
    agentPhone?: string;
    featured?: boolean;
}

export const COLOMBIAN_CITIES = [
    "Bogotá", "Medellín", "Cali", "Jamundí", "Barranquilla",
    "Cartagena", "Bucaramanga", "Pereira", "Manizales", "Santa Marta",
    "Cúcuta", "Ibagué", "Villavicencio", "Pasto", "Montería", "Armenia"
];

export const iconMap: Record<string, LucideIcon> = {
    Bed,
    Bath,
    ChefHat,
    Ruler,
    CarFront,
    TreePine,
};
