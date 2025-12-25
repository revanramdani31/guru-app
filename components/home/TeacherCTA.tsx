import Link from 'next/link';
import { ArrowRight, MessageCircle, Users } from 'lucide-react';

const TeacherCTA = () => {
    return (
        <section className="py-12 md:py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 order-2 md:order-1">
                        <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                            Karir
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">Ingin Menjadi Pengajar?</h2>
                        <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                            Bergabunglah dengan ribuan pengajar lainnya. Bagikan ilmu Anda, atur jadwal secara fleksibel, dan dapatkan penghasilan tambahan yang menarik.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/karir">
                                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-emerald-600/20 transition-all flex items-center gap-2">
                                    Daftar Jadi Guru <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <a href="https://wa.me/6283823245965" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2">
                                <MessageCircle className="w-5 h-5" /> Tanya Admin
                            </a>
                        </div>
                    </div>
                    <div className="flex-1 order-1 md:order-2 flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 bg-emerald-100 rounded-full flex items-center justify-center">
                            <div className="absolute inset-0 border-2 border-dashed border-emerald-300 rounded-full animate-spin-slow"></div>
                            <Users className="w-32 h-32 text-emerald-500" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeacherCTA;
