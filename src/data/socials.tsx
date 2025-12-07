import React from 'react';

export interface Social {
    name: string;
    url: string;
    icon: React.ReactNode;
}

export const socials: Social[] = [
    {
        name: 'GitHub',
        url: 'https://github.com/SasankaRW',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/sasankaravindu',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
            </svg>
        ),
    },

    {
        name: 'Phone',
        url: 'tel:+94715669231',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
        ),
    },
];

export const bio = {
    name: "Sasanka Ravindu Wakkumbura",
    title: "Software Engineer | BSc IT Undergraduate",
    location: "Sri Lanka",
    short: "Dynamic software engineer with experience in system integration, scalable applications, and research-driven development.",
    long: "Dynamic software engineer with experience in system integration, scalable applications, and research-driven development. Skilled in Python, C#, and modern web technologies, with additional expertise in low-level hardware integration, device SDK connectivity, and UI/UX design. Experienced in building reliable applications that interface with RFID, barcode scanners, and simulation tools.",
    points: [
        "Dynamic software engineer with experience in system integration and scalable applications.",
        "Skilled in Python, C#, and modern web technologies (React, Next.js).",
        "Expertise in low-level hardware integration, device SDK connectivity, and UI/UX design.",
        "Experienced in building reliable applications interfacing with RFID & barcode scanners."
    ]
};

export const skills = {
    web: ['React', 'Next.js', 'Node.js', 'REST APIs', 'Tailwind CSS'],
    mobile: ['Flutter', 'Kotlin', 'React Native'],
    database: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'],
    languages: ['Python', 'C#', 'Java', 'C', 'Shell Scripting'],
    cloud: ['Docker', 'Firebase', 'GitHub Actions'],
    design: ['Figma', 'Photoshop', 'Illustrator', 'UI/UX Wireframing'],
};

export const education = [
    {
        institution: "University of Moratuwa, Sri Lanka",
        degree: "BSc in Information Technology",
        year: "2022 – July 2026",
        details: ""
    },
    {
        institution: "CICRA Campus, Sri Lanka",
        degree: "Diploma in Cyber Security & Ethical Hacking",
        year: "2020",
        details: ""
    },
    {
        institution: "Kingswood College, Kandy",
        degree: "G.C.E. Advanced Level",
        year: "2020",
        details: "Combined Mathematics – A, ICT – A, Physics – B (Z-Score: 1.909)"
    }
];

export const achievements = [
    "President’s Scout of Sri Lanka (2019)",
    "Google Hash Code — 10th Place National (2021)",
    "Finalist — National Olympiad in Informatics (2019)",
    "University Colors for Basketball (2023, 2025)",
    "Winner — SLUG Championship (2025)",
    "Hackathons: Coderally 2.0 (2021), Google Hash Code (2022), Coderush (2023)"
];
