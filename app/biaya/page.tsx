'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, Clock, MapPin, Monitor } from 'lucide-react';

const BiayaPage = () => {
    const pricingPlans = [
        {
            level: 'SD',
            description: 'Kelas 1-6 Sekolah Dasar',
            priceRange: '75.000 - 100.000',
            features: [
                'Semua mata pelajaran SD',
                'Persiapan ujian sekolah',
                'Bantuan PR harian',
                'Laporan perkembangan'
            ]
        },
        {
            level: 'SMP',
            description: 'Kelas 7-9 Sekolah Menengah Pertama',
            priceRange: '100.000 - 150.000',
            features: [
                'Semua mata pelajaran SMP',
                'Persiapan ujian nasional',
                'Bimbingan OSN',
                'Konsultasi jurusan SMA'
            ],
            popular: true
        },
        {
            level: 'SMA',
            description: 'Kelas 10-12 Sekolah Menengah Atas',
            priceRange: '125.000 - 200.000',
            features: [
                'IPA / IPS / Bahasa',
                'Persiapan UTBK-SNBT',
                'Persiapan ujian masuk PTN',
                'Konsultasi jurusan kuliah'
            ]
        }
    ];

    const additionalInfo = [
        { icon: <Clock className="w-5 h-5" />, text: 'Durasi per sesi: 90 menit' },
        { icon: <MapPin className="w-5 h-5" />, text: 'Guru datang ke rumah Anda' },
        { icon: <Monitor className="w-5 h-5" />, text: 'Tersedia juga mode online' }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Biaya Les Privat</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Investasi terbaik untuk pendidikan anak Anda. Harga terjangkau dengan kualitas terjamin.
                </p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {pricingPlans.map((plan, index) => (
                    <motion.div
                        key={plan.level}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative bg-white rounded-2xl p-6 border-2 transition-all ${plan.popular
                                ? 'border-emerald-500 shadow-xl shadow-emerald-100'
                                : 'border-slate-200 shadow-lg hover:border-emerald-200'
                            }`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                                Populer
                            </div>
                        )}

                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-1">{plan.level}</h2>
                            <p className="text-slate-500 text-sm">{plan.description}</p>
                        </div>

                        <div className="text-center mb-6">
                            <div className="text-emerald-600 font-bold">
                                <span className="text-sm">Rp</span>
                                <span className="text-3xl">{plan.priceRange.split(' - ')[0]}</span>
                                <span className="text-slate-400 text-sm font-normal"> - </span>
                                <span className="text-2xl">{plan.priceRange.split(' - ')[1]}</span>
                            </div>
                            <p className="text-slate-500 text-sm">per sesi</p>
                        </div>

                        <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Link href="/daftar">
                            <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular
                                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                                    : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600'
                                }`}>
                                Daftar Sekarang
                            </button>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Additional Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-emerald-50 rounded-2xl p-6 md:p-8"
            >
                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                    {additionalInfo.map((info, index) => (
                        <div key={index} className="flex items-center gap-3 text-slate-700">
                            <div className="text-emerald-600">{info.icon}</div>
                            <span className="text-sm font-medium">{info.text}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Note */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center mt-10"
            >
                <p className="text-slate-500 text-sm mb-6">
                    * Harga dapat bervariasi tergantung lokasi, mata pelajaran khusus, dan kualifikasi guru.
                    <br />Hubungi kami untuk konsultasi gratis.
                </p>
                <Link href="/daftar">
                    <button className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40">
                        Daftar Les Privat
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default BiayaPage;
