'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { experiences } from '@/data/experiences';

export default function ExperiencePage() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gridRef.current) {
            const items = gridRef.current.querySelectorAll('.retro-window');
            anime({
                targets: items,
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(100, { start: 200 }),
                duration: 500,
                easing: 'easeOutCubic',
            });
        }
    }, []);

    return (
        <div className="section">
            <div className="section-header">
                <h1 className="section-title">&gt; EXPERIENCE.EXE</h1>
                <p className="section-subtitle">Work History </p>
            </div>

            <div className="terminal-container" style={{ marginBottom: '2rem' }}>
                <div className="terminal-header">
                    <span className="terminal-prompt">C:\EXPERIENCE&gt;</span>
                    <span className="text-muted">list --detailed</span>
                </div>
            </div>

            <div ref={gridRef} className="projects-grid">
                {experiences.map((exp) => (
                    <div key={exp.id} className="retro-window" style={{ height: '100%', opacity: 0 }}>
                        <div className="retro-window-titlebar">
                            <span className="retro-window-title">{exp.company}</span>
                            <div className="retro-window-controls">
                                <span className="retro-window-btn">_</span>
                                <span className="retro-window-btn">□</span>
                            </div>
                        </div>
                        <div className="retro-window-content" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 35px)' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <h3 className="text-accent" style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                                    {exp.role}
                                </h3>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>{exp.duration}</p>
                            </div>

                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                marginBottom: '1rem',
                                lineHeight: 1.5,
                                flexGrow: 1
                            }}>
                                {exp.description}
                            </p>

                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                marginTop: 'auto',
                                borderTop: '1px solid var(--border-color)',
                                paddingTop: '1rem'
                            }}>
                                {exp.responsibilities.slice(0, 3).map((resp, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            padding: '0.25rem 0',
                                            paddingLeft: '1rem',
                                            position: 'relative',
                                            color: 'var(--text-muted)',
                                            fontSize: '0.8rem'
                                        }}
                                    >
                                        <span style={{
                                            position: 'absolute',
                                            left: 0,
                                            color: 'var(--accent-primary)'
                                        }}>
                                            •
                                        </span>
                                        {resp}
                                    </li>
                                ))}
                                {exp.responsibilities.length > 3 && (
                                    <li style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                                        + {exp.responsibilities.length - 3} more items...
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
