import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/_next/static/', '/api/'],
        },
        sitemap: 'https://datanginguru.com/sitemap.xml',
    };
}
