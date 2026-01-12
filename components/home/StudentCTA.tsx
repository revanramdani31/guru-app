import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const StudentCTA = () => {
    return (
        <section className="py-12 md:py-16 bg-emerald-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="max-w-3xl">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                            Siap Untuk Meningkatkan Prestasi?
                        </h2>
                        <p className="text-emerald-100 text-lg md:text-xl font-medium leading-relaxed">
                            Daftarkan diri Anda sekarang dan dapatkan guru privat terbaik yang sesuai dengan kebutuhan belajar Anda. Mulai perjalanan sukses Anda bersama Datangin Guru.
                        </p>
                    </div>
                    <Link href="/daftar" className="flex-shrink-0">
                        <button className="bg-white text-emerald-700 hover:bg-emerald-50 px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2">
                            Daftar Sebagai Siswa <ArrowRight className="w-5 h-5 ml-1" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default StudentCTA;
