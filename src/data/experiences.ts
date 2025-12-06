export interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
    responsibilities: string[];
}

export const experiences: Experience[] = [
    {
        id: 'exp-1',
        company: 'Zebra Technologies',
        role: 'Software Engineer Intern',
        duration: 'Mar 2025 – Sep 2025',
        description: 'Specialized in SDK integration and advanced UI development.',
        responsibilities: [
            'Worked with SDK integration for barcode scanners and RFID devices',
            'Experience in Generative AI, Machine Learning, and Computer Vision',
            'Built demo applications with advanced 3D UI',
            'Resolved device-level bugs and improved system reliability',
        ],
    },
    {
        id: 'exp-2',
        company: 'Metacoders',
        role: 'Frontend Developer (Part-time)',
        duration: 'Jan 2025 – Present',
        description: 'Frontend development focusing on reliability and UX.',
        responsibilities: [
            'Built responsive front-end apps using React',
            'Implemented unit tests for reliability',
            'Improved cross-platform performance and UX',
        ],
    },
    {
        id: 'exp-3',
        company: 'LoonsLab',
        role: 'Full Stack Developer',
        duration: 'Jul 2023 – Jul 2024',
        description: 'Led development of healthcare platform MedInvent Connect.',
        responsibilities: [
            'Led team developing MedInvent Connect',
            'Optimized REST APIs and UI responsiveness',
            'Implemented secure authentication and DB indexing',
            'Integrated Flutter and Node.js systems',
        ],
    },
    {
        id: 'exp-4',
        company: 'GDG Sri Lanka',
        role: 'Web Developer',
        duration: '2023 – 2024',
        description: 'Community contribution for Google I/O.',
        responsibilities: [
            'Contributed to the Google I/O website',
            'Improved performance and SEO',
        ],
    },
    {
        id: 'exp-5',
        company: 'The Ceylon Spice Hub',
        role: 'Creative Designer',
        duration: '2022 – 2024',
        description: 'Design and branding work.',
        responsibilities: [
            'Designed branding, product labels, and digital assets',
        ],
    },
    {
        id: 'exp-6',
        company: 'Freelance',
        role: 'Software Engineer',
        duration: '2022 – Present',
        description: 'Full-stack and automation projects.',
        responsibilities: [
            'Delivered multiple full-stack, automation, and research-based software projects',
            'Built Python scripts, web apps, and custom tools',
        ],
    },
];
