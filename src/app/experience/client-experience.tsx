'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import RetroWindow from '@/components/RetroWindow';
import { experiences } from '@/data/experiences';

export default function ExperiencePage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      // Animate grid items
      anime({
        targets: gridRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100, { start: 200 }),
        duration: 600,
        easing: 'easeOutCubic',
      });
    }
  }, []);

  return (
    <div className="section" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div className="section-header">
        <h1 className="section-title">&gt; EXPERIENCE.EXE</h1>
        <p className="section-subtitle">Execution Log & Career History</p>
      </div>

      <div className="terminal-container" style={{ marginBottom: '3rem' }}>
        <div className="terminal-header">
          <span className="terminal-prompt">C:\LOGS&gt;</span>
          <span className="text-muted">cat work_history.log --grid-view</span>
        </div>
      </div>

      <div ref={gridRef} className="experience-grid">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="experience-card" style={{ opacity: 0 }}>
            <RetroWindow title={`LOG_/${String(experiences.length - index).padStart(2, '0')}`} style={{ height: '100%' }}>
              <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <div style={{ flex: 1, paddingRight: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.2rem', lineHeight: 1.2 }}>
                      {exp.role}
                    </h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--accent-secondary)' }}>
                      @{exp.company}
                    </span>
                  </div>
                  <div style={{
                    background: 'rgba(0, 255, 65, 0.1)',
                    border: '1px solid var(--accent-primary)',
                    color: 'var(--accent-primary)',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-terminal)',
                    whiteSpace: 'nowrap',
                    borderRadius: '2px'
                  }}>
                    {exp.duration}
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {exp.description}
                </p>

                <div style={{ marginTop: 'auto' }}>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    System Activities:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        gap: '0.75rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4
                      }}>
                        <span style={{ color: 'var(--accent-primary)', minWidth: '10px' }}>&gt;</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RetroWindow>
          </div>
        ))}
      </div>
    </div>
  );
}


