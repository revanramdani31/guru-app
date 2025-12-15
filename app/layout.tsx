import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GuruKu - Platform Tutor Terbaik di Indonesia",
  description: "Temukan tutor profesional untuk berbagai mata pelajaran. Dari matematika, bahasa, musik hingga pemrograman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Suspense fallback={<div className="h-16 bg-white shadow-lg" />}>
          <Header />
        </Suspense>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
