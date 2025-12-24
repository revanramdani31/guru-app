'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Clock, MapPin, MessageSquare, FileText, Check, Download, Loader2, ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import { submitToGoogleSheets } from '@/lib/googleSheets';
import { getProvinces, getCities, getDistricts, getVillages, Region } from '@/lib/regionApi';
import { programs, programOptions, mataPelajaranByPeserta, pricing, isKondisional, formatPrice, getProgram, calculatePrice } from '@/lib/pricing';

interface FormData {
    namaLengkap: string;
    jenisKelamin: string;
    whatsapp: string;
    program: string;
    programOption: string;
    mapel: string;
    modeBelajar: string;
    jumlahPertemuan: string;
    jadwalHari: string[];
    jadwalWaktu: string;
    provinsiId: string;
    provinsiName: string;
    kotaId: string;
    kotaName: string;
    kecamatanId: string;
    kecamatanName: string;
    kelurahanId: string;
    kelurahanName: string;
    alamat: string;
    catatan: string;
}

const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const waktuOptions = [
    { value: 'pagi', label: 'Pagi (08.00 - 12.00)' },
    { value: 'siang', label: 'Siang (12.00 - 15.00)' },
    { value: 'sore', label: 'Sore (15.00 - 18.00)' },
    { value: 'malam', label: 'Malam (18.00 - 21.00)' },
    { value: 'fleksibel', label: 'Fleksibel' }
];

