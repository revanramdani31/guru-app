import { MetadataRoute } from 'next';
import { blogs } from '@/data/articles';
import tutorsData from '@/data/tutors.json';

interface Tutor {
    id: number;
    slug: string;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.datanginguru.com';

    const staticPages = [
        '',
        '/tutors',
        '/artikel',
        '/biaya',
        '/karir',
        '/program',
        '/tentang',
        '/daftar',
        '/pengaduan',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const blogPages = blogs.map((blog) => ({
        url: `${baseUrl}/artikel/${blog.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const tutorPages = (tutorsData as Tutor[]).map((tutor) => ({
        url: `${baseUrl}/tutors/${tutor.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...blogPages, ...tutorPages];
}
