
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Program Les Privat Terbaik TK, SD, SMP, SMA - Datangin Guru",
    description: "Pilihan program les privat lengkap untuk TK, SD, SMP, SMA, hingga Alumni. Kurikulum nasional & internasional dengan guru datang ke rumah.",
    keywords: ["les privat sd", "les privat smp", "les privat sma", "persiapan utbk", "program bimbel privat"],
    alternates: {
        canonical: '/program',
    },
};

export default function Page() {
    return <ClientPage />;
}
