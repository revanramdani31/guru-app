import Link from 'next/link';

interface TutorCardProps {
    tutor: {
        id: number;
        slug: string;
        nama: string;
        mapel: string[];
        harga: number;
        lokasi: string;
        foto: string;
    };
}

export default function TutorCard({ tutor }: Readonly<TutorCardProps>) {
    return (
        <Link href={`/tutors/${tutor.slug}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer h-full">
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl">
                            👨‍🏫
                        </div>
                    </div>
                </div>

                <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{tutor.nama}</h3>

                    <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                            {tutor.mapel.slice(0, 2).map((mapel) => (
                                <span
                                    key={mapel}
                                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                >
                                    {mapel}
                                </span>
                            ))}
                            {tutor.mapel.length > 2 && (
                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                    +{tutor.mapel.length - 2}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                        <svg
                            className="w-4 h-4 mr-1"
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

                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-2xl font-bold text-blue-600">
                                Rp {tutor.harga.toLocaleString('id-ID')}
                            </span>
                            <span className="text-sm text-gray-600">/jam</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
