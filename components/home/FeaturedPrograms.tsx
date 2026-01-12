'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { programs } from '@/data/programs';
import ProgramCard from '@/components/cards/ProgramCard';

const FeaturedPrograms = () => {
    const startPrograms = programs.slice(0, 3);

    return (
        <section className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8 md:mb-12">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Program Unggulan</h2>
                        <p className="text-slate-600">Pilih jenjang pendidikan yang sesuai dengan kebutuhan.</p>
                    </div>
                    <Link href="/program" className="hidden md:flex items-center text-emerald-700 font-semibold hover:gap-2 transition-all">
                        Lihat Semua Program <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {startPrograms.map((program, index) => (
                        <ProgramCard key={program.id} program={program as any} index={index} />
                    ))}
                </div>
                <div className="mt-6 text-center md:hidden">
                    <Link href="/program">
                        <button className="w-full py-3 bg-white border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50">
                            Lihat Semua Program
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPrograms;
