y'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Calendar, User, Tag } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: string;
    author: string;
    category: string;
    tags: string[];
}

interface ArticleCardProps {
    blog: Article;
    index?: number;
}

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

const ArticleCard = ({ blog, index = 0 }: ArticleCardProps) => {
    return (
        <Link href={`/artikel/${blog.id}`}>
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 group hover:shadow-xl transition-all cursor-pointer h-full flex flex-col"
            >
                <div className="relative h-48 overflow-hidden shrink-0">
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
                <div className="p-5 flex flex-col flex-grow">
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
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">{blog.excerpt}</p>

                    {/* Tags */}
                    {blog.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Author */}
                    <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-sm text-slate-600">{blog.author}</span>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
};

export default ArticleCard;
