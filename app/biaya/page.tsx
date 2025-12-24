'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Calculator, ChevronDown, Info, MessageCircle, ArrowRight, BookOpen } from 'lucide-react';
import { programs, programOptions, mataPelajaranByPeserta, pricing, isKondisional, formatPrice, getProgram, calculatePrice } from '@/lib/pricing';

const BiayaPage = () => {
    // Form state
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedMapel, setSelectedMapel] = useState('');
    const [metodePembelajaran, setMetodePembelajaran] = useState('Tatap Muka');
    const [jumlahPertemuan, setJumlahPertemuan] = useState('4');
    const [customPertemuan, setCustomPertemuan] = useState('');

    // Calculated values
    const [pricePerSession, setPricePerSession] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [availableOptions, setAvailableOptions] = useState<string[]>([]);
    const [availableMapel, setAvailableMapel] = useState<string[]>([]);

    // Update available options when program changes
    useEffect(() => {
        if (selectedProgram) {
            const opts = programOptions[selectedProgram]?.options || [];
            setAvailableOptions(opts);
            setSelectedOption('');
            setSelectedMapel('');
        }
    }, [selectedProgram]);

    // Update available mapel when option changes (for Les Privat)
    useEffect(() => {
        if (selectedProgram === 'les-privat' && selectedOption) {
            const mapel = mataPelajaranByPeserta[selectedOption] || [];
            setAvailableMapel(mapel);
            setSelectedMapel('');
        }
    }, [selectedProgram, selectedOption]);

    // Calculate price
    useEffect(() => {
        if (!selectedProgram || !selectedOption) {
            setPricePerSession(0);
            setTotalPrice(0);
            return;
        }

        // Calculate sessions
        const sessions = jumlahPertemuan === 'Custom'
            ? (parseInt(customPertemuan) || 1)
            : parseInt(jumlahPertemuan);

        // Calculate price using centralized function
        const calculatedPricePerSession = calculatePrice(selectedProgram, selectedOption, metodePembelajaran, 1, selectedMapel);

        setPricePerSession(calculatedPricePerSession);
        setTotalPrice(calculatedPricePerSession * sessions);
    }, [selectedProgram, selectedOption, metodePembelajaran, jumlahPertemuan, customPertemuan, selectedMapel]);

    const getSessions = () => {
        return jumlahPertemuan === 'Custom' ? (parseInt(customPertemuan) || 1) : parseInt(jumlahPertemuan);
    };

    const getDaftarUrl = () => {
        const params = new URLSearchParams({
            program: selectedProgram,
            option: selectedOption,
            mapel: selectedMapel,
            mode: metodePembelajaran,
            sessions: getSessions().toString()
        });
        return `/daftar?${params.toString()}`;
    };

    return (

        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <section className="relative bg-emerald-600 text-white overflow-hidden pt-20 pb-32">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">Simulasi Biaya</h1>
                        <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto font-medium leading-relaxed">
                            Pilih program dan lihat estimasi biaya belajar Anda
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

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-1 relative z-20">

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Form Section - 3 columns */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-3 space-y-6"
                    >
                        {/* 1. Pilih Program */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">1. Pilih Program</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {programs.map((prog) => (
                                    <button
                                        key={prog.id}
                                        onClick={() => setSelectedProgram(prog.id)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${selectedProgram === prog.id
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-slate-200 hover:border-emerald-200'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* <span className="text-2xl">{prog.icon}</span> */}
                                            <div>
                                                <p className={`font-semibold ${selectedProgram === prog.id ? 'text-emerald-700' : 'text-slate-800'}`}>
                                                    {prog.name}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-0.5">{prog.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Detail Program */}
                        <AnimatePresence>
                            {selectedProgram && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
                                >
                                    <h2 className="text-lg font-bold text-slate-800 mb-4">
                                        2. {programOptions[selectedProgram]?.label || 'Detail'}
                                    </h2>
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <select
                                                value={selectedOption}
                                                onChange={(e) => setSelectedOption(e.target.value)}
                                                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-700"
                                            >
                                                <option value="">Pilih {programOptions[selectedProgram]?.label?.toLowerCase()}...</option>
                                                {availableOptions.map((opt) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Mata Pelajaran for Les Privat */}
                                    {selectedProgram === 'les-privat' && selectedOption && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-4 space-y-2"
                                        >
                                            <label className="block text-sm font-semibold text-slate-700">
                                                Mata Pelajaran
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={selectedMapel}
                                                    onChange={(e) => setSelectedMapel(e.target.value)}
                                                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-700"
                                                >
                                                    <option value="">Pilih mata pelajaran...</option>
                                                    {availableMapel.map((m) => (
                                                        <option key={m} value={m}>{m}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 3. Metode & Jumlah Pertemuan */}
                        <AnimatePresence>
                            {selectedOption && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
                                >
                                    <h2 className="text-lg font-bold text-slate-800 mb-4">3. Metode & Jumlah Pertemuan</h2>

                                    {/* Metode Pembelajaran */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Metode Pembelajaran
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => setMetodePembelajaran('Tatap Muka')}
                                                className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${metodePembelajaran === 'Tatap Muka'
                                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                    : 'border-slate-200 text-slate-600 hover:border-emerald-200'
                                                    }`}
                                            >
                                                Tatap Muka
                                            </button>
                                            <button
                                                onClick={() => setMetodePembelajaran('Online')}
                                                className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${metodePembelajaran === 'Online'
                                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                    : 'border-slate-200 text-slate-600 hover:border-emerald-200'
                                                    }`}
                                            >
                                                Online

                                            </button>
                                        </div>
                                    </div>

                                    {/* Jumlah Pertemuan */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Jumlah Pertemuan
                                        </label>
                                        <div className="grid grid-cols-5 gap-2">
                                            {['1', '4', '8', '12', 'Custom'].map((num) => (
                                                <button
                                                    key={num}
                                                    onClick={() => setJumlahPertemuan(num)}
                                                    className={`px-3 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${jumlahPertemuan === num
                                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                        : 'border-slate-200 text-slate-600 hover:border-emerald-200'
                                                        }`}
                                                >
                                                    {num === 'Custom' ? 'Lain' : `${num}x`}
                                                </button>
                                            ))}
                                        </div>
                                        {jumlahPertemuan === 'Custom' && (
                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="Masukkan jumlah..."
                                                value={customPertemuan}
                                                onChange={(e) => setCustomPertemuan(e.target.value)}
                                                className="mt-3 w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Price Sidebar - 2 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
                                <h3 className="text-lg font-semibold mb-4">Estimasi Biaya</h3>

                                {selectedProgram && selectedOption ? (
                                    isKondisional(selectedProgram, selectedMapel) ? (
                                        <div className="text-center py-4">
                                            <p className="text-2xl font-bold mb-2">Harga Kondisional</p>
                                            <p className="text-sm opacity-90 mb-4">
                                                Untuk {getProgram(selectedProgram)?.name}, harga disesuaikan dengan kebutuhan Anda
                                            </p>
                                            <div className="pt-4 border-t border-white/20 text-sm space-y-2 text-left">
                                                <p>📚 {getProgram(selectedProgram)?.name}</p>
                                                <p>📖 {selectedOption}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-3 mb-4">
                                                <div className="flex justify-between text-sm">
                                                    <span className="opacity-75">Per Sesi</span>
                                                    <span>Rp {formatPrice(pricePerSession)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="opacity-75">Jumlah Pertemuan</span>
                                                    <span>{getSessions()}x</span>
                                                </div>

                                            </div>

                                            <div className="pt-4 border-t border-white/20">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-semibold">Total</span>
                                                    <span className="text-2xl font-bold">
                                                        Rp {formatPrice(totalPrice)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="pt-4 mt-4 border-t border-white/20 text-sm space-y-1">
                                                <p className="opacity-75">📚 {getProgram(selectedProgram)?.name}</p>
                                                <p className="opacity-75">📖 {selectedOption}</p>
                                                {selectedMapel && <p className="opacity-75">📝 {selectedMapel}</p>}
                                                <p className="opacity-75">💻 {metodePembelajaran}</p>
                                            </div>
                                        </>
                                    )
                                ) : (
                                    <div className="text-center py-6 opacity-75">
                                        <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-50" />
                                        <p className="text-sm">Pilih program untuk melihat estimasi biaya</p>
                                    </div>
                                )}

                                {/* Buttons */}
                                {selectedProgram && selectedOption && (
                                    <div className="mt-6 space-y-3">
                                        <Link href={getDaftarUrl()}>
                                            <button className="w-full bg-white text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                                                Daftar Sekarang
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </Link>
                                        <a
                                            href={`https://wa.me/6283823245965?text=${encodeURIComponent(`Halo, saya tertarik dengan program ${getProgram(selectedProgram)?.name} - ${selectedOption}. Mohon info lebih lanjut.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full border-2 border-white/30 text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Konsultasi Gratis
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Notes */}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <div className="flex items-start gap-2">
                                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-amber-800">
                                        <p className="font-semibold mb-2">Catatan:</p>
                                        <ul className="space-y-1 text-amber-700">
                                            <li>• Harga dapat menyesuaikan dengan kebutuhan</li>
                                            <li>• Durasi per sesi: 90 menit</li>
                                            <li>• Konsultasi awal gratis</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BiayaPage;
