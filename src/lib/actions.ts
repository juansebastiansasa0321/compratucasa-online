"use server";

import fs from "fs/promises";
import path from "path";
import { Property } from "@/data/properties";
import { revalidatePath } from "next/cache";
import { createClient } from '@vercel/kv';
import { put } from '@vercel/blob';

const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

const kv = createClient({
  url: kvUrl,
  token: kvToken,
});

const dataPath = path.join(process.cwd(), "src", "data", "properties.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

export async function getProperties(): Promise<Property[]> {
    try {
        const kvProps = await kv.get<Property[]>('properties');
        if (kvProps && kvProps.length > 0) return kvProps;
        
        const data = await fs.readFile(dataPath, "utf-8");
        const fallbackProps = JSON.parse(data) as Property[];
        if (fallbackProps.length > 0) {
            try { await kv.set('properties', fallbackProps); } catch(e) {}
        }
        return fallbackProps;
    } catch (error) {
        try {
            const data = await fs.readFile(dataPath, "utf-8");
            return JSON.parse(data);
        } catch(e) {
            console.error("Error reading properties:", error);
            return [];
        }
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

    try {
        await kv.set('properties', properties);
    } catch (e) {
        await fs.writeFile(dataPath, JSON.stringify(properties, null, 2));
    }
    revalidatePath("/", "layout");
}

export async function deleteProperty(id: string): Promise<void> {
    const properties = await getProperties();
    const filteredProperties = properties.filter((p) => p.id !== id);
    try {
        await kv.set('properties', filteredProperties);
    } catch(e) {
        await fs.writeFile(dataPath, JSON.stringify(filteredProperties, null, 2));
    }
    revalidatePath("/", "layout");
}

export async function uploadImage(formData: FormData): Promise<string | null> {
    try {
        const file = formData.get("file") as File;
        if (!file) return null;

        const safeFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;

        if (process.env.BLOB_READ_WRITE_TOKEN) {
            const blob = await put(safeFileName, file, { access: 'public' });
            return blob.url;
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir, { recursive: true });
        }
        
        const filePath = path.join(uploadsDir, safeFileName);
        await fs.writeFile(filePath, buffer);
        return `/uploads/${safeFileName}`;
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
}

export async function reorderProperties(orderedIds: string[]): Promise<void> {
    const properties = await getProperties();
    properties.sort((a, b) => {
        const indexA = orderedIds.indexOf(a.id);
        const indexB = orderedIds.indexOf(b.id);
        if (indexA === -1 || indexB === -1) return 0;
        return indexA - indexB;
    });

    try {
        await kv.set('properties', properties);
    } catch(e) {
        await fs.writeFile(dataPath, JSON.stringify(properties, null, 2));
    }
    revalidatePath("/", "layout");
}
