
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Layanan Pengaduan Pelanggan & Saran - Datangin Guru",
    description: "Punya kendala atau saran? Sampaikan melalui Layanan Pengaduan Datangin Guru. Kami siap mendengar dan memberikan solusi terbaik untuk Anda.",
    keywords: ["layanan pengaduan", "customer service bimbel", "keluhan pelanggan", "saran dan masukan"],
};

export default function Page() {
    return <ClientPage />;
}
