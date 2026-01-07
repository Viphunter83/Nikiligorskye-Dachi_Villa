import { MetadataRoute } from 'next'
import prisma from '@/lib/db'

export const revalidate = 3600 // Revalidate at most every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'

    // 1. Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/journal`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ]

    // 2. Dynamic Routes from Database
    // Fetch all SEO pages
    const seoPages = await prisma.seoPage.findMany({
        select: {
            slug: true,
            updatedAt: true,
        },
    })

    const dynamicRoutes: MetadataRoute.Sitemap = seoPages.map((page: { slug: string; updatedAt: Date }) => ({
        url: `${baseUrl}/location/${page.slug}`,
        lastModified: page.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...dynamicRoutes]
}
