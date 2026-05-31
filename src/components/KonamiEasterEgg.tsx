'use client';

import { useEffect, useRef } from 'react';

const STORAGE_KEY = 'sas_grid_amber';
const SECRET_WORD = 'amber';

export default function KonamiEasterEgg() {
  const bufferRef = useRef('');

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      document.body.classList.add('amber-mode');
    }
  }, []);

  useEffect(() => {
    const toggleAmberMode = () => {
      const enabled = document.body.classList.toggle('amber-mode');
      localStorage.setItem(STORAGE_KEY, String(enabled));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const key = event.key.toLowerCase();
      if (key.length !== 1 || !/^[a-z]$/.test(key)) return;

      bufferRef.current = (bufferRef.current + key).slice(-SECRET_WORD.length);

      if (bufferRef.current === SECRET_WORD) {
        bufferRef.current = '';
        toggleAmberMode();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}
