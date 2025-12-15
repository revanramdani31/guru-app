'use client';

import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Cari tutor atau mata pelajaran...' }: Readonly<SearchBarProps>) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        onSearch(e.target.value);
                    }}
                    placeholder={placeholder}
                    className="w-full px-6 py-4 pr-12 text-gray-900 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 shadow-lg"
                />
                <button
                    type="submit"
                    className="absolute right-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
}
