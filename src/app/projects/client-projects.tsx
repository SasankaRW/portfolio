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

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <h1 className="section-title">&gt; PROJECTS.EXE</h1>
        <p className="section-subtitle">Project Directory</p>
      </div>

      <div className="layout-container" style={{ display: 'flex', gap: '2rem', flex: 1, alignItems: 'flex-start', flexDirection: 'column' }}>
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
    </div >
  );
}


