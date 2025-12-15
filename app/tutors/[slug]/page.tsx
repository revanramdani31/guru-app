import Link from 'next/link';
import { notFound } from 'next/navigation';
import tutorsData from '@/data/tutors.json';
import categoriesData from '@/data/categories.json';

export async function generateStaticParams() {
    return tutorsData.map((tutor) => ({
        slug: tutor.slug,
    }));
}

export default async function TutorDetailPage({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
    const { slug } = await params;
    const tutor = tutorsData.find((t) => t.slug === slug);

    if (!tutor) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button */}
                <Link
                    href="/tutors"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
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
                    Kembali ke Daftar Tutor
                </Link>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Profile Image */}
                        <div className="md:w-1/3 bg-gradient-to-br from-blue-400 to-purple-500 p-8 flex items-center justify-center">
                            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-8xl">
                                👨‍🏫
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="md:w-2/3 p-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{tutor.nama}</h1>

                            <div className="flex items-center mb-4">
                                <span className="text-yellow-400 text-2xl">★</span>
                                <span className="ml-2 text-xl font-semibold text-gray-700">
                                    {tutor.rating}
                                </span>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center text-gray-600 mb-2">
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
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    {tutor.lokasi}
                                </div>

                                <div className="flex items-center text-gray-600 mb-2">
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
                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Pengalaman: {tutor.pengalaman}
                                </div>

                                <div className="flex items-center text-gray-600">
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
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                    {tutor.pendidikan}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mata Pelajaran:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tutor.mapel.map((mapel) => (
                                        <span
                                            key={mapel}
                                            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full"
                                        >
                                            {mapel}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-lg mb-6">
                                <div className="text-4xl font-bold text-blue-600">
                                    Rp {tutor.harga.toLocaleString('id-ID')}
                                    <span className="text-lg text-gray-600 font-normal">/jam</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href={`https://wa.me/${tutor.whatsapp}?text=Halo%20${encodeURIComponent(tutor.nama)},%20saya%20tertarik%20untuk%20les%20privat`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center bg-green-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition shadow-lg"
                                >
                                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </a>
                                <a
                                    href={`mailto:${tutor.email}?subject=Les%20Privat%20dengan%20${encodeURIComponent(tutor.nama)}&body=Halo%20${encodeURIComponent(tutor.nama)},%0A%0ASaya%20tertarik%20untuk%20mengikuti%20les%20privat.%0A%0ATerima%20kasih.`}
                                    className="flex-1 inline-flex items-center justify-center bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
                                >
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border-t p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Tutor</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">{tutor.deskripsi}</p>
                    </div>

                    {/* Categories */}
                    <div className="border-t p-8 bg-gray-50">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Kategori</h2>
                        <div className="flex flex-wrap gap-3">
                            {tutor.kategori.map((katSlug) => {
                                const category = categoriesData.find((c) => c.slug === katSlug);
                                return category ? (
                                    <Link
                                        key={katSlug}
                                        href={`/categories/${category.slug}`}
                                        className="inline-flex items-center bg-white border-2 border-blue-500 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                                    >
                                        <span className="text-2xl mr-2">{category.ikon}</span>
                                        {category.nama}
                                    </Link>
                                ) : null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
