'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Calculator,
    Code,
    Atom,
    FlaskConical,
    Leaf,
    BookOpen,
    Languages,
    Music,
    Palette,
    Dumbbell,
    TrendingUp,
    LucideIcon
} from 'lucide-react';
import categoriesData from '@/data/categories.json';

// Icon mapping based on category slug
const iconMap: Record<string, LucideIcon> = {
    'matematika': Calculator,
    'bahasa-inggris': Languages,
    'pemrograman': Code,
    'musik': Music,
    'desain': Palette,
    'fisika': Atom,
    'kimia': FlaskConical,
    'biologi': Leaf,
    'ekonomi': TrendingUp,
    'bahasa-asing': Languages,
    'olahraga': Dumbbell,
};

export default function CategoriesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Jelajahi Mata Pelajaran</h1>
                <p className="text-xl text-gray-600">Temukan guru yang sempurna untuk setiap kebutuhan belajar Anda di sini</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoriesData.map((category, index) => {
                    const IconComponent = iconMap[category.slug] || BookOpen;
                    return (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <Link href={`/categories/${category.slug}`}>
                                <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all group h-full">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <IconComponent className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-blue-900 mb-2">{category.nama}</h2>
                                    <p className="text-gray-600 text-sm mb-4">{category.deskripsi}</p>
                                    <div className="flex items-center justify-end pt-4 border-t border-blue-100">
                                        <span className="text-blue-600 group-hover:translate-x-1 transition-transform text-lg">→</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
