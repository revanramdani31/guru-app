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
  title: "datanginguru Privat - Guru Les Privat Terbaik di Indonesia",
  description: "Temukan guru les privat profesional untuk berbagai mata pelajaran. Matematika, Bahasa Inggris, Musik, Pemrograman, dan banyak lagi. Belajar dengan nyaman di rumah atau online.",
  keywords: "guru privat, les privat, tutor, bimbel, matematika, bahasa inggris, online, tatap muka",
  authors: [{ name: "datanginguru Privat" }],
  openGraph: {
    title: "datanginguru Privat - Guru Les Privat Terbaik",
    description: "Temukan guru les privat profesional untuk berbagai mata pelajaran.",
    type: "website",
    locale: "id_ID",
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
