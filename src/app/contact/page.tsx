'use client';

import { useState, useRef, FormEvent } from 'react';
import anime from 'animejs';
import RetroWindow from '@/components/RetroWindow';
import RetroButton from '@/components/RetroButton';
import { socials } from '@/data/socials';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const emailSocial = socials.find(s => s.name === 'Email');
    const emailAddress = emailSocial ? emailSocial.url.replace('mailto:', '') : 'hello@example.com';

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setSubmitted(true);

            // Reset form animation
            if (formRef.current) {
                anime({
                    targets: formRef.current,
                    opacity: [1, 0],
                    duration: 300,
                    easing: 'easeOutQuad',
                });
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to send message. Please try again or email me directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="section">
            <div className="section-header">
                <h1 className="section-title">&gt; CONTACT.EXE</h1>
                <p className="section-subtitle">Send a Message</p>
            </div>

            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {/* Contact Form */}
                <RetroWindow title="NEW MESSAGE">
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <p className="text-accent" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                                MESSAGE SENT SUCCESSFULLY
                            </p>
                            <p className="text-muted">
                                Thank you for reaching out. I'll get back to you soon.
                            </p>
                            <RetroButton
                                onClick={() => {
                                    setSubmitted(false);
                                    setFormData({ name: '', email: '', message: '' });
                                }}
                                className="mt-4"
                                style={{ marginTop: '1rem' }}
                            >
                                SEND ANOTHER
                            </RetroButton>
                        </div>
                    ) : (
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <div className="terminal-container" style={{ border: 'none', padding: 0, marginBottom: '1.5rem' }}>
                                <div className="terminal-header" style={{ marginBottom: '1rem' }}>
                                    <span className="terminal-prompt">C:\MAIL&gt;</span>
                                    <span className="text-muted">compose</span>
                                </div>
                                <p className="terminal-text" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                    ENTER YOUR MESSAGE BELOW:
                                </p>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label className="retro-label">NAME:</label>
                                <input
                                    type="text"
                                    className="retro-input"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label className="retro-label">EMAIL:</label>
                                <input
                                    type="email"
                                    className="retro-input"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label className="retro-label">MESSAGE:</label>
                                <textarea
                                    className="retro-input retro-textarea"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Your message here..."
                                    required
                                />
                            </div>

                            <RetroButton type="submit" variant="primary" disabled={isSubmitting}>
                                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                            </RetroButton>
                        </form>
                    )}
                </RetroWindow>

                {/* Social Links */}
                <RetroWindow title="CONNECT">
                    <div className="terminal-container" style={{ border: 'none', padding: 0, marginBottom: '1.5rem' }}>
                        <div className="terminal-header">
                            <span className="terminal-prompt">C:\SOCIAL&gt;</span>
                            <span className="text-muted">links</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '0.75rem 1rem',
                                    background: 'var(--bg-section)',
                                    border: '2px solid var(--border-color)',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s',
                                }}
                                className="dos-flicker"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                    e.currentTarget.style.color = 'var(--accent-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                            >
                                <span style={{ fontSize: '1.25rem' }}>{social.icon}</span>
                                <span>{social.name}</span>
                            </a>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        background: 'var(--bg-section)',
                        border: '2px solid var(--border-color)'
                    }}>
                        <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>
                            Prefer email? Reach out at{' '}
                            <a href={`mailto:${emailAddress}`} className="text-accent">
                                {emailAddress}
                            </a>
                        </p>
                    </div>
                </RetroWindow>
            </div>
        </div>
    );
}
