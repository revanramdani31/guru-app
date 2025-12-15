import Link from 'next/link';
import { GraduationCap, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-white p-2 rounded-lg">
                                <GraduationCap className="w-6 h-6 text-blue-900" />
                            </div>
                            <span className="text-xl font-bold">GuruKu</span>
                        </div>
                        <p className="text-blue-200 text-sm">
                            Terhubung dengan guru berkualitas untuk pengalaman belajar yang dipersonalisasi.
                        </p>
                    </div>

                    <div>
                        <span className="font-semibold text-lg mb-4 block">Tautan Cepat</span>
                        <div className="flex flex-col gap-2">
                            <Link href="/tutors" className="text-blue-200 hover:text-white transition-colors text-sm">
                                Cari Guru
                            </Link>
                            <Link href="/categories" className="text-blue-200 hover:text-white transition-colors text-sm">
                                Mata Pelajaran
                            </Link>
                            <Link href="/contact" className="text-blue-200 hover:text-white transition-colors text-sm">
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>

                    <div>
                        <span className="font-semibold text-lg mb-4 block">Kontak</span>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-blue-200 text-sm">
                                <Mail className="w-4 h-4" />
                                <span>info@guruku.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-blue-200 text-sm">
                                <Phone className="w-4 h-4" />
                                <span>+62 812 3456 7890</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-blue-800 mt-8 pt-8 text-center">
                    <p className="text-blue-200 text-sm">
                        © 2025 GuruKu. Hak Cipta Dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
