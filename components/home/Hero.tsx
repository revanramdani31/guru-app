'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative bg-emerald-600 text-white overflow-hidden pt-24 pb-32 -mt-10 md:-mt-14">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
            >
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
                        Jasa Les Privat Tanpa Ribet
                        <span className="block text-emerald-100 text-shadow-sm mt-2">Guru Datang ke Rumah</span>
                    </h1>
                    <p className="text-emerald-50 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-sm">
                        Temukan guru privat terbaik untuk TK, SD, SMP, SMA, hingga Umum.
                        Belajar jadi lebih fokus, nyaman, dan efektif.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
                        <Link href="/daftar" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                Cari Guru Sekarang
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </Link>
                        <Link href="/biaya" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 text-lg rounded-xl font-semibold transition-all border border-emerald-600">
                                <Calculator className="w-5 h-5 mr-2" />
                                Simulasi Biaya Les
                            </button>
                        </Link>
                        <a
                            href="https://wa.me/6285163215119?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20les%20privat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <button className="w-full sm:w-auto inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1fb855] text-white px-8 py-4 text-lg rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Hubungi Kami
                            </button>
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Stats Summary */}
            <div className="mt-16 max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Siswa Aktif', value: '5000+' },
                        { label: 'Guru Terdaftar', value: '2000+' },
                        { label: 'Rating Rata-rata', value: '4.8/5' },
                        { label: 'Kota Jangkauan', value: '50+' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10"
                        >
                            <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                            <p className="text-emerald-100 text-xs md:text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Curved Divider */}
            <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(113%+1.3px)] h-[60px] fill-white opacity-100">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
