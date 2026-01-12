import Link from 'next/link';
import { CheckCircle, Calculator } from 'lucide-react';

const CostSimulation = () => {
    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-14 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 !text-emerald-500">Ingin Tahu Estimasi Biaya?</h2>
                            <p className="text-slate-300 text-lg mb-6">
                                Kami menyediakan simulasi biaya yang transparan agar Anda bisa merencanakan budget pendidikan dengan tepat. Tanpa biaya tersembunyi.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-sm text-emerald-300">
                                    <CheckCircle className="w-4 h-4" /> Sesuaikan Budget
                                </div>
                                <div className="flex items-center gap-2 text-sm text-emerald-300">
                                    <CheckCircle className="w-4 h-4" /> Transparan
                                </div>
                                <div className="flex items-center gap-2 text-sm text-emerald-300">
                                    <CheckCircle className="w-4 h-4" /> Bebas Pilih Paket
                                </div>
                            </div>
                        </div>
                        <Link href="/biaya" className="flex-shrink-0">
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2">
                                <Calculator className="w-5 h-5" />
                                Hitung Biaya Sekarang
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CostSimulation;
