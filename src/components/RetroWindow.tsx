'use client';

import { useEffect, useRef, ReactNode, CSSProperties } from 'react';
import anime from 'animejs';

interface RetroWindowProps {
    title: string;
    children: ReactNode;
    className?: string;
    shouldAnimate?: boolean;
    style?: CSSProperties;
}

export default function RetroWindow({
    title,
    children,
    className = '',
    shouldAnimate = true,
    style
}: RetroWindowProps) {
    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shouldAnimate && windowRef.current) {
            anime({
                targets: windowRef.current,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                easing: 'easeOutCubic',
            });
        }
    }, [shouldAnimate]);

    return (
        <div
            ref={windowRef}
            className={`retro-window ${className}`}
            style={{ opacity: shouldAnimate ? 0 : 1, ...style }}
        >
            <div className="retro-window-titlebar">
                <span className="retro-window-title">{title}</span>
            </div>
            <div className="retro-window-content">
                {children}
            </div>
        </div>
    );
}
