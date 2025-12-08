'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/data/projects';
import RetroButton from './RetroButton';
import RetroModal from './RetroModal';

interface ProjectDetailViewProps {
    project: Project;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
    const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video', src: string } | null>(null);

    // Helper to build media list
    const getMediaList = (p: Project) => {
        const list: { type: 'image' | 'video', src: string }[] = [];
        if (p.video) list.push({ type: 'video', src: p.video });
        if (p.gallery) {
            p.gallery.forEach(img => list.push({ type: 'image', src: img }));
        } else if (p.image && !p.video) {
            list.push({ type: 'image', src: p.image });
        }
        return list;
    };

    const mediaList = getMediaList(project);

    return (
        <div className="animate-fade-in">
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .media-item-wrapper:hover .gallery-item-overlay {
                    opacity: 1 !important;
                }
            `}</style>

            {/* Header / Breadcrumb-ish */}
            <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{project.icon}</span>
                    <div>
                        <h1 style={{ fontSize: '2rem', lineHeight: 1, marginBottom: '0.25rem' }}>{project.name}</h1>
                        <p className="text-accent" style={{ fontSize: '1rem', marginBottom: 0 }}>{project.role}</p>
                    </div>
                </div>
                {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <RetroButton variant="primary">
                            LAUNCH LIVE SITE
                        </RetroButton>
                    </a>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: '3rem' }}>
                {/* LEFT COLUMN: Media */}
                <div style={{ minWidth: 0 }}> {/* minWidth 0 is critical for grid/flex children scrolling */}
                    <div className="crt-frame" style={{ marginBottom: '1.5rem', padding: 0, overflow: 'hidden', position: 'relative' }}>
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
                                        onClick={() => setSelectedMedia(media)}
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
                                    onClick={() => setSelectedMedia(media)}
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
                </div>

                {/* RIGHT COLUMN: Info */}
                <div>
                    <div style={{
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

                    {/* Source Link */}
                    {project.github && (
                        <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>//</span> SOURCE_ACCESS
                            </h4>
                            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%' }}>
                                <RetroButton style={{ width: '100%', justifyContent: 'center' }}>
                                    VIEW SOURCE CODE ON GITHUB
                                </RetroButton>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Media Zoom Modal */}
            <RetroModal
                isOpen={!!selectedMedia}
                onClose={() => setSelectedMedia(null)}
                title="MEDIA_VIEWER"
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
                                    alt="Zoom"
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
