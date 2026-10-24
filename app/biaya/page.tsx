
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Biaya Les Privat Bandung & Cimahi - Tarif Hemat & Transparan",
    description: "Hitung estimasi biaya les privat datang ke rumah di area Bandung Raya dan Cimahi. Tarif transparan mulai dari Rp 75.000/sesi.",
    keywords: ["biaya les privat bandung", "harga les privat cimahi", "tarif guru privat bandung", "biaya guru ke rumah bandung", "les privat murah bandung"],
    alternates: {
        canonical: '/biaya',
    },
};

export default function Page() {
    return <ClientPage />;
}
