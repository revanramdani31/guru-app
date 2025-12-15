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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {categoryTutors.map((tutor) => (
                            <Link key={tutor.id} href={`/tutors/${tutor.slug}`}>
                                <div className="bg-white border-2 border-blue-100 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all group h-full flex flex-col">
                                    <div className="h-48 overflow-hidden relative bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                                            👨‍🏫
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 uppercase tracking-wide">
                                            {getClassTypeLabel(tutor.tipe)}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h2 className="text-2xl font-semibold text-blue-900 mb-2">{tutor.nama}</h2>

                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {tutor.mapel.slice(0, 3).map((subject, idx) => (
                                                <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                                    {subject}
                                                </span>
                                            ))}
                                            {tutor.mapel.length > 3 && (
                                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                                                    +{tutor.mapel.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-sm">{tutor.lokasi}</span>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tutor.deskripsi}</p>

                                        <div className="mt-auto pt-4 border-t border-blue-100 flex items-center justify-between">
                                            <span className="text-sm text-gray-500">{tutor.pengalaman} pengalaman</span>
                                            <span className="text-blue-600 font-bold text-lg">{formatIDR(tutor.harga)}/jam</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
