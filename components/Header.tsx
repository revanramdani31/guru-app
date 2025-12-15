'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Menu, X } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { path: '/', label: 'Beranda' },
        { path: '/tutors', label: 'Cari Guru' },
        { path: '/categories', label: 'Mata Pelajaran' },
        { path: '/contact', label: 'Kontak' }
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg group-hover:scale-105 transition-transform">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-blue-900">GuruKu</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`text-sm font-medium transition-colors relative ${isActive(link.path)
                                    ? 'text-blue-700'
                                    : 'text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-blue-700"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-blue-700 transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden py-4 border-t border-blue-100"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block py-2 text-sm font-medium transition-colors ${isActive(link.path)
                                    ? 'text-blue-700'
                                    : 'text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </nav>
        </header>
    );
};

export default Header;
