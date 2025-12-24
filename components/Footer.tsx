import Link from 'next/link';
import { GraduationCap, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

const Footer = () => {
    const whatsappNumber = "6283823245965"; // Admin WhatsApp
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=Halo,%20saya%20ingin%20bertanya%20tentang%20les%20privat`;

    return (
        <footer className="bg-slate-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-emerald-500 p-2 rounded-xl">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold leading-tight">datanginguru</span>
                                <span className="text-xs text-emerald-400 font-medium -mt-1">Privat</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Menghubungkan Anda dengan guru les privat berkualitas untuk pengalaman belajar yang personal dan efektif.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <span className="font-semibold text-lg mb-4 block text-white">Navigasi</span>
                        <div className="flex flex-col gap-2">
                            <Link href="/tutors" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                                Katalog Guru
                            </Link>
                            <Link href="/daftar" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                                Daftar Siswa
                            </Link>
                            <Link href="/karir" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                                Daftar Jadi Guru
                            </Link>
                            <Link href="/biaya" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                                Cek Biaya
                            </Link>
                        </div>
                    </div>

                    {/* Program Unggulan */}
                    <div>
                        <span className="font-semibold text-lg mb-4 block text-white">Program Unggulan</span>
                        <div className="flex flex-col gap-2">
                            <Link href="/program" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                                Les Privat
                            </Link>
                            <Link href="/program" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                                UTBK / SNBT
                            </Link>
                            <Link href="/program" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                                TOEFL / IELTS
                            </Link>
                            <Link href="/program" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                                Persiapan CPNS
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <span className="font-semibold text-lg mb-4 block text-white">Hubungi Kami</span>
                        <div className="flex flex-col gap-3">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>WhatsApp Admin</span>
                            </a>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Mail className="w-4 h-4" />
                                <span>info@datanginguru.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>Indonesia</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        © 2025 datanginguru Privat. Hak Cipta Dilindungi.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                            Kebijakan Privasi
                        </Link>
                        <Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                            Syarat & Ketentuan
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
