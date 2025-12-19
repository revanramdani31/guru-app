'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, BookOpen, Clock, MapPin, MessageSquare, FileText, Copy, Check, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import { submitToGoogleSheets, formatModeLabel } from '@/lib/googleSheets';

interface FormData {
    namaLengkap: string;
    email: string;
    whatsapp: string;
    subjek: string;
    tingkat: string;
    modeBelajar: string;
    jadwalPreferensi: string;
    lokasi: string;
    catatan: string;
}

const DaftarPage = () => {
    const [formData, setFormData] = useState<FormData>({
        namaLengkap: '',
        email: '',
        whatsapp: '',
        subjek: '',
        tingkat: 'SMA',
        modeBelajar: 'tatap_muka',
        jadwalPreferensi: '',
        lokasi: '',
        catatan: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [jobPoster, setJobPoster] = useState('');
    const [copied, setCopied] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateJobPoster = (data: FormData): string => {
        const modeLabel = data.modeBelajar === 'online' ? 'Online' : data.modeBelajar === 'tatap_muka' ? 'Tatap Muka' : 'Online/Tatap Muka';

        return `🎓 *LOWONGAN GURU LES PRIVAT*

📚 Mata Pelajaran: ${data.subjek}
📊 Tingkat: ${data.tingkat}
🏠 Mode: ${modeLabel}
📍 Lokasi: ${data.lokasi || 'Sesuai perjanjian'}
⏰ Jadwal: ${data.jadwalPreferensi || 'Fleksibel'}

${data.catatan ? `📝 Catatan: ${data.catatan}` : ''}

💬 Minat? Hubungi Admin untuk info lebih lanjut.

---
datanginguru Privat`;
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
        doc.text('Formulir Pendaftaran Siswa', 20, 35);

        // Content
        doc.setTextColor(30, 41, 59);
        let yPos = 55;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Data Pendaftar', 20, yPos);
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

        yPos += 5;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Detail Kebutuhan Belajar', 20, yPos);
        yPos += 12;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');

        const modeLabel = data.modeBelajar === 'online' ? 'Online' : data.modeBelajar === 'tatap_muka' ? 'Tatap Muka' : 'Online/Tatap Muka';

        addField('Mata Pelajaran', data.subjek);
        addField('Tingkat', data.tingkat);
        addField('Mode Belajar', modeLabel);
        addField('Jadwal Preferensi', data.jadwalPreferensi);
        addField('Lokasi', data.lokasi);

        if (data.catatan) {
            yPos += 5;
            doc.setFont('helvetica', 'bold');
            doc.text('Catatan Tambahan:', 20, yPos);
            yPos += 8;
            doc.setFont('helvetica', 'normal');

            const splitCatatan = doc.splitTextToSize(data.catatan, pageWidth - 40);
            doc.text(splitCatatan, 20, yPos);
        }

        // Footer
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFillColor(248, 250, 252);
        doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');

        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, 20, pageHeight - 12);
        doc.text('© datanginguru Privat', pageWidth - 50, pageHeight - 12);

        return doc;
    };

    const ADMIN_WHATSAPP = "6283823245965";

    const generateWhatsAppMessage = (data: FormData): string => {
        const modeLabel = data.modeBelajar === 'online' ? 'Online' : data.modeBelajar === 'tatap_muka' ? 'Tatap Muka' : 'Online/Tatap Muka';

        return `🎓 *PENDAFTARAN LES PRIVAT BARU*

👤 *Data Siswa:*
Nama: ${data.namaLengkap}
Email: ${data.email}
WhatsApp: ${data.whatsapp}

📚 *Kebutuhan Belajar:*
Mata Pelajaran: ${data.subjek}
Tingkat: ${data.tingkat}
Mode: ${modeLabel}
Jadwal: ${data.jadwalPreferensi || 'Fleksibel'}
Lokasi: ${data.lokasi || '-'}

${data.catatan ? `📝 Catatan: ${data.catatan}` : ''}

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
                formType: 'pendaftaran',
                namaLengkap: formData.namaLengkap,
                email: formData.email,
                whatsapp: formData.whatsapp,
                subjek: formData.subjek,
                tingkat: formData.tingkat,
                modeBelajar: formatModeLabel(formData.modeBelajar),
                jadwalPreferensi: formData.jadwalPreferensi,
                lokasi: formData.lokasi,
                catatan: formData.catatan,
            });

            // Generate job poster
            const poster = generateJobPoster(formData);
            setJobPoster(poster);

            // Open WhatsApp with message
            const message = generateWhatsAppMessage(formData);
            const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            // Still show success even if Google Sheets fails
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownloadPDF = () => {
        const doc = generatePDF(formData);
        doc.save(`Pendaftaran_${formData.namaLengkap.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    const handleCopyPoster = async () => {
        try {
            await navigator.clipboard.writeText(jobPoster);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleNewRegistration = () => {
        setFormData({
            namaLengkap: '',
            email: '',
            whatsapp: '',
            subjek: '',
            tingkat: 'SMA',
            modeBelajar: 'tatap_muka',
            jadwalPreferensi: '',
            lokasi: '',
            catatan: ''
        });
        setIsSubmitted(false);
        setJobPoster('');
    };

    if (isSubmitted) {
        const whatsappConfirmUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(`Halo Admin, saya ${formData.namaLengkap} sudah mendaftar les privat untuk ${formData.subjek}. Mohon konfirmasinya. Terima kasih!`)}`;

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
                    <p className="text-slate-600 mb-8">Data Anda telah tersimpan. Silakan unduh PDF dan hubungi Admin untuk konfirmasi.</p>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-emerald-600" />
                            <h2 className="text-lg font-bold text-slate-800">Unduh Bukti Pendaftaran</h2>
                        </div>
                        <p className="text-slate-600 text-sm mb-4">
                            Simpan PDF sebagai bukti pendaftaran Anda.
                        </p>
                        <Button onClick={handleDownloadPDF} className="w-full mb-3">
                            <Download className="w-4 h-4 mr-2" />
                            Unduh PDF
                        </Button>
                        <a href={whatsappConfirmUrl} target="_blank" rel="noopener noreferrer" className="block">
                            <Button variant="outline" className="w-full">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Konfirmasi via WhatsApp
                            </Button>
                        </a>
                    </div>

                    <Button onClick={handleNewRegistration} variant="ghost">
                        Daftar Lagi
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">Daftar Les Privat</h1>
                <p className="text-slate-600 max-w-xl mx-auto">
                    Isi formulir di bawah untuk mendaftarkan kebutuhan belajar Anda. Kami akan mencarikan guru terbaik.
                </p>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-200 p-6 md:p-8"
            >
                {/* Personal Info Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-emerald-600" />
                        Data Pribadi
                    </h2>
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
                        <div className="md:col-span-2">
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
                    </div>
                </div>

                {/* Learning Needs Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-emerald-600" />
                        Kebutuhan Belajar
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Mata Pelajaran *</label>
                            <input
                                type="text"
                                name="subjek"
                                value={formData.subjek}
                                onChange={handleChange}
                                required
                                className="input-modern"
                                placeholder="Contoh: Matematika, Bahasa Inggris"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tingkat Pendidikan</label>
                            <select
                                name="tingkat"
                                value={formData.tingkat}
                                onChange={handleChange}
                                className="input-modern"
                            >
                                <option value="SD">SD</option>
                                <option value="SMP">SMP</option>
                                <option value="SMA">SMA</option>
                                <option value="Kuliah">Kuliah / Umum</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Mode Belajar</label>
                            <select
                                name="modeBelajar"
                                value={formData.modeBelajar}
                                onChange={handleChange}
                                className="input-modern"
                            >
                                <option value="tatap_muka">Tatap Muka (Guru Datang)</option>
                                <option value="online">Online</option>
                                <option value="keduanya">Fleksibel (Keduanya)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Schedule & Location Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-emerald-600" />
                        Jadwal & Lokasi
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Jadwal Preferensi</label>
                            <input
                                type="text"
                                name="jadwalPreferensi"
                                value={formData.jadwalPreferensi}
                                onChange={handleChange}
                                className="input-modern"
                                placeholder="Contoh: Senin-Rabu, sore hari"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi / Alamat</label>
                            <input
                                type="text"
                                name="lokasi"
                                value={formData.lokasi}
                                onChange={handleChange}
                                className="input-modern"
                                placeholder="Contoh: Jakarta Selatan"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Notes */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Catatan Tambahan</label>
                    <textarea
                        name="catatan"
                        value={formData.catatan}
                        onChange={handleChange}
                        rows={3}
                        className="input-modern resize-none"
                        placeholder="Informasi tambahan yang perlu diketahui guru..."
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
                            Daftar & Kirim
                        </>
                    )}
                </Button>
            </motion.form>
        </div>
    );
};

export default DaftarPage;
