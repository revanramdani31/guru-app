// =====================================================
// GOOGLE APPS SCRIPT - datanginguru Privat Form Handler
// =====================================================
// 
// CARA SETUP:
// 1. Buka Google Sheets baru: https://sheets.new
// 2. Beri nama: "datanginguru - Form Responses"
// 3. Buat 2 sheet (tab): "Pendaftaran Siswa" dan "Aplikasi Guru"
// 4. Klik Extensions > Apps Script
// 5. Hapus semua kode, paste kode di bawah ini
// 6. Klik Deploy > New Deployment
// 7. Pilih Type: Web App
// 8. Execute as: Me
// 9. Who has access: Anyone
// 10. Klik Deploy, copy URL-nya
// 11. Berikan URL tersebut ke developer
//
// =====================================================

// Handle GET requests (for testing in browser)
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok', message: 'datanginguru Form API is running' }))
        .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const ss = SpreadsheetApp.getActiveSpreadsheet();

        if (data.formType === 'pendaftaran') {
            handlePendaftaran(ss, data);
        } else if (data.formType === 'karir') {
            handleKarir(ss, data);
        }

        return ContentService
            .createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: error.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function handlePendaftaran(ss, data) {
    let sheet = ss.getSheetByName('Pendaftaran Siswa');

    // Create sheet if not exists
    if (!sheet) {
        sheet = ss.insertSheet('Pendaftaran Siswa');
        // Add headers
        sheet.getRange(1, 1, 1, 10).setValues([[
            'Timestamp', 'Nama Lengkap', 'Email', 'WhatsApp',
            'Mata Pelajaran', 'Tingkat', 'Mode Belajar',
            'Jadwal', 'Lokasi', 'Catatan'
        ]]);
        sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    }

    // Add data
    sheet.appendRow([
        new Date(),
        data.namaLengkap,
        data.email,
        data.whatsapp,
        data.subjek,
        data.tingkat,
        data.modeBelajar,
        data.jadwalPreferensi,
        data.lokasi,
        data.catatan
    ]);
}

function handleKarir(ss, data) {
    let sheet = ss.getSheetByName('Aplikasi Guru');

    // Create sheet if not exists
    if (!sheet) {
        sheet = ss.insertSheet('Aplikasi Guru');
        // Add headers
        sheet.getRange(1, 1, 1, 12).setValues([[
            'Timestamp', 'Nama Lengkap', 'Email', 'WhatsApp', 'Lokasi',
            'Pendidikan', 'Spesialisasi', 'Tingkat Mengajar',
            'Mode Mengajar', 'Pengalaman', 'Tarif/Jam', 'Motivasi'
        ]]);
        sheet.getRange(1, 1, 1, 12).setFontWeight('bold');
    }

    // Add data
    sheet.appendRow([
        new Date(),
        data.namaLengkap,
        data.email,
        data.whatsapp,
        data.lokasi,
        data.pendidikan,
        data.spesialisasi,
        data.tingkatMengajar,
        data.modeMengajar,
        data.pengalaman,
        data.tarifPerJam,
        data.motivasi
    ]);
}

// Test function - run this to test the script
function testDoPost() {
    const testData = {
        postData: {
            contents: JSON.stringify({
                formType: 'pendaftaran',
                namaLengkap: 'Test User',
                email: 'test@email.com',
                whatsapp: '081234567890',
                subjek: 'Matematika',
                tingkat: 'SMA',
                modeBelajar: 'Tatap Muka',
                jadwalPreferensi: 'Senin-Rabu sore',
                lokasi: 'Jakarta Selatan',
                catatan: 'Test catatan'
            })
        }
    };

    doPost(testData);
}
