'use client';

import { useRef } from 'react';
import anime from 'animejs';
import { Project } from '@/data/projects';

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (cardRef.current) {
            anime({
                targets: cardRef.current,
                scale: [0.98, 1],
                duration: 150,
                easing: 'easeInOutQuad',
            });
        }
        onClick();
    };

    const handleMouseEnter = () => {
        if (cardRef.current) {
            anime({
                targets: cardRef.current,
                scale: 1.02,
                duration: 200,
                easing: 'easeOutQuad',
                boxShadow: '0 0 15px rgba(0, 255, 204, 0.2)'
            });
        }
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            anime({
                targets: cardRef.current,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
            });
        }
    };

    return (
        <div
            ref={cardRef}
            className="retro-window"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s'
            }}
        >
            <style jsx>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.4; }
                    100% { opacity: 1; }
                }
            `}</style>

            <div className="retro-window-titlebar" style={{ gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{project.icon}</span>
                    <span className="retro-window-title" style={{ fontSize: '0.8rem' }}>{project.name}</span>
                </div>
                {project.demo && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        border: '1px solid #FF3333',
                        padding: '0.1rem 0.4rem',
                        background: 'rgba(255, 51, 51, 0.1)',
                    }}>
                        <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#FF3333',
                            boxShadow: '0 0 5px #FF3333',
                            animation: 'pulse 1.5s infinite'
                        }} />
                        <span style={{
                            fontSize: '0.65rem',
                            color: '#FF3333',
                            fontWeight: 'bold',
                            fontFamily: 'var(--font-terminal)',
                            letterSpacing: '1px'
                        }}>LIVE</span>
                    </div>
                )}
            </div>

            <div className="retro-window-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem' }}>
                <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {project.description}
                </p>

                <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {project.techStack.slice(0, 3).map(tech => (
                            <span key={tech} style={{
                                fontSize: '0.7rem',
                                padding: '0.2rem 0.5rem',
                                background: 'rgba(0, 255, 204, 0.05)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-muted)',
                                fontFamily: 'var(--font-terminal)'
                            }}>
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 3 && (
                            <span style={{
                                fontSize: '0.7rem',
                                padding: '0.2rem 0.5rem',
                                color: 'var(--text-muted)',
                                fontFamily: 'var(--font-terminal)'
                            }}>
                                +{project.techStack.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
