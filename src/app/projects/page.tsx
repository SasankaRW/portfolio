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
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState<{ projects: boolean, tools: boolean }>({ projects: true, tools: true });

    // Animation refs
    const gridRef = useRef<HTMLDivElement>(null);

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            // Collapse menus on mobile by default, expand on desktop
            if (mobile && expandedMenu.projects && expandedMenu.tools) {
                setExpandedMenu({ projects: false, tools: false });
            } else if (!mobile && !expandedMenu.projects && !expandedMenu.tools) {
                setExpandedMenu({ projects: true, tools: true });
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []); // Only run on mount

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
        setIsSidebarOpen(false); // Close sidebar on mobile
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCategoryClick = (mode: 'all-projects' | 'all-tools') => {
        setViewMode(mode);
        setSelectedProject(null);
        setIsSidebarOpen(false); // Close sidebar on mobile
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleProjectsMenu = () => {
        setExpandedMenu(prev => ({ ...prev, projects: !prev.projects }));
    };

    const toggleToolsMenu = () => {
        setExpandedMenu(prev => ({ ...prev, tools: !prev.tools }));
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
                        .sidebar-nav {
                            padding: 1rem;
                            gap: 1.5rem;
                        }
                        .category-header {
                            margin-bottom: 0.75rem;
                        }
                        .project-list-item {
                            padding: 0.4rem 0.5rem;
                            font-size: 0.9rem;
                        }
                        .hamburger-button {
                            display: none;
                        }
                        .sidebar-overlay {
                            display: none;
                        }
                    }
                    @media (max-width: 1023px) {
                        .sidebar {
                            position: fixed;
                            top: 0;
                            left: ${isSidebarOpen ? '0' : '-100%'};
                            width: 280px;
                            height: 100vh;
                            z-index: 1001;
                            transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                            overflow-y: auto;
                            box-shadow: ${isSidebarOpen ? '2px 0 20px rgba(0, 0, 0, 0.5)' : 'none'};
                        }
                        .sidebar-nav {
                            padding: 0.75rem;
                            gap: 1rem;
                        }
                        .category-header {
                            margin-bottom: 0.5rem;
                            padding: 0.75rem;
                            background: rgba(0, 255, 204, 0.03);
                            border-radius: 4px;
                        }
                        .project-list {
                            padding-left: 0.75rem;
                            margin-left: 0.2rem;
                        }
                        .project-list-item {
                            padding: 0.6rem 0.75rem;
                            font-size: 1rem;
                            min-height: 44px;
                        }
                        .hamburger-button {
                            display: flex;
                            position: fixed;
                            top: 90px;
                            left: 1rem;
                            z-index: 999;
                            background: var(--bg-card);
                            border: 1px solid var(--border-color);
                            color: var(--accent-primary);
                            padding: 0.75rem;
                            cursor: pointer;
                            transition: all 0.2s;
                            align-items: center;
                            gap: 0.5rem;
                            font-family: var(--font-main);
                            font-size: 0.875rem;
                            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                        }
                        .hamburger-button:hover {
                            background: rgba(0, 255, 204, 0.1);
                            box-shadow: 0 0 15px rgba(0, 255, 204, 0.2);
                        }
                        .sidebar-overlay {
                            display: ${isSidebarOpen ? 'block' : 'none'};
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: rgba(0, 0, 0, 0.6);
                            z-index: 1000;
                            backdrop-filter: blur(2px);
                            animation: fadeIn 0.3s ease;
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        .sidebar-close-btn:hover {
                            color: var(--accent-primary);
                            border-color: var(--accent-primary);
                        }
                    }
                    @media (max-width: 640px) {
                        .sidebar {
                            width: 260px;
                        }
                        .sidebar-header {
                            padding: 0.75rem !important;
                            font-size: 0.85rem !important;
                        }
                        .sidebar-nav {
                            padding: 0.5rem;
                        }
                        .category-header {
                            font-size: 0.95rem;
                        }
                        .project-list-item {
                            font-size: 0.95rem;
                        }
                        .hamburger-button {
                            top: 85px;
                            left: 0.75rem;
                            padding: 0.65rem;
                        }
                    }
                `}</style>

                {/* HAMBURGER MENU BUTTON (Mobile Only) */}
                <button
                    className="hamburger-button"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <span style={{ fontSize: '1.25rem' }}>{isSidebarOpen ? '✕' : '☰'}</span>
                    <span>{isSidebarOpen ? 'CLOSE' : 'MENU'}</span>
                </button>

                {/* OVERLAY (Mobile Only) */}
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                />

                {/* SIDEBAR NAVIGATION */}
                <aside className="sidebar retro-window" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
                    <div className="sidebar-header" style={{
                        padding: '1rem',
                        borderBottom: '1px solid var(--border-color)',
                        background: 'rgba(0, 255, 204, 0.02)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-terminal)' }}>EXPLORER</div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            style={{
                                display: isMobile ? 'flex' : 'none',
                                background: 'transparent',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-muted)',
                                padding: '0.25rem 0.5rem',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'all 0.2s'
                            }}
                            className="sidebar-close-btn"
                            aria-label="Close sidebar"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="sidebar-nav" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* PROJECTS GROUP */}
                        <div>
                            <div
                                className="category-header"
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.75rem',
                                    fontWeight: 600,
                                    transition: 'color 0.2s'
                                }}
                            >
                                <span
                                    onClick={toggleProjectsMenu}
                                    style={{ fontSize: '0.8rem', transform: expandedMenu.projects ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', padding: '0.25rem' }}
                                >▶</span>
                                <span
                                    onClick={() => handleCategoryClick('all-projects')}
                                    style={{
                                        flex: 1,
                                        color: viewMode === 'all-projects' ? 'var(--accent-primary)' : 'var(--text-primary)',
                                    }}
                                >PROJECTS</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>{projects.length}</span>
                            </div>

                            {expandedMenu.projects && (
                                <div className="project-list" style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '1.25rem', borderLeft: '1px solid var(--border-color)', marginLeft: '0.4rem' }}>
                                    {projects.map(p => (
                                        <div
                                            key={p.id}
                                            onClick={() => handleProjectClick(p)}
                                            className="project-list-item hover:text-accent"
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
                                className="category-header"
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.75rem',
                                    fontWeight: 600,
                                    transition: 'color 0.2s'
                                }}
                            >
                                <span
                                    onClick={toggleToolsMenu}
                                    style={{ fontSize: '0.8rem', transform: expandedMenu.tools ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', padding: '0.25rem' }}
                                >▶</span>
                                <span
                                    onClick={() => handleCategoryClick('all-tools')}
                                    style={{
                                        flex: 1,
                                        color: viewMode === 'all-tools' ? 'var(--accent-primary)' : 'var(--text-primary)',
                                    }}
                                >TOOLS</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>{tools.length}</span>
                            </div>

                            {expandedMenu.tools && (
                                <div className="project-list" style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '1.25rem', borderLeft: '1px solid var(--border-color)', marginLeft: '0.4rem' }}>
                                    {tools.map(t => (
                                        <div
                                            key={t.id}
                                            onClick={() => handleProjectClick(t)}
                                            className="project-list-item hover:text-accent"
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
