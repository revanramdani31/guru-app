
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Simulasi Biaya Les Privat Hemat & Transparan - Datangin Guru",
    description: "Hitung estimasi biaya les privat Anda sekarang. Harga transparan mulai dari Rp 85.000/sesi. Sesuaikan dengan kebutuhan dan budget.",
    keywords: ["biaya les privat", "harga bimbel privat", "les privat murah", "biaya guru ke rumah"],
};

export default function Page() {
    return <ClientPage />;
}
