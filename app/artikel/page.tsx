
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Blog Pendidikan, Tips Belajar & Info UTBK - Datangin Guru",
    description: "Kumpulan artikel pendidikan terbaru, tips belajar efektif, strategi lulus UTBK/SNBT, dan informasi beasiswa. Ditulis oleh tim akademik berpengalaman.",
    keywords: ["blog pendidikan", "tips belajar", "info utbk", "artikel bimbel", "cara belajar efektif", "tips lulus snbt", "strategi belajar matematika", "tips belajar bahasa inggris"],
    alternates: {
        canonical: '/artikel',
    },
};

export default function Page() {
    return <ClientPage />;
}
