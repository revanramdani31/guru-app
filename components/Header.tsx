'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Menu, X, UserPlus, Briefcase } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { path: '/', label: 'Beranda' },
        { path: '/tutors', label: 'Guru Kami' },
        { path: '/biaya', label: 'Biaya' },
        { path: '/daftar', label: 'Daftar Siswa', icon: UserPlus },
        { path: '/karir', label: 'Daftar Jadi Guru', icon: Briefcase },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-slate-800 leading-tight">datanginguru</span>
                            <span className="text-xs text-emerald-600 font-medium -mt-1">Privat</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`text-sm font-medium transition-colors relative py-1 ${isActive(link.path)
                                    ? 'text-emerald-600'
                                    : 'text-slate-600 hover:text-emerald-500'
                                    }`}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -bottom-[20px] left-0 right-0 h-0.5 bg-emerald-500"
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
                        className="md:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors"
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
                        className="md:hidden py-4 border-t border-emerald-100"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center gap-2 py-3 text-sm font-medium transition-colors ${isActive(link.path)
                                    ? 'text-emerald-600'
                                    : 'text-slate-600 hover:text-emerald-500'
                                    }`}
                            >
                                {link.icon && <link.icon className="w-4 h-4" />}
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/daftar" onClick={() => setIsMenuOpen(false)}>
                            <button className="w-full mt-3 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-medium transition-all">
                                Mulai Belajar
                            </button>
                        </Link>
                    </motion.div>
                )}
            </nav>
        </header>
    );
};

export default Header;
