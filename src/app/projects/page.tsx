'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import ProjectCard from '@/components/ProjectCard';
import ProjectDetailView from '@/components/ProjectDetailView';
import { projects, tools, Project } from '@/data/projects';

type ViewMode = 'all-projects' | 'all-tools' | 'project-detail';

export default function ProjectsPage() {
    const [viewMode, setViewMode] = useState<ViewMode>('all-projects');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [expandedMenu, setExpandedMenu] = useState<{ projects: boolean, tools: boolean }>({ projects: true, tools: true });

    // Animation refs
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animate grid items when view satisfies grid condition
        if ((viewMode === 'all-projects' || viewMode === 'all-tools') && gridRef.current) {
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
    }, [viewMode]);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setViewMode('project-detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCategoryClick = (mode: 'all-projects' | 'all-tools') => {
        setViewMode(mode);
        setSelectedProject(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            <div className="section-header" style={{ marginBottom: '2rem' }}>
                <h1 className="section-title">&gt; PROJECTS.EXE</h1>
                <p className="section-subtitle">Project Directory</p>
            </div>

            <div className="layout-container" style={{ display: 'flex', gap: '2rem', flex: 1, alignItems: 'flex-start', flexDirection: 'column' }}>
                <style jsx>{`
                    @media (min-width: 1024px) {
                        .layout-container {
                            flex-direction: row !important;
                        }
                        .sidebar {
                            width: 300px;
                            position: sticky;
                            top: 100px;
                            flex-shrink: 0;
                            height: fit-content;
                            max-height: 80vh;
                            overflow-y: auto;
                        }
                        /* Custom scrollbar for sidebar */
                        .sidebar::-webkit-scrollbar {
                            width: 6px;
                        }
                    }
                    @media (max-width: 1023px) {
                        .sidebar {
                            width: 100%;
                            margin-bottom: 2rem;
                        }
                    }
                `}</style>

                {/* SIDEBAR NAVIGATION */}
                <aside className="sidebar retro-window" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid var(--border-color)',
                        background: 'rgba(0, 255, 204, 0.02)'
                    }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-terminal)' }}>EXPLORER</div>
                    </div>

                    <nav style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* PROJECTS GROUP */}
                        <div>
                            <div
                                onClick={() => handleCategoryClick('all-projects')}
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.75rem',
                                    fontWeight: 600,
                                    color: viewMode === 'all-projects' ? 'var(--accent-primary)' : 'var(--text-primary)',
                                    transition: 'color 0.2s'
                                }}
                            >
                                <span style={{ fontSize: '0.8rem', transform: expandedMenu.projects ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▶</span>
                                <span>PROJECTS</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>{projects.length}</span>
                            </div>

                            {expandedMenu.projects && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '1.25rem', borderLeft: '1px solid var(--border-color)', marginLeft: '0.4rem' }}>
                                    {projects.map(p => (
                                        <div
                                            key={p.id}
                                            onClick={() => handleProjectClick(p)}
                                            style={{
                                                padding: '0.4rem 0.5rem',
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                color: selectedProject?.id === p.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                                background: selectedProject?.id === p.id ? 'rgba(0, 255, 204, 0.05)' : 'transparent',
                                                borderRadius: '4px',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                            className="hover:text-accent"
                                        >
                                            <span style={{ fontSize: '1rem' }}>{p.icon}</span>
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* TOOLS GROUP */}
                        <div>
                            <div
                                onClick={() => handleCategoryClick('all-tools')}
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.75rem',
                                    fontWeight: 600,
                                    color: viewMode === 'all-tools' ? 'var(--accent-primary)' : 'var(--text-primary)',
                                    transition: 'color 0.2s'
                                }}
                            >
                                <span style={{ fontSize: '0.8rem', transform: expandedMenu.tools ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▶</span>
                                <span>TOOLS</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>{tools.length}</span>
                            </div>

                            {expandedMenu.tools && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '1.25rem', borderLeft: '1px solid var(--border-color)', marginLeft: '0.4rem' }}>
                                    {tools.map(t => (
                                        <div
                                            key={t.id}
                                            onClick={() => handleProjectClick(t)}
                                            style={{
                                                padding: '0.4rem 0.5rem',
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                color: selectedProject?.id === t.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                                background: selectedProject?.id === t.id ? 'rgba(0, 255, 204, 0.05)' : 'transparent',
                                                borderRadius: '4px',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                            className="hover:text-accent"
                                        >
                                            <span style={{ fontSize: '1rem' }}>{t.icon}</span>
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </nav>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main style={{ flex: 1, width: '100%', minWidth: 0 }}> {/* minWidth 0 prevents flex child from overflowing */}

                    {/* VIEW: PROJECT GRID */}
                    {viewMode === 'all-projects' && (
                        <div className="animate-fade-in">
                            <div className="terminal-container" style={{ marginBottom: '2rem' }}>
                                <div className="terminal-header">
                                    <span className="terminal-prompt">C:\PROJECTS&gt;</span>
                                    <span className="text-muted">dir /v /sort:date</span>
                                </div>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                                    {projects.length} project(s) found. Select a project to view details.
                                </p>
                            </div>

                            <div
                                ref={gridRef}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                    gap: '1.5rem',
                                    marginBottom: '4rem'
                                }}
                            >
                                {projects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        onClick={() => handleProjectClick(project)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* VIEW: TOOLS GRID */}
                    {viewMode === 'all-tools' && (
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
                                        onClick={() => handleProjectClick(tool)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* VIEW: DETAIL */}
                    {viewMode === 'project-detail' && selectedProject && (
                        <ProjectDetailView
                            project={selectedProject}
                            onBack={() => {
                                const isTool = tools.some(t => t.id === selectedProject.id);
                                setViewMode(isTool ? 'all-tools' : 'all-projects');
                                setSelectedProject(null);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        />
                    )}

                </main>
            </div>
        </div>
    );
}
