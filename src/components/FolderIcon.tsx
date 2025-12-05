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
                {/* Windows 95 style folder SVG */}
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <rect x="4" y="14" width="56" height="46" fill="#FFB000" stroke="#2E2E2E" strokeWidth="2" />
                    <rect x="4" y="8" width="28" height="10" fill="#FFB000" stroke="#2E2E2E" strokeWidth="2" />
                    <path d="M4 14H60" stroke="#2E2E2E" strokeWidth="2" />
                    <rect x="8" y="18" width="48" height="2" fill="#FFCC4D" />
                </svg>
            </div>
            <span className="folder-icon-label">{label}</span>
        </div>
    );
}
