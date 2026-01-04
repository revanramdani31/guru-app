'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, Monitor, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import tutorsData from '@/data/tutors.json';

interface Tutor {
    id: number;
    slug: string;
    nama: string;
    mapel: string[];
    lokasi: string;
    tipe: string;
    tingkat: string[];
    foto: string;
    deskripsi: string;
    pendidikan: string;
    kategori: string[];
    whatsapp: string;
    email: string;
}

interface TutorDetailClientProps {
    slug: string;
}

const getClassTypeLabel = (type: string) => {
    switch (type) {
        case 'online': return 'Online';
        case 'tatap_muka': return 'Tatap Muka';
        case 'keduanya': return 'Online & Tatap Muka';
        default: return '';
    }
};

const TutorDetailClient = ({ slug }: TutorDetailClientProps) => {
    const tutor = (tutorsData as Tutor[]).find(t => t.slug === slug);

    if (!tutor) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-3xl font-bold text-blue-900 mb-4">Guru Tidak Ditemukan</h1>
                <Link href="/tutors">
                    <Button>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Daftar Guru
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/tutors">
                <Button variant="ghost" className="mb-6 text-blue-600 hover:text-blue-700">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Daftar Guru
                </Button>
            </Link>

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                        {/* Photo on Left - 2/5 width */}
                        <div className="lg:col-span-2 relative h-80 sm:h-96 lg:h-auto lg:min-h-[350px] overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
                            {tutor.foto ? (
                                <img
                                    src={tutor.foto}
                                    alt={tutor.nama}
                                    className="w-full h-full object-cover object-center lg:object-top"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-9xl">👨‍🏫</span>
                                </div>
                            )}
                        </div>

                        {/* Info on Right - 3/5 width */}
                        <div className="lg:col-span-3 p-5 lg:p-6 flex flex-col">
                            {/* Name & Location */}
                            <div className="mb-6">
                                <h1 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-2">{tutor.nama}</h1>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="w-5 h-5" />
                                    <span>{tutor.lokasi}</span>
                                </div>
                            </div>

                            {/* Subjects */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {tutor.mapel.map((subject, idx) => (
                                    <Link key={idx} href={`/categories/${tutor.kategori[0]}`}>
                                        <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors">
                                            {subject}
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-100">
                                    <Monitor className="w-3 h-3" />
                                    {getClassTypeLabel(tutor.tipe)}
                                </span>
                                {tutor.tingkat.map((level, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                                        <BookOpen className="w-3 h-3" />
                                        {level}
                                    </span>
                                ))}
                            </div>

                            {/* Education */}
                            <div className="mb-6">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-sm text-gray-500 mb-1">Pendidikan</div>
                                    <div className="font-semibold text-gray-800">{tutor.pendidikan}</div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-blue-900 mb-3">Tentang</h2>
                                <p className="text-gray-700 leading-relaxed">{tutor.deskripsi}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TutorDetailClient;
