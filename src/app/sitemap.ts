import { MetadataRoute } from 'next'
import { tools } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://sasgrid.online'

    // Static routes
    const staticRoutes = [
        '',
        '/about',
        '/projects',
        '/tools',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic tool routes
    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...staticRoutes, ...toolRoutes]
}
