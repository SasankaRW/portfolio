'use client';

import { useState, useEffect } from 'react';

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
        <div className="boot-screen" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', // Align left like a real boot screen
            justifyContent: 'center',
            fontFamily: 'var(--font-terminal)',
            fontSize: '1.2rem',
            color: 'var(--accent-primary)',
            gap: '0.5rem',
            paddingLeft: '2rem' // Add some padding
        }}>
            {displayedLines.map((line, index) => (
                <div key={index} style={{
                    opacity: 0,
                    animation: 'fadeIn 0.1s forwards'
                }}>
                    <span style={{ marginRight: '1rem' }}>&gt;</span>
                    {line}
                </div>
            ))}
            <style jsx>{`
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
