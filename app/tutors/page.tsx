
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Cari Guru Les Privat Bandung Raya & Cimahi - Datangin Guru",
    description: "Temukan guru les privat profesional di area Bandung Raya, Cimahi, dan Jatinangor. Profil lengkap, tutor lulusan kampus ternama, dan jadwal fleksibel.",
    keywords: ["cari guru privat bandung", "guru les privat cimahi", "guru privat terdekat bandung", "guru les matematika bandung", "les privat datang ke rumah bandung", "tutor privat bandung barat"],
    alternates: {
        canonical: '/tutors',
    },
};

export default function Page() {
    return <ClientPage />;
}
