
import { Metadata } from 'next';
import React, { Suspense } from 'react';
import ClientPage from './ClientPage';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
    title: "Lowongan Guru Les Privat / Tutor Privat - Gabung Datangin Guru",
    description: "Buka peluang karir sebagai guru les privat. Jadwal fleksibel, fee menarik, dan kesempatan mengajar siswa di seluruh Indonesia.",
    keywords: ["lowongan guru les", "loker guru privat", "jadi tutor online", "lowongan tenaga pengajar", "lowongan guru les jakarta", "lowongan guru les bandung", "kerja sampingan guru", "freelance guru les"],
    alternates: {
        canonical: '/karir',
    },
};

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>}>
            <ClientPage />
        </Suspense>
    );
}
