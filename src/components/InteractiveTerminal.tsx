'use client';

import { useState, useRef, useEffect } from 'react';
import { experiences as experiencesData } from '@/data/experiences';
import { projects as projectsData } from '@/data/projects';
import { socials, bio, skills, education, achievements } from '@/data/socials';

// --- Types ---
type FileType = 'file' | 'dir';

interface FileSystemNode {
    type: FileType;
    content?: string; // For files
    children?: { [key: string]: FileSystemNode }; // For directories
}

interface CommandHistoryDisplay {
    id: number;
    text: string;
    type: 'input' | 'output' | 'error';
}

// --- Constants ---
const COMMANDS = ['help', 'ls', 'dir', 'cd', 'cat', 'type', 'open', 'clear', 'cls', 'whoami', 'pwd'];

const WELCOME_TEXT = `
  _____  ____  _____ _______ ______ ____  _      _____ ____  
 |  __ \\|  _ \\|  __ \\__   __|  ____/ __ \\| |    |_   _/ __ \\ 
 | |__) | |_) | |__) | | |  | |__ | |  | | |      | || |  | |
 |  ___/|  _ <|  _  /  | |  |  __|| |  | | |      | || |  | |
 | |    | |_) | | \\ \\  | |  | |   | |__| | |____ _| || |__| |
 |_|    |____/|_|  \\_\\ |_|  |_|    \\____/|______|_____\\____/ 

 SYSTEM ONLINE...
 INITIALIZING... OK
 LOADING MODULES... OK
 
 Welcome to PORTFOLIO_OS v3.0.0
 (c) 2025 Sasanka Ravindu Wakkumbura

 [TIP] Press TAB for autocomplete
`;

// --- File System Generation ---
const generateFileSystem = (): FileSystemNode => {
    // 1. Projects
    const projectFiles: { [key: string]: FileSystemNode } = {};
    projectFiles['SUMMARY.txt'] = {
        type: 'file',
        content: `PROJECTS SUMMARY\n================\nTotal Projects: ${projectsData.length}\n\n` +
            projectsData.map(p => `- ${p.name} (${p.slug})`).join('\n')
    };

    projectsData.forEach(p => {
        const content = `
PROJECT: ${p.name.toUpperCase()}
[${p.role}]
----------------------------------------
${p.description}

Tech Stack: ${p.techStack.join(', ')}

Features:
${p.features.map(f => `* ${f}`).join('\n')}

Links:
${p.demo ? `Demo: ${p.demo}` : ''}
${p.github ? `GitHub: ${p.github}` : ''}
        `.trim();
        projectFiles[`${p.slug}.txt`] = { type: 'file', content };
    });

    // 2. Experience
    const experienceFiles: { [key: string]: FileSystemNode } = {};
    experienceFiles['SUMMARY.txt'] = {
        type: 'file',
        content: `EXPERIENCE LOG\n==============\n` +
            experiencesData.map(e => `[${e.duration}] ${e.role} @ ${e.company}`).join('\n')
    };

    experiencesData.forEach((e, idx) => {
        const filename = `${e.company.replace(/\s+/g, '_').toLowerCase()}_${idx}.txt`;
        const content = `
ROLE: ${e.role}
COMPANY: ${e.company}
DURATION: ${e.duration}
----------------------------------------
${e.description}

Responsibilities:
${e.responsibilities.map(r => `> ${r}`).join('\n')}
        `.trim();
        experienceFiles[filename] = { type: 'file', content };
    });

    // 3. Contact
    const email = socials.find(s => s.name === 'Email')?.url.replace('mailto:', '') || 'N/A';
    const contactContent = `
CONTACT INFORMATION
===================
Name: ${bio.name}
Title: ${bio.title}
Email: ${email}
Location: ${bio.location}

Socials:
${socials.map(s => `${s.name}: ${s.url}`).join('\n')}

    `.trim();

    // 4. About
    const bioContent = `
ABOUT: ${bio.name.toUpperCase()}
================================
${bio.long}

Highlights:
${bio.points.map(p => `- ${p}`).join('\n')}
    `.trim();

    const skillsContent = `
TECHNICAL SKILLS
================
Web:      ${skills.web.join(', ')}
Mobile:   ${skills.mobile.join(', ')}
Database: ${skills.database.join(', ')}
Languages:${skills.languages.join(', ')}
Cloud:    ${skills.cloud.join(', ')}
Design:   ${skills.design.join(', ')}
    `.trim();

    const eduContent = `
EDUCATION HISTORY
=================
${education.map(e => `
${e.year} - ${e.degree}
${e.institution}
${e.details ? `(${e.details})` : ''}
`).join('\n')}
    `.trim();

    return {
        type: 'dir',
        children: {
            'README.txt': {
                type: 'file',
                content: 'Welcome to PORTFOLIO_OS v3.0.0\nUse "ls" to list files, "cd" to navigate, and "cat" to read files.\n\nTry:\n  cd projects\n  ls\n  cat basketball-scoreboard.txt'
            },
            'about': {
                type: 'dir',
                children: {
                    'bio.txt': { type: 'file', content: bioContent },
                    'skills.txt': { type: 'file', content: skillsContent },
                    'education.txt': { type: 'file', content: eduContent },
                    'achievements.txt': {
                        type: 'file',
                        content: `ACHIEVEMENTS\n============\n${achievements.map((a, i) => `${i + 1}. ${a}`).join('\n')}`
                    }
                }
            },
            'projects': {
                type: 'dir',
                children: projectFiles
            },
            'experience': {
                type: 'dir',
                children: experienceFiles
            },
            'contact': {
                type: 'dir',
                children: {
                    'info.txt': { type: 'file', content: contactContent }
                }
            }
        }
    };
};

