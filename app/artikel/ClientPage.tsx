'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, User, Search } from 'lucide-react';
import Image from 'next/image';

import { blogs } from '@/data/articles';
import ArticleCard from '@/components/cards/ArticleCard';

const ArtikelPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('Semua');

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

    const filteredBlogs = selectedCategory === 'Semua'
        ? blogs
        : blogs.filter(blog => blog.category === selectedCategory);

    const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
    const gridBlogs = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

    return (

        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <section className="relative bg-emerald-600 text-white overflow-hidden pt-20 pb-32 mb-12">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">Blog & Artikel</h1>
                        <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto font-medium leading-relaxed">
                            Tips belajar, panduan akademik, dan informasi pendidikan untuk membantu kesuksesan belajarmu.
                        </p>
                    </motion.div>
                </div>
                {/* Curved Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(113%+1.3px)] h-[60px] fill-slate-50 opacity-100">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
                    </svg>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

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
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                <AnimatePresence mode="wait">
                    {filteredBlogs.length > 0 ? (
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Featured Blog */}
                            {featuredBlog && (
                                <div
                                    className="mb-12"
                                >
                                    <Link href={`/artikel/${featuredBlog.id}`} className="block relative bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 group cursor-pointer hover:shadow-2xl transition-all">
                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            <div className="relative h-64 md:h-80">
                                                <Image
                                                    src={featuredBlog.image}
                                                    alt={featuredBlog.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6 md:p-8 flex flex-col justify-center">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(featuredBlog.category)}`}>
                                                        {featuredBlog.category}
                                                    </span>
                                                    <span className="text-slate-400 text-xs">•</span>
                                                    <span className="text-slate-500 text-xs flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {featuredBlog.readTime} baca
                                                    </span>
                                                </div>
                                                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                                                    {featuredBlog.title}
                                                </h2>
                                                <p className="text-slate-600 mb-4 line-clamp-3">{featuredBlog.excerpt}</p>
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                                        <User className="w-5 h-5 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-800">{featuredBlog.author}</p>
                                                        <p className="text-xs text-slate-500">{featuredBlog.date}</p>
                                                    </div>
                                                </div>
                                                <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all w-fit">
                                                    Baca Selengkapnya
                                                    <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )}

                            {/* Blog Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {gridBlogs.map((blog, index) => (
                                    <ArticleCard key={blog.id} blog={blog} index={index} />
                                ))}
                            </div>

                            {/* Load More */}
                            {filteredBlogs.length > 4 && (
                                <div className="text-center">
                                    <button className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25">
                                        Muat Lebih Banyak
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Tidak ada artikel ditemukan</h3>
                            <p className="text-slate-500">
                                Belum ada artikel untuk kategori "{selectedCategory}".
                            </p>
                            <button
                                onClick={() => setSelectedCategory('Semua')}
                                className="mt-6 text-emerald-600 font-semibold hover:underline"
                            >
                                Lihat Semua Artikel
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ArtikelPage;
