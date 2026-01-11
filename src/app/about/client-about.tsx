'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import RetroWindow from '@/components/RetroWindow';
import RetroButton from '@/components/RetroButton';
import { bio, skills, education, achievements, socials } from '@/data/socials';
import { experiences } from '@/data/experiences';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Animate sections on entry
      anime({
        targets: containerRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100, { start: 200 }),
        duration: 600,
        easing: 'easeOutCubic',
      });
    }
  }, []);

  return (
    <div className="section" ref={containerRef} style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div className="section-header">
        <h1 className="section-title">&gt; ABOUT.EXE</h1>
        <p className="section-subtitle">System Information & Status</p>
      </div>

      {/* 1. Top Section: Profile & Bio */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <RetroWindow title="USER_PROFILE">
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            {/* ASCII Art Avatar */}
            <pre style={{
              fontFamily: 'var(--font-terminal)',
              color: 'var(--accent-primary)',
              fontSize: '0.6rem',
              lineHeight: 1,
              marginBottom: '1rem',
              overflow: 'hidden',
              textAlign: 'center'
            }}>
              {`
      .::::.
    .::::::::.
   :::::::::::
  ..::::::::::..
  '::::::::::::'
    '::::::::'
      '::::'
`}
            </pre>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{bio.name}</h2>
            <p className="text-accent" style={{ fontSize: '0.875rem' }}>{bio.title}</p>
            <p className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '1.5rem' }}>📍 {bio.location}</p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {socials.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" title={link.name}>
                  <RetroButton style={{ padding: '0.5rem', minWidth: 'auto' }}>
                    <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                  </RetroButton>
                </a>
              ))}
            </div>
          </div>
        </RetroWindow>

        <RetroWindow title="SYSTEM_BIO">
          <div className="terminal-container" style={{ height: '100%', border: 'none', background: 'transparent', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
            <ul style={{ listStyle: 'none', padding: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Make sure bio.points exists in your data file, otherwise fallback to splitting bio.long if needed, 
                                but we implemented points in the data step successfully. */}
              {bio.points && bio.points.map((point, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  gap: '1rem',
                  fontSize: '1.15rem', // Increased font size as requested
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  alignItems: 'flex-start'
                }}>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', marginTop: '0.2rem' }}>&gt;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </RetroWindow>
      </div>

      {/* 2. Middle Section: Experience (Left) & Skills (Right) */}
      <div className="about-grid-middle" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Left Column: Experience */}
        <div style={{ gridColumn: 'span 2' }}>
          <h3 className="text-accent" style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>// EXECUTION_LOG (Experience)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {experiences.map((exp) => (
              <div key={exp.id} style={{
                borderLeft: '2px solid var(--border-color)',
                paddingLeft: '1.5rem',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-5px',
                  top: '0',
                  width: '8px',
                  height: '8px',
                  background: 'var(--accent-primary)',
                  boxShadow: '0 0 5px var(--accent-primary)'
                }} />
                <span className="text-accent" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-terminal)' }}>{exp.duration}</span>
                <h4 style={{ fontSize: '1.1rem', margin: '0.25rem 0' }}>{exp.role}</h4>
                <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>{exp.company}</p>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Skills */}
        <div style={{ gridColumn: 'span 1' }}>
          <h3 className="text-accent" style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>// INSTALLED_MODULES</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {Object.entries(skills).map(([category, items]) => (
              <RetroWindow key={category} title={`MOD:${category.toUpperCase()}`} style={{ height: 'auto' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {items.map(skill => (
                    <span key={skill} style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      background: 'var(--bg-section)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                      borderRadius: '2px'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </RetroWindow>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: Education & Achievements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Education */}
        <div>
          <h3 className="text-accent" style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>// SYSTEM_SPECS (Education)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {education.map((edu, idx) => (
              <RetroWindow key={idx} title="EDU_NODE">
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{edu.degree}</h4>
                <p className="text-muted" style={{ fontSize: '0.8rem' }}>{edu.institution}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--accent-secondary)' }}>
                  <span>{edu.year}</span>
                  <span>{edu.details}</span>
                </div>
              </RetroWindow>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-accent" style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>// TROPHIES (Achievements)</h3>
          <RetroWindow title="ACHIEVEMENTS_LOG">
            <ul className="skills-list" style={{ listStyle: 'none', padding: 0 }}>
              {achievements.map((item, idx) => (
                <li key={idx} className="skill-item" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  {item}
                </li>
              ))}
            </ul>
          </RetroWindow>
        </div>
      </div>
    </div>
  );
}


