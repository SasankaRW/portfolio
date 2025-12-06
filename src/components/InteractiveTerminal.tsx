'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CommandHistory {
    id: number;
    text: string;
    type: 'input' | 'output';
}

const FILE_SYSTEM = {
    'about.txt': '/about',
    'projects.exe': '/projects',
    'experience.log': '/experience',
    'contact.msg': '/contact',
    'research.dat': '/research',
};

export default function InteractiveTerminal() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandHistory[]>([
        { id: 1, text: 'Welcome to PORTFOLIO_OS v2.5.0', type: 'output' },
        { id: 2, text: 'Type "help" for available commands.', type: 'output' },
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const parts = trimmedCmd.split(' ');
        const command = parts[0];
        const arg = parts[1];

        let outputLines: string[] = [];

        switch (command) {
            case 'help':
                outputLines = [
                    'Available commands:',
                    '  help     - Show this help message',
                    '  dir / ls - List directory contents',
                    '  open <file> - Open a file/page',
                    '  whoami   - Display current user',
                    '  clear    - Clear terminal',
                    '  date     - Show current system time',
                ];
                break;
            case 'ls':
            case 'dir':
                outputLines = [
                    'Directory of C:\\USERS\\VISITOR',
                    '',
                    ...Object.keys(FILE_SYSTEM).map(f => `  ${f.padEnd(20)} <FILE>`),
                    '',
                    `${Object.keys(FILE_SYSTEM).length} File(s)`
                ];
                break;
            case 'whoami':
                outputLines = ['visitor@portfolio-network'];
                break;
            case 'date':
                outputLines = [new Date().toString()];
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'open':
                if (arg && Object.keys(FILE_SYSTEM).some(k => k.toLowerCase() === arg)) {
                    const target = Object.entries(FILE_SYSTEM).find(([k]) => k.toLowerCase() === arg);
                    if (target) {
                        outputLines = [`Opening ${target[0]}...`];
                        router.push(target[1]);
                    }
                } else {
                    outputLines = [
                        `Error: File not found: ${arg || ''}`,
                        'Usage: open <filename>',
                        'Type "dir" to see available files.'
                    ];
                }
                break;
            case '':
                break;
            default:
                outputLines = [`Command not found: ${command}`];
        }

        setHistory(prev => [
            ...prev,
            { id: Date.now(), text: `C:\\> ${cmd}`, type: 'input' },
            ...outputLines.map((line, i) => ({ id: Date.now() + i + 1, text: line, type: 'output' as const }))
        ]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div
            className="retro-window interactive-terminal"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="retro-window-titlebar">
                <span className="retro-window-title">TERMINAL.EXE</span>
                <div className="retro-window-controls">
                    <span className="retro-window-btn">_</span>
                    <span className="retro-window-btn">□</span>
                    <span className="retro-window-btn">×</span>
                </div>
            </div>

            <div className="retro-window-content" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: '#0a0a0a', /* Darker terminal bg */
                padding: '1rem'
            }}>
                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '0.5rem' }}>
                    {history.map((item) => (
                        <div key={item.id} style={{
                            color: item.type === 'input' ? 'var(--text-secondary)' : 'var(--accent-primary)',
                            marginBottom: '0.25rem',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {item.text}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }}>C:\&gt;</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--accent-primary)',
                            fontFamily: 'inherit',
                            fontSize: 'inherit',
                            width: '100%',
                            outline: 'none',
                            caretColor: 'var(--accent-primary)'
                        }}
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
}
