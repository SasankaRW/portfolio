'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import FolderIcon from '@/components/FolderIcon';
import RetroModal from '@/components/RetroModal';
import { projects, tools } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import RetroButton from '@/components/RetroButton';

export default function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video', src: string } | null>(null);
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

    // Helper to build media list for the selected project
    const getMediaList = (project: typeof projects[0]) => {
        const list: { type: 'image' | 'video', src: string }[] = [];
        if (project.video) list.push({ type: 'video', src: project.video });
        if (project.gallery) {
            project.gallery.forEach(img => list.push({ type: 'image', src: img }));
        } else if (project.image && !project.video) {
            list.push({ type: 'image', src: project.image });
        }
        return list;
    };

    const mediaList = selectedProject ? getMediaList(selectedProject) : [];

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
                    {projects.length} project(s) found. Click to open folder.
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

            {/* Project/Tool Detail Modal (Folder Window) */}
            <RetroModal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.name.toUpperCase() || 'FOLDER_VIEW'}
            >
                {selectedProject && (
                    <div>
                        {/* Header Info */}
                        <div style={{ marginBottom: '2rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', position: 'relative' }}>
                            {selectedProject.demo && (
                                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', right: 0, top: 0 }}>
                                    <RetroButton style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', borderColor: 'var(--accent-green)', color: 'var(--accent-green)' }}>
                                        LIVE SITE
                                    </RetroButton>
                                </a>
                            )}
                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{selectedProject.icon}</div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{selectedProject.name}</h2>
                            <p className="text-accent" style={{ fontWeight: 600, fontSize: '1rem' }}>{selectedProject.role}</p>
                        </div>

                        {/* Description */}
                        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1rem' }}>
                            {selectedProject.description}
                        </p>

                        {/* Media Gallery */}
                        {mediaList.length > 0 && (
                            <div style={{ marginBottom: '2rem' }}>
                                <div className="gallery-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                    gap: '1rem'
                                }}>
                                    {mediaList.map((media, idx) => (
                                        <div
                                            key={idx}
                                            className="gallery-item"
                                            style={{
                                                cursor: 'pointer',
                                                border: '1px solid var(--border-color)',
                                                transition: 'transform 0.2s',
                                                borderRadius: '4px',
                                                overflow: 'hidden'
                                            }}
                                            onClick={() => setSelectedMedia(media)}
                                        >
                                            <div style={{
                                                position: 'relative',
                                                width: '100%',
                                                aspectRatio: '16/9',
                                                background: 'var(--bg-black)'
                                            }}>
                                                {media.type === 'video' ? (
                                                    <video
                                                        src={media.src}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        muted
                                                        playsInline
                                                    />
                                                ) : (
                                                    <Image
                                                        src={media.src}
                                                        alt={`${selectedProject.name} media ${idx + 1}`}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                )}
                                                <div className="gallery-item-overlay" style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'rgba(0,0,0,0.5)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    opacity: 0,
                                                    transition: 'opacity 0.2s'
                                                }}>
                                                    <span style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                        {media.type === 'video' ? 'PLAY VIDEO' : 'ZOOM'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tech Stack */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem', width: 'max-content' }}>
                                // TECH_STACK
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {selectedProject.techStack.map(tech => (
                                    <span key={tech} style={{
                                        fontSize: '0.8rem',
                                        padding: '0.3rem 0.6rem',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-section)',
                                        color: 'var(--text-primary)'
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem', width: 'max-content' }}>
                                // SYSTEM_FEATURES
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {selectedProject.features.map((feature, idx) => (
                                    <li key={idx} style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '0.5rem',
                                        display: 'flex',
                                        gap: '0.75rem',
                                        alignItems: 'baseline'
                                    }}>
                                        <span className="text-accent" style={{ fontFamily: 'var(--font-terminal)' }}>[{idx + 1}]</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sticky Action Bar */}
                        <div style={{
                            position: 'sticky',
                            bottom: '-1rem',
                            left: 0,
                            right: 0,
                            paddingTop: '1rem',
                            paddingBottom: '0.5rem',
                            background: 'linear-gradient(to top, var(--bg-card) 90%, transparent)',
                            display: 'flex',
                            gap: '1rem',
                            marginTop: '2rem',
                            borderTop: '1px solid var(--border-color)',
                            backdropFilter: 'blur(5px)'
                        }}>

                            {selectedProject.github && (
                                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                                    <RetroButton className="w-full" style={{ width: '100%' }}>
                                        GITHUB REPO
                                    </RetroButton>
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </RetroModal>

            {/* Zoom Modal for Media */}
            <RetroModal
                isOpen={!!selectedMedia}
                onClose={() => setSelectedMedia(null)}
                title="MEDIA_VIEWER.EXE"
            >
                {selectedMedia && (
                    <div className="crt-frame" style={{ padding: 0, border: 'none' }}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: 'auto',
                            minHeight: '60vh',
                            maxHeight: '80vh',
                            background: 'var(--bg-black)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {selectedMedia.type === 'video' ? (
                                <video
                                    src={selectedMedia.src}
                                    controls
                                    autoPlay
                                    style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', outline: 'none' }}
                                />
                            ) : (
                                <Image
                                    src={selectedMedia.src}
                                    alt="Gallery Zoom"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            )}
                        </div>
                    </div>
                )}
            </RetroModal>
        </div>
    );
}
