'use client';

interface ScanlineOverlayProps {
    enabled?: boolean;
}

export default function ScanlineOverlay({ enabled = true }: ScanlineOverlayProps) {
    if (!enabled) return null;

    return <div className="scanline-overlay" />;
}
