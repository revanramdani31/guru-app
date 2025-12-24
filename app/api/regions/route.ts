import { NextResponse } from 'next/server';

const BASE_URL = 'https://emsifa.github.io/api-wilayah-indonesia/api';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    let url = '';

    switch (type) {
        case 'provinces':
            url = `${BASE_URL}/provinces.json`;
            break;
        case 'regencies':
            url = `${BASE_URL}/regencies/${id}.json`;
            break;
        case 'districts':
            url = `${BASE_URL}/districts/${id}.json`;
            break;
        case 'villages':
            url = `${BASE_URL}/villages/${id}.json`;
            break;
        default:
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching region data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
