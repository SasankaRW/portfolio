'use client';

import { useRef } from 'react';
import anime from 'animejs';

interface FolderIconProps {
    label: string;
    onClick?: () => void;
    className?: string;
}

export default function FolderIcon({ label, onClick, className = '' }: FolderIconProps) {
    const iconRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (iconRef.current) {
            anime({
                targets: iconRef.current,
                scale: [1, 0.95, 1],
                duration: 200,
                easing: 'easeInOutQuad',
            });
        }
        onClick?.();
    };

    return (
        <div
            ref={iconRef}
            className={`folder-icon dos-flicker ${className}`}
            onClick={handleClick}
        >
            <div className="folder-icon-img">
                {/* Sci-Fi HUD Folder SVG */}
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12L24 12L32 20H60V56H4V12Z" stroke="var(--accent-primary)" strokeWidth="2" fill="rgba(0, 255, 204, 0.1)" />
                    <path d="M4 20H60" stroke="var(--accent-primary)" strokeWidth="1" />
                    <rect x="10" y="30" width="44" height="2" fill="var(--accent-primary)" opacity="0.5" />
                    <rect x="10" y="36" width="30" height="2" fill="var(--accent-primary)" opacity="0.3" />
                    <circle cx="52" cy="48" r="4" stroke="var(--accent-primary)" strokeWidth="1" />
                </svg>
            </div>
            <span className="folder-icon-label">{label}</span>
        </div>
    );
}
