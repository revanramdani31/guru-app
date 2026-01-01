import { blogs } from '@/data/articles';
import { Metadata } from 'next';
import ArticleDetailClient from '@/components/article/ArticleDetailClient';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const blog = blogs.find((b) => b.id === id);

    if (!blog) {
        return {
            title: 'Artikel Tidak Ditemukan',
        };
    }

    return {
        title: `${blog.title} | Datangin Guru`,
        description: blog.excerpt,
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            images: [blog.image],
        },
    };
}

export default async function ArticleDetailPage({ params }: Props) {
    const resolvedParams = await params;
    return <ArticleDetailClient id={Number(resolvedParams.id)} />;
}
