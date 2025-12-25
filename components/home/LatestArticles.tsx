'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogs } from '@/data/articles';
import ArticleCard from '@/components/cards/ArticleCard';

const LatestArticles = () => {
    const featuredBlogs = blogs.slice(0, 3);

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8 md:mb-12">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Tips & Artikel Terbaru</h2>
                        <p className="text-slate-600">Informasi bermanfaat seputar pendidikan.</p>
                    </div>
                    <Link href="/artikel" className="hidden md:flex items-center text-emerald-600 font-semibold hover:gap-2 transition-all">
                        Lihat Semua Artikel <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredBlogs.map((blog, index) => (
                        <ArticleCard key={blog.id} blog={blog} index={index} />
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Link href="/artikel">
                        <button className="w-full py-3 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50">
                            Baca Artikel Lainnya
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestArticles;
