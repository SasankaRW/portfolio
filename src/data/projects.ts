export interface Project {
    id: string;
    slug: string;
    name: string;
    description: string;
    icon: string;
    techStack: string[];
    role: string;
    features: string[];
    github?: string;
    demo?: string;
    image?: string;
}

export const projects: Project[] = [
    {
        id: 'proj-1',
        slug: 'medinvent-connect',
        name: 'MedInvent Connect',
        description: 'Healthcare management platform for clinics, appointments, and prescriptions.',
        icon: '🏥',
        techStack: ['Flutter', 'React', 'Node.js', 'MongoDB'],
        role: 'Team Lead / Full Stack Developer',
        features: [
            'Clinic and appointment management',
            'Secure authentication',
            'Database indexing for performance',
            'Integrated Flutter and Node.js systems',
        ],
    },
    {
        id: 'proj-2',
        slug: 'rfid-tracker',
        name: 'RFID Live Tracking',
        description: '3D application simulating real-time RFID tag movement and location history.',
        icon: '📡',
        techStack: ['WPF', 'C#', 'RFID', '3D Simulation'],
        role: 'Developer',
        features: [
            'Real-time RFID tag movement simulation',
            'Location history tracking',
            '3D visualization',
        ],
    },
    {
        id: 'proj-3',
        slug: 'taskgo',
        name: 'TaskGo',
        description: 'Service marketplace connecting users with local hardware & home service workers.',
        icon: '🛠️',
        techStack: ['React', 'Node.js', 'MongoDB'],
        role: 'Full Stack Developer',
        features: [
            'Service marketplace functionality',
            'User-worker connection',
            'Responsive frontend',
        ],
    },
    {
        id: 'proj-4',
        slug: 'speech-text',
        name: 'Speech ↔ Text',
        description: 'Real-time speech-to-text and text-to-speech desktop application.',
        icon: '🗣️',
        techStack: ['Python'],
        role: 'Developer',
        features: [
            'Real-time speech-to-text',
            'Text-to-speech conversion',
            'Desktop application interface',
        ],
    },
    {
        id: 'proj-5',
        slug: 'sentinel-resq',
        name: 'SentinelResQ',
        description: 'Autonomous rover for search & rescue with video streaming and sensor navigation.',
        icon: '🤖',
        techStack: ['Arduino', 'C++'],
        role: 'Embedded Developer',
        features: [
            'Autonomous navigation',
            'Video streaming',
            'Sensor integration',
        ],
    },
];

export const tools: Project[] = [
    {
        id: 'tool-1',
        slug: 'auto-typer',
        name: 'Auto Typer',
        description: 'Automated typing utility for simulating keyboard input with adjustable speed.',
        icon: '⌨️',
        techStack: ['Python', 'PyAutoGUI', 'Tkinter'],
        role: 'Creator',
        features: [
            'Adjustable typing speed',
            'Script support for long texts',
            'GUI interface for easy control',
            'Start/Stop hotkeys'
        ]
    },
    {
        id: 'tool-2',
        slug: 'file-organizer',
        name: 'File Organizer',
        description: 'Script to automatically organize files in a directory based on file extensions.',
        icon: '📂',
        techStack: ['Python', 'OS Module'],
        role: 'Creator',
        features: [
            'Categorizes files by type (Images, Docs, etc.)',
            'Recursive directory scanning',
            'Customizable rules'
        ]
    }
];
