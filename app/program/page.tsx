'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, Globe, FileText, BookMarked, Check, Clock, Users, Target } from 'lucide-react';

const ProgramPage = () => {
    const programs = [
        {
            id: 'les-privat',
            title: 'Les Privat',
            subtitle: 'Bimbingan Belajar Personal',
            description: 'Program les privat untuk siswa SD, SMP, dan SMA dengan guru yang datang ke rumah atau secara online.',
            icon: <BookOpen className="w-8 h-8" />,
            color: 'emerald',
            features: [
                'Semua mata pelajaran',
                'Guru berpengalaman & tersertifikasi',
                'Jadwal fleksibel',
                'Laporan perkembangan berkala'
            ],
            priceStart: '75.000',
            popular: true
        },
        {
            id: 'utbk-snbt',
            title: 'UTBK / Seleksi PTN',
            subtitle: 'Persiapan Masuk Perguruan Tinggi',
            description: 'Program intensif persiapan UTBK-SNBT dan seleksi mandiri PTN favorit dengan strategi jitu dan tryout berkala.',
            icon: <GraduationCap className="w-8 h-8" />,
            color: 'blue',
            features: [
                'Materi TPS & TKA lengkap',
                'Tryout & pembahasan soal',
                'Strategi pengerjaan soal',
                'Konsultasi jurusan & PTN'
            ],
            priceStart: '150.000'
        },
        {
            id: 'toefl',
            title: 'TOEFL Preparation',
            subtitle: 'Persiapan Tes Bahasa Inggris',
            description: 'Kursus persiapan TOEFL ITP/iBT untuk keperluan akademik, beasiswa, atau karir profesional.',
            icon: <Globe className="w-8 h-8" />,
            color: 'purple',
            features: [
                'Listening, Structure, Reading',
                'Speaking & Writing (iBT)',
                'Simulation test',
                'Tips & trik scoring tinggi'
            ],
            priceStart: '200.000'
        },
        {
            id: 'jurnal-artikel',
            title: 'Jurnal / Artikel Ilmiah',
            subtitle: 'Pendampingan Publikasi',
            description: 'Bimbingan penulisan dan publikasi jurnal atau artikel ilmiah nasional maupun internasional.',
            icon: <FileText className="w-8 h-8" />,
            color: 'amber',
            features: [
                'Penyusunan naskah ilmiah',
                'Review & editing',
                'Pemilihan jurnal target',
                'Pendampingan submission'
            ],
            priceStart: '500.000'
        },
        {
            id: 'skripsi-tesis',
            title: 'Skripsi / Tesis',
            subtitle: 'Bimbingan Tugas Akhir',
            description: 'Pendampingan penyusunan skripsi, tesis, atau disertasi dari awal hingga sidang.',
            icon: <BookMarked className="w-8 h-8" />,
            color: 'rose',
            features: [
                'Penyusunan proposal',
                'Bimbingan metodologi',
                'Analisis data & pembahasan',
                'Persiapan sidang'
            ],
            priceStart: '300.000'
        }
    ];

    const getColorClasses = (color: string) => {
        const colors: { [key: string]: { bg: string; bgLight: string; text: string; border: string; shadow: string } } = {
            emerald: {
                bg: 'bg-emerald-500',
                bgLight: 'bg-emerald-50',
                text: 'text-emerald-600',
                border: 'border-emerald-500',
                shadow: 'shadow-emerald-100'
            },
            blue: {
                bg: 'bg-blue-500',
                bgLight: 'bg-blue-50',
                text: 'text-blue-600',
                border: 'border-blue-500',
                shadow: 'shadow-blue-100'
            },
            purple: {
                bg: 'bg-purple-500',
                bgLight: 'bg-purple-50',
                text: 'text-purple-600',
                border: 'border-purple-500',
                shadow: 'shadow-purple-100'
            },
            amber: {
                bg: 'bg-amber-500',
                bgLight: 'bg-amber-50',
                text: 'text-amber-600',
                border: 'border-amber-500',
                shadow: 'shadow-amber-100'
            },
            rose: {
                bg: 'bg-rose-500',
                bgLight: 'bg-rose-50',
                text: 'text-rose-600',
                border: 'border-rose-500',
                shadow: 'shadow-rose-100'
            }
        };
        return colors[color] || colors.emerald;
    };

    const benefits = [
        { icon: <Clock className="w-5 h-5" />, title: 'Jadwal Fleksibel', desc: 'Atur jadwal sesuai kebutuhan Anda' },
        { icon: <Users className="w-5 h-5" />, title: 'Guru Berkualitas', desc: 'Tutor berpengalaman & tersertifikasi' },
        { icon: <Target className="w-5 h-5" />, title: 'Target Oriented', desc: 'Fokus pada pencapaian tujuan Anda' }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Program Kami</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Berbagai program bimbingan untuk membantu Anda mencapai tujuan akademik dan profesional.
                </p>
            </motion.div>

            {/* Programs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {programs.map((program, index) => {
                    const colorClasses = getColorClasses(program.color);
                    return (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-xl ${program.popular
                                    ? `${colorClasses.border} shadow-xl ${colorClasses.shadow}`
                                    : 'border-slate-200 shadow-lg hover:border-slate-300'
                                }`}
                        >
                            {program.popular && (
                                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${colorClasses.bg} text-white text-xs font-bold px-4 py-1 rounded-full`}>
                                    Populer
                                </div>
                            )}

                            {/* Icon */}
                            <div className={`${colorClasses.bgLight} ${colorClasses.text} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                                {program.icon}
                            </div>

                            {/* Title */}
                            <h2 className="text-xl font-bold text-slate-800 mb-1">{program.title}</h2>
                            <p className={`text-sm ${colorClasses.text} font-medium mb-3`}>{program.subtitle}</p>
                            <p className="text-slate-600 text-sm mb-4">{program.description}</p>

                            {/* Features */}
                            <ul className="space-y-2 mb-6">
                                {program.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                                        <Check className={`w-4 h-4 ${colorClasses.text} mt-0.5 flex-shrink-0`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Price */}
                            <div className="mb-4">
                                <span className="text-slate-500 text-sm">Mulai dari </span>
                                <span className={`${colorClasses.text} font-bold text-lg`}>Rp {program.priceStart}</span>
                                <span className="text-slate-500 text-sm"> /sesi</span>
                            </div>

                            {/* CTA Button */}
                            <Link href="/daftar">
                                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${program.popular
                                        ? `${colorClasses.bg} hover:opacity-90 text-white shadow-lg`
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    }`}>
                                    Daftar Sekarang
                                </button>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* Benefits Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8"
            >
                <h3 className="text-xl font-bold text-slate-800 text-center mb-6">Mengapa Memilih Kami?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-4 bg-white/70 backdrop-blur-sm rounded-xl p-4">
                            <div className="bg-emerald-500 text-white p-2 rounded-lg">
                                {benefit.icon}
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">{benefit.title}</h4>
                                <p className="text-slate-600 text-sm">{benefit.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-10"
            >
                <p className="text-slate-500 text-sm mb-6">
                    Tidak menemukan program yang sesuai? Hubungi kami untuk konsultasi gratis.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/daftar">
                        <button className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40">
                            Daftar Sekarang
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                    <a
                        href="https://wa.me/6281234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-3 rounded-xl font-semibold transition-all border-2 border-slate-200 hover:border-emerald-200">
                            Hubungi Kami
                        </button>
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default ProgramPage;
