import { Metadata } from 'next';
import tutorsData from '@/data/tutors.json';
import TutorDetailClient from '@/components/tutor/TutorDetailClient';

// Helper interface for finding tutor (duplicated here for server component use, ideally in a shared types file)
interface Tutor {
    id: number;
    slug: string;
    nama: string;
    mapel: string[];
    lokasi: string;
    tipe: string;
    tingkat: string[];
    foto: string;
    deskripsi: string;
    pendidikan: string;
    kategori: string[];
    whatsapp: string;
    email: string;
}

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.slug;
    const tutor = (tutorsData as Tutor[]).find(t => t.slug === slug);

    if (!tutor) {
        return {
            title: 'Guru Tidak Ditemukan',
        };
    }

    return {
        title: `${tutor.nama} - Guru Les Privat ${tutor.mapel.join(', ')} | Datangin Guru`,
        description: `${tutor.nama} adalah guru les privat di ${tutor.lokasi} untuk mata pelajaran ${tutor.mapel.join(', ')}. ${tutor.deskripsi}`,
        openGraph: {
            title: `${tutor.nama} - Guru Les Privat`,
            description: tutor.deskripsi,
            images: [tutor.foto || '/images/default-tutor.jpg'],
        },
    };
}

export default function TutorDetailPage({ params }: Props) {
    return <TutorDetailClient slug={params.slug} />;
}
