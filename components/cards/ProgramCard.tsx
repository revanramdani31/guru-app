'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, GraduationCap, Globe, Target, FileText, BookMarked } from 'lucide-react';

export interface Program {
    id: string;
    title: string;
    subtitle: string;
    shortDescription: string;
    fullDescription: string;
    details: string;
    icon: string;
    color: string;
    features: string[];
    curriculum: string[];
    priceStart: string;
    targetAudience: string;
}

interface ProgramCardProps {
    program: Program;
    index?: number;
}

const iconMap: { [key: string]: any } = {
    BookOpen, GraduationCap, Globe, Target, FileText, BookMarked
};

const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string } } = {
        emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
        purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
        teal: { bg: 'bg-teal-100', text: 'text-teal-600' },
        amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
        rose: { bg: 'bg-rose-100', text: 'text-rose-600' },
    };
    return colors[color] || colors.emerald;
};

const ProgramCard = ({ program, index = 0 }: ProgramCardProps) => {
    const Icon = iconMap[program.icon] || BookOpen;
    const colorClasses = getColorClasses(program.color);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all group h-full flex flex-col"
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses.bg} ${colorClasses.text}`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">{program.title}</h3>
            <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">{program.shortDescription}</p>
            <Link href={`/program?id=${program.id}`} className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 mt-auto">
                Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
        </motion.div>
    );
};

export default ProgramCard;
