'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import FolderIcon from '@/components/FolderIcon';
import RetroModal from '@/components/RetroModal';
import { projects, tools } from '@/data/projects';
import Link from 'next/link';
import RetroButton from '@/components/RetroButton';

export default function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const toolsGridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gridRef.current) {
            const items = gridRef.current.querySelectorAll('.folder-icon');
            anime({
                targets: items,
                opacity: [0, 1],
                scale: [0.8, 1],
                delay: anime.stagger(100, { start: 200 }),
                duration: 500,
                easing: 'easeOutCubic',
            });
        }

        if (toolsGridRef.current) {
            const items = toolsGridRef.current.querySelectorAll('.folder-icon');
            anime({
                targets: items,
                opacity: [0, 1],
                scale: [0.8, 1],
                delay: anime.stagger(100, { start: 600 }),
                duration: 500,
                easing: 'easeOutCubic',
            });
        }
    }, []);

    return (
        <div className="section">
            <div className="section-header">
                <h1 className="section-title">&gt; PROJECTS.EXE</h1>
                <p className="section-subtitle">Project Directory</p>
            </div>

            {/* Main Projects Section */}
            <div className="terminal-container" style={{ marginBottom: '2rem' }}>
                <div className="terminal-header">
                    <span className="terminal-prompt">C:\PROJECTS&gt;</span>
                    <span className="text-muted">dir /w</span>
                </div>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                    {projects.length} project(s) found. Click to view details.
                </p>
            </div>

            <div ref={gridRef} className="desktop-grid" style={{ marginBottom: '4rem' }}>
                {projects.map((project) => (
                    <FolderIcon
                        key={project.id}
                        label={project.name}
                        onClick={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            {/* Tools Section */}
            <div className="section-header" style={{ marginBottom: '2rem' }}>
                <h2 className="section-title" style={{ fontSize: '1.25rem' }}>&gt; TOOLS & UTILITIES</h2>
            </div>

            <div className="terminal-container" style={{ marginBottom: '2rem' }}>
                <div className="terminal-header">
                    <span className="terminal-prompt">C:\TOOLS&gt;</span>
                    <span className="text-muted">list --all</span>
                </div>
            </div>

            <div ref={toolsGridRef} className="desktop-grid">
                {tools.map((tool) => (
                    <FolderIcon
                        key={tool.id}
                        label={tool.name}
                        onClick={() => setSelectedProject(tool)}
                    />
                ))}
            </div>

            {/* Project/Tool Detail Modal */}
            <RetroModal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.name || ''}
            >
                {selectedProject && (
                    <div>
                        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{selectedProject.icon}</div>
                            <p className="text-accent" style={{ fontWeight: 600 }}>{selectedProject.role}</p>
                        </div>

                        <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            {selectedProject.description}
                        </p>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TECH STACK:</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {selectedProject.techStack.map(tech => (
                                    <span key={tech} style={{
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>FEATURES:</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {selectedProject.features.map((feature, idx) => (
                                    <li key={idx} style={{
                                        fontSize: '0.85rem',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '0.25rem',
                                        display: 'flex',
                                        gap: '0.5rem'
                                    }}>
                                        <span className="text-accent">&gt;</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <Link href={`/projects/${selectedProject.slug}`} style={{ width: '100%' }}>
                                <RetroButton className="w-full" style={{ width: '100%' }}>
                                    VIEW FULL DETAILS
                                </RetroButton>
                            </Link>
                        </div>
                    </div>
                )}
            </RetroModal>
        </div>
    );
}
