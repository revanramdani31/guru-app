import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, ArrowLeft } from 'lucide-react';
import categoriesData from '@/data/categories.json';
import tutorsData from '@/data/tutors.json';

interface Tutor {
    id: number;
    slug: string;
    nama: string;
    mapel: string[];
    harga: number;
    lokasi: string;
    tipe: string;
    tingkat: string[];
    foto: string;
    deskripsi: string;
    pengalaman: string;
    pendidikan: string;
    kategori: string[];
    whatsapp: string;
    email: string;
}

// Format currency to IDR
const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
};

const getClassTypeLabel = (type: string) => {
    switch (type) {
        case 'online': return 'Online';
        case 'tatap_muka': return 'Tatap Muka';
        case 'keduanya': return 'Online & Tatap Muka';
        default: return '';
    }
};

export async function generateStaticParams() {
    return categoriesData.map((category) => ({
        slug: category.slug,
    }));
}

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function CategoryDetailPage({ params }: Props) {
    const { slug } = await params;
    const category = categoriesData.find((c) => c.slug === slug);

    if (!category) {
        notFound();
    }

    // Filter tutors by category
    const categoryTutors = (tutorsData as Tutor[]).filter((tutor) =>
        tutor.kategori.includes(slug)
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Back Link */}
            <Link
                href="/categories"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali ke Mata Pelajaran
            </Link>


            {/* Tutors Section */}
            {categoryTutors.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border-2 border-blue-50">
                    <p className="text-xl text-gray-600 mb-4">
                        Belum ada guru untuk mata pelajaran ini
                    </p>
                    <Link
                        href="/tutors"
                        className="inline-block text-blue-600 font-semibold hover:text-blue-700"
                    >
                        Lihat Semua Guru →
                    </Link>
                </div>
            ) : (
                <>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-blue-900 mb-2">
                            Guru {category.nama}
                        </h2>
                        <p className="text-gray-600">
                            Menampilkan {categoryTutors.length} guru
                        </p>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryTutors.map((tutor) => (
                                <Link key={tutor.id} href={`/tutors/${tutor.slug}`}>
                                    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all group cursor-pointer border border-gray-100">
                                        {/* Photo Section with Overlay */}
                                        <div className="relative h-72 overflow-hidden">
                                            {tutor.foto ? (
                                                <img
                                                    src={tutor.foto}
                                                    alt={tutor.nama}
                                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                                    <span className="text-7xl">👨‍🏫</span>
                                                </div>
                                            )}

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                            {/* Name & Location on Photo */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                                <h2 className="text-xl font-bold mb-1">{tutor.nama}</h2>
                                                <p className="text-sm text-gray-200">
                                                    {tutor.lokasi} ({getClassTypeLabel(tutor.tipe).toLowerCase()})
                                                </p>
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <div className="p-4">
                                            <p className="text-blue-600 text-sm font-medium mb-2">
                                                {tutor.mapel.join(', ')}
                                            </p>
                                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                                {tutor.deskripsi}
                                            </p>
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                <span className="text-xs text-gray-500">{tutor.pengalaman} pengalaman</span>
                                                <span className="text-blue-600 font-bold">{formatIDR(tutor.harga)}/jam</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
