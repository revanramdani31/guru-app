
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Cari Guru Les Privat Terdekat & Berkualitas - Datangin Guru",
    description: "Temukan 2000+ guru les privat profesional lulusan UI, ITB, UGM. Profil lengkap, rating transparan, dan jadwal fleksibel.",
    keywords: ["cari guru privat", "tutor les privat", "guru privat terdekat", "guru les matematika", "guru les bahasa inggris", "les privat datang ke rumah", "guru privat online", "guru ngaji ke rumah"],
    alternates: {
        canonical: '/tutors',
    },
};

export default function Page() {
    return <ClientPage />;
}
