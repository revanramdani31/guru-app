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
  metadataBase: new URL('https://datanginguru.com'),
  alternates: {
    canonical: '/',
  },
  title: "Datangin Guru - Jasa Les Privat Datang ke Rumah & Online Terbaik",
  description: "Layanan jasa guru les privat datang ke rumah dan online profesional di Indonesia. Bimbel privat TK, SD, SMP, SMA, SNBT, Mahasiswa & Umum untuk semua mata pelajaran dengan tutor berpengalaman.",
  keywords: "guru les privat, les privat datang ke rumah, guru privat, bimbel privat, les privat matematika, les privat terdekat, les privat online, datangin guru",
  authors: [{ name: "Datangin Guru" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Datangin Guru - Jasa Les Privat Datang ke Rumah",
    description: "Temukan guru les privat profesional untuk semua mata pelajaran dan jenjang.",
    type: "website",
    locale: "id_ID",
    url: 'https://datanginguru.com',
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
