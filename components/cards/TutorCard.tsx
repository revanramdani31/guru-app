'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Star } from 'lucide-react';

export interface Tutor {
    id: number;
    slug: string;
    nama: string;
    mapel: string[];
    lokasi: string;
    tipe: string;
    tingkat: string[];
    foto: string;
    pendidikan: string;
}

interface TutorCardProps {
    tutor: Tutor;
    index?: number;
}

const getClassTypeLabel = (type: string) => {
    switch (type) {
        case 'online': return 'Online';
        case 'tatap_muka': return 'Tatap Muka';
        case 'keduanya': return 'Online & Tatap Muka';
        default: return '';
    }
};

const TutorCard = ({ tutor, index = 0 }: TutorCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-200 transition-all group h-full flex flex-col"
        >
            <Link href={`/tutors/${tutor.slug}`} className="block h-full flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    {tutor.foto ? (
                        <img
                            src={tutor.foto}
                            alt={tutor.nama}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl bg-emerald-50">👨‍🏫</div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-emerald-700 flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" /> 4.9
                    </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-3">
                        <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                            {tutor.nama}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">{tutor.lokasi}</span>
                        </div>
                    </div>

                    <p className="text-emerald-600 text-xs font-semibold mb-2 line-clamp-1">
                        {tutor.mapel.slice(0, 3).join(', ')}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <GraduationCap className="w-3 h-3" />
                        <span className="line-clamp-1">{tutor.pendidikan}</span>
                    </div>

                    <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-center">
                        <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-medium uppercase tracking-wide">
                            {getClassTypeLabel(tutor.tipe)}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default TutorCard;
