import Link from 'next/link';
import TutorCard from '@/components/TutorCard';
import CategoryCard from '@/components/CategoryCard';
import tutorsData from '@/data/tutors.json';
import categoriesData from '@/data/categories.json';

export default function Home() {
  const popularTutors = tutorsData.slice(0, 6);
  const popularCategories = categoriesData.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Temukan Tutor Terbaik untuk Anda
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Ratusan tutor profesional siap membantu Anda mencapai tujuan belajar
          </p>
          <Link
            href="/tutors"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition shadow-lg"
          >
            Mulai Cari Tutor
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kategori Populer
            </h2>
            <p className="text-gray-600 text-lg">
              Pilih kategori sesuai kebutuhan belajar Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {popularCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/categories"
              className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              Lihat Semua Kategori →
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Tutors Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tutor Populer
            </h2>
            <p className="text-gray-600 text-lg">
              Temukan tutor terbaik dengan rating tertinggi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {popularTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/tutors"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Lihat Semua Tutor
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Memulai Pembelajaran?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Hubungi kami untuk informasi lebih lanjut
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition shadow-lg"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
  );
}
