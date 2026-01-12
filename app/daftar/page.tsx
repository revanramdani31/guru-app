
import { Metadata } from 'next';
import React, { Suspense } from 'react';
import ClientPage from './ClientPage';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
    title: "Daftar Les Privat Guru Datang ke Rumah - Datangin Guru",
    description: "Formulir pendaftaran les privat. Isi data diri dan kriteria guru yang diinginkan. Tim kami akan segera mencarikan tutor yang cocok untuk Anda.",
    keywords: ["daftar les privat", "registrasi bimbel", "cari guru ngaji", "bimbingan belajar intensif"],
    alternates: {
        canonical: '/daftar',
    },
};

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>}>
            <ClientPage />
        </Suspense>
    );
}
