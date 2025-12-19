// Google Sheets API integration
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_HWAf4o9gXg2qmR3nFo6H2DzyewvlHkIGOUxFGQN79fPRv5tSiOoXMqMfCoceuIxP/exec';

interface PendaftaranData {
    formType: 'pendaftaran';
    namaLengkap: string;
    email: string;
    whatsapp: string;
    subjek: string;
    tingkat: string;
    modeBelajar: string;
    jadwalPreferensi: string;
    lokasi: string;
    catatan: string;
}

interface KarirData {
    formType: 'karir';
    namaLengkap: string;
    email: string;
    whatsapp: string;
    lokasi: string;
    pendidikan: string;
    spesialisasi: string;
    tingkatMengajar: string;
    modeMengajar: string;
    pengalaman: string;
    tarifPerJam: string;
    motivasi: string;
}

export async function submitToGoogleSheets(data: PendaftaranData | KarirData): Promise<{ success: boolean; error?: string }> {
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
