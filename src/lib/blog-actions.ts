"use server";

import fs from 'fs/promises';
import path from 'path';
import { BlogPost } from '@/data/posts';
import { revalidatePath } from 'next/cache';
import { createClient } from '@vercel/kv';

const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

const kv = createClient({
  url: kvUrl,
  token: kvToken,
});

const POSTS_FILE = path.join(process.cwd(), 'src/data/posts.json');

export async function getPosts(): Promise<BlogPost[]> {
    try {
        const kvPosts = await kv.get<BlogPost[]>('posts');
        if (kvPosts && kvPosts.length > 0) return kvPosts;
        
        const data = await fs.readFile(POSTS_FILE, 'utf8');
        const fallbackPosts = JSON.parse(data) as BlogPost[];
        if (fallbackPosts.length > 0) {
            try { await kv.set('posts', fallbackPosts); } catch(e) {}
        }
        return fallbackPosts;
    } catch (error) {
        try {
            const data = await fs.readFile(POSTS_FILE, 'utf8');
            return JSON.parse(data);
        } catch(e) {
            console.error('Error reading posts:', error);
            return [];
        }
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await getPosts();
    return posts.find((p) => p.slug === slug) || null;
}

export async function savePost(data: Omit<BlogPost, 'id' | 'date' | 'slug'>, id?: string) {
    const posts = await getPosts();
    
    // Generate slug from title
    const slug = data.title
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    
    if (id) {
        const index = posts.findIndex(p => p.id === id);
        if (index !== -1) {
            posts[index] = { ...posts[index], ...data, slug, date: posts[index].date }; // keep orig date
        }
    } else {
        const newPost: BlogPost = {
            ...data,
            id: Date.now().toString(),
            date: new Date().toISOString(),
            slug
        };
        posts.unshift(newPost);
    }

    try {
        await kv.set('posts', posts);
    } catch (e) {
        await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
    }
    revalidatePath('/blog', 'layout');
    revalidatePath('/dashboard', 'layout');
    return { success: true };
}

export async function deletePost(id: string) {
    const posts = await getPosts();
    const updatedPosts = posts.filter(p => p.id !== id);
    try {
        await kv.set('posts', updatedPosts);
    } catch(e) {
        await fs.writeFile(POSTS_FILE, JSON.stringify(updatedPosts, null, 2));
    }
    revalidatePath('/blog', 'layout');
    revalidatePath('/dashboard', 'layout');
    return { success: true };
}
