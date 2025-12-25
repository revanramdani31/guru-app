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
var DRIVE_FOLDER_ID = '1RT4RxEKh1ZUo6R3aKHdXdIPGD7Yb_jtr';
// Google Spreadsheet ID (HARDCODED untuk menghindari error binding)
var SPREADSHEET_ID = '1tHuaIwOwChYVhB7SrCkIOe_sUF-DtnhFsllyOfnQ2x0';

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
                // Update cell Pas Foto (kolom 17)
                sheet.getRange(lastRow, 17).setValue(pasFotoUrl);
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
                // Update cell Pakta (kolom 18)
                sheet.getRange(lastRow, 18).setValue(paktaUrl);
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
                // Update cell Ijazah (kolom 19)
                sheet.getRange(lastRow, 19).setValue(ijazahUrl);
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

    return fileUrls;
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

// Test function - run this to test the script and trigger Authorization
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
