'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
    text: string;
    speed?: number;
    delay?: number;
    onComplete?: () => void;
}

export function useTypewriter({
    text,
    speed = 50,
    delay = 0,
    onComplete,
}: UseTypewriterOptions) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const reset = useCallback(() => {
        setDisplayedText('');
        setIsComplete(false);
        setIsTyping(false);
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        let currentIndex = 0;

        const typeNextChar = () => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
                timeoutId = setTimeout(typeNextChar, speed);
            } else {
                setIsComplete(true);
                setIsTyping(false);
                onComplete?.();
            }
        };

        // Start with delay
        timeoutId = setTimeout(() => {
            setIsTyping(true);
            typeNextChar();
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [text, speed, delay, onComplete]);

    return { displayedText, isComplete, isTyping, reset };
}
