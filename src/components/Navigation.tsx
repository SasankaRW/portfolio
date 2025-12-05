'use client';

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

    return (
        <nav className="nav-retro">
            <div className="nav-retro-inner">
                <Link href="/" className="nav-retro-logo">
                    PORTFOLIO.SYS
                </Link>
                <div className="nav-retro-links">
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
            </div>
        </nav>
    );
}
