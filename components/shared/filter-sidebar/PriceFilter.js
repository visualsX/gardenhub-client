'use client';

import { useState, useEffect } from 'react';
import { Slider, InputNumber } from 'antd';

export default function PriceFilter({ onChange, min = 0, max = 5000 }) {
    // Use local state for immediate feedback, propagate changes on afterChange
    const [range, setRange] = useState([min, max]);

    useEffect(() => {
        // Reset range if props change significantly, though usually min/max are static
        setRange([min, max]);
    }, [min, max]);

    const handleSliderChange = (value) => {
        setRange(value);
    };

    const handleAfterChange = (value) => {
        onChange?.(value);
    };

    const handleInputChange = (index, value) => {
        const newRange = [...range];
        newRange[index] = value;
        setRange(newRange);
        onChange?.(newRange);
    };

    return (
        <div className="px-1 py-2">
            <Slider
                range
                min={min}
                max={max}
                value={range}
                onChange={handleSliderChange}
                onChangeComplete={handleAfterChange}
            // styles={{
            //     track: { backgroundColor: 'var(--primary-green, #4CAF50)' },
            //     handle: {
            //         borderColor: 'var(--primary-green, #4CAF50)',
            //         backgroundColor: 'var(--primary-green, #4CAF50)',
            //     },
            //     rail: { backgroundColor: '#E0E0E0' }
            // }}
            />

            <div className="mt-4 flex items-center justify-between gap-2">
                <InputNumber
                    min={min}
                    max={range[1]} // Can't be more than max handle
                    value={range[0]}
                    onChange={(val) => handleInputChange(0, val)}
                    className="w-full rounded-md border-gray-200"
                    prefix={<span className="text-gray-400 text-xs">AED</span>}
                    controls={false}
                />
                <span className="text-gray-400 text-sm">to</span>
                <InputNumber
                    min={range[0]} // Can't be less than min handle
                    max={max}
                    value={range[1]}
                    onChange={(val) => handleInputChange(1, val)}
                    className="w-full rounded-md border-gray-200"
                    prefix={<span className="text-gray-400 text-xs">AED</span>}
                    controls={false}
                />
            </div>
        </div>
    );
}
