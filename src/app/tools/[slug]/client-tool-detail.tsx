'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import anime from 'animejs';
import RetroWindow from '@/components/RetroWindow';
import RetroButton from '@/components/RetroButton';
import RetroModal from '@/components/RetroModal';
import MediaViewer, { MediaItem } from '@/components/MediaViewer';
import { Project } from '@/data/projects';

export default function ClientToolDetail({ tool }: { tool: Project }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);

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
    const mediaList: MediaItem[] = [];

    if (tool.video) {
        mediaList.push({ type: 'video', src: tool.video, alt: `${tool.name} video` });
    }

    if (tool.gallery && tool.gallery.length > 0) {
        tool.gallery.forEach((img, idx) => {
            mediaList.push({ type: 'image', src: img, alt: `${tool.name} image ${idx + 1}` });
        });
    } else if (tool.image && !tool.video) {
        mediaList.push({ type: 'image', src: tool.image, alt: `${tool.name} image` });
    }

    // Construct Schema.org JSON-LD
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.description,
        "applicationCategory": "Utilities",
        "operatingSystem": "Windows",
        "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "24"
        }
    };

    // FAQ Schema
    const faqSchema = tool.faqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": tool.faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    } : null;

    // Simple markdown-like parser for the description
    const renderDescription = (text: string) => {
        return text.split('\n').map((line, i) => {
            if (line.startsWith('### ')) {
                return <h3 key={i} style={{ color: 'var(--accent-primary)', marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('- ')) {
                return (
                    <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        {line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, (match, p1) => p1)} {/* Simple bold strip for list items or handle bold properly if needed */}
                    </li>
                );
            }
            if (line.trim() === '') {
                return <br key={i} />;
            }
            // Paragraph with bold support
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
                <Link href="/tools" className="text-muted project-back-btn project-back-btn--visible" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                }}>
                    ← BACK TO TOOLS
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <h1 className="section-title">
                        <span style={{ marginRight: '1rem' }}>{tool.icon}</span>
                        {tool.name}
                    </h1>
                    {tool.demo && (
                        <a href={tool.demo} target="_blank" rel="noopener noreferrer">
                            <RetroButton variant="primary">DOWNLOAD / DEMO</RetroButton>
                        </a>
                    )}
                </div>
            </div>

            <div ref={contentRef}>
                {/* Main Info with Gallery */}
                <RetroWindow title="SYSTEM_OVERVIEW" className="mb-6" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                    <div style={{ padding: '0.5rem 0' }}>
                        {tool.longDescription ? (
                            <div className="retro-content">
                                {renderDescription(tool.longDescription)}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                                {tool.description}
                            </p>
                        )}
                    </div>

                    {mediaList.length > 0 && (
                        <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                            <div className="gallery-grid">
                                {mediaList.map((media, idx) => (
                                    <div
                                        key={idx}
                                        className="gallery-item"
                                        onClick={() => setSelectedMediaIndex(idx)}
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
                                                    alt={`${tool.name} media ${idx + 1}`}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            )}

                                            {/* Overlay */}
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
                        {tool.github && (
                            <a href={tool.github} target="_blank" rel="noopener noreferrer">
                                <RetroButton>📦 VIEW SOURCE</RetroButton>
                            </a>
                        )}
                    </div>
                </RetroWindow>

                {/* Tech Stack */}
                <RetroWindow title="TECH_STACK" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                    <div className="terminal-container" style={{ border: 'none', padding: 0 }}>
                        <div className="terminal-header">
                            <span className="terminal-prompt">C:\TECH&gt;</span>
                            <span className="text-muted">list</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                            {tool.techStack.map((tech) => (
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
                <RetroWindow title="CORE_FEATURES" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {tool.features.map((feature, index) => (
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

                {/* FAQs */}
                {tool.faqs && (
                    <RetroWindow title="FAQ_DATABASE" style={{ marginBottom: '1.5rem', opacity: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {tool.faqs.map((faq, i) => (
                                <div key={i} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                    <div style={{
                                        color: 'var(--accent-primary)',
                                        fontWeight: 600,
                                        marginBottom: '0.5rem',
                                        display: 'flex',
                                        gap: '0.5rem'
                                    }}>
                                        <span>Q:</span>
                                        <span>{faq.question}</span>
                                    </div>
                                    <div style={{
                                        color: 'var(--text-secondary)',
                                        paddingLeft: '1.5rem',
                                        lineHeight: 1.6
                                    }}>
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </RetroWindow>
                )}

                {/* Role */}

            </div>

            {/* Zoom Modal */}
            <RetroModal
                isOpen={selectedMediaIndex !== null}
                onClose={() => setSelectedMediaIndex(null)}
                title={tool.name + (selectedMediaIndex !== null && mediaList[selectedMediaIndex]?.type === 'video' ? ' (Video Demo)' : ' (Gallery)')}
            >
                {selectedMediaIndex !== null && mediaList.length > 0 && (
                    <MediaViewer items={mediaList} index={selectedMediaIndex} onIndexChange={setSelectedMediaIndex} />
                )}
            </RetroModal>
        </div>
    );
}