const FILE_SYSTEM = generateFileSystem();

export default function InteractiveTerminal() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandHistoryDisplay[]>([
        { id: 1, text: WELCOME_TEXT, type: 'output' },
        { id: 2, text: 'Type "help" for available commands.', type: 'output' },
    ]);
    const [currentPath, setCurrentPath] = useState<string[]>([]); // root is empty array

    // Command History State for Up/Down Arrows
    const [inputHistory, setInputHistory] = useState<string[]>([]);
    const [historyPointer, setHistoryPointer] = useState<number>(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const terminalBodyRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of terminal content
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    // Keep focus on input
    const focusInput = () => {
        inputRef.current?.focus({ preventScroll: true });
    };

    const getPathString = (path: string[]) => {
        return 'C:\\' + (path.length > 0 ? path.join('\\') : '') + '>';
    };

    const resolveNode = (path: string[]): FileSystemNode | undefined => {
        let current = FILE_SYSTEM;
        for (const segment of path) {
            if (current.children && current.children[segment]) {
                current = current.children[segment];
            } else {
                return undefined;
            }
        }
        return current;
    };

    const handleCommand = (cmdStr: string) => {
        const trimmedCmd = cmdStr.trim();

        // Add valid commands to history buffer (skip empty or duplicates if you want, but standard is all)
        if (trimmedCmd) {
            setInputHistory(prev => [...prev, trimmedCmd]);
            setHistoryPointer(-1); // Reset pointer
        }

        if (!trimmedCmd) {
            setHistory(prev => [...prev, { id: Date.now(), text: getPathString(currentPath), type: 'input' }]);
            return;
        }

        const [cmd, ...args] = trimmedCmd.split(/\s+/);
        const arg = args.join(' ');

        let output: CommandHistoryDisplay[] = [];

        // Add input to display history
        output.push({ id: Date.now(), text: `${getPathString(currentPath)} ${trimmedCmd}`, type: 'input' });

        switch (cmd.toLowerCase()) {
            case 'help':
                output.push({
                    id: Date.now() + 1,
                    type: 'output',
                    text: `Available commands:
  ls / dir     - List directory contents
  cd <dir>     - Change directory
  cat <file>   - Read file content
  clear        - Clear terminal screen
  whoami       - Current user
  pwd          - Print working directory`
                });
                break;

            case 'clear':
            case 'cls':
                setHistory([]);
                setHistoryPointer(-1);
                return;

            case 'whoami':
                output.push({ id: Date.now() + 1, type: 'output', text: `visitor@portfolio\nUser ID: GUEST-${Math.floor(Math.random() * 1000)}` });
                break;

            case 'pwd':
                output.push({ id: Date.now() + 1, type: 'output', text: 'C:\\' + currentPath.join('\\') });
                break;

            case 'ls':
            case 'dir':
                const node = resolveNode(currentPath);
                if (node && node.type === 'dir' && node.children) {
                    const files = Object.keys(node.children).sort().map(name => {
                        const child = node.children![name];
                        const isDir = child.type === 'dir';
                        if (isDir) {
                            return `<DIR>   ${name}`;
                        }
                        return `        ${name}`;
                    });

                    const header = ` Directory of C:\\${currentPath.join('\\')}\n`;
                    const footer = `\n${files.length} File(s)`;

                    output.push({
                        id: Date.now() + 1,
                        type: 'output',
                        text: header + files.join('\n') + footer
                    });
                } else {
                    output.push({ id: Date.now() + 1, type: 'error', text: 'Error: Cannot list directory.' });
                }
                break;

            case 'cd':
                if (!arg || arg === '~' || arg === '/') {
                    setCurrentPath([]);
                } else if (arg === '..') {
                    setCurrentPath(prev => prev.slice(0, -1));
                } else {
                    const currentNode = resolveNode(currentPath);
                    if (currentNode && currentNode.children && currentNode.children[arg]) {
                        if (currentNode.children[arg].type === 'dir') {
                            setCurrentPath(prev => [...prev, arg]);
                        } else {
                            output.push({ id: Date.now() + 1, type: 'error', text: `Error: '${arg}' is not a directory.` });
                        }
                    } else {
                        output.push({ id: Date.now() + 1, type: 'error', text: `Error: Directory '${arg}' not found.` });
                    }
                }
                break;

            case 'cat':
            case 'type':
            case 'open':
                if (!arg) {
                    output.push({ id: Date.now() + 1, type: 'error', text: 'Usage: cat <filename>' });
                } else {
                    const currentNode = resolveNode(currentPath);
                    if (currentNode && currentNode.children && currentNode.children[arg]) {
                        if (currentNode.children[arg].type === 'file') {
                            output.push({
                                id: Date.now() + 1,
                                type: 'output',
                                text: currentNode.children[arg].content || '(empty file)'
                            });
                        } else {
                            output.push({ id: Date.now() + 1, type: 'error', text: `Error: '${arg}' is a directory. Use 'cd' or 'ls'.` });
                        }
                    } else {
                        output.push({ id: Date.now() + 1, type: 'error', text: `Error: File '${arg}' not found.` });
                    }
                }
                break;

            default:
                output.push({ id: Date.now() + 1, type: 'error', text: `Command not found: ${cmd}` });
        }

        setHistory(prev => [...prev, ...output]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const { key, ctrlKey } = e;

        if (key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (ctrlKey && key === 'l') {
            e.preventDefault();
            setHistory([]);
        } else if (key === 'ArrowUp') {
            if (inputHistory.length > 0) {
                e.preventDefault();
                const newIndex = historyPointer === -1 ? inputHistory.length - 1 : Math.max(0, historyPointer - 1);
                setHistoryPointer(newIndex);
                setInput(inputHistory[newIndex]);
            }
        } else if (key === 'ArrowDown') {
            if (inputHistory.length > 0 && historyPointer !== -1) {
                e.preventDefault();
                const newIndex = historyPointer + 1;
                if (newIndex >= inputHistory.length) {
                    setHistoryPointer(-1);
                    setInput('');
                } else {
                    setHistoryPointer(newIndex);
                    setInput(inputHistory[newIndex]);
                }
            }
        } else if (key === 'Tab') {
            e.preventDefault();

            // Autocomplete logic
            const trimInput = input.trimStart();
            const parts = trimInput.split(/\s+/);

            if (parts.length === 1) {
                // Autocomplete command
                const partialCmd = parts[0].toLowerCase();
                const matches = COMMANDS.filter(c => c.startsWith(partialCmd));
                if (matches.length === 1) {
                    setInput(matches[0] + ' ');
                }
            } else if (parts.length === 2) {
                // Autocomplete filename/dirname
                const cmd = parts[0].toLowerCase();
                const partialArg = parts[1];

                // Get valid children in current path
                const currentNode = resolveNode(currentPath);
                if (currentNode && currentNode.children) {
                    const childrenNames = Object.keys(currentNode.children);
                    const matches = childrenNames.filter(name => name.toLowerCase().startsWith(partialArg.toLowerCase()));

                    if (matches.length === 1) {
                        const match = matches[0];
                        // If it's a directory and command is cd, add slash maybe? No need.
                        setInput(`${parts[0]} ${match}`);
                    } else if (matches.length > 1) {
                        // Optional: show suggestions? 
                        // For now, simple behavior: cycle or common prefix?
                        // Let's find common prefix - actually getting the first match is standard MVP
                        // Let's just pick the first one to avoid confusion if it changes unexpected
                        // Or better: don't do anything if ambiguous, maybe list them
                    }
                }
            }
        }
    };

    return (
        <div
            className="retro-window interactive-terminal"
            onClick={focusInput}
        >
            <div className="retro-window-titlebar">
                <span className="retro-window-title">TERMINAL.EXE</span>
                <div className="retro-window-controls">
                    <span className="retro-window-btn">_</span>
                    <span className="retro-window-btn">□</span>
                    <span className="retro-window-btn">×</span>
                </div>
            </div>

            <div
                ref={terminalBodyRef}
                className="retro-window-content"
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    background: '#0a0a0a',
                    padding: '1rem',
                    cursor: 'text'
                }}
            >
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-terminal)',
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                }}>
                    {history.map((item) => (
                        <div key={item.id} style={{
                            color: item.type === 'input' ? 'var(--text-secondary)' :
                                item.type === 'error' ? '#ff5555' : 'var(--accent-primary)',
                            marginBottom: '0.25rem',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word'
                        }}>
                            {item.text}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>
                        {getPathString(currentPath)}
                    </span>
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
                            fontFamily: 'var(--font-terminal)',
                            fontSize: '1rem',
                            flex: 1,
                            outline: 'none',
                            caretColor: 'var(--accent-primary)'
                        }}
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    );
}
