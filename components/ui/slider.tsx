'use client';

import { useState, useCallback } from 'react';

interface SliderProps {
    defaultValue?: number[];
    value?: number[];
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (value: number[]) => void;
    className?: string;
}

export function Slider({
    defaultValue = [0, 100],
    value,
    min = 0,
    max = 100,
    step = 1,
    onValueChange,
    className = ''
}: SliderProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = value ?? internalValue;

    const handleMinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), currentValue[1]);
        const newValues = [newMin, currentValue[1]];
        if (!value) {
            setInternalValue(newValues);
        }
        onValueChange?.(newValues);
    }, [currentValue, value, onValueChange]);

    const handleMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), currentValue[0]);
        const newValues = [currentValue[0], newMax];
        if (!value) {
            setInternalValue(newValues);
        }
        onValueChange?.(newValues);
    }, [currentValue, value, onValueChange]);

    const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

    return (
        <div className={`relative w-full ${className}`}>
            {/* Track Background */}
            <div className="relative h-2 bg-blue-100 rounded-full">
                {/* Active Range */}
                <div
                    className="absolute h-full bg-blue-500 rounded-full"
                    style={{
                        left: `${getPercent(currentValue[0])}%`,
                        width: `${getPercent(currentValue[1]) - getPercent(currentValue[0])}%`
                    }}
                />
            </div>

            {/* Hidden range inputs for accessibility */}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentValue[0]}
                onChange={handleMinChange}
                className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer z-10"
                style={{ pointerEvents: 'auto' }}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentValue[1]}
                onChange={handleMaxChange}
                className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer z-20"
                style={{ pointerEvents: 'auto' }}
            />

            {/* Visual Thumbs */}
            <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow pointer-events-none"
                style={{ left: `calc(${getPercent(currentValue[0])}% - 8px)`, marginTop: '-3px' }}
            />
            <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow pointer-events-none"
                style={{ left: `calc(${getPercent(currentValue[1])}% - 8px)`, marginTop: '-3px' }}
            />
        </div>
    );
}
