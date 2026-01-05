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
        { path: '/daftar', label: 'Daftar Jadi Siswa', icon: UserPlus },
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
                                        ].map((item, idx) => (
                                            <Link
                                                key={idx}
                                                href={item.href}
                                                className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                        <div className="border-t border-slate-100 mt-1 pt-1">
                                            <p className="px-4 py-1 text-xs text-slate-400 font-medium">Hubungi Kami</p>
                                            <a
                                                href="https://wa.me/6285163215119?text=Halo,%20saya%20ingin%20bertanya%20tentang%20les%20privat"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                                WhatsApp
                                            </a>
                                            <a
                                                href="mailto:info@datanginguru.com"
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                Email
                                            </a>
                                        </div>
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
                        <div className="mt-4 pt-4 border-t border-emerald-50">
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { label: 'Pengaduan', href: '/pengaduan' },
                                    { label: 'Tentang', href: '/tentang' },
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
                            <div className="mt-3 pt-3 border-t border-emerald-50">
                                <p className="text-xs text-slate-400 font-medium mb-2">Hubungi Kami</p>
                                <div className="flex gap-3">
                                    <a
                                        href="https://wa.me/6285163215119?text=Halo,%20saya%20ingin%20bertanya%20tentang%20les%20privat"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                        WhatsApp
                                    </a>
                                    <a
                                        href="mailto:info@datanginguru.com"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </nav>
        </header>
    );
};

export default Header;
