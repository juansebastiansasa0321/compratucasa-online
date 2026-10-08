export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    author: string;
    date: string;
    published: boolean;
    tags: string[];
}
