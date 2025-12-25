import Link from 'next/link';
import { Shield, MessageCircle } from 'lucide-react';

const ComplaintCTA = () => {
    return (
        <section className="py-12 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-4">
                    <Shield className="w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Layanan Pengaduan & Bantuan</h2>
                <p className="text-slate-600 max-w-2xl mx-auto mb-8">
                    Kami berkomitmen untuk memberikan pelayanan terbaik. Jika Anda memiliki kritik, saran, atau kendala selama menggunakan layanan kami, jangan ragu untuk menyampaikannya.
                </p>
                <Link href="/pengaduan">
                    <button className="bg-white text-red-600 border border-red-200 hover:bg-red-50 px-8 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-2 mx-auto">
                        <MessageCircle className="w-5 h-5" />
                        Buat Pengaduan
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default ComplaintCTA;
