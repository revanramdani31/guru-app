'use client';

import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowLeft, MessageCircle, Monitor, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
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

export default function TutorDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
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

    const handleContact = (type: string) => {
        if (type === 'whatsapp') {
            window.open(`https://wa.me/${tutor.whatsapp}`, '_blank');
        } else if (type === 'email') {
            window.location.href = `mailto:${tutor.email}`;
        } else if (type === 'call') {
            window.location.href = `tel:${tutor.whatsapp}`;
        }
        toast({
            title: "Menghubungi Guru",
            description: `Membuka ${type === 'whatsapp' ? 'WhatsApp' : type === 'email' ? 'Email' : 'Telepon'}...`,
            variant: "success"
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/tutors">
                <Button variant="ghost" className="mb-6 text-blue-600 hover:text-blue-700">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Daftar Guru
                </Button>
            </Link>

            {/* Grid Layout: Main Content + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content - Left (2/3 width) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                        {/* Photo on Left - 2/5 width */}
                        <div className="lg:col-span-2 relative h-64 lg:h-auto lg:min-h-[350px] overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
                            {tutor.foto ? (
                                <img
                                    src={tutor.foto}
                                    alt={tutor.nama}
                                    className="w-full h-full object-cover object-top"
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

                            {/* Price */}
                            <div className="bg-blue-50 rounded-xl p-4 mb-6">
                                <div className="text-3xl font-bold text-blue-600">{formatIDR(tutor.harga)}</div>
                                <span className="text-gray-600">per jam</span>
                            </div>

                            {/* Experience & Education */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-sm text-gray-500 mb-1">Pengalaman</div>
                                    <div className="font-semibold text-gray-800">{tutor.pengalaman}</div>
                                </div>
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

                {/* Contact Sidebar - Right Side */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg"
                >
                    <h2 className="text-xl font-bold text-blue-900 mb-4">Hubungi Guru</h2>

                    <div className="space-y-3 mb-4">
                        {/* Email Info */}
                        <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Mail className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="font-medium text-xs break-all">{tutor.email}</p>
                            </div>
                        </div>

                        {/* WhatsApp Info */}
                        <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl">
                            <div className="bg-green-100 p-2 rounded-lg">
                                <Phone className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">WhatsApp</p>
                                <p className="font-medium text-xs">+{tutor.whatsapp}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Button
                            onClick={() => handleContact('email')}
                            className="w-full py-5 rounded-xl text-sm"
                        >
                            <Mail className="w-4 h-4 mr-2" />
                            Kirim Email
                        </Button>
                        <Button
                            onClick={() => handleContact('whatsapp')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-xl text-sm"
                        >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            WhatsApp
                        </Button>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                        <p className="text-xs text-gray-700 text-center">
                            Pesan sesi dan mulai belajar hari ini!
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
