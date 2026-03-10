'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import ProjectCard from '@/components/ProjectCard';
import ProjectDetailView from '@/components/ProjectDetailView';
import { projects, Project } from '@/data/projects';

const clientSites = projects.filter((p) => p.demo);

type ViewMode = 'all-projects' | 'client-sites' | 'project-detail';
type CollectionViewKey = Exclude<ViewMode, 'project-detail'>;

interface CollectionView {
  id: CollectionViewKey;
  label: string;
  title: string;
  subtitle: string;
  prompt: string;
  command: string;
  helper: string;
  items: Project[];
}

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('all-projects');
  const [previousViewMode, setPreviousViewMode] = useState<ViewMode>('all-projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const collectionViews: Record<CollectionViewKey, CollectionView> = {
    'all-projects': {
      id: 'all-projects',
      label: 'All Projects',
      title: '> PROJECTS.EXE',
      subtitle: 'Selected builds across apps, systems, and client work',
      prompt: 'C:\\PROJECTS>',
      command: 'dir /v /sort:date',
      helper: 'Browse the full archive of shipped products, experiments, and production systems in one place.',
      items: projects,
    },
    'client-sites': {
      id: 'client-sites',
      label: 'Client Sites',
      title: '> CLIENT_SITES.EXE',
      subtitle: 'Live websites built for businesses and real-world launches',
      prompt: 'C:\\PROJECTS\\CLIENT_SITES>',
      command: 'dir /v /filter:live',
      helper: 'A focused view of public-facing websites with live demos and polished delivery work.',
      items: clientSites,
    },
  };
  const activeCollectionKey = (viewMode === 'project-detail' ? previousViewMode : viewMode) as CollectionViewKey;
  const activeCollection = collectionViews[activeCollectionKey];

  useEffect(() => {
    // Animate grid items when view satisfies grid condition
    if (viewMode !== 'project-detail' && gridRef.current) {
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

  const handleProjectClick = (project: Project, fromView: ViewMode) => {
    setSelectedProject(project);
    setPreviousViewMode(fromView);
    setViewMode('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="catalog-page">
      {viewMode !== 'project-detail' ? (
        <div className="animate-fade-in">
          <section className="retro-window catalog-hero">
            <div className="retro-window-content">
              <div className="catalog-hero-grid">
                <div className="catalog-hero-copy">
                  <span className="catalog-eyebrow">Portfolio Directory</span>
                  <div className="section-header" style={{ marginBottom: 0 }}>
                    <h1 className="section-title">{activeCollection.title}</h1>
                    <p className="section-subtitle">{activeCollection.subtitle}</p>
                  </div>
                  <p className="catalog-hero-text">{activeCollection.helper}</p>
                  <div className="catalog-actions">
                    {Object.values(collectionViews).map((collection) => (
                      <button
                        key={collection.id}
                        type="button"
                        className={`retro-btn ${activeCollectionKey === collection.id ? 'retro-btn-primary' : ''}`}
                        onClick={() => setViewMode(collection.id)}
                      >
                        {collection.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="catalog-stat-grid">
                  <div className="catalog-stat-card">
                    <span className="catalog-stat-value">{projects.length}</span>
                    <span className="catalog-stat-label">Projects</span>
                  </div>
                  <div className="catalog-stat-card">
                    <span className="catalog-stat-value">{clientSites.length}</span>
                    <span className="catalog-stat-label">Client Sites</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="terminal-container catalog-terminal">
            <div className="terminal-header">
              <span className="terminal-prompt">{activeCollection.prompt}</span>
              <span className="text-muted">{activeCollection.command}</span>
            </div>
            <p className="catalog-terminal-text">
              {activeCollection.items.length} item(s) found. Select any card to inspect the full build story.
            </p>
          </div>

          <div ref={gridRef} className="catalog-card-grid">
            {activeCollection.items.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project, activeCollection.id)}
              />
            ))}
          </div>
        </div>
      ) : selectedProject ? (
        <ProjectDetailView
          project={selectedProject}
          onBack={() => {
            setViewMode(previousViewMode);
            setSelectedProject(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : null
      }
    </div>
  );
}


