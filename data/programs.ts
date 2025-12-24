import { BookOpen, GraduationCap, Globe, Target, FileText, BookMarked } from 'lucide-react';

export const programs = [
    {
        id: 'les-privat',
        title: 'Les Privat',
        subtitle: 'Bimbingan Belajar Personal',
        shortDescription: 'Program les privat untuk siswa SD, SMP, dan SMA dengan guru yang datang ke rumah atau secara online.',
        fullDescription: 'Program Les Privat kami dirancang untuk memberikan pengalaman belajar yang personal dan fokus. Dengan rasio 1 guru untuk 1 siswa, pendekatan pembelajaran dapat disesuaikan sepenuhnya dengan gaya belajar dan kecepatan menangkap materi siswa. Kami melayani jenjang TK, SD, SMP, hingga SMA untuk berbagai mata pelajaran sesuai kurikulum nasional.',
        details: 'Metode belajar yang disesuaikan dengan kebutuhan siswa. Guru datang ke rumah atau via online. Pilihan jadwal fleksibel. Tersedia semua mata pelajaran sesuai kurikulum nasional.',
        icon: 'BookOpen',
        color: 'emerald',
        features: [
            'Semua mata pelajaran sekolah',
            'Guru berpengalaman & tersertifikasi',
            'Jadwal fleksibel (Pagi/Siang/Sore/Malam)',
            'Laporan perkembangan berkala untuk orang tua',
            'Fokus pemahaman konsep, bukan hafal mati'
        ],
        curriculum: [
            'Pendalaman materi sekolah',
            'Bantuan mengerjakan PR dan Tugas',
            'Persiapan Ulangan Harian (UH)',
            'Persiapan Ujian Tengah Semester (UTS)',
            'Persiapan Ujian Akhir Semester (UAS)'
        ],
        priceStart: '75.000',
        targetAudience: 'Siswa TK, SD, SMP, dan SMA yang membutuhkan pendampingan belajar intensif.'
    },
    {
        id: 'utbk',
        title: 'UTBK / Seleksi PTN',
        subtitle: 'Persiapan Masuk Perguruan Tinggi',
        shortDescription: 'Program intensif persiapan UTBK-SNBT dan seleksi mandiri PTN favorit dengan strategi jitu dan tryout berkala.',
        fullDescription: 'Wujudkan mimpinya masuk PTN favorit bersama program intensif UTBK & Seleksi Mandiri. Kami menyediakan materi yang komprehensif mencakup Tes Potensi Skolastik (TPS) dan Tes Literasi. Dilatih langsung oleh tutor alumni PTN ternama yang paham betul strategi menaklukkan soal-soal HOTS.',
        details: 'Materi mencakup Tes Potensi Skolastik (TPS), Literasi Bahasa Indonesia & Inggris, dan Penalaran Matematika. Latihan soal intensif dan pembahasan trik cepat.',
        icon: 'GraduationCap',
        color: 'blue',
        features: [
            'Materi TPS & Tes Literasi Lengkap',
            'Tryout Berkala (MIRIP Asli)',
            'Bedah Soal metode Cepat & Tepat',
            'Konsultasi Rasionalisasi Jurusan',
            'Webinar Motivasi & Strategi Masuk PTN'
        ],
        curriculum: [
            'Penalaran Umum',
            'Pengetahuan Kuantitatif',
            'Pemahaman Bacaan dan Menulis',
            'Pengetahuan dan Pemahaman Umum',
            'Literasi Bahasa Indonesia & Inggris',
            'Penalaran Matematika'
        ],
        priceStart: '150.000',
        targetAudience: 'Siswa SMA kelas 12 dan Gap Year yang ingin lolos SBMPTN / SNBT.'
    },
    {
        id: 'toefl-ielts',
        title: 'TOEFL & IELTS',
        subtitle: 'Persiapan Tes Bahasa Inggris',
        shortDescription: 'Kursus persiapan TOEFL ITP/iBT untuk keperluan akademik, beasiswa, atau karir profesional.',
        fullDescription: 'Tingkatkan skor kemampuan bahasa Inggris Anda untuk keperluan studi lanjut (S2/S3), beasiswa LPDP/AAS, atau karir profesional. Program kami mencakup strategi mengerjakan soal Listening, Structure/Grammar, Reading, serta Speaking dan Writing untuk IELTS/TOEFL iBT.',
        details: 'Fokus pada peningkatan skor TOEFL. Simulasi tes berkala, bedah soal listening, structure, reading, dan writing. Tips & trik meraih skor 550+.',
        icon: 'Globe',
        color: 'purple',
        features: [
            'Coverage: Listening, Structure, Reading',
            'Plus Speaking & Writing untuk IELTS/iBT',
            'Placement Test & Post Test',
            'Simulasi Ujian (Scoring Prediction)',
            'Tips & Trik Manajemen Waktu'
        ],
        curriculum: [
            'Diagnostic Test',
            'Skill Building (Grammar & Vocab)',
            'Test Taking Strategies',
            'Full Simulation Tests',
            'Personal Feedback Session'
        ],
        priceStart: '200.000',
        targetAudience: 'Mahasiswa, Umum, dan Profesional yang mengejar skor target TOEFL/IELTS.'
    },
    {
        id: 'cpns',
        title: 'Persiapan CPNS',
        subtitle: 'Lolos Seleksi ASN',
        shortDescription: 'Program bimbingan intensif SKD (TIU, TWK, TKP) dan SKB untuk persiapan tes CPNS.',
        fullDescription: 'Persiapkan diri menghadapi seleksi abdi negara dengan matang. Program CPNS kami membedah tuntas materi Seleksi Kompetensi Dasar (SKD) dengan metode yang mudah dipahami dan teknik pengerjaan soal cepat "satu menit per soal".',
        details: 'Kupas tuntas materi Seleksi Kompetensi Dasar (SKD) meliputi TIU, TWK, dan TKP. Latihan CAT simulasi ujian sebenarnya. Strategi manajemen waktu ujian.',
        icon: 'Target',
        color: 'teal',
        features: [
            'Materi Lengkap SKD (TIU, TWK, TKP)',
            'Latihan Soal CAT (Computer Assisted Test)',
            'Trik Pengerjaan Cepat (Smart Solution)',
            'Update Soal-soal Terbaru (FR Tahun Lalu)'
        ],
        curriculum: [
            'Tes Intelegensia Umum (Hitung Cepat, Logika, Verbal)',
            'Tes Wawasan Kebangsaan (Pilar Negara, Sejarah)',
            'Tes Karakteristik Pribadi (Pelayanan, Jejaring Kerja)',
            'Manajemen Waktu Ujian'
        ],
        priceStart: '150.000',
        targetAudience: 'Pejuang NIP yang ingin lulus seleksi CPNS / PPPK.'
    },
    {
        id: 'jurnal',
        title: 'Jurnal Ilmiah',
        subtitle: 'Pendampingan Publikasi',
        shortDescription: 'Bimbingan penulisan dan publikasi jurnal atau artikel ilmiah nasional maupun internasional.',
        fullDescription: 'Jasa pendampingan publikasi ilmiah untuk mahasiswa dan dosen. Kami membantu mulai dari review draft, parafrase, proofreading, format layout sesuai template jurnal, hingga proses submission dan revisi dari reviewer. Target jurnal Sinta (Nasional) atau Scopus (Internasional).',
        details: 'Pendampingan dari draft hingga submit. Review substansi dan format. Bantuan pemilihan jurnal terakreditasi Sinta atau Scopus yang sesuai.',
        icon: 'FileText',
        color: 'amber',
        features: [
            'Review Substansi & Metodologi',
            'Editing & Proofreading Bahasa',
            'Formatting (Reference Manager Mendeley/Zotero)',
            'Pemilihan Target Jurnal yang Tepat',
            'Pendampingan Submit & Revisi'
        ],
        curriculum: [
            'Bedah Naskah',
            'Perbaikan Struktur IMRaD',
            'Enhancing Academic English',
            'Reference Management',
            'Journal Selection Strategy'
        ],
        priceStart: '500.000',
        targetAudience: 'Mahasiswa S2/S3 dan Dosen yang membutuhkan publikasi ilmiah.'
    },
    {
        id: 'skripsi',
        title: 'Skripsi / Tesis',
        subtitle: 'Bimbingan Tugas Akhir',
        shortDescription: 'Pendampingan penyusunan skripsi, tesis, atau disertasi dari awal hingga sidang.',
        fullDescription: 'Hadapi tugas akhir dengan percaya diri. Mentor kami adalah lulusan S2/S3 yang siap menjadi teman diskusi Anda dalam merumuskan judul, menyusun proposal, olah data statistik, hingga persiapan presentasi sidang.',
        details: 'Diskusi intensif terkait judul, latar belakang, metode penelitian, hingga pembahasan hasil. Bimbingan teknis penulisan sesuai pedoman kampus.',
        icon: 'BookMarked',
        color: 'rose',
        features: [
            'bimbingan Judul & Bab 1-3',
            'Konsultasi Metodologi Penelitian',
            'Bantuan Olah Data (SPSS, SEM-PLS, dll)',
            'Review Tata Tulis & PUEBI',
            'Simulasi Sidang Sempro / Kompre'
        ],
        curriculum: [
            'Brainstorming Topik',
            'Penyusunan Proposal',
            'Pengambilan & Pengolahan Data',
            'Penulisan Hasil & Pembahasan',
            'Revisi & Finalisasi'
        ],
        priceStart: '300.000',
        targetAudience: 'Mahasiswa tingkat akhir (S1/S2/S3) yang sedang menyusun Tugas Akhir.'
    }
];

export const getProgramById = (id: string) => programs.find(p => p.id === id);
