// Indonesian Region API Utility
// Using internal API route as proxy to avoid CORS issues

export interface Region {
    id: string;
    name: string;
}

export const JAWA_BARAT_ID = '32';
export const JAWA_BARAT_NAME = 'JAWA BARAT';

export const OPERATIONAL_CITIES: Region[] = [
    { id: '3273', name: 'KOTA BANDUNG' },
    { id: '3277', name: 'KOTA CIMAHI' },
    { id: '3204', name: 'KABUPATEN BANDUNG' },
    { id: '3217', name: 'KABUPATEN BANDUNG BARAT' },
    { id: '3211', name: 'KABUPATEN SUMEDANG (Jatinangor & Sekitarnya)' }
];

export async function getProvinces(): Promise<Region[]> {
    try {
        const response = await fetch('/api/regions?type=provinces');
        if (!response.ok) throw new Error('Failed to fetch provinces');
        return await response.json();
    } catch (error) {
        console.error('Error fetching provinces:', error);
        return [];
    }
}

export async function getCities(provinceId: string): Promise<Region[]> {
    try {
        const response = await fetch(`/api/regions?type=regencies&id=${provinceId}`);
        if (!response.ok) throw new Error('Failed to fetch cities');
        return await response.json();
    } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
    }
}

export async function getDistricts(cityId: string): Promise<Region[]> {
    try {
        const response = await fetch(`/api/regions?type=districts&id=${cityId}`);
        if (!response.ok) throw new Error('Failed to fetch districts');
        return await response.json();
    } catch (error) {
        console.error('Error fetching districts:', error);
        return [];
    }
}

export async function getVillages(districtId: string): Promise<Region[]> {
    try {
        const response = await fetch(`/api/regions?type=villages&id=${districtId}`);
        if (!response.ok) throw new Error('Failed to fetch villages');
        return await response.json();
    } catch (error) {
        console.error('Error fetching villages:', error);
        return [];
    }
}
