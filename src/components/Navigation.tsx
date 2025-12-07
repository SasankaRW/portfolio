'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSound } from '@/context/SoundContext';
import { useTheme, ThemeMode } from '@/context/ThemeContext';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/experience', label: 'Experience' },
    { href: '/projects', label: 'Projects' },
    { href: '/research', label: 'Research' },
    { href: '/designs', label: 'Designs' },
    { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { enabled, toggleSound, playSound } = useSound();
    const { theme, setTheme } = useTheme();

    const handleSoundToggle = () => {
        toggleSound();
        if (!enabled) playSound('boot'); // Play boot sound when turning on
    };

    const handleThemeCycle = () => {
        const themes: ThemeMode[] = ['minimal', 'classic', 'arch', 'light', 'matrix'];
        const currentIndex = themes.indexOf(theme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        setTheme(nextTheme);
        playSound('click');
    };

    const getThemeIcon = (t: ThemeMode) => {
        switch (t) {
            case 'arch': return 'ARCH';
            case 'minimal': return 'MIN';
            case 'light': return 'LGT';
            case 'matrix': return '0x1';
            default: return 'SYS';
        }
    };

    return (
        <>
            <nav className="nav-retro" role="navigation" aria-label="Main">
                <div className="nav-retro-inner">
                    <Link href="/" className="nav-retro-logo" onClick={() => setIsOpen(false)}>
                        SAS.GRID.SYS
                    </Link>

                    {/* Desktop Menu */}
                    <div className="nav-retro-links desktop-only">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`nav-retro-link ${pathname === link.href ? 'text-accent' : ''}`}
                                aria-current={pathname === link.href ? 'page' : undefined}
                                onMouseEnter={() => playSound('hover')}
                                onClick={() => playSound('click')}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <a
                            href="/Sasanka_Ravindu_SE_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-retro-link"
                            style={{
                                color: 'var(--accent-primary)',
                                border: '1px solid var(--accent-primary)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={() => playSound('hover')}
                            onClick={() => playSound('click')}
                        >
                            RESUME
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="nav-retro-mobile-toggle mobile-only"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? '[ X ]' : '[ /// ]'}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="nav-retro-mobile-menu">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-retro-mobile-link ${pathname === link.href ? 'text-accent' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="nav-arrow">&gt;</span> {link.label}
                        </Link>
                    ))}
                    <a
                        href="/Sasanka_Ravindu_SE_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-retro-mobile-link"
                        style={{ color: 'var(--accent-primary)' }}
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="nav-arrow">&gt;</span> [ VIEW RESUME ]
                    </a>
                </div>
            )}

            {/* Fixed Utility Bar (Bottom Right) */}
            <div style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                zIndex: 1001,
                display: 'flex',
                gap: '0.5rem',
                background: 'var(--bg-card)',
                padding: '0.5rem',
                border: '1px solid var(--border-color)',
                backdropFilter: 'blur(4px)'
            }}>
                {/* Theme Toggle */}
                <button
                    onClick={handleThemeCycle}
                    className="nav-retro-link"
                    style={{
                        background: 'transparent',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-terminal)',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.9rem',
                        border: 'none'
                    }}
                    title={`Current Theme: ${theme.toUpperCase()}`}
                    onMouseEnter={() => playSound('hover')}
                >
                    {getThemeIcon(theme)}
                </button>

                {/* Sound Toggle */}
                <button
                    onClick={handleSoundToggle}
                    className={`nav-retro-link ${enabled ? 'text-accent' : ''}`}
                    style={{
                        background: 'transparent',
                        cursor: 'pointer',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.9rem',
                        border: 'none'
                    }}
                    aria-label={enabled ? "Mute Sound" : "Enable Sound"}
                    title={enabled ? "Mute System Audio" : "Enable Retro Sounds"}
                >
                    {enabled ? '🔊' : '🔇'}
                </button>
            </div>
        </>
    );
}
