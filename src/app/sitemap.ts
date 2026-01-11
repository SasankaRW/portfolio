import { MetadataRoute } from 'next'
import { tools, projects } from '@/data/projects'
import { getSiteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = getSiteUrl()

    // Static routes
    const staticRoutes = [
        '',
        '/about',
        '/experience',
        '/projects',
        '/tools',
        '/designs',
        '/research',
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

    // Dynamic project routes
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [...staticRoutes, ...toolRoutes, ...projectRoutes]
}
