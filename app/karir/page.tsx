'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, BookOpen, GraduationCap, Clock, FileText, Download, Check, Briefcase, Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import Link from 'next/link';
import { submitToGoogleSheets, formatModeLabel } from '@/lib/googleSheets';

interface FormData {
    namaLengkap: string;
    email: string;
    whatsapp: string;
    pendidikan: string;
    spesialisasi: string;
    tingkatMengajar: string[];
    modeMengajar: string;
    pengalaman: string;
    lokasi: string;
    tarifPerJam: string;
    motivasi: string;
}

const KarirPage = () => {
    const [formData, setFormData] = useState<FormData>({
        namaLengkap: '',
        email: '',
        whatsapp: '',
        pendidikan: '',
        spesialisasi: '',
        tingkatMengajar: [],
        modeMengajar: 'keduanya',
        pengalaman: '',
        lokasi: '',
        tarifPerJam: '',
        motivasi: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (value: string) => {
        setFormData(prev => {
            const current = prev.tingkatMengajar;
            if (current.includes(value)) {
                return { ...prev, tingkatMengajar: current.filter(v => v !== value) };
            } else {
                return { ...prev, tingkatMengajar: [...current, value] };
            }
        });
    };

    const generatePDF = (data: FormData) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header
        doc.setFillColor(16, 185, 129);
        doc.rect(0, 0, pageWidth, 40, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('datanginguru Privat', 20, 25);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Lamaran Menjadi Guru', 20, 35);

        // Content
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
            doc.text(value || '-', 80, yPos);
            yPos += 8;
        };

        addField('Nama Lengkap', data.namaLengkap);
        addField('Email', data.email);
        addField('WhatsApp', data.whatsapp);
        addField('Lokasi', data.lokasi);

        yPos += 5;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Kualifikasi Mengajar', 20, yPos);
        yPos += 12;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');

        const modeLabel = data.modeMengajar === 'online' ? 'Online' : data.modeMengajar === 'tatap_muka' ? 'Tatap Muka' : 'Online & Tatap Muka';

        addField('Pendidikan', data.pendidikan);
        addField('Spesialisasi', data.spesialisasi);
        addField('Tingkat Mengajar', data.tingkatMengajar.join(', ') || 'Tidak dipilih');
        addField('Mode Mengajar', modeLabel);
        addField('Pengalaman', data.pengalaman);
        addField('Tarif/Jam', data.tarifPerJam ? `Rp ${data.tarifPerJam}` : '-');

        if (data.motivasi) {
            yPos += 5;
            doc.setFont('helvetica', 'bold');
            doc.text('Motivasi Mengajar:', 20, yPos);
            yPos += 8;
            doc.setFont('helvetica', 'normal');

            const splitMotivasi = doc.splitTextToSize(data.motivasi, pageWidth - 40);
            doc.text(splitMotivasi, 20, yPos);
        }

        // Footer
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFillColor(248, 250, 252);
        doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');

        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`Tanggal Lamaran: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, 20, pageHeight - 12);
        doc.text('© datanginguru Privat', pageWidth - 50, pageHeight - 12);

        return doc;
    };

    const ADMIN_WHATSAPP = "6283820757532";

    const generateWhatsAppMessage = (data: FormData): string => {
        const modeLabel = data.modeMengajar === 'online' ? 'Online' : data.modeMengajar === 'tatap_muka' ? 'Tatap Muka' : 'Online & Tatap Muka';

        return `👨‍🏫 *LAMARAN GURU BARU*

👤 *Data Pribadi:*
Nama: ${data.namaLengkap}
Email: ${data.email}
WhatsApp: ${data.whatsapp}
Lokasi: ${data.lokasi}

🎓 *Kualifikasi:*
Pendidikan: ${data.pendidikan}
Spesialisasi: ${data.spesialisasi}
Tingkat Mengajar: ${data.tingkatMengajar.join(', ') || '-'}
Mode: ${modeLabel}
Pengalaman: ${data.pengalaman || '-'}
Tarif: ${data.tarifPerJam ? `Rp ${data.tarifPerJam}/jam` : '-'}

${data.motivasi ? `📝 Motivasi:\n${data.motivasi}` : ''}

---
Dikirim dari datanginguru Privat`;
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Submit to Google Sheets
            await submitToGoogleSheets({
                formType: 'karir',
                namaLengkap: formData.namaLengkap,
                email: formData.email,
                whatsapp: formData.whatsapp,
                lokasi: formData.lokasi,
                pendidikan: formData.pendidikan,
                spesialisasi: formData.spesialisasi,
                tingkatMengajar: formData.tingkatMengajar.join(', '),
                modeMengajar: formatModeLabel(formData.modeMengajar),
                pengalaman: formData.pengalaman,
                tarifPerJam: formData.tarifPerJam,
                motivasi: formData.motivasi,
            });

            // Open WhatsApp with message
            const message = generateWhatsAppMessage(formData);
            const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

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

    const handleNewApplication = () => {
        setFormData({
            namaLengkap: '',
            email: '',
            whatsapp: '',
            pendidikan: '',
            spesialisasi: '',
            tingkatMengajar: [],
            modeMengajar: 'keduanya',
            pengalaman: '',
            lokasi: '',
            tarifPerJam: '',
            motivasi: ''
        });
        setIsSubmitted(false);
    };

    if (isSubmitted) {
        const whatsappAgreementUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(`Halo Admin, saya ${formData.namaLengkap} sudah mendaftar sebagai guru dan melampirkan foto perjanjian yang sudah ditandatangani.`)}`;

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
                    <h1 className="text-3xl font-bold text-slate-800 mb-3">Pendaftaran Berhasil!</h1>
                    <p className="text-slate-600 mb-8">
                        Silakan kirim foto perjanjian yang sudah ditandatangani ke WhatsApp Admin.
                    </p>

                    <div className="flex flex-col gap-3 max-w-xs mx-auto">
                        <a href={whatsappAgreementUrl} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full bg-green-500 hover:bg-green-600">
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Kirim ke WhatsApp Admin
                            </Button>
                        </a>
                        <Button onClick={handleDownloadPDF} variant="outline" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Unduh Rekap Lamaran
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

            {/* 2 Steps Instructions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-10"
            >
                <h2 className="text-lg font-bold text-slate-800 text-center mb-6">Langkah Pendaftaran</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Step 1 */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 mb-1">Unduh & Tanda Tangani Perjanjian</h3>
                                <p className="text-slate-600 text-sm mb-3">Download, print, tanda tangani, lalu foto perjanjian.</p>
                                <a href="/docs/perjanjian-guru.docx" download>
                                    <Button variant="outline" size="sm">
                                        <Download className="w-4 h-4 mr-2" />
                                        Unduh Perjanjian
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 mb-1">Isi Formulir di Bawah</h3>
                                <p className="text-slate-600 text-sm">Lengkapi data diri Anda, lalu kirim lamaran. Setelah itu, kirim foto perjanjian ke WhatsApp Admin.</p>
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

                {/* Personal Info */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-emerald-600" />
                        Data Pribadi
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap *</label>
                            <input
                                type="text"
                                name="namaLengkap"
                                value={formData.namaLengkap}
                                onChange={handleChange}
                                required
                                className="input-modern"
                                placeholder="Masukkan nama lengkap"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-modern"
                                placeholder="email@contoh.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp *</label>
                            <input
                                type="tel"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                required
                                className="input-modern"
                                placeholder="08xxxxxxxxxx"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi *</label>
                            <input
                                type="text"
                                name="lokasi"
                                value={formData.lokasi}
                                onChange={handleChange}
                                required
                                className="input-modern"
                                placeholder="Contoh: Jakarta Selatan"
                            />
                        </div>
                    </div>
                </div>

                {/* Qualifications */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-emerald-600" />
                        Kualifikasi
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Pendidikan Terakhir *</label>
                            <input
                                type="text"
                                name="pendidikan"
                                value={formData.pendidikan}
                                onChange={handleChange}
                                required
                                className="input-modern"
                                placeholder="Contoh: S1 Matematika ITB"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Spesialisasi / Mata Pelajaran *</label>
                            <input
                                type="text"
                                name="spesialisasi"
                                value={formData.spesialisasi}
                                onChange={handleChange}
                                required
                                className="input-modern"
                                placeholder="Contoh: Matematika, Fisika, Kalkulus"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Tingkat yang Bisa Diajar</label>
                            <div className="flex flex-wrap gap-3">
                                {['SD', 'SMP', 'SMA', 'Kuliah'].map(level => (
                                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.tingkatMengajar.includes(level)}
                                            onChange={() => handleCheckboxChange(level)}
                                            className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                                        />
                                        <span className="text-sm text-slate-700">{level}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Mode Mengajar</label>
                            <select
                                name="modeMengajar"
                                value={formData.modeMengajar}
                                onChange={handleChange}
                                className="input-modern"
                            >
                                <option value="tatap_muka">Tatap Muka</option>
                                <option value="online">Online</option>
                                <option value="keduanya">Keduanya</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Pengalaman Mengajar</label>
                            <input
                                type="text"
                                name="pengalaman"
                                value={formData.pengalaman}
                                onChange={handleChange}
                                className="input-modern"
                                placeholder="Contoh: 3 tahun"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Ekspektasi Tarif per Jam (Rp)</label>
                            <input
                                type="text"
                                name="tarifPerJam"
                                value={formData.tarifPerJam}
                                onChange={handleChange}
                                className="input-modern"
                                placeholder="Contoh: 150000"
                            />
                        </div>
                    </div>
                </div>

                {/* Motivation */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Motivasi Mengajar</label>
                    <textarea
                        name="motivasi"
                        value={formData.motivasi}
                        onChange={handleChange}
                        rows={4}
                        className="input-modern resize-none"
                        placeholder="Ceritakan mengapa Anda ingin menjadi guru..."
                    />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Mengirim...
                        </>
                    ) : (
                        <>
                            <FileText className="w-5 h-5 mr-2" />
                            Kirim Lamaran
                        </>
                    )}
                </Button>
            </motion.form>
        </div>
    );
};

export default KarirPage;
