"use server";

import fs from "fs/promises";
import path from "path";
import { Property } from "@/data/properties";
import { revalidatePath } from "next/cache";

const dataPath = path.join(process.cwd(), "src", "data", "properties.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

export async function getProperties(): Promise<Property[]> {
    try {
        const data = await fs.readFile(dataPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading properties:", error);
        return [];
    }
}

export async function saveProperty(property: Property): Promise<void> {
    const properties = await getProperties();
    const index = properties.findIndex((p) => p.id === property.id);

    if (index >= 0) {
        properties[index] = property;
    } else {
        properties.push(property);
    }

    await fs.writeFile(dataPath, JSON.stringify(properties, null, 2));
    revalidatePath("/");
    revalidatePath("/dashboard");
}

export async function deleteProperty(id: string): Promise<void> {
    const properties = await getProperties();
    const filteredProperties = properties.filter((p) => p.id !== id);
    await fs.writeFile(dataPath, JSON.stringify(filteredProperties, null, 2));
    revalidatePath("/");
    revalidatePath("/dashboard");
}

export async function uploadImage(formData: FormData): Promise<string | null> {
    try {
        const file = formData.get("file") as File;
        if (!file) return null;

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;

        // Ensure uploads directory exists
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir, { recursive: true });
        }

        const filePath = path.join(uploadsDir, fileName);
        await fs.writeFile(filePath, buffer);

        return `/uploads/${fileName}`;
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
}
