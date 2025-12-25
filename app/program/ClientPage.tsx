'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, MapPin, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { programs } from '@/data/programs';
import { BookOpen, GraduationCap, Globe, Target, FileText, BookMarked } from 'lucide-react';

const iconMap: { [key: string]: any } = {
    BookOpen, GraduationCap, Globe, Target, FileText, BookMarked
};

const ProgramPage = () => {
    const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
    const detailRef = useRef<HTMLDivElement>(null);

    const handleDetailClick = (id: string) => {
        setSelectedProgramId(id);
        // Timeout to allow state update and render before scrolling
        setTimeout(() => {
            detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const getColorClasses = (color: string) => {
        const colors: { [key: string]: { bg: string; bgLight: string; text: string; border: string; shadow: string } } = {
            emerald: {
                bg: 'bg-emerald-500',
                bgLight: 'bg-emerald-50',
                text: 'text-emerald-600',
                border: 'border-emerald-500',
                shadow: 'shadow-emerald-100'
            },
            blue: {
                bg: 'bg-blue-500',
                bgLight: 'bg-blue-50',
                text: 'text-blue-600',
                border: 'border-blue-500',
                shadow: 'shadow-blue-100'
            },
            teal: {
                bg: 'bg-teal-500',
                bgLight: 'bg-teal-50',
                text: 'text-teal-600',
                border: 'border-teal-500',
                shadow: 'shadow-teal-100'
            },
            purple: {
                bg: 'bg-purple-500',
                bgLight: 'bg-purple-50',
                text: 'text-purple-600',
                border: 'border-purple-500',
                shadow: 'shadow-purple-100'
            },
            amber: {
                bg: 'bg-amber-500',
                bgLight: 'bg-amber-50',
                text: 'text-amber-600',
                border: 'border-amber-500',
                shadow: 'shadow-amber-100'
            },
            rose: {
                bg: 'bg-rose-500',
                bgLight: 'bg-rose-50',
                text: 'text-rose-600',
                border: 'border-rose-500',
                shadow: 'shadow-rose-100'
            }
        };
        return colors[color] || colors.emerald;
    };

    const selectedProgram = programs.find(p => p.id === selectedProgramId);
    const SelectedIcon = selectedProgram ? iconMap[selectedProgram.icon] : null;

    return (
        <div className="min-h-screen bg-slate-50 relative">
            {/* Hero Section */}
            <section className="relative bg-emerald-600 text-white overflow-hidden pt-20 pb-32">
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">Program Kami</h1>
                        <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto font-medium leading-relaxed">
                            Berbagai program bimbingan untuk membantu Anda mencapai tujuan akademik dan profesional, dari jenjang TK hingga Umum.
                        </p>
                    </motion.div>
                </div>

                {/* Curved Divider */}
                <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0]">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(113%+1.3px)] h-[60px] fill-slate-50 opacity-100">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
                    </svg>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-1 relative z-20">

                {/* Programs Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {programs.map((program, index) => {
                        const colorClasses = getColorClasses(program.color);
                        const isSelected = selectedProgramId === program.id;
                        const Icon = iconMap[program.icon];

                        return (
                            <div key={program.id} className="relative z-0 flex flex-col group h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col h-full ${isSelected ? `border-${program.color}-500 ring-4 ring-${program.color}-500/10` : 'border-slate-200 hover:border-emerald-200'}`}
                                    onClick={() => handleDetailClick(program.id)}
                                >
                                    {/* Icon */}
                                    <div className={`${colorClasses.bgLight} ${colorClasses.text} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                                        <Icon className="w-8 h-8" />
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-slate-800 mb-1">{program.title}</h2>
                                    <p className={`text-sm ${colorClasses.text} font-medium mb-3`}>{program.subtitle}</p>
                                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{program.shortDescription}</p>

                                    {/* Features Key */}
                                    <ul className="space-y-2 mb-6 flex-grow">
                                        {program.features.slice(0, 3).map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                                                <Check className={`w-4 h-4 ${colorClasses.text} mt-0.5 flex-shrink-0`} />
                                                <span className="line-clamp-1">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Price */}
                                    <div className="mb-4 pt-4 border-t border-slate-100">
                                        <span className="text-slate-500 text-sm">Mulai dari </span>
                                        <span className={`${colorClasses.text} font-bold text-lg`}>Rp {program.priceStart}</span>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDetailClick(program.id); }}
                                            className="py-2.5 rounded-xl text-sm font-semibold border-2 border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                                        >
                                            Detail
                                        </button>
                                        <Link href={`/daftar?program=${program.id}`} className="contents">
                                            <button
                                                onClick={(e) => e.stopPropagation()}
                                                className={`py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-md ${program.color === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600' :
                                                    program.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                                                        program.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
                                                            program.color === 'teal' ? 'bg-teal-500 hover:bg-teal-600' :
                                                                program.color === 'amber' ? 'bg-amber-500 hover:bg-amber-600' :
                                                                    program.color === 'rose' ? 'bg-rose-500 hover:bg-rose-600' :
                                                                        'bg-slate-700 hover:bg-slate-800'
                                                    }`}>
                                                Daftar
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                {/* Detail Section - Scrolls into view */}
                <div ref={detailRef} className="scroll-mt-24">
                    <AnimatePresence mode="wait">
                        {selectedProgram && (
                            <motion.div
                                key={selectedProgram.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 40 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
                            >
                                {/* Header of Detail Section */}
                                <div className={`relative px-8 py-12 text-white ${selectedProgram.color === 'emerald' ? 'bg-emerald-600' :
                                    selectedProgram.color === 'blue' ? 'bg-blue-600' :
                                        selectedProgram.color === 'purple' ? 'bg-purple-600' :
                                            selectedProgram.color === 'teal' ? 'bg-teal-600' :
                                                selectedProgram.color === 'amber' ? 'bg-amber-600' :
                                                    'bg-rose-600'
                                    }`}>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

                                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                        <div>
                                            <h2 className="text-3xl md:text-5xl font-bold mb-2">{selectedProgram.title}</h2>
                                            <p className="text-lg text-white/90">{selectedProgram.subtitle}</p>
                                        </div>
                                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                                            <SelectedIcon className="w-12 h-12 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="p-8 md:p-12 grid lg:grid-cols-3 gap-12">
                                    {/* Left: Description & Curriculum */}
                                    <div className="lg:col-span-2 space-y-10">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                                <FileText className="w-6 h-6 text-slate-400" />
                                                Tentang Program
                                            </h3>
                                            <p className="text-lg text-slate-600 leading-relaxed text-justify">
                                                {selectedProgram.fullDescription}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                                <Target className="w-6 h-6 text-slate-400" />
                                                Target Peserta
                                            </h3>
                                            <div className="bg-slate-50 border-l-4 border-emerald-500 p-4 rounded-r-xl">
                                                <p className="text-slate-700 font-medium">{selectedProgram.targetAudience}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                                <BookMarked className="w-6 h-6 text-slate-400" />
                                                Kurikulum & Materi
                                            </h3>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {selectedProgram.curriculum.map((item, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                                                        <div className="mt-1">
                                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                        </div>
                                                        <span className="text-slate-700 font-medium">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Sidebar / Summary */}
                                    <div className="lg:col-span-1">
                                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-full flex flex-col">
                                            <h3 className="text-xl font-bold text-slate-800 mb-6">Fasilitas Lengkap</h3>
                                            <ul className="space-y-4 mb-8 flex-grow">
                                                {selectedProgram.features.map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate-600">
                                                        <div className="mt-0.5">
                                                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                                        </div>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mt-auto pt-6 border-t border-slate-200">
                                                <p className="text-sm text-slate-500 mb-1">Mulai investasi belajar dari</p>
                                                <div className="flex items-end gap-2 mb-6">
                                                    <span className="text-3xl font-bold text-slate-800">Rp {selectedProgram.priceStart}</span>
                                                    <span className="text-slate-500 mb-1">/ sesi</span>
                                                </div>

                                                <Link href={`/daftar?program=${selectedProgram.id}`} className="block">
                                                    <button className="w-full py-4 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600">
                                                        Daftar Sekarang <ArrowRight className="w-5 h-5" />
                                                    </button>
                                                </Link>
                                                <p className="text-xs text-center text-slate-400 mt-4">
                                                    Konsultasi gratis via WhatsApp tersedia
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ProgramPage;
