import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">GuruKu</h3>
                        <p className="text-gray-400">
                            Platform terbaik untuk menemukan tutor profesional sesuai kebutuhan Anda.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Menu</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-blue-400 transition">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/tutors" className="text-gray-400 hover:text-blue-400 transition">
                                    Tutor
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="text-gray-400 hover:text-blue-400 transition">
                                    Kategori
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition">
                                    Kontak
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Kategori Populer</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/categories/matematika" className="text-gray-400 hover:text-blue-400 transition">
                                    Matematika
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/bahasa-inggris" className="text-gray-400 hover:text-blue-400 transition">
                                    Bahasa Inggris
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/pemrograman" className="text-gray-400 hover:text-blue-400 transition">
                                    Pemrograman
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/musik" className="text-gray-400 hover:text-blue-400 transition">
                                    Musik
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Hubungi Kami</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Email: info@guruku.com</li>
                            <li>Telepon: +62 812-3456-7890</li>
                            <li>Jakarta, Indonesia</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} GuruKu. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
