'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, SlidersHorizontal, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import tutorsData from '@/data/tutors.json';

interface Tutor {
    id: number;
    slug: string;
    nama: string;
    mapel: string[];
    harga: number;
    lokasi: string;
    tipe: string;
    tingkat: string[];
    foto: string;
    deskripsi: string;
    pengalaman: string;
    pendidikan: string;
    kategori: string[];
    whatsapp: string;
    email: string;
}

const TutorsPage = () => {
    const tutors = tutorsData as Tutor[];
    const searchParams = useSearchParams();
    const urlSearchQuery = searchParams.get('search') || '';

    const [filteredTutors, setFilteredTutors] = useState<Tutor[]>(tutors);
    const [searchTerm, setSearchTerm] = useState(urlSearchQuery);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Get max price from data
    const maxPrice = Math.max(...tutors.map(t => t.harga));

    // Filter States
    const [priceRange, setPriceRange] = useState([0, maxPrice]);
    const [selectedClassType, setSelectedClassType] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [locationFilter, setLocationFilter] = useState('');

    // Extract unique locations for filter
    const uniqueLocations = [...new Set(tutors.map(t => t.lokasi))].sort();

    // Format currency to IDR
    const formatIDR = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
    };

    // Auto-apply search from URL on initial load
    useEffect(() => {
        if (urlSearchQuery) {
            const result = tutors.filter(tutor =>
                tutor.nama.toLowerCase().includes(urlSearchQuery.toLowerCase()) ||
                tutor.mapel.some(sub => sub.toLowerCase().includes(urlSearchQuery.toLowerCase())) ||
                tutor.deskripsi.toLowerCase().includes(urlSearchQuery.toLowerCase())
            );
            setFilteredTutors(result);
        }
    }, [urlSearchQuery, tutors]);

    const handleSearch = () => {
        let result = tutors;

        // Search Filter
        if (searchTerm) {
            result = result.filter(tutor =>
                tutor.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tutor.mapel.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase())) ||
                tutor.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Price Filter
        result = result.filter(tutor =>
            tutor.harga >= priceRange[0] && tutor.harga <= priceRange[1]
        );

        // Class Type Filter
        if (selectedClassType !== 'all') {
            result = result.filter(tutor =>
                tutor.tipe === selectedClassType || tutor.tipe === 'keduanya'
            );
        }

        // Education Level Filter
        if (selectedLevel !== 'all') {
            result = result.filter(tutor =>
                tutor.tingkat.includes(selectedLevel)
            );
        }

        // Location Filter
        if (locationFilter) {
            result = result.filter(tutor =>
                tutor.lokasi === locationFilter
            );
        }

        setFilteredTutors(result);
    };

    const resetFilters = () => {
        setPriceRange([0, maxPrice]);
        setSelectedClassType('all');
        setSelectedLevel('all');
        setLocationFilter('');
        setSearchTerm('');
        setFilteredTutors(tutors);
    };

    const getClassTypeLabel = (type: string) => {
        switch (type) {
            case 'online': return 'Online';
            case 'tatap_muka': return 'Tatap Muka';
            case 'keduanya': return 'Online & Tatap Muka';
            default: return '';
        }
    };

    const hasActiveFilters = searchTerm || locationFilter || selectedClassType !== 'all' || selectedLevel !== 'all' || priceRange[0] !== 0 || priceRange[1] !== maxPrice;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Cari Guru Sempurna Anda</h1>
                <p className="text-xl text-gray-600">Jelajahi jaringan guru berpengalaman dan berkualitas kami</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-4">
                    <Button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full"
                    >
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Filter & Pencarian
                    </Button>
                </div>

                {/* Sidebar Filters */}
                <motion.div
                    className={`lg:block ${isFilterOpen ? 'block' : 'hidden'} bg-white p-6 rounded-2xl border-2 border-blue-100 h-fit sticky top-24`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-blue-900">Filter</h2>
                        {hasActiveFilters && (
                            <button
                                onClick={resetFilters}
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                            >
                                <X className="w-3 h-3 mr-1" /> Reset
                            </button>
                        )}
                    </div>

                    {/* Search Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cari</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Nama, Mapel..."
                                className="w-full pl-10 pr-4 py-2 border-2 border-blue-100 rounded-lg focus:border-blue-400 focus:outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Class Type Filter */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Kelas</label>
                        <div className="flex flex-col gap-2">
                            {[
                                { value: 'all', label: 'Semua' },
                                { value: 'online', label: 'Online' },
                                { value: 'tatap_muka', label: 'Tatap Muka' }
                            ].map((type) => (
                                <label key={type.value} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="classType"
                                        checked={selectedClassType === type.value}
                                        onChange={() => setSelectedClassType(type.value)}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600">
                                        {type.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Education Level Filter */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tingkat Pendidikan</label>
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="w-full p-2 border-2 border-blue-100 rounded-lg focus:border-blue-400 focus:outline-none text-sm bg-white"
                        >
                            <option value="all">Semua Tingkat</option>
                            <option value="SD">SD</option>
                            <option value="SMP">SMP</option>
                            <option value="SMA">SMA</option>
                            <option value="Kuliah">Kuliah</option>
                        </select>
                    </div>

                    {/* Location Filter */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="w-full p-2 border-2 border-blue-100 rounded-lg focus:border-blue-400 focus:outline-none text-sm bg-white"
                        >
                            <option value="">Semua Lokasi</option>
                            {uniqueLocations.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price Range Slider */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Harga per Jam</label>
                        <div className="px-1">
                            <Slider
                                defaultValue={[0, maxPrice]}
                                value={priceRange}
                                min={0}
                                max={maxPrice}
                                step={10000}
                                onValueChange={setPriceRange}
                                className="mb-3"
                            />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{formatIDR(priceRange[0])}</span>
                            <span>{formatIDR(priceRange[1])}</span>
                        </div>
                    </div>

                    {/* Search Button */}
                    <Button
                        onClick={handleSearch}
                        className="w-full py-3"
                    >
                        <Search className="w-4 h-4 mr-2" />
                        Cari Guru
                    </Button>
                </motion.div>

                {/* Tutor List Grid */}
                <div className="lg:col-span-3">
                    <div className="mb-4 text-gray-600 text-sm">
                        Menampilkan {filteredTutors.length} guru
                    </div>

                    {filteredTutors.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border-2 border-blue-50">
                            <p className="text-xl text-gray-600 mb-2">Tidak ada guru yang ditemukan.</p>
                            <p className="text-gray-500 mb-4">Coba sesuaikan filter pencarian Anda.</p>
                            <Button onClick={resetFilters} variant="outline">
                                Reset Semua Filter
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredTutors.map((tutor, index) => (
                                <motion.div
                                    key={tutor.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                >
                                    <Link href={`/tutors/${tutor.slug}`}>
                                        <div className="bg-white border-2 border-blue-100 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all group h-full flex flex-col">
                                            <div className="h-48 overflow-hidden relative bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                                                    👨‍🏫
                                                </div>
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 uppercase tracking-wide">
                                                    {getClassTypeLabel(tutor.tipe)}
                                                </div>
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h2 className="text-2xl font-semibold text-blue-900 mb-2">{tutor.nama}</h2>

                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {tutor.mapel.slice(0, 3).map((subject, idx) => (
                                                        <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                                            {subject}
                                                        </span>
                                                    ))}
                                                    {tutor.mapel.length > 3 && (
                                                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                                                            +{tutor.mapel.length - 3}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="text-sm">{tutor.lokasi}</span>
                                                </div>

                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tutor.deskripsi}</p>

                                                <div className="mt-auto pt-4 border-t border-blue-100 flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">{tutor.pengalaman} pengalaman</span>
                                                    <span className="text-blue-600 font-bold text-lg">{formatIDR(tutor.harga)}/jam</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorsPage;
