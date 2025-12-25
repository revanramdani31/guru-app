
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Tentang Datangin Guru - Lembaga Les Privat Profesional & Terpercaya",
    description: "Mengenal lebih dekat Datangin Guru. Visi, misi, dan nilai-nilai kami dalam menghadirkan pendidikan berkualitas ke rumah Anda.",
    keywords: ["lembaga les privat", "profil datangin guru", "tentang bimbel privat", "visi misi bimbel"],
};

export default function Page() {
    return <ClientPage />;
}
