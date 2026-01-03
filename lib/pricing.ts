// Program-centric pricing structure
// Programs: Les Privat, UTBK/SNBT, TOEFL/IELTS, Skripsi/Tesis, Jurnal Ilmiah

// Available programs
export const programs = [
    { id: 'les-privat', name: 'Les Privat', icon: '📚', description: 'Bimbingan belajar mata pelajaran' },
    { id: 'utbk', name: 'UTBK / SNBT', icon: '🎯', description: 'Persiapan seleksi masuk PTN' },
    { id: 'toefl-ielts', name: 'TOEFL / IELTS', icon: '🌍', description: 'Persiapan tes bahasa Inggris internasional' },
    { id: 'cpns', name: 'Persiapan CPNS', icon: '🏛️', description: 'Bimbingan tes seleksi CPNS' },
    { id: 'skripsi', name: 'Skripsi / Tesis', icon: '📝', description: 'Bimbingan tugas akhir' },
    { id: 'jurnal', name: 'Jurnal Ilmiah', icon: '📰', description: 'Bimbingan publikasi ilmiah' },
];

// Sub-options for each program
export const programOptions: { [key: string]: { label: string; options: string[] } } = {
    'les-privat': {
        label: 'Jenis Peserta',
        options: ['TK / PAUD', 'SD', 'SMP', 'SMA', 'Kuliah', 'Umum']
    },
    'utbk': {
        label: 'Fokus Persiapan',
        options: ['TPS (Tes Potensi Skolastik)', 'TKA Saintek', 'TKA Soshum', 'Paket Lengkap', 'Lainnya']
    },
    'toefl-ielts': {
        label: 'Jenis Tes',
        options: ['TOEFL ITP', 'TOEFL iBT', 'IELTS Academic', 'IELTS General', 'Lainnya']
    },
    'cpns': {
        label: 'Paket',
        options: ['Persiapan CPNS', 'Lainnya']
    },
    'skripsi': {
        label: 'Jenjang',
        options: ['Skripsi (S1)', 'Tesis (S2)', 'Disertasi (S3)', 'Lainnya']
    },
    'jurnal': {
        label: 'Jenis Publikasi',
        options: ['Jurnal Nasional Terakreditasi', 'Jurnal Internasional', 'Lainnya']
    }
};

// Mata pelajaran dan layanan lain untuk Les Privat berdasarkan Jenis Peserta
export const mataPelajaranByPeserta: { [key: string]: string[] } = {
    'TK / PAUD': ['Calistung', 'Mengaji', 'Musik', 'Renang', 'Lainnya'],
    'SD': ['Calistung', 'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPA', 'IPS', 'Mengaji', 'Musik', 'Renang', 'Lainnya'],
    'SMP': ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPA', 'IPS', 'Mengaji', 'Musik', 'Renang', 'Lainnya'],
    'SMA': ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Indonesia', 'Bahasa Inggris', 'Ekonomi', 'Akuntansi', 'Geografi', 'Sejarah', 'Sosiologi', 'Mengaji', 'Musik', 'Renang', 'Lainnya'],
    'Kuliah': ['Kalkulus', 'Fisika Dasar', 'Kimia Dasar', 'Statistika', 'Pemrograman', 'Akuntansi', 'Manajemen', 'Renang', 'Lainnya'],
    'Umum': ['Bahasa Inggris', 'Bahasa Asing', 'Musik', 'Renang', 'Komputer', 'Mengaji', 'Lainnya']
};

// Pricing structure (0 = kondisional / hubungi WA)
export const pricing: { [program: string]: { [option: string]: number } } = {
    'les-privat': {
        'TK / PAUD': 75000,
        'SD': 85000,
        'SMP': 95000,
        'SMA': 100000,
        'Kuliah': 150000,
        'Umum': 150000
    },
    'utbk': {
        'TPS (Tes Potensi Skolastik)': 130000,
        'TKA Saintek': 130000,
        'TKA Soshum': 130000,
        'Paket Lengkap': 130000
    },
    'toefl-ielts': {
        'TOEFL ITP': 150000,
        'TOEFL iBT': 150000,
        'IELTS Academic': 150000,
        'IELTS General': 150000
    },
    'cpns': {
        'Persiapan CPNS': 150000
    },
    'skripsi': {
        'Skripsi (S1)': 0,
        'Tesis (S2)': 0,
        'Disertasi (S3)': 0
    },
    'jurnal': {
        'Jurnal Nasional Terakreditasi': 0,
        'Jurnal Internasional': 0
    }
};

// Programs with conditional pricing (require WhatsApp consultation)
export const kondisionalPrograms = ['skripsi', 'jurnal', 'renang'];

// Check if program has conditional pricing
export function isKondisional(programId: string, option?: string, mapel?: string): boolean {
    if (kondisionalPrograms.includes(programId)) return true;
    if (option === 'Lainnya') return true;
    if (programId === 'les-privat' && mapel === 'Renang') return true;
    if (programId === 'les-privat' && mapel === 'Lainnya') return true;
    return false;
}

// Calculate price
export function calculatePrice(programId: string, option: string, mode: string, sessions: number = 1, mapel?: string): number {
    // Special handling for Renang
    if (programId === 'les-privat' && mapel === 'Renang') {
        return 0; // Kondisional
    }

    let price = pricing[programId]?.[option] || 0;

    // Conditional / Call WA
    if (price === 0) return 0;

    if (mode === 'Online' && price > 0) { // Fix: case sensitive check used in page 'Online' vs 'online'
        price -= 10000;
    } else if (mode === 'online' && price > 0) {
        price -= 10000;
    }

    return price * sessions;
}

// Format price to Indonesian format
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID').format(price);
}

// Get program by ID
export function getProgram(id: string) {
    return programs.find(p => p.id === id);
}

// Legacy exports for backward compatibility
export const basePrices = pricing;
export const layananByPeserta = mataPelajaranByPeserta;
export const kondisionalServices = ['Skripsi (S1)', 'Tesis (S2)', 'Disertasi (S3)', 'Jurnal Nasional Terakreditasi', 'Jurnal Internasional'];
export const pesertaOptions = ['TK / PAUD', 'SD', 'SMP', 'SMA', 'Kuliah', 'Umum'];
