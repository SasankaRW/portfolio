'use client';

import { useEffect, useRef, ReactNode } from 'react';
import anime from 'animejs';

interface RetroModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export default function RetroModal({ isOpen, onClose, title, children }: RetroModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && modalRef.current && overlayRef.current) {
            anime({
                targets: overlayRef.current,
                opacity: [0, 1],
                duration: 200,
                easing: 'easeOutQuad',
            });
            anime({
                targets: modalRef.current,
                opacity: [0, 1],
                scale: [0.95, 1],
                duration: 300,
                easing: 'easeOutCubic',
            });
        }
    }, [isOpen]);

    const handleClose = () => {
        if (modalRef.current && overlayRef.current) {
            anime({
                targets: modalRef.current,
                opacity: 0,
                scale: 0.95,
                duration: 200,
                easing: 'easeInQuad',
            });
            anime({
                targets: overlayRef.current,
                opacity: 0,
                duration: 200,
                easing: 'easeInQuad',
                complete: () => onClose(),
            });
        } else {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="retro-modal-overlay"
            onClick={(e) => e.target === overlayRef.current && handleClose()}
            style={{ opacity: 0 }}
        >
            <div ref={modalRef} className="retro-modal" style={{ opacity: 0 }}>
                <div className="retro-window-titlebar">
                    <span className="retro-window-title">{title}</span>
                    <div className="retro-window-controls">
                        <button className="retro-window-btn" onClick={handleClose}>×</button>
                    </div>
                </div>
                <div className="retro-window-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
