'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, Clock, FileText, Download, Check, Briefcase, Loader2, MessageCircle, MapPin, Camera, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import Link from 'next/link';
import { submitToGoogleSheets, formatModeLabel } from '@/lib/googleSheets';
import { getProvinces, getCities, getDistricts, getVillages, Region } from '@/lib/regionApi';

interface FormData {
    namaLengkap: string;
    email: string;
    whatsapp: string;
    tanggalLahir: string;
    pendidikan: string;
    asalKampus: string;
    jurusan: string;
    spesialisasiMapel: string[];
    mapelLainnya: string;
    spesialisasiJenjang: string[];
    modeMengajar: string;
    provinsiId: string;
    provinsiName: string;
    kotaId: string;
    kotaName: string;
    kecamatanId: string;
    kecamatanName: string;
    kelurahanId: string;
    kelurahanName: string;
    alamat: string;
    pasFoto: File | null;
    pasFotoPreview: string;
    pasFotoBase64: string;
    paktaFile: File | null;
    paktaBase64: string;
}

const mataPelajaranOptions = [
    'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Fisika', 'Kimia', 'Biologi',
    'Ekonomi', 'Akuntansi', 'Geografi', 'Sejarah', 'Sosiologi', 'PKN',
    'IPA Terpadu', 'IPS Terpadu', 'Calistung', 'Mengaji', 'Bahasa Arab',
    'UTBK/SNBT', 'TOEFL', 'IELTS', 'Renang', 'Musik', 'Lainnya'
];

const jenjangOptions = ['TK/PAUD', 'SD', 'SMP', 'SMA', 'Kuliah', 'Umum'];

const pendidikanOptions = ['SMA/SMK', 'On Going S1', 'S1', 'S2', 'S3'];

