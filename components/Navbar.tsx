'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';

export default function Navbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Get current filter values from URL
    const currentSearch = searchParams.get('search') || '';
    const currentTipe = searchParams.get('tipe') || '';
    const currentLokasi = searchParams.get('lokasi') || '';
    const currentTarif = searchParams.get('tarif') || '';
    const currentTingkat = searchParams.get('tingkat') || '';

    // Filter options
    const tipeOptions = [
        { value: '', label: 'Semua Tipe' },
        { value: 'tatap_muka', label: 'Tatap Muka' },
        { value: 'online', label: 'Online' },
        { value: 'keduanya', label: 'Keduanya' },
    ];

    const lokasiOptions = [
        { value: '', label: 'Semua Lokasi' },
        { value: 'Jakarta Selatan', label: 'Jakarta Selatan' },
        { value: 'Jakarta Pusat', label: 'Jakarta Pusat' },
        { value: 'Jakarta Barat', label: 'Jakarta Barat' },
        { value: 'Bandung', label: 'Bandung' },
        { value: 'Surabaya', label: 'Surabaya' },
        { value: 'Yogyakarta', label: 'Yogyakarta' },
        { value: 'Semarang', label: 'Semarang' },
        { value: 'Bali', label: 'Bali' },
        { value: 'Medan', label: 'Medan' },
    ];

    const tarifOptions = [
        { value: '', label: 'Semua Tarif' },
        { value: 'low', label: '< Rp 150.000' },
        { value: 'mid', label: 'Rp 150.000 - 175.000' },
        { value: 'high', label: '> Rp 175.000' },
    ];

    const tingkatOptions = [
        { value: '', label: 'Semua Tingkat' },
        { value: 'SD', label: 'SD' },
        { value: 'SMP', label: 'SMP' },
        { value: 'SMA', label: 'SMA' },
        { value: 'Kuliah', label: 'Kuliah' },
    ];

    const updateFilters = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/tutors?${params.toString()}`);
    }, [router, searchParams]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        updateFilters('search', search);
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">GuruKu</span>
                        </Link>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <form onSubmit={handleSearch} className="w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="search"
                                    defaultValue={currentSearch}
                                    placeholder="Cari tutor..."
                                    className="w-full px-4 py-2 pr-10 text-gray-900 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Filter Button - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filter
                        </button>
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
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
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

            {/* Filter Dropdown - Desktop */}
            {isFilterOpen && (
                <div className="hidden md:block bg-gray-50 border-t border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="grid grid-cols-4 gap-4">
                            {/* Tipe Kelas */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Kelas</label>
                                <select
                                    value={currentTipe}
                                    onChange={(e) => updateFilters('tipe', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    {tipeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Lokasi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                                <select
                                    value={currentLokasi}
                                    onChange={(e) => updateFilters('lokasi', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    {lokasiOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Tarif */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tarif</label>
                                <select
                                    value={currentTarif}
                                    onChange={(e) => updateFilters('tarif', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    {tarifOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Tingkat */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat</label>
                                <select
                                    value={currentTingkat}
                                    onChange={(e) => updateFilters('tingkat', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    {tingkatOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-4 pt-4 pb-3 space-y-3">
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                name="search"
                                defaultValue={currentSearch}
                                placeholder="Cari tutor..."
                                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </form>

                        {/* Mobile Filters */}
                        <div className="space-y-3">
                            <select
                                value={currentTipe}
                                onChange={(e) => updateFilters('tipe', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            >
                                {tipeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>

                            <select
                                value={currentLokasi}
                                onChange={(e) => updateFilters('lokasi', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            >
                                {lokasiOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>

                            <select
                                value={currentTarif}
                                onChange={(e) => updateFilters('tarif', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            >
                                {tarifOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>

                            <select
                                value={currentTingkat}
                                onChange={(e) => updateFilters('tingkat', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            >
                                {tingkatOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Mobile Navigation Links */}
                        <div className="pt-3 border-t space-y-1">
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
                </div>
            )}
        </nav>
    );
}
