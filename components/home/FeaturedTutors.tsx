'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import tutorsData from '@/data/tutors.json';
import TutorCard, { Tutor } from '@/components/cards/TutorCard';

const FeaturedTutors = () => {
    // Filter hanya tutor aktif, ambil 4 pertama
    const featuredTutors = (tutorsData as Tutor[]).filter(tutor => tutor.active !== false).slice(0, 4);

    return (
        <section className="py-12 md:py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Guru Pilihan Kami</h2>
                    <p className="text-slate-600">Pengajar berpengalaman yang siap membantu Anda</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {featuredTutors.map((tutor, index) => (
                        <TutorCard key={tutor.id} tutor={tutor} index={index} />
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/tutors">
                        <button className="px-8 py-3 bg-white text-emerald-600 border border-emerald-200 rounded-xl font-semibold hover:bg-emerald-50 transition-all inline-flex items-center gap-2">
                            Lihat Semua Guru Privat <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedTutors;
