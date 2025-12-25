import { FileText, MessageCircle, Users, CheckCircle } from 'lucide-react';

const Steps = () => {
    const steps = [
        {
            icon: <FileText className="w-8 h-8" />,
            title: 'Isi Formulir',
            description: 'Lengkapi data kebutuhan belajar Anda melalui formulir pendaftaran online.'
        },
        {
            icon: <MessageCircle className="w-8 h-8" />,
            title: 'Konsultasi Gratis',
            description: 'Tim kami akan menghubungi via WhatsApp untuk konfirmasi dan diskusi jadwal.'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Mulai Belajar',
            description: 'Guru terpilih datang ke rumah Anda atau mulai sesi online sesuai jadwal.'
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: 'Bayar Aman',
            description: 'Pembayaran dilakukan setelah sesi belajar selesai.'
        }
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Cara Mudah Mulai Belajar</h2>
                    <p className="text-slate-600">Hanya butuh 4 langkah sederhana</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <div key={index} className="relative text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full text-emerald-600 mb-4 ring-8 ring-emerald-50/50">
                                {step.icon}
                            </div>
                            <div className="absolute top-0 left-1/2 -ml-8 -mt-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-white">
                                {index + 1}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                            <p className="text-slate-600 text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Steps;
