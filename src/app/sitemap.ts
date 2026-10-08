import { MetadataRoute } from 'next'
import { getProperties } from '@/lib/actions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const properties = await getProperties()
    const baseUrl = 'https://compratucasa.co' // Cambiar por dominio real

    const propertyUrls = properties.map((prop) => ({
        url: `${baseUrl}/propiedad/${prop.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/jamundi`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...propertyUrls,
    ]
}
