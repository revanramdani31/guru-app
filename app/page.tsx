'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, FileText, Users, MessageCircle, Clock, Shield, Award, Phone, MapPin, GraduationCap, Star, BookOpen, Calculator } from 'lucide-react';
import Image from 'next/image';
import { programs } from '@/data/programs';
import tutorsData from '@/data/tutors.json';
import { blogs } from '@/data/articles';

interface Tutor {
  id: number;
  slug: string;
  nama: string;
  mapel: string[];
  lokasi: string;
  tipe: string;
  tingkat: string[];
  foto: string;
  pendidikan: string;
}

export default function Home() {
  const featuredTutors = (tutorsData as Tutor[]).slice(0, 4);
  const featuredBlogs = blogs.slice(0, 3);
  const startPrograms = programs.slice(0, 3); // Take first 3 programs

  const steps = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Isi Formulir',
      description: 'Lengkapi data kebutuhan belajar Anda melalui formulir pendaftaran online.'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Konsultasi Gratis',
      description: 'Tim kami akan menghubungi via WhatsApp untuk konfirmasi dan diskusi jadwal.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Mulai Belajar',
      description: 'Guru terpilih datang ke rumah Anda atau mulai sesi online sesuai jadwal.'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Bayar Aman',
      description: 'Pembayaran dilakukan setelah sesi belajar selesai.'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-emerald-600 text-white overflow-hidden pt-24 pb-32 -mt-10 md:-mt-14">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
              Les Privat Tanpa Ribet,
              <span className="block text-emerald-100 text-shadow-sm mt-2">Guru Datang ke Rumah</span>
            </h1>
            <p className="text-emerald-50 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-sm">
              Temukan guru privat terbaik untuk TK, SD, SMP, SMA, hingga Umum.
              Belajar jadi lebih fokus, nyaman, dan efektif.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
              <Link href="/daftar">
                <button className="inline-flex items-center justify-center bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Cari Guru Sekarang
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
              <Link href="/biaya">
                <button className="inline-flex items-center justify-center bg-emerald-700/50 hover:bg-emerald-700 text-emerald-100 hover:text-white px-8 py-4 text-lg rounded-xl font-semibold transition-all backdrop-blur-sm border border-emerald-500/30">
                  <Calculator className="w-5 h-5 mr-2" />
                  Cek Biaya
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <div className="mt-16 max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Siswa Aktif', value: '5000+' },
              { label: 'Guru Terdaftar', value: '2000+' },
              { label: 'Rating Rata-rata', value: '4.8/5' },
              { label: 'Kota Jangkauan', value: '50+' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10"
              >
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-emerald-100 text-xs md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Curved Divider */}
        <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0]">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(113%+1.3px)] h-[60px] fill-white opacity-100">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
          </svg>
        </div>
      </section>

      {/* Tentang Section */}
      <section className="py-12 md:py-16 bg-white -mt-1 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-emerald-600 font-bold text-sm tracking-wider uppercase mb-3 block">Tentang Kami</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Solusi Belajar Privat Terbaik
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Datangin Guru adalah lembaga les privat yang menghadirkan guru langsung ke rumah siswa. Kami menyediakan bimbingan belajar untuk semua jenjang—dari SD, SMP, SMA, hingga mahasiswa dan profesional. Dengan jadwal fleksibel, metode personal, dan guru berkualitas, Datangin Guru menghadirkan pengalaman belajar yang lebih fokus, nyaman, dan efektif tanpa harus keluar rumah.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works (Shortened) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Cara Mudah Mulai Belajar</h2>
            <p className="text-slate-600">Hanya butuh 4 langkah sederhana</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full text-emerald-600 mb-4 ring-8 ring-emerald-50/50">
                  {step.icon}
                </div>
                <div className="absolute top-0 left-1/2 -ml-8 -mt-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-white">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Unggulan Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Program Unggulan</h2>
              <p className="text-slate-600">Pilih jenjang pendidikan yang sesuai dengan kebutuhan.</p>
            </div>
            <Link href="/program" className="hidden md:flex items-center text-emerald-600 font-semibold hover:gap-2 transition-all">
              Lihat Semua <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {startPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${program.color}-100 text-${program.color}-600`}>
                  {/* Using generic icon for simplicity, could map specifically */}
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">{program.title}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{program.shortDescription}</p>
                <Link href={`/program?id=${program.id}`} className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                  Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link href="/program">
              <button className="w-full py-3 bg-white border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50">
                Lihat Semua Program
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tutors Section */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Guru Pilihan Kami</h2>
            <p className="text-slate-600">Pengajar berpengalaman yang siap membantu Anda</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredTutors.map((tutor, index) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-200 transition-all group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  {tutor.foto ? (
                    <img src={tutor.foto} alt={tutor.nama} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">👨‍🏫</div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-emerald-700 flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" /> 4.9
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1">{tutor.nama}</h3>
                  <p className="text-emerald-600 text-xs font-semibold mb-2">{tutor.mapel.slice(0, 2).join(', ')}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <GraduationCap className="w-3 h-3" />
                    <span className="line-clamp-1">{tutor.pendidikan}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{tutor.lokasi}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/tutors">
              <button className="px-8 py-3 bg-white text-emerald-600 border border-emerald-200 rounded-xl font-semibold hover:bg-emerald-50 transition-all inline-flex items-center gap-2">
                Lihat Semua Guru <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cost Simulation & CTA */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ingin Tahu Estimasi Biaya?</h2>
                <p className="text-slate-300 text-lg mb-6">
                  Kami menyediakan simulasi biaya yang transparan agar Anda bisa merencanakan budget pendidikan dengan tepat. Tanpa biaya tersembunyi.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-emerald-300">
                    <CheckCircle className="w-4 h-4" /> Sesuaikan Budget
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-300">
                    <CheckCircle className="w-4 h-4" /> Transparan
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-300">
                    <CheckCircle className="w-4 h-4" /> Bebas Pilih Paket
                  </div>
                </div>
              </div>
              <Link href="/biaya" className="flex-shrink-0">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Hitung Biaya Sekarang
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Student Registration CTA */}
      <section className="py-12 md:py-16 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Siap Untuk Meningkatkan Prestasi?
              </h2>
              <p className="text-emerald-100 text-lg md:text-xl font-medium leading-relaxed">
                Daftarkan diri Anda sekarang dan dapatkan guru privat terbaik yang sesuai dengan kebutuhan belajar Anda. Mulai perjalanan sukses Anda bersama Datangin Guru.
              </p>
            </div>
            <Link href="/daftar" className="flex-shrink-0">
              <button className="bg-white text-emerald-600 hover:bg-emerald-50 px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2">
                Daftar Sebagai Siswa <ArrowRight className="w-5 h-5 ml-1" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Become a Teacher CTA */}
      <section className="py-12 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 order-2 md:order-1">
              <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                Karir
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Ingin Menjadi Pengajar?</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Bergabunglah dengan ribuan pengajar lainnya. Bagikan ilmu Anda, atur jadwal secara fleksibel, dan dapatkan penghasilan tambahan yang menarik.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/karir">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-emerald-600/20 transition-all flex items-center gap-2">
                    Daftar Jadi Guru <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <a href="https://wa.me/6283823245965" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> Tanya Admin
                </a>
              </div>
            </div>
            <div className="flex-1 order-1 md:order-2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-dashed border-emerald-300 rounded-full animate-spin-slow"></div>
                <Users className="w-32 h-32 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Tips & Artikel Terbaru</h2>
              <p className="text-slate-600">Informasi bermanfaat seputar pendidikan.</p>
            </div>
            <Link href="/artikel" className="hidden md:flex items-center text-emerald-600 font-semibold hover:gap-2 transition-all">
              Lihat Semua <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredBlogs.map((blog, index) => (
              <Link href="/artikel" key={blog.id} className="group cursor-pointer">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-700">
                      {blog.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <Clock className="w-3 h-3" /> {blog.readTime}
                    <span>•</span> {blog.date}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2">{blog.excerpt}</p>
                </motion.article>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/artikel">
              <button className="w-full py-3 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50">
                Baca Artikel Lainnya
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Complaint Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Layanan Pengaduan & Bantuan</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Kami berkomitmen untuk memberikan pelayanan terbaik. Jika Anda memiliki kritik, saran, atau kendala selama menggunakan layanan kami, jangan ragu untuk menyampaikannya.
          </p>
          <Link href="/pengaduan">
            <button className="bg-white text-red-600 border border-red-200 hover:bg-red-50 px-8 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-2 mx-auto">
              <MessageCircle className="w-5 h-5" />
              Buat Pengaduan
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
