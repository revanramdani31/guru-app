'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Calculator, Languages, BookOpen, Code, Music, Palette, ChevronRight, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import tutorsData from '@/data/tutors.json';
import categoriesData from '@/data/categories.json';

// Icon mapping for categories
const iconMap: Record<string, React.ReactNode> = {
  'matematika': <Calculator className="w-5 h-5 md:w-6 md:h-6" />,
  'bahasa-inggris': <Languages className="w-5 h-5 md:w-6 md:h-6" />,
  'pemrograman': <Code className="w-5 h-5 md:w-6 md:h-6" />,
  'musik': <Music className="w-5 h-5 md:w-6 md:h-6" />,
  'desain': <Palette className="w-5 h-5 md:w-6 md:h-6" />,
  'mengaji': <BookOpen className="w-5 h-5 md:w-6 md:h-6" />,
};

export default function Home() {
  const router = useRouter();
  const featuredTutors = tutorsData.slice(0, 3);
  const allCategories = categoriesData;
  const [searchQuery, setSearchQuery] = useState('');
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tutors?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Format currency to IDR
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section - Superprof Style */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-8 md:py-16 text-center"
      >
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl md:rounded-3xl py-8 md:py-16 px-4 md:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-blue-900 mb-6 md:mb-8">
            Temukan guru yang sempurna
          </h1>

          {/* Search Bar - Mobile Responsive */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6 md:mb-8">
            <div className="relative bg-white rounded-full shadow-lg border-2 border-blue-100 flex items-center">
              <div className="pl-4 md:pl-6 pr-2 text-gray-400">
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Coba "Matematika"'
                className="flex-1 py-3 md:py-4 px-2 text-sm md:text-base text-gray-700 focus:outline-none rounded-full"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-8 py-2 md:py-3 rounded-full mr-1 md:mr-2 font-medium transition-colors text-sm md:text-base"
              >
                Cari
              </button>
            </div>
          </form>

          {/* Category Icons Row - Scrollable */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => {
                if (categoryScrollRef.current) {
                  categoryScrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
                }
              }}
              className="hidden sm:flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer mr-2 flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </button>

            <div
              ref={categoryScrollRef}
              className="flex items-center gap-1 md:gap-2 overflow-x-auto scrollbar-hide flex-1 max-w-full sm:max-w-xl px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {allCategories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <div className="flex flex-col items-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-3 hover:bg-white/50 rounded-lg md:rounded-xl transition-colors group cursor-pointer min-w-fit">
                    <div className="text-gray-600 group-hover:text-blue-600 transition-colors">
                      {iconMap[category.slug] || <BookOpen className="w-5 h-5 md:w-6 md:h-6" />}
                    </div>
                    <span className="text-xs md:text-sm text-gray-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                      {category.nama}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={() => {
                if (categoryScrollRef.current) {
                  categoryScrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
                }
              }}
              className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer ml-2 flex-shrink-0"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Featured Tutors */}
      <section className="py-8 md:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-1 md:mb-2">Guru Pilihan</h2>
            <p className="text-sm md:text-base text-gray-600">Temui guru berpengalaman kami</p>
          </div>
          <Link href="/tutors">
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center text-sm md:text-base">
              Lihat Semua
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTutors.map((tutor, index) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/tutors/${tutor.slug}`}>
                  <div className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all group cursor-pointer border border-gray-100">
                    {/* Photo Section with Overlay */}
                    <div className="relative h-72 overflow-hidden">
                      {tutor.foto ? (
                        <img
                          src={tutor.foto}
                          alt={tutor.nama}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <span className="text-7xl">👨‍🏫</span>
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                      {/* Name & Location on Photo */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-xl font-bold mb-1">{tutor.nama}</h3>
                        <p className="text-sm text-gray-200">
                          {tutor.lokasi} ({tutor.tipe === 'online' ? 'online' : tutor.tipe === 'tatap_muka' ? 'tatap muka' : 'online & tatap muka'})
                        </p>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-4">
                      <p className="text-blue-600 text-sm font-medium mb-2">{tutor.mapel.join(', ')}</p>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{tutor.deskripsi}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">{tutor.pengalaman} pengalaman</span>
                        <span className="text-blue-600 font-bold">{formatIDR(tutor.harga)}/jam</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-8 md:py-16 mb-8 md:mb-16"
      >
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Siap untuk Mulai Belajar?</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 text-blue-100">Terhubung dengan guru ahli kami hari ini</p>
          <Link href="/tutors">
            <button className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-blue-50 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-xl font-medium transition-all shadow-lg hover:shadow-xl">
              Temukan Guru Anda
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
