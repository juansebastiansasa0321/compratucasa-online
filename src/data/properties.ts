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
    description: string;
    price: string;
    features: PropertyFeature[];
    images: string[];
    heroImage: string;
    mapUrl?: string;
}

export const iconMap: Record<string, LucideIcon> = {
    Bed,
    Bath,
    ChefHat,
    Ruler,
    CarFront,
    TreePine,
};
