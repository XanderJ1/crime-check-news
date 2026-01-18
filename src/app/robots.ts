import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crimechecknews.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/slice-simulator', '/api/', '/admin/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/slice-simulator', '/api/', '/admin/'],
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: ['/slice-simulator', '/api/', '/admin/'],
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
