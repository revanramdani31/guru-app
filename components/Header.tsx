'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, UserPlus, Briefcase, Home, Users, GraduationCap, Calculator, Newspaper, AlignJustify } from 'lucide-react';
import Image from 'next/image';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { path: '/', label: 'Beranda', icon: Home },
        { path: '/tutors', label: 'Guru Kami', icon: Users },
        { path: '/program', label: 'Program Kami', icon: GraduationCap },
        { path: '/biaya', label: 'Simulasi Biaya', icon: Calculator },
        { path: '/daftar', label: 'Daftar Siswa', icon: UserPlus },
        { path: '/karir', label: 'Daftar Jadi Guru', icon: Briefcase },
        { path: '/artikel', label: 'Artikel Kami', icon: Newspaper },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="group-hover:scale-105 transition-transform">
                            <Image
                                src="/favicon.ico"
                                alt="Datangin Guru Logo"
                                width={40}
                                height={40}
                                className="w-auto h-10 object-contain"
                            />
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

                        {/* More Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                                className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
                            >
                                <AlignJustify className="w-6 h-6" />
                            </button>

                            <AnimatePresence>
                                {isMoreMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        onMouseLeave={() => setIsMoreMenuOpen(false)}
                                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden"
                                    >
                                        {[
                                            { label: 'Pengaduan', href: '/pengaduan' },
                                            { label: 'Tentang', href: '/tentang' },
                                            { label: 'Hubungi Kami', href: 'https://wa.me/6281234567890' },
                                        ].map((item, idx) => (
                                            <Link
                                                key={idx}
                                                href={item.href}
                                                className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
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


                        {/* More Menu Items for Mobile */}
                        <div className="mt-4 pt-4 border-t border-emerald-50 grid grid-cols-2 gap-2">
                            {[
                                { label: 'Pengaduan', href: '/pengaduan' },
                                { label: 'Tentang', href: '/tentang' },
                                { label: 'Hubungi Kami', href: 'https://wa.me/6281234567890' },
                            ].map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-xs text-slate-500 hover:text-emerald-600 py-2"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </nav>
        </header>
    );
};

export default Header;
