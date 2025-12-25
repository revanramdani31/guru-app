'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Award, Users, BookOpen, ShieldCheck, GraduationCap } from 'lucide-react';
import Image from 'next/image';

const AboutPage = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const values = [
        {
            icon: <Award className="w-8 h-8 text-emerald-600" />,
            title: "Kualitas Terbaik",
            description: "Kami hanya menghadirkan tutor terbaik lulusan PTN ternama (UI, ITB, UGM, Unpad, dll) yang telah melalui proses seleksi ketat."
        },
        {
            icon: <Heart className="w-8 h-8 text-rose-500" />,
            title: "Pendekatan Personal",
            description: "Setiap siswa unik. Kami menyesuaikan metode pengajaran dengan gaya belajar dan kebutuhan spesifik masing-masing siswa."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
            title: "Terpercaya",
            description: "Ribuan siswa dan orang tua telah mempercayakan pendidikan mereka kepada kami. Transparansi dan integritas adalah prioritas kami."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Modern Hero Section */}
            <section className="relative bg-emerald-600 text-white overflow-hidden py-28">
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        {/* Glass Icon */}
                        <div className="mb-8 p-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl shadow-emerald-700/20 relative overflow-hidden group hover:bg-white/20 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <GraduationCap className="w-16 h-16 text-white relative z-10 drop-shadow-md" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-white drop-shadow-sm">
                            Tentang <span className="bg-gradient-to-r from-emerald-50 to-emerald-100 bg-clip-text text-transparent">datanginguru</span>
                        </h1>

                        <p className="text-lg md:text-xl text-emerald-50/90 leading-relaxed font-medium drop-shadow-sm text-justify">
                            Datangin Guru adalah lembaga les privat yang menghadirkan guru langsung ke rumah siswa. Kami menyediakan bimbingan belajar untuk semua jenjang—dari SD, SMP, SMA, hingga mahasiswa dan profesional. Dengan jadwal fleksibel, metode personal, dan guru berkualitas, Datangin Guru menghadirkan pengalaman belajar yang lebih fokus, nyaman, dan efektif tanpa harus keluar rumah
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

            {/* Vision Mission */}
            <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1 relative z-20">
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-emerald-500 hover:-translate-y-1 transition-transform"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="w-6 h-6 text-emerald-600" />
                            <h3 className="text-xl font-bold text-slate-800">Visi Kami</h3>
                        </div>
                        <p className="text-slate-600 font-medium italic">
                            &quot;Membantu setiap siswa belajar dengan nyaman, personal, dan berkualitas melalui layanan guru privat yang hadir langsung ke rumah&quot;
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-500 hover:-translate-y-1 transition-transform"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-6 h-6 text-blue-600" />
                            <h3 className="text-xl font-bold text-slate-800">Misi Kami</h3>
                        </div>
                        <ul className="space-y-3 text-slate-600 text-sm">
                            {[
                                "Menyediakan guru profesional dan berkompeten untuk semua jenjang dan bidang keilmuan.",
                                "Menghadirkan proses belajar yang personal, ramah, dan sesuai kebutuhan setiap siswa.",
                                "Membangun lingkungan belajar yang aman, menyenangkan, dan berorientasi pada hasil.",
                                "Mengutamakan kejujuran, tanggung jawab, serta pelayanan terbaik bagi siswa dan orang tua.",
                                "Mendukung perkembangan karakter, disiplin, dan kepercayaan diri siswa melalui pendampingan berkualitas."
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">Nilai Utama Kami</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Prinsip yang menjadi landasan kami dalam melayani ribuan siswa di seluruh Indonesia.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((val, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow text-center"
                            >
                                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    {val.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">{val.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {val.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
