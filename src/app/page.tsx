'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import TerminalText from '@/components/TerminalText';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import RetroWindow from '@/components/RetroWindow';
import RetroButton from '@/components/RetroButton';
import BootSequence from '@/components/BootSequence';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { bio, skills, education, achievements, socials } from '@/data/socials';
import { experiences } from '@/data/experiences';
import { projects as projectsData } from '@/data/projects';

const menuItems = [
  { href: '/experience', icon: '📁', label: 'EXPERIENCE', color: 'var(--accent-amber)' },
  { href: '/projects', icon: '💾', label: 'PROJECTS', color: 'var(--accent-cyan)' },
  { href: '/tools', icon: '🛠️', label: 'TOOLS', color: 'var(--accent-pink)' },
  { href: '/research', icon: '📑', label: 'RESEARCH', color: 'var(--accent-green)' },
  { href: '/contact', icon: '✉️', label: 'CONTACT', color: 'var(--accent-blue)' },
];

export default function HomePage() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [amberMode, setAmberMode] = useState(false);
  const [logIndex, setLogIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Konami code easter egg
  useKonamiCode(() => {
    setAmberMode(prev => !prev);
    document.body.classList.toggle('amber-mode');
  });

  // Check if boot sequence has already run in this session
  useEffect(() => {
    const hasBooted = sessionStorage.getItem('sas_grid_booted');
    if (hasBooted) {
      setBootComplete(true);
      setShowContent(true);
    }
  }, []);

  useEffect(() => {
    // Prevent scrolling during boot
    if (!bootComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [bootComplete]);

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

  // Content Rotation - Each section rotates separately
  useEffect(() => {
    if (!showContent) return;

    // Activity Log rotates every 8 seconds
    const logIntervalId = setInterval(() => {
      setLogIndex(prev => (prev + 1) % experiences.length);
    }, 8000);

    // Memory Bank rotates every 10 seconds
    const memoryIntervalId = setInterval(() => {
      setMemoryIndex(prev => (prev + 1) % education.length);
    }, 10000);

    // Projects rotate every 12 seconds
    const projectIntervalId = setInterval(() => {
      setProjectIndex(prev => (prev + 1) % projectsData.length);
    }, 12000);

    return () => {
      clearInterval(logIntervalId);
      clearInterval(memoryIntervalId);
      clearInterval(projectIntervalId);
    };
  }, [showContent]);

  // Circular project buffer for seamless 2-item display
  const displayProjects = [...projectsData, ...projectsData].slice(projectIndex, projectIndex + 2);

  return (
    <div className="section-wide" style={{ minHeight: '100vh', paddingTop: '1rem', paddingBottom: '1rem' }}>

      {/* Header Status Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        borderBottom: '2px solid var(--border-color)',
        paddingBottom: '0.5rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0, lineHeight: 1 }}>{bio.name}</h1>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
            {bio.title}
            <span className="terminal-cursor" style={{ height: '0.8em', width: '0.4em', verticalAlign: 'baseline', opacity: 0.7 }}></span>
          </p>
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
        <div style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, background: 'var(--bg-main)', zIndex: 9999 }}>
          <BootSequence onComplete={() => {
            setBootComplete(true);
            setTimeout(() => setShowContent(true), 100);
            sessionStorage.setItem('sas_grid_booted', 'true');
          }} />
        </div>
      ) : (
        <div ref={containerRef} className="home-dashboard-grid" style={{
          opacity: showContent ? 1 : 0
        }}>

          {/* COLUMN 1: IDENTITY & LOGS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <RetroWindow title="USER_PROFILE">
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
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
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
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
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <a
                  href="/Sasanka_Ravindu_SE_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn retro-btn-primary"
                  style={{ flex: 1, textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <span style={{ fontSize: '1.2rem' }}>💾</span> DOWNLOAD RESUME
                </a>

              </div>
            </RetroWindow>

            <RetroWindow title="ACTIVITY_LOG">
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                  <span className="text-muted" style={{ fontSize: '0.75rem', display: 'block' }}>EXPERIENCE_LOG_{logIndex + 1}</span>
                  <div className="animate-fade-in" key={logIndex} style={{ minHeight: '3em' }}>
                    {experiences[logIndex].role} @ {experiences[logIndex].company}
                  </div>
                </li>
                <li>
                  <span className="text-muted" style={{ fontSize: '0.75rem', display: 'block' }}>ACHIEVEMENT_LOG_{logIndex + 1}</span>
                  <div className="animate-fade-in" key={`ach-${logIndex}`} style={{ minHeight: '3em' }}>
                    {achievements[logIndex % achievements.length]}
                  </div>
                </li>
              </ul>
            </RetroWindow>
          </div>

          {/* COLUMN 2: COMMAND CENTER (TERMINAL) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <InteractiveTerminal />

            <RetroWindow title="PROJECT_FEED" className="project-feed">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {displayProjects.map((project, idx) => (
                  <Link key={`${project.id}-${idx}`} href={`/projects`} style={{ textDecoration: 'none' }}>
                    <div className="retro-btn animate-fade-in" style={{
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <RetroWindow title="MAIN_MENU">
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                    <div className="retro-btn dos-flicker" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
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
                  <span className="text-amber">EDUCATION_AND_STATS</span>
                </div>
                <div className="animate-fade-in" key={memoryIndex} style={{ minHeight: '10em', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontWeight: 600 }}>{education[memoryIndex].degree}</div>
                  <div className="text-muted" style={{ fontSize: '0.8rem' }}>{education[memoryIndex].institution}</div>
                  <div className="text-accent" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>{education[memoryIndex].details}</div>
                </div>
              </div>
            </RetroWindow>

          </div>

        </div>
      )}
    </div>
  );
}