const DaftarForm = () => {
    const searchParams = useSearchParams();

    const [formData, setFormData] = useState<FormData>({
        namaLengkap: '',
        jenisKelamin: '',
        whatsapp: '',
        program: '',
        programOption: '',
        mapel: '',
        modeBelajar: 'Tatap Muka',
        jumlahPertemuan: '4',
        jadwalHari: [],
        jadwalWaktu: '',
        provinsiId: '',
        provinsiName: '',
        kotaId: '',
        kotaName: '',
        kecamatanId: '',
        kecamatanName: '',
        kelurahanId: '',
        kelurahanName: '',
        alamat: '',
        catatan: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availableOptions, setAvailableOptions] = useState<string[]>([]);
    const [availableMapel, setAvailableMapel] = useState<string[]>([]);
    const [estimatedPrice, setEstimatedPrice] = useState(0);

    // Region states
    const [provinces, setProvinces] = useState<Region[]>([]);
    const [cities, setCities] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<Region[]>([]);
    const [villages, setVillages] = useState<Region[]>([]);
    const [loadingRegion, setLoadingRegion] = useState({
        provinces: false,
        cities: false,
        districts: false,
        villages: false
    });

    // Load provinces on mount and read URL params
    useEffect(() => {
        const loadProvinces = async () => {
            setLoadingRegion(prev => ({ ...prev, provinces: true }));
            const data = await getProvinces();
            setProvinces(data);
            setLoadingRegion(prev => ({ ...prev, provinces: false }));
        };
        loadProvinces();

        // Read URL params from biaya page
        const programParam = searchParams.get('program');
        const optionParam = searchParams.get('option');
        const mapelParam = searchParams.get('mapel');
        const modeParam = searchParams.get('mode');
        const sessionsParam = searchParams.get('sessions');

        if (programParam) {
            setFormData(prev => ({ ...prev, program: programParam }));
            const opts = programOptions[programParam]?.options || [];
            setAvailableOptions(opts);
        }
        if (optionParam) {
            setFormData(prev => ({ ...prev, programOption: optionParam }));
            if (programParam === 'les-privat') {
                const mapel = mataPelajaranByPeserta[optionParam] || [];
                setAvailableMapel(mapel);
            }
        }
        if (mapelParam) {
            setFormData(prev => ({ ...prev, mapel: mapelParam }));
        }
        if (modeParam) {
            setFormData(prev => ({ ...prev, modeBelajar: modeParam }));
        }
        if (sessionsParam) {
            setFormData(prev => ({ ...prev, jumlahPertemuan: sessionsParam }));
        }
    }, [searchParams]);

    // Update available options when program changes
    useEffect(() => {
        if (formData.program) {
            const opts = programOptions[formData.program]?.options || [];
            setAvailableOptions(opts);
        }
    }, [formData.program]);

    // Update available mapel when option changes (for Les Privat)
    useEffect(() => {
        if (formData.program === 'les-privat' && formData.programOption) {
            const mapel = mataPelajaranByPeserta[formData.programOption] || [];
            setAvailableMapel(mapel);
        }
    }, [formData.program, formData.programOption]);

    // Calculate price
    useEffect(() => {
        if (!formData.program || !formData.programOption) {
            setEstimatedPrice(0);
            return;
        }
        let basePrice = pricing[formData.program]?.[formData.programOption] || 0;
        if (formData.modeBelajar === 'Online' && basePrice > 0) {
            basePrice -= 10000;
        }
        setEstimatedPrice(basePrice);
    }, [formData.program, formData.programOption, formData.modeBelajar]);

    // Load cities when province changes
    useEffect(() => {
        if (formData.provinsiId) {
            const loadCities = async () => {
                setLoadingRegion(prev => ({ ...prev, cities: true }));
                const data = await getCities(formData.provinsiId);
                setCities(data);
                setLoadingRegion(prev => ({ ...prev, cities: false }));
            };
            loadCities();
            setFormData(prev => ({
                ...prev,
                kotaId: '', kotaName: '',
                kecamatanId: '', kecamatanName: '',
                kelurahanId: '', kelurahanName: ''
            }));
            setDistricts([]);
            setVillages([]);
        }
    }, [formData.provinsiId]);

    // Load districts when city changes
    useEffect(() => {
        if (formData.kotaId) {
            const loadDistricts = async () => {
                setLoadingRegion(prev => ({ ...prev, districts: true }));
                const data = await getDistricts(formData.kotaId);
                setDistricts(data);
                setLoadingRegion(prev => ({ ...prev, districts: false }));
            };
            loadDistricts();
            setFormData(prev => ({
                ...prev,
                kecamatanId: '', kecamatanName: '',
                kelurahanId: '', kelurahanName: ''
            }));
            setVillages([]);
        }
    }, [formData.kotaId]);

    // Load villages when district changes
    useEffect(() => {
        if (formData.kecamatanId) {
            const loadVillages = async () => {
                setLoadingRegion(prev => ({ ...prev, villages: true }));
                const data = await getVillages(formData.kecamatanId);
                setVillages(data);
                setLoadingRegion(prev => ({ ...prev, villages: false }));
            };
            loadVillages();
            setFormData(prev => ({
                ...prev,
                kelurahanId: '', kelurahanName: ''
            }));
        }
    }, [formData.kecamatanId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const name = provinces.find(p => p.id === id)?.name || '';
        setFormData(prev => ({ ...prev, provinsiId: id, provinsiName: name }));
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const name = cities.find(c => c.id === id)?.name || '';
        setFormData(prev => ({ ...prev, kotaId: id, kotaName: name }));
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const name = districts.find(d => d.id === id)?.name || '';
        setFormData(prev => ({ ...prev, kecamatanId: id, kecamatanName: name }));
    };

    const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const name = villages.find(v => v.id === id)?.name || '';
        setFormData(prev => ({ ...prev, kelurahanId: id, kelurahanName: name }));
    };

    const getSessions = () => parseInt(formData.jumlahPertemuan) || 1;
    const getTotalPrice = () => estimatedPrice * getSessions();

    const generatePDF = (data: FormData) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFillColor(16, 185, 129);
        doc.rect(0, 0, pageWidth, 40, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('datanginguru Privat', 20, 25);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Formulir Pendaftaran', 20, 35);

        doc.setTextColor(30, 41, 59);
        let yPos = 55;

        const addField = (label: string, value: string) => {
            doc.setFont('helvetica', 'bold');
            doc.text(`${label}:`, 20, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(value || '-', 70, yPos);
            yPos += 8;
        };

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Data Pendaftar', 20, yPos);
        yPos += 12;
        doc.setFontSize(11);

        addField('Nama', data.namaLengkap);
        addField('Jenis Kelamin', data.jenisKelamin);
        addField('WhatsApp', data.whatsapp);

        yPos += 5;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Program', 20, yPos);
        yPos += 12;
        doc.setFontSize(11);

        addField('Program', getProgram(data.program)?.name || data.program);
        addField('Detail', data.programOption);
        if (data.mapel) addField('Mapel', data.mapel);
        addField('Metode', data.modeBelajar);
        addField('Pertemuan', `${data.jumlahPertemuan}x`);

        yPos += 5;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Alamat', 20, yPos);
        yPos += 12;
        doc.setFontSize(11);

        addField('Provinsi', data.provinsiName);
        addField('Kota', data.kotaName);
        addField('Kecamatan', data.kecamatanName);
        addField('Kelurahan', data.kelurahanName);

        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFillColor(248, 250, 252);
        doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');

        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, 20, pageHeight - 12);

        return doc;
    };

    const ADMIN_WHATSAPP = "6283823245965";

    const generateWhatsAppMessage = (data: FormData): string => {
        return `Halo Admin, saya *${data.namaLengkap}* ingin mengkonfirmasi pendaftaran les privat yang sudah saya kirim melalui website. Mohon informasi lebih lanjut. Terima kasih.`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await submitToGoogleSheets({
                formType: 'pendaftaran',
                namaLengkap: formData.namaLengkap,
                jenisKelamin: formData.jenisKelamin,
                whatsapp: formData.whatsapp,
                program: getProgram(formData.program)?.name || formData.program,
                programOption: formData.programOption,
                mapel: formData.mapel,
                modeBelajar: formData.modeBelajar,
                jumlahPertemuan: formData.jumlahPertemuan,
                jadwal: `${formData.jadwalHari.join(', ')} - ${waktuOptions.find(w => w.value === formData.jadwalWaktu)?.label || ''}`,
                provinsi: formData.provinsiName,
                kota: formData.kotaName,
                kecamatan: formData.kecamatanName,
                kelurahan: formData.kelurahanName,
                alamat: formData.alamat,
                catatan: formData.catatan,
                estimasiBiaya: `Rp ${formatPrice(getTotalPrice())}`,
            });

            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownloadPDF = () => {
        const doc = generatePDF(formData);
        doc.save(`Pendaftaran_${formData.namaLengkap.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    const handleNewRegistration = () => {
        setFormData({
            namaLengkap: '',
            jenisKelamin: '',
            whatsapp: '',
            program: '',
            programOption: '',
            mapel: '',
            modeBelajar: 'Tatap Muka',
            jumlahPertemuan: '4',
            jadwalHari: [],
            jadwalWaktu: '',
            provinsiId: '',
            provinsiName: '',
            kotaId: '',
            kotaName: '',
            kecamatanId: '',
            kecamatanName: '',
            kelurahanId: '',
            kelurahanName: '',
            alamat: '',
            catatan: ''
        });
        setIsSubmitted(false);
        setAvailableOptions([]);
        setAvailableMapel([]);
        setCities([]);
        setDistricts([]);
        setVillages([]);
    };

    if (isSubmitted) {
        return (
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
                        <Check className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-3">Pendaftaran Berhasil!</h1>
                    <p className="text-slate-600 mb-8">Data Anda telah tersimpan. Silakan unduh PDF dan hubungi Admin untuk konfirmasi.</p>
                    <div className="flex flex-col gap-3 max-w-xs mx-auto">
                        <a
                            href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(generateWhatsAppMessage(formData))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="w-full bg-green-500 hover:bg-green-600">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Konfirmasi ke Admin
                            </Button>
                        </a>
                        <Button onClick={handleDownloadPDF} variant="outline" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Unduh PDF
                        </Button>
                        <Button onClick={handleNewRegistration} variant="ghost" className="w-full">
                            Daftar Lagi
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative bg-emerald-600 text-white overflow-hidden pt-20 pb-32 mb-8">
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">Daftar Les Privat</h1>
                        <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto font-medium leading-relaxed">
                            Isi formulir di bawah untuk mendaftarkan kebutuhan belajar Anda.
                            Kami akan mencarikan guru terbaik sesuai kriteria.
                        </p>
                    </motion.div>
                </div>

                {/* Curved Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(113%+1.3px)] h-[60px] fill-slate-50 opacity-100">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
                    </svg>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

                {/* SOP Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="mb-8"
                >
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-amber-600" />
                            <p className="text-sm text-amber-800">
                                <strong>Penting:</strong> Baca SOP terlebih dahulu sebelum mendaftar
                            </p>
                        </div>
                        <a href="/docs/sop-orangtua.pdf" download>
                            <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                                <Download className="w-4 h-4 mr-2" />
                                Unduh SOP Orang Tua
                            </Button>
                        </a>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-200 p-6 md:p-8 space-y-8"
                    >
                        {/* Data Pribadi */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-emerald-600" />
                                Data Pribadi
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">Nama Lengkap <span className="text-red-500">*</span></label>
                                    <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" placeholder="Masukkan nama lengkap" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">Jenis Kelamin <span className="text-red-500">*</span></label>
                                    <div className="flex gap-4 h-[50px] items-center">
                                        {['Laki-laki', 'Perempuan'].map(gender => (
                                            <label key={gender} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="jenisKelamin"
                                                    value={gender}
                                                    checked={formData.jenisKelamin === gender}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                                                />
                                                <span className="text-sm text-slate-700">{gender}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">Nomor WhatsApp <span className="text-red-500">*</span></label>
                                    <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" placeholder="08xxxxxxxxxx" />
                                </div>
                            </div>
                        </div>

                        {/* Program */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-emerald-600" />
                                Program
                            </h2>
                            <div className="space-y-4">
                                {/* Pilih Program */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">Pilih Program <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select
                                            name="program"
                                            value={formData.program}
                                            onChange={(e) => {
                                                setFormData(prev => ({ ...prev, program: e.target.value, programOption: '', mapel: '' }));
                                            }}
                                            required
                                            className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                        >
                                            <option value="">Pilih program...</option>
                                            {programs.map(p => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Detail Program */}
                                <AnimatePresence>
                                    {formData.program && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                                            <label className="block text-sm font-semibold text-slate-700">
                                                {programOptions[formData.program]?.label} <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="programOption"
                                                    value={formData.programOption}
                                                    onChange={(e) => {
                                                        setFormData(prev => ({ ...prev, programOption: e.target.value, mapel: '' }));
                                                    }}
                                                    required
                                                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                >
                                                    <option value="">Pilih {programOptions[formData.program]?.label?.toLowerCase()}...</option>
                                                    {availableOptions.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Mata Pelajaran for Les Privat */}
                                <AnimatePresence>
                                    {formData.program === 'les-privat' && formData.programOption && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                                            <label className="block text-sm font-semibold text-slate-700">Mata Pelajaran</label>
                                            <div className="relative">
                                                {formData.programOption === 'SMA' ? (
                                                    <>
                                                        <input
                                                            list="mapel-options"
                                                            name="mapel"
                                                            value={formData.mapel}
                                                            onChange={handleChange}
                                                            placeholder="Cari atau pilih mata pelajaran..."
                                                            className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                        />
                                                        <datalist id="mapel-options">
                                                            {availableMapel.map(m => (
                                                                <option key={m} value={m} />
                                                            ))}
                                                        </datalist>
                                                    </>
                                                ) : (
                                                    <>
                                                        <select
                                                            name="mapel"
                                                            value={formData.mapel}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                        >
                                                            <option value="">Pilih mata pelajaran...</option>
                                                            {availableMapel.map(m => (
                                                                <option key={m} value={m}>{m}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Metode & Jumlah Pertemuan */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-700">Metode Pembelajaran</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['Tatap Muka', 'Online'].map(mode => (
                                                <button
                                                    key={mode}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, modeBelajar: mode }))}
                                                    className={`px-3 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${formData.modeBelajar === mode ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600 hover:border-emerald-200'}`}
                                                >
                                                    {mode}
                                                    {mode === 'Online'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-700">Jumlah Pertemuan</label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {['1', '4', '8', '12'].map(num => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, jumlahPertemuan: num }))}
                                                    className={`px-2 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${formData.jumlahPertemuan === num ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600 hover:border-emerald-200'}`}
                                                >
                                                    {num}x
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Jadwal */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-emerald-600" />
                                Jadwal Preferensi
                            </h2>
                            <div className="space-y-4">
                                {/* Pilih Hari */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">Pilih Hari</label>
                                    <div className="flex flex-wrap gap-2">
                                        {hariOptions.map(hari => (
                                            <button
                                                key={hari}
                                                type="button"
                                                onClick={() => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        jadwalHari: prev.jadwalHari.includes(hari)
                                                            ? prev.jadwalHari.filter(h => h !== hari)
                                                            : [...prev.jadwalHari, hari]
                                                    }));
                                                }}
                                                className={`px-4 py-2 rounded-xl border-2 font-medium text-sm transition-all ${formData.jadwalHari.includes(hari)
                                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                    : 'border-slate-200 text-slate-600 hover:border-emerald-200'
                                                    }`}
                                            >
                                                {hari}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Pilih Waktu */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">Pilih Waktu</label>
                                    <div className="relative">
                                        <select
                                            value={formData.jadwalWaktu}
                                            onChange={(e) => setFormData(prev => ({ ...prev, jadwalWaktu: e.target.value }))}
                                            className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                        >
                                            <option value="">Pilih waktu...</option>
                                            {waktuOptions.map(w => (
                                                <option key={w.value} value={w.value}>{w.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Alamat */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-emerald-600" />
                                Alamat
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">Provinsi <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select value={formData.provinsiId} onChange={handleProvinceChange} required className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-emerald-500" disabled={loadingRegion.provinces}>
                                            <option value="">{loadingRegion.provinces ? 'Memuat...' : 'Pilih provinsi...'}</option>
                                            {provinces.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">Kota/Kabupaten <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select value={formData.kotaId} onChange={handleCityChange} required className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-emerald-500" disabled={!formData.provinsiId || loadingRegion.cities}>
                                            <option value="">{!formData.provinsiId ? 'Pilih provinsi dulu' : loadingRegion.cities ? 'Memuat...' : 'Pilih kota...'}</option>
                                            {cities.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">Kecamatan <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select value={formData.kecamatanId} onChange={handleDistrictChange} required className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-emerald-500" disabled={!formData.kotaId || loadingRegion.districts}>
                                            <option value="">{!formData.kotaId ? 'Pilih kota dulu' : loadingRegion.districts ? 'Memuat...' : 'Pilih kecamatan...'}</option>
                                            {districts.map(d => (<option key={d.id} value={d.id}>{d.name}</option>))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">Kelurahan/Desa <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select value={formData.kelurahanId} onChange={handleVillageChange} required className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-emerald-500" disabled={!formData.kecamatanId || loadingRegion.villages}>
                                            <option value="">{!formData.kecamatanId ? 'Pilih kecamatan dulu' : loadingRegion.villages ? 'Memuat...' : 'Pilih kelurahan...'}</option>
                                            {villages.map(v => (<option key={v.id} value={v.id}>{v.name}</option>))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">Alamat Lengkap <span className="text-red-500">*</span></label>
                                    <textarea name="alamat" value={formData.alamat} onChange={handleChange} required rows={2} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 resize-none" placeholder="Jl. Nama Jalan No. XX, RT/RW, Patokan" />
                                </div>
                            </div>
                        </div>

                        {/* Catatan */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700">Catatan Tambahan</label>
                            <textarea name="catatan" value={formData.catatan} onChange={handleChange} rows={3} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 resize-none" placeholder="Informasi tambahan yang perlu diketahui..." />
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" />Mengirim...</>) : (<><FileText className="w-5 h-5 mr-2" />Daftar & Kirim</>)}
                        </Button>
                    </motion.form>

                    {/* Price Preview Sidebar */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
                                <h3 className="text-lg font-semibold mb-4">Estimasi Biaya</h3>

                                {formData.program && formData.programOption ? (
                                    isKondisional(formData.program) ? (
                                        <div className="text-center py-4">
                                            <p className="text-2xl font-bold mb-2">Harga Kondisional</p>
                                            <p className="text-sm opacity-90">Hubungi kami untuk konsultasi</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-3 mb-4">
                                                <div className="flex justify-between text-sm">
                                                    <span className="opacity-75">Per Sesi</span>
                                                    <span>Rp {formatPrice(estimatedPrice)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="opacity-75">Pertemuan</span>
                                                    <span>{getSessions()}x</span>
                                                </div>

                                            </div>
                                            <div className="pt-4 border-t border-white/20">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-semibold">Total</span>
                                                    <span className="text-2xl font-bold">Rp {formatPrice(getTotalPrice())}</span>
                                                </div>
                                            </div>
                                            <div className="pt-4 mt-4 border-t border-white/20 text-sm space-y-1 opacity-75">
                                                <p>📚 {getProgram(formData.program)?.name}</p>
                                                <p>📖 {formData.programOption}</p>
                                                {formData.mapel && <p>📝 {formData.mapel}</p>}
                                            </div>
                                        </>
                                    )
                                ) : (
                                    <div className="text-center py-6 opacity-75">
                                        <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-50" />
                                        <p className="text-sm">Pilih program untuk melihat estimasi</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <p className="text-sm text-amber-800">
                                    <strong>Catatan:</strong> Harga dapat menyesuaikan dengan kebutuhan. Konsultasi awal gratis.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>

    );
};

const DaftarPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            </div>
        }>
            <DaftarForm />
        </Suspense>
    );
};

export default DaftarPage;
