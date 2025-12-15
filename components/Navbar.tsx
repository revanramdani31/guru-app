'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">GuruKu</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                            Beranda
                        </Link>
                        <Link href="/tutors" className="text-gray-700 hover:text-blue-600 transition">
                            Tutor
                        </Link>
                        <Link href="/categories" className="text-gray-700 hover:text-blue-600 transition">
                            Kategori
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
                            Kontak
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            href="/"
                            className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/tutors"
                            className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Tutor
                        </Link>
                        <Link
                            href="/categories"
                            className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Kategori
                        </Link>
                        <Link
                            href="/contact"
                            className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Kontak
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
