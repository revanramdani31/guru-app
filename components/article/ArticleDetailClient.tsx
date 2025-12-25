'use client';

import { blogs } from '@/data/articles';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ArticleDetailClientProps {
    id: number;
}

const ArticleDetailClient = ({ id }: ArticleDetailClientProps) => {
    const blog = blogs.find((b) => b.id === id);

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

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Artikel Tidak Ditemukan</h1>
                    <Link href="/artikel" className="text-emerald-600 hover:underline">
                        Kembali ke Daftar Artikel
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* Header / Hero */}
            <div className="bg-slate-900 relative pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-600/10"></div>

                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/artikel" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Kembali ke Blog
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 ${getCategoryColor(blog.category)}`}>
                            {blog.category}
                        </span>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold !text-emerald-500 mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-slate-300 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4" />
                                </div>
                                <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{blog.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{blog.readTime} baca</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                        <div className="relative h-64 md:h-96 w-full">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        {/* Article Body */}
                        <div
                            className="prose prose-lg prose-slate prose-emerald max-w-none 
                            prose-headings:font-bold prose-headings:!text-emerald-500 
                            prose-p:text-slate-600 prose-p:leading-relaxed
                            prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-slate-800
                            prose-li:text-slate-600"
                            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
                        />

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-slate-100">
                            <h4 className="text-sm font-semibold text-slate-900 mb-4">Tags:</h4>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <span key={index} className="inline-flex items-center gap-1 text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer">
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </article>
        </div>
    );
};

export default ArticleDetailClient;