const KarirPage = () => {
    const [formData, setFormData] = useState<FormData>({
        namaLengkap: '',
        email: '',
        whatsapp: '',
        tanggalLahir: '',
        pendidikan: '',
        asalKampus: '',
        jurusan: '',
        spesialisasiMapel: [],
        mapelLainnya: '',
        spesialisasiJenjang: [],
        modeMengajar: 'keduanya',
        provinsiId: '',
        provinsiName: '',
        kotaId: '',
        kotaName: '',
        kecamatanId: '',
        kecamatanName: '',
        kelurahanId: '',
        kelurahanName: '',
        alamat: '',
        pasFoto: null,
        pasFotoPreview: '',
        pasFotoBase64: '',
        paktaFile: null,
        paktaBase64: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Load provinces on mount
    useEffect(() => {
        const loadProvinces = async () => {
            setLoadingRegion(prev => ({ ...prev, provinces: true }));
            const data = await getProvinces();
            setProvinces(data);
            setLoadingRegion(prev => ({ ...prev, provinces: false }));
        };
        loadProvinces();
    }, []);

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

    const handleMapelChange = (value: string) => {
        setFormData(prev => {
            const current = prev.spesialisasiMapel;
            if (current.includes(value)) {
                return { ...prev, spesialisasiMapel: current.filter(v => v !== value) };
            } else {
                return { ...prev, spesialisasiMapel: [...current, value] };
            }
        });
    };

    const handleJenjangChange = (value: string) => {
        setFormData(prev => {
            const current = prev.spesialisasiJenjang;
            if (current.includes(value)) {
                return { ...prev, spesialisasiJenjang: current.filter(v => v !== value) };
            } else {
                return { ...prev, spesialisasiJenjang: [...current, value] };
            }
        });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    pasFoto: file,
                    pasFotoPreview: reader.result as string,
                    pasFotoBase64: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePaktaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    paktaFile: file,
                    paktaBase64: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

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
        doc.text('Lamaran Menjadi Guru', 20, 35);

        doc.setTextColor(30, 41, 59);
        let yPos = 55;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Data Pribadi', 20, yPos);
        yPos += 12;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');

        const addField = (label: string, value: string) => {
            doc.setFont('helvetica', 'bold');
            doc.text(`${label}:`, 20, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(value || '-', 70, yPos);
            yPos += 8;
        };

        addField('Nama', data.namaLengkap);
        addField('Email', data.email);
        addField('WhatsApp', data.whatsapp);
        addField('Tgl Lahir', data.tanggalLahir);
        addField('Pendidikan', data.pendidikan);
        addField('Kampus', data.asalKampus);
        addField('Jurusan', data.jurusan);

        yPos += 5;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Spesialisasi Mengajar', 20, yPos);
        yPos += 12;

        doc.setFontSize(11);
        const modeLabel = data.modeMengajar === 'online' ? 'Online' : data.modeMengajar === 'tatap_muka' ? 'Tatap Muka' : 'Online & Tatap Muka';

        const mapelList = data.spesialisasiMapel.includes('Lainnya') && data.mapelLainnya
            ? data.spesialisasiMapel.filter(m => m !== 'Lainnya').concat(data.mapelLainnya).join(', ')
            : data.spesialisasiMapel.join(', ');
        addField('Mapel', mapelList || '-');
        addField('Jenjang', data.spesialisasiJenjang.join(', ') || '-');
        addField('Mode', modeLabel);

        yPos += 5;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Domisili', 20, yPos);
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
        doc.text(`Tanggal Lamaran: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, 20, pageHeight - 12);
        doc.text('© datanginguru Privat', pageWidth - 50, pageHeight - 12);

        return doc;
    };

    const ADMIN_WHATSAPP = "6283823245965";

    const generateWhatsAppMessage = (data: FormData): string => {
        const modeLabel = data.modeMengajar === 'online' ? 'Online' : data.modeMengajar === 'tatap_muka' ? 'Tatap Muka' : 'Online & Tatap Muka';

        return `👨‍🏫 *LAMARAN GURU BARU*

👤 *Data Pribadi:*
Nama: ${data.namaLengkap}
Email: ${data.email}
WhatsApp: ${data.whatsapp}
Tgl Lahir: ${data.tanggalLahir}

🎓 *Pendidikan:*
Pendidikan: ${data.pendidikan}
Kampus: ${data.asalKampus}
Jurusan: ${data.jurusan}

📚 *Spesialisasi:*
Mapel: ${data.spesialisasiMapel.includes('Lainnya') && data.mapelLainnya
                ? data.spesialisasiMapel.filter(m => m !== 'Lainnya').concat(data.mapelLainnya).join(', ')
                : data.spesialisasiMapel.join(', ') || '-'}
Jenjang: ${data.spesialisasiJenjang.join(', ') || '-'}
Mode: ${modeLabel}

📍 *Domisili:*
${data.provinsiName}, ${data.kotaName}
${data.kecamatanName}, ${data.kelurahanName}
${data.alamat}

---
Dikirim dari datanginguru Privat`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await submitToGoogleSheets({
                formType: 'karir',
                namaLengkap: formData.namaLengkap,
                email: formData.email,
                whatsapp: formData.whatsapp,
                tanggalLahir: formData.tanggalLahir,
                pendidikan: formData.pendidikan,
                asalKampus: formData.asalKampus,
                jurusan: formData.jurusan,
                spesialisasiMapel: formData.spesialisasiMapel.includes('Lainnya') && formData.mapelLainnya
                    ? formData.spesialisasiMapel.filter(m => m !== 'Lainnya').concat(formData.mapelLainnya).join(', ')
                    : formData.spesialisasiMapel.join(', '),
                spesialisasiJenjang: formData.spesialisasiJenjang.join(', '),
                modeMengajar: formatModeLabel(formData.modeMengajar),
                provinsi: formData.provinsiName,
                kota: formData.kotaName,
                kecamatan: formData.kecamatanName,
                kelurahan: formData.kelurahanName,
                alamat: formData.alamat,
                // File Uploads
                pasFotoName: formData.pasFoto?.name,
                pasFotoType: formData.pasFoto?.type,
                pasFotoBase64: formData.pasFotoBase64.split(',')[1],
                paktaName: formData.paktaFile?.name,
                paktaType: formData.paktaFile?.type,
                paktaBase64: formData.paktaBase64.split(',')[1],
            });

            const message = generateWhatsAppMessage(formData);
            // const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
            // window.open(whatsappUrl, '_blank');

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
        doc.save(`Lamaran_Guru_${formData.namaLengkap.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    if (isSubmitted) {
        const whatsappConfirmationUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(`Halo Admin, saya ${formData.namaLengkap} sudah mengirim lamaran guru via website (beserta dokumen). Mohon dicek. Terima kasih.`)}`;

        return (
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
                        <Check className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-3">Lamaran Terkirim!</h1>
                    <p className="text-slate-600 mb-8">
                        Data dan dokumen Anda telah berhasil kami terima. <br />
                        Kami akan segera meninjau lamaran Anda.
                    </p>

                    <div className="flex flex-col gap-3 max-w-xs mx-auto">
                        <a href={whatsappConfirmationUrl} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full bg-green-500 hover:bg-green-600">
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Konfirmasi ke Admin
                            </Button>
                        </a>
                        <Button onClick={handleDownloadPDF} variant="outline" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Unduh Bukti Lamaran
                        </Button>
                        <Link href="/">
                            <Button variant="ghost" className="w-full">
                                Kembali ke Beranda
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
                    <Briefcase className="w-8 h-8 text-emerald-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">Daftar Jadi Guru</h1>
                <p className="text-slate-600 max-w-xl mx-auto">
                    Bagikan ilmu Anda dan dapatkan penghasilan tambahan dengan menjadi guru les privat di datanginguru.
                </p>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid md:grid-cols-3 gap-4 mb-12"
            >
                {[
                    { icon: <Clock className="w-6 h-6" />, title: 'Jadwal Fleksibel', desc: 'Atur waktu mengajar sesuai ketersediaan Anda' },
                    { icon: <Briefcase className="w-6 h-6" />, title: 'Penghasilan Menarik', desc: 'Tentukan tarif sendiri dan dapatkan bayaran layak' },
                    { icon: <GraduationCap className="w-6 h-6" />, title: 'Kembangkan Karir', desc: 'Tingkatkan pengalaman dan portofolio mengajar' }
                ].map((benefit, index) => (
                    <div key={index} className="bg-emerald-50 rounded-xl p-4 text-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg text-emerald-600 mb-2">
                            {benefit.icon}
                        </div>
                        <h3 className="font-semibold text-slate-800 text-sm mb-1">{benefit.title}</h3>
                        <p className="text-slate-600 text-xs">{benefit.desc}</p>
                    </div>
                ))}
            </motion.div>

            {/* Steps */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-10"
            >
                <h2 className="text-lg font-bold text-slate-800 text-center mb-6">Konfirmasi ke Admin</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 mb-1">Unduh Dokumen</h3>
                                <p className="text-slate-600 text-sm mb-3">Download SOP dan Pakta Integritas, kemudian tanda tangani pakta integritas.</p>
                                <div className="flex flex-wrap gap-2">
                                    <a href="/docs/sop-guru.pdf" download>
                                        <Button variant="outline" size="sm">
                                            <Download className="w-4 h-4 mr-2" />
                                            SOP Guru
                                        </Button>
                                    </a>
                                    <a href="/docs/pakta-integritas-guru.docx" download>
                                        <Button variant="outline" size="sm">
                                            <Download className="w-4 h-4 mr-2" />
                                            Pakta Integritas
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 mb-1">Isi Formulir di Bawah</h3>
                                <p className="text-slate-600 text-sm">Lengkapi data diri Anda, lalu kirim lamaran. Setelah itu, Konfirmasi via WhatsApp</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Application Form */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-200 p-6 md:p-8"
            >
                <h2 className="text-xl font-bold text-slate-800 mb-6">Formulir Lamaran Guru</h2>

                {/* 1. Personal Info */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-emerald-600" />
                        Data Pribadi
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">1. Nama Lengkap *</label>
                            <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} required className="input-modern" placeholder="Masukkan nama lengkap" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">2. Email *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-modern" placeholder="email@contoh.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">3. Nomor WhatsApp *</label>
                            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required className="input-modern" placeholder="08xxxxxxxxxx" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">4. Tanggal Lahir *</label>
                            <input type="date" name="tanggalLahir" value={formData.tanggalLahir} onChange={handleChange} required className="input-modern" />
                        </div>
                    </div>
                </div>

                {/* 2. Education */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-emerald-600" />
                        Pendidikan
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">5. Pendidikan Terakhir *</label>
                            <select name="pendidikan" value={formData.pendidikan} onChange={handleChange} required className="input-modern">
                                <option value="">Pilih pendidikan...</option>
                                {pendidikanOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">6. Asal Kampus / Sekolah *</label>
                            <input type="text" name="asalKampus" value={formData.asalKampus} onChange={handleChange} required className="input-modern" placeholder="Contoh: Universitas Indonesia" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">7. Jurusan *</label>
                            <input type="text" name="jurusan" value={formData.jurusan} onChange={handleChange} required className="input-modern" placeholder="Contoh: Pendidikan Matematika" />
                        </div>
                    </div>
                </div>

                {/* 3. Spesialisasi */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        Spesialisasi Pengajaran
                    </h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">8. Mata Pelajaran yang Dikuasai * (Pilih lebih dari satu)</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {mataPelajaranOptions.map(mapel => (
                                <label key={mapel} className="flex items-center gap-2 cursor-pointer bg-slate-50 hover:bg-emerald-50 rounded-lg p-2 transition-colors">
                                    <input type="checkbox" checked={formData.spesialisasiMapel.includes(mapel)} onChange={() => handleMapelChange(mapel)} className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500" />
                                    <span className="text-sm text-slate-700">{mapel}</span>
                                </label>
                            ))}
                        </div>
                        {formData.spesialisasiMapel.includes('Lainnya') && (
                            <div className="mt-3">
                                <input
                                    type="text"
                                    name="mapelLainnya"
                                    value={formData.mapelLainnya}
                                    onChange={handleChange}
                                    placeholder="Tulis mata pelajaran lainnya..."
                                    className="input-modern"
                                />
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Jenjang yang Bisa Diajar * (Pilih lebih dari satu)</label>
                        <div className="flex flex-wrap gap-2">
                            {jenjangOptions.map(jenjang => (
                                <label key={jenjang} className="flex items-center gap-2 cursor-pointer bg-slate-50 hover:bg-emerald-50 rounded-lg px-4 py-2 transition-colors">
                                    <input type="checkbox" checked={formData.spesialisasiJenjang.includes(jenjang)} onChange={() => handleJenjangChange(jenjang)} className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500" />
                                    <span className="text-sm text-slate-700">{jenjang}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">9. Mode Mengajar *</label>
                        <div className="flex flex-wrap gap-3">
                            {[{ value: 'tatap_muka', label: 'Tatap Muka' }, { value: 'online', label: 'Online' }, { value: 'keduanya', label: 'Keduanya' }].map(mode => (
                                <label key={mode.value} className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="modeMengajar" value={mode.value} checked={formData.modeMengajar === mode.value} onChange={handleChange} className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500" />
                                    <span className="text-sm text-slate-700">{mode.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Domisili */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                        10. Domisili
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Provinsi *</label>
                            <div className="relative">
                                <select value={formData.provinsiId} onChange={handleProvinceChange} required className="input-modern appearance-none" disabled={loadingRegion.provinces}>
                                    <option value="">{loadingRegion.provinces ? 'Memuat...' : 'Pilih provinsi...'}</option>
                                    {provinces.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Kota/Kabupaten *</label>
                            <div className="relative">
                                <select value={formData.kotaId} onChange={handleCityChange} required className="input-modern appearance-none" disabled={!formData.provinsiId || loadingRegion.cities}>
                                    <option value="">{!formData.provinsiId ? 'Pilih provinsi dulu' : loadingRegion.cities ? 'Memuat...' : 'Pilih kota...'}</option>
                                    {cities.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Kecamatan *</label>
                            <div className="relative">
                                <select value={formData.kecamatanId} onChange={handleDistrictChange} required className="input-modern appearance-none" disabled={!formData.kotaId || loadingRegion.districts}>
                                    <option value="">{!formData.kotaId ? 'Pilih kota dulu' : loadingRegion.districts ? 'Memuat...' : 'Pilih kecamatan...'}</option>
                                    {districts.map(d => (<option key={d.id} value={d.id}>{d.name}</option>))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Kelurahan/Desa *</label>
                            <div className="relative">
                                <select value={formData.kelurahanId} onChange={handleVillageChange} required className="input-modern appearance-none" disabled={!formData.kecamatanId || loadingRegion.villages}>
                                    <option value="">{!formData.kecamatanId ? 'Pilih kecamatan dulu' : loadingRegion.villages ? 'Memuat...' : 'Pilih kelurahan...'}</option>
                                    {villages.map(v => (<option key={v.id} value={v.id}>{v.name}</option>))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap *</label>
                            <textarea name="alamat" value={formData.alamat} onChange={handleChange} required rows={2} className="input-modern resize-none" placeholder="Jl. Nama Jalan No. XX, RT/RW" />
                        </div>
                    </div>
                </div>

                {/* 5. Pas Foto & Pakta Integritas */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-emerald-600" />
                        11. Upload Dokumen
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Pas Foto */}
                        <div className="bg-slate-50 rounded-xl p-4">
                            <label className="block text-sm font-medium text-slate-700 mb-3">Pas Foto *</label>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    {formData.pasFotoPreview ? (
                                        <img src={formData.pasFotoPreview} alt="Preview" className="w-24 h-32 object-cover rounded-lg border-2 border-slate-200" />
                                    ) : (
                                        <div className="w-24 h-32 bg-white rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                                            <Camera className="w-6 h-6 text-slate-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <input type="file" accept="image/*" onChange={handlePhotoChange} required className="block w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                                    <p className="text-xs text-slate-500 mt-2">Foto bebas, profesional. Format: JPG, PNG.</p>
                                </div>
                            </div>
                        </div>
                        {/* Pakta Integritas */}
                        <div className="bg-slate-50 rounded-xl p-4">
                            <label className="block text-sm font-medium text-slate-700 mb-3">Upload Pakta Integritas *</label>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-24 h-32 bg-white rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-slate-400" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <input type="file" accept=".pdf,application/pdf" onChange={handlePaktaChange} required className="block w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                                    <p className="text-xs text-slate-500 mt-2">File PDF pakta integritas yang sudah ditandatangani.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" />Mengirim...</>) : (<><FileText className="w-5 h-5 mr-2" />Kirim Lamaran</>)}
                </Button>
            </motion.form>
        </div>
    );
};

export default KarirPage;
