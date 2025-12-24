'use client';

import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { getProgramById } from '@/data/programs';
import { BookOpen, GraduationCap, Globe, Target, FileText, BookMarked } from 'lucide-react';

const iconMap: { [key: string]: any } = {
    BookOpen, GraduationCap, Globe, Target, FileText, BookMarked
};

const ProgramDetailPage = () => {
    const params = useParams();
    const slug = params.slug as string;
    const program = getProgramById(slug);

    if (!program) {
        notFound();
    }

    const Icon = iconMap[program.icon];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Section */}
            <div className={`relative ${program.color === 'emerald' ? 'bg-emerald-700' :
                program.color === 'blue' ? 'bg-blue-700' :
                    program.color === 'purple' ? 'bg-purple-700' :
                        program.color === 'teal' ? 'bg-teal-700' :
                            program.color === 'amber' ? 'bg-amber-700' :
                                'bg-rose-700'} text-white py-20 overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/program" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Program
                    </Link>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.title}</h1>
                            <p className="text-xl text-white/90 font-medium mb-6">{program.subtitle}</p>
                            <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    Terpercaya
                                </span>
                                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Fleksibel
                                </span>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20">
                                <Icon className="w-32 h-32 text-white opacity-90" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content (Left) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
                        >
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Deskripsi Program</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {program.fullDescription}
                            </p>

                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-slate-800 mb-4">Cocok Untuk:</h3>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700">
                                    {program.targetAudience}
                                </div>
                            </div>
                        </motion.div>

                        {/* Curriculum / Materi Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
                        >
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Materi & Kurikulum</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {program.curriculum.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                        <div className={`mt-1 p-1 rounded-full ${program.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar (Right) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Enrollment Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 overflow-hidden relative"
                            >
                                <div className={`absolute top-0 left-0 w-full h-2 ${program.color === 'emerald' ? 'bg-emerald-500' :
                                        program.color === 'blue' ? 'bg-blue-500' :
                                            program.color === 'purple' ? 'bg-purple-500' :
                                                'bg-slate-500'
                                    }`} />

                                <h3 className="text-xl font-bold text-slate-800 mb-2">Mulai Belajar Sekarang</h3>
                                <p className="text-slate-500 text-sm mb-6">Dapatkan sesi percobaan dan konsultasi gratis.</p>

                                <div className="mb-6">
                                    <span className="text-slate-400 text-sm">Investasi mulai dari</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-3xl font-bold ${program.color === 'emerald' ? 'text-emerald-600' : 'text-slate-800'
                                            }`}>
                                            Rp {program.priceStart}
                                        </span>
                                        <span className="text-slate-500 font-medium">/ sesi</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link href={`/daftar?program=${program.id}`} className="block">
                                        <button className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${program.color === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20' :
                                                program.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/20' :
                                                    program.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600 shadow-purple-500/20' :
                                                        'bg-slate-800 hover:bg-slate-900 shadow-slate-500/20'
                                            }`}>
                                            Daftar Sekarang <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                    <a
                                        href="https://wa.me/6281234567890"
                                        target="_blank"
                                        className="block w-full py-3.5 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 text-center transition-colors"
                                    >
                                        Konsultasi WhatsApp
                                    </a>
                                </div>
                            </motion.div>

                            {/* Key Features Summary */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-4">Fasilitas Program</h4>
                                <ul className="space-y-3">
                                    {program.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                            <div className="mt-0.5 min-w-[16px]">
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramDetailPage;
