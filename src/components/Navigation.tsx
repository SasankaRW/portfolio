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
                </div>

                {/* Mobile Toggle */}
                <button
                    className="nav-retro-mobile-toggle mobile-only"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '[ X ]' : '[ /// ]'}
                </button>
            </div>

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
                </div>
            )}
        </nav>
    );
}
