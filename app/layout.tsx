import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.datanginguru.com'),
  alternates: {
    canonical: '/',
  },
  title: "Datangin Guru - Jasa Les Privat Datang ke Rumah & Online | Bandung Raya & Cimahi",
  description: "Layanan jasa guru les privat datang ke rumah dan online profesional untuk area Bandung Raya, Cimahi, dan Jatinangor Sumedang. Bimbel privat TK, SD, SMP, SMA, SNBT, Mahasiswa & Umum dengan tutor berpengalaman.",
  keywords: "guru les privat, les privat datang ke rumah, guru privat bandung, bimbel privat cimahi, les privat matematika bandung, les privat terdekat, les privat online, datangin guru, les privat bandung, les privat cimahi, les privat bandung barat, les privat jatinangor, les privat sumedang, les privat sd, les privat smp, les privat sma",
  authors: [{ name: "Datangin Guru" }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon-192.png',
  },
  openGraph: {
    title: "Datangin Guru - Jasa Les Privat Datang ke Rumah | Bandung Raya & Cimahi",
    description: "Temukan guru les privat profesional untuk semua mata pelajaran dan jenjang di area Bandung Raya, Cimahi, dan Jatinangor.",
    type: "website",
    locale: "id_ID",
    url: 'https://www.datanginguru.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <Suspense fallback={<div className="h-16 bg-white shadow-lg" />}>
          <Header />
        </Suspense>
        <main className="min-h-screen bg-white">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
