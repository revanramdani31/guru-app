// =====================================================
// GOOGLE APPS SCRIPT - datanginguru Privat Form Handler
// =====================================================
// 
// CARA SETUP:
// 1. Buka Google Sheets baru: https://sheets.new
// 2. Beri nama: "datanginguru - Form Responses"
// 3. Buat 2 sheet (tab): "Pendaftaran Siswa" dan "Lamaran Guru"
// 4. Klik Extensions > Apps Script
// 5. Hapus semua kode, paste kode di bawah ini
// 6. Klik Deploy > New Deployment
// 7. Pilih Type: Web App
// 8. Execute as: Me
// 9. Who has access: Anyone
// 10. Klik Deploy, copy URL-nya
//
// =====================================================

// Google Drive Folder ID untuk menyimpan file
var DRIVE_FOLDER_ID = '1oiCoz-hCo3CaZPqpnjZllhnLYzyTOeiB';
// Google Spreadsheet ID (HARDCODED untuk menghindari error binding)
var SPREADSHEET_ID = '1uYkTgZJWyYD4v8_nms8W7pdGAfdgzJrseoeir0DfEOY';

// Handle GET requests (for testing in browser)
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok', message: 'datanginguru Form API is running' }))
        .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
    Logger.log("doPost triggered");
    try {
        if (!e || !e.postData) {
            Logger.log("Error: No postData found");
            throw new Error("No postData found");
        }

        var data = JSON.parse(e.postData.contents);
        Logger.log("Data parsed successfully. Type: " + data.formType);

        // Gunakan openById agar lebih stabil
        var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        if (!ss) {
            throw new Error("Could not open spreadsheet with ID: " + SPREADSHEET_ID);
        }
        Logger.log("Spreadsheet found: " + ss.getName());

        if (data.formType === 'pendaftaran') {
            handlePendaftaran(ss, data);
        } else if (data.formType === 'karir') {
            Logger.log("Handling karir submission...");
            var fileUrls = handleKarirWithFiles(ss, data);
            Logger.log("Karir handled. URLs: " + JSON.stringify(fileUrls));
            return ContentService
                .createTextOutput(JSON.stringify({ success: true, fileUrls: fileUrls }))
                .setMimeType(ContentService.MimeType.JSON);
        } else if (data.formType === 'pengaduan') {
            handlePengaduan(ss, data);
        }

        return ContentService
            .createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        Logger.log("FATAL ERROR in doPost: " + error.toString());
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: error.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function handlePendaftaran(ss, data) {
    Logger.log("Processing Pendaftaran");
    var sheet = ss.getSheetByName('Pendaftaran Siswa');

    if (!sheet) {
        sheet = ss.insertSheet('Pendaftaran Siswa');
        sheet.getRange(1, 1, 1, 17).setValues([[
            'Timestamp', 'Nama Lengkap', 'Jenis Kelamin', 'WhatsApp', 'Program', 'Detail Program',
            'Mata Pelajaran', 'Mode Belajar', 'Jumlah Pertemuan', 'Jadwal',
            'Provinsi', 'Kota', 'Kecamatan', 'Kelurahan', 'Alamat',
            'Catatan', 'Estimasi Biaya'
        ]]);
        sheet.getRange(1, 1, 1, 17).setFontWeight('bold');
        sheet.setFrozenRows(1);
    }

    sheet.appendRow([
        new Date(),
        data.namaLengkap,
        data.jenisKelamin,
        data.whatsapp,
        data.program,
        data.programOption,
        data.mapel || '-',
        data.modeBelajar,
        data.jumlahPertemuan,
        data.jadwal,
        data.provinsi,
        data.kota,
        data.kecamatan,
        data.kelurahan,
        data.alamat,
        data.catatan || '-',
        data.estimasiBiaya
    ]);
    Logger.log("Pendaftaran saved");

    // Kirim notifikasi email ke Admin
    sendAdminNotification(data);
}

// Konfigurasi Email
var ADMIN_EMAIL = 'datanginguru@gmail.com, info@datanginguru.com';
var SENDER_NAME = 'Datangin Guru';
var SENDER_EMAIL = 'info@datanginguru.com';
// Email dikirim ke KEDUA alamat: datanginguru@gmail.com DAN info@datanginguru.com

function sendAdminNotification(data) {
    try {
        var subject = '🎓 Pendaftaran Baru: ' + data.namaLengkap;
        var body = 'Ada pendaftaran les privat baru!\n\n' +
            '📋 DATA PENDAFTAR\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            'Nama: ' + data.namaLengkap + '\n' +
            'Jenis Kelamin: ' + data.jenisKelamin + '\n' +
            'WhatsApp: ' + data.whatsapp + '\n\n' +
            '📚 PROGRAM\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            'Program: ' + data.program + '\n' +
            'Detail: ' + data.programOption + '\n' +
            'Mapel: ' + (data.mapel || '-') + '\n' +
            'Mode: ' + data.modeBelajar + '\n' +
            'Pertemuan: ' + data.jumlahPertemuan + 'x\n' +
            'Jadwal: ' + data.jadwal + '\n\n' +
            '📍 LOKASI\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            data.provinsi + ', ' + data.kota + '\n' +
            data.kecamatan + ', ' + data.kelurahan + '\n' +
            data.alamat + '\n\n' +
            '💰 ESTIMASI: ' + data.estimasiBiaya + '\n\n' +
            '📝 Catatan: ' + (data.catatan || '-') + '\n\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            'Segera hubungi calon siswa untuk konfirmasi!\n' +
            'WhatsApp: https://wa.me/' + data.whatsapp.replace(/^0/, '62');

        MailApp.sendEmail({
            to: ADMIN_EMAIL,
            subject: subject,
            body: body,
            name: SENDER_NAME,
            from: SENDER_EMAIL
        });

        Logger.log("Admin notification email sent to " + ADMIN_EMAIL);
    } catch (e) {
        Logger.log("Error sending admin email: " + e.toString());
    }
}

function handlePengaduan(ss, data) {
    Logger.log("Processing Pengaduan");
    var sheet = ss.getSheetByName('Layanan Pengaduan');

    if (!sheet) {
        sheet = ss.insertSheet('Layanan Pengaduan');
        sheet.getRange(1, 1, 1, 5).setValues([[
            'Timestamp', 'Nama Lengkap', 'WhatsApp/Email', 'Kategori', 'Pesan'
        ]]);
        sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
        sheet.setFrozenRows(1);
    }

    sheet.appendRow([
        new Date(),
        data.nama,
        data.kontak,
        data.kategori,
        data.pesan
    ]);
    Logger.log("Pengaduan saved");

    // Kirim notifikasi email pengaduan ke Admin
    sendPengaduanNotification(data);
}

function sendPengaduanNotification(data) {
    try {
        var subject = '⚠️ Pengaduan Baru: ' + data.kategori;
        var body = 'Ada pengaduan baru masuk!\n\n' +
            '📋 DATA PENGADU\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            'Nama: ' + data.nama + '\n' +
            'Kontak: ' + data.kontak + '\n\n' +
            '📁 KATEGORI: ' + data.kategori + '\n\n' +
            '📝 ISI PENGADUAN:\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            data.pesan + '\n\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            'Segera tindak lanjuti pengaduan ini!';

        MailApp.sendEmail({
            to: ADMIN_EMAIL,
            subject: subject,
            body: body,
            name: SENDER_NAME,
            from: SENDER_EMAIL
        });

        Logger.log("Pengaduan notification email sent");
    } catch (e) {
        Logger.log("Error sending pengaduan email: " + e.toString());
    }
}

function handleKarirWithFiles(ss, data) {
    Logger.log("Processing Karir with Files");
    var sheet = ss.getSheetByName('Lamaran Guru');

    if (!sheet) {
        Logger.log("Creating new sheet: Lamaran Guru");
        sheet = ss.insertSheet('Lamaran Guru');
        sheet.getRange(1, 1, 1, 20).setValues([[
            'Timestamp', 'Nama Lengkap', 'Email', 'WhatsApp', 'Jenis Kelamin', 'Tanggal Lahir',
            'Pendidikan', 'Asal Kampus', 'Jurusan',
            'Spesialisasi Mapel', 'Spesialisasi Jenjang', 'Mode Mengajar',
            'Provinsi', 'Kota', 'Kecamatan', 'Kelurahan', 'Alamat',
            'Link Pas Foto', 'Link Pakta Integritas', 'Link Ijazah'
        ]]);
        sheet.getRange(1, 1, 1, 20).setFontWeight('bold'); // Update columns to 20
        sheet.setFrozenRows(1);
    }

    // 1. SAVE DATA FIRST (Prioritas utama)
    // Kita simpan dulu tanpa link file, nanti kalau upload berhasil kita update
    var rowData = [
        new Date(),
        data.namaLengkap,
        data.email,
        data.whatsapp,
        data.jenisKelamin,
        data.tanggalLahir,
        data.pendidikan,
        data.asalKampus,
        data.jurusan,
        data.spesialisasiMapel,
        data.spesialisasiJenjang,
        data.modeMengajar,
        data.provinsi,
        data.kota,
        data.kecamatan,
        data.kelurahan,
        data.alamat,
        '-', // Placeholder Pas Foto
        '-', // Placeholder Pakta
        '-'  // Placeholder Ijazah
    ];

    sheet.appendRow(rowData);
    var lastRow = sheet.getLastRow();
    Logger.log("Initial data saved to row " + lastRow);

    // 2. UPLOAD FILES TO DRIVE (dengan Error Handling)
    var fileUrls = {};

    try {
        Logger.log("Starting file upload...");
        var folder = getOrCreateApplicantFolder(data.namaLengkap);
        Logger.log("Target folder: " + folder.getName());

        if (data.pasFotoBase64) {
            Logger.log("Uploading Pas Foto...");
            var pasFotoUrl = saveFileToDrive(folder, data.pasFotoBase64, data.pasFotoName || 'pas_foto.jpg', data.pasFotoType || 'image/jpeg');
            if (pasFotoUrl) {
                fileUrls.pasFoto = pasFotoUrl;
                // Update cell Pas Foto (kolom 18)
                sheet.getRange(lastRow, 18).setValue(pasFotoUrl);
                Logger.log("Pas Foto uploaded: " + pasFotoUrl);
            }
        } else {
            Logger.log("No Pas Foto Base64 provided");
        }

        if (data.paktaBase64) {
            Logger.log("Uploading Pakta Integritas...");
            var paktaUrl = saveFileToDrive(folder, data.paktaBase64, data.paktaName || 'pakta_integritas.pdf', data.paktaType || 'application/pdf');
            if (paktaUrl) {
                fileUrls.pakta = paktaUrl;
                // Update cell Pakta (kolom 19)
                sheet.getRange(lastRow, 19).setValue(paktaUrl);
                Logger.log("Pakta uploaded: " + paktaUrl);
            }
        } else {
            Logger.log("No Pakta Base64 provided");
        }

        if (data.ijazahBase64) {
            Logger.log("Uploading Ijazah...");
            var ijazahUrl = saveFileToDrive(folder, data.ijazahBase64, data.ijazahName || 'ijazah.pdf', data.ijazahType || 'application/pdf');
            if (ijazahUrl) {
                fileUrls.ijazah = ijazahUrl;
                // Update cell Ijazah (kolom 20)
                sheet.getRange(lastRow, 20).setValue(ijazahUrl);
                Logger.log("Ijazah uploaded: " + ijazahUrl);
            }
        } else {
            Logger.log("No Ijazah Base64 provided");
        }
    } catch (e) {
        // Jika upload gagal, catat error di log tapi jangan throw error ke user
        Logger.log("UPLOAD ERROR: " + e.toString());
        // Catat error di kolom Alamat (kolom 16) sebagai note
        sheet.getRange(lastRow, 16).setNote("Upload Error: " + e.toString());
    }

    // Kirim notifikasi email lamaran guru ke Admin
    sendKarirNotification(data, fileUrls);

    return fileUrls;
}

function sendKarirNotification(data, fileUrls) {
    try {
        var subject = '👨‍🏫 Lamaran Guru Baru: ' + data.namaLengkap;
        var body = 'Ada lamaran guru baru masuk!\n\n' +
            '📋 DATA PELAMAR\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            'Nama: ' + data.namaLengkap + '\n' +
            'Email: ' + data.email + '\n' +
            'WhatsApp: ' + data.whatsapp + '\n' +
            'Jenis Kelamin: ' + data.jenisKelamin + '\n' +
            'Tanggal Lahir: ' + data.tanggalLahir + '\n\n' +
            '🎓 PENDIDIKAN\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            'Jenjang: ' + data.pendidikan + '\n' +
            'Kampus: ' + data.asalKampus + '\n' +
            'Jurusan: ' + data.jurusan + '\n\n' +
            '📚 SPESIALISASI\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            'Mapel: ' + data.spesialisasiMapel + '\n' +
            'Jenjang: ' + data.spesialisasiJenjang + '\n' +
            'Mode: ' + data.modeMengajar + '\n\n' +
            '📍 LOKASI\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            data.provinsi + ', ' + data.kota + '\n' +
            data.kecamatan + ', ' + data.kelurahan + '\n' +
            data.alamat + '\n\n' +
            '📎 DOKUMEN\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            'Pas Foto: ' + (fileUrls.pasFoto || '-') + '\n' +
            'Pakta Integritas: ' + (fileUrls.pakta || '-') + '\n' +
            'Ijazah: ' + (fileUrls.ijazah || '-') + '\n\n' +
            '━━━━━━━━━━━━━━━━━━━━\n' +
            'Segera review lamaran ini!\n' +
            'WhatsApp: https://wa.me/' + data.whatsapp.replace(/^0/, '62');

        MailApp.sendEmail({
            to: ADMIN_EMAIL,
            subject: subject,
            body: body,
            name: SENDER_NAME,
            from: SENDER_EMAIL
        });

        Logger.log("Karir notification email sent");
    } catch (e) {
        Logger.log("Error sending karir email: " + e.toString());
    }
}

function getOrCreateApplicantFolder(applicantName) {
    var parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    var timestamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd');
    var folderName = timestamp + ' - ' + applicantName;

    // Check if folder exists
    var folders = parentFolder.getFoldersByName(folderName);
    if (folders.hasNext()) {
        return folders.next();
    }

    // Create new folder
    return parentFolder.createFolder(folderName);
}

function saveFileToDrive(folder, base64Data, fileName, mimeType) {
    try {
        var decodedData = Utilities.base64Decode(base64Data);
        var blob = Utilities.newBlob(decodedData, mimeType, fileName);
        var file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        return file.getUrl();
    } catch (error) {
        Logger.log('Error saving file: ' + error.message);
        return null;
    }
}

// Test function untuk PENDAFTARAN SISWA
function testPendaftaranSiswa() {
    var testData = {
        postData: {
            contents: JSON.stringify({
                formType: 'pendaftaran',
                namaLengkap: 'Test Siswa Baru',
                jenisKelamin: 'Laki-laki',
                whatsapp: '08123456789',
                program: 'Les Privat',
                programOption: 'SMA',
                mapel: 'Matematika',
                modeBelajar: 'Tatap Muka',
                jumlahPertemuan: '4',
                jadwal: 'Senin, Rabu - Sore (15.00 - 18.00)',
                provinsi: 'Jawa Barat',
                kota: 'Bandung',
                kecamatan: 'Coblong',
                kelurahan: 'Dago',
                alamat: 'Jl. Test Siswa No. 123',
                catatan: 'Test pendaftaran siswa',
                estimasiBiaya: 'Rp 400.000'
            })
        }
    };

    Logger.log("Testing Pendaftaran Siswa...");
    doPost(testData);
    Logger.log("Test Pendaftaran Siswa selesai! Cek sheet 'Pendaftaran Siswa'");
}

// Test function untuk LAMARAN GURU - run this to test the script and trigger Authorization
function testDoPost() {
    var dummyBase64 = "U2ltcGxlIFBERiBGaWxl"; // "Simple PDF File" in base64

    var testData = {
        postData: {
            contents: JSON.stringify({
                formType: 'karir',
                namaLengkap: 'Test Guru Upload',
                email: 'test@guru.com',
                whatsapp: '08123456789',
                tanggalLahir: '1990-01-01',
                pendidikan: 'S1',
                asalKampus: 'Universitas Test',
                jurusan: 'Pendidikan Matematika',
                spesialisasiMapel: 'Matematika',
                spesialisasiJenjang: 'SMA',
                modeMengajar: 'Online',
                provinsi: 'Jawa Barat',
                kota: 'Bandung',
                kecamatan: 'Coblong',
                kelurahan: 'Dago',
                alamat: 'Jl. Test Upload No. 1',
                pasFotoBase64: dummyBase64,
                pasFotoName: 'test_foto.jpg',
                pasFotoType: 'image/jpeg',
                paktaBase64: dummyBase64,
                paktaName: 'test_pakta.pdf',
                paktaType: 'application/pdf',
                ijazahBase64: dummyBase64,
                ijazahName: 'test_ijazah.pdf',
                ijazahType: 'application/pdf'
            })
        }
    };

    doPost(testData);
}

// ------------------------------------------------------------------
// JALANKAN FUNGSI INI SEKALI SAJA UNTUK MEMUNCULKAN POPUP IZIN
// ------------------------------------------------------------------
function authorizeScript() {
    // Fungsi ini untuk MEMAKSA Google meminta izin TULIS (Write Permission)
    // Kita coba buat folder dummy lalu hapus lagi
    var tempFolder = DriveApp.createFolder("Temp Auth Folder (Delete Me)");
    tempFolder.setTrashed(true); // Langsung hapus

    SpreadsheetApp.openById(SPREADSHEET_ID);

    Logger.log("Izin TULIS berhasil diberikan! Sekarang coba testDoPost lagi.");
}

// ------------------------------------------------------------------
// TEST KIRIM EMAIL SAJA (tanpa save data)
// Jalankan ini untuk test apakah email sampai ke info@datanginguru.com
// ------------------------------------------------------------------
function testEmailOnly() {
    Logger.log("Testing email to: " + ADMIN_EMAIL);

    try {
        MailApp.sendEmail({
            to: ADMIN_EMAIL,
            subject: '✅ Test Email dari Datangin Guru',
            body: 'Ini adalah email test untuk memastikan notifikasi berjalan dengan baik.\n\n' +
                'Jika Anda menerima email ini, berarti konfigurasi email sudah benar!\n\n' +
                'Waktu: ' + new Date().toLocaleString('id-ID') + '\n\n' +
                '--- Datangin Guru System ---',
            name: SENDER_NAME,
            from: SENDER_EMAIL
        });

        Logger.log("Email test berhasil dikirim ke " + ADMIN_EMAIL);
        Logger.log("Cek inbox datanginguru@gmail.com!");
    } catch (e) {
        Logger.log("ERROR: " + e.toString());
    }
}
