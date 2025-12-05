'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface TerminalTextProps {
    text: string;
    speed?: number;
    className?: string;
    showCursor?: boolean;
    onComplete?: () => void;
    delay?: number;
}

export default function TerminalText({
    text,
    speed = 50,
    className = '',
    showCursor = true,
    onComplete,
    delay = 0,
}: TerminalTextProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

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
                onComplete?.();
            }
        };

        // Start with delay
        timeoutId = setTimeout(typeNextChar, delay);

        return () => clearTimeout(timeoutId);
    }, [text, speed, delay, onComplete]);

    return (
        <span ref={containerRef} className={`terminal-text ${className}`}>
            {displayedText}
            {showCursor && <span className="terminal-cursor" style={{ opacity: isComplete ? 0.5 : 1 }} />}
        </span>
    );
}
