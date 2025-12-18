'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import ProjectCard from '@/components/ProjectCard';
import { tools } from '@/data/projects';
import Link from 'next/link';

export default function ToolsPage() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gridRef.current) {
            const items = gridRef.current.children;
            anime({
                targets: items,
                opacity: [0, 1],
                scale: [0.95, 1],
                delay: anime.stagger(50),
                duration: 400,
                easing: 'easeOutQuad',
            });
        }
    }, []);

    return (
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            <div className="section-header" style={{ marginBottom: '2rem' }}>
                <Link href="/projects" className="text-muted" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                    ← BACK TO PROJECTS
                </Link>
                <h1 className="section-title">&gt; TOOLS.EXE</h1>
                <p className="section-subtitle">Useful utilities and automation tools</p>
            </div>

            <div className="animate-fade-in">
                <div className="terminal-container" style={{ marginBottom: '2rem' }}>
                    <div className="terminal-header">
                        <span className="terminal-prompt">C:\TOOLS&gt;</span>
                        <span className="text-muted">list --all</span>
                    </div>
                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                        {tools.length} tool(s) found.
                    </p>
                </div>

                <div
                    ref={gridRef}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {tools.map((tool) => (
                        <ProjectCard
                            key={tool.id}
                            project={tool}
                            href={`/tools/${tool.slug}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
