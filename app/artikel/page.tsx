'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';
import Image from 'next/image';

import { blogs } from '@/data/articles';

const ArtikelPage = () => {

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
        </div>
    );
};

export default ArtikelPage;
