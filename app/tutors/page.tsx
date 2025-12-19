'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, GraduationCap, ArrowRight } from 'lucide-react';
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

const TutorsPage = () => {
    const tutors = tutorsData as Tutor[];

    const getClassTypeLabel = (type: string) => {
        switch (type) {
            case 'online': return 'Online';
            case 'tatap_muka': return 'Tatap Muka';
            case 'keduanya': return 'Online & Tatap Muka';
            default: return '';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Guru Kami</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Berikut adalah sebagian guru berkualitas yang bergabung bersama kami.
                    Daftar sekarang dan kami akan carikan guru terbaik untuk Anda.
                </p>
            </motion.div>

            {/* Info Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10 text-center"
            >
                <p className="text-emerald-800">
                    💡 <strong>Bagaimana cara mendapatkan guru?</strong> Cukup isi formulir pendaftaran,
                    tim kami akan mencarikan guru yang sesuai dengan kebutuhan Anda.
                </p>
            </motion.div>

            {/* Tutors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {tutors.map((tutor, index) => (
                    <motion.div
                        key={tutor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-100/50 border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all"
                    >
                        {/* Photo Section with Overlay */}
                        <div className="relative h-56 overflow-hidden">
                            {tutor.foto ? (
                                <img
                                    src={tutor.foto}
                                    alt={tutor.nama}
                                    className="w-full h-full object-cover object-top"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                                    <span className="text-6xl">👨‍🏫</span>
                                </div>
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                            {/* Name & Location on Photo */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <h2 className="text-lg font-bold mb-1">{tutor.nama}</h2>
                                <div className="flex items-center gap-1 text-xs text-gray-200">
                                    <MapPin className="w-3 h-3" />
                                    <span>{tutor.lokasi}</span>
                                </div>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-4">
                            {/* Subjects */}
                            <p className="text-emerald-600 text-sm font-semibold mb-2 line-clamp-1">
                                {tutor.mapel.join(', ')}
                            </p>

                            {/* Education */}
                            <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
                                <GraduationCap className="w-3 h-3" />
                                <span className="line-clamp-1">{tutor.pendidikan}</span>
                            </div>

                            {/* Experience & Mode */}
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{tutor.pengalaman}</span>
                                </div>
                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-xs">
                                    {getClassTypeLabel(tutor.tipe)}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-center text-white"
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ingin Belajar dengan Guru Kami?</h2>
                <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
                    Daftarkan diri Anda sekarang dan kami akan mencarikan guru terbaik sesuai kebutuhan belajar Anda.
                </p>
                <Link href="/daftar">
                    <button className="inline-flex items-center justify-center bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        Daftar Les Privat
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default TutorsPage;
