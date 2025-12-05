'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import anime from 'animejs';
import RetroWindow from '@/components/RetroWindow';
import RetroButton from '@/components/RetroButton';
import { projects } from '@/data/projects';

export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const project = projects.find((p) => p.slug === slug);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            anime({
                targets: contentRef.current.children,
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(100, { start: 200 }),
                duration: 600,
                easing: 'easeOutCubic',
            });
        }
    }, []);

    if (!project) {
        return (
            <div className="section">
                <RetroWindow title="ERROR">
                    <p className="text-accent">PROJECT NOT FOUND</p>
                    <p className="text-muted" style={{ marginBottom: '1rem' }}>
                        The requested project does not exist in the database.
                    </p>
                    <Link href="/projects">
                        <RetroButton>BACK TO PROJECTS</RetroButton>
                    </Link>
                </RetroWindow>
            </div>
        );
    }

    return (
        <div className="section">
            <div className="section-header">
                <Link href="/projects" className="text-muted" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                }}>
                    ← BACK TO PROJECTS
                </Link>
                <h1 className="section-title">
                    <span style={{ marginRight: '1rem' }}>{project.icon}</span>
                    {project.name}
                </h1>
            </div>

            <div ref={contentRef}>
                {/* Main Info */}
                <RetroWindow title="PROJECT INFO" className="mb-6" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                        {project.description}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <RetroButton>📦 VIEW SOURCE</RetroButton>
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <RetroButton variant="primary">🚀 LIVE DEMO</RetroButton>
                            </a>
                        )}
                    </div>
                </RetroWindow>

                {/* Tech Stack */}
                <RetroWindow title="TECH STACK" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                    <div className="terminal-container" style={{ border: 'none', padding: 0 }}>
                        <div className="terminal-header">
                            <span className="terminal-prompt">C:\TECH&gt;</span>
                            <span className="text-muted">list</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'var(--bg-section)',
                                        border: '2px solid var(--border-color)',
                                        color: 'var(--accent-primary)',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </RetroWindow>

                {/* Features */}
                <RetroWindow title="FEATURES" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {project.features.map((feature, index) => (
                            <li
                                key={index}
                                style={{
                                    padding: '0.75rem 0',
                                    paddingLeft: '2rem',
                                    position: 'relative',
                                    color: 'var(--text-secondary)',
                                    borderBottom: '1px solid var(--border-color)',
                                }}
                            >
                                <span style={{
                                    position: 'absolute',
                                    left: 0,
                                    color: 'var(--accent-primary)',
                                    fontFamily: 'var(--font-terminal)',
                                }}>
                                    [{String(index + 1).padStart(2, '0')}]
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </RetroWindow>

                {/* Role */}
                <RetroWindow title="MY ROLE" style={{ opacity: 0 }}>
                    <p className="text-accent" style={{ fontSize: '1.25rem' }}>
                        {project.role}
                    </p>
                </RetroWindow>
            </div>
        </div>
    );
}
