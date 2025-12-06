'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import RetroWindow from '@/components/RetroWindow';
import { bio, skills } from '@/data/socials';
import { experiences } from '@/data/experiences';

export default function AboutPage() {
    const skillsRef = useRef<HTMLDivElement>(null);

    // Flatten and dedup skills for display
    const allSkills = Array.from(new Set(Object.values(skills).flat()));

    useEffect(() => {
        if (skillsRef.current) {
            const items = skillsRef.current.querySelectorAll('.skill-item');
            anime({
                targets: items,
                opacity: [0, 1],
                translateX: [-20, 0],
                delay: anime.stagger(50, { start: 300 }),
                duration: 400,
                easing: 'easeOutCubic',
            });
        }
    }, []);

    return (
        <div className="section">
            <div className="section-header">
                <h1 className="section-title">&gt; ABOUT.EXE</h1>
                <p className="section-subtitle">System Information</p>
            </div>

            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {/* Bio Window */}
                <RetroWindow title="USER PROFILE">
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        {/* ASCII Art Avatar */}
                        <pre style={{
                            fontFamily: 'var(--font-terminal)',
                            color: 'var(--accent-primary)',
                            fontSize: '0.5rem',
                            lineHeight: 1.2,
                            marginBottom: '1rem'
                        }}>
                            {`
    ████████████████    
  ██              ██  
  ██  ██      ██  ██  
  ██              ██  
  ██    ██████    ██  
  ██              ██  
    ████████████████    
`}
                        </pre>
                        <h2 style={{ marginBottom: '0.5rem' }}>{bio.name}</h2>
                        <p className="text-accent">{bio.title}</p>
                        <p className="text-muted">{bio.location}</p>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        {bio.long}
                    </p>
                </RetroWindow>

                {/* Skills Window */}
                <RetroWindow title="INSTALLED SKILLS">
                    <div className="terminal-container" style={{ border: 'none', padding: 0 }}>
                        <div className="terminal-header">
                            <span className="terminal-prompt">C:\SKILLS&gt;</span>
                            <span className="text-muted">dir /b</span>
                        </div>
                        <div ref={skillsRef} className="skills-list">
                            {allSkills.map((skill) => (
                                <div key={skill} className="skill-item" style={{ opacity: 0 }}>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </RetroWindow>
            </div>

            {/* Timeline */}
            <div style={{ marginTop: '3rem' }}>
                <RetroWindow title="CAREER TIMELINE">
                    <div className="timeline">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="timeline-item">
                                <h4 className="text-accent">{exp.duration}</h4>
                                <p style={{ fontWeight: 600 }}>{exp.role}</p>
                                <p className="text-muted">{exp.company}</p>
                            </div>
                        ))}
                    </div>
                </RetroWindow>
            </div>
        </div>
    );
}
