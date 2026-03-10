'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import ProjectCard from '@/components/ProjectCard';
import { tools } from '@/data/projects';
import Link from 'next/link';

export default function ToolsPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const sourceAvailableCount = tools.filter((tool) => tool.github).length;
  const releaseReadyCount = tools.filter((tool) => tool.demo).length;

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
    <div className="catalog-page">
      <div className="animate-fade-in">
        <section className="retro-window catalog-hero">
          <div className="retro-window-content">
            <div className="catalog-hero-grid">
              <div className="catalog-hero-copy">
                <span className="catalog-eyebrow">Utility Directory</span>
                <div className="section-header" style={{ marginBottom: 0 }}>
                  <Link href="/projects" className="project-back-btn project-back-btn--visible catalog-back-link">
                    ← Back to Projects
                  </Link>
                  <h1 className="section-title">&gt; TOOLS.EXE</h1>
                  <p className="section-subtitle">Useful utilities and automation tools with the same portfolio catalog layout</p>
                </div>
                <p className="catalog-hero-text">
                  A focused library of practical tools, from browser-first utilities to downloadable automation helpers.
                </p>
              </div>

              <div className="catalog-stat-grid">
                <div className="catalog-stat-card">
                  <span className="catalog-stat-value">{tools.length}</span>
                  <span className="catalog-stat-label">Total Tools</span>
                </div>
                <div className="catalog-stat-card">
                  <span className="catalog-stat-value">{sourceAvailableCount}</span>
                  <span className="catalog-stat-label">Source Available</span>
                </div>
                <div className="catalog-stat-card">
                  <span className="catalog-stat-value">{releaseReadyCount}</span>
                  <span className="catalog-stat-label">Live Or Downloadable</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="terminal-container catalog-terminal">
          <div className="terminal-header">
            <span className="terminal-prompt">C:\TOOLS&gt;</span>
            <span className="text-muted">list --all --detailed</span>
          </div>
          <p className="catalog-terminal-text">
            {tools.length} tool(s) ready to explore. Open a card for the full feature set, stack, and release links.
          </p>
        </div>

        <div ref={gridRef} className="catalog-card-grid">
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


