'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/data/projects';
import RetroButton from './RetroButton';
import RetroModal from './RetroModal';
import MediaViewer, { MediaItem } from './MediaViewer';

interface ProjectDetailViewProps {
    project: Project;
    onBack: () => void;
}

export default function ProjectDetailView({ project, onBack }: ProjectDetailViewProps) {
    const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);

    // Helper to build media list
    const getMediaList = (p: Project): MediaItem[] => {
        const list: MediaItem[] = [];
        if (p.video) list.push({ type: 'video', src: p.video, alt: `${p.name} video` });
        if (p.gallery) {
            p.gallery.forEach((img, idx) => list.push({ type: 'image', src: img, alt: `${p.name} image ${idx + 1}` }));
        } else if (p.image && !p.video) {
            list.push({ type: 'image', src: p.image, alt: `${p.name} image` });
        }
        return list;
    };

    const mediaList = getMediaList(project);

    return (
        <div className="project-detail">
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .media-item-wrapper:hover .gallery-item-overlay {
                    opacity: 1 !important;
                }
            `}</style>

            <button
                onClick={onBack}
                className="project-back-btn project-back-btn--visible"
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-terminal)',
                    fontSize: '1rem',
                    padding: 0
                }}
            >
                <span>&lt;</span> BACK_TO_LIST
            </button>

            <div className="animate-fade-in">
            {/* Header / Breadcrumb-ish */}
            <div className="project-detail-header" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="project-detail-title" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{project.icon}</span>
                    <div>
                        <h1 style={{ fontSize: '2rem', lineHeight: 1, marginBottom: '0.25rem' }}>{project.name}</h1>
                        <p className="text-accent" style={{ fontSize: '1rem', marginBottom: 0 }}>{project.role}</p>
                    </div>
                </div>
                {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-detail-cta">
                        <RetroButton variant="primary" className="project-live-cta">
                            {['auto-typer', 'whatsapp-bot'].includes(project.slug) ? 'VIEW RELEASES' : 'LAUNCH LIVE SITE'}
                        </RetroButton>
                    </a>
                )}
            </div>

            <div className="project-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: '3rem' }}>
                {/* LEFT COLUMN: Media */}
                <div style={{ minWidth: 0 }}> {/* minWidth 0 is critical for grid/flex children scrolling */}
                    <div className="crt-frame project-media-frame" style={{ marginBottom: '1.5rem', padding: 0, overflow: 'hidden', position: 'relative' }}>
                        {mediaList.length > 0 ? (
                            <div
                                style={{
                                    display: 'flex',
                                    overflowX: 'auto',
                                    scrollSnapType: 'x mandatory',
                                    aspectRatio: '16/9',
                                    scrollbarWidth: 'none', // Firefox
                                    msOverflowStyle: 'none', // IE/Edge
                                }}
                                className="hide-scrollbar"
                            >

                                {mediaList.map((media, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedMediaIndex(idx)}
                                        className="media-item-wrapper"
                                        style={{
                                            flex: '0 0 100%',
                                            width: '100%',
                                            height: '100%',
                                            scrollSnapAlign: 'start',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            borderRight: idx < mediaList.length - 1 ? '1px solid var(--border-color)' : 'none'
                                        }}
                                    >
                                        <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg-black)' }}>
                                            {media.type === 'video' ? (
                                                <>
                                                    <video
                                                        src={media.src}
                                                        muted
                                                        loop
                                                        autoPlay
                                                        playsInline
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                    {/* Hover Overlay for Video */}
                                                    <div className="gallery-item-overlay" style={{
                                                        position: 'absolute', inset: 0,
                                                        background: 'rgba(0,0,0,0.3)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        opacity: 0, transition: 'opacity 0.2s'
                                                    }}>
                                                        <span style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.8)' }}>▶</span>
                                                    </div>
                                                </>

                                            ) : (
                                                <Image
                                                    src={media.src}
                                                    alt={`${project.name} media ${idx + 1}`}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--bg-black)'
                            }}>
                                <div style={{ fontSize: '3rem' }}>{project.icon}</div>
                            </div>
                        )}

                        {/* Pagination Dots (Positioned Absolute inside the frame) */}
                        {mediaList.length > 1 && (
                            <div style={{
                                position: 'absolute',
                                bottom: '1rem',
                                left: '0',
                                right: '0',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                pointerEvents: 'none',
                                zIndex: 10
                            }}>
                                {mediaList.map((_, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: 'var(--accent-primary)',
                                            opacity: 0.6,
                                            boxShadow: '0 0 4px rgba(0,0,0,0.8)'
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>



                    {/* Thumbnails Grid (restored) */}
                    {mediaList.length > 1 && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                            gap: '0.5rem',
                            marginBottom: '1.5rem'
                        }}>
                            {mediaList.map((media, idx) => (
                                <div
                                    key={idx}
                                    className="gallery-item"
                                    onClick={() => setSelectedMediaIndex(idx)}
                                    style={{
                                        aspectRatio: '1',
                                        border: '1px solid var(--border-color)',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        opacity: 0.8,
                                        transition: 'opacity 0.2s'
                                    }}
                                >
                                    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg-black)' }}>
                                        {media.type === 'video' ? (
                                            <video src={media.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <Image src={media.src} alt="" fill style={{ objectFit: 'cover' }} />
                                        )}
                                        {/* Hover Icon */}
                                        <div className="gallery-item-overlay" style={{
                                            position: 'absolute', inset: 0,
                                            background: 'rgba(0,0,0,0.3)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            opacity: 0, transition: 'opacity 0.2s'
                                        }}>
                                            <span style={{ fontSize: '1.2rem' }}>🔍</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* GitHub Link below images for tools/all */}
                    {project.github && (
                        <div className="project-github-cta" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%' }}>
                                <RetroButton style={{ width: '100%', justifyContent: 'center' }}>
                                    VIEW SOURCE CODE ON GITHUB
                                </RetroButton>
                            </a>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: Info */}
                <div>
                    <div className="project-summary" style={{
                        marginBottom: '2.5rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.8,
                        fontSize: '1.1rem',
                        borderLeft: '4px solid var(--accent-primary)',
                        paddingLeft: '1.5rem',
                        background: 'linear-gradient(90deg, rgba(0, 255, 204, 0.05), transparent)'
                    }}>
                        {project.description}
                    </div>

                    {/* Tech Stack */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>//</span> TECHNOLOGIES_USED
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {project.techStack.map(tech => (
                                <span key={tech} style={{
                                    fontSize: '0.9rem',
                                    padding: '0.4rem 0.8rem',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--bg-section)',
                                    color: 'var(--accent-primary)',
                                    fontFamily: 'var(--font-terminal)'
                                }}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    {project.features && (
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>//</span> KEY_FEATURES
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {project.features.map((feature, idx) => (
                                    <li key={idx} style={{
                                        fontSize: '1rem',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '0.75rem',
                                        display: 'flex',
                                        gap: '1rem',
                                        alignItems: 'baseline'
                                    }}>
                                        <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-terminal)' }}>{`[${idx + 1}]`}</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}


                </div>
            </div>

            {/* Media Zoom Modal */}
            <RetroModal
                isOpen={selectedMediaIndex !== null}
                onClose={() => setSelectedMediaIndex(null)}
                title="MEDIA_VIEWER"
            >
                {selectedMediaIndex !== null && mediaList.length > 0 && (
                    <MediaViewer items={mediaList} index={selectedMediaIndex} onIndexChange={setSelectedMediaIndex} />
                )}
            </RetroModal>
            </div>
        </div>
    );
}
