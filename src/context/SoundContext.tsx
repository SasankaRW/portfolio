'use client';

import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

type SoundType = 'click' | 'hover' | 'boot' | 'success' | 'error';

interface SoundContextType {
    enabled: boolean;
    toggleSound: () => void;
    playSound: (type: SoundType) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [enabled, setEnabled] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize AudioContext on first user interaction if enabled
    useEffect(() => {
        if (enabled && !audioContextRef.current) {
            const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
            if (AudioContextClass) {
                audioContextRef.current = new AudioContextClass();
            }
        }
    }, [enabled]);

    const playSound = useCallback((type: SoundType) => {
        if (!enabled || !audioContextRef.current) return;

        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'click':
                // Mechanical keyboard click simulation
                osc.type = 'square';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
                break;
            case 'hover':
                // Subtle high-pitch chirp
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.linearRampToValueAtTime(1200, now + 0.03);
                gainNode.gain.setValueAtTime(0.02, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.03);
                osc.start(now);
                osc.stop(now + 0.03);
                break;
            case 'success':
                // Retro success chime
                osc.type = 'square';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.setValueAtTime(880, now + 0.1);
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;
            case 'error':
                // Low buzz
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;
            case 'boot':
                // Boot up sound
                osc.type = 'square';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.linearRampToValueAtTime(880, now + 0.5);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
                osc.start(now);
                osc.stop(now + 1.5);
                break;
        }
    }, [enabled]);

    const toggleSound = () => {
        setEnabled(prev => !prev);
    };

    return (
        <SoundContext.Provider value={{ enabled, toggleSound, playSound }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
}
