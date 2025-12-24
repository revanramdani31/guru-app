'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { submitToGoogleSheets } from '@/lib/googleSheets';

const PengaduanPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        nama: '',
        whatsapp: '',
        kategori: '',
        pesan: ''
    });

    const categories = [
        'Pelayanan Tutor',
        'Kualitas Pembelajaran',
        'Administrasi & Pembayaran',
        'Masalah Website/Aplikasi',
        'Saran & Masukan',
        'Lainnya'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nama || !formData.whatsapp || !formData.kategori || !formData.pesan) {
            Swal.fire({
                icon: 'error',
                title: 'Data Belum Lengkap',
                text: 'Mohon lengkapi semua kolom yang bertanda bintang (*)',
                confirmButtonColor: '#10b981'
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await submitToGoogleSheets({
                formType: 'pengaduan',
                ...formData,
                timestamp: new Date().toISOString()
            });

            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Laporan Terkirim',
                    text: 'Terima kasih atas masukan Anda. Tim kami akan segera menindaklanjuti laporan ini.',
                    confirmButtonColor: '#10b981'
                });
                setFormData({ nama: '', whatsapp: '', kategori: '', pesan: '' });
            } else {
                throw new Error('Gagal mengirim data');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal Mengirim',
                text: 'Terjadi kesalahan sistem. Silakan coba lagi nanti atau hubungi WhatsApp Admin.',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
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
                        <AlertCircle className="w-16 h-16 mx-auto mb-6 text-emerald-100/80" />
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">Layanan Pengaduan</h1>
                        <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto font-medium leading-relaxed">
                            Kami mendengar setiap suara Anda demi pelayanan yang lebih baik.
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

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-20 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="nama"
                                        value={formData.nama}
                                        onChange={handleChange}
                                        placeholder="Nama Anda"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        WhatsApp <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        placeholder="08xxxxxxxxxx"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Kategori Pengaduan <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="kategori"
                                    value={formData.kategori}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                                >
                                    <option value="">Pilih Kategori...</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Detail Pengaduan <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="pesan"
                                    value={formData.pesan}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Jelaskan masalah atau masukan Anda secara detail..."
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Kirim Laporan
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PengaduanPage;
