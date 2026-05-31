'use client';

import { useState, useRef, FormEvent } from 'react';
import RetroWindow from '@/components/RetroWindow';
import RetroButton from '@/components/RetroButton';
import { socials } from '@/data/socials';

const contactMethods = [
  {
    name: 'Email',
    label: 'Sasankarw@gmail.com',
    url: 'mailto:sasankarw@gmail.com',
    description: 'Best for project briefs and collaboration ideas.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    description: 'Professional networking and role discussions.',
    icon: socials.find(s => s.name === 'LinkedIn')?.icon,
    external: true,
  },
  {
    name: 'GitHub',
    label: 'github.com/SasankaRW',
    url: socials.find(s => s.name === 'GitHub')?.url ?? 'https://github.com/SasankaRW',
    description: 'Browse code samples and shipped work.',
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

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to send message');
      setSubmitted(true);
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

      <RetroWindow title="CONTACT_PORTAL">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2.5rem',
          alignItems: 'start',
        }}
          className="contact-two-col"
        >

          {/* LEFT — message form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <p style={{ margin: '0 0 0.25rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-primary)' }}>
                Send a message
              </p>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Share what you&apos;re building and I&apos;ll get back to you.
              </p>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <p className="text-accent" style={{ fontSize: '1.1rem', margin: 0 }}>MESSAGE SENT</p>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>I&apos;ll get back to you soon.</p>
                <RetroButton onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}>
                  SEND ANOTHER
                </RetroButton>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                    placeholder="Tell me what you are building or what you need help with..."
                    required
                  />
                </div>

                <div>
                  <RetroButton type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </RetroButton>
                </div>
              </form>
            )}
          </div>

          {/* Divider */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '-1.25rem',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'var(--border-color)',
            }} aria-hidden="true" />

            {/* RIGHT — contact channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Choose the fastest way to reach out
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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

              <a
                href="/Sasanka_Ravindu_SE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn retro-btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start' }}
              >
                <span>💾</span> DOWNLOAD RESUME
              </a>
            </div>
          </div>

        </div>
      </RetroWindow>
    </div>
  );
}
