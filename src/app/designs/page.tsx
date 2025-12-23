'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import RetroModal from '@/components/RetroModal';

import Image from 'next/image';

// Real design items from public/images
const designItems = [
    // Flyers
    { id: 1, title: 'Event Flyer (Feb)', category: 'Flyers', image: '/images/flyers/24feb6.png' },
    { id: 2, title: 'Dunky Event', category: 'Flyers', image: '/images/flyers/dunky rn.png' },
    { id: 3, title: 'Retro vs Modern', category: 'Flyers', image: '/images/flyers/old vs presnt-Recovered.png' },

    // Labels
    { id: 4, title: 'Curry Powder Label', category: 'Labels', image: '/images/labels/CURRY POWDER50g.png' },
    { id: 5, title: 'Mustard Powder Label', category: 'Labels', image: '/images/labels/MUSTARD POWDERbottle.png' },
    { id: 6, title: 'Product Catalog Page', category: 'Labels', image: '/images/labels/PAGE .2.jpeg' },
    { id: 7, title: 'Fruitopia Label', category: 'Labels', image: '/images/labels/fruitopia.jpeg' },
    { id: 8, title: 'Sauce Collection', category: 'Labels', image: '/images/labels/sauces.jpg' },

    // UI/UX
    { id: 9, title: 'Fit Fitness App', category: 'UI/UX', image: '/images/ui/fit-fitness-app.png' },
    { id: 10, title: 'Cylon Trail', category: 'UI/UX', image: '/images/ui/cylontrail.png' },
];

const categories = ['All', 'Flyers', 'Labels', 'UI/UX'];

export default function DesignsPage() {
    const [selectedDesign, setSelectedDesign] = useState<typeof designItems[0] | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const gridRef = useRef<HTMLDivElement>(null);

    const [isZoomed, setIsZoomed] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

    const filteredItems = activeCategory === 'All'
        ? designItems
        : designItems.filter(item => item.category === activeCategory);

    useEffect(() => {
        if (gridRef.current) {
            // Reset animations when category changes
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
    }, [activeCategory]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setCursorPos({ x, y });
    };

    const closeViewer = () => {
        setSelectedDesign(null);
        setIsZoomed(false);
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
                    <span className="text-muted">filter --category {activeCategory}</span>
                </div>

                {/* Category Filter Buttons */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`retro-btn ${activeCategory === cat ? 'retro-btn-primary' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                            style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div ref={gridRef} className="gallery-grid">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        className="gallery-item"
                        onClick={() => setSelectedDesign(item)}
                        style={{ opacity: 0 }}
                    >
                        <div className="crt-thumb" style={{
                            aspectRatio: '4/3',
                            background: 'var(--bg-section)',
                        }}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="gallery-item-overlay">
                            <span style={{ color: 'var(--accent-primary)', fontSize: '0.875rem' }}>
                                VIEW DESIGN
                            </span>
                        </div>
                        <div style={{
                            padding: '0.75rem',
                            borderTop: '1px solid var(--border-color)',
                            background: 'var(--bg-card)'
                        }}>
                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-primary)',
                                margin: 0,
                                fontWeight: 600
                            }}>
                                {item.title}
                            </p>
                            <p style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                margin: '0.25rem 0 0 0'
                            }}>
                                {item.category}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Zoom Modal */}
            <RetroModal
                isOpen={!!selectedDesign}
                onClose={closeViewer}
                title={selectedDesign?.title || 'Design Viewer'}
            >
                {selectedDesign && (
                    <div className="crt-frame" style={{ padding: 0, border: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div
                            onMouseMove={handleMouseMove}
                            onClick={() => setIsZoomed(!isZoomed)}
                            style={{
                                position: 'relative',
                                width: '100%',
                                flex: 1,
                                minHeight: '60vh',
                                maxHeight: '80vh',
                                height: 'calc(100vh - 120px)',
                                background: 'var(--bg-black)',
                                overflow: 'hidden',
                                cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                            }}
                        >
                            <Image
                                src={selectedDesign.image}
                                alt={selectedDesign.title}
                                fill
                                style={{
                                    objectFit: 'contain',
                                    transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                                    transformOrigin: `${cursorPos.x}% ${cursorPos.y}%`,
                                    transition: 'transform 0.2s ease-out'
                                }}
                            />
                        </div>
                        <div style={{ padding: '1rem', borderTop: '2px solid var(--border-color)', flexShrink: 0 }}>
                            <p className="text-accent">{selectedDesign.title} ({selectedDesign.category})</p>
                            <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                {isZoomed ? '[CLICK TO RESET]' : '[CLICK TO ZOOM]'}
                            </p>
                        </div>
                    </div>
                )}
            </RetroModal>
        </div>
    );
}
