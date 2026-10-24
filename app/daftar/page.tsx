
import { Metadata } from 'next';
import React, { Suspense } from 'react';
import ClientPage from './ClientPage';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
    title: "Daftar Les Privat Bandung Raya & Cimahi - Guru Datang ke Rumah",
    description: "Formulir pendaftaran les privat datang ke rumah di Kota Bandung, Cimahi, Bandung Barat, dan Sumedang. Dapatkan guru terbaik sesuai kebutuhan belajar Anda.",
    keywords: ["daftar les privat bandung", "les privat cimahi", "guru privat datang ke rumah bandung", "les privat bandung barat", "les privat jatinangor", "registrasi bimbel bandung", "cari guru les bandung"],
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
