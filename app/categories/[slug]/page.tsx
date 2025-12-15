import Link from 'next/link';
import { notFound } from 'next/navigation';
import TutorCard from '@/components/TutorCard';
import categoriesData from '@/data/categories.json';
import tutorsData from '@/data/tutors.json';

export async function generateStaticParams() {
    return categoriesData.map((category) => ({
        slug: category.slug,
    }));
}

export default async function CategoryDetailPage({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
    const { slug } = await params;
    const category = categoriesData.find((c) => c.slug === slug);

    if (!category) {
        notFound();
    }

    // Filter tutors by category
    const categoryTutors = tutorsData.filter((tutor) =>
        tutor.kategori.includes(slug)
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/categories"
                        className="inline-flex items-center text-white hover:text-blue-100 mb-6"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Kembali ke Kategori
                    </Link>

                    <div className="text-center">
                        <div className="text-8xl mb-4">{category.ikon}</div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.nama}</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            {category.deskripsi}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tutors Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {categoryTutors.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600 mb-4">
                            Belum ada tutor untuk kategori ini
                        </p>
                        <Link
                            href="/tutors"
                            className="inline-block text-blue-600 font-semibold hover:text-blue-700"
                        >
                            Lihat Semua Tutor →
                        </Link>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Tutor {category.nama}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Menampilkan {categoryTutors.length} tutor
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryTutors.map((tutor) => (
                                <TutorCard key={tutor.id} tutor={tutor} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
