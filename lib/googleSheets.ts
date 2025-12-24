// Google Sheets API integration
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxTqa3_8qGheX7a7ySGWDf1jikGvSrM9xmcjG06YwH8kflPE5n46IbjColD8ppiK7k/exec';

interface PendaftaranData {
    formType: 'pendaftaran';
    [key: string]: string | number | undefined;
}

interface KarirData {
    formType: 'karir';
    [key: string]: string | number | boolean | string[] | undefined;
}

interface PengaduanData {
    formType: 'pengaduan';
    nama: string;
    whatsapp: string;
    kategori: string;
    pesan: string;
    timestamp?: string;
}

export async function submitToGoogleSheets(data: PendaftaranData | KarirData | PengaduanData): Promise<{ success: boolean; error?: string }> {
    if (!GOOGLE_SCRIPT_URL) {
        console.warn('Google Script URL not configured');
        return { success: false, error: 'Google Script URL not configured' };
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // With no-cors mode, we can't read the response
        // But the request should still go through
        return { success: true };
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        return { success: false, error: String(error) };
    }
}

export function formatModeLabel(mode: string): string {
    switch (mode) {
        case 'online': return 'Online';
        case 'tatap_muka': return 'Tatap Muka';
        case 'keduanya': return 'Online & Tatap Muka';
        default: return mode;
    }
}
