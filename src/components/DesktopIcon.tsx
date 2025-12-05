'use client';

import { useRef } from 'react';
import anime from 'animejs';

interface DesktopIconProps {
    icon: string;
    label: string;
    onClick?: () => void;
    className?: string;
}

export default function DesktopIcon({ icon, label, onClick, className = '' }: DesktopIconProps) {
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

    const handleMouseEnter = () => {
        if (iconRef.current) {
            anime({
                targets: iconRef.current.querySelector('.desktop-icon-img'),
                borderColor: '#00F0F0',
                duration: 200,
                easing: 'easeOutQuad',
            });
        }
    };

    const handleMouseLeave = () => {
        if (iconRef.current) {
            anime({
                targets: iconRef.current.querySelector('.desktop-icon-img'),
                borderColor: '#2E2E2E',
                duration: 200,
                easing: 'easeOutQuad',
            });
        }
    };

    return (
        <div
            ref={iconRef}
            className={`desktop-icon dos-flicker ${className}`}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="desktop-icon-img">
                <span>{icon}</span>
            </div>
            <span className="desktop-icon-label">{label}</span>
        </div>
    );
}
