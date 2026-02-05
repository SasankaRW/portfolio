'use client';

import { useState, useEffect } from 'react';
import styles from './BootSequence.module.css';

interface BootSequenceProps {
    onComplete: () => void;
}

const lines = [
    "BOOTING SAS-SYSTEM v1.0 ...",
    "Loading personality.dll ...",
    "Loading experience.sys ...",
    "Loading projects.exe ...",
    "STATUS: OK"
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);

    useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex >= lines.length) {
                clearInterval(interval);
                setTimeout(onComplete, 500); // Short pause after OK before fading
                return;
            }

            setDisplayedLines(prev => [...prev, lines[currentIndex]]);
            currentIndex++;
        }, 150); // Fast 150ms per line

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className={styles.bootScreen}>
            {displayedLines.map((line, index) => (
                <div key={index} className={styles.bootLine}>
                    <span style={{ marginRight: '1rem' }}>&gt;</span>
                    {line}
                </div>
            ))}
        </div>
    );
}
