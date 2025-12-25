'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, UserCheck, Star } from 'lucide-react';
import tutorsData from '@/data/tutors.json';
import TutorCard, { Tutor } from '@/components/cards/TutorCard';

const TutorsPage = () => {
    const tutors = tutorsData as Tutor[];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative bg-emerald-600 text-white overflow-hidden pt-20 pb-32">
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight text-white drop-shadow-sm">
                            Guru Kami
                        </h1>

                        {/* Glass Stats Card */}
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-4xl mx-auto border border-white/20 shadow-xl shadow-emerald-900/10 mb-8">
                            <p className="text-emerald-50 text-lg leading-relaxed mb-6 font-medium">
                                <span className="font-bold text-white">Datangin Guru</span> didukung oleh pengajar berkualifikasi lulusan <strong>S1 hingga S3</strong>,
                                sehingga setiap siswa mendapatkan bimbingan dari tenaga pendidik yang kompeten, berpengalaman, dan sesuai bidang keilmuannya.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 pt-6 border-t border-white/20">
                                <div className="flex items-center gap-2 bg-emerald-800/30 border border-emerald-400/30 text-emerald-50 px-5 py-2.5 rounded-full shadow-sm">
                                    <Users className="w-4 h-4 text-emerald-300" />
                                    <span className="font-bold text-sm">5000+ Siswa</span>
                                </div>
                                <div className="flex items-center gap-2 bg-emerald-800/30 border border-emerald-400/30 text-emerald-50 px-5 py-2.5 rounded-full shadow-sm">
                                    <UserCheck className="w-4 h-4 text-emerald-300" />
                                    <span className="font-bold text-sm">2000+ Tutor</span>
                                </div>
                                <div className="flex items-center gap-2 bg-emerald-800/30 border border-emerald-400/30 text-emerald-50 px-5 py-2.5 rounded-full shadow-sm">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold text-sm">4.87/5 Rating</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-emerald-50 font-medium max-w-2xl mx-auto">
                            Berikut adalah sebagian guru berkualitas yang bergabung bersama kami.
                            Daftar sekarang dan kami akan carikan guru terbaik untuk Anda.
                        </p>
                    </motion.div>
                </div>

                {/* Curved Divider */}
                <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0]">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(113%+1.3px)] h-[60px] fill-slate-50 opacity-100">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
                    </svg>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-1 relative z-20">


                {/* Tutors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {tutors.map((tutor, index) => (
                        <TutorCard key={tutor.id} tutor={tutor} index={index} />
                    ))}
                </div>

                {/* Info Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10 text-center"
                >
                    <p className="text-emerald-800">
                        💡 <strong>Bagaimana cara mendapatkan guru?</strong> Cukup isi formulir pendaftaran,
                        tim kami akan mencarikan guru yang sesuai dengan kebutuhan Anda.
                    </p>
                </motion.div>

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
        </div>
    );
};

export default TutorsPage;
