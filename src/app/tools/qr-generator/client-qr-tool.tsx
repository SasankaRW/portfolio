'use client';

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import RetroWindow from '@/components/RetroWindow';
import RetroButton from '@/components/RetroButton';
import Link from 'next/link';
import { Project } from '@/data/projects';

export default function ClientQrTool({ tool }: { tool?: Project }) {
    const [url, setUrl] = useState('');
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [logo, setLogo] = useState<HTMLImageElement | null>(null);
    const [logoName, setLogoName] = useState('Upload Logo (Optional)');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isGenerated, setIsGenerated] = useState(false);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoName(file.name);
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setLogo(img);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        } else {
            setLogoName('Upload Logo (Optional)');
            setLogo(null);
        }
    };

    const generateQRCode = async () => {
        if (!url) return;

        try {
            const canvas = canvasRef.current;
            if (!canvas) return;

            await QRCode.toCanvas(canvas, url, {
                width: 400,
                margin: 2,
                errorCorrectionLevel: 'H',
                color: {
                    dark: fgColor,
                    light: bgColor
                }
            });

            if (logo) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    const width = canvas.width;
                    const logoSize = width * 0.2;
                    const x = (width - logoSize) / 2;
                    const y = (width - logoSize) / 2;

                    ctx.fillStyle = bgColor;
                    ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
                    ctx.drawImage(logo, x, y, logoSize, logoSize);
                }
            }

            setIsGenerated(true);
        } catch (err) {
            console.error(err);
        }
    };

    const downloadQRCode = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const clearAll = () => {
        setUrl('');
        setFgColor('#000000');
        setBgColor('#ffffff');
        setLogo(null);
        setLogoName('Upload Logo (Optional)');
        setIsGenerated(false);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    // Auto-generate when essential fields change IF already generated once
    useEffect(() => {
        if (isGenerated) generateQRCode();
    }, [url, fgColor, bgColor, logo]);

    const renderDescription = (text: string) => {
        return text.split('\n').map((line, i) => {
            if (line.startsWith('### ')) {
                return <h3 key={i} style={{ color: 'var(--accent-primary)', marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('- ')) {
                return (
                    <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        {line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, (match, p1) => p1)}
                    </li>
                );
            }
            if (line.trim() === '') {
                return <br key={i} />;
            }
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
                <p key={i} style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    })}
                </p>
            );
        });
    };

    return (
        <div className="section">
            <div className="section-header">
                <Link href="/tools" className="text-muted" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                    ← BACK TO TOOLS
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <h1 className="section-title">QR GENERATOR</h1>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

                {/* Controls */}
                <RetroWindow title="CONFIGURATION">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>TARGET URL</label>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'var(--font-mono)',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div>
                            <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>BRANDING LOGO</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="file"
                                    id="logo-upload"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="logo-upload" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0.75rem',
                                    border: '1px dashed var(--border-color)',
                                    cursor: 'pointer',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.9rem'
                                }}>
                                    {logoName}
                                </label>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>FOREGROUND</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="color"
                                        value={fgColor}
                                        onChange={(e) => setFgColor(e.target.value)}
                                        style={{ background: 'none', border: 'none', width: '40px', height: '40px', cursor: 'pointer' }}
                                    />
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{fgColor}</span>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>BACKGROUND</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        style={{ background: 'none', border: 'none', width: '40px', height: '40px', cursor: 'pointer' }}
                                    />
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{bgColor}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button
                                onClick={generateQRCode}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: 'var(--accent-primary)',
                                    color: '#000',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)'
                                }}
                            >
                                GENERATE
                            </button>
                            <button
                                onClick={clearAll}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'transparent',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-color)',
                                    cursor: 'pointer'
                                }}
                            >
                                CLEAR
                            </button>
                        </div>
                    </div>
                </RetroWindow>

                {/* Preview */}
                <RetroWindow title="OUTPUT_PREVIEW">
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '300px',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '1rem'
                    }}>
                        <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto', display: isGenerated ? 'block' : 'none', border: '1px solid #fff' }} />

                        {!isGenerated && (
                            <div className="text-muted" style={{ fontFamily: 'var(--font-terminal)' }}>
                                WAITING FOR INPUT...
                            </div>
                        )}

                        {isGenerated && (
                            <div style={{ marginTop: '1.5rem', width: '100%' }}>
                                <RetroButton onClick={downloadQRCode} style={{ width: '100%', textAlign: 'center' }}>
                                    DOWNLOAD PNG
                                </RetroButton>
                            </div>
                        )}
                    </div>
                </RetroWindow>
            </div>

            {tool && (
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                '@context': 'https://schema.org',
                                '@type': 'SoftwareApplication',
                                name: tool.name,
                                description: tool.description,
                                applicationCategory: 'UtilityApplication',
                                operatingSystem: 'Any',
                                offers: {
                                    '@type': 'Offer',
                                    price: '0',
                                    priceCurrency: 'USD',
                                },
                            }),
                        }}
                    />
                    {tool.faqs && (
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                    '@context': 'https://schema.org',
                                    '@type': 'FAQPage',
                                    mainEntity: tool.faqs.map((faq) => ({
                                        '@type': 'Question',
                                        name: faq.question,
                                        acceptedAnswer: {
                                            '@type': 'Answer',
                                            text: faq.answer,
                                        },
                                    })),
                                }),
                            }}
                        />
                    )}

                    <RetroWindow title="SYSTEM_OVERVIEW" style={{ marginBottom: '1.5rem' }}>
                        <div style={{ padding: '0.5rem 0' }}>
                            {tool.longDescription ? (
                                <div className="retro-content">
                                    {renderDescription(tool.longDescription)}
                                </div>
                            ) : (
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                    {tool.description}
                                </p>
                            )}
                        </div>
                    </RetroWindow>

                    {tool.faqs && (
                        <RetroWindow title="FAQ_DATABASE">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {tool.faqs.map((faq, i) => (
                                    <div key={i} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                        <div style={{ color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                            <span>Q:</span><span>{faq.question}</span>
                                        </div>
                                        <div style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: 1.6 }}>{faq.answer}</div>
                                    </div>
                                ))}
                            </div>
                        </RetroWindow>
                    )}
                </div>
            )}
        </div>
    );
}
