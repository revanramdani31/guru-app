import { blogs } from '@/data/articles';
import { Metadata } from 'next';
import ArticleDetailClient from '@/components/article/ArticleDetailClient';

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = Number(params.id);
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

export default function ArticleDetailPage({ params }: Props) {
    return <ArticleDetailClient id={Number(params.id)} />;
}
