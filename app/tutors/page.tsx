'use client';

import { useState } from 'react';
import TutorCard from '@/components/TutorCard';
import SearchBar from '@/components/SearchBar';
import tutorsData from '@/data/tutors.json';

export default function TutorsPage() {
    const [filteredTutors, setFilteredTutors] = useState(tutorsData);

    const handleSearch = (query: string) => {
        const lowercaseQuery = query.toLowerCase();
        const filtered = tutorsData.filter(
            (tutor) =>
                tutor.nama.toLowerCase().includes(lowercaseQuery) ||
                tutor.mapel.some((mapel) => mapel.toLowerCase().includes(lowercaseQuery)) ||
                tutor.lokasi.toLowerCase().includes(lowercaseQuery)
        );
        setFilteredTutors(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                        Temukan Tutor Terbaik
                    </h1>
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>

            {/* Tutors Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {filteredTutors.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">Tidak ada tutor yang ditemukan</p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 mb-6">
                            Menampilkan {filteredTutors.length} tutor
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTutors.map((tutor) => (
                                <TutorCard key={tutor.id} tutor={tutor} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
