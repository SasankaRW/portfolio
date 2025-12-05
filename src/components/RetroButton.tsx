'use client';

import { useRef, CSSProperties } from 'react';
import anime from 'animejs';

interface RetroButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'default' | 'primary';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    style?: CSSProperties;
}

export default function RetroButton({
    children,
    onClick,
    variant = 'default',
    className = '',
    type = 'button',
    disabled = false,
    style,
}: RetroButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        if (disabled) return;
        // DOS flicker animation
        if (buttonRef.current) {
            anime({
                targets: buttonRef.current,
                opacity: [1, 0.5, 1],
                duration: 150,
                easing: 'easeInOutQuad',
            });
        }
        onClick?.();
    };

    const variantClass = variant === 'primary' ? 'retro-btn-primary' : '';

    return (
        <button
            ref={buttonRef}
            type={type}
            onClick={handleClick}
            disabled={disabled}
            className={`retro-btn dos-flicker ${variantClass} ${className}`}
            style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}
        >
            {children}
        </button>
    );
}
