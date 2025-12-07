'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import TerminalText from '@/components/TerminalText';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import RetroWindow from '@/components/RetroWindow';
import RetroButton from '@/components/RetroButton';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { bio, skills, education, achievements, socials } from '@/data/socials';
import { experiences } from '@/data/experiences';
import { projects as projectsData } from '@/data/projects';

const menuItems = [
  { href: '/experience', icon: '📁', label: 'EXPERIENCE', color: 'var(--accent-amber)' },
  { href: '/projects', icon: '💾', label: 'PROJECTS', color: 'var(--accent-cyan)' },
  { href: '/research', icon: '📑', label: 'RESEARCH', color: 'var(--accent-green)' },
  { href: '/contact', icon: '✉️', label: 'CONTACT', color: 'var(--accent-blue)' },
];

export default function HomePage() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [amberMode, setAmberMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Konami code easter egg
  useKonamiCode(() => {
    setAmberMode(prev => !prev);
    document.body.classList.toggle('amber-mode');
  });

  useEffect(() => {
    // Prevent scrolling during boot
    document.body.style.overflow = 'hidden';

    // Faster boot sequence
    const timer = setTimeout(() => {
      setBootComplete(true);
      setTimeout(() => {
        setShowContent(true);
        // Re-enable scrolling after boot
        document.body.style.overflow = 'auto';
      }, 300);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showContent && containerRef.current) {
      const windows = containerRef.current.querySelectorAll('.retro-window');
      anime({
        targets: windows,
        opacity: [0, 1],
        scale: [0.95, 1],
        delay: anime.stagger(100),
        duration: 500,
        easing: 'easeOutBack',
      });
    }
  }, [showContent]);

  return (
    <div className="section-wide" style={{ minHeight: '100vh', paddingTop: '2rem' }}>

      {/* Header Status Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        borderBottom: '2px solid var(--border-color)',
        paddingBottom: '1rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0, lineHeight: 1 }}>{bio.name}</h1>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>{bio.title}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'var(--accent-green)',
            boxShadow: '0 0 5px var(--accent-green)'
          }} />
          <span className="text-green" style={{ fontSize: '0.875rem', fontFamily: 'var(--font-terminal)' }}>SYSTEM ONLINE</span>
        </div>
      </div>

      {!bootComplete ? (
        <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TerminalText text="INITIALIZING COMMAND CENTER..." speed={30} />
        </div>
      ) : (
        <div ref={containerRef} className="home-dashboard-grid" style={{
          opacity: showContent ? 1 : 0
        }}>

          {/* COLUMN 1: IDENTITY & LOGS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <RetroWindow title="USER_PROFILE">
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--bg-section)',
                  border: '2px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  👨‍💻
                </div>
                <div>
                  <div className="text-accent" style={{ fontWeight: 600, fontSize: '1.2rem' }}>{bio.location}</div>
                  <div className="text-muted" style={{ fontSize: '1rem' }}>ID: SRW-2025</div>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                    {socials.map(s => (
                      <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                        style={{ textDecoration: 'none', fontSize: '1.2rem' }} title={s.name}>
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {bio.short}
              </p>
            </RetroWindow>

            <RetroWindow title="LATEST_LOG">
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                  <span className="text-muted" style={{ fontSize: '0.75rem', display: 'block' }}>CURRENT ROLE</span>
                  {experiences[0].role} @ {experiences[0].company}
                </li>
                <li>
                  <span className="text-muted" style={{ fontSize: '0.75rem', display: 'block' }}>LATEST ACHIEVEMENT</span>
                  {achievements[4]}
                </li>
              </ul>
            </RetroWindow>
          </div>

          {/* COLUMN 2: COMMAND CENTER (TERMINAL) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <InteractiveTerminal />

            <RetroWindow title="LATEST_PROJECTS">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {projectsData.slice(0, 2).map((project) => (
                  <Link key={project.id} href={`/projects`} style={{ textDecoration: 'none' }}>
                    <div className="retro-btn" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      padding: '1rem',
                      height: '100%',
                      textAlign: 'left',
                      textTransform: 'none',
                      letterSpacing: 'normal',
                      border: '1px solid var(--border-color)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>{project.icon}</span>
                        <span style={{
                          color: 'var(--accent-primary)',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {project.name}
                        </span>
                      </div>
                      <p className="text-muted" style={{
                        fontSize: '0.8rem',
                        margin: 0,
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {project.description}
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} style={{
                            fontSize: '0.7rem',
                            color: 'var(--text-secondary)',
                            background: 'var(--bg-section)',
                            padding: '2px 6px',
                            border: '1px solid var(--border-color)'
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </RetroWindow>
          </div>

          {/* COLUMN 3: NAVIGATION & STATS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <RetroWindow title="MAIN_MENU">
              <div style={{ display: 'grid', gap: '1rem' }}>
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                    <div className="retro-btn dos-flicker" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      height: '100%',
                      borderColor: item.color,
                      color: item.color
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </RetroWindow>

            <RetroWindow title="MEMORY_BANK">
              <div style={{ fontSize: '0.9rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="text-amber">EDUCATION</span>
                </div>
                {education.slice(0, 1).map((edu, i) => (
                  <div key={i}>
                    <div style={{ fontWeight: 600 }}>{edu.degree}</div>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>{edu.institution}</div>
                    <div className="text-accent" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>{edu.details}</div>
                  </div>
                ))}
              </div>
            </RetroWindow>
          </div>

        </div>
      )}
    </div>
  );
}
