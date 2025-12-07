'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

    return (
        <>
            <nav className="nav-retro">
                <div className="nav-retro-inner">
                    <Link href="/" className="nav-retro-logo" onClick={() => setIsOpen(false)}>
                        PORTFOLIO.SYS
                    </Link>

                    {/* Desktop Menu */}
                    <div className="nav-retro-links desktop-only">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`nav-retro-link ${pathname === link.href ? 'text-accent' : ''}`}
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
        </>
    );
}
