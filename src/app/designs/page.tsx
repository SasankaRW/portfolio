'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import RetroModal from '@/components/RetroModal';

// Placeholder design items (user will provide real images)
const designItems = [
    { id: 1, title: 'Dashboard UI', category: 'Web Design', placeholder: '🎨' },
    { id: 2, title: 'Mobile App', category: 'App Design', placeholder: '📱' },
    { id: 3, title: 'Brand Identity', category: 'Branding', placeholder: '✨' },
    { id: 4, title: 'Icon Set', category: 'Icons', placeholder: '🔷' },
    { id: 5, title: 'Poster Design', category: 'Print', placeholder: '🖼️' },
    { id: 6, title: 'Website Mockup', category: 'Web Design', placeholder: '💻' },
];

export default function DesignsPage() {
    const [selectedDesign, setSelectedDesign] = useState<typeof designItems[0] | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gridRef.current) {
            const items = gridRef.current.querySelectorAll('.gallery-item');
            anime({
                targets: items,
                opacity: [0, 1],
                scale: [0.9, 1],
                delay: anime.stagger(80, { start: 200 }),
                duration: 500,
                easing: 'easeOutCubic',
            });
        }
    }, []);

    const handleZoom = (item: typeof designItems[0]) => {
        setSelectedDesign(item);
    };

    return (
        <div className="section">
            <div className="section-header">
                <h1 className="section-title">&gt; DESIGNS.EXE</h1>
                <p className="section-subtitle">Design Portfolio Gallery</p>
            </div>

            <div className="terminal-container" style={{ marginBottom: '2rem' }}>
                <div className="terminal-header">
                    <span className="terminal-prompt">C:\DESIGNS&gt;</span>
                    <span className="text-muted">view gallery</span>
                </div>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                    Click on an image to zoom
                </p>
            </div>

            <div ref={gridRef} className="gallery-grid">
                {designItems.map((item) => (
                    <div
                        key={item.id}
                        className="gallery-item"
                        onClick={() => handleZoom(item)}
                        style={{ opacity: 0 }}
                    >
                        {/* Placeholder for actual images */}
                        <div style={{
                            aspectRatio: '4/3',
                            background: 'var(--bg-section)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3rem',
                        }}>
                            {item.placeholder}
                            <span style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                marginTop: '0.5rem',
                            }}>
                                {item.category}
                            </span>
                        </div>
                        <div className="gallery-item-overlay">
                            <span style={{ color: 'var(--accent-primary)', fontSize: '0.875rem' }}>
                                CLICK TO ZOOM
                            </span>
                        </div>
                        <div style={{
                            padding: '0.75rem',
                            borderTop: '2px solid var(--border-color)',
                        }}>
                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-primary)',
                                margin: 0
                            }}>
                                {item.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Zoom Modal */}
            <RetroModal
                isOpen={!!selectedDesign}
                onClose={() => setSelectedDesign(null)}
                title={selectedDesign?.title || 'Design'}
            >
                {selectedDesign && (
                    <div className="crt-frame">
                        <div style={{
                            aspectRatio: '16/10',
                            background: 'var(--bg-main)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '5rem',
                        }}>
                            {selectedDesign.placeholder}
                            <span style={{
                                fontSize: '1rem',
                                color: 'var(--text-muted)',
                                marginTop: '1rem',
                            }}>
                                {selectedDesign.category}
                            </span>
                        </div>
                    </div>
                )}
            </RetroModal>
        </div>
    );
}
