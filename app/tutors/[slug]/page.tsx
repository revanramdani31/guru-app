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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white border-2 border-blue-100 rounded-2xl overflow-hidden"
                    >
                        <div className="h-80 overflow-hidden relative bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center text-8xl">
                                👨‍🏫
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
                                <div>
                                    <h1 className="text-4xl font-bold text-blue-900 mb-2">{tutor.nama}</h1>
                                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                                        <MapPin className="w-5 h-5" />
                                        <span>{tutor.lokasi}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {tutor.mapel.map((subject, idx) => (
                                            <Link key={idx} href={`/categories/${tutor.kategori[0]}`}>
                                                <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors">
                                                    {subject}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
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
                                </div>
                                <div className="md:text-right">
                                    <div className="text-3xl font-bold text-blue-600 mb-1">{formatIDR(tutor.harga)}</div>
                                    <span className="text-gray-600">per jam</span>
                                </div>
                            </div>

                            <div className="mb-6 pb-6 border-b border-blue-100">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <span className="font-medium">Pengalaman:</span>
                                    <span>{tutor.pengalaman}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 mt-1">
                                    <span className="font-medium">Pendidikan:</span>
                                    <span>{tutor.pendidikan}</span>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-blue-900 mb-4">Tentang</h2>
                                <p className="text-gray-700 leading-relaxed">{tutor.deskripsi}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white border-2 border-blue-100 rounded-2xl p-6 sticky top-24"
                    >
                        <h2 className="text-2xl font-bold text-blue-900 mb-6">Informasi Kontak</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="bg-blue-50 p-2 rounded-lg">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Email</p>
                                    <p className="font-medium text-sm break-all">{tutor.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="bg-blue-50 p-2 rounded-lg">
                                    <Phone className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">WhatsApp</p>
                                    <p className="font-medium text-sm">+{tutor.whatsapp}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={() => handleContact('email')}
                                className="w-full py-6 rounded-xl"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                Kirim Email
                            </Button>
                            <Button
                                onClick={() => handleContact('whatsapp')}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                WhatsApp
                            </Button>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                            <p className="text-sm text-gray-700 text-center">
                                Pesan sesi dan mulai perjalanan belajar Anda hari ini!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
