'use client';

import { useEffect, useState, useCallback } from 'react';

const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA',
];

export function useKonamiCode(callback: () => void) {
    const [inputSequence, setInputSequence] = useState<string[]>([]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const key = event.code;

        setInputSequence((prev) => {
            const newSequence = [...prev, key].slice(-KONAMI_CODE.length);

            // Check if the sequence matches
            if (newSequence.length === KONAMI_CODE.length) {
                const isMatch = newSequence.every((k, i) => k === KONAMI_CODE[i]);
                if (isMatch) {
                    callback();
                    return [];
                }
            }

            return newSequence;
        });
    }, [callback]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return inputSequence;
}
