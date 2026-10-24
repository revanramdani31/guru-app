
import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
    title: "Program Les Privat TK, SD, SMP, SMA Bandung Raya - Datangin Guru",
    description: "Program les privat lengkap untuk TK, SD, SMP, SMA, hingga SNBT di area Bandung Raya & Cimahi. Guru datang langsung ke rumah Anda.",
    keywords: ["les privat sd bandung", "les privat smp bandung", "les privat sma bandung", "les privat datang ke rumah bandung", "bimbel privat cimahi", "les privat jatinangor"],
    alternates: {
        canonical: '/program',
    },
};

export default function Page() {
    return <ClientPage />;
}
