
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Program Les Privat Terbaik TK, SD, SMP, SMA - Datangin Guru",
    description: "Pilihan program les privat lengkap untuk TK, SD, SMP, SMA, hingga Alumni. Kurikulum nasional & internasional dengan guru datang ke rumah.",
    keywords: ["les privat sd", "les privat smp", "les privat sma", "les privat tk", "persiapan utbk", "bimbel snbt", "les privat online", "program bimbel privat", "les privat datang ke rumah"],
    alternates: {
        canonical: '/program',
    },
};

export default function Page() {
    return <ClientPage />;
}
