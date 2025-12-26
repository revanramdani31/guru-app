# Panduan Update Data & Opsi

Dokumen ini berisi panduan untuk mengubah opsi-opsi pada formulir pendaftaran, baik untuk **Guru (Lamaran)** maupun **Siswa (Pendaftaran Les)**.

---

## A. Pendaftaran Guru (Lamaran)

Bagian ini untuk mengubah opsi yang muncul di halaman **Daftar Jadi Guru**.

### 1. Lokasi File
`d:\guru-app\app\karir\ClientPage.tsx`

### 2. Mengubah Opsi Mata Pelajaran
Cari variabel `mataPelajaranOptions` (sekitar baris 43):
```typescript
const mataPelajaranOptions = [
    'Matematika', 'Bahasa Indonesia', '...', 
    'Bimbingan Tesis', 'Pendampingan Publikasi', 'Lainnya'
];
```
*   **Tambah/Hapus**: Edit langsung di dalam kurung siku `[]`.
*   **Format**: Gunakan tanda kutip tunggal `'text'`.

### 3. Mengubah Opsi Jenjang & Pendidikan
*   **Jenjang**: Cari `jenjangOptions`.
*   **Pendidikan Terakhir**: Cari `pendidikanOptions`.

---

## B. Pendaftaran Siswa (Formulir Les)

Bagian ini untuk mengubah opsi program, mata pelajaran, dan harga yang muncul di halaman **Daftar Les Privat** dan simulasi biaya.

### 1. Lokasi File
`d:\guru-app\lib\pricing.ts`

File ini adalah pusat data untuk semua opsi pendaftaran siswa.

### 2. Mengubah Daftar Program Utama
Cari variabel `programs`:
```typescript
export const programs = [
    { id: 'les-privat', name: 'Les Privat', ... },
    { id: 'utbk', name: 'UTBK / SNBT', ... },
    // ...
];
```
*   `id`: Kode unik (jangan pakai spasi).
*   `name`: Nama yang muncul di website.

### 3. Mengubah Detil Opsi Program
Cari variabel `programOptions`. Ini mengatur dropdown kedua setelah memilih program (misal: pilih Jenjang Sekolah atau Jenis Tes).

```typescript
export const programOptions = {
    'les-privat': {
        label: 'Jenis Peserta',
        options: ['TK / PAUD', 'SD', 'SMP', 'SMA', 'Kuliah']
    },
    // ...
};
```
*   Tambahkan item baru ke dalam array `options`.

### 4. Mengubah Mata Pelajaran per Jenjang (Khusus Les Privat)
Cari variabel `mataPelajaranByPeserta`. Ini mengatur mapel apa saja yang muncul ketika siswa memilih jenjang tertentu (misal: SD hanya muncul Calistung, Mat, IPA, dll).

```typescript
export const mataPelajaranByPeserta = {
    'SD': ['Calistung', 'Matematika', ...],
    'SMA': ['Matematika', 'Fisika', ...],
    // ...
};
```

### 5. Mengubah Harga
Cari variabel `pricing`. Harga dalam Rupiah (angka tanpa titik/koma).

```typescript
export const pricing = {
    'les-privat': {
        'SD': 85000,
        'SMA': 100000,
        // ...
    },
    // ...
};
```
*   Jika harga **0**, maka akan dianggap "Hubungi Admin" (Kondisional).

---

## C. Catatan Penting
1.  **Simpan File**: Tekan `Ctrl+S` setelah mengedit. Perubahan langsung aktif.
2.  **Google Sheets**: Perubahan nama opsi tidak memerlukan update di Google Apps Script (backend), karena data dikirim sebagai teks.
3.  **Konsistensi**: Pastikan ejaan sama persis jika mereferensikan nilai (misal antara `pricing` dan `programOptions`).
