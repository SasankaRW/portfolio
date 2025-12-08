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
    video?: string;
    gallery?: string[];
}

export const projects: Project[] = [
    {
        id: 'proj-new-score',
        slug: 'basketball-scoreboard',
        name: 'Basketball ScoreBoard',
        description: 'Professional real-time scoreboard for high-stakes tournaments with remote control & overlay support.',
        icon: '🏀',
        techStack: ['Firebase', 'HTML5', 'CSS3', 'JS (ES6)'],
        role: 'Creator',
        demo: 'https://basketball-score-board-tau.vercel.app/',
        image: '/images/projects/scoreboard.png',
        features: [
            'Real-Time Sync (Firebase Realtime DB)',
            'Precision Timer (down to 0.1s)',
            'Dual-View: Scoreboard & Remote Control',
            'Live Stream Overlay Ready (OBS)',
            'Progressive Web App (PWA)'
        ],
    },
    {
        id: 'proj-1',
        slug: 'medinvent-connect',
        name: 'MedInvent Connect',
        description: 'Healthcare management platform for clinics, appointments, and prescriptions.',
        icon: '🏥',
        techStack: ['Flutter', 'React', 'Node.js', 'MongoDB'],
        role: 'Team Lead / Full Stack Developer',
        image: '/images/projects/medinvent-dashboard.png',
        gallery: [
            '/images/projects/medinvent-dashboard.png',
            '/images/projects/medinvent-appt.png',
            '/images/projects/medinvent-presc.png'
        ],
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
        techStack: ['javascript', 'Three.js', 'RFID', 'WebGL'],
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
        image: '/images/projects/sentinel-rover.jpg',
        video: '/images/projects/sentinel-demo.mp4',
        gallery: [
            '/images/projects/sentinel-rover.jpg',
        ],
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
        ],
        image: '/images/projects/typer/1.png',
        gallery: [
            '/images/projects/typer/1.png',
            '/images/projects/typer/Screenshot 2025-12-08 223519.png'
        ]
    },
];
