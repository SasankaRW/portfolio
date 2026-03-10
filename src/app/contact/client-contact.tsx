'use client';

import { useState, useRef, FormEvent } from 'react';
import anime from 'animejs';
import RetroWindow from '@/components/RetroWindow';
import RetroButton from '@/components/RetroButton';
import { bio, socials } from '@/data/socials';

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
  const emailAddress = emailSocial ? emailSocial.url.replace('mailto:', '') : 'Sasankarw@gmail.com';
  const contactMethods = [
    {
      name: 'Email',
      label: emailAddress,
      url: `mailto:${emailAddress}`,
      description: 'Best for project briefs, freelance work, and collaboration ideas.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <path d="m3 7 9 6 9-6"></path>
        </svg>
      ),
      external: false,
    },
    {
      name: 'LinkedIn',
      label: 'linkedin.com/in/sasankaravindu',
      url: socials.find(s => s.name === 'LinkedIn')?.url ?? 'https://linkedin.com/in/sasankaravindu',
      description: 'Ideal for professional networking and role discussions.',
      icon: socials.find(s => s.name === 'LinkedIn')?.icon,
      external: true,
    },
    {
      name: 'GitHub',
      label: 'github.com/SasankaRW',
      url: socials.find(s => s.name === 'GitHub')?.url ?? 'https://github.com/SasankaRW',
      description: 'Browse code samples, experiments, and shipped work.',
      icon: socials.find(s => s.name === 'GitHub')?.icon,
      external: true,
    },
    {
      name: 'Phone',
      label: '+94 71 566 9231',
      url: socials.find(s => s.name === 'Phone')?.url ?? 'tel:+94715669231',
      description: 'Useful for urgent follow-ups and short syncs.',
      icon: socials.find(s => s.name === 'Phone')?.icon,
      external: false,
    },
  ];

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
        <p className="section-subtitle">Let&apos;s build something useful together</p>
      </div>

      <div className="contact-hero">
        <div className="contact-hero-copy">
          <div className="terminal-header" style={{ marginBottom: '1rem', padding: 0, borderBottom: 'none' }}>
            <span className="terminal-prompt">C:\CONTACT&gt;</span>
            <span className="text-muted">init handshake</span>
          </div>
          <h2 className="contact-hero-title">Open for collaborations, product work, and engineering-heavy builds.</h2>
          <p className="contact-hero-text">
            {bio.short} If you have an idea, a product to refine, or a system that needs careful implementation,
            send a note and I&apos;ll get back to you.
          </p>
        </div>

        <div className="contact-hero-stats">
          <div className="contact-stat-card">
            <span className="contact-stat-label">Primary channel</span>
            <strong>{emailAddress}</strong>
          </div>
          <div className="contact-stat-card">
            <span className="contact-stat-label">Location</span>
            <strong>{bio.location}</strong>
          </div>
          <div className="contact-stat-card">
            <span className="contact-stat-label">Response window</span>
            <strong>Usually within 24-48 hours</strong>
          </div>
        </div>
      </div>

      <div className="contact-layout">
        <RetroWindow title="MESSAGE_COMPOSER">
          {submitted ? (
            <div className="contact-success">
              <p className="text-accent" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                MESSAGE SENT SUCCESSFULLY
              </p>
              <p className="text-muted" style={{ maxWidth: '34rem', margin: '0 auto 1rem' }}>
                Thank you for reaching out. I&apos;ll get back to you soon.
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
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="terminal-container contact-form-intro" style={{ border: 'none' }}>
                <div className="terminal-header" style={{ marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="terminal-prompt">C:\MAIL&gt;</span>
                  <span className="text-muted">compose</span>
                </div>
                <p className="terminal-text" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                  SHARE YOUR IDEA, PROJECT, OR QUESTION BELOW:
                </p>
                <p className="text-muted" style={{ marginBottom: 0 }}>
                  A short brief, timeline, or project goal is enough to start the conversation.
                </p>
              </div>

              <div className="contact-form-grid">
                <div>
                  <label className="retro-label">NAME:</label>
                  <input
                    type="text"
                    className="retro-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div>
                  <label className="retro-label">EMAIL:</label>
                  <input
                    type="email"
                    className="retro-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="abc@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="retro-label">MESSAGE:</label>
                <textarea
                  className="retro-input retro-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me what you are building, what you need help with, or what outcome you are aiming for..."
                  required
                />
              </div>

              <div className="contact-form-actions">
                <RetroButton type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </RetroButton>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>
                  Prefer direct email? <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
                </p>
              </div>
            </form>
          )}
        </RetroWindow>

        <div className="contact-sidebar">
          <RetroWindow title="QUICK_CONNECT">
            <div className="terminal-container contact-sidebar-intro" style={{ border: 'none' }}>
              <div className="terminal-header" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="terminal-prompt">C:\SOCIAL&gt;</span>
                <span className="text-muted">links --priority</span>
              </div>
              <p className="text-muted" style={{ marginBottom: 0 }}>
                Pick the channel that best matches how you want to start the conversation.
              </p>
            </div>

            <div className="contact-method-list">
              {contactMethods.map((method) => (
                <a
                  key={method.name}
                  href={method.url}
                  target={method.external ? '_blank' : undefined}
                  rel={method.external ? 'noopener noreferrer' : undefined}
                  className="contact-method-card dos-flicker"
                >
                  <span className="contact-method-icon">{method.icon}</span>
                  <span className="contact-method-body">
                    <span className="contact-method-name">{method.name}</span>
                    <span className="contact-method-value">{method.label}</span>
                    <span className="contact-method-description">{method.description}</span>
                  </span>
                </a>
              ))}
            </div>
          </RetroWindow>

          <RetroWindow title="STATUS_PANEL">
            <div className="contact-status-panel">
              <div className="contact-status-pill">
                <span className="contact-status-dot"></span>
                Available for new conversations
              </div>

              <div className="contact-status-grid">
                <div className="contact-status-item">
                  <span className="contact-status-label">Focus</span>
                  <strong>Web apps, tooling, integrations</strong>
                </div>
                <div className="contact-status-item">
                  <span className="contact-status-label">Best brief</span>
                  <strong>Goals, scope, timeline, references</strong>
                </div>
              </div>

              <a
                href="/Sasanka_Ravindu_SE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn retro-btn-primary contact-resume-link"
              >
                DOWNLOAD RESUME
              </a>
            </div>
          </RetroWindow>
        </div>
      </div>
    </div>
  );
}


