'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import RetroWindow from '@/components/RetroWindow';
import RetroButton from '@/components/RetroButton';
import { research } from '@/data/research';

export default function ResearchPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const items = containerRef.current.querySelectorAll('.research-item');
            anime({
                targets: items,
                opacity: [0, 1],
                translateY: [30, 0],
                delay: anime.stagger(150, { start: 200 }),
                duration: 600,
                easing: 'easeOutCubic',
            });
        }
    }, []);

    return (
        <div className="section">
            <div className="section-header">
                <h1 className="section-title">&gt; RESEARCH.EXE</h1>
                <p className="section-subtitle">Academic Publications</p>
            </div>

            <div className="terminal-container" style={{ marginBottom: '2rem' }}>
                <div className="terminal-header">
                    <span className="terminal-prompt">C:\RESEARCH&gt;</span>
                    <span className="text-muted">cat publications.txt</span>
                </div>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                    {research.length} publication(s) found.
                </p>
            </div>

            <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {research.map((paper) => (
                    <div key={paper.id} className="research-item" style={{ opacity: 0 }}>
                        <RetroWindow title={`PAPER: ${paper.year}`}>
                            <h3 className="text-accent" style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
                                {paper.title}
                            </h3>

                            {/* Abstract */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{
                                    fontSize: '0.875rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.5rem',
                                    color: 'var(--text-muted)'
                                }}>
                                    Abstract:
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                    {paper.abstract}
                                </p>
                            </div>

                            {/* Goals */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{
                                    fontSize: '0.875rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.5rem',
                                    color: 'var(--text-muted)'
                                }}>
                                    Research Goals:
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {paper.goals.map((goal, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                padding: '0.25rem 0',
                                                paddingLeft: '1.5rem',
                                                position: 'relative',
                                                color: 'var(--text-secondary)',
                                            }}
                                        >
                                            <span style={{
                                                position: 'absolute',
                                                left: 0,
                                                color: 'var(--accent-primary)',
                                            }}>
                                                •
                                            </span>
                                            {goal}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Method */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{
                                    fontSize: '0.875rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.5rem',
                                    color: 'var(--text-muted)'
                                }}>
                                    Method:
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                    {paper.method}
                                </p>
                            </div>

                            {/* Results */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{
                                    fontSize: '0.875rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.5rem',
                                    color: 'var(--text-muted)'
                                }}>
                                    Results:
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                    {paper.results}
                                </p>
                            </div>

                            {/* PDF Button */}
                            {paper.pdfUrl && (
                                <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
                                    <RetroButton>
                                        📄 OPEN FILE
                                    </RetroButton>
                                </a>
                            )}
                        </RetroWindow>
                    </div>
                ))}
            </div>
        </div>
    );
}
