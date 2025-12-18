'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import anime from 'animejs';
import RetroWindow from '@/components/RetroWindow';
import RetroButton from '@/components/RetroButton';
import RetroModal from '@/components/RetroModal';
import { Project } from '@/data/projects';

export default function ClientProjectDetail({ project }: { project: Project }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video', src: string } | null>(null);

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

    // Construct unified media list
    const mediaList: { type: 'image' | 'video', src: string }[] = [];

    if (project.video) {
        mediaList.push({ type: 'video', src: project.video });
    }

    if (project.gallery && project.gallery.length > 0) {
        project.gallery.forEach(img => {
            mediaList.push({ type: 'image', src: img });
        });
    } else if (project.image && !project.video) {
        mediaList.push({ type: 'image', src: project.image });
    }

    // Construct Schema.org JSON-LD (Product/Software)
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": project.name,
        "description": project.description,
        "applicationCategory": "Application",
        "operatingSystem": "Any",
    };

    // FAQ Schema
    const faqSchema = project.faqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": project.faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    } : null;

    const renderDescription = (text: string) => {
        return text.split('\n').map((line, i) => {
            if (line.startsWith('### ')) {
                return <h3 key={i} style={{ color: 'var(--accent-primary)', marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('- ')) {
                return (
                    <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        {line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, (match, p1) => p1)}
                    </li>
                );
            }
            if (line.trim() === '') {
                return <br key={i} />;
            }
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
                <p key={i} style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    })}
                </p>
            );
        });
    };

    return (
        <div className="section">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <h1 className="section-title">
                        <span style={{ marginRight: '1rem' }}>{project.icon}</span>
                        {project.name}
                    </h1>
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <RetroButton variant="primary">LIVE DEMO</RetroButton>
                        </a>
                    )}
                </div>
            </div>

            <div ref={contentRef}>
                {/* Main Info */}
                <RetroWindow title="PROJECT_INFO" className="mb-6" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                    <div style={{ padding: '0.5rem 0' }}>
                        {project.longDescription ? (
                            <div className="retro-content">
                                {renderDescription(project.longDescription)}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                {project.description}
                            </p>
                        )}
                    </div>

                    {mediaList.length > 0 && (
                        <div style={{ marginBottom: '1rem', marginTop: '2rem' }}>
                            <div className="gallery-grid">
                                {mediaList.map((media, idx) => (
                                    <div
                                        key={idx}
                                        className="gallery-item"
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
                                                    alt={`${project.name} media ${idx + 1}`}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            )}
                                            <div className="gallery-item-overlay">
                                                <span style={{ color: 'var(--accent-primary)', fontSize: '0.875rem' }}>
                                                    {media.type === 'video' ? 'PLAY VIDEO' : 'VIEW IMAGE'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <RetroButton>📦 VIEW SOURCE</RetroButton>
                            </a>
                        )}
                    </div>
                </RetroWindow>

                {/* Tech Stack */}
                <RetroWindow title="TECH_STACK" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                    <div className="terminal-container" style={{ border: 'none', padding: 0 }}>
                        {/* ... (keep existing tech stack render logic) ... */}
                        <div className="terminal-header">
                            <span className="terminal-prompt">C:\TECH&gt;</span>
                            <span className="text-muted">list</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                            {project.techStack.map((tech) => (
                                <span key={tech} style={{ padding: '0.5rem 1rem', background: 'var(--bg-section)', border: '2px solid var(--border-color)', color: 'var(--accent-primary)', fontSize: '0.875rem' }}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </RetroWindow>

                {/* Features */}
                <RetroWindow title="KEY_FEATURES" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {project.features.map((feature, index) => (
                            <li key={index} style={{ padding: '0.75rem 0', paddingLeft: '2rem', position: 'relative', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                                <span style={{ position: 'absolute', left: 0, color: 'var(--accent-primary)', fontFamily: 'var(--font-terminal)' }}>[{String(index + 1).padStart(2, '0')}]</span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </RetroWindow>

                {/* FAQs */}
                {project.faqs && (
                    <RetroWindow title="FAQ" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {project.faqs.map((faq, i) => (
                                <div key={i} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                    <div style={{ color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                        <span>Q:</span><span>{faq.question}</span>
                                    </div>
                                    <div style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: 1.6 }}>{faq.answer}</div>
                                </div>
                            ))}
                        </div>
                    </RetroWindow>
                )}

            </div>

            {/* Zoom Modal */}
            <RetroModal isOpen={!!selectedMedia} onClose={() => setSelectedMedia(null)} title={project.name} >
                {selectedMedia && (
                    <div className="crt-frame" style={{ padding: 0, border: 'none' }}>
                        <div style={{ position: 'relative', width: '100%', height: 'auto', minHeight: '60vh', maxHeight: '80vh', background: 'var(--bg-black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {selectedMedia.type === 'video' ? (
                                <video src={selectedMedia.src} controls autoPlay style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', outline: 'none' }} />
                            ) : (
                                <Image src={selectedMedia.src} alt="Gallery Zoom" fill style={{ objectFit: 'contain' }} />
                            )}
                        </div>
                    </div>
                )}
            </RetroModal>
        </div>
    );
}
