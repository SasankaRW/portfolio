'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import RetroWindow from '@/components/RetroWindow';
import { bio, skills, education, achievements, socials } from '@/data/socials';
import { experiences } from '@/data/experiences';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillCategories = Object.entries(skills);

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
    <div className="about-page" ref={containerRef}>
      <section className="retro-window about-hero">
        <div className="retro-window-content">
          <div className="about-hero-grid">
            <div className="about-hero-copy">
              <span className="catalog-eyebrow">System Profile</span>
              <div className="section-header" style={{ marginBottom: 0 }}>
                <h1 className="section-title">&gt; ABOUT.EXE</h1>
                <p className="section-subtitle">Background, strengths, and the way I build software</p>
              </div>

              <div className="about-profile-inline">
                <div className="about-avatar-shell" aria-hidden="true">
                  <pre className="about-avatar-art">{`
      .::::.
    .::::::::.
   :::::::::::
  ..::::::::::..
  '::::::::::::'
    '::::::::'
      '::::'
`}</pre>
                </div>

                <div className="about-identity">
                  <h2 className="about-name">{bio.name}</h2>
                  <p className="about-role">{bio.title}</p>
                  <p className="about-location">Sri Lanka based, building across web, automation, and device-connected systems.</p>
                </div>
              </div>

              <p className="about-summary">{bio.long}</p>

              <div className="about-socials">
                {socials.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-social-link"
                    title={link.name}
                  >
                    <span className="about-social-icon">{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-main-grid">
        <RetroWindow title="SYSTEM_BIO" className="about-panel">
          <div className="about-bio-list">
            {bio.points.map((point) => (
              <div key={point} className="about-bio-item">
                <span className="about-bio-bullet">&gt;</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </RetroWindow>

        <RetroWindow title="INSTALLED_MODULES" className="about-panel">
          <div className="about-skill-groups">
            {skillCategories.map(([category, items]) => (
              <div key={category} className="about-skill-group">
                <div className="about-skill-group-header">
                  <span className="about-skill-group-name">{category}</span>
                  <span className="about-skill-group-count">{items.length}</span>
                </div>
                <div className="about-chip-list">
                  {items.map((skill) => (
                    <span key={skill} className="about-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RetroWindow>
      </section>

      <section className="about-content-grid">
        <RetroWindow title="EXECUTION_LOG" className="about-panel">
          <div className="about-experience-list">
            {experiences.map((exp) => (
              <article key={exp.id} className="about-timeline-item">
                <span className="about-timeline-dot" aria-hidden="true" />
                <div className="about-timeline-content">
                  <span className="about-timeline-duration">{exp.duration}</span>
                  <h3 className="about-timeline-role">{exp.role}</h3>
                  <p className="about-timeline-company">{exp.company}</p>
                  <p className="about-timeline-description">{exp.description}</p>
                  <ul className="about-responsibility-list">
                    {exp.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </RetroWindow>

        <div className="about-side-stack">
          <RetroWindow title="SYSTEM_SPECS" className="about-panel">
            <div className="about-education-list">
              {education.map((edu) => (
                <article key={`${edu.institution}-${edu.degree}`} className="about-education-card">
                  <h3>{edu.degree}</h3>
                  <p className="about-education-school">{edu.institution}</p>
                  <div className="about-education-meta">
                    <span>{edu.year}</span>
                    {edu.details ? <span>{edu.details}</span> : null}
                  </div>
                </article>
              ))}
            </div>
          </RetroWindow>

          <RetroWindow title="ACHIEVEMENTS_LOG" className="about-panel">
            <ul className="about-achievement-list">
              {achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </RetroWindow>
        </div>
      </section>
    </div>
  );
}


