'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';
import Image from 'next/image';

const ArtikelPage = () => {
    const blogs = [
        {
            id: 1,
            title: '10 Tips Efektif Belajar untuk Menghadapi UTBK 2025',
            excerpt: 'Persiapkan diri menghadapi UTBK 2025 dengan strategi belajar yang terbukti ampuh. Mulai dari manajemen waktu hingga teknik mengerjakan soal.',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
            date: '20 Desember 2024',
            readTime: '8 menit',
            author: 'Tim Akademik',
            category: 'Tips Belajar',
            tags: ['UTBK', 'Belajar', 'Tips']
        },
        {
            id: 2,
            title: 'Cara Meningkatkan Skor TOEFL dalam 30 Hari',
            excerpt: 'Panduan lengkap untuk meningkatkan skor TOEFL Anda secara signifikan dalam waktu satu bulan dengan metode yang teruji.',
            image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80',
            date: '18 Desember 2024',
            readTime: '10 menit',
            author: 'English Team',
            category: 'Bahasa Inggris',
            tags: ['TOEFL', 'English', 'Tips']
        },
        {
            id: 3,
            title: 'Panduan Lengkap Menulis Proposal Skripsi',
            excerpt: 'Langkah demi langkah menyusun proposal skripsi yang baik dan benar. Dari pemilihan judul hingga metodologi penelitian.',
            image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
            date: '15 Desember 2024',
            readTime: '12 menit',
            author: 'Dr. Ahmad Fauzi',
            category: 'Akademik',
            tags: ['Skripsi', 'Proposal', 'Penelitian']
        },
        {
            id: 4,
            title: 'Matematika Dasar: Rumus-Rumus yang Wajib Dikuasai SMA',
            excerpt: 'Kumpulan rumus matematika penting untuk siswa SMA. Dilengkapi dengan contoh soal dan pembahasan.',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
            date: '12 Desember 2024',
            readTime: '15 menit',
            author: 'Pak Budi Santoso',
            category: 'Matematika',
            tags: ['Matematika', 'SMA', 'Rumus']
        },
        {
            id: 5,
            title: 'Teknik Menulis Jurnal Ilmiah yang Baik dan Benar',
            excerpt: 'Pelajari cara menulis jurnal ilmiah yang sesuai standar publikasi nasional dan internasional.',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
            date: '10 Desember 2024',
            readTime: '10 menit',
            author: 'Prof. Siti Rahayu',
            category: 'Akademik',
            tags: ['Jurnal', 'Publikasi', 'Akademik']
        },
        {
            id: 6,
            title: 'Cara Memilih Jurusan Kuliah yang Tepat',
            excerpt: 'Bingung memilih jurusan? Simak panduan lengkap untuk menemukan jurusan kuliah yang sesuai dengan minat dan bakatmu.',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
            date: '8 Desember 2024',
            readTime: '7 menit',
            author: 'Konselor Akademik',
            category: 'Karir',
            tags: ['Kuliah', 'Jurusan', 'Karir']
        },
        {
            id: 7,
            title: 'Memahami Fisika Dasar: Hukum Newton',
            excerpt: 'Penjelasan mudah tentang Hukum Newton I, II, dan III beserta contoh penerapannya dalam kehidupan sehari-hari.',
            image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80',
            date: '5 Desember 2024',
            readTime: '9 menit',
            author: 'Ibu Dewi Lestari',
            category: 'Fisika',
            tags: ['Fisika', 'SMA', 'Hukum Newton']
        }
    ];

    const categories = ['Semua', 'Tips Belajar', 'Bahasa Inggris', 'Akademik', 'Matematika', 'Fisika', 'Karir'];

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            'Tips Belajar': 'bg-emerald-100 text-emerald-700',
            'Bahasa Inggris': 'bg-blue-100 text-blue-700',
            'Akademik': 'bg-purple-100 text-purple-700',
            'Matematika': 'bg-amber-100 text-amber-700',
            'Fisika': 'bg-cyan-100 text-cyan-700',
            'Karir': 'bg-rose-100 text-rose-700'
        };
        return colors[category] || 'bg-slate-100 text-slate-700';
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Blog & Artikel</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Tips belajar, panduan akademik, dan informasi pendidikan untuk membantu kesuksesan belajarmu.
                </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap justify-center gap-2 mb-10"
            >
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${index === 0
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </motion.div>

            {/* Featured Blog */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
            >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 group cursor-pointer">
                    <div className="grid md:grid-cols-2">
                        <div className="relative h-64 md:h-80">
                            <Image
                                src={blogs[0].image}
                                alt={blogs[0].title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(blogs[0].category)}`}>
                                    {blogs[0].category}
                                </span>
                                <span className="text-slate-400 text-xs">•</span>
                                <span className="text-slate-500 text-xs flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {blogs[0].readTime} baca
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                                {blogs[0].title}
                            </h2>
                            <p className="text-slate-600 mb-4 line-clamp-3">{blogs[0].excerpt}</p>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">{blogs[0].author}</p>
                                    <p className="text-xs text-slate-500">{blogs[0].date}</p>
                                </div>
                            </div>
                            <button className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all w-fit">
                                Baca Selengkapnya
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {blogs.slice(1).map((blog, index) => (
                    <motion.article
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index + 1) * 0.1 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 group hover:shadow-xl transition-all cursor-pointer"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getCategoryColor(blog.category)}`}>
                                    {blog.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                <Clock className="w-3 h-3" />
                                <span>{blog.readTime} baca</span>
                                <span>•</span>
                                <Calendar className="w-3 h-3" />
                                <span>{blog.date}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                {blog.title}
                            </h3>
                            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {blog.tags.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-emerald-600" />
                                </div>
                                <span className="text-sm text-slate-600">{blog.author}</span>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            {/* Load More */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-center"
            >
                <button className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25">
                    Muat Lebih Banyak
                    <ArrowRight className="w-5 h-5" />
                </button>
            </motion.div>
        </div>
    );
};

export default ArtikelPage;
