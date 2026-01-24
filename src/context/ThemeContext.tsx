'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'classic' | 'arch' | 'minimal' | 'light' | 'matrix' | 'neo';

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeMode>('minimal');

    useEffect(() => {
        // Reset classes
        document.body.classList.remove('theme-arch', 'theme-minimal', 'theme-light', 'theme-matrix', 'theme-neo');

        // Apply new theme class
        if (theme !== 'classic') {
            document.body.classList.add(`theme-${theme}`);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
