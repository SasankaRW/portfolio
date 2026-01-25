export interface Project {
    id: string;
    slug: string;
    name: string;
    description: string;
    longDescription?: string;
    faqs?: { question: string; answer: string }[];
    seoMeta?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
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
        id: 'ceylon-spice-hub',
        slug: 'ceylon-spice-hub',
        name: 'Ceylon Spice Hub',
        description: 'Full-stack e-commerce platform for premium Sri Lankan spices with a dynamic storefront and admin dashboard.',
        icon: '🌶️',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'],
        role: 'Full Stack Developer',
        demo: 'https://ceylon-spice-hub.vercel.app/',
        // image: '/images/projects/ceylon-spice-hub/cover.png',
        longDescription: `
**Ceylon Spice Hub** is a modern full-stack e-commerce platform dedicated to selling premium Sri Lankan spices. It bridges the gap between traditional spice markets and digital convenience, offering a seamless shopping experience.

### Key Features
- **E-Commerce Engine**: Features a dynamic product catalog, real-time shopping cart, and secure checkout flow integrated with Stripe.
- **Admin Dashboard**: A comprehensive CMS allowing authorized personnel to manage inventory, track customer orders, and curate recipes.
- **Rich User Experience**: Designed with **Tailwind CSS** and **Radix UI**, enhancing engagement through smooth page transitions and micro-interactions powered by **Framer Motion**.
- **Culinary Integration**: A specialized "Recipes" section that links products to usage examples, driving customer engagement.
- **Robust Security**: Implements JWT authentication, rate limiting, and data sanitization for a secure backend environment.
        `,
        features: [
            'Full-Stack E-Commerce with Stripe',
            'Secure Admin Dashboard (CMS)',
            'Recipe & Content Management',
            'JWT Auth & Rate Limiting',
            'Responsive UI with Dark Mode'
        ],
        seoMeta: {
            title: "Ceylon Spice Hub – Premium E-Commerce Platform",
            description: "Full-stack e-commerce solution for Sri Lankan spices built with React, Node.js, and MongoDB. Features secure payments and a custom admin dashboard.",
            keywords: ["Full Stack", "E-commerce", "React", "Node.js", "MongoDB", "Stripe", "Sri Lankan Spices"]
        }
    },

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
        longDescription: `
The **Basketball ScoreBoard** is a professional-grade, web-based scoring solution designed for high-stakes tournaments and broadcast environments. It bridges the gap between expensive hardware scoreboards and modern digital streaming needs.

### Key Features for Tournaments
- **Real-Time Synchronization**: Built on Firebase, any update significantly reflects across all connected devices instantly.
- **Remote Control Interface**: A separate, mobile-friendly interface allows referees or table officials to update scores without interfering with the main display.
- **Broadcast Ready**: Designed with a clean, high-contrast UI that works perfectly as an OBS (Open Broadcaster Software) browser source overlay.
- **Precision Timing**: Includes a 0.1s precision timer for critical game moments.

### Why use a Web-Based Scoreboard?
Traditional hardware scoreboards are expensive and hard to transport. This PWA (Progressive Web App) runs on any laptop or tablet, making it the perfect portable solution for traveling leagues, school tournaments, and recreational facilities.
        `,
        faqs: [
            {
                question: "Can I use this for live streaming?",
                answer: "Yes! The scoreboard is designed to be used as a Browser Source in OBS, vMix, or Streamlabs. The background can be keyed out or used as-is for a professional overlay."
            },
            {
                question: "Does it support remote control?",
                answer: "Absoluteley. You can open the 'Remote' view on a phone or tablet to control the scoreboard wirelessly from anywhere in the gym."
            },
            {
                question: "Is there a delay in score updates?",
                answer: "No, thanks to Firebase Realtime Database, updates are instantaneous (sub-100ms latency under normal network conditions)."
            }
        ],
        seoMeta: {
            title: "Basketball Scoreboard – Free Online Scoreboard for OBS & Tournaments",
            description: "A professional, real-time online basketball scoreboard. Features remote control, OBS overlay support, and precision timing. Perfect for tournaments and live streams.",
            keywords: ["Basketball Scoreboard", "Online Scoreboard", "OBS Scoreboard Overlay", "Digital Scoreboard", "Tournament Software", "Real-time Scoring"]
        },
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
        image: '/images/projects/taskgo/2025-12-21 111936.png',
        gallery: [
            '/images/projects/taskgo/2025-12-21 111936.png',
            '/images/projects/taskgo/2025-12-21 111952.png',
            '/images/projects/taskgo/2025-12-21 112010.png',
            '/images/projects/taskgo/2025-12-21 112022.png',
            '/images/projects/taskgo/2025-12-21 112114.png',
            '/images/projects/taskgo/2025-12-21 112205.png',
            '/images/projects/taskgo/2025-12-21 112225.png',
            '/images/projects/taskgo/2025-12-21 112252.png',
            '/images/projects/taskgo/2025-12-21 112329.png',
            '/images/projects/taskgo/2025-12-21 112410.png'
        ],
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
        id: 'velvet-bloom',
        slug: 'velvet-bloom',
        name: 'Velvet Bloom',
        description: 'Monolithic e-commerce platform for a clothing store featuring a Backend, Customer Frontend, and Admin Dashboard.',
        icon: '👗', // Or another suitable icon
        techStack: ['Java Spring Boot', 'React', 'MongoDB', 'Docker', 'Redux', 'Material UI'],
        role: 'Team Lead',
        github: 'https://github.com/SasankaRW/velvet-bloom',
        image: '/images/projects/velvet-bloom/Browsing.png',
        gallery: [
            '/images/projects/velvet-bloom/Browsing.png',
            '/images/projects/velvet-bloom/Checkout.png',
            '/images/projects/velvet-bloom/Inventory.png'
        ],
        features: [
            'Microservices-ready Monolithic Architecture',
            'Full-stack: Java Spring Boot Backend + React Frontend',
            'Admin Dashboard for managing products and orders',
            'Dockerized environment with Docker Compose',
            'Secure RESTful API integration'
        ]
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
        id: 'tool-whatsapp-bot',
        slug: 'whatsapp-bot',
        name: 'WhatsApp Auto Sender Bot',
        description: 'A powerful, user-friendly desktop application to schedule and automate WhatsApp messages using Selenium.',
        icon: '🤖',
        techStack: ['Python', 'Selenium', 'Tkinter'],
        role: 'Creator',
        github: 'https://github.com/SasankaRW/WhatsApp-Bot/tree/v0.1.0',
        demo: 'https://github.com/SasankaRW/WhatsApp-Bot/releases',
        features: [
            'GUI Interface: Simple graphical interface',
            'Smart Scheduling: Just-In-Time browser system',
            'Resource Friendly: Closes browser between actions',
            'Persistent Login: Remembers sessions',
            'Isolated Environment: Separate Chrome instance'
        ],
        image: '/images/projects/whatsapp-bot/gui.png',
        gallery: [
            '/images/projects/whatsapp-bot/gui.png'
        ],
        longDescription: `
The **WhatsApp Auto Sender Bot** is a powerful desktop automation tool designed to streamline your messaging workflows. Built with Python and Selenium, it allows individuals and businesses to schedule and send WhatsApp messages automatically without manual intervention.

### Who is this for?
This tool is perfect for:
- **Small Business Owners**: Send order updates, invoices, or promotional offers to customers.
- **Marketers**: Manage broadcast lists and engagement campaigns effectively.
- **Community Managers**: Keep your groups and contacts informed with scheduled announcements.
- **Data Entry Professionals**: Automate repetitive messaging tasks.

### Key Capabilities
Unlike standard broadcasting lists, this bot simulates a real user interaction using a dedicated Chrome instance. This ensures higher delivery rates and allows you to send messages to numbers that haven't saved your contact details. The "Just-In-Time" browser system manages system resources efficiently by only running the browser when a message needs to be sent.

*Disclaimer: This tool is intended for personal productivity and legitimate business communication. Please use responsibly and adhere to WhatsApp's terms of service.*
        `,
        faqs: [
            {
                question: "Is this bot safe to use?",
                answer: "Yes, the bot operates by simulating natural human interactions through a real browser instance, making it safer than API-based unauthorized tools."
            },
            {
                question: "Do I need to save contacts to send messages?",
                answer: "No, one of the key features is the ability to send messages to any phone number without needing to add them to your contacts first."
            },
            {
                question: "Can I schedule messages for later?",
                answer: "Absolutely. The tool includes a smart scheduling system that lets you queue messages for specific dates and times."
            },
            {
                question: "Does it run in the background?",
                answer: "The application runs as a desktop app. It manages a separate Chrome window that opens and closes automatically based on your schedule to save RAM."
            }
        ],
        seoMeta: {
            title: "WhatsApp Auto Sender Bot – Free Application for PC | SasankaRW",
            description: "Download the free WhatsApp Auto Sender Bot. Schedule messages, send to unsaved contacts, and automate your workflow with this Python-based desktop tool.",
            keywords: ["WhatsApp Automation", "WhatsApp Bot", "Bulk Sender", "Selenium Automation", "Python Tool", "Message Scheduler"]
        }
    },
    {
        id: 'tool-1',
        slug: 'auto-typer',
        name: 'Text Cleaner and Auto-Typer',
        description: 'A simple utility tool for Windows to clean formatted text and automatically type it into any application. Perfect for pasting text into restricted fields that block pasting.',
        icon: '⌨️',
        techStack: ['Python', 'PyAutoGUI', 'Tkinter'],
        role: 'Creator',
        github: 'https://github.com/SasankaRW/typer',
        demo: 'https://github.com/SasankaRW/typer/releases',
        features: [
            'Text Cleaning: Automatically cleans formatted text',
            'Clipboard Integration: One-click paste from system clipboard',
            'Adjustable Speed with configurable delay',
            'Progress Tracking & Real-time char count',
            'Always on Top floating window',
            'Safe: Quick "Stop" button'
        ],
        image: '/images/projects/typer/1.png',
        gallery: [
            '/images/projects/typer/1.png',
            '/images/projects/typer/Screenshot 2025-12-08 223519.png'
        ],
        longDescription: `
The **Text Cleaner and Auto-Typer** is a specialized utility for Windows designed to solve a common frustration: restricted form fields that block "Ctrl+V" (Paste) operations.

### Why use an Auto-Typer?
Many legacy banking sites, remote desktop environments, and secure forms disable the paste function, forcing users to manually type long strings of data. This tool bypasses those restrictions by simulating keystrokes at the operating system level. It takes your text, cleans up unwanted formatting, and "types" it into the active window as if you were using your keyboard.

### Advanced Formatting Cleaning
Beyond just typing, this tool acts as a clipboard sanitizer. It automatically strips:
- Rich text formatting (bold, color, fonts)
- Smart quotes and special hidden characters
- Excessive whitespace and line breaks

### Use Cases
- **Data Entry**: Transfer data from Excel/Web to legacy ERP systems.
- **Remote Desktops (RDP/Citrix)**: Type text across remote sessions where clipboard sharing is disabled.
- **Forms**: Fill "Confirm Email" fields that block pasting.
        `,
        faqs: [
            {
                question: "How does the Auto-Typer work?",
                answer: "It uses the PyAutoGUI library to simulate physical keyboard presses. The computer sees the input as coming from your hardware keyboard, allowing it to work in any application."
            },
            {
                question: "Is this a keylogger?",
                answer: "No. This is a one-way outgoing tool. It reads from your clipboard only when you tell it to and outputs text. It does not record or store your keystrokes."
            },
            {
                question: "Can I control the typing speed?",
                answer: "Yes, the tool includes an adjustable delay setting. You can slow it down for older, laggy applications or speed it up for instant entry."
            },
            {
                question: "Does it work on Windows 11?",
                answer: "Yes, it is fully compatible with Windows 10 and Windows 11."
            }
        ],
        seoMeta: {
            title: "Auto Typer & Text Cleaner – Bypass Paste Restrictions | SasankaRW",
            description: "Free Auto Typer utility for Windows. Clean formatted text and simulate keystrokes to paste into protected fields, RDP sessions, and legacy apps.",
            keywords: ["Auto Typer", "Clipboard Cleaner", "Paste Block Bypass", "Data Entry Tool", "Windows Utility", "Text Sanitizer"]
        }
    },
    {
        id: 'tool-qr-gen',
        slug: 'qr-generator',
        name: 'QR Code Generator',
        description: 'Instant, privacy-focused QR code generator. Create custom QR codes with logos, colors, and high-resolution export options directly in your browser.',
        icon: '📱',
        techStack: ['React', 'QRCode.js', 'Canvas API'],
        role: 'Creator',
        features: [
            'Real-time Generation',
            'Custom Logo Embedding',
            'Foreground/Background Colorization',
            'Privacy First (Client-side only)',
            'High-Res PNG Download'
        ],
        longDescription: `
The **QR Code Generator** is a lightweight, client-side utility built for quick and secure QR code creation. Unlike many online generators that send your data to a server, this tool processes everything locally in your browser using the HTML5 Canvas API.

### Key Features
- **Privacy Focused**: Your data never leaves your device.
- **Customizable**: Match your brand identity with custom foreground and background colors.
- **Branded**: Easily center your logo or icon within the QR code.
- **High Quality**: Export sharp, high-resolution PNGs suitable for print or web use.

### Tech Constraints
This tool leverages the \`qrcode\` library for generation and raw Canvas manipulation for logo compositing, ensuring zero dependencies on external APIs.
        `,
        faqs: [
            {
                question: "Where is my data sent?",
                answer: "Nowhere. All image generation happens right inside your web browser."
            },
            {
                question: "Can I use these QR codes commercially?",
                answer: "Yes, the generated images are yours to use freely."
            }
        ],
        seoMeta: {
            title: "Free Online QR Code Generator with Logo | Secure & Private",
            description: "Generate custom QR codes with logos and colors instantly. No sign-up, no server uploads, privacy-focused client-side generation.",
            keywords: ["QR Code Generator", "Free QR Creator", "QR with Logo", "Private QR Generator", "No Sign up QR"]
        }
    }
];
