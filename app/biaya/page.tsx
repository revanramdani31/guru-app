
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Simulasi Biaya Les Privat Hemat & Transparan - Datangin Guru",
    description: "Hitung estimasi biaya les privat Anda sekarang. Harga transparan mulai dari Rp 75.000/sesi. Sesuaikan dengan kebutuhan dan budget.",
    keywords: ["biaya les privat", "harga bimbel privat", "les privat murah", "biaya guru ke rumah", "tarif les privat per jam", "harga les privat sd", "harga les privat smp", "harga les privat sma"],
    alternates: {
        canonical: '/biaya',
    },
};

export default function Page() {
    return <ClientPage />;
}
