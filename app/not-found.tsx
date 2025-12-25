
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Halaman Tidak Ditemukan - Datangin Guru",
    description: "Halaman yang Anda cari tidak ditemukan. Kembali ke beranda untuk mencari guru les privat terbaik.",
    robots: {
        index: false,
        follow: true,
    }
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-bold text-emerald-600">404</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mb-3">Halaman Tidak Ditemukan</h1>
                <p className="text-slate-600 mb-8">
                    Maaf, halaman yang Anda tuju sepertinya sudah tidak ada atau telah dipindahkan.
                </p>
                <div className="flex flex-col gap-3">
                    <Link href="/">
                        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                            <Home className="w-5 h-5" />
                            Kembali ke Beranda
                        </button>
                    </Link>
                    <Link href="/program">
                        <button className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                            <ArrowLeft className="w-5 h-5" />
                            Lihat Program
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
