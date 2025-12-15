import CategoryCard from '@/components/CategoryCard';
import categoriesData from '@/data/categories.json';

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Kategori Kursus
                    </h1>
                    <p className="text-xl text-blue-100">
                        Pilih kategori sesuai dengan minat dan kebutuhan Anda
                    </p>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <p className="text-gray-600 mb-6">
                    Menampilkan {categoriesData.length} kategori
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoriesData.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </div>
    );
}
