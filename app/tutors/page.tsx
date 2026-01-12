
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Cari Guru Les Privat Terdekat & Berkualitas - Datangin Guru",
    description: "Temukan 2000+ guru les privat profesional lulusan UI, ITB, UGM. Profil lengkap, rating transparan, dan jadwal fleksibel.",
    keywords: ["cari guru privat", "tutor les privat", "guru ngaji ke rumah", "guru matematika terdekat"],
    alternates: {
        canonical: '/tutors',
    },
};

export default function Page() {
    return <ClientPage />;
}
