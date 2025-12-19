'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, FileText, Users, MessageCircle, Clock, Shield, Award, Phone } from 'lucide-react';

export default function Home() {
  const steps = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Isi Formulir',
      description: 'Lengkapi data kebutuhan belajar Anda melalui formulir pendaftaran online lalu hubungi admin untuk konfirmasi.'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Admin Hubungi Anda',
      description: 'Tim kami akan menghubungi via WhatsApp untuk konfirmasi dan diskusi jadwal.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Guru Datang & Mulai Belajar',
      description: 'Guru terpilih datang ke rumah Anda sesuai jadwal yang disepakati.'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Bayar Setelah Les',
      description: 'Pembayaran dilakukan langsung ke guru setelah sesi belajar selesai.'
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Guru Terseleksi',
      description: 'Semua guru melalui proses verifikasi untuk memastikan kualitas dan profesionalisme.'
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: 'Jadwal Fleksibel',
      description: 'Belajar sesuai waktu yang Anda tentukan, baik pagi, siang, atau malam.'
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: 'Layanan Personal',
      description: 'Pendekatan belajar disesuaikan dengan gaya dan kebutuhan masing-masing siswa.'
    }
  ];

  const subjects = [
    'Matematika', 'Fisika', 'Kimia', 'Biologi',
    'Bahasa Inggris', 'Bahasa Indonesia', 'IPA', 'IPS',
    'Mengaji', 'Musik', 'Komputer', 'dan lainnya'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section - Service Focused */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-20"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Les Privat Berkualitas,
            <span className="block text-emerald-600">Guru Datang ke Rumah</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Kami bantu carikan guru les privat terbaik untuk anak Anda.
            Cukup daftar, tim kami yang urus sisanya.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/daftar">
              <button className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5">
                Daftar Les Privat
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
            <a href="https://wa.me/6283820757532?text=Halo,%20saya%20ingin%20bertanya%20tentang%20les%20privat" target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center justify-center bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg rounded-xl font-semibold transition-all">
                <Phone className="w-5 h-5 mr-2" />
                Hubungi Admin
              </button>
            </a>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <section className="py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Cara Kerjanya</h2>
          <p className="text-slate-600">Proses mudah dalam 4 langkah</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-100/50 border border-slate-100 text-center hover:shadow-xl hover:border-emerald-100 transition-all h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl text-emerald-600 mb-5">
                  {step.icon}
                </div>
                <div className="absolute top-4 left-4 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>

              {/* Arrow between cards */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-emerald-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subjects We Cover */}
      <section className="py-12 md:py-16">
        <div className="bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-teal-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Mata Pelajaran</h2>
            <p className="text-slate-600">Tersedia guru untuk berbagai mata pelajaran</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {subjects.map((subject, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white rounded-full text-slate-700 text-sm font-medium shadow-sm border border-slate-100"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Kenapa Pilih Kami?</h2>
          <p className="text-slate-600">Layanan les privat yang Anda bisa andalkan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-100/50 border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{benefit.title}</h3>
                  <p className="text-slate-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-8 md:py-16 mb-8 md:mb-16"
      >
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-14 text-center text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Siap Memulai Les Privat?</h2>
            <p className="text-lg md:text-xl mb-8 text-emerald-100 max-w-2xl mx-auto">
              Daftarkan anak Anda sekarang. Tim kami siap membantu mencarikan guru terbaik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/daftar">
                <button className="inline-flex items-center justify-center bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Daftar Sekarang
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-emerald-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Gratis Konsultasi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Guru Terverifikasi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Jadwal Fleksibel</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
