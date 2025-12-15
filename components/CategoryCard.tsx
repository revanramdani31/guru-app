import Link from 'next/link';

interface CategoryCardProps {
    category: {
        id: number;
        nama: string;
        slug: string;
        ikon: string;
        deskripsi: string;
    };
}

export default function CategoryCard({ category }: Readonly<CategoryCardProps>) {
    return (
        <Link href={`/categories/${category.slug}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-6 cursor-pointer h-full border-2 border-transparent hover:border-blue-500">
                <div className="text-center">
                    <div className="text-6xl mb-4">{category.ikon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{category.nama}</h3>
                    <p className="text-gray-600 text-sm">{category.deskripsi}</p>
                </div>
            </div>
        </Link>
    );
}
