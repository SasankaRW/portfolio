'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export type MediaItem = { type: 'image' | 'video'; src: string; alt?: string };

interface MediaViewerProps {
  items: MediaItem[];
  index: number;
  onIndexChange: (nextIndex: number) => void;
}

export default function MediaViewer({ items, index, onIndexChange }: MediaViewerProps) {
  const count = items.length;
  const safeIndex = ((index % count) + count) % count;
  const item = items[safeIndex];

  const goPrev = () => onIndexChange((safeIndex - 1 + count) % count);
  const goNext = () => onIndexChange((safeIndex + 1) % count);

  useEffect(() => {
    if (count <= 1) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, safeIndex]);

  if (!item) return null;

  return (
    <div
      className="crt-frame"
      style={{
        padding: 0,
        border: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: '60vh',
          maxHeight: '80vh',
          height: 'calc(100vh - 80px)',
          background: 'var(--bg-black)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {item.type === 'video' ? (
          <video
            src={item.src}
            controls
            autoPlay
            style={{ width: '100%', height: '100%', maxHeight: '100%', objectFit: 'contain', outline: 'none' }}
          />
        ) : (
          <Image src={item.src} alt={item.alt || 'Media'} fill style={{ objectFit: 'contain' }} />
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous media"
              title="Previous (←)"
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 5,
                width: 44,
                height: 44,
                borderRadius: 0,
                border: '1px solid var(--border-color)',
                background: 'rgba(0,0,0,0.55)',
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-terminal)',
                cursor: 'pointer',
              }}
            >
              ‹
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next media"
              title="Next (→)"
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 5,
                width: 44,
                height: 44,
                borderRadius: 0,
                border: '1px solid var(--border-color)',
                background: 'rgba(0,0,0,0.55)',
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-terminal)',
                cursor: 'pointer',
              }}
            >
              ›
            </button>

            <div
              aria-label={`Media ${safeIndex + 1} of ${count}`}
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 5,
                padding: '0.25rem 0.5rem',
                border: '1px solid var(--border-color)',
                background: 'rgba(0,0,0,0.55)',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-terminal)',
              }}
            >
              {safeIndex + 1}/{count}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


